# Pages and workspaces: taxonomy

Generated 2026-10-12 from the registries. Machine-readable copy: [`pages-and-workspaces.csv`](pages-and-workspaces.csv).

**Current package taxonomy:** 500 page IDs in 41 groups and 616 workspace IDs in 55 groups. 31 workspace IDs moved to the TLPS product. The release owner decided the whole remaining taxonomy is part of the Beta promise (chat statement, 2026-10-12, not a signed record).

## Decisions applied (2026-10-12)

Release owner decisions, recorded as chat statements, not signed records.

1. **Every ID names the archetype that renders it.** Each `PAGE_TYPES` record has an `archetype` field naming one of the 22 page components in `src/pages` (`PAGE_ARCHETYPES`), and each `WORKSPACE_TYPES` record names one of the 39 workspace components in `src/workspaces` (`WORKSPACE_ARCHETYPES`). Workspaces map by group. Pages map by group, then by the page's role in its name (detail, list, settings, approval, builder and so on). `tests/taxonomy.test.ts` checks that every value is an exported component and that every archetype is used. An archetype is a rendering choice, not an identity: it can be refined without an ID change.
2. **One concept, one canonical ID.** 12 workspace IDs are aliases. They keep working, carry `aliasOf` and use the canonical record's archetype. An alias never points at another alias.
3. **Clearer names where two concepts share a word.** IDs are unchanged; only the display name changed. The near-matches Workspace Archive, Workspace Audit and Workspace Portfolio name the workspace object itself, so they stay distinct and unchanged.
4. **TLPS Production, Casting and Crew moved to the TLPS product.** The 31 IDs keep their spelling and now live in `apps/tlps/src/registries/workspaceRegistry.ts` (`TLPS_WORKSPACE_TYPES`). `manifests/CANONICAL_IDS.json` lists them under `moved`; `pnpm api:check` fails if one returns to the package or disappears from the TLPS registry. The `@maataa/ui/workspace-groups/tlps_production`, `casting` and `crew` modules are removed. This is a breaking change for anyone who used those IDs or modules through the package; it is made before Beta, while no consumer has saved compositions. Event Guest, Sponsorship and MAATAA Core Studio stay in the package as generic groups.
5. **One deviation from the approved list.** The approved list had Reconciliation as an alias. The two records are different things: `CONTROL_PLANE.RECONCILIATION` reconciles declared and running state, while `FINANCE.RECONCILIATION` matches accounts. They were renamed instead of aliased. Making them an alias later is still possible; undoing an alias would not be.

### Aliases

| Alias ID | Canonical ID | Concept |
| --- | --- | --- |
| `WORKSPACE.COMMUNICATION.CONTACT` | `WORKSPACE.CRM_SALES.CONTACT` | Contact Workspace |
| `WORKSPACE.ANALYTICS.MARKETING_ANALYTICS` | `WORKSPACE.MARKETING.MARKETING_ANALYTICS` | Marketing Analytics Workspace |
| `WORKSPACE.CONTROL_PLANE.DATABASE_TARGET` | `WORKSPACE.DATABASE.DATABASE_TARGET` | Database Target Workspace |
| `WORKSPACE.ENVIRONMENT_RELEASE.QA` | `WORKSPACE.TESTING.QA` | QA Workspace |
| `WORKSPACE.SECURITY_IDENTITY.POLICY` | `WORKSPACE.GOVERNANCE_EVIDENCE.POLICY` | Policy Workspace |
| `WORKSPACE.GOVERNANCE_EVIDENCE.REVIEW` | `WORKSPACE.REVIEW_DECISION.REVIEW` | Review Workspace |
| `WORKSPACE.GOVERNANCE_EVIDENCE.APPROVAL` | `WORKSPACE.REVIEW_DECISION.APPROVAL` | Approval Workspace |
| `WORKSPACE.MARKETING.SEO` | `WORKSPACE.CMS_PUBLISHING.SEO` | SEO Workspace |
| `WORKSPACE.MARKETPLACE.COMPARISON` | `WORKSPACE.REVIEW_DECISION.COMPARISON` | Comparison Workspace |
| `WORKSPACE.EQUIPMENT_LOGISTICS.PERMIT` | `WORKSPACE.LOCATION_VENUE.PERMIT` | Permit Workspace |
| `WORKSPACE.MOBILE.OFFLINE` | `WORKSPACE.EMERGENCY_STATE.OFFLINE` | Offline Workspace |
| `WORKSPACE.EMERGENCY_STATE.INCIDENT` | `WORKSPACE.RELIABILITY_OBSERVABILITY.INCIDENT` | Incident Workspace |

### Renamed (IDs unchanged)

| ID | Previous name | Name |
| --- | --- | --- |
| `PAGE.CONTENT_EDITORIAL.PORTFOLIO` | Portfolio Page | Creative Portfolio Page |
| `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PORTFOLIO` | Portfolio Page | Investment Portfolio Page |
| `WORKSPACE.PROJECT_PROGRAM.PORTFOLIO` | Portfolio Workspace | Project Portfolio Workspace |
| `WORKSPACE.INVESTMENT.PORTFOLIO` | Portfolio Workspace | Investment Portfolio Workspace |
| `WORKSPACE.DOCUMENT_KNOWLEDGE.PRESENTATION` | Presentation Workspace | Presentation Authoring Workspace |
| `WORKSPACE.PRESENTATION_DISPLAY.PRESENTATION` | Presentation Workspace | Presentation Display Workspace |
| `WORKSPACE.INVESTMENT.DEAL` | Deal Workspace | Investment Deal Workspace |
| `WORKSPACE.CRM_SALES.DEAL` | Deal Workspace | Sales Deal Workspace |
| `WORKSPACE.COMMERCE.INVENTORY` | Inventory Workspace | Product Inventory Workspace |
| `WORKSPACE.EQUIPMENT_LOGISTICS.INVENTORY` | Inventory Workspace | Equipment Inventory Workspace |
| `WORKSPACE.SPATIAL_3D.LOCATION` | Location Workspace | Spatial Location Workspace |
| `WORKSPACE.LOCATION_VENUE.LOCATION` | Location Workspace | Venue Location Workspace |
| `WORKSPACE.CONTROL_PLANE.RECONCILIATION` | Reconciliation Workspace | State Reconciliation Workspace |
| `WORKSPACE.FINANCE.RECONCILIATION` | Reconciliation Workspace | Financial Reconciliation Workspace |

### Archetype coverage

Pages: `AdminPage` 34 · `ApprovalPage` 3 · `AuthPage` 16 · `BuilderPage` 15 · `ControlPlanePage` 14 · `CreatePage` 5 · `DashboardPage` 30 · `DataPage` 24 · `DetailPage` 117 · `DocumentationPage` 22 · `EditPage` 1 · `ErrorPage` 13 · `EvidencePage` 4 · `ListPage` 69 · `MarketingPage` 31 · `OnboardingPage` 8 · `PresentationPage` 8 · `ReviewPage` 2 · `SearchPage` 8 · `SettingsPage` 10 · `StudioPage` 54 · `TransactionPage` 12.

Workspaces: `AdminWorkspace` 29 · `AIWorkspace` 15 · `AnalyticsWorkspace` 12 · `APIStudioWorkspace` 12 · `BookingWorkspace` 11 · `BuilderWorkspace` 26 · `CommandCenterWorkspace` 16 · `CommerceWorkspace` 13 · `CommunicationWorkspace` 10 · `CommunityWorkspace` 8 · `ControlPlaneWorkspace` 9 · `CreativeStudioWorkspace` 12 · `CRMWorkspace` 13 · `DatabaseWorkspace` 13 · `DataWorkspace` 14 · `DesignSystemWorkspace` 13 · `DeveloperWorkspace` 21 · `DocumentWorkspace` 34 · `EducationWorkspace` 12 · `EventWorkspace` 32 · `FinanceWorkspace` 15 · `GovernanceWorkspace` 25 · `InfrastructureWorkspace` 22 · `InvestmentWorkspace` 12 · `MarketingWorkspace` 22 · `MarketplaceWorkspace` 11 · `MediaStudioWorkspace` 11 · `ObservabilityWorkspace` 14 · `OrganisationWorkspace` 19 · `PersonalWorkspace` 15 · `PresentationWorkspace` 9 · `ProductionWorkspace` 22 · `ProductivityWorkspace` 26 · `ProjectWorkspace` 11 · `SecurityWorkspace` 12 · `SpatialStudioWorkspace` 15 · `SupportWorkspace` 9 · `TeamWorkspace` 10 · `TestingWorkspace` 11.

### What stays product-flavoured

The page group `PRODUCTION_LOGISTICS` (24 pages, including Casting, Crew, Shot List and Script) and the ten production generators remain in the package. Their names are generic film-production vocabulary. Later the same day the seven TLPS AI spaces moved to `apps/tlps`, and the generator group label changed from "Production / TLPS" to "Production"; its ID `G16_PRODUCTION_TLPS` is unchanged.

## Findings at `c141d99d` (before the decisions above)

1. **Taxonomy, not implementations.** The 500 page IDs and 647 workspace IDs carry only `id`, `name`, `ordinal` and a group. They are rendered by **22 page archetype components** (`src/pages`) and **39 workspace archetype components** (`src/workspaces`); no registry field maps an ID to the archetype that should render it. `PagePreset` only writes the ID into `data-page-type`.
2. **Almost no evidence of fit.** `COMPOSITION_COMPATIBILITY_REGISTRY` has **8 workspace × page × layout tuples** (1 composer default, 7 demo scenarios) out of 647 × 500 = 323,500 workspace/page pairs. 8 workspaces and 8 pages appear in any tuple; every other combination is "unverified".
3. **Same concept, several IDs.** Workspaces: 25 name collisions (same name after removing "Workspace") across groups, e.g. Portfolio ×3, Department, Contact, Presentation, Storyboard. Pages: 1 (Portfolio in Content and in Finance). 180 concepts exist both as a page and as a workspace.
4. **Inconsistent naming.** 19 page names lack the "Page" suffix and 43 workspace names lack "Workspace"; 3 page IDs and 6 workspace IDs do not follow the name (e.g. `&` → `AND`, `3D` → `THREE_D`, "Multi-Tenant Workspace Hub" → `MULTI_TENANT_HUB`).
5. **Product-specific vocabulary in a generic package.** Workspace groups such as `TLPS_PRODUCTION` (13), `CASTING` (10), `CREW` (8), `EVENT_GUEST` (10), `SPONSORSHIP` (8) and `MAATAA_CORE_STUDIO` (15) describe particular products. The release scope counts only the `@maataa/ui` package, yet these IDs are now inside it.
6. **Uneven grouping.** Page groups range from 2 (`EVIDENCE_APPROVAL`) and 3 (`OPERATIONS_ADMINISTRATION`) to 30 (`MARKETING_CORPORATE`); several groups overlap in meaning (`ADMIN_CONFIGURATION`, `SYSTEM_ADMINISTRATION`, `OPERATIONS_ADMINISTRATION`; `SYSTEM_STATES`, `TRANSACTION_STATES`). Workspace groups are flatter (6–15).
7. **They are now frozen by rule.** Since 2026-10-12 all 1,147 IDs are in `manifests/CANONICAL_IDS.json` (option C): any rename or merge from here needs an alias, a migration helper, tests and a recorded decision; removal is a major change. Clean-up is cheapest before Beta, while consumers have no saved compositions.

### Decisions for the owner

- Merge or alias the duplicate concepts (finding 3), or document why each is distinct.
- Move product-specific workspace groups (finding 5) to the products that own them, or mark them as examples.
- Add an `archetype` field mapping each page and workspace ID to the component that renders it (finding 1).
- Decide whether the taxonomy itself is part of the Beta promise, or only the IDs that have compatibility evidence.

### Detail

**Duplicate concepts** — same display name in different groups. Some are genuinely different things that share a word (an environment called Production versus TLPS film production; an investment deal versus a CRM deal) and need clearer names rather than merging; others (Review, Approval, Audit, Policy, QA, Offline) look like one concept filed twice.

| Registry | Concept | IDs |
| --- | --- | --- |
| workspace | Department Workspace | `WORKSPACE.TEAM.DEPARTMENT`, `WORKSPACE.CREW.DEPARTMENT` |
| workspace | Portfolio Workspace | `WORKSPACE.PROJECT_PROGRAM.PORTFOLIO`, `WORKSPACE.INVESTMENT.PORTFOLIO`, `WORKSPACE.MULTI_WORKSPACE.WORKSPACE_PORTFOLIO` |
| workspace | Contact Workspace | `WORKSPACE.COMMUNICATION.CONTACT`, `WORKSPACE.CRM_SALES.CONTACT` |
| workspace | Presentation Workspace | `WORKSPACE.DOCUMENT_KNOWLEDGE.PRESENTATION`, `WORKSPACE.PRESENTATION_DISPLAY.PRESENTATION` |
| workspace | Archive Workspace | `WORKSPACE.FILE_ASSET.ARCHIVE`, `WORKSPACE.WORKSPACE_META.WORKSPACE_ARCHIVE` |
| workspace | Storyboard Workspace | `WORKSPACE.CREATIVE.STORYBOARD`, `WORKSPACE.TLPS_PRODUCTION.STORYBOARD` |
| workspace | Post-Production Workspace | `WORKSPACE.MEDIA_PRODUCTION.POST_PRODUCTION`, `WORKSPACE.TLPS_PRODUCTION.POST_PRODUCTION` |
| workspace | Scene Workspace | `WORKSPACE.SPATIAL_3D.SCENE`, `WORKSPACE.TLPS_PRODUCTION.SCENE` |
| workspace | Location Workspace | `WORKSPACE.SPATIAL_3D.LOCATION`, `WORKSPACE.LOCATION_VENUE.LOCATION` |
| workspace | Marketing Analytics Workspace | `WORKSPACE.ANALYTICS.MARKETING_ANALYTICS`, `WORKSPACE.MARKETING.MARKETING_ANALYTICS` |
| workspace | Database Target Workspace | `WORKSPACE.CONTROL_PLANE.DATABASE_TARGET`, `WORKSPACE.DATABASE.DATABASE_TARGET` |
| workspace | Reconciliation Workspace | `WORKSPACE.CONTROL_PLANE.RECONCILIATION`, `WORKSPACE.FINANCE.RECONCILIATION` |
| workspace | QA Workspace | `WORKSPACE.ENVIRONMENT_RELEASE.QA`, `WORKSPACE.TESTING.QA` |
| workspace | Production Workspace | `WORKSPACE.ENVIRONMENT_RELEASE.PRODUCTION`, `WORKSPACE.TLPS_PRODUCTION.PRODUCTION` |
| workspace | Incident Workspace | `WORKSPACE.RELIABILITY_OBSERVABILITY.INCIDENT`, `WORKSPACE.EMERGENCY_STATE.INCIDENT` |
| workspace | Policy Workspace | `WORKSPACE.SECURITY_IDENTITY.POLICY`, `WORKSPACE.GOVERNANCE_EVIDENCE.POLICY` |
| workspace | Audit Workspace | `WORKSPACE.GOVERNANCE_EVIDENCE.AUDIT`, `WORKSPACE.WORKSPACE_META.WORKSPACE_AUDIT` |
| workspace | Review Workspace | `WORKSPACE.GOVERNANCE_EVIDENCE.REVIEW`, `WORKSPACE.REVIEW_DECISION.REVIEW` |
| workspace | Approval Workspace | `WORKSPACE.GOVERNANCE_EVIDENCE.APPROVAL`, `WORKSPACE.REVIEW_DECISION.APPROVAL` |
| workspace | Deal Workspace | `WORKSPACE.INVESTMENT.DEAL`, `WORKSPACE.CRM_SALES.DEAL` |
| workspace | SEO Workspace | `WORKSPACE.MARKETING.SEO`, `WORKSPACE.CMS_PUBLISHING.SEO` |
| workspace | Inventory Workspace | `WORKSPACE.COMMERCE.INVENTORY`, `WORKSPACE.EQUIPMENT_LOGISTICS.INVENTORY` |
| workspace | Comparison Workspace | `WORKSPACE.MARKETPLACE.COMPARISON`, `WORKSPACE.REVIEW_DECISION.COMPARISON` |
| workspace | Permit Workspace | `WORKSPACE.LOCATION_VENUE.PERMIT`, `WORKSPACE.EQUIPMENT_LOGISTICS.PERMIT` |
| workspace | Offline Workspace | `WORKSPACE.MOBILE.OFFLINE`, `WORKSPACE.EMERGENCY_STATE.OFFLINE` |
| page | Portfolio Page | `PAGE.CONTENT_EDITORIAL.PORTFOLIO`, `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PORTFOLIO` |

**IDs that do not follow the name**

| ID | Name |
| --- | --- |
| `PAGE.ADMIN_CONFIGURATION.LANGUAGE_AND_REGION` | Language & Region Page |
| `PAGE.SPATIAL_3D.THREE_D_STUDIO` | 3D Studio Page |
| `PAGE.SPATIAL_3D.THREE_D_PREVIEW` | 3D Preview Page |
| `WORKSPACE.MEDIA_PRODUCTION.REVIEW_AND_APPROVAL` | Review & Approval Workspace |
| `WORKSPACE.SPATIAL_3D.TWO_D_PLAN` | 2D Plan Workspace |
| `WORKSPACE.SPATIAL_3D.THREE_D` | 3D Workspace |
| `WORKSPACE.SPATIAL_3D.THREE_D_PREVIEW` | 3D Preview Workspace |
| `WORKSPACE.SYSTEM_ADMINISTRATION.ROLES_AND_PERMISSIONS` | Roles & Permissions Workspace |
| `WORKSPACE.MULTI_WORKSPACE.MULTI_TENANT_HUB` | Multi-Tenant Workspace Hub |

**Names without the type suffix**

Pages: Case Studies Index; Blog Index; Blog Article; News Index; News Article; Documentation Home; Documentation Article; Knowledge Base Home; Knowledge Article; Executive Dashboard; Operational Dashboard; Analytics Dashboard; Personal Dashboard; Role Dashboard; Team Dashboard; Organisation Dashboard; Workspace Dashboard; Project Dashboard; Program Dashboard.

Workspaces: Organisation Command Center; Communication Hub; Finance Command Center; Event Command Center; Production Command Center; Logistics Command Center; Desktop Command Center; MAATAA UI Studio; MAATAA Domain Studio; MAATAA Data Studio; MAATAA API Studio; MAATAA Code Studio; MAATAA Workflow Studio; MAATAA Form Studio; MAATAA Page Studio; MAATAA App Studio; MAATAA Mobile Studio; MAATAA Theme Studio; MAATAA Agent Studio; MAATAA Knowledge Studio; MAATAA Infrastructure Studio; MAATAA Control Plane Studio; Workspace Selector; Workspace Switcher; Workspace Directory; Workspace Creator; Workspace Template Gallery; Workspace Settings; Workspace Members; Workspace Roles; Workspace Permissions; Workspace Integrations; Workspace Activity; Workspace Audit; Workspace Archive; Workspace Hub; Workspace Federation; Workspace Portfolio; Multi-Tenant Workspace Hub; Cross-Workspace Search; Cross-Workspace Activity; Cross-Workspace Analytics; Cross-Workspace Command Center.

**Compatibility evidence tuples** (current)

| Workspace | Page | Layout |
| --- | --- | --- |
| `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_UI_STUDIO` | `PAGE.BUILDERS_AUTOMATION.PAGE_BUILDER` | `LAYOUT.WORKSPACE.BUILDER` |
| `WORKSPACE.UI_DESIGN_SYSTEM.DESIGN_SYSTEM` | `PAGE.DESIGN_SYSTEM.DESIGN_SYSTEM` | `LAYOUT.WORKSPACE.WORKBENCH` |
| `WORKSPACE.EVENT.EVENT_COMMAND_CENTER` | `PAGE.EVENTS.EVENT_DASHBOARD` | `LAYOUT.OPERATIONAL.COMMANDCENTER` |
| `WORKSPACE.EVENT.EVENT_SPATIAL` | `PAGE.EVENTS.EVENT_SPATIAL` | `LAYOUT.CANVAS_SPATIAL.SPATIALCAD` |
| `WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS_COMMAND_CENTER` (was `WORKSPACE.TLPS_PRODUCTION.PRODUCTION_COMMAND_CENTER`) | `PAGE.PRODUCTION_LOGISTICS.PRODUCTION_DASHBOARD` | `LAYOUT.WORKSPACE.STUDIO` |
| `WORKSPACE.AI.AI_EVALUATION` | `PAGE.AI_KNOWLEDGE.AI_EVALUATION` | `LAYOUT.OPERATIONAL.COMMANDCENTER` |
| `WORKSPACE.MOBILE.MOBILE_PREVIEW` | `PAGE.PRESENTATION_MODES.PREVIEW` | `LAYOUT.RESPONSIVE_MOBILE.MOBILESTACK` |
| `WORKSPACE.CONTROL_PLANE.MAATAA_CONTROL_PLANE` | `PAGE.CONTROL_PLANE.CONTROL_PLANE` | `LAYOUT.DATA_ANALYTICS.ANALYTICS` |

## Pages (500)

### P01 Marketing & Corporate (30)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 1 | `PAGE.MARKETING_CORPORATE.LANDING` | Landing Page | `MarketingPage` |  |
| 2 | `PAGE.MARKETING_CORPORATE.HOME` | Home Page | `MarketingPage` |  |
| 3 | `PAGE.MARKETING_CORPORATE.MARKETING_HOME` | Marketing Home Page | `MarketingPage` |  |
| 4 | `PAGE.MARKETING_CORPORATE.PRODUCT` | Product Page | `MarketingPage` |  |
| 5 | `PAGE.MARKETING_CORPORATE.PRODUCT_SUITE` | Product Suite Page | `MarketingPage` |  |
| 6 | `PAGE.MARKETING_CORPORATE.FEATURE` | Feature Page | `MarketingPage` |  |
| 7 | `PAGE.MARKETING_CORPORATE.SOLUTION` | Solution Page | `MarketingPage` |  |
| 8 | `PAGE.MARKETING_CORPORATE.INDUSTRY` | Industry Page | `MarketingPage` |  |
| 9 | `PAGE.MARKETING_CORPORATE.USE_CASE` | Use Case Page | `MarketingPage` |  |
| 10 | `PAGE.MARKETING_CORPORATE.PERSONA` | Persona Page | `MarketingPage` |  |
| 11 | `PAGE.MARKETING_CORPORATE.CAMPAIGN` | Campaign Page | `MarketingPage` |  |
| 12 | `PAGE.MARKETING_CORPORATE.LAUNCH` | Launch Page | `MarketingPage` |  |
| 13 | `PAGE.MARKETING_CORPORATE.COMING_SOON` | Coming Soon Page | `MarketingPage` |  |
| 14 | `PAGE.MARKETING_CORPORATE.WAITLIST` | Waitlist Page | `MarketingPage` |  |
| 15 | `PAGE.MARKETING_CORPORATE.ABOUT` | About Page | `MarketingPage` |  |
| 16 | `PAGE.MARKETING_CORPORATE.MISSION` | Mission Page | `MarketingPage` |  |
| 17 | `PAGE.MARKETING_CORPORATE.TEAM` | Team Page | `MarketingPage` |  |
| 18 | `PAGE.MARKETING_CORPORATE.CAREERS` | Careers Page | `MarketingPage` |  |
| 19 | `PAGE.MARKETING_CORPORATE.PRESS` | Press Page | `MarketingPage` |  |
| 20 | `PAGE.MARKETING_CORPORATE.MEDIA_KIT` | Media Kit Page | `MarketingPage` |  |
| 21 | `PAGE.MARKETING_CORPORATE.PARTNER` | Partner Page | `MarketingPage` |  |
| 22 | `PAGE.MARKETING_CORPORATE.INVESTOR` | Investor Page | `MarketingPage` |  |
| 23 | `PAGE.MARKETING_CORPORATE.CONTACT` | Contact Page | `MarketingPage` |  |
| 24 | `PAGE.MARKETING_CORPORATE.SUPPORT_LANDING` | Support Landing Page | `MarketingPage` |  |
| 25 | `PAGE.MARKETING_CORPORATE.PRICING` | Pricing Page | `MarketingPage` |  |
| 26 | `PAGE.MARKETING_CORPORATE.PRICING_COMPARISON` | Pricing Comparison Page | `MarketingPage` |  |
| 27 | `PAGE.MARKETING_CORPORATE.FAQ` | FAQ Page | `MarketingPage` |  |
| 28 | `PAGE.MARKETING_CORPORATE.TESTIMONIALS` | Testimonials Page | `MarketingPage` |  |
| 29 | `PAGE.MARKETING_CORPORATE.CASE_STUDY` | Case Study Page | `MarketingPage` |  |
| 30 | `PAGE.MARKETING_CORPORATE.CASE_STUDIES_INDEX` | Case Studies Index | `MarketingPage` |  |

