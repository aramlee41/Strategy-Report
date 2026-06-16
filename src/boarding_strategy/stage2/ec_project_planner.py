from __future__ import annotations

from .schemas import Stage2Input


def plan_projects(stage2: Stage2Input) -> list[dict]:
    available = stage2.weekly_available_hours
    plans = [
        ("Conservative Plan", min(available, 2), 2.0, "low"),
        ("Target Plan", min(available, 4), 4.0, "medium"),
        ("Stretch Plan", min(available + 2, 7), 6.0, "high"),
    ]
    projects = []
    for title, hours, delta, risk in plans:
        overscheduled = hours > available
        projects.append(
            {
                "title": title,
                "objective": "지원서에서 검증 가능한 EC evidence를 만드는 것",
                "weekly_hours": hours,
                "first_3_steps": ["주제 확정", "멘토/교사 피드백 확보", "4주 단위 산출물 정의"],
                "deliverables": ["활동 로그", "결과물 링크/포트폴리오", "추천서용 evidence memo"],
                "validation_method": "외부 발표, 학교 커뮤니티 기여, 교사 확인",
                "estimated_score_delta": delta,
                "confidence": "medium" if not overscheduled else "low",
                "risk_level": risk,
                "execution_risk_penalty": 2.0 if overscheduled else 0.0,
            }
        )
    return projects
