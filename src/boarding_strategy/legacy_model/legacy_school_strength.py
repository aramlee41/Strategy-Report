def school_strength_from_rank(rank: float, top_strength: float = 95.0, decrement: float = 15 / 23) -> float:
    """Legacy display logic: top school starts near 95 and decreases by about 15/23 per rank."""
    return round(top_strength - (float(rank) - 1) * decrement, 4)