### P02 Content & Editorial (6)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 31 | `PAGE.CONTENT_EDITORIAL.PORTFOLIO` | Creative Portfolio Page | `MarketingPage` |  |
| 32 | `PAGE.CONTENT_EDITORIAL.GALLERY` | Gallery Page | `ListPage` |  |
| 33 | `PAGE.CONTENT_EDITORIAL.BLOG_INDEX` | Blog Index | `ListPage` |  |
| 34 | `PAGE.CONTENT_EDITORIAL.BLOG_ARTICLE` | Blog Article | `DetailPage` |  |
| 35 | `PAGE.CONTENT_EDITORIAL.NEWS_INDEX` | News Index | `ListPage` |  |
| 36 | `PAGE.CONTENT_EDITORIAL.NEWS_ARTICLE` | News Article | `DetailPage` |  |

### P03 Documentation & Developer (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 37 | `PAGE.DOCUMENTATION_DEVELOPER.DOCUMENTATION_HOME` | Documentation Home | `DocumentationPage` |  |
| 38 | `PAGE.DOCUMENTATION_DEVELOPER.DOCUMENTATION_ARTICLE` | Documentation Article | `DetailPage` |  |
| 39 | `PAGE.DOCUMENTATION_DEVELOPER.KNOWLEDGE_BASE_HOME` | Knowledge Base Home | `DocumentationPage` |  |
| 40 | `PAGE.DOCUMENTATION_DEVELOPER.KNOWLEDGE_ARTICLE` | Knowledge Article | `DetailPage` |  |
| 41 | `PAGE.DOCUMENTATION_DEVELOPER.TUTORIAL` | Tutorial Page | `DocumentationPage` |  |
| 42 | `PAGE.DOCUMENTATION_DEVELOPER.GUIDE` | Guide Page | `DocumentationPage` |  |
| 43 | `PAGE.DOCUMENTATION_DEVELOPER.API_DOCUMENTATION` | API Documentation Page | `DocumentationPage` |  |
| 44 | `PAGE.DOCUMENTATION_DEVELOPER.SDK_DOCUMENTATION` | SDK Documentation Page | `DocumentationPage` |  |
| 45 | `PAGE.DOCUMENTATION_DEVELOPER.CHANGELOG` | Changelog Page | `DocumentationPage` |  |
| 46 | `PAGE.DOCUMENTATION_DEVELOPER.RELEASE_NOTES` | Release Notes Page | `DocumentationPage` |  |
| 47 | `PAGE.DOCUMENTATION_DEVELOPER.ROADMAP` | Roadmap Page | `DocumentationPage` |  |
| 48 | `PAGE.DOCUMENTATION_DEVELOPER.STATUS` | Status Page | `DocumentationPage` |  |

### P04 Legal & Trust (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 49 | `PAGE.LEGAL_TRUST.TRUST_CENTER` | Trust Center Page | `DocumentationPage` |  |
| 50 | `PAGE.LEGAL_TRUST.SECURITY` | Security Page | `DocumentationPage` |  |
| 51 | `PAGE.LEGAL_TRUST.COMPLIANCE` | Compliance Page | `DocumentationPage` |  |
| 52 | `PAGE.LEGAL_TRUST.PRIVACY_POLICY` | Privacy Policy Page | `DocumentationPage` |  |
| 53 | `PAGE.LEGAL_TRUST.TERMS` | Terms Page | `DocumentationPage` |  |
| 54 | `PAGE.LEGAL_TRUST.COOKIE_POLICY` | Cookie Policy Page | `DocumentationPage` |  |
| 55 | `PAGE.LEGAL_TRUST.REFUND_POLICY` | Refund Policy Page | `DocumentationPage` |  |
| 56 | `PAGE.LEGAL_TRUST.LEGAL_NOTICE` | Legal Notice Page | `DocumentationPage` |  |
| 57 | `PAGE.LEGAL_TRUST.LICENSE` | License Page | `DocumentationPage` |  |
| 58 | `PAGE.LEGAL_TRUST.ACCESSIBILITY_STATEMENT` | Accessibility Statement Page | `DocumentationPage` |  |

### P05 Authentication (17)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 59 | `PAGE.AUTHENTICATION.SIGN_IN` | Sign In Page | `AuthPage` |  |
| 60 | `PAGE.AUTHENTICATION.SIGN_UP` | Sign Up Page | `AuthPage` |  |
| 61 | `PAGE.AUTHENTICATION.SIGN_OUT` | Sign Out Page | `AuthPage` |  |
| 62 | `PAGE.AUTHENTICATION.FORGOT_PASSWORD` | Forgot Password Page | `AuthPage` |  |
| 63 | `PAGE.AUTHENTICATION.RESET_PASSWORD` | Reset Password Page | `AuthPage` |  |
| 64 | `PAGE.AUTHENTICATION.EMAIL_VERIFICATION` | Email Verification Page | `AuthPage` |  |
| 65 | `PAGE.AUTHENTICATION.PHONE_VERIFICATION` | Phone Verification Page | `AuthPage` |  |
| 66 | `PAGE.AUTHENTICATION.MFA_CHALLENGE` | MFA Challenge Page | `AuthPage` |  |
| 67 | `PAGE.AUTHENTICATION.PASSKEY` | Passkey Page | `AuthPage` |  |
| 68 | `PAGE.AUTHENTICATION.SSO` | SSO Page | `AuthPage` |  |
| 69 | `PAGE.AUTHENTICATION.MAGIC_LINK` | Magic Link Page | `AuthPage` |  |
| 70 | `PAGE.AUTHENTICATION.UNLOCK_SESSION` | Unlock Session Page | `AuthPage` |  |
| 71 | `PAGE.AUTHENTICATION.SESSION_EXPIRED` | Session Expired Page | `AuthPage` |  |
| 72 | `PAGE.AUTHENTICATION.ACCOUNT_CONFIRMATION` | Account Confirmation Page | `AuthPage` |  |
| 73 | `PAGE.AUTHENTICATION.INVITE_ACCEPTANCE` | Invite Acceptance Page | `AuthPage` |  |
| 74 | `PAGE.AUTHENTICATION.ACCESS_REQUEST` | Access Request Page | `AuthPage` |  |
| 75 | `PAGE.AUTHENTICATION.PERMISSION_DENIED` | Permission Denied Page | `ErrorPage` |  |

### P06 Onboarding (8)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 76 | `PAGE.ONBOARDING.ONBOARDING_WELCOME` | Onboarding Welcome Page | `OnboardingPage` |  |
| 77 | `PAGE.ONBOARDING.ONBOARDING_PROFILE` | Onboarding Profile Page | `OnboardingPage` |  |
| 78 | `PAGE.ONBOARDING.ONBOARDING_ORGANISATION` | Onboarding Organisation Page | `OnboardingPage` |  |
| 79 | `PAGE.ONBOARDING.ONBOARDING_WORKSPACE` | Onboarding Workspace Page | `OnboardingPage` |  |
| 80 | `PAGE.ONBOARDING.ONBOARDING_ROLE` | Onboarding Role Page | `OnboardingPage` |  |
| 81 | `PAGE.ONBOARDING.ONBOARDING_PREFERENCES` | Onboarding Preferences Page | `OnboardingPage` |  |
| 82 | `PAGE.ONBOARDING.ONBOARDING_INTEGRATION` | Onboarding Integration Page | `OnboardingPage` |  |
| 83 | `PAGE.ONBOARDING.ONBOARDING_COMPLETION` | Onboarding Completion Page | `OnboardingPage` |  |

### P07 Dashboard & Overview (16)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 84 | `PAGE.DASHBOARD_OVERVIEW.DASHBOARD` | Dashboard Page | `DashboardPage` |  |
| 85 | `PAGE.DASHBOARD_OVERVIEW.EXECUTIVE_DASHBOARD` | Executive Dashboard | `DashboardPage` |  |
| 86 | `PAGE.DASHBOARD_OVERVIEW.OPERATIONAL_DASHBOARD` | Operational Dashboard | `DashboardPage` |  |
| 87 | `PAGE.DASHBOARD_OVERVIEW.ANALYTICS_DASHBOARD` | Analytics Dashboard | `DashboardPage` |  |
| 88 | `PAGE.DASHBOARD_OVERVIEW.PERSONAL_DASHBOARD` | Personal Dashboard | `DashboardPage` |  |
| 89 | `PAGE.DASHBOARD_OVERVIEW.ROLE_DASHBOARD` | Role Dashboard | `DashboardPage` |  |
| 90 | `PAGE.DASHBOARD_OVERVIEW.TEAM_DASHBOARD` | Team Dashboard | `DashboardPage` |  |
| 91 | `PAGE.DASHBOARD_OVERVIEW.ORGANISATION_DASHBOARD` | Organisation Dashboard | `DashboardPage` |  |
| 92 | `PAGE.DASHBOARD_OVERVIEW.WORKSPACE_DASHBOARD` | Workspace Dashboard | `DashboardPage` |  |
| 93 | `PAGE.DASHBOARD_OVERVIEW.PROJECT_DASHBOARD` | Project Dashboard | `DashboardPage` |  |
| 94 | `PAGE.DASHBOARD_OVERVIEW.PROGRAM_DASHBOARD` | Program Dashboard | `DashboardPage` |  |
| 95 | `PAGE.DASHBOARD_OVERVIEW.COMMAND_CENTER` | Command Center Page | `DashboardPage` |  |
| 96 | `PAGE.DASHBOARD_OVERVIEW.CONTROL_ROOM` | Control Room Page | `DashboardPage` |  |
| 97 | `PAGE.DASHBOARD_OVERVIEW.OPERATIONS_WALLBOARD` | Operations Wallboard Page | `DashboardPage` |  |
| 98 | `PAGE.DASHBOARD_OVERVIEW.COCKPIT` | Cockpit Page | `DashboardPage` |  |
| 99 | `PAGE.DASHBOARD_OVERVIEW.OVERVIEW` | Overview Page | `DashboardPage` |  |

### P08 Entity CRUD (17)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 100 | `PAGE.ENTITY_CRUD.INDEX_LIST` | Index/List Page | `ListPage` |  |
| 101 | `PAGE.ENTITY_CRUD.DETAIL` | Detail Page | `DetailPage` |  |
| 102 | `PAGE.ENTITY_CRUD.CREATE` | Create Page | `CreatePage` |  |
| 103 | `PAGE.ENTITY_CRUD.EDIT` | Edit Page | `EditPage` |  |
| 104 | `PAGE.ENTITY_CRUD.CLONE` | Clone Page | `CreatePage` |  |
| 105 | `PAGE.ENTITY_CRUD.REVIEW` | Review Page | `ReviewPage` |  |
| 106 | `PAGE.ENTITY_CRUD.APPROVAL` | Approval Page | `ApprovalPage` |  |
| 107 | `PAGE.ENTITY_CRUD.COMPARISON` | Comparison Page | `DetailPage` |  |
| 108 | `PAGE.ENTITY_CRUD.HISTORY` | History Page | `ListPage` |  |
| 109 | `PAGE.ENTITY_CRUD.ACTIVITY` | Activity Page | `DetailPage` |  |
| 110 | `PAGE.ENTITY_CRUD.AUDIT_LOG` | Audit Log Page | `EvidencePage` |  |
| 111 | `PAGE.ENTITY_CRUD.VERSION_HISTORY` | Version History Page | `ListPage` |  |
| 112 | `PAGE.ENTITY_CRUD.DIFF` | Diff Page | `DetailPage` |  |
| 113 | `PAGE.ENTITY_CRUD.TIMELINE` | Timeline Page | `DetailPage` |  |
| 114 | `PAGE.ENTITY_CRUD.EVIDENCE` | Evidence Page | `EvidencePage` |  |
| 115 | `PAGE.ENTITY_CRUD.RELATIONSHIPS` | Relationships Page | `DetailPage` |  |
| 116 | `PAGE.ENTITY_CRUD.DEPENDENCY` | Dependency Page | `DetailPage` |  |

### P09 Search & Discovery (5)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 117 | `PAGE.SEARCH_DISCOVERY.SEARCH` | Search Page | `SearchPage` |  |
| 118 | `PAGE.SEARCH_DISCOVERY.SEARCH_RESULTS` | Search Results Page | `SearchPage` |  |
| 119 | `PAGE.SEARCH_DISCOVERY.ADVANCED_SEARCH` | Advanced Search Page | `SearchPage` |  |
| 120 | `PAGE.SEARCH_DISCOVERY.SAVED_SEARCHES` | Saved Searches Page | `SearchPage` |  |
| 121 | `PAGE.SEARCH_DISCOVERY.FILTER_EXPLORER` | Filter Explorer Page | `SearchPage` |  |

### P10 Data & Schema (11)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 122 | `PAGE.DATA_SCHEMA.DATA_TABLE` | Data Table Page | `DataPage` |  |
| 123 | `PAGE.DATA_SCHEMA.DATA_EXPLORER` | Data Explorer Page | `DataPage` |  |
| 124 | `PAGE.DATA_SCHEMA.DATA_BROWSER` | Data Browser Page | `DataPage` |  |
| 125 | `PAGE.DATA_SCHEMA.DATA_DETAIL` | Data Detail Page | `DetailPage` |  |
| 126 | `PAGE.DATA_SCHEMA.SCHEMA_EXPLORER` | Schema Explorer Page | `DataPage` |  |
| 127 | `PAGE.DATA_SCHEMA.SCHEMA_DETAIL` | Schema Detail Page | `DetailPage` |  |
| 128 | `PAGE.DATA_SCHEMA.DATA_STUDIO` | Data Studio Page | `StudioPage` |  |
| 129 | `PAGE.DATA_SCHEMA.DOMAIN_REGISTRY` | Domain Registry Page | `ListPage` |  |
| 130 | `PAGE.DATA_SCHEMA.DOMAIN_DETAIL` | Domain Detail Page | `DetailPage` |  |
| 131 | `PAGE.DATA_SCHEMA.CONTRACT_REGISTRY` | Contract Registry Page | `ListPage` |  |
| 132 | `PAGE.DATA_SCHEMA.CONTRACT_DETAIL` | Contract Detail Page | `DetailPage` |  |

### P11 API & Integration (16)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 133 | `PAGE.API_INTEGRATION.API_STUDIO` | API Studio Page | `StudioPage` |  |
| 134 | `PAGE.API_INTEGRATION.API_SERVICE` | API Service Page | `DetailPage` |  |
| 135 | `PAGE.API_INTEGRATION.API_ENDPOINT` | API Endpoint Page | `DetailPage` |  |
| 136 | `PAGE.API_INTEGRATION.API_REQUEST_BUILDER` | API Request Builder Page | `BuilderPage` |  |
| 137 | `PAGE.API_INTEGRATION.API_RESPONSE_VIEWER` | API Response Viewer Page | `DetailPage` |  |
| 138 | `PAGE.API_INTEGRATION.API_ENVIRONMENT` | API Environment Page | `DetailPage` |  |
| 139 | `PAGE.API_INTEGRATION.API_MOCK` | API Mock Page | `DetailPage` |  |
| 140 | `PAGE.API_INTEGRATION.API_CONFORMANCE` | API Conformance Page | `DetailPage` |  |
| 141 | `PAGE.API_INTEGRATION.API_KEYS` | API Keys Page | `DetailPage` |  |
| 142 | `PAGE.API_INTEGRATION.WEBHOOK` | Webhook Page | `DetailPage` |  |
| 143 | `PAGE.API_INTEGRATION.WEBHOOK_DELIVERY` | Webhook Delivery Page | `DetailPage` |  |
| 144 | `PAGE.API_INTEGRATION.INTEGRATION_CATALOG` | Integration Catalog Page | `ListPage` |  |
| 145 | `PAGE.API_INTEGRATION.INTEGRATION_DETAIL` | Integration Detail Page | `DetailPage` |  |
| 146 | `PAGE.API_INTEGRATION.INTEGRATION_SETUP` | Integration Setup Page | `DetailPage` |  |
| 147 | `PAGE.API_INTEGRATION.INTEGRATION_CONNECTION` | Integration Connection Page | `DetailPage` |  |
| 148 | `PAGE.API_INTEGRATION.DEVELOPER_CONSOLE` | Developer Console Page | `StudioPage` |  |

### P12 Development & Source (11)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 149 | `PAGE.DEVELOPMENT_SOURCE.CODE_STUDIO` | Code Studio Page | `StudioPage` |  |
| 150 | `PAGE.DEVELOPMENT_SOURCE.CODE_EDITOR` | Code Editor Page | `StudioPage` |  |
| 151 | `PAGE.DEVELOPMENT_SOURCE.REPOSITORY` | Repository Page | `StudioPage` |  |
| 152 | `PAGE.DEVELOPMENT_SOURCE.REPOSITORY_BROWSER` | Repository Browser Page | `StudioPage` |  |
| 153 | `PAGE.DEVELOPMENT_SOURCE.COMMIT_DETAIL` | Commit Detail Page | `DetailPage` |  |
| 154 | `PAGE.DEVELOPMENT_SOURCE.BRANCH` | Branch Page | `StudioPage` |  |
| 155 | `PAGE.DEVELOPMENT_SOURCE.PULL_REQUEST` | Pull Request Page | `StudioPage` |  |
| 156 | `PAGE.DEVELOPMENT_SOURCE.ISSUE` | Issue Page | `StudioPage` |  |
| 157 | `PAGE.DEVELOPMENT_SOURCE.BUILD` | Build Page | `StudioPage` |  |
| 158 | `PAGE.DEVELOPMENT_SOURCE.CI_CD` | CI/CD Page | `StudioPage` |  |
| 159 | `PAGE.DEVELOPMENT_SOURCE.PIPELINE_DETAIL` | Pipeline Detail Page | `DetailPage` |  |

### P13 Infrastructure & Runtime (14)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 160 | `PAGE.INFRASTRUCTURE_RUNTIME.DEPLOYMENT` | Deployment Page | `ControlPlanePage` |  |
| 161 | `PAGE.INFRASTRUCTURE_RUNTIME.DEPLOYMENT_HISTORY` | Deployment History Page | `ListPage` |  |
| 162 | `PAGE.INFRASTRUCTURE_RUNTIME.ENVIRONMENT` | Environment Page | `ControlPlanePage` |  |
| 163 | `PAGE.INFRASTRUCTURE_RUNTIME.ENVIRONMENT_DETAIL` | Environment Detail Page | `DetailPage` |  |
| 164 | `PAGE.INFRASTRUCTURE_RUNTIME.INFRASTRUCTURE` | Infrastructure Page | `ControlPlanePage` |  |
| 165 | `PAGE.INFRASTRUCTURE_RUNTIME.INFRASTRUCTURE_RESOURCE` | Infrastructure Resource Page | `ControlPlanePage` |  |
| 166 | `PAGE.INFRASTRUCTURE_RUNTIME.SERVER` | Server Page | `ControlPlanePage` |  |
| 167 | `PAGE.INFRASTRUCTURE_RUNTIME.SERVICE` | Service Page | `ControlPlanePage` |  |
| 168 | `PAGE.INFRASTRUCTURE_RUNTIME.DATABASE` | Database Page | `ControlPlanePage` |  |
| 169 | `PAGE.INFRASTRUCTURE_RUNTIME.DATABASE_EXPLORER` | Database Explorer Page | `ControlPlanePage` |  |
| 170 | `PAGE.INFRASTRUCTURE_RUNTIME.MIGRATION` | Migration Page | `ControlPlanePage` |  |
| 171 | `PAGE.INFRASTRUCTURE_RUNTIME.MIGRATION_HISTORY` | Migration History Page | `ListPage` |  |
| 172 | `PAGE.INFRASTRUCTURE_RUNTIME.BACKUP` | Backup Page | `ControlPlanePage` |  |
| 173 | `PAGE.INFRASTRUCTURE_RUNTIME.RESTORE` | Restore Page | `ControlPlanePage` |  |

### P14 Observability & Reliability (11)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 174 | `PAGE.OBSERVABILITY_RELIABILITY.OBSERVABILITY` | Observability Page | `DashboardPage` |  |
| 175 | `PAGE.OBSERVABILITY_RELIABILITY.METRICS` | Metrics Page | `DashboardPage` |  |
| 176 | `PAGE.OBSERVABILITY_RELIABILITY.LOGS` | Logs Page | `ListPage` |  |
| 177 | `PAGE.OBSERVABILITY_RELIABILITY.TRACE` | Trace Page | `DashboardPage` |  |
| 178 | `PAGE.OBSERVABILITY_RELIABILITY.INCIDENT` | Incident Page | `DashboardPage` |  |
| 179 | `PAGE.OBSERVABILITY_RELIABILITY.INCIDENT_DETAIL` | Incident Detail Page | `DetailPage` |  |
| 180 | `PAGE.OBSERVABILITY_RELIABILITY.ALERT` | Alert Page | `DashboardPage` |  |
| 181 | `PAGE.OBSERVABILITY_RELIABILITY.ALERT_DETAIL` | Alert Detail Page | `DetailPage` |  |
| 182 | `PAGE.OBSERVABILITY_RELIABILITY.HEALTH` | Health Page | `DashboardPage` |  |
| 183 | `PAGE.OBSERVABILITY_RELIABILITY.TOPOLOGY` | Topology Page | `DashboardPage` |  |
| 184 | `PAGE.OBSERVABILITY_RELIABILITY.NETWORK` | Network Page | `DashboardPage` |  |

