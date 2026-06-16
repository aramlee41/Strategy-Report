from __future__ import annotations

from pathlib import Path

from boarding_strategy.legacy_model.legacy_schemas import LegacyPredictionResult, LegacyStage1Input, LegacyStage1Score
from boarding_strategy.stage2.schemas import Stage2StrategicAnalysis


GUARDRAIL = (
    "This tool provides internal strategy estimates only. It does not know or reproduce any school's official admissions rubric. "
    "Admissions outcomes are uncertain and holistic. Probability outputs, when available, are scenario-based estimates and must not be interpreted as guarantees."
)
LEGACY_NOTE = (
    "The legacy Stage 1 model is preserved for continuity with the spreadsheet. Stage 2 adds strategic analysis based on richer evidence and planning data, "
    "but it should not be interpreted as a guarantee of admissions outcome."
)


def render_stage1_report(student: LegacyStage1Input, score: LegacyStage1Score, predictions: list[LegacyPredictionResult], out: str | Path | None = None) -> str:
    rows = "\n".join(
        f"| {p.school_name} | {p.school_strength:.2f} | {p.compatibility_score:.2f} | {p.prediction_margin:.2f} | {p.category} | TOEFL {p.toefl_detriment:.1f} / GPA {p.gpa_detriment:.1f} |"
        for p in predictions[:20]
    )
    text = f"""# Stage 1 기본 분석 리포트

## 1. 기본 프로필 요약
- 학생 ID: `{student.student_alias}`
- Cohort: `{student.cohort}`
- SSAT: `{student.ssat_percentile}`
- TOEFL: `{student.toefl_score}`
- GPA: `{student.gpa_label}`

## 2. Stage 1 기본 점수
- A Academics: `{score.academics_A}`
- B Boarding Life: `{score.boarding_life_B}`
- C Co-curricular: `{score.cocurricular_C}`
- Weighted Application Strength: `{score.weighted_application_strength}`

## 3. 학교별 예측 매트릭스
| School | School Strength | Compatibility | Prediction Margin | Legacy Category | Detriments |
|---|---:|---:|---:|---|---|
{rows}

## 4. 가장 큰 감점 요인
- TOEFL/GPA detriment가 발생한 학교는 학업 준비도 보완이 우선입니다.
- Compatibility hard condition failure가 있는 학교는 리스트에서 재검토해야 합니다.

## 5. 빠른 개선 레버
- SSAT가 비어 있으면 legacy logic상 TOEFL/GPA 평균으로 대체되므로 실제 시험 evidence 확보가 중요합니다.
- GPA label과 TOEFL 변환표가 A bucket을 직접 움직입니다.
- 인터뷰/성격, EC strength, leadership, hook은 0-5 입력이 20배 환산되어 B/C bucket에 반영됩니다.

## 6. 모델 한계 및 주의사항
- {GUARDRAIL}
- {LEGACY_NOTE}
"""
    if score.missing_data_warnings:
        text += "\n## Validation Warnings\n" + "\n".join(f"- {w}" for w in score.missing_data_warnings) + "\n"
    if out:
        path = Path(out)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8")
    return text


def render_stage2_report(stage2: Stage2StrategicAnalysis, out: str | Path | None = None) -> str:
    scenarios = "\n".join(
        f"| {s.name} | {s.score_delta:.1f} | {s.execution_risk_penalty:.1f} | {s.adjusted_strength:.1f} | {s.confidence} |"
        for s in stage2.scenario_results
    )
    schools = "\n".join(
        f"| {r['school_name']} | {r['stage1_category']} | {r['stage2_target_category']} | {r['compatibility']:.2f} | {r['school_specific_action']} |"
        for r in stage2.adjusted_school_results[:20]
    )
    hooks = "\n".join(f"- **{h['title']}**: {h['one_sentence_positioning']} / flagship: {h['flagship_project']}" for h in stage2.hook_territories)
    projects = "\n".join(f"- **{p['title']}**: {p['weekly_hours']} hrs/week, delta {p['estimated_score_delta']}, risk {p['risk_level']}" for p in stage2.ec_project_plan)
    text = f"""# Stage 2 전략 리포트

## 1. Executive Summary
- 현재 위치: Stage 1 strength `{stage2.stage1_score.weighted_application_strength}`
- Stage 1에서 Stage 2로 바뀌는 점: proxy score가 아니라 evidence, hook, 실행 가능성, scenario를 분리합니다.
- 가장 강한 hook 방향: {stage2.hook_territories[0]['title'] if stage2.hook_territories else '미정'}
- 가장 큰 리스크: planned evidence를 완료 evidence처럼 착각하는 것
- 30일 우선순위: evidence 정리, 학교별 fit 문장, 추천서 관찰 포인트 확보

## 2. Stage 1 Baseline Recap
- A Academics: `{stage2.stage1_score.academics_A}`
- B Boarding Life: `{stage2.stage1_score.boarding_life_B}`
- C Co-curricular: `{stage2.stage1_score.cocurricular_C}`

## 3. Detailed Evidence Profile
- Verified evidence count: `{stage2.evidence_profile['verified_count']}`
- Planned evidence count: `{stage2.evidence_profile['planned_count']}`
- 주의: {stage2.evidence_profile['warning']}

## 4. Hook Strategy
{hooks}

## 5. EC and Project Roadmap
{projects}

## 6. Academic Plan
- The biggest academic lever is: {stage2.academic_plan['biggest_academic_lever']}
- The largest evidence gap is: {stage2.academic_plan['largest_evidence_gap']}
- The most time-sensitive academic task is: {stage2.academic_plan['most_time_sensitive_task']}

## 7. Scenario Simulation
| Scenario | Score Delta | Risk Penalty | Adjusted Strength | Confidence |
|---|---:|---:|---:|---|
{scenarios}

## 8. School-by-School Strategy Matrix
| School | Stage 1 | Stage 2 Target | Compatibility | Action |
|---|---|---|---:|---|
{schools}

## 9. Next 30 / 60 / 90 Days
- 30일: 현재 evidence inventory, teacher comment, 시험 리포트, 활동 산출물 정리
- 60일: flagship project 1차 산출물, 인터뷰 스토리, 학교별 why fit 작성
- 90일: 외부 검증/발표/추천서 evidence 확보, 원서 activity wording 초안

## 10. Ethical and Modeling Guardrails
- {GUARDRAIL}
- {LEGACY_NOTE}
- Planned evidence는 current score에 반영하지 않고 scenario score에만 반영합니다.
"""
    if out:
        path = Path(out)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8")
    return text


def render_full_report(student, score, predictions, analysis, out: str | Path | None = None) -> str:
    text = render_stage1_report(student, score, predictions) + "\n\n---\n\n" + render_stage2_report(analysis)
    if out:
        path = Path(out)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8")
    return text
