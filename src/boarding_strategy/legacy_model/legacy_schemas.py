from __future__ import annotations

from typing import Any, Optional

from pydantic import BaseModel, Field, field_validator


class LegacySchoolPreferences(BaseModel):
    us_region: Optional[str] = None
    surroundings: Optional[str] = None
    affiliated_religion: Optional[str] = None
    student_body_size: Optional[str] = None
    boarding_percentage: Optional[str] = None
    international_student_percentage: Optional[str] = None
    average_travel_time_to_airport: Optional[str] = None
    sports_gender: Optional[str] = None
    preferred_sports: list[str] = Field(default_factory=list)
    region_condition_required: bool = False
    conditional_region: Optional[str] = None
    religion_condition_required: bool = False
    conditional_religion: Optional[str] = None
    athletic_condition_required: bool = False
    conditional_sport: Optional[str] = None


class LegacyStage1Input(BaseModel):
    student_alias: str
    cohort: str = ""
    consultant_alias: Optional[str] = None
    ssat_percentile: Optional[float] = None
    toefl_score: Optional[float] = None
    gpa_label: Optional[str] = None
    academic_comment: Optional[str] = None
    english_fluency_0_100: Optional[float] = None
    personality_interview_0_5: Optional[float] = None
    boarding_fit_recommendation_0_100: Optional[float] = None
    boarding_life_comment: Optional[str] = None
    ec_strength_0_5: Optional[float] = None
    leadership_0_5: Optional[float] = None
    hook_0_5: Optional[float] = None
    cocurricular_comment: Optional[str] = None
    overall_comment: Optional[str] = None
    school_preferences: LegacySchoolPreferences = Field(default_factory=LegacySchoolPreferences)
    needs_ssat_optional: Optional[bool] = None
    needs_esl: Optional[bool] = None

    @field_validator(
        "ssat_percentile",
        "toefl_score",
        "english_fluency_0_100",
        "boarding_fit_recommendation_0_100",
        mode="before",
    )
    @classmethod
    def blank_to_none(cls, value: Any) -> Any:
        return None if value == "" else value


class LegacyStage1Score(BaseModel):
    ssat_eval_score: Optional[float] = None
    toefl_eval_score: Optional[float] = None
    gpa_eval_score: Optional[float] = None
    english_fluency_eval_score: Optional[float] = None
    personality_interview_eval_score: Optional[float] = None
    boarding_fit_recommendation_eval_score: Optional[float] = None
    ec_strength_eval_score: Optional[float] = None
    leadership_eval_score: Optional[float] = None
    hook_eval_score: Optional[float] = None
    academics_A: Optional[float] = None
    boarding_life_B: Optional[float] = None
    cocurricular_C: Optional[float] = None
    simple_average: Optional[float] = None
    weighted_application_strength: Optional[float] = None
    normalized_weighted_strength: Optional[float] = None
    tier_labels: dict[str, str] = Field(default_factory=dict)
    comments: dict[str, str] = Field(default_factory=dict)
    missing_data_warnings: list[str] = Field(default_factory=list)


class LegacySchool(BaseModel):
    school_id: str
    school_name: str
    rank: Optional[float] = None
    school_strength: float
    acceptance_rate: Optional[float] = None
    school_type: Optional[str] = None
    location: Optional[str] = None
    town_state: Optional[str] = None
    region: Optional[str] = None
    surroundings: Optional[str] = None
    religion: Optional[str] = None
    student_body_size: Optional[str] = None
    boarding_percentage: Optional[str] = None
    international_student_percentage: Optional[str] = None
    airport_name: Optional[str] = None
    airport_city: Optional[str] = None
    average_travel_time_to_airport_minutes: Optional[float] = None
    ssat_required: Optional[bool] = None
    esl_available: Optional[bool] = None
    sao: Optional[bool] = None
    gateway: Optional[bool] = None
    application_portal: Optional[str] = None
    application_deadline: Optional[str] = None
    results_date: Optional[str] = None
    enrollment_deadline: Optional[str] = None
    sports_offered: list[str] = Field(default_factory=list)
    ranking_data: dict[str, Any] = Field(default_factory=dict)
    source_sheet: Optional[str] = None
    source_row: Optional[int] = None
    source_notes: Optional[str] = None


class CompatibilityResult(BaseModel):
    compatibility_score_0_1: float
    raw_points: float
    max_points: float
    matched_preferences: list[str] = Field(default_factory=list)
    mismatched_preferences: list[str] = Field(default_factory=list)
    hard_condition_failures: list[str] = Field(default_factory=list)
    sports_match: bool = False
    region_match: bool = False
    religion_match: bool = False
    airport_match: bool = False
    size_match: bool = False
    boarding_percentage_match: bool = False
    international_percentage_match: bool = False
    explanation: str = ""
    warnings: list[str] = Field(default_factory=list)


class LegacyPredictionResult(BaseModel):
    student_alias: str
    school_id: str
    school_name: str
    school_strength: float
    weighted_application_strength: float
    prediction_margin: float
    category: str
    toefl_detriment: float
    gpa_detriment: float
    global_adjustment: float
    compatibility_score: float
    compatibility_explanation: str
    acceptance_rate: Optional[float] = None
    school_rank: Optional[float] = None
    assumptions: list[str] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)


class LegacyHistoricalOutcome(BaseModel):
    anonymized_student_id: str
    cohort: str = ""
    school_name: str
    outcome: str
    legacy_prediction_margin: Optional[float] = None
    legacy_category: Optional[str] = None
    school_strength: Optional[float] = None
    application_strength_if_available: Optional[float] = None
    notes: Optional[str] = None
    source_sheet: Optional[str] = None
    source_row: Optional[int] = None

