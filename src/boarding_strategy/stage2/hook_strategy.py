from __future__ import annotations

from .schemas import Stage2Input


def build_hook_territories(stage2: Stage2Input) -> list[dict]:
    interests = stage2.interests or ["academic curiosity", "community contribution"]
    territories = []
    for idx, interest in enumerate(interests[:4], start=1):
        territories.append(
            {
                "title": f"{interest} 기반 Hook Territory",
                "one_sentence_positioning": f"{interest}를 학생의 학업/EC/에세이 축으로 연결합니다.",
                "authenticity_basis": "기존 관심사와 현재 evidence를 우선 사용합니다.",
                "existing_evidence": [e.description for e in stage2.current_evidence if interest.lower() in e.description.lower()],
                "missing_evidence": ["외부 검증", "지속 기간", "정량적 결과"],
                "flagship_project": f"{interest} 관련 대표 프로젝트 설계",
                "supporting_projects": [f"{interest} 리서치/발표", f"{interest} 커뮤니티 기여"],
                "essay_angles": ["Why this matters to me", "How I contributed to a community"],
                "interview_angles": ["구체적 행동", "실패와 개선", "학교 커뮤니티 기여"],
                "recommender_strategy": "프로젝트를 관찰한 교사/멘토가 evidence를 말할 수 있게 합니다.",
                "estimated_score_delta_range": [1, 3 + idx],
                "confidence": "medium",
                "risks": ["일정이 짧으면 결과물이 얕아질 수 있음", "부모 주도 프로젝트처럼 보이면 감점 위험"],
            }
        )
    return territories