### P15 Administration & Configuration (29)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 185 | `PAGE.ADMIN_CONFIGURATION.SECRET_REFERENCES` | Secret References Page | `AdminPage` |  |
| 186 | `PAGE.ADMIN_CONFIGURATION.CONFIGURATION` | Configuration Page | `SettingsPage` |  |
| 187 | `PAGE.ADMIN_CONFIGURATION.FEATURE_FLAGS` | Feature Flags Page | `AdminPage` |  |
| 188 | `PAGE.ADMIN_CONFIGURATION.WORKSPACE` | Workspace Page | `AdminPage` |  |
| 189 | `PAGE.ADMIN_CONFIGURATION.WORKSPACE_MEMBERS` | Workspace Members Page | `AdminPage` |  |
| 190 | `PAGE.ADMIN_CONFIGURATION.ORGANISATION` | Organisation Page | `AdminPage` |  |
| 191 | `PAGE.ADMIN_CONFIGURATION.ORGANISATION_MEMBERS` | Organisation Members Page | `AdminPage` |  |
| 192 | `PAGE.ADMIN_CONFIGURATION.PEOPLE_DIRECTORY` | People Directory Page | `ListPage` |  |
| 193 | `PAGE.ADMIN_CONFIGURATION.PERSON_PROFILE` | Person Profile Page | `DetailPage` |  |
| 194 | `PAGE.ADMIN_CONFIGURATION.USER_PROFILE` | User Profile Page | `DetailPage` |  |
| 195 | `PAGE.ADMIN_CONFIGURATION.ACCOUNT` | Account Page | `AdminPage` |  |
| 196 | `PAGE.ADMIN_CONFIGURATION.PREFERENCES` | Preferences Page | `SettingsPage` |  |
| 197 | `PAGE.ADMIN_CONFIGURATION.SETTINGS_HOME` | Settings Home Page | `SettingsPage` |  |
| 198 | `PAGE.ADMIN_CONFIGURATION.GENERAL_SETTINGS` | General Settings Page | `SettingsPage` |  |
| 199 | `PAGE.ADMIN_CONFIGURATION.APPEARANCE_SETTINGS` | Appearance Settings Page | `SettingsPage` |  |
| 200 | `PAGE.ADMIN_CONFIGURATION.NOTIFICATION_SETTINGS` | Notification Settings Page | `SettingsPage` |  |
| 201 | `PAGE.ADMIN_CONFIGURATION.SECURITY_SETTINGS` | Security Settings Page | `SettingsPage` |  |
| 202 | `PAGE.ADMIN_CONFIGURATION.PRIVACY_SETTINGS` | Privacy Settings Page | `SettingsPage` |  |
| 203 | `PAGE.ADMIN_CONFIGURATION.LANGUAGE_AND_REGION` | Language & Region Page | `AdminPage` |  |
| 204 | `PAGE.ADMIN_CONFIGURATION.CONNECTED_APPS` | Connected Apps Page | `AdminPage` |  |
| 205 | `PAGE.ADMIN_CONFIGURATION.SESSIONS` | Sessions Page | `AdminPage` |  |
| 206 | `PAGE.ADMIN_CONFIGURATION.DEVICES` | Devices Page | `AdminPage` |  |
| 207 | `PAGE.ADMIN_CONFIGURATION.ROLES` | Roles Page | `AdminPage` |  |
| 208 | `PAGE.ADMIN_CONFIGURATION.ROLE_DETAIL` | Role Detail Page | `DetailPage` |  |
| 209 | `PAGE.ADMIN_CONFIGURATION.PERMISSIONS` | Permissions Page | `AdminPage` |  |
| 210 | `PAGE.ADMIN_CONFIGURATION.ACCESS_POLICIES` | Access Policies Page | `AdminPage` |  |
| 211 | `PAGE.ADMIN_CONFIGURATION.TEAMS` | Teams Page | `AdminPage` |  |
| 212 | `PAGE.ADMIN_CONFIGURATION.TEAM_DETAIL` | Team Detail Page | `DetailPage` |  |
| 213 | `PAGE.ADMIN_CONFIGURATION.CONTACTS` | Contacts Page | `AdminPage` |  |

### P16 CRM & Sales (8)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 214 | `PAGE.CRM_SALES.CONTACT_DETAIL` | Contact Detail Page | `DetailPage` |  |
| 215 | `PAGE.CRM_SALES.CRM_ACCOUNTS` | CRM Accounts Page | `ListPage` |  |
| 216 | `PAGE.CRM_SALES.CRM_ACCOUNT_DETAIL` | CRM Account Detail Page | `DetailPage` |  |
| 217 | `PAGE.CRM_SALES.LEADS` | Leads Page | `ListPage` |  |
| 218 | `PAGE.CRM_SALES.LEAD_DETAIL` | Lead Detail Page | `DetailPage` |  |
| 219 | `PAGE.CRM_SALES.OPPORTUNITIES` | Opportunities Page | `ListPage` |  |
| 220 | `PAGE.CRM_SALES.OPPORTUNITY_DETAIL` | Opportunity Detail Page | `DetailPage` |  |
| 221 | `PAGE.CRM_SALES.PIPELINE` | Pipeline Page | `ListPage` |  |

### P17 Communication (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 222 | `PAGE.COMMUNICATION.INBOX` | Inbox Page | `ListPage` |  |
| 223 | `PAGE.COMMUNICATION.MESSAGE_THREAD` | Message Thread Page | `DetailPage` |  |
| 224 | `PAGE.COMMUNICATION.COMPOSE_MESSAGE` | Compose Message Page | `CreatePage` |  |
| 225 | `PAGE.COMMUNICATION.CHAT` | Chat Page | `ListPage` |  |
| 226 | `PAGE.COMMUNICATION.MESSENGER` | Messenger Page | `ListPage` |  |
| 227 | `PAGE.COMMUNICATION.ANNOUNCEMENTS` | Announcements Page | `ListPage` |  |
| 228 | `PAGE.COMMUNICATION.ANNOUNCEMENT_DETAIL` | Announcement Detail Page | `DetailPage` |  |
| 229 | `PAGE.COMMUNICATION.NOTIFICATIONS` | Notifications Page | `ListPage` |  |
| 230 | `PAGE.COMMUNICATION.NOTIFICATION_DETAIL` | Notification Detail Page | `DetailPage` |  |
| 231 | `PAGE.COMMUNICATION.MAIL` | Mail Page | `ListPage` |  |

### P18 Productivity & Planning (13)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 232 | `PAGE.PRODUCTIVITY_PLANNING.CALENDAR` | Calendar Page | `ListPage` |  |
| 233 | `PAGE.PRODUCTIVITY_PLANNING.CALENDAR_EVENT` | Calendar Event Page | `ListPage` |  |
| 234 | `PAGE.PRODUCTIVITY_PLANNING.SCHEDULER` | Scheduler Page | `ListPage` |  |
| 235 | `PAGE.PRODUCTIVITY_PLANNING.AGENDA` | Agenda Page | `ListPage` |  |
| 236 | `PAGE.PRODUCTIVITY_PLANNING.TASKS` | Tasks Page | `ListPage` |  |
| 237 | `PAGE.PRODUCTIVITY_PLANNING.TASK_DETAIL` | Task Detail Page | `DetailPage` |  |
| 238 | `PAGE.PRODUCTIVITY_PLANNING.KANBAN` | Kanban Page | `ListPage` |  |
| 239 | `PAGE.PRODUCTIVITY_PLANNING.SCRUM_BOARD` | Scrum Board Page | `ListPage` |  |
| 240 | `PAGE.PRODUCTIVITY_PLANNING.BACKLOG` | Backlog Page | `ListPage` |  |
| 241 | `PAGE.PRODUCTIVITY_PLANNING.SPRINT` | Sprint Page | `ListPage` |  |
| 242 | `PAGE.PRODUCTIVITY_PLANNING.MILESTONES` | Milestones Page | `ListPage` |  |
| 243 | `PAGE.PRODUCTIVITY_PLANNING.GANTT` | Gantt Page | `ListPage` |  |
| 244 | `PAGE.PRODUCTIVITY_PLANNING.ROADMAP_PLANNER` | Roadmap Planner Page | `ListPage` |  |

### P19 Projects & Programs (8)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 245 | `PAGE.PROJECTS_PROGRAMS.PROJECT_LIST` | Project List Page | `ListPage` |  |
| 246 | `PAGE.PROJECTS_PROGRAMS.PROJECT_DETAIL` | Project Detail Page | `DetailPage` |  |
| 247 | `PAGE.PROJECTS_PROGRAMS.PROJECT_WORKSPACE` | Project Workspace Page | `DetailPage` |  |
| 248 | `PAGE.PROJECTS_PROGRAMS.PROJECT_FILES` | Project Files Page | `DetailPage` |  |
| 249 | `PAGE.PROJECTS_PROGRAMS.PROJECT_TEAM` | Project Team Page | `DetailPage` |  |
| 250 | `PAGE.PROJECTS_PROGRAMS.PROJECT_ACTIVITY` | Project Activity Page | `DetailPage` |  |
| 251 | `PAGE.PROJECTS_PROGRAMS.PROJECT_TIMELINE` | Project Timeline Page | `DetailPage` |  |
| 252 | `PAGE.PROJECTS_PROGRAMS.PROJECT_SETTINGS` | Project Settings Page | `SettingsPage` |  |

### P20 Documents & Files (15)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 253 | `PAGE.DOCUMENTS_FILES.FILE_MANAGER` | File Manager Page | `ListPage` |  |
| 254 | `PAGE.DOCUMENTS_FILES.FILE_DETAIL` | File Detail Page | `DetailPage` |  |
| 255 | `PAGE.DOCUMENTS_FILES.DOCUMENT_LIBRARY` | Document Library Page | `ListPage` |  |
| 256 | `PAGE.DOCUMENTS_FILES.DOCUMENT_VIEWER` | Document Viewer Page | `DetailPage` |  |
| 257 | `PAGE.DOCUMENTS_FILES.DOCUMENT_EDITOR` | Document Editor Page | `StudioPage` |  |
| 258 | `PAGE.DOCUMENTS_FILES.SPREADSHEET` | Spreadsheet Page | `StudioPage` |  |
| 259 | `PAGE.DOCUMENTS_FILES.PRESENTATION` | Presentation Page | `StudioPage` |  |
| 260 | `PAGE.DOCUMENTS_FILES.NOTES` | Notes Page | `StudioPage` |  |
| 261 | `PAGE.DOCUMENTS_FILES.NOTE_EDITOR` | Note Editor Page | `StudioPage` |  |
| 262 | `PAGE.DOCUMENTS_FILES.NOTEBOOK` | Notebook Page | `StudioPage` |  |
| 263 | `PAGE.DOCUMENTS_FILES.WHITEBOARD` | Whiteboard Page | `StudioPage` |  |
| 264 | `PAGE.DOCUMENTS_FILES.CANVAS` | Canvas Page | `StudioPage` |  |
| 265 | `PAGE.DOCUMENTS_FILES.DIAGRAM` | Diagram Page | `StudioPage` |  |
| 266 | `PAGE.DOCUMENTS_FILES.GRAPH` | Graph Page | `StudioPage` |  |
| 267 | `PAGE.DOCUMENTS_FILES.MIND_MAP` | Mind Map Page | `StudioPage` |  |

### P21 Builders & Automation (17)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 268 | `PAGE.BUILDERS_AUTOMATION.WORKFLOW_BUILDER` | Workflow Builder Page | `BuilderPage` |  |
| 269 | `PAGE.BUILDERS_AUTOMATION.WORKFLOW_DETAIL` | Workflow Detail Page | `DetailPage` |  |
| 270 | `PAGE.BUILDERS_AUTOMATION.WORKFLOW_RUN` | Workflow Run Page | `BuilderPage` |  |
| 271 | `PAGE.BUILDERS_AUTOMATION.WORKFLOW_HISTORY` | Workflow History Page | `ListPage` |  |
| 272 | `PAGE.BUILDERS_AUTOMATION.AUTOMATION` | Automation Page | `BuilderPage` |  |
| 273 | `PAGE.BUILDERS_AUTOMATION.AUTOMATION_BUILDER` | Automation Builder Page | `BuilderPage` |  |
| 274 | `PAGE.BUILDERS_AUTOMATION.RULE_BUILDER` | Rule Builder Page | `BuilderPage` |  |
| 275 | `PAGE.BUILDERS_AUTOMATION.FORM_BUILDER` | Form Builder Page | `BuilderPage` |  |
| 276 | `PAGE.BUILDERS_AUTOMATION.FORM` | Form Page | `CreatePage` |  |
| 277 | `PAGE.BUILDERS_AUTOMATION.FORM_SUBMISSION` | Form Submission Page | `DetailPage` |  |
| 278 | `PAGE.BUILDERS_AUTOMATION.SURVEY_BUILDER` | Survey Builder Page | `BuilderPage` |  |
| 279 | `PAGE.BUILDERS_AUTOMATION.SURVEY` | Survey Page | `CreatePage` |  |
| 280 | `PAGE.BUILDERS_AUTOMATION.PAGE_BUILDER` | Page Builder Page | `BuilderPage` |  |
| 281 | `PAGE.BUILDERS_AUTOMATION.APP_BUILDER` | App Builder Page | `BuilderPage` |  |
| 282 | `PAGE.BUILDERS_AUTOMATION.MOBILE_BUILDER` | Mobile Builder Page | `BuilderPage` |  |
| 283 | `PAGE.BUILDERS_AUTOMATION.TEMPLATE_GALLERY` | Template Gallery Page | `ListPage` |  |
| 284 | `PAGE.BUILDERS_AUTOMATION.TEMPLATE_DETAIL` | Template Detail Page | `DetailPage` |  |

### P22 Design System (6)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 285 | `PAGE.DESIGN_SYSTEM.COMPONENT_GALLERY` | Component Gallery Page | `ListPage` |  |
| 286 | `PAGE.DESIGN_SYSTEM.COMPONENT_DETAIL` | Component Detail Page | `DetailPage` |  |
| 287 | `PAGE.DESIGN_SYSTEM.DESIGN_SYSTEM` | Design System Page | `DocumentationPage` |  |
| 288 | `PAGE.DESIGN_SYSTEM.TOKEN_EXPLORER` | Token Explorer Page | `DocumentationPage` |  |
| 289 | `PAGE.DESIGN_SYSTEM.THEME_BUILDER` | Theme Builder Page | `BuilderPage` |  |
| 290 | `PAGE.DESIGN_SYSTEM.ICON_LIBRARY` | Icon Library Page | `ListPage` |  |

### P23 Media & Creative (11)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 291 | `PAGE.MEDIA_CREATIVE.ASSET_LIBRARY` | Asset Library Page | `ListPage` |  |
| 292 | `PAGE.MEDIA_CREATIVE.MEDIA_LIBRARY` | Media Library Page | `ListPage` |  |
| 293 | `PAGE.MEDIA_CREATIVE.IMAGE_DETAIL` | Image Detail Page | `DetailPage` |  |
| 294 | `PAGE.MEDIA_CREATIVE.VIDEO_DETAIL` | Video Detail Page | `DetailPage` |  |
| 295 | `PAGE.MEDIA_CREATIVE.AUDIO_DETAIL` | Audio Detail Page | `DetailPage` |  |
| 296 | `PAGE.MEDIA_CREATIVE.MEDIA_VIEWER` | Media Viewer Page | `DetailPage` |  |
| 297 | `PAGE.MEDIA_CREATIVE.LIGHTBOX` | Lightbox Page | `DetailPage` |  |
| 298 | `PAGE.MEDIA_CREATIVE.VIDEO_EDITOR` | Video Editor Page | `StudioPage` |  |
| 299 | `PAGE.MEDIA_CREATIVE.AUDIO_EDITOR` | Audio Editor Page | `StudioPage` |  |
| 300 | `PAGE.MEDIA_CREATIVE.MEDIA_STUDIO` | Media Studio Page | `StudioPage` |  |
| 301 | `PAGE.MEDIA_CREATIVE.CREATIVE_STUDIO` | Creative Studio Page | `StudioPage` |  |

### P24 Spatial & 3D (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 302 | `PAGE.SPATIAL_3D.THREE_D_STUDIO` | 3D Studio Page | `StudioPage` |  |
| 303 | `PAGE.SPATIAL_3D.SPATIAL_STUDIO` | Spatial Studio Page | `StudioPage` |  |
| 304 | `PAGE.SPATIAL_3D.CAD` | CAD Page | `StudioPage` |  |
| 305 | `PAGE.SPATIAL_3D.THREE_D_PREVIEW` | 3D Preview Page | `StudioPage` |  |
| 306 | `PAGE.SPATIAL_3D.FLOOR_PLAN` | Floor Plan Page | `StudioPage` |  |
| 307 | `PAGE.SPATIAL_3D.VENUE_LAYOUT` | Venue Layout Page | `StudioPage` |  |
| 308 | `PAGE.SPATIAL_3D.MAP` | Map Page | `StudioPage` |  |
| 309 | `PAGE.SPATIAL_3D.MAP_EXPLORER` | Map Explorer Page | `StudioPage` |  |
| 310 | `PAGE.SPATIAL_3D.ROUTE_PLANNER` | Route Planner Page | `StudioPage` |  |
| 311 | `PAGE.SPATIAL_3D.LOCATION_DETAIL` | Location Detail Page | `DetailPage` |  |
| 312 | `PAGE.SPATIAL_3D.DIGITAL_TWIN` | Digital Twin Page | `StudioPage` |  |
| 313 | `PAGE.SPATIAL_3D.SIMULATION` | Simulation Page | `StudioPage` |  |

### P25 AI & Knowledge (17)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 314 | `PAGE.AI_KNOWLEDGE.AI_HOME` | AI Home Page | `StudioPage` |  |
| 315 | `PAGE.AI_KNOWLEDGE.AI_ASSISTANT` | AI Assistant Page | `StudioPage` |  |
| 316 | `PAGE.AI_KNOWLEDGE.AI_CHAT` | AI Chat Page | `StudioPage` |  |
| 317 | `PAGE.AI_KNOWLEDGE.AGENT_CATALOG` | Agent Catalog Page | `ListPage` |  |
| 318 | `PAGE.AI_KNOWLEDGE.AGENT_DETAIL` | Agent Detail Page | `DetailPage` |  |
| 319 | `PAGE.AI_KNOWLEDGE.AGENT_BUILDER` | Agent Builder Page | `BuilderPage` |  |
| 320 | `PAGE.AI_KNOWLEDGE.AGENT_RUN` | Agent Run Page | `StudioPage` |  |
| 321 | `PAGE.AI_KNOWLEDGE.PROMPT_LIBRARY` | Prompt Library Page | `ListPage` |  |
| 322 | `PAGE.AI_KNOWLEDGE.PROMPT_EDITOR` | Prompt Editor Page | `StudioPage` |  |
| 323 | `PAGE.AI_KNOWLEDGE.MODEL_CATALOG` | Model Catalog Page | `ListPage` |  |
| 324 | `PAGE.AI_KNOWLEDGE.MODEL_DETAIL` | Model Detail Page | `DetailPage` |  |
| 325 | `PAGE.AI_KNOWLEDGE.AI_PLAYGROUND` | AI Playground Page | `StudioPage` |  |
| 326 | `PAGE.AI_KNOWLEDGE.AI_EVALUATION` | AI Evaluation Page | `StudioPage` |  |
| 327 | `PAGE.AI_KNOWLEDGE.AI_OBSERVABILITY` | AI Observability Page | `StudioPage` |  |
| 328 | `PAGE.AI_KNOWLEDGE.KNOWLEDGE` | Knowledge Page | `StudioPage` |  |
| 329 | `PAGE.AI_KNOWLEDGE.KNOWLEDGE_SOURCE` | Knowledge Source Page | `StudioPage` |  |
| 330 | `PAGE.AI_KNOWLEDGE.RAG_INDEX` | RAG/Index Page | `ListPage` |  |

### P26 Marketplace & Commerce (19)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 331 | `PAGE.MARKETPLACE_COMMERCE.MARKETPLACE_HOME` | Marketplace Home Page | `ListPage` |  |
| 332 | `PAGE.MARKETPLACE_COMMERCE.MARKETPLACE_SEARCH` | Marketplace Search Page | `SearchPage` |  |
| 333 | `PAGE.MARKETPLACE_COMMERCE.CATEGORY` | Category Page | `ListPage` |  |
| 334 | `PAGE.MARKETPLACE_COMMERCE.LISTING` | Listing Page | `ListPage` |  |
| 335 | `PAGE.MARKETPLACE_COMMERCE.VENDOR_DIRECTORY` | Vendor Directory Page | `ListPage` |  |
| 336 | `PAGE.MARKETPLACE_COMMERCE.VENDOR_PROFILE` | Vendor Profile Page | `DetailPage` |  |
| 337 | `PAGE.MARKETPLACE_COMMERCE.VENDOR_DASHBOARD` | Vendor Dashboard Page | `DashboardPage` |  |
| 338 | `PAGE.MARKETPLACE_COMMERCE.SERVICE_CATALOG` | Service Catalog Page | `ListPage` |  |
| 339 | `PAGE.MARKETPLACE_COMMERCE.SERVICE_DETAIL` | Service Detail Page | `DetailPage` |  |
| 340 | `PAGE.MARKETPLACE_COMMERCE.SKU_CATALOG` | SKU Catalog Page | `ListPage` |  |
| 341 | `PAGE.MARKETPLACE_COMMERCE.SKU_DETAIL` | SKU Detail Page | `DetailPage` |  |
| 342 | `PAGE.MARKETPLACE_COMMERCE.COMPARE_VENDORS` | Compare Vendors Page | `ListPage` |  |
| 343 | `PAGE.MARKETPLACE_COMMERCE.WISHLIST` | Wishlist Page | `ListPage` |  |
| 344 | `PAGE.MARKETPLACE_COMMERCE.FAVORITES` | Favorites Page | `ListPage` |  |
| 345 | `PAGE.MARKETPLACE_COMMERCE.CART` | Cart Page | `TransactionPage` |  |
| 346 | `PAGE.MARKETPLACE_COMMERCE.CHECKOUT` | Checkout Page | `TransactionPage` |  |
| 347 | `PAGE.MARKETPLACE_COMMERCE.ORDER_CONFIRMATION` | Order Confirmation Page | `TransactionPage` |  |
| 348 | `PAGE.MARKETPLACE_COMMERCE.ORDERS` | Orders Page | `ListPage` |  |
| 349 | `PAGE.MARKETPLACE_COMMERCE.ORDER_DETAIL` | Order Detail Page | `DetailPage` |  |

### P27 Booking (8)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 350 | `PAGE.BOOKING.BOOKING_HOME` | Booking Home Page | `TransactionPage` |  |
| 351 | `PAGE.BOOKING.BOOKING_SEARCH` | Booking Search Page | `SearchPage` |  |
| 352 | `PAGE.BOOKING.BOOKING_SELECTION` | Booking Selection Page | `TransactionPage` |  |
| 353 | `PAGE.BOOKING.BOOKING_REVIEW` | Booking Review Page | `ReviewPage` |  |
| 354 | `PAGE.BOOKING.BOOKING_PAYMENT` | Booking Payment Page | `TransactionPage` |  |
| 355 | `PAGE.BOOKING.BOOKING_CONFIRMATION` | Booking Confirmation Page | `TransactionPage` |  |
| 356 | `PAGE.BOOKING.BOOKINGS` | Bookings Page | `ListPage` |  |
| 357 | `PAGE.BOOKING.BOOKING_DETAIL` | Booking Detail Page | `DetailPage` |  |

