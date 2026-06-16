from .legacy_schemas import (
    CompatibilityResult,
    LegacyPredictionResult,
    LegacySchool,
    LegacySchoolPreferences,
    LegacyStage1Input,
    LegacyStage1Score,
)
from .legacy_score_backend import LegacyScoreBackend
from .legacy_prediction import LegacyPredictionEngine
from .legacy_compatibility import LegacyCompatibilityModel

__all__ = [
    "CompatibilityResult",
    "LegacyCompatibilityModel",
    "LegacyPredictionEngine",
    "LegacyPredictionResult",
    "LegacySchool",
    "LegacySchoolPreferences",
    "LegacyScoreBackend",
    "LegacyStage1Input",
    "LegacyStage1Score",
]
