import unittest

from boarding_strategy.legacy_model import LegacyStage1Input
from boarding_strategy.legacy_model.legacy_score_backend import LegacyScoreBackend
from boarding_strategy.report import render_stage1_report


class ReportGenerationTest(unittest.TestCase):
    def test_stage1_report_contains_guardrail(self):
        student = LegacyStage1Input(student_alias="student_0001", toefl_score=112, gpa_label="A")
        score = LegacyScoreBackend().calculate(student)
        report = render_stage1_report(student, score, [])
        self.assertIn("internal strategy estimates", report)
        self.assertIn("Stage 1 기본 분석", report)


if __name__ == "__main__":
    unittest.main()
