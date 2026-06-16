from __future__ import annotations

from boarding_strategy.legacy_model.legacy_schemas import LegacyStage1Score

from .schemas import Stage2Input


def build_academic_plan(stage1_score: LegacyStage1Score, stage2: Stage2Input) -> dict:
    academic = stage1_score.academics_A or 0
    biggest = "TOEFL/SSAT conversion detriment" if (stage1_score.toefl_eval_score or 0) < 90 else "teacher recommendation evidence"
    if academic < 75:
        readiness = "needs repair"
    elif academic < 88:
        readiness = "competitive but improvable"
    else:
        readiness = "strong baseline"
    return {
        "current_academic_readiness": readiness,
        "academic_gaps": stage2.academic_goals or [biggest],
        "biggest_academic_lever": biggest,
        "largest_evidence_gap": "현재 성취가 추천서/성적표 comment로 확인되는지",
        "most_time_sensitive_task": "다음 30일 안에 시험/성적표 evidence 수집",
        "test_plan": "TOEFL/SSAT 약점 영역을 4주 단위로 재측정합니다.",
        "teacher_recommendation_plan": "학업 태도와 기여를 관찰한 교사에게 evidence memo를 제공합니다.",
        "estimated_score_delta_range": [0, 5 if stage2.months_until_deadline >= 3 else 2],
        "confidence": "medium",
        "risks": ["기간이 짧으면 점수 개선보다 evidence 정리에 집중해야 함"],
    }
