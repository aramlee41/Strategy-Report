from __future__ import annotations

import re
from typing import Any

from pydantic import BaseModel, Field


class LegacyRubricItem(BaseModel):
    category: str
    name: str
    declared_points: float | None = None
    value_type: str = "score"
    max_points: float | None = None
    score: float | bool | None = None
    evidence_text: str | None = None
    evaluator_notes: str | None = None
    source_cell: str | None = None
    warnings: list[str] = Field(default_factory=list)


class LegacyRubricCategory(BaseModel):
    name: str
    declared_points: float | None = None
    items: list[LegacyRubricItem] = Field(default_factory=list)
    source_sheet: str | None = None
    source_range: str | None = None


class LegacyDetailedRubricScore(BaseModel):
    raw_total: float
    normalized_total_100: float
    category_scores: dict[str, float] = Field(default_factory=dict)
    item_scores: list[LegacyRubricItem] = Field(default_factory=list)
    boolean_flags: dict[str, bool] = Field(default_factory=dict)
    evidence_notes: list[str] = Field(default_factory=list)
    validation_warnings: list[str] = Field(default_factory=list)
    confidence_level: str = "medium"


POINT_RE = re.compile(r"\[(\d+(?:\.\d+)?)\s*points?\]", re.I)


def points_from_label(label: Any) -> float | None:
    m = POINT_RE.search(str(label or ""))
    return float(m.group(1)) if m else None


def clean_label(label: Any) -> str:
    return re.sub(r"\s*\[\d+(?:\.\d+)?\s*points?\]", "", str(label or ""), flags=re.I).strip()


def score_rubric(categories: list[LegacyRubricCategory], normalize_to: float = 100.0) -> LegacyDetailedRubricScore:
    warnings: list[str] = []
    category_scores: dict[str, float] = {}
    item_scores: list[LegacyRubricItem] = []
    booleans: dict[str, bool] = {}
    total = 0.0
    declared_total = 0.0
    for cat in categories:
        cat_total = 0.0
        item_declared = 0.0
        for item in cat.items:
            item_scores.append(item)
            if isinstance(item.score, bool):
                booleans[f"{cat.name}:{item.name}"] = item.score
            elif isinstance(item.score, (int, float)):
                cat_total += float(item.score)
            if item.declared_points:
                item_declared += item.declared_points
        if cat.declared_points and item_declared and abs(cat.declared_points - item_declared) > 0.01:
            warnings.append(f"Rubric point mismatch in {cat.name}: header {cat.declared_points}, items sum {item_declared}.")
        total += cat_total
        declared_total += cat.declared_points or item_declared
        category_scores[cat.name] = round(cat_total, 2)
    normalized = total / (declared_total or normalize_to) * normalize_to
    return LegacyDetailedRubricScore(
        raw_total=round(total, 2),
        normalized_total_100=round(normalized, 2),
        category_scores=category_scores,
        item_scores=item_scores,
        boolean_flags=booleans,
        validation_warnings=warnings,
        confidence_level="medium" if warnings else "high",
    )

