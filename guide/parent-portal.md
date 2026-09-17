# Family Portal: shared storage and authentication

The Stage 1–5 LMS stays at `/platform/index.html`, now with Supabase Auth login.
Parents use `/platform/index.html?portal=parent`. Server membership, not the URL
or browser state, determines whether a user is an admin, consultant, or parent.

## Account Setup

The first admin uses a one-use invitation to set their own password.
**계정 / 초대 관리** creates staff/parent invitation links. **학부모 포털** also
offers parent invitations for a selected student. Links expire after three days.
They are copied and shared manually; this implementation does not send emails.
Existing account holders accept child invitations with their existing password.
Only admins can invite staff/admins or disable accounts. Consultants can invite
parents only for assigned students. Parents cannot grant or change access.

Password-reset email delivery requires a separately configured SMTP provider.
No automatic password reset is included in this delivery.

## Shared Storage

Dedicated project: `prep-lms` (`vnfzirosjbprsnsfmuzn`), Seoul region, in the
approved Aram Lee organization. The sales ERP database remains unchanged.

The browser uses a publishable key from `platform/portal-config.js`.
The `prep-portal` Edge Function checks sessions with `auth.getUser()`, then
checks active server membership and explicit user-to-student assignments.

All five tables have RLS enabled. Direct grants for anon/authenticated are
revoked; only the Edge Function's service role reads/writes them. The security
advisor's "RLS Enabled No Policy" info notices are intentional deny-all defaults,
not missing public-access policies. No service key is included in this repository.
Invitation acceptance additionally grants service_role SELECT on only auth.users
id/email, not password columns. Run tests/portal-invitation-privileges.sql against
the deployed database to verify these effective privileges under service_role.

Supabase currently reports leaked-password protection as disabled. See
[password protection setup](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection)
before expanding production access.

Platform `verify_jwt=false` is deliberate: the invitation redemption endpoint
authenticates a random one-use token, whose SHA-256 hash is stored. All other
actions require a verified user session. Redemption reserves the invitation and
atomically creates membership and assignments; it cannot silently change an
existing user's password or role.

Sessions are kept in sessionStorage and refreshed by Supabase Auth. Cloud student
records are not copied into localStorage. Each save requires a record version;
conflicts stop the queue and retain unsaved work in memory rather than overwriting.

## Family Workflow

Parents enter basic, school, transcript, test, EC and award data. Drafts are
separate from canonical student records. Required fields are validated in both
the browser and the server. No test/award is a valid explicit declaration;
pending material requires a due date.

Consultants review frozen submissions and can return them with a reason or
accept them through a conflict-aware merge. Published report HTML, author and
date are immutable; publication can be revoked. Parents receive only approved
snapshots, displayed in a sandboxed iframe.

Payment notices are staff-entered, parent-read-only. They are not a payment
processor or an integration with the sales ERP.

## Existing Browser Data

The former workspace remains at `/platform/index.html?mode=local`.
Demo credentials there provide no cloud access. In the authenticated admin view,
**기존 브라우저 자료 가져오기** imports that browser's saved student records and
school dataset, leaving local originals intact. Empty storage does not import
sample students. Imports are namespaced and resumable.

Imported students initially belong to the importing admin. Assign real staff
after their accounts have been created. Old preview reports/submissions are
archived in `localPortalArchive`, not automatically published to verified
parents. Re-review and publish the current report.

## Source and Deployment

- Schema: `supabase/schema/portal.sql`; applied as remote migrations.
- API: `supabase/functions/prep-portal/index.ts`, `service.mjs`.
- Shared validation: `platform/parent-portal-model.js`.
- Client: `platform/portal-cloud.js`, `portal-cloud.jsx`.

Before CLI deployment, run `node scripts/build-portal-function.cjs` to bundle
the canonical validator as `model.js`. Deploy `prep-portal` with platform JWT
verification disabled because it implements the authentication checks above.
Supabase JS is pinned at 2.57.4. Vercel Git integration deploys frontend pushes.

## Verification

Run:
`node --test --test-isolation=none tests/parent-portal-model.test.cjs tests/portal-cloud-contract.test.cjs tests/portal-server-authorization.test.cjs`

Browser tests use a mocked authenticated API for staff/parent interaction flows.
No extra privileged test accounts are created in production. Live tests verify
unauthenticated/forged-session denial, direct-table denial, origin validation,
invalid invitations and valid invitation recognition without consuming it.
The first real password is set by the user.
