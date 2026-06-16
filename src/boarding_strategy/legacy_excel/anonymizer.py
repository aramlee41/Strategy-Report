from __future__ import annotations

import csv
from pathlib import Path


class NameAnonymizer:
    def __init__(self) -> None:
        self.name_to_alias: dict[str, str] = {}

    def alias(self, name: str | None) -> str:
        name = str(name or "").strip()
        if not name:
            return ""
        if name not in self.name_to_alias:
            self.name_to_alias[name] = f"student_{len(self.name_to_alias) + 1:04d}"
        return self.name_to_alias[name]

    def write_private_map(self, path: str | Path) -> None:
        path = Path(path)
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["student_alias", "private_name"])
            for name, alias in self.name_to_alias.items():
                writer.writerow([alias, name])
