# TLP product entry flow

The TLP film app presents one product journey with distinct public and workspace states:

1. A logged-out visitor sees the TLP public landing page (`?surface=tlp`). The 30 Trillion India concept page remains public as well (`?surface=film`).
2. A workspace action opens a clear access boundary. This build has no identity provider or server account system, so the action is explicitly **Continue to local preview**, not sign-in. It creates a browser-local preview session only.
3. The preview asks for one role, then shows work areas for that role, then asks for one project type, a name, and an idea.
4. Project setup opens the film workspace and carries the role, selected work area, project type, name, and idea into a browser-local project. The prior local film project can be restored.
5. A TLPS handoff is still an explicit review-and-create action. It does not confirm budgets, bookings, permissions, production readiness, or release.

The app is not authenticated or multi-user. Browser storage is not an access-control boundary; a production launch still needs a real identity provider, server-side session enforcement, and an account-backed project store. No provider or operating authority is claimed by this flow.
