import unittest

from boarding_strategy.legacy_model.legacy_score_backend import LegacyScoreBackend
from boarding_strategy.legacy_model.legacy_schemas import LegacyStage1Input


class LegacyScoreBackendTest(unittest.TestCase):
    def fixture(self, **patch):
        data = dict(
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
        data.update(patch)
        return LegacyStage1Input(**data)

    def test_weighted_score_matches_legacy_fixture(self):
        score = LegacyScoreBackend().calculate(self.fixture())
        self.assertAlmostEqual(score.toefl_eval_score, 96)
        self.assertAlmostEqual(score.gpa_eval_score, 95)
        self.assertAlmostEqual(score.academics_A, 95.65)
        self.assertAlmostEqual(score.boarding_life_B, 92.5)
        self.assertAlmostEqual(score.cocurricular_C, 86.5)
        self.assertAlmostEqual(score.weighted_application_strength, 91.87)

    def test_missing_ssat_imputes_average(self):
        score = LegacyScoreBackend().calculate(self.fixture(ssat_percentile=None))
        self.assertAlmostEqual(score.ssat_eval_score, 95.5)
        self.assertTrue(any("SSAT missing" in w for w in score.missing_data_warnings))

    def test_gpa_lookup(self):
        backend = LegacyScoreBackend()
        warnings = []
        self.assertEqual(backend.gpa_eval("A+", warnings), 100)
        self.assertEqual(backend.gpa_eval("A", warnings), 95)
        self.assertEqual(backend.gpa_eval("B", warnings), 63)
        self.assertEqual(backend.gpa_eval("D and Below", warnings), 30)


if __name__ == "__main__":
    unittest.main()