### P28 Commercial, Finance & Investment (25)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 358 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.QUOTE` | Quote Page | `DataPage` |  |
| 359 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PROPOSAL` | Proposal Page | `DataPage` |  |
| 360 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PROPOSAL_BUILDER` | Proposal Builder Page | `BuilderPage` |  |
| 361 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.CONTRACT` | Contract Page | `DataPage` |  |
| 362 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.INVOICE` | Invoice Page | `DataPage` |  |
| 363 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.INVOICES` | Invoices Page | `DataPage` |  |
| 364 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PAYMENTS` | Payments Page | `DataPage` |  |
| 365 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PAYMENT_DETAIL` | Payment Detail Page | `DetailPage` |  |
| 366 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PAYOUTS` | Payouts Page | `DataPage` |  |
| 367 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.TRANSACTIONS` | Transactions Page | `DataPage` |  |
| 368 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.FINANCE_DASHBOARD` | Finance Dashboard Page | `DashboardPage` |  |
| 369 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.BUDGET` | Budget Page | `DataPage` |  |
| 370 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.EXPENSE` | Expense Page | `DataPage` |  |
| 371 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.REVENUE` | Revenue Page | `DataPage` |  |
| 372 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.CASH_FLOW` | Cash Flow Page | `DataPage` |  |
| 373 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.FORECAST` | Forecast Page | `DataPage` |  |
| 374 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.ACCOUNTING` | Accounting Page | `DataPage` |  |
| 375 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.LEDGER` | Ledger Page | `DataPage` |  |
| 376 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.RECONCILIATION` | Reconciliation Page | `DataPage` |  |
| 377 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.TAX` | Tax Page | `DataPage` |  |
| 378 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.INVESTOR_DASHBOARD` | Investor Dashboard Page | `DashboardPage` |  |
| 379 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PORTFOLIO` | Investment Portfolio Page | `DataPage` |  |
| 380 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.INVESTMENT_DETAIL` | Investment Detail Page | `DetailPage` |  |
| 381 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.FUNDRAISING` | Fundraising Page | `DataPage` |  |
| 382 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.CAP_TABLE` | Cap Table Page | `DataPage` |  |

### P29 Events (17)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 383 | `PAGE.EVENTS.EVENT_DISCOVERY` | Event Discovery Page | `SearchPage` |  |
| 384 | `PAGE.EVENTS.EVENT_CATEGORY` | Event Category Page | `ListPage` |  |
| 385 | `PAGE.EVENTS.EVENT_DETAIL` | Event Detail Page | `DetailPage` |  |
| 386 | `PAGE.EVENTS.EVENT_BUILDER` | Event Builder Page | `BuilderPage` |  |
| 387 | `PAGE.EVENTS.EVENT_DASHBOARD` | Event Dashboard Page | `DashboardPage` |  |
| 388 | `PAGE.EVENTS.EVENT_PRODUCTION` | Event Production Page | `DetailPage` |  |
| 389 | `PAGE.EVENTS.EVENT_SCHEDULE` | Event Schedule Page | `DetailPage` |  |
| 390 | `PAGE.EVENTS.EVENT_GUESTS` | Event Guests Page | `DetailPage` |  |
| 391 | `PAGE.EVENTS.GUEST_DETAIL` | Guest Detail Page | `DetailPage` |  |
| 392 | `PAGE.EVENTS.EVENT_VENDORS` | Event Vendors Page | `DetailPage` |  |
| 393 | `PAGE.EVENTS.EVENT_SERVICES` | Event Services Page | `DetailPage` |  |
| 394 | `PAGE.EVENTS.EVENT_VENUE` | Event Venue Page | `DetailPage` |  |
| 395 | `PAGE.EVENTS.EVENT_SPATIAL` | Event Spatial Page | `DetailPage` |  |
| 396 | `PAGE.EVENTS.EVENT_SPONSORSHIP` | Event Sponsorship Page | `DetailPage` |  |
| 397 | `PAGE.EVENTS.SPONSOR_DETAIL` | Sponsor Detail Page | `DetailPage` |  |
| 398 | `PAGE.EVENTS.EVENT_ROI` | Event ROI Page | `DetailPage` |  |
| 399 | `PAGE.EVENTS.EVENT_SETTLEMENT` | Event Settlement Page | `DetailPage` |  |

### P30 Production & Logistics (24)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 400 | `PAGE.PRODUCTION_LOGISTICS.PRODUCTION_DASHBOARD` | Production Dashboard Page | `DashboardPage` |  |
| 401 | `PAGE.PRODUCTION_LOGISTICS.PRODUCTION_SCHEDULE` | Production Schedule Page | `DetailPage` |  |
| 402 | `PAGE.PRODUCTION_LOGISTICS.CALL_SHEET` | Call Sheet Page | `DetailPage` |  |
| 403 | `PAGE.PRODUCTION_LOGISTICS.CASTING` | Casting Page | `DetailPage` |  |
| 404 | `PAGE.PRODUCTION_LOGISTICS.CASTING_DETAIL` | Casting Detail Page | `DetailPage` |  |
| 405 | `PAGE.PRODUCTION_LOGISTICS.CREW` | Crew Page | `DetailPage` |  |
| 406 | `PAGE.PRODUCTION_LOGISTICS.CREW_DETAIL` | Crew Detail Page | `DetailPage` |  |
| 407 | `PAGE.PRODUCTION_LOGISTICS.LOCATIONS` | Locations Page | `DetailPage` |  |
| 408 | `PAGE.PRODUCTION_LOGISTICS.LOCATION_WORKSPACE` | Location Workspace Page | `DetailPage` |  |
| 409 | `PAGE.PRODUCTION_LOGISTICS.SHOT_LIST` | Shot List Page | `ListPage` |  |
| 410 | `PAGE.PRODUCTION_LOGISTICS.SHOT_DETAIL` | Shot Detail Page | `DetailPage` |  |
| 411 | `PAGE.PRODUCTION_LOGISTICS.STORYBOARD` | Storyboard Page | `DetailPage` |  |
| 412 | `PAGE.PRODUCTION_LOGISTICS.SCENE` | Scene Page | `DetailPage` |  |
| 413 | `PAGE.PRODUCTION_LOGISTICS.SCRIPT` | Script Page | `DetailPage` |  |
| 414 | `PAGE.PRODUCTION_LOGISTICS.SCRIPT_BREAKDOWN` | Script Breakdown Page | `DetailPage` |  |
| 415 | `PAGE.PRODUCTION_LOGISTICS.SCHEDULE_BOARD` | Schedule Board Page | `DetailPage` |  |
| 416 | `PAGE.PRODUCTION_LOGISTICS.EQUIPMENT` | Equipment Page | `DetailPage` |  |
| 417 | `PAGE.PRODUCTION_LOGISTICS.LOGISTICS` | Logistics Page | `DetailPage` |  |
| 418 | `PAGE.PRODUCTION_LOGISTICS.TRAVEL` | Travel Page | `DetailPage` |  |
| 419 | `PAGE.PRODUCTION_LOGISTICS.ACCOMMODATION` | Accommodation Page | `DetailPage` |  |
| 420 | `PAGE.PRODUCTION_LOGISTICS.TRANSPORT` | Transport Page | `DetailPage` |  |
| 421 | `PAGE.PRODUCTION_LOGISTICS.PERMITS` | Permits Page | `DetailPage` |  |
| 422 | `PAGE.PRODUCTION_LOGISTICS.INSURANCE` | Insurance Page | `DetailPage` |  |
| 423 | `PAGE.PRODUCTION_LOGISTICS.PRODUCTION_FINANCE` | Production Finance Page | `DetailPage` |  |

### P31 Education (9)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 424 | `PAGE.EDUCATION.EDUCATION_HOME` | Education Home Page | `DetailPage` |  |
| 425 | `PAGE.EDUCATION.COURSE_CATALOG` | Course Catalog Page | `ListPage` |  |
| 426 | `PAGE.EDUCATION.COURSE_DETAIL` | Course Detail Page | `DetailPage` |  |
| 427 | `PAGE.EDUCATION.LESSON` | Lesson Page | `DetailPage` |  |
| 428 | `PAGE.EDUCATION.QUIZ` | Quiz Page | `DetailPage` |  |
| 429 | `PAGE.EDUCATION.EXAM` | Exam Page | `DetailPage` |  |
| 430 | `PAGE.EDUCATION.ASSIGNMENT` | Assignment Page | `DetailPage` |  |
| 431 | `PAGE.EDUCATION.PROGRESS` | Progress Page | `DetailPage` |  |
| 432 | `PAGE.EDUCATION.CERTIFICATE` | Certificate Page | `DetailPage` |  |

### P32 Community (5)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 433 | `PAGE.COMMUNITY.COMMUNITY` | Community Page | `ListPage` |  |
| 434 | `PAGE.COMMUNITY.FORUM` | Forum Page | `ListPage` |  |
| 435 | `PAGE.COMMUNITY.DISCUSSION_DETAIL` | Discussion Detail Page | `DetailPage` |  |
| 436 | `PAGE.COMMUNITY.MEMBERS` | Members Page | `ListPage` |  |
| 437 | `PAGE.COMMUNITY.FEED` | Feed Page | `ListPage` |  |

### P33 System States (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 438 | `PAGE.SYSTEM_STATES.404` | 404 Page | `ErrorPage` |  |
| 439 | `PAGE.SYSTEM_STATES.401` | 401 Page | `ErrorPage` |  |
| 440 | `PAGE.SYSTEM_STATES.403` | 403 Page | `ErrorPage` |  |
| 441 | `PAGE.SYSTEM_STATES.500` | 500 Page | `ErrorPage` |  |
| 442 | `PAGE.SYSTEM_STATES.502_503` | 502/503 Page | `ErrorPage` |  |
| 443 | `PAGE.SYSTEM_STATES.OFFLINE` | Offline Page | `ErrorPage` |  |
| 444 | `PAGE.SYSTEM_STATES.MAINTENANCE` | Maintenance Page | `ErrorPage` |  |
| 445 | `PAGE.SYSTEM_STATES.RATE_LIMIT` | Rate Limit Page | `ErrorPage` |  |
| 446 | `PAGE.SYSTEM_STATES.UNSUPPORTED_BROWSER` | Unsupported Browser Page | `ErrorPage` |  |
| 447 | `PAGE.SYSTEM_STATES.UPGRADE_REQUIRED` | Upgrade Required Page | `ErrorPage` |  |
| 448 | `PAGE.SYSTEM_STATES.EMPTY_STATE` | Empty State Page | `ErrorPage` |  |
| 449 | `PAGE.SYSTEM_STATES.LOADING` | Loading Page | `ErrorPage` |  |

### P34 Transaction States (5)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 450 | `PAGE.TRANSACTION_STATES.PROCESSING` | Processing Page | `TransactionPage` |  |
| 451 | `PAGE.TRANSACTION_STATES.SUCCESS` | Success Page | `TransactionPage` |  |
| 452 | `PAGE.TRANSACTION_STATES.FAILURE` | Failure Page | `TransactionPage` |  |
| 453 | `PAGE.TRANSACTION_STATES.CONFIRMATION` | Confirmation Page | `TransactionPage` |  |
| 454 | `PAGE.TRANSACTION_STATES.REDIRECT` | Redirect Page | `TransactionPage` |  |

### P35 Presentation Modes (8)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 455 | `PAGE.PRESENTATION_MODES.PRINT` | Print Page | `PresentationPage` |  |
| 456 | `PAGE.PRESENTATION_MODES.SHARE` | Share Page | `PresentationPage` |  |
| 457 | `PAGE.PRESENTATION_MODES.EMBED` | Embed Page | `PresentationPage` |  |
| 458 | `PAGE.PRESENTATION_MODES.PREVIEW` | Preview Page | `PresentationPage` |  |
| 459 | `PAGE.PRESENTATION_MODES.FULLSCREEN` | Fullscreen Page | `PresentationPage` |  |
| 460 | `PAGE.PRESENTATION_MODES.KIOSK` | Kiosk Page | `PresentationPage` |  |
| 461 | `PAGE.PRESENTATION_MODES.TV_DISPLAY` | TV/Display Page | `PresentationPage` |  |
| 462 | `PAGE.PRESENTATION_MODES.WALLBOARD` | Wallboard Page | `PresentationPage` |  |

### P36 Experimental & Internal (6)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 463 | `PAGE.EXPERIMENTAL_INTERNAL.DEMO` | Demo Page | `StudioPage` |  |
| 464 | `PAGE.EXPERIMENTAL_INTERNAL.SANDBOX` | Sandbox Page | `StudioPage` |  |
| 465 | `PAGE.EXPERIMENTAL_INTERNAL.PLAYGROUND` | Playground Page | `StudioPage` |  |
| 466 | `PAGE.EXPERIMENTAL_INTERNAL.PROTOTYPE` | Prototype Page | `StudioPage` |  |
| 467 | `PAGE.EXPERIMENTAL_INTERNAL.LABS` | Labs Page | `StudioPage` |  |
| 468 | `PAGE.EXPERIMENTAL_INTERNAL.INTERNAL_TOOLS` | Internal Tools Page | `StudioPage` |  |

### P37 System Administration (11)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 469 | `PAGE.SYSTEM_ADMINISTRATION.ADMIN_HOME` | Admin Home Page | `AdminPage` |  |
| 470 | `PAGE.SYSTEM_ADMINISTRATION.ADMIN_DASHBOARD` | Admin Dashboard Page | `DashboardPage` |  |
| 471 | `PAGE.SYSTEM_ADMINISTRATION.SYSTEM_SETTINGS` | System Settings Page | `SettingsPage` |  |
| 472 | `PAGE.SYSTEM_ADMINISTRATION.FEATURE_MANAGEMENT` | Feature Management Page | `AdminPage` |  |
| 473 | `PAGE.SYSTEM_ADMINISTRATION.USER_ADMINISTRATION` | User Administration Page | `AdminPage` |  |
| 474 | `PAGE.SYSTEM_ADMINISTRATION.ORGANISATION_ADMINISTRATION` | Organisation Administration Page | `AdminPage` |  |
| 475 | `PAGE.SYSTEM_ADMINISTRATION.WORKSPACE_ADMINISTRATION` | Workspace Administration Page | `AdminPage` |  |
| 476 | `PAGE.SYSTEM_ADMINISTRATION.PERMISSION_ADMINISTRATION` | Permission Administration Page | `AdminPage` |  |
| 477 | `PAGE.SYSTEM_ADMINISTRATION.INTEGRATION_ADMINISTRATION` | Integration Administration Page | `AdminPage` |  |
| 478 | `PAGE.SYSTEM_ADMINISTRATION.BILLING_ADMINISTRATION` | Billing Administration Page | `AdminPage` |  |
| 479 | `PAGE.SYSTEM_ADMINISTRATION.CONTENT_ADMINISTRATION` | Content Administration Page | `AdminPage` |  |

### P38 CMS & Publishing (7)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 480 | `PAGE.CMS_PUBLISHING.CMS` | CMS Page | `AdminPage` |  |
| 481 | `PAGE.CMS_PUBLISHING.CMS_COLLECTION` | CMS Collection Page | `AdminPage` |  |
| 482 | `PAGE.CMS_PUBLISHING.CMS_ENTRY` | CMS Entry Page | `AdminPage` |  |
| 483 | `PAGE.CMS_PUBLISHING.SEO` | SEO Page | `AdminPage` |  |
| 484 | `PAGE.CMS_PUBLISHING.REDIRECT_MANAGEMENT` | Redirect Management Page | `AdminPage` |  |
| 485 | `PAGE.CMS_PUBLISHING.LOCALIZATION` | Localization Page | `AdminPage` |  |
| 486 | `PAGE.CMS_PUBLISHING.NOTIFICATION_ADMINISTRATION` | Notification Administration Page | `AdminPage` |  |

### P39 Operations Administration (3)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 487 | `PAGE.OPERATIONS_ADMINISTRATION.JOBS_QUEUE` | Jobs/Queue Page | `AdminPage` |  |
| 488 | `PAGE.OPERATIONS_ADMINISTRATION.JOB_DETAIL` | Job Detail Page | `DetailPage` |  |
| 489 | `PAGE.OPERATIONS_ADMINISTRATION.RUNTIME_ADMINISTRATION` | Runtime Administration Page | `AdminPage` |  |

### P40 Control Plane (9)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 490 | `PAGE.CONTROL_PLANE.CONTROL_PLANE` | Control Plane Page | `ControlPlanePage` |  |
| 491 | `PAGE.CONTROL_PLANE.APPLICATION_REGISTRY` | Application Registry Page | `ListPage` |  |
| 492 | `PAGE.CONTROL_PLANE.APPLICATION_DETAIL` | Application Detail Page | `DetailPage` |  |
| 493 | `PAGE.CONTROL_PLANE.ENVIRONMENT_REGISTRY` | Environment Registry Page | `ListPage` |  |
| 494 | `PAGE.CONTROL_PLANE.DATABASE_TARGETS` | Database Targets Page | `ControlPlanePage` |  |
| 495 | `PAGE.CONTROL_PLANE.INFRASTRUCTURE_INVENTORY` | Infrastructure Inventory Page | `ListPage` |  |
| 496 | `PAGE.CONTROL_PLANE.DEPLOYMENT_APPROVAL` | Deployment Approval Page | `ApprovalPage` |  |
| 497 | `PAGE.CONTROL_PLANE.MIGRATION_APPROVAL` | Migration Approval Page | `ApprovalPage` |  |
| 498 | `PAGE.CONTROL_PLANE.RELEASE_READINESS` | Release Readiness Page | `ControlPlanePage` |  |

### P41 Evidence & Approval (2)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 499 | `PAGE.EVIDENCE_APPROVAL.EVIDENCE_GATE` | Evidence Gate Page | `EvidencePage` |  |
| 500 | `PAGE.EVIDENCE_APPROVAL.AUDIT_EVIDENCE_REPORT` | Audit/Evidence Report Page | `EvidencePage` |  |

## Workspaces (616)

### W01 Personal & Home Workspaces (15)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 1 | `WORKSPACE.PERSONAL_HOME.PERSONAL` | Personal Workspace | `PersonalWorkspace` |  |
| 2 | `WORKSPACE.PERSONAL_HOME.MY_WORK` | My Work Workspace | `PersonalWorkspace` |  |
| 3 | `WORKSPACE.PERSONAL_HOME.HOME` | Home Workspace | `PersonalWorkspace` |  |
| 4 | `WORKSPACE.PERSONAL_HOME.TODAY` | Today Workspace | `PersonalWorkspace` |  |
| 5 | `WORKSPACE.PERSONAL_HOME.MY_TASKS` | My Tasks Workspace | `PersonalWorkspace` |  |
| 6 | `WORKSPACE.PERSONAL_HOME.MY_CALENDAR` | My Calendar Workspace | `PersonalWorkspace` |  |
| 7 | `WORKSPACE.PERSONAL_HOME.MY_NOTES` | My Notes Workspace | `PersonalWorkspace` |  |
| 8 | `WORKSPACE.PERSONAL_HOME.MY_FILES` | My Files Workspace | `PersonalWorkspace` |  |
| 9 | `WORKSPACE.PERSONAL_HOME.MY_ACTIVITY` | My Activity Workspace | `PersonalWorkspace` |  |
| 10 | `WORKSPACE.PERSONAL_HOME.MY_NOTIFICATIONS` | My Notifications Workspace | `PersonalWorkspace` |  |
| 11 | `WORKSPACE.PERSONAL_HOME.MY_APPROVALS` | My Approvals Workspace | `PersonalWorkspace` |  |
| 12 | `WORKSPACE.PERSONAL_HOME.MY_DRAFTS` | My Drafts Workspace | `PersonalWorkspace` |  |
| 13 | `WORKSPACE.PERSONAL_HOME.FAVORITES` | Favorites Workspace | `PersonalWorkspace` |  |
| 14 | `WORKSPACE.PERSONAL_HOME.RECENT` | Recent Workspace | `PersonalWorkspace` |  |
| 15 | `WORKSPACE.PERSONAL_HOME.SAVED` | Saved Workspace | `PersonalWorkspace` |  |

### W02 Organisation Workspaces (11)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 16 | `WORKSPACE.ORGANISATION.ORGANISATION` | Organisation Workspace | `OrganisationWorkspace` |  |
| 17 | `WORKSPACE.ORGANISATION.ORGANISATION_COMMAND_CENTER` | Organisation Command Center | `OrganisationWorkspace` |  |
| 18 | `WORKSPACE.ORGANISATION.ORGANISATION_OPERATIONS` | Organisation Operations Workspace | `OrganisationWorkspace` |  |
| 19 | `WORKSPACE.ORGANISATION.ORGANISATION_PEOPLE` | Organisation People Workspace | `OrganisationWorkspace` |  |
| 20 | `WORKSPACE.ORGANISATION.ORGANISATION_FINANCE` | Organisation Finance Workspace | `OrganisationWorkspace` |  |
| 21 | `WORKSPACE.ORGANISATION.ORGANISATION_PROJECTS` | Organisation Projects Workspace | `OrganisationWorkspace` |  |
| 22 | `WORKSPACE.ORGANISATION.ORGANISATION_DOCUMENTS` | Organisation Documents Workspace | `OrganisationWorkspace` |  |
| 23 | `WORKSPACE.ORGANISATION.ORGANISATION_ANALYTICS` | Organisation Analytics Workspace | `OrganisationWorkspace` |  |
| 24 | `WORKSPACE.ORGANISATION.ORGANISATION_SETTINGS` | Organisation Settings Workspace | `OrganisationWorkspace` |  |
| 25 | `WORKSPACE.ORGANISATION.ORGANISATION_GOVERNANCE` | Organisation Governance Workspace | `OrganisationWorkspace` |  |
| 26 | `WORKSPACE.ORGANISATION.MULTI_ORGANISATION` | Multi-Organisation Workspace | `OrganisationWorkspace` |  |

### W03 Team Workspaces (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 27 | `WORKSPACE.TEAM.TEAM` | Team Workspace | `TeamWorkspace` |  |
| 28 | `WORKSPACE.TEAM.DEPARTMENT` | Department Workspace | `TeamWorkspace` |  |
| 29 | `WORKSPACE.TEAM.FUNCTIONAL_TEAM` | Functional Team Workspace | `TeamWorkspace` |  |
| 30 | `WORKSPACE.TEAM.CROSS_FUNCTIONAL` | Cross-Functional Workspace | `TeamWorkspace` |  |
| 31 | `WORKSPACE.TEAM.SQUAD` | Squad Workspace | `TeamWorkspace` |  |
| 32 | `WORKSPACE.TEAM.POD` | Pod Workspace | `TeamWorkspace` |  |
| 33 | `WORKSPACE.TEAM.COMMITTEE` | Committee Workspace | `TeamWorkspace` |  |
| 34 | `WORKSPACE.TEAM.WORKING_GROUP` | Working Group Workspace | `TeamWorkspace` |  |
| 35 | `WORKSPACE.TEAM.LEADERSHIP` | Leadership Workspace | `TeamWorkspace` |  |
| 36 | `WORKSPACE.TEAM.EXECUTIVE` | Executive Workspace | `TeamWorkspace` |  |

