from __future__ import annotations

from .schemas import EvidenceItem, Stage2Input


def evidence_profile(stage2: Stage2Input) -> dict:
    all_items = stage2.current_evidence + stage2.planned_evidence + stage2.verified_evidence
    by_status = {}
    for item in all_items:
        by_status.setdefault(item.status, []).append(item.model_dump())
    verified_strength = sum(i.strength_0_1 for i in stage2.verified_evidence)
    planned_strength = sum(i.strength_0_1 for i in stage2.planned_evidence)
    return {
        "by_status": by_status,
        "verified_count": len(stage2.verified_evidence),
        "planned_count": len(stage2.planned_evidence),
        "verified_strength": round(verified_strength, 2),
        "planned_strength": round(planned_strength, 2),
        "warning": "Planned evidence is not counted as current verified strength.",
    }


def verified_delta(items: list[EvidenceItem], cap: float = 10) -> float:
    return min(cap, sum(max(0, i.rubric_delta) * max(0, min(1, i.strength_0_1)) for i in items if i.status == "verified"))
