import unittest

from boarding_strategy.legacy_model import LegacyPredictionResult, LegacyStage1Score
from boarding_strategy.stage2 import run_stage2
from boarding_strategy.stage2.schemas import EvidenceItem, Stage2Input


class Stage2PipelineTest(unittest.TestCase):
    def test_planned_projects_do_not_increase_current_score(self):
        score = LegacyStage1Score(weighted_application_strength=80, academics_A=80, boarding_life_B=80, cocurricular_C=80)
        pred = LegacyPredictionResult(
            student_alias="student_0001",
            school_id="s1",
            school_name="Sample",
            school_strength=85,
            weighted_application_strength=80,
            prediction_margin=-5,
            category="Competitive Accept",
            toefl_detriment=0,
            gpa_detriment=0,
            global_adjustment=0,
            compatibility_score=1,
            compatibility_explanation="neutral",
        )
        stage2 = Stage2Input(
            student_alias="student_0001",
            planned_evidence=[EvidenceItem(category="hook", description="planned", status="planned", strength_0_1=1, rubric_delta=10)],
            weekly_available_hours=4,
        )
        analysis = run_stage2(score, [pred], stage2)
        current = [s for s in analysis.scenario_results if s.name == "Stage 2 Current"][0]
        self.assertEqual(current.score_delta, 0)
        self.assertIn("Planned evidence", analysis.evidence_profile["warning"])


if __name__ == "__main__":
    unittest.main()
