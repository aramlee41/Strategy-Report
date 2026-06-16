# Stage 1 기본 분석 리포트

## 1. 기본 프로필 요약
- 학생 ID: `student_sample_0001`
- Cohort: `synthetic`
- SSAT: `96.0`
- TOEFL: `112.0`
- GPA: `A`

## 2. Stage 1 기본 점수
- A Academics: `95.65`
- B Boarding Life: `92.5`
- C Co-curricular: `86.5`
- Weighted Application Strength: `91.87`

## 3. 학교별 예측 매트릭스
| School | School Strength | Compatibility | Prediction Margin | Legacy Category | Detriments |
|---|---:|---:|---:|---|---|
| Cushing Academy | 69.57 | 1.00 | 22.30 | Safety School | TOEFL 0.0 / GPA 0.0 |
| Loomis Chaffee School | 87.83 | 1.00 | 4.04 | Competitive Accept | TOEFL 0.0 / GPA 0.0 |
| Phillips Exeter Academy | 95.00 | 1.00 | -3.13 | Competitive Accept | TOEFL 0.0 / GPA 0.0 |

## 4. 가장 큰 감점 요인
- TOEFL/GPA detriment가 발생한 학교는 학업 준비도 보완이 우선입니다.
- Compatibility hard condition failure가 있는 학교는 리스트에서 재검토해야 합니다.

## 5. 빠른 개선 레버
- SSAT가 비어 있으면 legacy logic상 TOEFL/GPA 평균으로 대체되므로 실제 시험 evidence 확보가 중요합니다.
- GPA label과 TOEFL 변환표가 A bucket을 직접 움직입니다.
- 인터뷰/성격, EC strength, leadership, hook은 0-5 입력이 20배 환산되어 B/C bucket에 반영됩니다.

## 6. 모델 한계 및 주의사항
- This tool provides internal strategy estimates only. It does not know or reproduce any school's official admissions rubric. Admissions outcomes are uncertain and holistic. Probability outputs, when available, are scenario-based estimates and must not be interpreted as guarantees.
- The legacy Stage 1 model is preserved for continuity with the spreadsheet. Stage 2 adds strategic analysis based on richer evidence and planning data, but it should not be interpreted as a guarantee of admissions outcome.
