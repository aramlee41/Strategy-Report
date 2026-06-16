def bounded_adjustment(delta: float, evidence_strength: float, cap: float = 10.0) -> float:
    if evidence_strength < 0.4:
        cap = min(cap, 4.0)
    return max(-cap, min(cap, delta * evidence_strength))
