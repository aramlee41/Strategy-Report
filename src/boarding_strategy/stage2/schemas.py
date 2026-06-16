from __future__ import annotations

from pydantic import BaseModel, Field

from boarding_strategy.legacy_model.legacy_schemas import LegacyPredictionResult, LegacyStage1Score


class EvidenceItem(BaseModel):
    category: str
    description: str
    status: str = "planned"  # current, planned, projected, verified
    strength_0_1: float = 0.5
    rubric_delta: float = 0.0


class Stage2Input(BaseModel):
    student_alias: str
    interests: list[str] = Field(default_factory=list)
    academic_goals: list[str] = Field(default_factory=list)
    current_evidence: list[EvidenceItem] = Field(default_factory=list)
    planned_evidence: list[EvidenceItem] = Field(default_factory=list)
    verified_evidence: list[EvidenceItem] = Field(default_factory=list)
    weekly_available_hours: float = 6
    months_until_deadline: float = 6
    target_schools: list[str] = Field(default_factory=list)


class ScenarioResult(BaseModel):
    name: str
    score_delta: float
    execution_risk_penalty: float
    adjusted_strength: float
    confidence: str
    assumptions: list[str] = Field(default_factory=list)


class Stage2StrategicAnalysis(BaseModel):
    stage1_score: LegacyStage1Score
    stage1_predictions: list[LegacyPredictionResult]
    evidence_profile: dict
    hook_territories: list[dict]
    academic_plan: dict
    ec_project_plan: list[dict]
    scenario_results: list[ScenarioResult]
    adjusted_school_results: list[dict]
    recommendations: list[str]
    risks: list[str]
    assumptions: list[str]
