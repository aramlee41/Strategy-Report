# Family Portal: first delivery

The existing Stage 1–5 LMS remains at `/platform/index.html`. After staff login,
use **학부모 포털** in the sidebar. Select a student, enter the parent's email,
enable the portal, and select **학부모 화면 미리보기**. Students with the same
parent email appear together, restricted to the current staff member's students.

## Implemented workflows

- Parent dashboard, student/program overview, updates, payment schedule, contact details.
- Separate application sections reuse the existing basic, school, transcript,
  test, activity and award forms, without staff assignment controls.
- Drafts save independently of canonical student records. Submission validation
  requires identity, nationality, contact, school and explicit material declarations.
- No tests/awards is a valid answer. Pending material requires a future due date.
- Submitted profiles are frozen. Consultants can return with a reason or accept.
  Three-way merging detects conflicting staff edits before applying to Stage 1.
- Publishing captures the rendered Stage 1 report, author, date and data version.
  Later profile edits do not change the published report. Publication can be revoked.
- Reports render in a sandboxed iframe. No unsanctioned strategy snapshots are
  automatically made visible to parents.
- Payment notices are entered by staff and are read-only for parents; these notices
  are separate from the sales ERP and are not a payment processor or reconciliation.

## Storage and release boundary

This delivery is a **same-browser workflow preview**, not a production family login.
The current LMS stores all data in localStorage and uses local demo staff accounts.
Do not send those credentials or a staff browser profile to parents.

`?portal=parent` deliberately displays an unavailable-login page and does not load
the local LMS student store. External parent login is not enabled until a shared
database and real authentication service have been selected and configured.

No existing Supabase project has been modified. In particular, the sales ERP
database is not used implicitly for LMS data.

## Data contract

`student.parentPortal` is additive. It contains enabled, parentName, parentEmail,
contactPhone, draft, draftBase, declarations, submissions, publications, payments,
updates and version. Existing studentProfile/evaluationResult/strategyResult and
reportSnapshots are unchanged. Reuse `PrepParentModel.pickProfile` to restrict
parent input to the relevant profile fields, and `publicStudent` for the preview.
This is not a server-side authorization boundary.

The production adapter must authenticate every request, derive the role on the
server, check explicit parent-child/staff-student relationships, validate submissions
on the server, and return approved report snapshots only. It must never download
all LMS records and rely on UI filtering. A household relationship must be based
on verified account identity, not on an email supplied by the browser.

## Verification

`node --test --test-isolation=none tests/parent-portal-model.test.cjs`

Browser checks: incomplete submission rejection, draft preservation, review/merge,
approved snapshot viewing/revocation, distinct household filtering in preview,
desktop/mobile layout, existing Stage 1 screens and external entry gate.
