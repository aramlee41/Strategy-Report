import unittest
from pathlib import Path


class PrivacyGuardrailsTest(unittest.TestCase):
    def test_private_paths_are_ignored(self):
        text = Path(".gitignore").read_text(encoding="utf-8")
        self.assertIn("data/private/*", text)
        self.assertIn("reports/private/*", text)
        self.assertIn("*.xlsx", text)


if __name__ == "__main__":
    unittest.main()
