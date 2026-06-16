from __future__ import annotations

import re
from typing import Any


CELL_REF_RE = re.compile(r"=([A-Z]+)(\d+)([-+])(\d+(?:\.\d+)?)(?:/(\d+(?:\.\d+)?))?$")


def is_formula(value: Any) -> bool:
    return isinstance(value, str) and value.startswith("=")


def evaluate_simple_chain(formula: str, previous_values: dict[str, float]) -> float | None:
    """Evaluate simple workbook chains such as =W13-0.5 or =W23-15/10."""
    m = CELL_REF_RE.match(formula.strip())
    if not m:
        return None
    col, row, op, num, denom = m.groups()
    base = previous_values.get(f"{col}{row}")
    if base is None:
        return None
    delta = float(num) / float(denom or 1)
    return base + delta if op == "+" else base - delta
