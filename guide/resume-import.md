# Resume Import

The Resume flow uses `PrepIntake.extractResume` in `platform/resume-parser.js`.
Meeting notes retain the existing explicit-command parser in `operations-intake.js`.
Both feed the existing review/save flow, not a separate student store.

## Parsing And Review

- Recognize education, work, extracurricular, community service, awards, and skills sections.
- Group organization, role, dates and wrapped bullet descriptions. Keep different roles at one organization separate.
- Preserve source text for each candidate. Normalize split year/month tokens only; do not rewrite ambiguous prose.
- Detect name/alias and explicit email/country-code/phone. Require review of name order.
- Do not create school records from diploma descriptions or sentences containing `school`.
- Keep cumulative GPA as source metadata. Never invent semester dates, grades or scales.
- Flag reversed date ranges and block their application until corrected or deselected.
- Keep unclassified text visible. Interests and skill declarations do not become completed activities.
- All candidates start unselected. Staff can edit, reclassify or remove them before saving.

## Persistence

Previous schools use the existing `name` and `notes` fields, not a parallel `school` field.
Current school is an explicit review choice and cannot silently replace a different current school.
Month-only enrollment dates are retained in `intakeSource` rather than inventing days for date inputs.
Selected activities preserve their role, period, descriptions and original evidence.
Existing basic values are not silently overwritten. Contact imports are deduplicated.

This remains local, rule-based extraction. No Resume text is sent to an AI service.
Unusual headings, columns, OCR errors or unstated activity categories may still require review.

## Verification

`tests/resume-parser.test.cjs` covers multi-section parsing and uncertain academic records.
The public test fixture mirrors the reported layout, with synthetic names and contact details.
`tests/resume-import-browser-check.cjs`, invoked by `tests/operations-browser.cjs`, verifies
review, invalid dates, selection-only saves, school schema, multiple roles and contact deduplication.
Browser tests intercept the API and never change real student records.
