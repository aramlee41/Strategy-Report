import unittest

from boarding_strategy.legacy_model import LegacySchool, LegacyStage1Input
from boarding_strategy.stage1 import run_stage1


class Stage1PipelineTest(unittest.TestCase):
    def test_pipeline_outputs_prediction(self):
        student = LegacyStage1Input(
            student_alias="student_0001",
            ssat_percentile=96,
            toefl_score=112,
            gpa_label="A",
            english_fluency_0_100=95,
            personality_interview_0_5=4.5,
            boarding_fit_recommendation_0_100=100,
            ec_strength_0_5=4.5,
            leadership_0_5=4.5,
            hook_0_5=4.0,
        )
        schools = [LegacySchool(school_id="s1", school_name="Sample", school_strength=90)]
        score, predictions = run_stage1(student, schools)
        self.assertAlmostEqual(score.weighted_application_strength, 91.87)
        self.assertEqual(len(predictions), 1)


if __name__ == "__main__":
    unittest.main()
