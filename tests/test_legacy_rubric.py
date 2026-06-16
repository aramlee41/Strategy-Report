import unittest

from boarding_strategy.legacy_model.legacy_rubric import LegacyRubricCategory, LegacyRubricItem, score_rubric


class RubricTest(unittest.TestCase):
    def test_mismatch_warning(self):
        categories = [
            LegacyRubricCategory(
                name="Arts",
                declared_points=10,
                items=[
                    LegacyRubricItem(category="Arts", name="Music", declared_points=5, score=5),
                    LegacyRubricItem(category="Arts", name="Theater", declared_points=5, score=5),
                    LegacyRubricItem(category="Arts", name="Art", declared_points=5, score=0),
                ],
            )
        ]
        result = score_rubric(categories)
        self.assertTrue(result.validation_warnings)


if __name__ == "__main__":
    unittest.main()
