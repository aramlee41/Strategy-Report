from __future__ import annotations

from boarding_strategy.legacy_model.legacy_prediction import LegacyPredictionEngine
from boarding_strategy.legacy_model.legacy_schemas import LegacyPredictionResult, LegacyStage1Score

from .academic_planner import build_academic_plan
from .ec_project_planner import plan_projects
from .evidence_model import evidence_profile, verified_delta
from .hook_strategy import build_hook_territories
from .schemas import ScenarioResult, Stage2Input, Stage2StrategicAnalysis


def run_stage2(stage1_score: LegacyStage1Score, stage1_predictions: list[LegacyPredictionResult], stage2: Stage2Input) -> Stage2StrategicAnalysis:
    base = stage1_score.weighted_application_strength or 0.0
    evidence = evidence_profile(stage2)
    hooks = build_hook_territories(stage2)
    academic = build_academic_plan(stage1_score, stage2)
    projects = plan_projects(stage2)
    current_delta = min(10, verified_delta(stage2.verified_evidence, cap=10))
    if evidence["verified_count"] == 0:
        current_delta = 0
    planned_cap = 4 if stage2.months_until_deadline < 3 else 8
    planned_raw = sum(p["estimated_score_delta"] for p in projects)
    scenarios = [
        ScenarioResult(name="Stage 1 Baseline", score_delta=0, execution_risk_penalty=0, adjusted_strength=base, confidence="high", assumptions=["Spreadsheet baseline only."]),
        ScenarioResult(name="Stage 2 Current", score_delta=current_delta, execution_risk_penalty=0, adjusted_strength=round(base + current_delta, 2), confidence="medium", assumptions=["Only verified evidence can move current score."]),
        ScenarioResult(name="Conservative", score_delta=min(3, planned_raw), execution_risk_penalty=projects[0]["execution_risk_penalty"], adjusted_strength=round(base + min(3, planned_raw), 2), confidence="medium", assumptions=["Likely improvements only."]),
        ScenarioResult(name="Target", score_delta=min(planned_cap, planned_raw), execution_risk_penalty=projects[1]["execution_risk_penalty"], adjusted_strength=round(base + min(planned_cap, planned_raw) - projects[1]["execution_risk_penalty"], 2), confidence="medium", assumptions=["Recommended plan completed with credible evidence."]),
        ScenarioResult(name="Stretch", score_delta=min(10, planned_raw + 2), execution_risk_penalty=projects[2]["execution_risk_penalty"], adjusted_strength=round(base + min(10, planned_raw + 2) - projects[2]["execution_risk_penalty"], 2), confidence="low", assumptions=["Ambitious plan; execution risk is material."]),
    ]
    pred_engine = LegacyPredictionEngine()
    adjusted = []
    for pred in stage1_predictions:
        target = scenarios[3]
        adjusted_margin = pred.prediction_margin + target.score_delta - target.execution_risk_penalty
        adjusted.append(
            {
                "school_name": pred.school_name,
                "stage1_category": pred.category,
                "stage2_target_category": pred_engine.category_for_margin(adjusted_margin),
                "movement": f"{pred.category} -> {pred_engine.category_for_margin(adjusted_margin)}",
                "adjusted_margin": round(adjusted_margin, 2),
                "compatibility": pred.compatibility_score,
                "school_specific_action": "지원 이유, 인터뷰 스토리, 추천서 evidence를 학교 fit에 맞춰 조정",
                "risk": "Planned evidence is not counted until verified.",
            }
        )
    return Stage2StrategicAnalysis(
        stage1_score=stage1_score,
        stage1_predictions=stage1_predictions,
        evidence_profile=evidence,
        hook_territories=hooks,
        academic_plan=academic,
        ec_project_plan=projects,
        scenario_results=scenarios,
        adjusted_school_results=adjusted,
        recommendations=[
            "30일 안에 검증 가능한 evidence를 먼저 정리합니다.",
            "planned project는 현재 점수에 반영하지 않고 시나리오에만 반영합니다.",
            "학교별 fit은 legacy margin과 compatibility를 함께 봅니다.",
        ],
        risks=[
            "이 도구는 공식 입학 rubric이 아닙니다.",
            "실행 시간이 부족하면 projected evidence의 신뢰도가 낮아집니다.",
        ],
        assumptions=["Stage 2 refines Stage 1; it does not replace the legacy baseline."],
    )
