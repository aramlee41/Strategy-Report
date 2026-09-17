# Prep LMS Operations

## Entry and Roles

- Staff/admin: `/platform/index.html?portal=staff`.
- Student/family: `/platform/index.html?portal=parent`.
- Admins see all students and maintain school requirements, opportunities, staff,
  and company/marketing events. Consultants see assigned students. Families see
  only linked children and consultant-approved report/progress snapshots.
- Staff calendar sharing is opt-in. Other staff receive only event title,
  date/time/timezone and owner, never private notes or student records.

## Daily Workflow

1. Dashboard: review overdue tasks, next-seven-day tasks and student updates.
   Undated tasks remain visible in a separate section. Calendar subscriptions
   cover school datasets, explicitly shared staff events, company and marketing.
2. Student Management: scan program, Stage, input progress, next meeting/agenda,
   pending tasks and overdue work. Open a student to use the operational tabs.
   Existing Stage 1-5 and their subtabs remain available without a rollback.
3. Meeting Records: save an agenda/reservation or draft notes. Review the proposed
   EC/task/event/award changes, link existing activities, then apply atomically.
   Applied meetings cannot be applied twice. Use a follow-up meeting for corrections.
4. Goals / EC Execution: create semester/break, annual or final consulting goals.
   Compare recorded GPA, dated test scores, actual activities or awards. Add/edit
   milestones and weekly routines. All dated tasks appear in the calendar.
5. Applications: add a school from the dataset. The school requirements become
   an editable student-specific checklist, essay prompts/draft versions and
   interview instructions. Verified deadlines require matching entry years.
6. Resume: save immutable current or explicitly projected versions, then print
   to PDF. Upload a text PDF/TXT for local extraction and review before applying.
7. Student Overview: write a family-facing summary, preview the explicit shared
   goals/tasks/events/meeting summaries, then publish. Later edits do not change
   the already published snapshot. Publication can be revoked.

## Data and Storage

- `student.operations`: additive meetings, goals/milestones/routines, breakPlans,
  plannedActivities, resumeVersions and updates. Existing fields are preserved.
- `student.tasks`, `actionPlans`, `calendarEvents`, `ecs`, `awards`, `applications`:
  existing source records, not a parallel evaluation model. Dashboard task edits
  update the original milestone or application requirement.
- `student.parentPortal.progressSnapshots`: immutable approved public projections.
  Internal meeting notes and unapproved operations are not sent to family clients.
- `prep_workspaces`: private per-account tasks/events/subscriptions/read marker.
  RLS deny-all to anon/authenticated; authenticated Edge service mediates access.
- `__schools.schools[].admissions`: versioned-by-entry-year requirements with
  official source URL and verification date. `__settings.opportunities` is the
  editable opportunity catalogue; company calendars stay in `teamEvents`.
- Saves use optimistic version checks. Conflicts stop the queue rather than
  overwriting another person's work. A 60-second revision check announces new
  shared data; it does not replace a form while someone is typing.
- Derived evaluation/strategy timestamps alone do not trigger student writes.
  Saved report snapshots still trigger persistence. Academics weights unchanged.

## Accuracy Boundaries

- Planned activities are excluded from actual activity counts and current Resume.
  Staff must confirm an activity has started. Projected outcomes remain labeled.
- Missing scores stay unknown. Undated tests are not counted toward goals.
  TOEFL 1-6 and 0-120 scores are separate; Legacy 120-score input requires the
  officially reported comparable score, never a fabricated conversion.
- School GPA is compared only within the selected GPA scale/school/period.
  The existing transcript normalization layer and reports remain unchanged.
- Competition matching uses entered grade and activity tags. It is not an
  admission prediction, qualification approval, or guarantee of an award.
  Staff must check age, residence, school registration and official deadlines.

## Verified Seed Data and Gaps

School admissions seeds checked 2026-09-17:

- Exeter: https://exeter.edu/admissions/apply/
- Loomis: https://www.loomischaffee.org/admission/application-process
- NMH: https://www.nmhschool.org/admission/how-to-apply
  and https://www.nmhschool.org/admission/how-to-apply/application-checklist
- Andover: https://www.andover.edu/Admission/
- St. Andrew's DE: https://www.standrews-de.org/admission/how-to-apply

The first four include confirmed 2027-entry deadlines. St. Andrew's published
annual dates are not silently assigned to a cycle. These five seeds do not
replace the existing full school dataset or administrator edits. The remaining
schools require verified admissions data. Essay questions behind applicant
portals are intentionally not invented; staff can paste the official questions.

Opportunity seeds: AMC 8, John Locke Essay Competition and Scholastic Awards.
Official sources are stored in each record. Unknown next-cycle dates remain
blank; Scholastic residence restrictions are explicitly stated.

Calendar subscriptions use the LMS school dataset, not live Google/Outlook/ICS
feeds. Adding a subscription does not scrape a school website.

Resume/meeting extraction is local and rule-based in this release. It finds
explicit facts, not a comprehensive natural-language AI interpretation. PDF.js
reads text locally (8 MB / 30 pages); image-only scans need OCR beforehand.
No Resume or meeting text is sent to OpenAI. A separate external-AI intake
integration remains pending explicit permission; existing project-generation
features are unchanged. Original Resume PDFs are not uploaded or retained.

## Deployment and Verification

Apply `supabase/schema/workspaces.sql` before deploying the new frontend.
Bundle `index.ts`, `service.mjs`, and the canonical
`platform/parent-portal-model.js` as `model.js` into the `prep-portal` Edge Function.
Custom `auth.getUser()` and membership/assignment checks remain mandatory.

Run:

```powershell
node --test --test-isolation=none tests/operations-model.test.cjs tests/operations-intake.test.cjs tests/portal-server-authorization.test.cjs tests/parent-portal-model.test.cjs tests/portal-cloud-contract.test.cjs
$env:PYTHONPATH='src'
python -m unittest discover -s tests -p 'test_*.py'
node tests/operations-browser.cjs http://127.0.0.1:8765/platform/index.html
```

The browser suite uses isolated authenticated API fixtures and synthetic students;
it does not modify production students. It checks meeting-linked updates, goals,
subscriptions, applications, Resume PDF extraction/printing, approval boundaries,
Stage preservation, and desktop/mobile layouts. Live unauthenticated denial and
database privileges must be checked separately after Edge deployment.
