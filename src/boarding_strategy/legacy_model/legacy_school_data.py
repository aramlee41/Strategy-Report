from __future__ import annotations

import csv
from pathlib import Path

from .legacy_schemas import LegacySchool
from .legacy_school_strength import school_strength_from_rank


def load_schools_csv(path: str | Path) -> list[LegacySchool]:
    with open(path, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    schools: list[LegacySchool] = []
    for idx, row in enumerate(rows, start=1):
        rank = _float(row.get("rank")) or idx
        sports = [s.strip() for s in (row.get("sports_offered") or "").split("|") if s.strip()]
        schools.append(
            LegacySchool(
                school_id=row.get("school_id") or f"school_{idx:04d}",
                school_name=row.get("school_name") or row.get("name") or f"School {idx}",
                rank=rank,
                school_strength=_float(row.get("school_strength")) or school_strength_from_rank(rank),
                acceptance_rate=_float(row.get("acceptance_rate")),
                school_type=row.get("school_type") or None,
                town_state=row.get("town_state") or None,
                region=row.get("region") or None,
                surroundings=row.get("surroundings") or None,
                religion=row.get("religion") or None,
                student_body_size=row.get("student_body_size") or None,
                boarding_percentage=row.get("boarding_percentage") or None,
                international_student_percentage=row.get("international_student_percentage") or None,
                average_travel_time_to_airport_minutes=_float(row.get("average_travel_time_to_airport_minutes")),
                ssat_required=_bool(row.get("ssat_required")),
                esl_available=_bool(row.get("esl_available")),
                sao=_bool(row.get("sao")),
                gateway=_bool(row.get("gateway")),
                application_portal=row.get("application_portal") or None,
                application_deadline=row.get("application_deadline") or None,
                results_date=row.get("results_date") or None,
                enrollment_deadline=row.get("enrollment_deadline") or None,
                sports_offered=sports,
                source_sheet=row.get("source_sheet") or "sample",
                source_row=int(_float(row.get("source_row")) or idx),
            )
        )
    return schools


def _float(value):
    try:
        if value in (None, ""):
            return None
        return float(value)
    except (TypeError, ValueError):
        return None


def _bool(value):
    if value is None or value == "":
        return None
    return str(value).strip().lower() in {"true", "yes", "1", "x"}

