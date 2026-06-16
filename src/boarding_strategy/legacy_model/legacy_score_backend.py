from __future__ import annotations

from dataclasses import dataclass
from typing import Optional

from .legacy_schemas import LegacyStage1Input, LegacyStage1Score


DEFAULT_TOEFL_TABLE = {
    120: 100, 119: 99.5, 118: 99, 117: 98.5, 116: 98, 115: 97.5, 114: 97,
    113: 96.5, 112: 96, 111: 95.5, 110: 95, 109: 93.5, 108: 92, 107: 90.5,
    106: 89, 105: 87.5, 104: 86, 103: 84.5, 102: 83, 101: 81.5, 100: 80,
    99: 79, 98: 78, 97: 77, 96: 76, 95: 75, 94: 74, 93: 73, 92: 72,
    91: 71, 90: 70, 89: 69, 88: 68, 87: 67, 86: 66, 85: 65, 84: 64,
    83: 63, 82: 62, 81: 61, 80: 60, 79: 59, 78: 58, 77: 57, 76: 56,
    75: 55, 74: 54, 73: 53, 72: 52, 71: 51, 70: 50, 69: 49, 68: 48,
    67: 47, 66: 46, 65: 45, 64: 44, 63: 43, 62: 42, 61: 41, 60: 40,
}
DEFAULT_GPA_TABLE = {
    "A+": 100,
    "A": 95,
    "Most A / Some B": 82,
    "Most B / Some A": 73,
    "B": 63,
    "Most B / Some C": 60,
    "Most C / Some B": 55,
    "C": 50,
    "Most C / Some D": 45,
    "Most D / Some C": 40,
    "D and Below": 30,
}


def _clean_label(value: str | None) -> str:
    return " ".join(str(value or "").strip().lower().split())


@dataclass
class LegacyScoreBackend:
    toefl_table: dict[int, float] | None = None
    gpa_table: dict[str, float] | None = None
    toefl_lookup_mode: str = "nearest_lower"

    def __post_init__(self) -> None:
        self.toefl_table = self.toefl_table or DEFAULT_TOEFL_TABLE.copy()
        self.gpa_table = self.gpa_table or DEFAULT_GPA_TABLE.copy()
        self._gpa_alias = {_clean_label(k): v for k, v in self.gpa_table.items()}

    def toefl_eval(self, score: Optional[float], warnings: list[str]) -> Optional[float]:
        if score is None:
            warnings.append("TOEFL score missing.")
            return None
        key = int(score)
        if key in self.toefl_table:
            return float(self.toefl_table[key])
        keys = sorted(self.toefl_table)
        if key < keys[0] or key > keys[-1]:
            warnings.append(f"TOEFL score {score} is outside extracted table range {keys[0]}-{keys[-1]}.")
        lower = max([k for k in keys if k <= key], default=keys[0])
        warnings.append(f"TOEFL score {score} not found exactly; used nearest-lower {lower}.")
        return float(self.toefl_table[lower])

    def gpa_eval(self, label: Optional[str], warnings: list[str]) -> Optional[float]:
        if not label:
            warnings.append("GPA label missing.")
            return None
        score = self._gpa_alias.get(_clean_label(label))
        if score is None:
            warnings.append(f"GPA label {label!r} not found in legacy conversion table.")
            return None
        return float(score)

    @staticmethod
    def _safe(value: Optional[float], default: float = 0.0) -> float:
        return default if value is None else float(value)

    @staticmethod
    def _tier(score: Optional[float]) -> str:
        if score is None:
            return "Missing"
        if score >= 85:
            return "Tier 1 / Max"
        if score >= 70:
            return "Tier 2"
        if score >= 55:
            return "Tier 3"
        if score >= 40:
            return "Tier 4"
        return "Below Tier 4"

    def calculate(self, student: LegacyStage1Input) -> LegacyStage1Score:
        warnings: list[str] = []
        toefl = self.toefl_eval(student.toefl_score, warnings)
        gpa = self.gpa_eval(student.gpa_label, warnings)
        if student.ssat_percentile is None:
            available = [x for x in [toefl, gpa] if x is not None]
            ssat = sum(available) / len(available) if available else None
            warnings.append("SSAT missing; imputed with average(TOEFL eval, GPA eval).")
        else:
            ssat = float(student.ssat_percentile)

        english = student.english_fluency_0_100
        personality = None if student.personality_interview_0_5 is None else student.personality_interview_0_5 * 20
        boarding_fit = student.boarding_fit_recommendation_0_100
        ec = None if student.ec_strength_0_5 is None else student.ec_strength_0_5 * 20
        leadership = None if student.leadership_0_5 is None else student.leadership_0_5 * 20
        hook = None if student.hook_0_5 is None else student.hook_0_5 * 20

        academics = self._safe(ssat) * 0.20 + self._safe(toefl) * 0.45 + self._safe(gpa) * 0.35
        boarding = self._safe(english) * 0.30 + self._safe(personality) * 0.60 + self._safe(boarding_fit) * 0.10
        cocurricular = self._safe(ec) * 0.35 + self._safe(leadership) * 0.30 + self._safe(hook) * 0.35
        simple_average = (academics + boarding + cocurricular) / 3
        weighted = round((academics * 1.3 + boarding * 0.7 + cocurricular * 1.0) / 3, 2)

        return LegacyStage1Score(
            ssat_eval_score=ssat,
            toefl_eval_score=toefl,
            gpa_eval_score=gpa,
            english_fluency_eval_score=english,
            personality_interview_eval_score=personality,
            boarding_fit_recommendation_eval_score=boarding_fit,
            ec_strength_eval_score=ec,
            leadership_eval_score=leadership,
            hook_eval_score=hook,
            academics_A=round(academics, 2),
            boarding_life_B=round(boarding, 2),
            cocurricular_C=round(cocurricular, 2),
            simple_average=round(simple_average, 2),
            weighted_application_strength=weighted,
            normalized_weighted_strength=weighted,
            tier_labels={
                "academics_A": self._tier(academics),
                "boarding_life_B": self._tier(boarding),
                "cocurricular_C": self._tier(cocurricular),
            },
            comments={
                "academic": student.academic_comment or "",
                "boarding_life": student.boarding_life_comment or "",
                "cocurricular": student.cocurricular_comment or "",
                "overall": student.overall_comment or "",
            },
            missing_data_warnings=warnings,
        )

