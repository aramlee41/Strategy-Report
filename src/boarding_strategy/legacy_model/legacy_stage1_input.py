from __future__ import annotations

from typing import Any

from .legacy_schemas import LegacySchoolPreferences, LegacyStage1Input


def legacy_input_from_dict(row: dict[str, Any]) -> LegacyStage1Input:
    prefs = LegacySchoolPreferences(
        us_region=row.get("US Region") or row.get("US Region:"),
        surroundings=row.get("Surroundings") or row.get("Surroundings:"),
        affiliated_religion=row.get("Affiliated Religion") or row.get("Affiliated Religion:"),
        student_body_size=row.get("Student Body Size") or row.get("Student Body Size:"),
        boarding_percentage=row.get("Boarding Percentage") or row.get("Boarding Percentage:"),
        international_student_percentage=row.get("International Student Percentage") or row.get("International Student Percentage:"),
        average_travel_time_to_airport=row.get("Average Travel Time to Airport") or row.get("Average Travel Time to Airport:"),
        sports_gender=row.get("Sports Gender"),
        preferred_sports=[x for x in [row.get("Preferred Sports 1"), row.get("Preferred Sports 2"), row.get("Preferred Sports 3")] if x],
        region_condition_required=_yes(row.get("Region Conditions")),
        conditional_region=row.get("Conditional Region"),
        religion_condition_required=_yes(row.get("Religion Conditions")),
        conditional_religion=row.get("Conditional Religion"),
        athletic_condition_required=_yes(row.get("Athletic Conditions")),
        conditional_sport=row.get("Conditional Sport"),
    )
    return LegacyStage1Input(
        student_alias=row.get("student_alias") or row.get("학생") or row.get("student") or "student_0000",
        cohort=str(row.get("X기") or row.get("cohort") or ""),
        consultant_alias=row.get("담당자") or row.get("consultant_alias"),
        ssat_percentile=_num(row.get("SSAT (%)")),
        toefl_score=_num(row.get("TOEFL 점수")),
        gpa_label=row.get("GPA"),
        academic_comment=row.get("academic comment") or row.get("Comment"),
        english_fluency_0_100=_num(row.get("영어 회화의 유창성 (0-100)")),
        personality_interview_0_5=_num(row.get("성격 / 인터뷰 능력 (0-5)")),
        boarding_fit_recommendation_0_100=_num(row.get("보딩 Fit / 추천서 (0-100)")),
        boarding_life_comment=row.get("boarding life comment"),
        ec_strength_0_5=_num(row.get("EC - Strength\n(0-5)") or row.get("EC - Strength or EC - Variety (0-5)")),
        leadership_0_5=_num(row.get("리더십\n(0-5)")),
        hook_0_5=_num(row.get('"후크" 정도 / 표시\n(0-5)') or row.get("hook_0_5")),
        cocurricular_comment=row.get("co-curricular comment"),
        overall_comment=row.get("Overall Comment"),
        school_preferences=prefs,
        needs_ssat_optional=_yes(row.get("SSAT Optional Needed?")),
        needs_esl=_yes(row.get("ESL?")),
    )


def _num(value):
    try:
        if value in (None, ""):
            return None
        return float(value)
    except (TypeError, ValueError):
        return None


def _yes(value) -> bool:
    return str(value or "").strip().lower() in {"yes", "true", "1", "y"}