### W04 Project & Program Workspaces (11)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 37 | `WORKSPACE.PROJECT_PROGRAM.PROJECT` | Project Workspace | `ProjectWorkspace` |  |
| 38 | `WORKSPACE.PROJECT_PROGRAM.PROGRAM` | Program Workspace | `ProjectWorkspace` |  |
| 39 | `WORKSPACE.PROJECT_PROGRAM.PORTFOLIO` | Project Portfolio Workspace | `ProjectWorkspace` |  |
| 40 | `WORKSPACE.PROJECT_PROGRAM.INITIATIVE` | Initiative Workspace | `ProjectWorkspace` |  |
| 41 | `WORKSPACE.PROJECT_PROGRAM.WORKSTREAM` | Workstream Workspace | `ProjectWorkspace` |  |
| 42 | `WORKSPACE.PROJECT_PROGRAM.MILESTONE` | Milestone Workspace | `ProjectWorkspace` |  |
| 43 | `WORKSPACE.PROJECT_PROGRAM.PROJECT_PLANNING` | Project Planning Workspace | `ProjectWorkspace` |  |
| 44 | `WORKSPACE.PROJECT_PROGRAM.PROJECT_EXECUTION` | Project Execution Workspace | `ProjectWorkspace` |  |
| 45 | `WORKSPACE.PROJECT_PROGRAM.PROJECT_REVIEW` | Project Review Workspace | `ProjectWorkspace` |  |
| 46 | `WORKSPACE.PROJECT_PROGRAM.PROJECT_CLOSURE` | Project Closure Workspace | `ProjectWorkspace` |  |
| 47 | `WORKSPACE.PROJECT_PROGRAM.PROJECT_EVIDENCE` | Project Evidence Workspace | `ProjectWorkspace` |  |

### W05 Task & Productivity Workspaces (13)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 48 | `WORKSPACE.TASK_PRODUCTIVITY.TASK` | Task Workspace | `ProductivityWorkspace` |  |
| 49 | `WORKSPACE.TASK_PRODUCTIVITY.KANBAN` | Kanban Workspace | `ProductivityWorkspace` |  |
| 50 | `WORKSPACE.TASK_PRODUCTIVITY.SCRUM` | Scrum Workspace | `ProductivityWorkspace` |  |
| 51 | `WORKSPACE.TASK_PRODUCTIVITY.SPRINT` | Sprint Workspace | `ProductivityWorkspace` |  |
| 52 | `WORKSPACE.TASK_PRODUCTIVITY.BACKLOG` | Backlog Workspace | `ProductivityWorkspace` |  |
| 53 | `WORKSPACE.TASK_PRODUCTIVITY.ROADMAP` | Roadmap Workspace | `ProductivityWorkspace` |  |
| 54 | `WORKSPACE.TASK_PRODUCTIVITY.GANTT` | Gantt Workspace | `ProductivityWorkspace` |  |
| 55 | `WORKSPACE.TASK_PRODUCTIVITY.TIMELINE` | Timeline Workspace | `ProductivityWorkspace` |  |
| 56 | `WORKSPACE.TASK_PRODUCTIVITY.CALENDAR` | Calendar Workspace | `ProductivityWorkspace` |  |
| 57 | `WORKSPACE.TASK_PRODUCTIVITY.SCHEDULER` | Scheduler Workspace | `ProductivityWorkspace` |  |
| 58 | `WORKSPACE.TASK_PRODUCTIVITY.AGENDA` | Agenda Workspace | `ProductivityWorkspace` |  |
| 59 | `WORKSPACE.TASK_PRODUCTIVITY.CHECKLIST` | Checklist Workspace | `ProductivityWorkspace` |  |
| 60 | `WORKSPACE.TASK_PRODUCTIVITY.APPROVAL_QUEUE` | Approval Queue Workspace | `ProductivityWorkspace` |  |

### W06 Communication Workspaces (11)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 61 | `WORKSPACE.COMMUNICATION.INBOX` | Inbox Workspace | `CommunicationWorkspace` |  |
| 62 | `WORKSPACE.COMMUNICATION.MAIL` | Mail Workspace | `CommunicationWorkspace` |  |
| 63 | `WORKSPACE.COMMUNICATION.MESSENGER` | Messenger Workspace | `CommunicationWorkspace` |  |
| 64 | `WORKSPACE.COMMUNICATION.CHAT` | Chat Workspace | `CommunicationWorkspace` |  |
| 65 | `WORKSPACE.COMMUNICATION.COMMUNICATION_HUB` | Communication Hub | `CommunicationWorkspace` |  |
| 66 | `WORKSPACE.COMMUNICATION.THREAD` | Thread Workspace | `CommunicationWorkspace` |  |
| 67 | `WORKSPACE.COMMUNICATION.ANNOUNCEMENT` | Announcement Workspace | `CommunicationWorkspace` |  |
| 68 | `WORKSPACE.COMMUNICATION.NOTIFICATION_CENTER` | Notification Center Workspace | `CommunicationWorkspace` |  |
| 69 | `WORKSPACE.COMMUNICATION.CONTACT` | Contact Workspace | `CRMWorkspace` | `WORKSPACE.CRM_SALES.CONTACT` |
| 70 | `WORKSPACE.COMMUNICATION.COMMUNICATION_CAMPAIGN` | Communication Campaign Workspace | `CommunicationWorkspace` |  |
| 71 | `WORKSPACE.COMMUNICATION.SUPPORT_CONVERSATION` | Support Conversation Workspace | `CommunicationWorkspace` |  |

### W07 Documents & Knowledge Workspaces (13)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 72 | `WORKSPACE.DOCUMENT_KNOWLEDGE.DOCUMENT` | Document Workspace | `DocumentWorkspace` |  |
| 73 | `WORKSPACE.DOCUMENT_KNOWLEDGE.DOCUMENT_EDITOR` | Document Editor Workspace | `DocumentWorkspace` |  |
| 74 | `WORKSPACE.DOCUMENT_KNOWLEDGE.SPREADSHEET` | Spreadsheet Workspace | `DocumentWorkspace` |  |
| 75 | `WORKSPACE.DOCUMENT_KNOWLEDGE.PRESENTATION` | Presentation Authoring Workspace | `DocumentWorkspace` |  |
| 76 | `WORKSPACE.DOCUMENT_KNOWLEDGE.NOTES` | Notes Workspace | `DocumentWorkspace` |  |
| 77 | `WORKSPACE.DOCUMENT_KNOWLEDGE.NOTEBOOK` | Notebook Workspace | `DocumentWorkspace` |  |
| 78 | `WORKSPACE.DOCUMENT_KNOWLEDGE.KNOWLEDGE` | Knowledge Workspace | `DocumentWorkspace` |  |
| 79 | `WORKSPACE.DOCUMENT_KNOWLEDGE.KNOWLEDGE_BASE` | Knowledge Base Workspace | `DocumentWorkspace` |  |
| 80 | `WORKSPACE.DOCUMENT_KNOWLEDGE.WIKI` | Wiki Workspace | `DocumentWorkspace` |  |
| 81 | `WORKSPACE.DOCUMENT_KNOWLEDGE.DOCUMENTATION` | Documentation Workspace | `DocumentWorkspace` |  |
| 82 | `WORKSPACE.DOCUMENT_KNOWLEDGE.RESEARCH` | Research Workspace | `DocumentWorkspace` |  |
| 83 | `WORKSPACE.DOCUMENT_KNOWLEDGE.REFERENCE_LIBRARY` | Reference Library Workspace | `DocumentWorkspace` |  |
| 84 | `WORKSPACE.DOCUMENT_KNOWLEDGE.EVIDENCE_LIBRARY` | Evidence Library Workspace | `DocumentWorkspace` |  |

### W08 File & Asset Workspaces (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 85 | `WORKSPACE.FILE_ASSET.FILE_MANAGER` | File Manager Workspace | `DocumentWorkspace` |  |
| 86 | `WORKSPACE.FILE_ASSET.DOCUMENT_LIBRARY` | Document Library Workspace | `DocumentWorkspace` |  |
| 87 | `WORKSPACE.FILE_ASSET.ASSET_LIBRARY` | Asset Library Workspace | `DocumentWorkspace` |  |
| 88 | `WORKSPACE.FILE_ASSET.MEDIA_LIBRARY` | Media Library Workspace | `DocumentWorkspace` |  |
| 89 | `WORKSPACE.FILE_ASSET.IMAGE_LIBRARY` | Image Library Workspace | `DocumentWorkspace` |  |
| 90 | `WORKSPACE.FILE_ASSET.VIDEO_LIBRARY` | Video Library Workspace | `DocumentWorkspace` |  |
| 91 | `WORKSPACE.FILE_ASSET.AUDIO_LIBRARY` | Audio Library Workspace | `DocumentWorkspace` |  |
| 92 | `WORKSPACE.FILE_ASSET.BRAND_ASSET` | Brand Asset Workspace | `DocumentWorkspace` |  |
| 93 | `WORKSPACE.FILE_ASSET.TEMPLATE_LIBRARY` | Template Library Workspace | `DocumentWorkspace` |  |
| 94 | `WORKSPACE.FILE_ASSET.ARCHIVE` | Archive Workspace | `DocumentWorkspace` |  |

### W09 Data Workspaces (14)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 95 | `WORKSPACE.DATA.DATA` | Data Workspace | `DataWorkspace` |  |
| 96 | `WORKSPACE.DATA.DATA_EXPLORER` | Data Explorer Workspace | `DataWorkspace` |  |
| 97 | `WORKSPACE.DATA.DATA_BROWSER` | Data Browser Workspace | `DataWorkspace` |  |
| 98 | `WORKSPACE.DATA.DATA_TABLE` | Data Table Workspace | `DataWorkspace` |  |
| 99 | `WORKSPACE.DATA.DATA_STUDIO` | Data Studio Workspace | `DataWorkspace` |  |
| 100 | `WORKSPACE.DATA.DATASET` | Dataset Workspace | `DataWorkspace` |  |
| 101 | `WORKSPACE.DATA.SCHEMA` | Schema Workspace | `DataWorkspace` |  |
| 102 | `WORKSPACE.DATA.SCHEMA_EXPLORER` | Schema Explorer Workspace | `DataWorkspace` |  |
| 103 | `WORKSPACE.DATA.DOMAIN_REGISTRY` | Domain Registry Workspace | `DataWorkspace` |  |
| 104 | `WORKSPACE.DATA.CONTRACT_REGISTRY` | Contract Registry Workspace | `DataWorkspace` |  |
| 105 | `WORKSPACE.DATA.DATA_QUALITY` | Data Quality Workspace | `DataWorkspace` |  |
| 106 | `WORKSPACE.DATA.DATA_MAPPING` | Data Mapping Workspace | `DataWorkspace` |  |
| 107 | `WORKSPACE.DATA.DATA_IMPORT` | Data Import Workspace | `DataWorkspace` |  |
| 108 | `WORKSPACE.DATA.DATA_EXPORT` | Data Export Workspace | `DataWorkspace` |  |

### W10 API Workspaces (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 109 | `WORKSPACE.API.API_STUDIO` | API Studio Workspace | `APIStudioWorkspace` |  |
| 110 | `WORKSPACE.API.API_DESIGN` | API Design Workspace | `APIStudioWorkspace` |  |
| 111 | `WORKSPACE.API.API_CONTRACT` | API Contract Workspace | `APIStudioWorkspace` |  |
| 112 | `WORKSPACE.API.API_EXPLORER` | API Explorer Workspace | `APIStudioWorkspace` |  |
| 113 | `WORKSPACE.API.API_TESTING` | API Testing Workspace | `APIStudioWorkspace` |  |
| 114 | `WORKSPACE.API.API_REQUEST` | API Request Workspace | `APIStudioWorkspace` |  |
| 115 | `WORKSPACE.API.API_MOCK` | API Mock Workspace | `APIStudioWorkspace` |  |
| 116 | `WORKSPACE.API.API_CONFORMANCE` | API Conformance Workspace | `APIStudioWorkspace` |  |
| 117 | `WORKSPACE.API.API_ENVIRONMENT` | API Environment Workspace | `APIStudioWorkspace` |  |
| 118 | `WORKSPACE.API.API_KEY` | API Key Workspace | `APIStudioWorkspace` |  |
| 119 | `WORKSPACE.API.WEBHOOK` | Webhook Workspace | `APIStudioWorkspace` |  |
| 120 | `WORKSPACE.API.INTEGRATION_API` | Integration API Workspace | `APIStudioWorkspace` |  |

### W11 Developer Workspaces (13)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 121 | `WORKSPACE.DEVELOPER.DEVELOPER` | Developer Workspace | `DeveloperWorkspace` |  |
| 122 | `WORKSPACE.DEVELOPER.CODE` | Code Workspace | `DeveloperWorkspace` |  |
| 123 | `WORKSPACE.DEVELOPER.CODE_STUDIO` | Code Studio Workspace | `DeveloperWorkspace` |  |
| 124 | `WORKSPACE.DEVELOPER.REPOSITORY` | Repository Workspace | `DeveloperWorkspace` |  |
| 125 | `WORKSPACE.DEVELOPER.SOURCE_BROWSER` | Source Browser Workspace | `DeveloperWorkspace` |  |
| 126 | `WORKSPACE.DEVELOPER.BRANCH` | Branch Workspace | `DeveloperWorkspace` |  |
| 127 | `WORKSPACE.DEVELOPER.PULL_REQUEST` | Pull Request Workspace | `DeveloperWorkspace` |  |
| 128 | `WORKSPACE.DEVELOPER.ISSUE` | Issue Workspace | `DeveloperWorkspace` |  |
| 129 | `WORKSPACE.DEVELOPER.BUILD` | Build Workspace | `DeveloperWorkspace` |  |
| 130 | `WORKSPACE.DEVELOPER.CI` | CI Workspace | `DeveloperWorkspace` |  |
| 131 | `WORKSPACE.DEVELOPER.PIPELINE` | Pipeline Workspace | `DeveloperWorkspace` |  |
| 132 | `WORKSPACE.DEVELOPER.RELEASE_ENGINEERING` | Release Engineering Workspace | `DeveloperWorkspace` |  |
| 133 | `WORKSPACE.DEVELOPER.SDK` | SDK Workspace | `DeveloperWorkspace` |  |

### W12 Application Builder Workspaces (11)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 134 | `WORKSPACE.APPLICATION_BUILDER.APP_BUILDER` | App Builder Workspace | `BuilderWorkspace` |  |
| 135 | `WORKSPACE.APPLICATION_BUILDER.WEB_APP_BUILDER` | Web App Builder Workspace | `BuilderWorkspace` |  |
| 136 | `WORKSPACE.APPLICATION_BUILDER.MOBILE_APP_BUILDER` | Mobile App Builder Workspace | `BuilderWorkspace` |  |
| 137 | `WORKSPACE.APPLICATION_BUILDER.DESKTOP_APP_BUILDER` | Desktop App Builder Workspace | `BuilderWorkspace` |  |
| 138 | `WORKSPACE.APPLICATION_BUILDER.PAGE_BUILDER` | Page Builder Workspace | `BuilderWorkspace` |  |
| 139 | `WORKSPACE.APPLICATION_BUILDER.FORM_BUILDER` | Form Builder Workspace | `BuilderWorkspace` |  |
| 140 | `WORKSPACE.APPLICATION_BUILDER.WORKFLOW_BUILDER` | Workflow Builder Workspace | `BuilderWorkspace` |  |
| 141 | `WORKSPACE.APPLICATION_BUILDER.AUTOMATION_BUILDER` | Automation Builder Workspace | `BuilderWorkspace` |  |
| 142 | `WORKSPACE.APPLICATION_BUILDER.RULE_BUILDER` | Rule Builder Workspace | `BuilderWorkspace` |  |
| 143 | `WORKSPACE.APPLICATION_BUILDER.TEMPLATE_BUILDER` | Template Builder Workspace | `BuilderWorkspace` |  |
| 144 | `WORKSPACE.APPLICATION_BUILDER.COMPONENT_BUILDER` | Component Builder Workspace | `BuilderWorkspace` |  |

### W13 UI & Design-System Workspaces (13)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 145 | `WORKSPACE.UI_DESIGN_SYSTEM.UI_STUDIO` | UI Studio Workspace | `DesignSystemWorkspace` |  |
| 146 | `WORKSPACE.UI_DESIGN_SYSTEM.DESIGN_SYSTEM` | Design System Workspace | `DesignSystemWorkspace` |  |
| 147 | `WORKSPACE.UI_DESIGN_SYSTEM.COMPONENT_STUDIO` | Component Studio Workspace | `DesignSystemWorkspace` |  |
| 148 | `WORKSPACE.UI_DESIGN_SYSTEM.COMPONENT_GALLERY` | Component Gallery Workspace | `DesignSystemWorkspace` |  |
| 149 | `WORKSPACE.UI_DESIGN_SYSTEM.ATOMIC_COMPONENT` | Atomic Component Workspace | `DesignSystemWorkspace` |  |
| 150 | `WORKSPACE.UI_DESIGN_SYSTEM.LAYOUT_STUDIO` | Layout Studio Workspace | `DesignSystemWorkspace` |  |
| 151 | `WORKSPACE.UI_DESIGN_SYSTEM.PAGE_STUDIO` | Page Studio Workspace | `DesignSystemWorkspace` |  |
| 152 | `WORKSPACE.UI_DESIGN_SYSTEM.THEME_STUDIO` | Theme Studio Workspace | `DesignSystemWorkspace` |  |
| 153 | `WORKSPACE.UI_DESIGN_SYSTEM.TOKEN_STUDIO` | Token Studio Workspace | `DesignSystemWorkspace` |  |
| 154 | `WORKSPACE.UI_DESIGN_SYSTEM.TYPOGRAPHY` | Typography Workspace | `DesignSystemWorkspace` |  |
| 155 | `WORKSPACE.UI_DESIGN_SYSTEM.ICON_STUDIO` | Icon Studio Workspace | `DesignSystemWorkspace` |  |
| 156 | `WORKSPACE.UI_DESIGN_SYSTEM.MOTION` | Motion Workspace | `DesignSystemWorkspace` |  |
| 157 | `WORKSPACE.UI_DESIGN_SYSTEM.ACCESSIBILITY` | Accessibility Workspace | `DesignSystemWorkspace` |  |

### W14 Creative Workspaces (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 158 | `WORKSPACE.CREATIVE.CREATIVE_STUDIO` | Creative Studio Workspace | `CreativeStudioWorkspace` |  |
| 159 | `WORKSPACE.CREATIVE.DESIGN` | Design Workspace | `CreativeStudioWorkspace` |  |
| 160 | `WORKSPACE.CREATIVE.GRAPHIC_DESIGN` | Graphic Design Workspace | `CreativeStudioWorkspace` |  |
| 161 | `WORKSPACE.CREATIVE.BRAND_STUDIO` | Brand Studio Workspace | `CreativeStudioWorkspace` |  |
| 162 | `WORKSPACE.CREATIVE.CAMPAIGN_CREATIVE` | Campaign Creative Workspace | `CreativeStudioWorkspace` |  |
| 163 | `WORKSPACE.CREATIVE.CONTENT_STUDIO` | Content Studio Workspace | `CreativeStudioWorkspace` |  |
| 164 | `WORKSPACE.CREATIVE.COPY` | Copy Workspace | `CreativeStudioWorkspace` |  |
| 165 | `WORKSPACE.CREATIVE.STORY` | Story Workspace | `CreativeStudioWorkspace` |  |
| 166 | `WORKSPACE.CREATIVE.STORYBOARD` | Storyboard Workspace | `CreativeStudioWorkspace` |  |
| 167 | `WORKSPACE.CREATIVE.MOODBOARD` | Moodboard Workspace | `CreativeStudioWorkspace` |  |
| 168 | `WORKSPACE.CREATIVE.WHITEBOARD` | Whiteboard Workspace | `CreativeStudioWorkspace` |  |
| 169 | `WORKSPACE.CREATIVE.IDEATION` | Ideation Workspace | `CreativeStudioWorkspace` |  |

### W15 Media Production Workspaces (11)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 170 | `WORKSPACE.MEDIA_PRODUCTION.MEDIA_STUDIO` | Media Studio Workspace | `MediaStudioWorkspace` |  |
| 171 | `WORKSPACE.MEDIA_PRODUCTION.IMAGE_EDITING` | Image Editing Workspace | `MediaStudioWorkspace` |  |
| 172 | `WORKSPACE.MEDIA_PRODUCTION.VIDEO_EDITING` | Video Editing Workspace | `MediaStudioWorkspace` |  |
| 173 | `WORKSPACE.MEDIA_PRODUCTION.AUDIO_EDITING` | Audio Editing Workspace | `MediaStudioWorkspace` |  |
| 174 | `WORKSPACE.MEDIA_PRODUCTION.PHOTO` | Photo Workspace | `MediaStudioWorkspace` |  |
| 175 | `WORKSPACE.MEDIA_PRODUCTION.VIDEO` | Video Workspace | `MediaStudioWorkspace` |  |
| 176 | `WORKSPACE.MEDIA_PRODUCTION.AUDIO` | Audio Workspace | `MediaStudioWorkspace` |  |
| 177 | `WORKSPACE.MEDIA_PRODUCTION.MOTION_GRAPHICS` | Motion Graphics Workspace | `MediaStudioWorkspace` |  |
| 178 | `WORKSPACE.MEDIA_PRODUCTION.POST_PRODUCTION` | Post-Production Workspace | `MediaStudioWorkspace` |  |
| 179 | `WORKSPACE.MEDIA_PRODUCTION.REVIEW_AND_APPROVAL` | Review & Approval Workspace | `MediaStudioWorkspace` |  |
| 180 | `WORKSPACE.MEDIA_PRODUCTION.MEDIA_DELIVERY` | Media Delivery Workspace | `MediaStudioWorkspace` |  |

