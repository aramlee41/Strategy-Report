import unittest

from boarding_strategy.legacy_model.legacy_prediction import LegacyPredictionEngine


class LegacyPredictionTest(unittest.TestCase):
    def test_category_boundaries(self):
        engine = LegacyPredictionEngine()
        self.assertEqual(engine.category_for_margin(0), "Competitive Accept")
        self.assertEqual(engine.category_for_margin(6), "Competitive Accept")
        self.assertEqual(engine.category_for_margin(-6), "Competitive Accept")
        self.assertEqual(engine.category_for_margin(-16), "Goal School (Reach)")
        self.assertEqual(engine.category_for_margin(-26), "Dream School")
        self.assertEqual(engine.category_for_margin(-26.01), "Extremely Unlikely Accept")
        self.assertEqual(engine.category_for_margin(12), "Likely Accept")
        self.assertEqual(engine.category_for_margin(12.01), "Safety School")


if __name__ == "__main__":
    unittest.main()
