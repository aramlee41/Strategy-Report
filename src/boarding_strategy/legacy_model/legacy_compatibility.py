from __future__ import annotations

from dataclasses import dataclass
from typing import Optional

from .legacy_schemas import CompatibilityResult, LegacySchool, LegacySchoolPreferences, LegacyStage1Input


def _norm(value: Optional[str]) -> str:
    return " ".join(str(value or "").strip().lower().replace("_", " ").split())


def _has_pref(value: Optional[str]) -> bool:
    return bool(value) and _norm(value) not in {"no preference", "no preference:", "no", "none"}


@dataclass
class LegacyCompatibilityModel:
    hard_failure_penalty: float = 0.35

    def _match(self, pref: Optional[str], actual: Optional[str], label: str, matched: list[str], mismatched: list[str]) -> tuple[float, float, bool]:
        if not _has_pref(pref):
            return 0.0, 0.0, False
        if _norm(pref) == _norm(actual):
            matched.append(f"{label}: {actual}")
            return 1.0, 1.0, True
        mismatched.append(f"{label}: requested {pref}, school has {actual or 'unknown'}")
        return 0.0, 1.0, False

    def calculate(
        self,
        preferences: LegacySchoolPreferences,
        school: LegacySchool,
        student: LegacyStage1Input | None = None,
    ) -> CompatibilityResult:
        matched: list[str] = []
        mismatched: list[str] = []
        hard: list[str] = []
        warnings: list[str] = []
        raw = 0.0
        max_points = 0.0
        flags: dict[str, bool] = {}
        checks = [
            (preferences.us_region, school.region, "Region"),
            (preferences.surroundings, school.surroundings, "Surroundings"),
            (preferences.affiliated_religion, school.religion, "Religion"),
            (preferences.student_body_size, school.student_body_size, "Student body size"),
            (preferences.boarding_percentage, school.boarding_percentage, "Boarding percentage"),
            (preferences.international_student_percentage, school.international_student_percentage, "International student percentage"),
            (preferences.average_travel_time_to_airport, self._airport_band(school.average_travel_time_to_airport_minutes), "Airport travel time"),
        ]
        for pref, actual, label in checks:
            pts, mx, ok = self._match(pref, actual, label, matched, mismatched)
            raw += pts
            max_points += mx
            flags[label] = ok

        requested_sports = [_norm(s) for s in preferences.preferred_sports if _has_pref(s)]
        school_sports = {_norm(s) for s in school.sports_offered}
        sports_match = False
        if requested_sports:
            max_points += 1
            sports_match = any(s in school_sports for s in requested_sports)
            if sports_match:
                raw += 1
                matched.append("Sports: at least one preferred sport offered")
            else:
                mismatched.append("Sports: none of the preferred sports were found")

        if preferences.region_condition_required and _has_pref(preferences.conditional_region) and _norm(preferences.conditional_region) != _norm(school.region):
            hard.append(f"Required region {preferences.conditional_region} not matched")
        if preferences.religion_condition_required and _has_pref(preferences.conditional_religion) and _norm(preferences.conditional_religion) != _norm(school.religion):
            hard.append(f"Required religion {preferences.conditional_religion} not matched")
        if preferences.athletic_condition_required and _has_pref(preferences.conditional_sport) and _norm(preferences.conditional_sport) not in school_sports:
            hard.append(f"Required sport {preferences.conditional_sport} not offered")
        if student and student.needs_ssat_optional and school.ssat_required:
            warnings.append("Student needs SSAT optional school, but this school appears to require SSAT.")
        if student and student.needs_esl and school.esl_available is False:
            warnings.append("Student needs ESL support, but school has no ESL flag.")

        score = raw / max(max_points, 1.0)
        if hard:
            score *= self.hard_failure_penalty
        explanation = "; ".join(matched[:4] + mismatched[:4] + hard[:3]) or "No stated preferences; compatibility is neutral."
        return CompatibilityResult(
            compatibility_score_0_1=round(score, 3),
            raw_points=raw,
            max_points=max_points,
            matched_preferences=matched,
            mismatched_preferences=mismatched,
            hard_condition_failures=hard,
            sports_match=sports_match,
            region_match=flags.get("Region", False),
            religion_match=flags.get("Religion", False),
            airport_match=flags.get("Airport travel time", False),
            size_match=flags.get("Student body size", False),
            boarding_percentage_match=flags.get("Boarding percentage", False),
            international_percentage_match=flags.get("International student percentage", False),
            explanation=explanation,
            warnings=warnings,
        )

    @staticmethod
    def _airport_band(minutes: Optional[float]) -> Optional[str]:
        if minutes is None:
            return None
        if minutes < 60:
            return "Less than 60 minutes"
        if minutes > 90:
            return "More than 90 minutes"
        return "60 - 90 minutes"

