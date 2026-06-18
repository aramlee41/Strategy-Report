import unittest

from boarding_strategy.legacy_model import LegacyFamilyConnectionProfile, LegacySchool, LegacyStage1Input
from boarding_strategy.legacy_model.legacy_prediction import LegacyPredictionEngine
from boarding_strategy.legacy_model.legacy_schemas import LegacyStage1Score


class LegacyFamilyConnectionTest(unittest.TestCase):
    def test_legacy_applies_only_to_matching_school_and_is_capped(self):
        student = LegacyStage1Input(
            student_alias="student_legacy",
            legacy_connections=[
                LegacyFamilyConnectionProfile(
                    has_legacy_connection="Yes",
                    legacy_school_name="Phillips Exeter Academy",
                    legacy_relationship_type="Parent attended the school",
                    legacy_connection_strength="Strong",
                )
            ],
        )
        score = LegacyStage1Score(weighted_application_strength=88, toefl_eval_score=95, gpa_eval_score=95)
        exeter = LegacySchool(school_id="pea", school_name="Phillips Exeter Academy", school_strength=90)
        other = LegacySchool(school_id="other", school_name="Other School", school_strength=90)
        engine = LegacyPredictionEngine()

        exeter_result = engine.predict(student, score, exeter)
        other_result = engine.predict(student, score, other)

        self.assertGreater(exeter_result.legacy_contribution, 0)
        self.assertLessEqual(exeter_result.legacy_contribution, 3.0)
        self.assertEqual(exeter_result.base_applicant_score, 88)
        self.assertEqual(exeter_result.adjusted_applicant_score, 88 + exeter_result.legacy_contribution)
        self.assertEqual(other_result.legacy_contribution, 0)

    def test_prefer_not_to_answer_is_not_penalized(self):
        student = LegacyStage1Input(
            student_alias="student_private",
            legacy_connections=[LegacyFamilyConnectionProfile(has_legacy_connection="Prefer not to answer")],
        )
        score = LegacyStage1Score(weighted_application_strength=88, toefl_eval_score=95, gpa_eval_score=95)
        school = LegacySchool(school_id="s1", school_name="Sample School", school_strength=90)
        result = LegacyPredictionEngine().predict(student, score, school)

        self.assertEqual(result.legacy_contribution, 0)
        self.assertEqual(result.adjusted_applicant_score, result.base_applicant_score)
        self.assertEqual(result.legacy_impact.has_legacy_connection, "Prefer not to answer")


if __name__ == "__main__":
    unittest.main()
