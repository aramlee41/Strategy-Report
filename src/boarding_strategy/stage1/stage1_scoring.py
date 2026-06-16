from __future__ import annotations

from boarding_strategy.legacy_model import LegacyPredictionEngine, LegacyScoreBackend
from boarding_strategy.legacy_model.legacy_schemas import LegacyPredictionResult, LegacySchool, LegacyStage1Input, LegacyStage1Score


def run_stage1(
    student: LegacyStage1Input,
    schools: list[LegacySchool],
    score_backend: LegacyScoreBackend | None = None,
    prediction_engine: LegacyPredictionEngine | None = None,
) -> tuple[LegacyStage1Score, list[LegacyPredictionResult]]:
    backend = score_backend or LegacyScoreBackend()
    engine = prediction_engine or LegacyPredictionEngine()
    score = backend.calculate(student)
    predictions = [engine.predict(student, score, school) for school in schools]
    predictions.sort(key=lambda x: x.prediction_margin, reverse=True)
    return score, predictions
