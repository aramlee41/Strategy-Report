# Boarding School Prep LMS / Strategy Report

This repository contains the local prototype UI plus a Python migration of the legacy Excel admissions strategy workbook.

## Two-stage engine

Stage 1 preserves the legacy spreadsheet model for continuity. It uses basic student inputs and reproduces the visible Inboardy-style A/B/C scoring logic:

- A Academics: SSAT, TOEFL, GPA
- B Boarding Life: English fluency, personality/interview, boarding fit/recommendation
- C Co-curricular: EC strength, leadership, hook
- Weighted Application Strength: `average(A * 1.3, B * 0.7, C * 1.0)`

Stage 2 refines Stage 1 with richer strategic evidence. It does not replace the legacy baseline. It adds:

- detailed rubric analysis
- current vs planned vs verified evidence separation
- hook territories
- EC/project roadmap
- academic planning
- scenario deltas
- school-by-school strategic movement
- Korean parent-facing reports

## Migrated workbook areas

The migration tooling inspects and extracts from sheets such as:

- `Application Rubric`
- student-specific rubric sheets
- `Official - Inboardy Score Look-`
- `Full-Schools Analysis`
- `School List Analysis`
- `Compatability Backend`
- `Misc. Backend Stuff`
- `Student Input  Edit`
- `Inboardy - Student Input`
- `Inboardy Score Backend`
- `School Rankings`
- `Full School Rankings`
- `Inboardy Set-up`
- `School Preference Results`
- `Sheet19`

## TOEFL and GPA conversion

The Stage 1 engine reads or configures the legacy conversion tables:

- TOEFL table from `Inboardy Score Backend` columns V:W
- GPA table from `Inboardy Score Backend` columns X:Y

If SSAT is missing, the legacy fallback is preserved:

`ssat_eval_score = average(toefl_eval_score, gpa_eval_score)`

The engine emits a warning whenever SSAT is imputed.

## School prediction margin

The legacy prediction margin is:

`weighted_application_strength - school_strength - global_adjustment - TOEFL_detriment - GPA_detriment`

TOEFL detriment:

`max(0, school_strength - toefl_eval_score)`

GPA detriment:

`max(0, (school_strength - gpa_eval_score) / 3)`

Legacy categories are labels, not probabilities:

- `Competitive Accept`
- `Goal School (Reach)`
- `Likely Accept`
- `Safety School`
- `Dream School`
- `Extremely Unlikely Accept`

## Compatibility

The compatibility model compares student preferences with school attributes:

- region
- surroundings
- religion
- size
- boarding percentage
- international percentage
- airport travel time
- sports
- SSAT optional / ESL needs

`No Preference` does not penalize. Hard conditions such as required region, religion, or sport are surfaced as hard-condition failures.

## Detailed rubric normalization

The rubric parser preserves category/item labels and flags point inconsistencies. For example, if a category says 10 points but visible subitems sum to 15, the validation report flags it rather than hiding the mismatch.

## Scenario deltas

Stage 2 separates:

- `current_evidence`
- `planned_evidence`
- `projected_evidence`
- `verified_evidence`

Planned evidence does not increase current score. It only appears in Conservative, Target, and Stretch scenarios, with caps and execution-risk penalties.

## CLI

Use the bundled or local Python with `PYTHONPATH=src`.

```powershell
$env:PYTHONPATH="src"
python -m boarding_strategy.cli inspect-legacy-workbook --workbook "C:\Users\USER\Desktop\미한 보딩 입학 예측 모델.xlsx" --out data/private/migration_manifest.json
python -m boarding_strategy.cli import-legacy-workbook --workbook "C:\Users\USER\Desktop\미한 보딩 입학 예측 모델.xlsx" --out-dir data/private/extracted_tables --anonymize true
python -m boarding_strategy.cli validate-legacy-migration --manifest data/private/migration_manifest.json --extracted-dir data/private/extracted_tables
python -m boarding_strategy.cli run-stage1 --student data/sample/sample_student_stage1.yaml --schools data/sample/sample_target_schools.csv --legacy-config data/sample/sample_legacy_model_config.yaml --out reports/stage1_report.md
python -m boarding_strategy.cli run-stage2 --student-stage1 data/sample/sample_student_stage1.yaml --student-stage2 data/sample/sample_student_stage2.yaml --schools data/sample/sample_target_schools.csv --projects data/sample/sample_project_library.yaml --legacy-config data/sample/sample_legacy_model_config.yaml --out reports/stage2_strategy_report.md
python -m boarding_strategy.cli full-report --student-stage1 data/sample/sample_student_stage1.yaml --student-stage2 data/sample/sample_student_stage2.yaml --schools data/sample/sample_target_schools.csv --projects data/sample/sample_project_library.yaml --history data/sample/sample_historical_outcomes.csv --legacy-config data/sample/sample_legacy_model_config.yaml --out reports/full_strategy_report.md
```

## Reports

Stage 1 reports include:

- basic profile summary
- A/B/C scores
- weighted application strength
- school prediction matrix
- TOEFL/GPA detriments
- compatibility issues
- quick improvement levers
- model limitations

Stage 2 reports include:

- executive summary
- baseline recap
- evidence profile
- hook strategy
- EC/project roadmap
- academic plan
- scenario simulation
- school-by-school strategy matrix
- next 30/60/90 days
- ethical and modeling guardrails

## Privacy

The workbook contains real student-like names and admissions records. Extracted workbook outputs belong under `data/private/` and are ignored by git. Private reports belong under `reports/private/`.

Committed sample files use synthetic data only.

## Required warnings

This tool provides internal strategy estimates only. It does not know or reproduce any school's official admissions rubric. Admissions outcomes are uncertain and holistic. Probability outputs, when available, are scenario-based estimates and must not be interpreted as guarantees.

The legacy Stage 1 model is preserved for continuity with the spreadsheet. Stage 2 adds strategic analysis based on richer evidence and planning data, but it should not be interpreted as a guarantee of admissions outcome.
