import unittest

from boarding_strategy.legacy_model import LegacyCompatibilityModel, LegacySchool, LegacySchoolPreferences


class CompatibilityTest(unittest.TestCase):
    def test_explains_match_and_hard_failure(self):
        prefs = LegacySchoolPreferences(us_region="Northeast", athletic_condition_required=True, conditional_sport="Golf")
        school = LegacySchool(
            school_id="s1",
            school_name="Sample School",
            school_strength=80,
            region="Northeast",
            sports_offered=["Soccer"],
        )
        result = LegacyCompatibilityModel().calculate(prefs, school)
        self.assertTrue(result.region_match)
        self.assertTrue(result.hard_condition_failures)
        self.assertIn("Required sport", result.hard_condition_failures[0])


if __name__ == "__main__":
    unittest.main()
