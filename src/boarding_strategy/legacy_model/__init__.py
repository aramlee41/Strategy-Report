from .legacy_schemas import (
    CompatibilityResult,
    LegacyFamilyConnectionImpact,
    LegacyFamilyConnectionProfile,
    LegacyPredictionResult,
    LegacySchool,
    LegacySchoolPreferences,
    LegacyStage1Input,
    LegacyStage1Score,
)
from .legacy_family_connection import calculate_legacy_family_connection
from .legacy_score_backend import LegacyScoreBackend
from .legacy_prediction import LegacyPredictionEngine
from .legacy_compatibility import LegacyCompatibilityModel

__all__ = [
    "CompatibilityResult",
    "LegacyFamilyConnectionImpact",
    "LegacyFamilyConnectionProfile",
    "LegacyCompatibilityModel",
    "calculate_legacy_family_connection",
    "LegacyPredictionEngine",
    "LegacyPredictionResult",
    "LegacySchool",
    "LegacySchoolPreferences",
    "LegacyScoreBackend",
    "LegacyStage1Input",
    "LegacyStage1Score",
]