### W16 Spatial & 3D Workspaces (15)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 181 | `WORKSPACE.SPATIAL_3D.SPATIAL` | Spatial Workspace | `SpatialStudioWorkspace` |  |
| 182 | `WORKSPACE.SPATIAL_3D.SPATIAL_STUDIO` | Spatial Studio Workspace | `SpatialStudioWorkspace` |  |
| 183 | `WORKSPACE.SPATIAL_3D.CAD` | CAD Workspace | `SpatialStudioWorkspace` |  |
| 184 | `WORKSPACE.SPATIAL_3D.TWO_D_PLAN` | 2D Plan Workspace | `SpatialStudioWorkspace` |  |
| 185 | `WORKSPACE.SPATIAL_3D.THREE_D` | 3D Workspace | `SpatialStudioWorkspace` |  |
| 186 | `WORKSPACE.SPATIAL_3D.THREE_D_PREVIEW` | 3D Preview Workspace | `SpatialStudioWorkspace` |  |
| 187 | `WORKSPACE.SPATIAL_3D.FLOOR_PLAN` | Floor Plan Workspace | `SpatialStudioWorkspace` |  |
| 188 | `WORKSPACE.SPATIAL_3D.VENUE_PLAN` | Venue Plan Workspace | `SpatialStudioWorkspace` |  |
| 189 | `WORKSPACE.SPATIAL_3D.SCENE` | Scene Workspace | `SpatialStudioWorkspace` |  |
| 190 | `WORKSPACE.SPATIAL_3D.DIGITAL_TWIN` | Digital Twin Workspace | `SpatialStudioWorkspace` |  |
| 191 | `WORKSPACE.SPATIAL_3D.SIMULATION` | Simulation Workspace | `SpatialStudioWorkspace` |  |
| 192 | `WORKSPACE.SPATIAL_3D.MAPPING` | Mapping Workspace | `SpatialStudioWorkspace` |  |
| 193 | `WORKSPACE.SPATIAL_3D.GIS` | GIS Workspace | `SpatialStudioWorkspace` |  |
| 194 | `WORKSPACE.SPATIAL_3D.ROUTE_PLANNING` | Route Planning Workspace | `SpatialStudioWorkspace` |  |
| 195 | `WORKSPACE.SPATIAL_3D.LOCATION` | Spatial Location Workspace | `SpatialStudioWorkspace` |  |

### W17 AI Workspaces (15)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 196 | `WORKSPACE.AI.AI` | AI Workspace | `AIWorkspace` |  |
| 197 | `WORKSPACE.AI.AI_ASSISTANT` | AI Assistant Workspace | `AIWorkspace` |  |
| 198 | `WORKSPACE.AI.AGENT` | Agent Workspace | `AIWorkspace` |  |
| 199 | `WORKSPACE.AI.AGENT_BUILDER` | Agent Builder Workspace | `AIWorkspace` |  |
| 200 | `WORKSPACE.AI.MULTI_AGENT` | Multi-Agent Workspace | `AIWorkspace` |  |
| 201 | `WORKSPACE.AI.PROMPT` | Prompt Workspace | `AIWorkspace` |  |
| 202 | `WORKSPACE.AI.PROMPT_STUDIO` | Prompt Studio Workspace | `AIWorkspace` |  |
| 203 | `WORKSPACE.AI.MODEL` | Model Workspace | `AIWorkspace` |  |
| 204 | `WORKSPACE.AI.MODEL_PLAYGROUND` | Model Playground Workspace | `AIWorkspace` |  |
| 205 | `WORKSPACE.AI.AI_EVALUATION` | AI Evaluation Workspace | `AIWorkspace` |  |
| 206 | `WORKSPACE.AI.AI_OBSERVABILITY` | AI Observability Workspace | `AIWorkspace` |  |
| 207 | `WORKSPACE.AI.AI_KNOWLEDGE` | AI Knowledge Workspace | `AIWorkspace` |  |
| 208 | `WORKSPACE.AI.RAG` | RAG Workspace | `AIWorkspace` |  |
| 209 | `WORKSPACE.AI.EMBEDDING` | Embedding Workspace | `AIWorkspace` |  |
| 210 | `WORKSPACE.AI.AI_WORKFLOW` | AI Workflow Workspace | `AIWorkspace` |  |

### W18 Analytics Workspaces (13)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 211 | `WORKSPACE.ANALYTICS.ANALYTICS` | Analytics Workspace | `AnalyticsWorkspace` |  |
| 212 | `WORKSPACE.ANALYTICS.BI` | BI Workspace | `AnalyticsWorkspace` |  |
| 213 | `WORKSPACE.ANALYTICS.DASHBOARD` | Dashboard Workspace | `AnalyticsWorkspace` |  |
| 214 | `WORKSPACE.ANALYTICS.EXECUTIVE_ANALYTICS` | Executive Analytics Workspace | `AnalyticsWorkspace` |  |
| 215 | `WORKSPACE.ANALYTICS.OPERATIONAL_ANALYTICS` | Operational Analytics Workspace | `AnalyticsWorkspace` |  |
| 216 | `WORKSPACE.ANALYTICS.PRODUCT_ANALYTICS` | Product Analytics Workspace | `AnalyticsWorkspace` |  |
| 217 | `WORKSPACE.ANALYTICS.USER_ANALYTICS` | User Analytics Workspace | `AnalyticsWorkspace` |  |
| 218 | `WORKSPACE.ANALYTICS.MARKETING_ANALYTICS` | Marketing Analytics Workspace | `MarketingWorkspace` | `WORKSPACE.MARKETING.MARKETING_ANALYTICS` |
| 219 | `WORKSPACE.ANALYTICS.REVENUE_ANALYTICS` | Revenue Analytics Workspace | `AnalyticsWorkspace` |  |
| 220 | `WORKSPACE.ANALYTICS.FINANCE_ANALYTICS` | Finance Analytics Workspace | `AnalyticsWorkspace` |  |
| 221 | `WORKSPACE.ANALYTICS.FUNNEL` | Funnel Workspace | `AnalyticsWorkspace` |  |
| 222 | `WORKSPACE.ANALYTICS.COHORT` | Cohort Workspace | `AnalyticsWorkspace` |  |
| 223 | `WORKSPACE.ANALYTICS.REPORT_BUILDER` | Report Builder Workspace | `AnalyticsWorkspace` |  |

### W19 Command & Operations Workspaces (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 224 | `WORKSPACE.COMMAND_OPERATIONS.COMMAND_CENTER` | Command Center Workspace | `CommandCenterWorkspace` |  |
| 225 | `WORKSPACE.COMMAND_OPERATIONS.OPERATIONS_CENTER` | Operations Center Workspace | `CommandCenterWorkspace` |  |
| 226 | `WORKSPACE.COMMAND_OPERATIONS.CONTROL_ROOM` | Control Room Workspace | `CommandCenterWorkspace` |  |
| 227 | `WORKSPACE.COMMAND_OPERATIONS.MISSION_CONTROL` | Mission Control Workspace | `CommandCenterWorkspace` |  |
| 228 | `WORKSPACE.COMMAND_OPERATIONS.COCKPIT` | Cockpit Workspace | `CommandCenterWorkspace` |  |
| 229 | `WORKSPACE.COMMAND_OPERATIONS.OPERATIONS_WALLBOARD` | Operations Wallboard Workspace | `CommandCenterWorkspace` |  |
| 230 | `WORKSPACE.COMMAND_OPERATIONS.MONITORING` | Monitoring Workspace | `CommandCenterWorkspace` |  |
| 231 | `WORKSPACE.COMMAND_OPERATIONS.SITUATION_ROOM` | Situation Room Workspace | `CommandCenterWorkspace` |  |
| 232 | `WORKSPACE.COMMAND_OPERATIONS.INCIDENT_COMMAND` | Incident Command Workspace | `CommandCenterWorkspace` |  |
| 233 | `WORKSPACE.COMMAND_OPERATIONS.REAL_TIME_OPERATIONS` | Real-Time Operations Workspace | `CommandCenterWorkspace` |  |

### W20 Infrastructure Workspaces (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 234 | `WORKSPACE.INFRASTRUCTURE.INFRASTRUCTURE` | Infrastructure Workspace | `InfrastructureWorkspace` |  |
| 235 | `WORKSPACE.INFRASTRUCTURE.INFRASTRUCTURE_STUDIO` | Infrastructure Studio Workspace | `InfrastructureWorkspace` |  |
| 236 | `WORKSPACE.INFRASTRUCTURE.CLOUD` | Cloud Workspace | `InfrastructureWorkspace` |  |
| 237 | `WORKSPACE.INFRASTRUCTURE.SERVER` | Server Workspace | `InfrastructureWorkspace` |  |
| 238 | `WORKSPACE.INFRASTRUCTURE.SERVICE` | Service Workspace | `InfrastructureWorkspace` |  |
| 239 | `WORKSPACE.INFRASTRUCTURE.RUNTIME` | Runtime Workspace | `InfrastructureWorkspace` |  |
| 240 | `WORKSPACE.INFRASTRUCTURE.NETWORK` | Network Workspace | `InfrastructureWorkspace` |  |
| 241 | `WORKSPACE.INFRASTRUCTURE.STORAGE` | Storage Workspace | `InfrastructureWorkspace` |  |
| 242 | `WORKSPACE.INFRASTRUCTURE.QUEUE` | Queue Workspace | `InfrastructureWorkspace` |  |
| 243 | `WORKSPACE.INFRASTRUCTURE.COMPUTE` | Compute Workspace | `InfrastructureWorkspace` |  |
| 244 | `WORKSPACE.INFRASTRUCTURE.RESOURCE_INVENTORY` | Resource Inventory Workspace | `InfrastructureWorkspace` |  |
| 245 | `WORKSPACE.INFRASTRUCTURE.INFRASTRUCTURE_TOPOLOGY` | Infrastructure Topology Workspace | `InfrastructureWorkspace` |  |

### W21 Control Plane Workspaces (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 246 | `WORKSPACE.CONTROL_PLANE.MAATAA_CONTROL_PLANE` | MAATAA Control Plane Workspace | `ControlPlaneWorkspace` |  |
| 247 | `WORKSPACE.CONTROL_PLANE.APPLICATION_REGISTRY` | Application Registry Workspace | `ControlPlaneWorkspace` |  |
| 248 | `WORKSPACE.CONTROL_PLANE.ENVIRONMENT_REGISTRY` | Environment Registry Workspace | `ControlPlaneWorkspace` |  |
| 249 | `WORKSPACE.CONTROL_PLANE.RUNTIME_REGISTRY` | Runtime Registry Workspace | `ControlPlaneWorkspace` |  |
| 250 | `WORKSPACE.CONTROL_PLANE.DATABASE_TARGET` | Database Target Workspace | `DatabaseWorkspace` | `WORKSPACE.DATABASE.DATABASE_TARGET` |
| 251 | `WORKSPACE.CONTROL_PLANE.INFRASTRUCTURE_REGISTRY` | Infrastructure Registry Workspace | `ControlPlaneWorkspace` |  |
| 252 | `WORKSPACE.CONTROL_PLANE.DESIRED_STATE` | Desired State Workspace | `ControlPlaneWorkspace` |  |
| 253 | `WORKSPACE.CONTROL_PLANE.OBSERVED_STATE` | Observed State Workspace | `ControlPlaneWorkspace` |  |
| 254 | `WORKSPACE.CONTROL_PLANE.RECONCILIATION` | State Reconciliation Workspace | `ControlPlaneWorkspace` |  |
| 255 | `WORKSPACE.CONTROL_PLANE.DEPLOYMENT_CONTROL` | Deployment Control Workspace | `ControlPlaneWorkspace` |  |

### W22 Environment & Release Workspaces (11)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 256 | `WORKSPACE.ENVIRONMENT_RELEASE.DEVELOPMENT_ENVIRONMENT` | Development Environment Workspace | `InfrastructureWorkspace` |  |
| 257 | `WORKSPACE.ENVIRONMENT_RELEASE.PREVIEW_ENVIRONMENT` | Preview Environment Workspace | `InfrastructureWorkspace` |  |
| 258 | `WORKSPACE.ENVIRONMENT_RELEASE.TEST_ENVIRONMENT` | Test Environment Workspace | `InfrastructureWorkspace` |  |
| 259 | `WORKSPACE.ENVIRONMENT_RELEASE.QA` | QA Workspace | `TestingWorkspace` | `WORKSPACE.TESTING.QA` |
| 260 | `WORKSPACE.ENVIRONMENT_RELEASE.STAGING` | Staging Workspace | `InfrastructureWorkspace` |  |
| 261 | `WORKSPACE.ENVIRONMENT_RELEASE.PILOT` | Pilot Workspace | `InfrastructureWorkspace` |  |
| 262 | `WORKSPACE.ENVIRONMENT_RELEASE.PRODUCTION` | Production Workspace | `InfrastructureWorkspace` |  |
| 263 | `WORKSPACE.ENVIRONMENT_RELEASE.RELEASE` | Release Workspace | `InfrastructureWorkspace` |  |
| 264 | `WORKSPACE.ENVIRONMENT_RELEASE.RELEASE_READINESS` | Release Readiness Workspace | `InfrastructureWorkspace` |  |
| 265 | `WORKSPACE.ENVIRONMENT_RELEASE.DEPLOYMENT` | Deployment Workspace | `InfrastructureWorkspace` |  |
| 266 | `WORKSPACE.ENVIRONMENT_RELEASE.ROLLBACK` | Rollback Workspace | `InfrastructureWorkspace` |  |

### W23 Database Workspaces (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 267 | `WORKSPACE.DATABASE.DATABASE` | Database Workspace | `DatabaseWorkspace` |  |
| 268 | `WORKSPACE.DATABASE.DATABASE_STUDIO` | Database Studio Workspace | `DatabaseWorkspace` |  |
| 269 | `WORKSPACE.DATABASE.SQL` | SQL Workspace | `DatabaseWorkspace` |  |
| 270 | `WORKSPACE.DATABASE.POSTGRESQL` | PostgreSQL Workspace | `DatabaseWorkspace` |  |
| 271 | `WORKSPACE.DATABASE.SQLITE` | SQLite Workspace | `DatabaseWorkspace` |  |
| 272 | `WORKSPACE.DATABASE.LIBSQL` | libSQL Workspace | `DatabaseWorkspace` |  |
| 273 | `WORKSPACE.DATABASE.DATABASE_TARGET` | Database Target Workspace | `DatabaseWorkspace` |  |
| 274 | `WORKSPACE.DATABASE.SCHEMA_MIGRATION` | Schema Migration Workspace | `DatabaseWorkspace` |  |
| 275 | `WORKSPACE.DATABASE.MIGRATION_PLANNING` | Migration Planning Workspace | `DatabaseWorkspace` |  |
| 276 | `WORKSPACE.DATABASE.MIGRATION_REVIEW` | Migration Review Workspace | `DatabaseWorkspace` |  |
| 277 | `WORKSPACE.DATABASE.MIGRATION_EXECUTION` | Migration Execution Workspace | `DatabaseWorkspace` |  |
| 278 | `WORKSPACE.DATABASE.DATABASE_RECOVERY` | Database Recovery Workspace | `DatabaseWorkspace` |  |

### W24 Reliability & Observability Workspaces (13)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 279 | `WORKSPACE.RELIABILITY_OBSERVABILITY.OBSERVABILITY` | Observability Workspace | `ObservabilityWorkspace` |  |
| 280 | `WORKSPACE.RELIABILITY_OBSERVABILITY.METRICS` | Metrics Workspace | `ObservabilityWorkspace` |  |
| 281 | `WORKSPACE.RELIABILITY_OBSERVABILITY.LOGS` | Logs Workspace | `ObservabilityWorkspace` |  |
| 282 | `WORKSPACE.RELIABILITY_OBSERVABILITY.TRACES` | Traces Workspace | `ObservabilityWorkspace` |  |
| 283 | `WORKSPACE.RELIABILITY_OBSERVABILITY.HEALTH` | Health Workspace | `ObservabilityWorkspace` |  |
| 284 | `WORKSPACE.RELIABILITY_OBSERVABILITY.STATUS` | Status Workspace | `ObservabilityWorkspace` |  |
| 285 | `WORKSPACE.RELIABILITY_OBSERVABILITY.ALERTS` | Alerts Workspace | `ObservabilityWorkspace` |  |
| 286 | `WORKSPACE.RELIABILITY_OBSERVABILITY.INCIDENT` | Incident Workspace | `ObservabilityWorkspace` |  |
| 287 | `WORKSPACE.RELIABILITY_OBSERVABILITY.RELIABILITY` | Reliability Workspace | `ObservabilityWorkspace` |  |
| 288 | `WORKSPACE.RELIABILITY_OBSERVABILITY.SRE` | SRE Workspace | `ObservabilityWorkspace` |  |
| 289 | `WORKSPACE.RELIABILITY_OBSERVABILITY.BACKUP` | Backup Workspace | `ObservabilityWorkspace` |  |
| 290 | `WORKSPACE.RELIABILITY_OBSERVABILITY.RESTORE` | Restore Workspace | `ObservabilityWorkspace` |  |
| 291 | `WORKSPACE.RELIABILITY_OBSERVABILITY.DISASTER_RECOVERY` | Disaster Recovery Workspace | `ObservabilityWorkspace` |  |

### W25 Security & Identity Workspaces (13)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 292 | `WORKSPACE.SECURITY_IDENTITY.IDENTITY` | Identity Workspace | `SecurityWorkspace` |  |
| 293 | `WORKSPACE.SECURITY_IDENTITY.AUTHENTICATION` | Authentication Workspace | `SecurityWorkspace` |  |
| 294 | `WORKSPACE.SECURITY_IDENTITY.SESSION` | Session Workspace | `SecurityWorkspace` |  |
| 295 | `WORKSPACE.SECURITY_IDENTITY.USER_ACCESS` | User Access Workspace | `SecurityWorkspace` |  |
| 296 | `WORKSPACE.SECURITY_IDENTITY.ROLE` | Role Workspace | `SecurityWorkspace` |  |
| 297 | `WORKSPACE.SECURITY_IDENTITY.PERMISSION` | Permission Workspace | `SecurityWorkspace` |  |
| 298 | `WORKSPACE.SECURITY_IDENTITY.POLICY` | Policy Workspace | `GovernanceWorkspace` | `WORKSPACE.GOVERNANCE_EVIDENCE.POLICY` |
| 299 | `WORKSPACE.SECURITY_IDENTITY.RBAC` | RBAC Workspace | `SecurityWorkspace` |  |
| 300 | `WORKSPACE.SECURITY_IDENTITY.MFA` | MFA Workspace | `SecurityWorkspace` |  |
| 301 | `WORKSPACE.SECURITY_IDENTITY.SECURITY_OPERATIONS` | Security Operations Workspace | `SecurityWorkspace` |  |
| 302 | `WORKSPACE.SECURITY_IDENTITY.SECURITY_REVIEW` | Security Review Workspace | `SecurityWorkspace` |  |
| 303 | `WORKSPACE.SECURITY_IDENTITY.SECRET_REFERENCE` | Secret Reference Workspace | `SecurityWorkspace` |  |
| 304 | `WORKSPACE.SECURITY_IDENTITY.DEVICE_SECURITY` | Device Security Workspace | `SecurityWorkspace` |  |

### W26 Governance & Evidence Workspaces (13)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 305 | `WORKSPACE.GOVERNANCE_EVIDENCE.GOVERNANCE` | Governance Workspace | `GovernanceWorkspace` |  |
| 306 | `WORKSPACE.GOVERNANCE_EVIDENCE.EVIDENCE` | Evidence Workspace | `GovernanceWorkspace` |  |
| 307 | `WORKSPACE.GOVERNANCE_EVIDENCE.EVIDENCE_GATE` | Evidence Gate Workspace | `GovernanceWorkspace` |  |
| 308 | `WORKSPACE.GOVERNANCE_EVIDENCE.AUDIT` | Audit Workspace | `GovernanceWorkspace` |  |
| 309 | `WORKSPACE.GOVERNANCE_EVIDENCE.AUDIT_TRAIL` | Audit Trail Workspace | `GovernanceWorkspace` |  |
| 310 | `WORKSPACE.GOVERNANCE_EVIDENCE.COMPLIANCE` | Compliance Workspace | `GovernanceWorkspace` |  |
| 311 | `WORKSPACE.GOVERNANCE_EVIDENCE.POLICY` | Policy Workspace | `GovernanceWorkspace` |  |
| 312 | `WORKSPACE.GOVERNANCE_EVIDENCE.RISK` | Risk Workspace | `GovernanceWorkspace` |  |
| 313 | `WORKSPACE.GOVERNANCE_EVIDENCE.CONTROL` | Control Workspace | `GovernanceWorkspace` |  |
| 314 | `WORKSPACE.GOVERNANCE_EVIDENCE.REVIEW` | Review Workspace | `GovernanceWorkspace` | `WORKSPACE.REVIEW_DECISION.REVIEW` |
| 315 | `WORKSPACE.GOVERNANCE_EVIDENCE.CERTIFICATION` | Certification Workspace | `GovernanceWorkspace` |  |
| 316 | `WORKSPACE.GOVERNANCE_EVIDENCE.APPROVAL` | Approval Workspace | `GovernanceWorkspace` | `WORKSPACE.REVIEW_DECISION.APPROVAL` |
| 317 | `WORKSPACE.GOVERNANCE_EVIDENCE.PROVENANCE` | Provenance Workspace | `GovernanceWorkspace` |  |

### W27 Finance Workspaces (15)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 318 | `WORKSPACE.FINANCE.FINANCE` | Finance Workspace | `FinanceWorkspace` |  |
| 319 | `WORKSPACE.FINANCE.FINANCE_COMMAND_CENTER` | Finance Command Center | `FinanceWorkspace` |  |
| 320 | `WORKSPACE.FINANCE.ACCOUNTING` | Accounting Workspace | `FinanceWorkspace` |  |
| 321 | `WORKSPACE.FINANCE.LEDGER` | Ledger Workspace | `FinanceWorkspace` |  |
| 322 | `WORKSPACE.FINANCE.BUDGET` | Budget Workspace | `FinanceWorkspace` |  |
| 323 | `WORKSPACE.FINANCE.EXPENSE` | Expense Workspace | `FinanceWorkspace` |  |
| 324 | `WORKSPACE.FINANCE.REVENUE` | Revenue Workspace | `FinanceWorkspace` |  |
| 325 | `WORKSPACE.FINANCE.CASH_FLOW` | Cash Flow Workspace | `FinanceWorkspace` |  |
| 326 | `WORKSPACE.FINANCE.FORECAST` | Forecast Workspace | `FinanceWorkspace` |  |
| 327 | `WORKSPACE.FINANCE.RECONCILIATION` | Financial Reconciliation Workspace | `FinanceWorkspace` |  |
| 328 | `WORKSPACE.FINANCE.INVOICE` | Invoice Workspace | `FinanceWorkspace` |  |
| 329 | `WORKSPACE.FINANCE.PAYMENT` | Payment Workspace | `FinanceWorkspace` |  |
| 330 | `WORKSPACE.FINANCE.PAYOUT` | Payout Workspace | `FinanceWorkspace` |  |
| 331 | `WORKSPACE.FINANCE.TAX` | Tax Workspace | `FinanceWorkspace` |  |
| 332 | `WORKSPACE.FINANCE.TREASURY` | Treasury Workspace | `FinanceWorkspace` |  |

