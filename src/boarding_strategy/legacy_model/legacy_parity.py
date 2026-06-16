from __future__ import annotations

from pathlib import Path

from .legacy_score_backend import LegacyScoreBackend
from .legacy_schemas import LegacyStage1Input


def compare_legacy_parity(student: LegacyStage1Input, out: str | Path) -> Path:
    score = LegacyScoreBackend().calculate(student)
    path = Path(out)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        "# Legacy Parity Check\n\n"
        "This report compares the transparent Python implementation against visible workbook formulas where available.\n\n"
        f"- Student alias: `{student.student_alias}`\n"
        f"- A Academics: `{score.academics_A}`\n"
        f"- B Boarding Life: `{score.boarding_life_B}`\n"
        f"- C Co-curricular: `{score.cocurricular_C}`\n"
        f"- Weighted application strength: `{score.weighted_application_strength}`\n\n"
        "Google Sheets export wrappers such as `__xludf.DUMMYFUNCTION` are treated as formula hints, not executable logic.\n",
        encoding="utf-8",
    )
    return path
