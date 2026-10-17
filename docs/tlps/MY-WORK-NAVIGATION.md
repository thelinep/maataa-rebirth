# Persistent My work navigation

Main TLPS navigation includes My work at /#/tlps/my-work. Eight stable destinations retain a visible common navigation list on every detail view:

| Path suffix | Destination |
|---|---|
| applications | My Applications & Auditions |
| offers | My Offers & Negotiations |
| bookings | My Bookings |
| approvals | Approvals assigned to me |
| data-rooms | My Data Room access and diligence |
| distribution | My Distributor Deals and Deliveries |
| billing | My Invoices, Memberships, and Entitlements |
| help | Disputes, cancellations, and support requests |

Each detail view provides relevant status/view filters. These are navigation destinations, not connected personal inboxes. They explicitly state that records have not been loaded. Existing project-stage reviews and support requests remain inside Connected Projects; there is no assigned-to-me or cross-project queue implementation here. No fake counts, personal data, paid entitlements, membership activation or data-room access are created by navigation.

Verification: demo TypeScript typecheck and production build passed. Chromium verified all eight destinations, correct unavailable-service states and mobile width without horizontal overflow. An initial check timed out against the earlier served build; the repeated check on the rebuilt page passed. No claim of backend completion follows from route presence.
