# Prep LMS Workspaces

## Design Rules

The public website checklist is adapted to an authenticated consulting workspace,
not a marketing landing page. Existing Stage 1-5 flows, evaluation weights,
student records, report snapshots and authorization are unchanged.

| Principle | Implementation |
| --- | --- |
| Brand | Existing Yesuhak logo, navy navigation, restrained gold selection/actions. |
| Hierarchy | White working area; strong work titles, compact dark table headers; secondary context stays readable. |
| Reliable functionality | Existing save queue and conflict handling retained; regression tests cover meetings, tasks, requests, reports and publication. |
| Useful functionality | Work opens its existing editor; student links open the existing record; no parallel task database. |
| Visibility | Grouped navigation and selected-location labels; private portal deliberately uses noindex rather than public SEO. |
| Security | Existing authenticated API and parent/staff/admin access boundaries retained. Noindex is not an access-control mechanism. |
| Contact | User-approved `yesboarding@gmail.com` on entry, staff login, family login and invitation screens; mailto never auto-sends. |
| Performance | Work queues render 12 rows initially, updates 5; explicit expansion reveals the remaining entries. Resource preconnects and a loading state reduce avoidable setup/blank-screen friction. |
| Mobile | Same work data becomes vertical task rows below 650px; Stage controls and detailed tabs scroll inside their own region, not the page. |
| Accessibility | Skip link, active navigation, visible keyboard focus, associated form labels, modal focus trap/return, reduced-motion support. |

## Layout

- Navigation: Work / Students / Settings, each with familiar Lucide icons.
- Dashboard: personal actions and team filters first; overdue and upcoming work
  on the left, attention items and updates on the right at wide desktop sizes.
  Calendar subscriptions and calendar follow. No number-only metric strip.
- Tables: dark header only, white/alternate body rows, legible values and muted
  context; deadline warnings use both text and semantic color.
- Student directory: existing search, filters and saved views remain functional.
- Student detail: student identity shown once above the detail tabs; Stage selector
  preserves all five stages, completion figures and editing behavior. Input groups
  use unframed sections instead of stacking decorative section cards.
- Public entry: family and staff routes remain distinct; no account or student
  information is included in the support mail link.

## Verification

`node tests/dashboard-teams-browser.cjs` includes `workspace-design-check.cjs`.
It verifies 320/390/768/1024/1500px layouts, mobile task width, team scopes,
expandable work/update lists, read-state persistence, active navigation, form
labels, skip link, modal keyboard behavior and representative text contrast.

`node tests/portal-design-browser.cjs` verifies public entry and contact links.
The existing operations, CRM, parent portal and unit tests cover data behavior.
Browser workflow tests use synthetic records and intercepted authenticated APIs;
live denial tests separately exercise anonymous/forged access to the real API.

Contrast targets follow [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
Controls are sized with [WCAG target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
in mind. These are targeted checks, not a claim of full WCAG certification.

## Remaining Boundaries

- The existing browser-side Babel compilation and large legacy report module remain.
  This release does not claim an audited Core Web Vitals score or a load-time SLA.
  A precompiled/lazy-loaded production build should be a separately tested change.
- No biometrics, new chat platform or external AI service was added just for visual
  redesign. Those need explicit product and privacy decisions.
- The work does not change customer report layouts or stored report HTML.
