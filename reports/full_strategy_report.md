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


---

# Stage 2 전략 리포트

## 1. Executive Summary
- 현재 위치: Stage 1 strength `91.87`
- Stage 1에서 Stage 2로 바뀌는 점: proxy score가 아니라 evidence, hook, 실행 가능성, scenario를 분리합니다.
- 가장 강한 hook 방향: applied math 기반 Hook Territory
- 가장 큰 리스크: planned evidence를 완료 evidence처럼 착각하는 것
- 30일 우선순위: evidence 정리, 학교별 fit 문장, 추천서 관찰 포인트 확보

## 2. Stage 1 Baseline Recap
- A Academics: `95.65`
- B Boarding Life: `92.5`
- C Co-curricular: `86.5`

## 3. Detailed Evidence Profile
- Verified evidence count: `1`
- Planned evidence count: `1`
- 주의: Planned evidence is not counted as current verified strength.

## 4. Hook Strategy
- **applied math 기반 Hook Territory**: applied math를 학생의 학업/EC/에세이 축으로 연결합니다. / flagship: applied math 관련 대표 프로젝트 설계
- **community sports analytics 기반 Hook Territory**: community sports analytics를 학생의 학업/EC/에세이 축으로 연결합니다. / flagship: community sports analytics 관련 대표 프로젝트 설계

## 5. EC and Project Roadmap
- **Conservative Plan**: 2 hrs/week, delta 2.0, risk low
- **Target Plan**: 4 hrs/week, delta 4.0, risk medium
- **Stretch Plan**: 7 hrs/week, delta 6.0, risk high

## 6. Academic Plan
- The biggest academic lever is: teacher recommendation evidence
- The largest evidence gap is: 현재 성취가 추천서/성적표 comment로 확인되는지
- The most time-sensitive academic task is: 다음 30일 안에 시험/성적표 evidence 수집

## 7. Scenario Simulation
| Scenario | Score Delta | Risk Penalty | Adjusted Strength | Confidence |
|---|---:|---:|---:|---|
| Stage 1 Baseline | 0.0 | 0.0 | 91.9 | high |
| Stage 2 Current | 1.6 | 0.0 | 93.5 | medium |
| Conservative | 3.0 | 0.0 | 94.9 | medium |
| Target | 8.0 | 0.0 | 99.9 | medium |
| Stretch | 10.0 | 2.0 | 99.9 | low |

## 8. School-by-School Strategy Matrix
| School | Stage 1 | Stage 2 Target | Compatibility | Action |
|---|---|---|---:|---|
| Cushing Academy | Safety School | Safety School | 1.00 | 지원 이유, 인터뷰 스토리, 추천서 evidence를 학교 fit에 맞춰 조정 |
| Loomis Chaffee School | Competitive Accept | Safety School | 1.00 | 지원 이유, 인터뷰 스토리, 추천서 evidence를 학교 fit에 맞춰 조정 |
| Phillips Exeter Academy | Competitive Accept | Competitive Accept | 1.00 | 지원 이유, 인터뷰 스토리, 추천서 evidence를 학교 fit에 맞춰 조정 |

## 9. Next 30 / 60 / 90 Days
- 30일: 현재 evidence inventory, teacher comment, 시험 리포트, 활동 산출물 정리
- 60일: flagship project 1차 산출물, 인터뷰 스토리, 학교별 why fit 작성
- 90일: 외부 검증/발표/추천서 evidence 확보, 원서 activity wording 초안

## 10. Ethical and Modeling Guardrails
- This tool provides internal strategy estimates only. It does not know or reproduce any school's official admissions rubric. Admissions outcomes are uncertain and holistic. Probability outputs, when available, are scenario-based estimates and must not be interpreted as guarantees.
- The legacy Stage 1 model is preserved for continuity with the spreadsheet. Stage 2 adds strategic analysis based on richer evidence and planning data, but it should not be interpreted as a guarantee of admissions outcome.
- Planned evidence는 current score에 반영하지 않고 scenario score에만 반영합니다.
