from __future__ import annotations

from dataclasses import dataclass, field

from .legacy_compatibility import LegacyCompatibilityModel
from .legacy_family_connection import calculate_legacy_family_connection
from .legacy_schemas import LegacyPredictionResult, LegacySchool, LegacyStage1Input, LegacyStage1Score


DEFAULT_CATEGORY_THRESHOLDS = [
    (-10_000, -26, "Extremely Unlikely Accept"),
    (-26, -16, "Dream School"),
    (-16, -6, "Goal School (Reach)"),
    (-6, 6, "Competitive Accept"),
    (6, 12, "Likely Accept"),
    (12, 10_000, "Safety School"),
]


@dataclass
class LegacyPredictionEngine:
    legacy_global_adjustment: float = 0.0
    category_thresholds: list[tuple[float, float, str]] = field(default_factory=lambda: DEFAULT_CATEGORY_THRESHOLDS.copy())
    compatibility_model: LegacyCompatibilityModel = field(default_factory=LegacyCompatibilityModel)

    def category_for_margin(self, margin: float) -> str:
        if -6 <= margin <= 6:
            return "Competitive Accept"
        if -16 <= margin < -6:
            return "Goal School (Reach)"
        if 6 < margin <= 12:
            return "Likely Accept"
        if margin > 12:
            return "Safety School"
        if -26 <= margin < -16:
            return "Dream School"
        if margin < -26:
            return "Extremely Unlikely Accept"
        return "Unclassified"

    def predict(self, student: LegacyStage1Input, score: LegacyStage1Score, school: LegacySchool) -> LegacyPredictionResult:
        strength = score.weighted_application_strength or 0.0
        legacy_impact = calculate_legacy_family_connection(student.legacy_connections, school)
        adjusted_strength = strength + legacy_impact.legacy_contribution
        toefl_eval = score.toefl_eval_score or 0.0
        gpa_eval = score.gpa_eval_score or 0.0
        toefl_detriment = max(0.0, school.school_strength - toefl_eval)
        gpa_detriment = max(0.0, (school.school_strength - gpa_eval) / 3)
        compatibility = self.compatibility_model.calculate(student.school_preferences, school, student)
        margin = adjusted_strength - school.school_strength - self.legacy_global_adjustment - toefl_detriment - gpa_detriment
        warnings = list(score.missing_data_warnings) + compatibility.warnings
        warnings.extend(legacy_impact.warnings)
        warnings.extend([f"Hard condition failure: {x}" for x in compatibility.hard_condition_failures])
        return LegacyPredictionResult(
            student_alias=student.student_alias,
            school_id=school.school_id,
            school_name=school.school_name,
            school_strength=school.school_strength,
            weighted_application_strength=adjusted_strength,
            base_applicant_score=round(strength, 2),
            legacy_contribution=legacy_impact.legacy_contribution,
            adjusted_applicant_score=round(adjusted_strength, 2),
            legacy_impact=legacy_impact,
            prediction_margin=round(margin, 2),
            category=self.category_for_margin(margin),
            toefl_detriment=round(toefl_detriment, 2),
            gpa_detriment=round(gpa_detriment, 2),
            global_adjustment=self.legacy_global_adjustment,
            compatibility_score=compatibility.compatibility_score_0_1,
            compatibility_explanation=compatibility.explanation,
            acceptance_rate=school.acceptance_rate,
            school_rank=school.rank,
            assumptions=[
                "Legacy spreadsheet category labels are internal strategy estimates, not official probabilities.",
                "TOEFL/GPA detriments are subtracted when each converted score is below school strength.",
            ],
            warnings=warnings,
        )