### W28 Investment Workspaces (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 333 | `WORKSPACE.INVESTMENT.INVESTOR` | Investor Workspace | `InvestmentWorkspace` |  |
| 334 | `WORKSPACE.INVESTMENT.INVESTOR_RELATIONS` | Investor Relations Workspace | `InvestmentWorkspace` |  |
| 335 | `WORKSPACE.INVESTMENT.INVESTMENT` | Investment Workspace | `InvestmentWorkspace` |  |
| 336 | `WORKSPACE.INVESTMENT.INVESTMENT_COMMITTEE` | Investment Committee Workspace | `InvestmentWorkspace` |  |
| 337 | `WORKSPACE.INVESTMENT.PORTFOLIO` | Investment Portfolio Workspace | `InvestmentWorkspace` |  |
| 338 | `WORKSPACE.INVESTMENT.FUND` | Fund Workspace | `InvestmentWorkspace` |  |
| 339 | `WORKSPACE.INVESTMENT.FUNDRAISING` | Fundraising Workspace | `InvestmentWorkspace` |  |
| 340 | `WORKSPACE.INVESTMENT.DEAL` | Investment Deal Workspace | `InvestmentWorkspace` |  |
| 341 | `WORKSPACE.INVESTMENT.DUE_DILIGENCE` | Due Diligence Workspace | `InvestmentWorkspace` |  |
| 342 | `WORKSPACE.INVESTMENT.CAP_TABLE` | Cap Table Workspace | `InvestmentWorkspace` |  |
| 343 | `WORKSPACE.INVESTMENT.INVESTMENT_ANALYSIS` | Investment Analysis Workspace | `InvestmentWorkspace` |  |
| 344 | `WORKSPACE.INVESTMENT.INVESTMENT_EVIDENCE` | Investment Evidence Workspace | `InvestmentWorkspace` |  |

### W29 CRM & Sales Workspaces (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 345 | `WORKSPACE.CRM_SALES.CRM` | CRM Workspace | `CRMWorkspace` |  |
| 346 | `WORKSPACE.CRM_SALES.SALES` | Sales Workspace | `CRMWorkspace` |  |
| 347 | `WORKSPACE.CRM_SALES.SALES_PIPELINE` | Sales Pipeline Workspace | `CRMWorkspace` |  |
| 348 | `WORKSPACE.CRM_SALES.LEAD` | Lead Workspace | `CRMWorkspace` |  |
| 349 | `WORKSPACE.CRM_SALES.ACCOUNT` | Account Workspace | `CRMWorkspace` |  |
| 350 | `WORKSPACE.CRM_SALES.OPPORTUNITY` | Opportunity Workspace | `CRMWorkspace` |  |
| 351 | `WORKSPACE.CRM_SALES.DEAL` | Sales Deal Workspace | `CRMWorkspace` |  |
| 352 | `WORKSPACE.CRM_SALES.CUSTOMER` | Customer Workspace | `CRMWorkspace` |  |
| 353 | `WORKSPACE.CRM_SALES.CONTACT` | Contact Workspace | `CRMWorkspace` |  |
| 354 | `WORKSPACE.CRM_SALES.SALES_FORECAST` | Sales Forecast Workspace | `CRMWorkspace` |  |
| 355 | `WORKSPACE.CRM_SALES.SALES_OPERATIONS` | Sales Operations Workspace | `CRMWorkspace` |  |
| 356 | `WORKSPACE.CRM_SALES.CUSTOMER_SUCCESS` | Customer Success Workspace | `CRMWorkspace` |  |

### W30 Marketing Workspaces (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 357 | `WORKSPACE.MARKETING.MARKETING` | Marketing Workspace | `MarketingWorkspace` |  |
| 358 | `WORKSPACE.MARKETING.CAMPAIGN` | Campaign Workspace | `MarketingWorkspace` |  |
| 359 | `WORKSPACE.MARKETING.CAMPAIGN_PLANNING` | Campaign Planning Workspace | `MarketingWorkspace` |  |
| 360 | `WORKSPACE.MARKETING.CAMPAIGN_EXECUTION` | Campaign Execution Workspace | `MarketingWorkspace` |  |
| 361 | `WORKSPACE.MARKETING.BRAND` | Brand Workspace | `MarketingWorkspace` |  |
| 362 | `WORKSPACE.MARKETING.CONTENT_MARKETING` | Content Marketing Workspace | `MarketingWorkspace` |  |
| 363 | `WORKSPACE.MARKETING.SOCIAL_MEDIA` | Social Media Workspace | `MarketingWorkspace` |  |
| 364 | `WORKSPACE.MARKETING.ADVERTISING` | Advertising Workspace | `MarketingWorkspace` |  |
| 365 | `WORKSPACE.MARKETING.SEO` | SEO Workspace | `DocumentWorkspace` | `WORKSPACE.CMS_PUBLISHING.SEO` |
| 366 | `WORKSPACE.MARKETING.MARKETING_AUTOMATION` | Marketing Automation Workspace | `MarketingWorkspace` |  |
| 367 | `WORKSPACE.MARKETING.MARKETING_ANALYTICS` | Marketing Analytics Workspace | `MarketingWorkspace` |  |
| 368 | `WORKSPACE.MARKETING.AUDIENCE` | Audience Workspace | `MarketingWorkspace` |  |

### W31 Commerce Workspaces (13)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 369 | `WORKSPACE.COMMERCE.COMMERCE` | Commerce Workspace | `CommerceWorkspace` |  |
| 370 | `WORKSPACE.COMMERCE.STORE` | Store Workspace | `CommerceWorkspace` |  |
| 371 | `WORKSPACE.COMMERCE.CATALOG` | Catalog Workspace | `CommerceWorkspace` |  |
| 372 | `WORKSPACE.COMMERCE.PRODUCT` | Product Workspace | `CommerceWorkspace` |  |
| 373 | `WORKSPACE.COMMERCE.SKU` | SKU Workspace | `CommerceWorkspace` |  |
| 374 | `WORKSPACE.COMMERCE.CART_OPERATIONS` | Cart Operations Workspace | `CommerceWorkspace` |  |
| 375 | `WORKSPACE.COMMERCE.ORDER` | Order Workspace | `CommerceWorkspace` |  |
| 376 | `WORKSPACE.COMMERCE.CHECKOUT` | Checkout Workspace | `CommerceWorkspace` |  |
| 377 | `WORKSPACE.COMMERCE.FULFILMENT` | Fulfilment Workspace | `CommerceWorkspace` |  |
| 378 | `WORKSPACE.COMMERCE.RETURNS` | Returns Workspace | `CommerceWorkspace` |  |
| 379 | `WORKSPACE.COMMERCE.PRICING` | Pricing Workspace | `CommerceWorkspace` |  |
| 380 | `WORKSPACE.COMMERCE.PROMOTION` | Promotion Workspace | `CommerceWorkspace` |  |
| 381 | `WORKSPACE.COMMERCE.INVENTORY` | Product Inventory Workspace | `CommerceWorkspace` |  |

### W32 Marketplace Workspaces (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 382 | `WORKSPACE.MARKETPLACE.MARKETPLACE` | Marketplace Workspace | `MarketplaceWorkspace` |  |
| 383 | `WORKSPACE.MARKETPLACE.VENDOR_MARKETPLACE` | Vendor Marketplace Workspace | `MarketplaceWorkspace` |  |
| 384 | `WORKSPACE.MARKETPLACE.VENDOR_DIRECTORY` | Vendor Directory Workspace | `MarketplaceWorkspace` |  |
| 385 | `WORKSPACE.MARKETPLACE.SERVICE_MARKETPLACE` | Service Marketplace Workspace | `MarketplaceWorkspace` |  |
| 386 | `WORKSPACE.MARKETPLACE.PRODUCT_MARKETPLACE` | Product Marketplace Workspace | `MarketplaceWorkspace` |  |
| 387 | `WORKSPACE.MARKETPLACE.VENDOR` | Vendor Workspace | `MarketplaceWorkspace` |  |
| 388 | `WORKSPACE.MARKETPLACE.VENDOR_ONBOARDING` | Vendor Onboarding Workspace | `MarketplaceWorkspace` |  |
| 389 | `WORKSPACE.MARKETPLACE.VENDOR_OPERATIONS` | Vendor Operations Workspace | `MarketplaceWorkspace` |  |
| 390 | `WORKSPACE.MARKETPLACE.SERVICE_CATALOG` | Service Catalog Workspace | `MarketplaceWorkspace` |  |
| 391 | `WORKSPACE.MARKETPLACE.CAPABILITY` | Capability Workspace | `MarketplaceWorkspace` |  |
| 392 | `WORKSPACE.MARKETPLACE.RATE` | Rate Workspace | `MarketplaceWorkspace` |  |
| 393 | `WORKSPACE.MARKETPLACE.COMPARISON` | Comparison Workspace | `GovernanceWorkspace` | `WORKSPACE.REVIEW_DECISION.COMPARISON` |

### W33 Booking Workspaces (11)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 394 | `WORKSPACE.BOOKING.BOOKING` | Booking Workspace | `BookingWorkspace` |  |
| 395 | `WORKSPACE.BOOKING.BOOKING_BUILDER` | Booking Builder Workspace | `BookingWorkspace` |  |
| 396 | `WORKSPACE.BOOKING.BOOKING_OPERATIONS` | Booking Operations Workspace | `BookingWorkspace` |  |
| 397 | `WORKSPACE.BOOKING.AVAILABILITY` | Availability Workspace | `BookingWorkspace` |  |
| 398 | `WORKSPACE.BOOKING.RESERVATION` | Reservation Workspace | `BookingWorkspace` |  |
| 399 | `WORKSPACE.BOOKING.QUOTE` | Quote Workspace | `BookingWorkspace` |  |
| 400 | `WORKSPACE.BOOKING.PROPOSAL` | Proposal Workspace | `BookingWorkspace` |  |
| 401 | `WORKSPACE.BOOKING.RATE_REVIEW` | Rate Review Workspace | `BookingWorkspace` |  |
| 402 | `WORKSPACE.BOOKING.CONFIRMATION` | Confirmation Workspace | `BookingWorkspace` |  |
| 403 | `WORKSPACE.BOOKING.BOOKING_FULFILMENT` | Booking Fulfilment Workspace | `BookingWorkspace` |  |
| 404 | `WORKSPACE.BOOKING.BOOKING_SETTLEMENT` | Booking Settlement Workspace | `BookingWorkspace` |  |

### W34 Event Workspaces (14)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 405 | `WORKSPACE.EVENT.EVENT` | Event Workspace | `EventWorkspace` |  |
| 406 | `WORKSPACE.EVENT.EVENT_BUILDER` | Event Builder Workspace | `EventWorkspace` |  |
| 407 | `WORKSPACE.EVENT.EVENT_COMMAND_CENTER` | Event Command Center | `EventWorkspace` |  |
| 408 | `WORKSPACE.EVENT.EVENT_PLANNING` | Event Planning Workspace | `EventWorkspace` |  |
| 409 | `WORKSPACE.EVENT.EVENT_PRODUCTION` | Event Production Workspace | `EventWorkspace` |  |
| 410 | `WORKSPACE.EVENT.EVENT_SCHEDULE` | Event Schedule Workspace | `EventWorkspace` |  |
| 411 | `WORKSPACE.EVENT.EVENT_GUEST` | Event Guest Workspace | `EventWorkspace` |  |
| 412 | `WORKSPACE.EVENT.EVENT_VENDOR` | Event Vendor Workspace | `EventWorkspace` |  |
| 413 | `WORKSPACE.EVENT.EVENT_SERVICE` | Event Service Workspace | `EventWorkspace` |  |
| 414 | `WORKSPACE.EVENT.EVENT_VENUE` | Event Venue Workspace | `EventWorkspace` |  |
| 415 | `WORKSPACE.EVENT.EVENT_SPATIAL` | Event Spatial Workspace | `EventWorkspace` |  |
| 416 | `WORKSPACE.EVENT.EVENT_SPONSORSHIP` | Event Sponsorship Workspace | `EventWorkspace` |  |
| 417 | `WORKSPACE.EVENT.EVENT_ROI` | Event ROI Workspace | `EventWorkspace` |  |
| 418 | `WORKSPACE.EVENT.EVENT_SETTLEMENT` | Event Settlement Workspace | `EventWorkspace` |  |

### W38 Location & Venue Workspaces (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 419 | `WORKSPACE.LOCATION_VENUE.LOCATION` | Venue Location Workspace | `ProductionWorkspace` |  |
| 420 | `WORKSPACE.LOCATION_VENUE.LOCATION_SCOUT` | Location Scout Workspace | `ProductionWorkspace` |  |
| 421 | `WORKSPACE.LOCATION_VENUE.LOCATION_LIBRARY` | Location Library Workspace | `ProductionWorkspace` |  |
| 422 | `WORKSPACE.LOCATION_VENUE.VENUE` | Venue Workspace | `ProductionWorkspace` |  |
| 423 | `WORKSPACE.LOCATION_VENUE.VENUE_SEARCH` | Venue Search Workspace | `ProductionWorkspace` |  |
| 424 | `WORKSPACE.LOCATION_VENUE.VENUE_COMPARISON` | Venue Comparison Workspace | `ProductionWorkspace` |  |
| 425 | `WORKSPACE.LOCATION_VENUE.VENUE_PLANNING` | Venue Planning Workspace | `ProductionWorkspace` |  |
| 426 | `WORKSPACE.LOCATION_VENUE.VENUE_FLOOR_PLAN` | Venue Floor Plan Workspace | `ProductionWorkspace` |  |
| 427 | `WORKSPACE.LOCATION_VENUE.LOCATION_APPROVAL` | Location Approval Workspace | `ProductionWorkspace` |  |
| 428 | `WORKSPACE.LOCATION_VENUE.PERMIT` | Permit Workspace | `ProductionWorkspace` |  |

### W39 Equipment & Logistics Workspaces (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 429 | `WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS` | Logistics Workspace | `ProductionWorkspace` |  |
| 430 | `WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS_COMMAND_CENTER` | Logistics Command Center | `ProductionWorkspace` |  |
| 431 | `WORKSPACE.EQUIPMENT_LOGISTICS.EQUIPMENT` | Equipment Workspace | `ProductionWorkspace` |  |
| 432 | `WORKSPACE.EQUIPMENT_LOGISTICS.INVENTORY` | Equipment Inventory Workspace | `ProductionWorkspace` |  |
| 433 | `WORKSPACE.EQUIPMENT_LOGISTICS.EQUIPMENT_ASSIGNMENT` | Equipment Assignment Workspace | `ProductionWorkspace` |  |
| 434 | `WORKSPACE.EQUIPMENT_LOGISTICS.TRANSPORT` | Transport Workspace | `ProductionWorkspace` |  |
| 435 | `WORKSPACE.EQUIPMENT_LOGISTICS.TRAVEL` | Travel Workspace | `ProductionWorkspace` |  |
| 436 | `WORKSPACE.EQUIPMENT_LOGISTICS.ACCOMMODATION` | Accommodation Workspace | `ProductionWorkspace` |  |
| 437 | `WORKSPACE.EQUIPMENT_LOGISTICS.ROUTE` | Route Workspace | `ProductionWorkspace` |  |
| 438 | `WORKSPACE.EQUIPMENT_LOGISTICS.SHIPMENT` | Shipment Workspace | `ProductionWorkspace` |  |
| 439 | `WORKSPACE.EQUIPMENT_LOGISTICS.PERMIT` | Permit Workspace | `ProductionWorkspace` | `WORKSPACE.LOCATION_VENUE.PERMIT` |
| 440 | `WORKSPACE.EQUIPMENT_LOGISTICS.INSURANCE` | Insurance Workspace | `ProductionWorkspace` |  |

### W40 Event Guest Workspaces (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 441 | `WORKSPACE.EVENT_GUEST.GUEST` | Guest Workspace | `EventWorkspace` |  |
| 442 | `WORKSPACE.EVENT_GUEST.GUEST_DIRECTORY` | Guest Directory Workspace | `EventWorkspace` |  |
| 443 | `WORKSPACE.EVENT_GUEST.INVITATION` | Invitation Workspace | `EventWorkspace` |  |
| 444 | `WORKSPACE.EVENT_GUEST.RSVP` | RSVP Workspace | `EventWorkspace` |  |
| 445 | `WORKSPACE.EVENT_GUEST.GUEST_JOURNEY` | Guest Journey Workspace | `EventWorkspace` |  |
| 446 | `WORKSPACE.EVENT_GUEST.CHECK_IN` | Check-In Workspace | `EventWorkspace` |  |
| 447 | `WORKSPACE.EVENT_GUEST.ACCESS` | Access Workspace | `EventWorkspace` |  |
| 448 | `WORKSPACE.EVENT_GUEST.SEATING` | Seating Workspace | `EventWorkspace` |  |
| 449 | `WORKSPACE.EVENT_GUEST.HOSPITALITY` | Hospitality Workspace | `EventWorkspace` |  |
| 450 | `WORKSPACE.EVENT_GUEST.VIP` | VIP Workspace | `EventWorkspace` |  |

### W41 Sponsorship Workspaces (8)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 451 | `WORKSPACE.SPONSORSHIP.SPONSORSHIP` | Sponsorship Workspace | `EventWorkspace` |  |
| 452 | `WORKSPACE.SPONSORSHIP.SPONSOR` | Sponsor Workspace | `EventWorkspace` |  |
| 453 | `WORKSPACE.SPONSORSHIP.SPONSOR_PIPELINE` | Sponsor Pipeline Workspace | `EventWorkspace` |  |
| 454 | `WORKSPACE.SPONSORSHIP.SPONSOR_PACKAGE` | Sponsor Package Workspace | `EventWorkspace` |  |
| 455 | `WORKSPACE.SPONSORSHIP.SPONSOR_ACTIVATION` | Sponsor Activation Workspace | `EventWorkspace` |  |
| 456 | `WORKSPACE.SPONSORSHIP.DELIVERABLES` | Deliverables Workspace | `EventWorkspace` |  |
| 457 | `WORKSPACE.SPONSORSHIP.BRAND_PLACEMENT` | Brand Placement Workspace | `EventWorkspace` |  |
| 458 | `WORKSPACE.SPONSORSHIP.SPONSORSHIP_ROI` | Sponsorship ROI Workspace | `EventWorkspace` |  |

### W42 Education Workspaces (12)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 459 | `WORKSPACE.EDUCATION.LEARNING` | Learning Workspace | `EducationWorkspace` |  |
| 460 | `WORKSPACE.EDUCATION.COURSE` | Course Workspace | `EducationWorkspace` |  |
| 461 | `WORKSPACE.EDUCATION.CLASSROOM` | Classroom Workspace | `EducationWorkspace` |  |
| 462 | `WORKSPACE.EDUCATION.LESSON` | Lesson Workspace | `EducationWorkspace` |  |
| 463 | `WORKSPACE.EDUCATION.ASSIGNMENT` | Assignment Workspace | `EducationWorkspace` |  |
| 464 | `WORKSPACE.EDUCATION.QUIZ` | Quiz Workspace | `EducationWorkspace` |  |
| 465 | `WORKSPACE.EDUCATION.EXAM` | Exam Workspace | `EducationWorkspace` |  |
| 466 | `WORKSPACE.EDUCATION.STUDENT` | Student Workspace | `EducationWorkspace` |  |
| 467 | `WORKSPACE.EDUCATION.TEACHER` | Teacher Workspace | `EducationWorkspace` |  |
| 468 | `WORKSPACE.EDUCATION.PROGRESS` | Progress Workspace | `EducationWorkspace` |  |
| 469 | `WORKSPACE.EDUCATION.CERTIFICATE` | Certificate Workspace | `EducationWorkspace` |  |
| 470 | `WORKSPACE.EDUCATION.CURRICULUM` | Curriculum Workspace | `EducationWorkspace` |  |

### W43 Community Workspaces (8)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 471 | `WORKSPACE.COMMUNITY.COMMUNITY` | Community Workspace | `CommunityWorkspace` |  |
| 472 | `WORKSPACE.COMMUNITY.MEMBER` | Member Workspace | `CommunityWorkspace` |  |
| 473 | `WORKSPACE.COMMUNITY.FORUM` | Forum Workspace | `CommunityWorkspace` |  |
| 474 | `WORKSPACE.COMMUNITY.DISCUSSION` | Discussion Workspace | `CommunityWorkspace` |  |
| 475 | `WORKSPACE.COMMUNITY.FEED` | Feed Workspace | `CommunityWorkspace` |  |
| 476 | `WORKSPACE.COMMUNITY.GROUP` | Group Workspace | `CommunityWorkspace` |  |
| 477 | `WORKSPACE.COMMUNITY.COMMUNITY_MODERATION` | Community Moderation Workspace | `CommunityWorkspace` |  |
| 478 | `WORKSPACE.COMMUNITY.COMMUNITY_EVENTS` | Community Events Workspace | `CommunityWorkspace` |  |

### W44 Support Workspaces (9)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 479 | `WORKSPACE.SUPPORT.SUPPORT` | Support Workspace | `SupportWorkspace` |  |
| 480 | `WORKSPACE.SUPPORT.HELP_DESK` | Help Desk Workspace | `SupportWorkspace` |  |
| 481 | `WORKSPACE.SUPPORT.TICKET` | Ticket Workspace | `SupportWorkspace` |  |
| 482 | `WORKSPACE.SUPPORT.SERVICE_DESK` | Service Desk Workspace | `SupportWorkspace` |  |
| 483 | `WORKSPACE.SUPPORT.CUSTOMER_SUPPORT` | Customer Support Workspace | `SupportWorkspace` |  |
| 484 | `WORKSPACE.SUPPORT.KNOWLEDGE_SUPPORT` | Knowledge Support Workspace | `SupportWorkspace` |  |
| 485 | `WORKSPACE.SUPPORT.INCIDENT_SUPPORT` | Incident Support Workspace | `SupportWorkspace` |  |
| 486 | `WORKSPACE.SUPPORT.SLA` | SLA Workspace | `SupportWorkspace` |  |
| 487 | `WORKSPACE.SUPPORT.ESCALATION` | Escalation Workspace | `SupportWorkspace` |  |

### W45 CMS & Publishing Workspaces (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 488 | `WORKSPACE.CMS_PUBLISHING.CMS` | CMS Workspace | `DocumentWorkspace` |  |
| 489 | `WORKSPACE.CMS_PUBLISHING.CONTENT_COLLECTION` | Content Collection Workspace | `DocumentWorkspace` |  |
| 490 | `WORKSPACE.CMS_PUBLISHING.CONTENT_ENTRY` | Content Entry Workspace | `DocumentWorkspace` |  |
| 491 | `WORKSPACE.CMS_PUBLISHING.EDITORIAL` | Editorial Workspace | `DocumentWorkspace` |  |
| 492 | `WORKSPACE.CMS_PUBLISHING.PUBLISHING` | Publishing Workspace | `DocumentWorkspace` |  |
| 493 | `WORKSPACE.CMS_PUBLISHING.SEO` | SEO Workspace | `DocumentWorkspace` |  |
| 494 | `WORKSPACE.CMS_PUBLISHING.LOCALIZATION` | Localization Workspace | `DocumentWorkspace` |  |
| 495 | `WORKSPACE.CMS_PUBLISHING.TRANSLATION` | Translation Workspace | `DocumentWorkspace` |  |
| 496 | `WORKSPACE.CMS_PUBLISHING.REDIRECT` | Redirect Workspace | `DocumentWorkspace` |  |
| 497 | `WORKSPACE.CMS_PUBLISHING.CONTENT_APPROVAL` | Content Approval Workspace | `DocumentWorkspace` |  |

