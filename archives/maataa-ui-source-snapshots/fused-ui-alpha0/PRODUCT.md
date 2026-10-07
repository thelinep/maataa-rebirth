# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

The existing package uses React and TypeScript. This request extends that stack.

## Users

Inferred from the requested modules: team operators and administrators coordinating projects, people, communication, and day-to-day business work. This audience has not yet been confirmed by the user.

## Product Purpose

The user requested a configurable admin template that gathers analytics, project work, learning, calendar, messaging, contacts, commerce, files, help, mail, notes, scrum, tasks, profile, notifications, activities, authentication, invoices, maintenance, pricing, error, and coming-soon pages into one navigable product.

## Positioning

The requested surface is built on the existing MAATAA UI package and its integration with the governed MAATAA kernel. No additional positioning claim was provided.

## Operating Context

The list describes an interactive web template. Local sample content is an implementation assumption until the user confirms an API or data-source preference.

## Capabilities and Constraints

- Requested applications: Analytics Dashboard, Project Dashboard, Academy, Calendar, Messenger, Contacts, E-Commerce, File Manager, Help Center, Mailbox, Notes, Scrumboard, Tasks, Profile, and Notification.
- Requested pages: Activities; sign in, sign up, sign out, forgot password, reset password, unlock session, and confirmation-required authentication pages; Coming soon; 404 and 500 errors; compact and modern invoices; Maintenance; and modern, simple, single, and table pricing pages.
- Requested configuration: left/right vertical, horizontal, and folded navigation; toolbar above/below; footer above/below.
- Requested other capabilities: JWT authentication, skeleton project, code splitting, authorization, custom colors, 20+ content layouts, multilingual example, RTL, ESLint, and Prettier.
- No authentication service, JWT issuer, API routes, or sample-data policy was supplied. JWT must remain a host-provided adapter; this template must not mint or claim valid tokens itself.
- Access decisions in browser UI are presentation and navigation controls only. A server must authorize protected data and actions.
- The audience, local sample-data assumption, required accessibility standard, and production API integrations remain open for confirmation.

## Evidence on Hand

- Existing visual component library: `src/`.
- Existing governed dispatch integration: `src/kernelIntegration.tsx`.
- No app backend or authentication provider was found in the workspace apps inspected for this request.

## Product Principles

- Keep the requested applications reachable through one consistent shell.
- Make layout and theme settings discoverable and reversible.
- Label demonstration data and unconnected services honestly.
- Keep authentication and authorization decisions with an authoritative host service.

## Accessibility & Inclusion

Inherit semantic controls, keyboard access, clear focus, and readable contrast from the MAATAA UI components. The user did not specify a formal conformance target.
