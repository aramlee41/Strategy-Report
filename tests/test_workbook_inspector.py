import unittest
from pathlib import Path

from boarding_strategy.legacy_excel.workbook_inspector import inspect_workbook


class WorkbookInspectorTest(unittest.TestCase):
    def test_missing_file_not_silenced(self):
        with self.assertRaises(FileNotFoundError):
            inspect_workbook(Path("missing.xlsx"))


if __name__ == "__main__":
    unittest.main()