### W46 Public-Site Workspaces (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 498 | `WORKSPACE.PUBLIC_SITE.WEBSITE` | Website Workspace | `MarketingWorkspace` |  |
| 499 | `WORKSPACE.PUBLIC_SITE.LANDING_PAGE` | Landing Page Workspace | `MarketingWorkspace` |  |
| 500 | `WORKSPACE.PUBLIC_SITE.MARKETING_SITE` | Marketing Site Workspace | `MarketingWorkspace` |  |
| 501 | `WORKSPACE.PUBLIC_SITE.DOCUMENTATION_SITE` | Documentation Site Workspace | `MarketingWorkspace` |  |
| 502 | `WORKSPACE.PUBLIC_SITE.NEWS_SITE` | News Site Workspace | `MarketingWorkspace` |  |
| 503 | `WORKSPACE.PUBLIC_SITE.BLOG` | Blog Workspace | `MarketingWorkspace` |  |
| 504 | `WORKSPACE.PUBLIC_SITE.PORTFOLIO_SITE` | Portfolio Site Workspace | `MarketingWorkspace` |  |
| 505 | `WORKSPACE.PUBLIC_SITE.CAREERS_SITE` | Careers Site Workspace | `MarketingWorkspace` |  |
| 506 | `WORKSPACE.PUBLIC_SITE.INVESTOR_SITE` | Investor Site Workspace | `MarketingWorkspace` |  |
| 507 | `WORKSPACE.PUBLIC_SITE.TRUST_CENTER` | Trust Center Workspace | `MarketingWorkspace` |  |

### W47 Mobile Workspaces (8)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 508 | `WORKSPACE.MOBILE.MOBILE_APP` | Mobile App Workspace | `ProductivityWorkspace` |  |
| 509 | `WORKSPACE.MOBILE.MOBILE_BUILDER` | Mobile Builder Workspace | `ProductivityWorkspace` |  |
| 510 | `WORKSPACE.MOBILE.MOBILE_PREVIEW` | Mobile Preview Workspace | `ProductivityWorkspace` |  |
| 511 | `WORKSPACE.MOBILE.DEVICE_PREVIEW` | Device Preview Workspace | `ProductivityWorkspace` |  |
| 512 | `WORKSPACE.MOBILE.OFFLINE` | Offline Workspace | `CommandCenterWorkspace` | `WORKSPACE.EMERGENCY_STATE.OFFLINE` |
| 513 | `WORKSPACE.MOBILE.SYNC` | Sync Workspace | `ProductivityWorkspace` |  |
| 514 | `WORKSPACE.MOBILE.MOBILE_NAVIGATION` | Mobile Navigation Workspace | `ProductivityWorkspace` |  |
| 515 | `WORKSPACE.MOBILE.MOBILE_FORMS` | Mobile Forms Workspace | `ProductivityWorkspace` |  |

### W48 Desktop Workspaces (6)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 516 | `WORKSPACE.DESKTOP.DESKTOP_APP` | Desktop App Workspace | `ProductivityWorkspace` |  |
| 517 | `WORKSPACE.DESKTOP.DESKTOP_BUILDER` | Desktop Builder Workspace | `ProductivityWorkspace` |  |
| 518 | `WORKSPACE.DESKTOP.MULTI_WINDOW` | Multi-Window Workspace | `ProductivityWorkspace` |  |
| 519 | `WORKSPACE.DESKTOP.DESKTOP_COMMAND_CENTER` | Desktop Command Center | `ProductivityWorkspace` |  |
| 520 | `WORKSPACE.DESKTOP.LOCAL_FILES` | Local Files Workspace | `ProductivityWorkspace` |  |
| 521 | `WORKSPACE.DESKTOP.NATIVE_INTEGRATION` | Native Integration Workspace | `ProductivityWorkspace` |  |

### W49 Review & Decision Workspaces (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 522 | `WORKSPACE.REVIEW_DECISION.REVIEW` | Review Workspace | `GovernanceWorkspace` |  |
| 523 | `WORKSPACE.REVIEW_DECISION.APPROVAL` | Approval Workspace | `GovernanceWorkspace` |  |
| 524 | `WORKSPACE.REVIEW_DECISION.DECISION` | Decision Workspace | `GovernanceWorkspace` |  |
| 525 | `WORKSPACE.REVIEW_DECISION.COMPARISON` | Comparison Workspace | `GovernanceWorkspace` |  |
| 526 | `WORKSPACE.REVIEW_DECISION.DIFF` | Diff Workspace | `GovernanceWorkspace` |  |
| 527 | `WORKSPACE.REVIEW_DECISION.EVIDENCE_REVIEW` | Evidence Review Workspace | `GovernanceWorkspace` |  |
| 528 | `WORKSPACE.REVIEW_DECISION.QUALITY_REVIEW` | Quality Review Workspace | `GovernanceWorkspace` |  |
| 529 | `WORKSPACE.REVIEW_DECISION.LEGAL_REVIEW` | Legal Review Workspace | `GovernanceWorkspace` |  |
| 530 | `WORKSPACE.REVIEW_DECISION.FINANCE_REVIEW` | Finance Review Workspace | `GovernanceWorkspace` |  |
| 531 | `WORKSPACE.REVIEW_DECISION.RELEASE_REVIEW` | Release Review Workspace | `GovernanceWorkspace` |  |

### W50 System Administration Workspaces (9)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 532 | `WORKSPACE.SYSTEM_ADMINISTRATION.ADMIN` | Admin Workspace | `AdminWorkspace` |  |
| 533 | `WORKSPACE.SYSTEM_ADMINISTRATION.SUPER_ADMIN` | Super Admin Workspace | `AdminWorkspace` |  |
| 534 | `WORKSPACE.SYSTEM_ADMINISTRATION.USER_ADMINISTRATION` | User Administration Workspace | `AdminWorkspace` |  |
| 535 | `WORKSPACE.SYSTEM_ADMINISTRATION.ORGANISATION_ADMINISTRATION` | Organisation Administration Workspace | `AdminWorkspace` |  |
| 536 | `WORKSPACE.SYSTEM_ADMINISTRATION.WORKSPACE_ADMINISTRATION` | Workspace Administration Workspace | `AdminWorkspace` |  |
| 537 | `WORKSPACE.SYSTEM_ADMINISTRATION.ROLES_AND_PERMISSIONS` | Roles & Permissions Workspace | `AdminWorkspace` |  |
| 538 | `WORKSPACE.SYSTEM_ADMINISTRATION.SYSTEM_CONFIGURATION` | System Configuration Workspace | `AdminWorkspace` |  |
| 539 | `WORKSPACE.SYSTEM_ADMINISTRATION.FEATURE_FLAG` | Feature Flag Workspace | `AdminWorkspace` |  |
| 540 | `WORKSPACE.SYSTEM_ADMINISTRATION.INTEGRATION_ADMINISTRATION` | Integration Administration Workspace | `AdminWorkspace` |  |

### W51 Operations Administration Workspaces (7)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 541 | `WORKSPACE.OPERATIONS_ADMINISTRATION.QUEUE_ADMINISTRATION` | Queue Administration Workspace | `AdminWorkspace` |  |
| 542 | `WORKSPACE.OPERATIONS_ADMINISTRATION.JOB_ADMINISTRATION` | Job Administration Workspace | `AdminWorkspace` |  |
| 543 | `WORKSPACE.OPERATIONS_ADMINISTRATION.NOTIFICATION_ADMINISTRATION` | Notification Administration Workspace | `AdminWorkspace` |  |
| 544 | `WORKSPACE.OPERATIONS_ADMINISTRATION.WEBHOOK_ADMINISTRATION` | Webhook Administration Workspace | `AdminWorkspace` |  |
| 545 | `WORKSPACE.OPERATIONS_ADMINISTRATION.RUNTIME_ADMINISTRATION` | Runtime Administration Workspace | `AdminWorkspace` |  |
| 546 | `WORKSPACE.OPERATIONS_ADMINISTRATION.DEPLOYMENT_ADMINISTRATION` | Deployment Administration Workspace | `AdminWorkspace` |  |
| 547 | `WORKSPACE.OPERATIONS_ADMINISTRATION.AUDIT_ADMINISTRATION` | Audit Administration Workspace | `AdminWorkspace` |  |

### W52 Testing Workspaces (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 548 | `WORKSPACE.TESTING.TEST` | Test Workspace | `TestingWorkspace` |  |
| 549 | `WORKSPACE.TESTING.QA` | QA Workspace | `TestingWorkspace` |  |
| 550 | `WORKSPACE.TESTING.BROWSER_TEST` | Browser Test Workspace | `TestingWorkspace` |  |
| 551 | `WORKSPACE.TESTING.COMPONENT_TEST` | Component Test Workspace | `TestingWorkspace` |  |
| 552 | `WORKSPACE.TESTING.INTEGRATION_TEST` | Integration Test Workspace | `TestingWorkspace` |  |
| 553 | `WORKSPACE.TESTING.E2E` | E2E Workspace | `TestingWorkspace` |  |
| 554 | `WORKSPACE.TESTING.ACCESSIBILITY_TEST` | Accessibility Test Workspace | `TestingWorkspace` |  |
| 555 | `WORKSPACE.TESTING.PERFORMANCE_TEST` | Performance Test Workspace | `TestingWorkspace` |  |
| 556 | `WORKSPACE.TESTING.CONFORMANCE` | Conformance Workspace | `TestingWorkspace` |  |
| 557 | `WORKSPACE.TESTING.REGRESSION` | Regression Workspace | `TestingWorkspace` |  |

### W53 Demo & Experimental Workspaces (8)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 558 | `WORKSPACE.DEMO_EXPERIMENTAL.DEMO` | Demo Workspace | `DeveloperWorkspace` |  |
| 559 | `WORKSPACE.DEMO_EXPERIMENTAL.SANDBOX` | Sandbox Workspace | `DeveloperWorkspace` |  |
| 560 | `WORKSPACE.DEMO_EXPERIMENTAL.PLAYGROUND` | Playground Workspace | `DeveloperWorkspace` |  |
| 561 | `WORKSPACE.DEMO_EXPERIMENTAL.PROTOTYPE` | Prototype Workspace | `DeveloperWorkspace` |  |
| 562 | `WORKSPACE.DEMO_EXPERIMENTAL.LABS` | Labs Workspace | `DeveloperWorkspace` |  |
| 563 | `WORKSPACE.DEMO_EXPERIMENTAL.EXPERIMENTAL` | Experimental Workspace | `DeveloperWorkspace` |  |
| 564 | `WORKSPACE.DEMO_EXPERIMENTAL.PREVIEW` | Preview Workspace | `DeveloperWorkspace` |  |
| 565 | `WORKSPACE.DEMO_EXPERIMENTAL.SHOWCASE` | Showcase Workspace | `DeveloperWorkspace` |  |

### W54 Presentation & Display Workspaces (9)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 566 | `WORKSPACE.PRESENTATION_DISPLAY.PRESENTATION` | Presentation Display Workspace | `PresentationWorkspace` |  |
| 567 | `WORKSPACE.PRESENTATION_DISPLAY.FULLSCREEN` | Fullscreen Workspace | `PresentationWorkspace` |  |
| 568 | `WORKSPACE.PRESENTATION_DISPLAY.KIOSK` | Kiosk Workspace | `PresentationWorkspace` |  |
| 569 | `WORKSPACE.PRESENTATION_DISPLAY.TV` | TV Workspace | `PresentationWorkspace` |  |
| 570 | `WORKSPACE.PRESENTATION_DISPLAY.WALLBOARD` | Wallboard Workspace | `PresentationWorkspace` |  |
| 571 | `WORKSPACE.PRESENTATION_DISPLAY.PUBLIC_DISPLAY` | Public Display Workspace | `PresentationWorkspace` |  |
| 572 | `WORKSPACE.PRESENTATION_DISPLAY.EMBEDDED` | Embedded Workspace | `PresentationWorkspace` |  |
| 573 | `WORKSPACE.PRESENTATION_DISPLAY.SHARE` | Share Workspace | `PresentationWorkspace` |  |
| 574 | `WORKSPACE.PRESENTATION_DISPLAY.PRINT` | Print Workspace | `PresentationWorkspace` |  |

### W55 Emergency & State Workspaces (6)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 575 | `WORKSPACE.EMERGENCY_STATE.MAINTENANCE` | Maintenance Workspace | `CommandCenterWorkspace` |  |
| 576 | `WORKSPACE.EMERGENCY_STATE.RECOVERY` | Recovery Workspace | `CommandCenterWorkspace` |  |
| 577 | `WORKSPACE.EMERGENCY_STATE.OFFLINE` | Offline Workspace | `CommandCenterWorkspace` |  |
| 578 | `WORKSPACE.EMERGENCY_STATE.INCIDENT` | Incident Workspace | `ObservabilityWorkspace` | `WORKSPACE.RELIABILITY_OBSERVABILITY.INCIDENT` |
| 579 | `WORKSPACE.EMERGENCY_STATE.DEGRADED_SERVICE` | Degraded Service Workspace | `CommandCenterWorkspace` |  |
| 580 | `WORKSPACE.EMERGENCY_STATE.EMERGENCY_OPERATIONS` | Emergency Operations Workspace | `CommandCenterWorkspace` |  |

### W56 MAATAA Core Studio Workspaces (15)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 581 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_UI_STUDIO` | MAATAA UI Studio | `BuilderWorkspace` |  |
| 582 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_DOMAIN_STUDIO` | MAATAA Domain Studio | `BuilderWorkspace` |  |
| 583 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_DATA_STUDIO` | MAATAA Data Studio | `BuilderWorkspace` |  |
| 584 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_API_STUDIO` | MAATAA API Studio | `BuilderWorkspace` |  |
| 585 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_CODE_STUDIO` | MAATAA Code Studio | `BuilderWorkspace` |  |
| 586 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_WORKFLOW_STUDIO` | MAATAA Workflow Studio | `BuilderWorkspace` |  |
| 587 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_FORM_STUDIO` | MAATAA Form Studio | `BuilderWorkspace` |  |
| 588 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_PAGE_STUDIO` | MAATAA Page Studio | `BuilderWorkspace` |  |
| 589 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_APP_STUDIO` | MAATAA App Studio | `BuilderWorkspace` |  |
| 590 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_MOBILE_STUDIO` | MAATAA Mobile Studio | `BuilderWorkspace` |  |
| 591 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_THEME_STUDIO` | MAATAA Theme Studio | `BuilderWorkspace` |  |
| 592 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_AGENT_STUDIO` | MAATAA Agent Studio | `BuilderWorkspace` |  |
| 593 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_KNOWLEDGE_STUDIO` | MAATAA Knowledge Studio | `BuilderWorkspace` |  |
| 594 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_INFRASTRUCTURE_STUDIO` | MAATAA Infrastructure Studio | `BuilderWorkspace` |  |
| 595 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_CONTROL_PLANE_STUDIO` | MAATAA Control Plane Studio | `BuilderWorkspace` |  |

### W57 Workspace Meta/Management (13)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 596 | `WORKSPACE.WORKSPACE_META.WORKSPACE_SELECTOR` | Workspace Selector | `AdminWorkspace` |  |
| 597 | `WORKSPACE.WORKSPACE_META.WORKSPACE_SWITCHER` | Workspace Switcher | `AdminWorkspace` |  |
| 598 | `WORKSPACE.WORKSPACE_META.WORKSPACE_DIRECTORY` | Workspace Directory | `AdminWorkspace` |  |
| 599 | `WORKSPACE.WORKSPACE_META.WORKSPACE_CREATOR` | Workspace Creator | `AdminWorkspace` |  |
| 600 | `WORKSPACE.WORKSPACE_META.WORKSPACE_TEMPLATE_GALLERY` | Workspace Template Gallery | `AdminWorkspace` |  |
| 601 | `WORKSPACE.WORKSPACE_META.WORKSPACE_SETTINGS` | Workspace Settings | `AdminWorkspace` |  |
| 602 | `WORKSPACE.WORKSPACE_META.WORKSPACE_MEMBERS` | Workspace Members | `AdminWorkspace` |  |
| 603 | `WORKSPACE.WORKSPACE_META.WORKSPACE_ROLES` | Workspace Roles | `AdminWorkspace` |  |
| 604 | `WORKSPACE.WORKSPACE_META.WORKSPACE_PERMISSIONS` | Workspace Permissions | `AdminWorkspace` |  |
| 605 | `WORKSPACE.WORKSPACE_META.WORKSPACE_INTEGRATIONS` | Workspace Integrations | `AdminWorkspace` |  |
| 606 | `WORKSPACE.WORKSPACE_META.WORKSPACE_ACTIVITY` | Workspace Activity | `AdminWorkspace` |  |
| 607 | `WORKSPACE.WORKSPACE_META.WORKSPACE_AUDIT` | Workspace Audit | `AdminWorkspace` |  |
| 608 | `WORKSPACE.WORKSPACE_META.WORKSPACE_ARCHIVE` | Workspace Archive | `AdminWorkspace` |  |

### W58 Multi-Workspace Systems (8)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 609 | `WORKSPACE.MULTI_WORKSPACE.WORKSPACE_HUB` | Workspace Hub | `OrganisationWorkspace` |  |
| 610 | `WORKSPACE.MULTI_WORKSPACE.WORKSPACE_FEDERATION` | Workspace Federation | `OrganisationWorkspace` |  |
| 611 | `WORKSPACE.MULTI_WORKSPACE.WORKSPACE_PORTFOLIO` | Workspace Portfolio | `OrganisationWorkspace` |  |
| 612 | `WORKSPACE.MULTI_WORKSPACE.MULTI_TENANT_HUB` | Multi-Tenant Workspace Hub | `OrganisationWorkspace` |  |
| 613 | `WORKSPACE.MULTI_WORKSPACE.CROSS_WORKSPACE_SEARCH` | Cross-Workspace Search | `OrganisationWorkspace` |  |
| 614 | `WORKSPACE.MULTI_WORKSPACE.CROSS_WORKSPACE_ACTIVITY` | Cross-Workspace Activity | `OrganisationWorkspace` |  |
| 615 | `WORKSPACE.MULTI_WORKSPACE.CROSS_WORKSPACE_ANALYTICS` | Cross-Workspace Analytics | `OrganisationWorkspace` |  |
| 616 | `WORKSPACE.MULTI_WORKSPACE.CROSS_WORKSPACE_COMMAND_CENTER` | Cross-Workspace Command Center | `OrganisationWorkspace` |  |

## Moved to the TLPS product (31)

Source: `apps/tlps/src/registries/workspaceRegistry.ts`.

### W35 TLPS Production Workspaces (13)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 1 | `WORKSPACE.TLPS_PRODUCTION.PRODUCTION` | Production Workspace | `ProductionWorkspace` |  |
| 2 | `WORKSPACE.TLPS_PRODUCTION.PRODUCTION_COMMAND_CENTER` | Production Command Center | `ProductionWorkspace` |  |
| 3 | `WORKSPACE.TLPS_PRODUCTION.PROJECT_PRODUCTION` | Project Production Workspace | `ProductionWorkspace` |  |
| 4 | `WORKSPACE.TLPS_PRODUCTION.PRE_PRODUCTION` | Pre-Production Workspace | `ProductionWorkspace` |  |
| 5 | `WORKSPACE.TLPS_PRODUCTION.SHOOT` | Shoot Workspace | `ProductionWorkspace` |  |
| 6 | `WORKSPACE.TLPS_PRODUCTION.POST_PRODUCTION` | Post-Production Workspace | `ProductionWorkspace` |  |
| 7 | `WORKSPACE.TLPS_PRODUCTION.SCRIPT` | Script Workspace | `ProductionWorkspace` |  |
| 8 | `WORKSPACE.TLPS_PRODUCTION.SCRIPT_BREAKDOWN` | Script Breakdown Workspace | `ProductionWorkspace` |  |
| 9 | `WORKSPACE.TLPS_PRODUCTION.SCENE` | Scene Workspace | `ProductionWorkspace` |  |
| 10 | `WORKSPACE.TLPS_PRODUCTION.SHOT` | Shot Workspace | `ProductionWorkspace` |  |
| 11 | `WORKSPACE.TLPS_PRODUCTION.SHOT_LIST` | Shot List Workspace | `ProductionWorkspace` |  |
| 12 | `WORKSPACE.TLPS_PRODUCTION.STORYBOARD` | Storyboard Workspace | `ProductionWorkspace` |  |
| 13 | `WORKSPACE.TLPS_PRODUCTION.SCHEDULE_BOARD` | Schedule Board Workspace | `ProductionWorkspace` |  |

### W36 Casting Workspaces (10)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 14 | `WORKSPACE.CASTING.CASTING` | Casting Workspace | `ProductionWorkspace` |  |
| 15 | `WORKSPACE.CASTING.CASTING_BOARD` | Casting Board Workspace | `ProductionWorkspace` |  |
| 16 | `WORKSPACE.CASTING.CASTING_SEARCH` | Casting Search Workspace | `ProductionWorkspace` |  |
| 17 | `WORKSPACE.CASTING.TALENT` | Talent Workspace | `ProductionWorkspace` |  |
| 18 | `WORKSPACE.CASTING.ARTIST` | Artist Workspace | `ProductionWorkspace` |  |
| 19 | `WORKSPACE.CASTING.AUDITION` | Audition Workspace | `ProductionWorkspace` |  |
| 20 | `WORKSPACE.CASTING.CASTING_REVIEW` | Casting Review Workspace | `ProductionWorkspace` |  |
| 21 | `WORKSPACE.CASTING.CASTING_APPROVAL` | Casting Approval Workspace | `ProductionWorkspace` |  |
| 22 | `WORKSPACE.CASTING.CASTING_AVAILABILITY` | Casting Availability Workspace | `ProductionWorkspace` |  |
| 23 | `WORKSPACE.CASTING.CASTING_CONTRACT` | Casting Contract Workspace | `ProductionWorkspace` |  |

### W37 Crew Workspaces (8)

| # | ID | Name | Archetype | Alias of |
| --- | --- | --- | --- | --- |
| 24 | `WORKSPACE.CREW.CREW` | Crew Workspace | `TeamWorkspace` |  |
| 25 | `WORKSPACE.CREW.CREW_DIRECTORY` | Crew Directory Workspace | `TeamWorkspace` |  |
| 26 | `WORKSPACE.CREW.DEPARTMENT` | Department Workspace | `TeamWorkspace` |  |
| 27 | `WORKSPACE.CREW.CREW_SCHEDULING` | Crew Scheduling Workspace | `TeamWorkspace` |  |
| 28 | `WORKSPACE.CREW.CREW_AVAILABILITY` | Crew Availability Workspace | `TeamWorkspace` |  |
| 29 | `WORKSPACE.CREW.CREW_ASSIGNMENT` | Crew Assignment Workspace | `TeamWorkspace` |  |
| 30 | `WORKSPACE.CREW.CREW_COMMUNICATION` | Crew Communication Workspace | `TeamWorkspace` |  |
| 31 | `WORKSPACE.CREW.CREW_CONTRACT` | Crew Contract Workspace | `TeamWorkspace` |  |
