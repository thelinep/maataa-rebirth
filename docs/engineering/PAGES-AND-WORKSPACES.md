# Pages and workspaces: inventory and scrutiny

Generated 2026-10-12 from `docs/canonical-catalog.json` at `c141d99d`. Machine-readable copy: [`pages-and-workspaces.csv`](pages-and-workspaces.csv).

## Findings

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

**Compatibility evidence tuples**

| Workspace | Page | Layout |
| --- | --- | --- |
| `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_UI_STUDIO` | `PAGE.BUILDERS_AUTOMATION.PAGE_BUILDER` | `LAYOUT.WORKSPACE.BUILDER` |
| `WORKSPACE.UI_DESIGN_SYSTEM.DESIGN_SYSTEM` | `PAGE.DESIGN_SYSTEM.DESIGN_SYSTEM` | `LAYOUT.WORKSPACE.WORKBENCH` |
| `WORKSPACE.EVENT.EVENT_COMMAND_CENTER` | `PAGE.EVENTS.EVENT_DASHBOARD` | `LAYOUT.OPERATIONAL.COMMANDCENTER` |
| `WORKSPACE.EVENT.EVENT_SPATIAL` | `PAGE.EVENTS.EVENT_SPATIAL` | `LAYOUT.CANVAS_SPATIAL.SPATIALCAD` |
| `WORKSPACE.TLPS_PRODUCTION.PRODUCTION_COMMAND_CENTER` | `PAGE.PRODUCTION_LOGISTICS.PRODUCTION_DASHBOARD` | `LAYOUT.WORKSPACE.STUDIO` |
| `WORKSPACE.AI.AI_EVALUATION` | `PAGE.AI_KNOWLEDGE.AI_EVALUATION` | `LAYOUT.OPERATIONAL.COMMANDCENTER` |
| `WORKSPACE.MOBILE.MOBILE_PREVIEW` | `PAGE.PRESENTATION_MODES.PREVIEW` | `LAYOUT.RESPONSIVE_MOBILE.MOBILESTACK` |
| `WORKSPACE.CONTROL_PLANE.MAATAA_CONTROL_PLANE` | `PAGE.CONTROL_PLANE.CONTROL_PLANE` | `LAYOUT.DATA_ANALYTICS.ANALYTICS` |

## Pages (500)

### P01 Marketing & Corporate (30)

| # | ID | Name |
| --- | --- | --- |
| 1 | `PAGE.MARKETING_CORPORATE.LANDING` | Landing Page |
| 2 | `PAGE.MARKETING_CORPORATE.HOME` | Home Page |
| 3 | `PAGE.MARKETING_CORPORATE.MARKETING_HOME` | Marketing Home Page |
| 4 | `PAGE.MARKETING_CORPORATE.PRODUCT` | Product Page |
| 5 | `PAGE.MARKETING_CORPORATE.PRODUCT_SUITE` | Product Suite Page |
| 6 | `PAGE.MARKETING_CORPORATE.FEATURE` | Feature Page |
| 7 | `PAGE.MARKETING_CORPORATE.SOLUTION` | Solution Page |
| 8 | `PAGE.MARKETING_CORPORATE.INDUSTRY` | Industry Page |
| 9 | `PAGE.MARKETING_CORPORATE.USE_CASE` | Use Case Page |
| 10 | `PAGE.MARKETING_CORPORATE.PERSONA` | Persona Page |
| 11 | `PAGE.MARKETING_CORPORATE.CAMPAIGN` | Campaign Page |
| 12 | `PAGE.MARKETING_CORPORATE.LAUNCH` | Launch Page |
| 13 | `PAGE.MARKETING_CORPORATE.COMING_SOON` | Coming Soon Page |
| 14 | `PAGE.MARKETING_CORPORATE.WAITLIST` | Waitlist Page |
| 15 | `PAGE.MARKETING_CORPORATE.ABOUT` | About Page |
| 16 | `PAGE.MARKETING_CORPORATE.MISSION` | Mission Page |
| 17 | `PAGE.MARKETING_CORPORATE.TEAM` | Team Page |
| 18 | `PAGE.MARKETING_CORPORATE.CAREERS` | Careers Page |
| 19 | `PAGE.MARKETING_CORPORATE.PRESS` | Press Page |
| 20 | `PAGE.MARKETING_CORPORATE.MEDIA_KIT` | Media Kit Page |
| 21 | `PAGE.MARKETING_CORPORATE.PARTNER` | Partner Page |
| 22 | `PAGE.MARKETING_CORPORATE.INVESTOR` | Investor Page |
| 23 | `PAGE.MARKETING_CORPORATE.CONTACT` | Contact Page |
| 24 | `PAGE.MARKETING_CORPORATE.SUPPORT_LANDING` | Support Landing Page |
| 25 | `PAGE.MARKETING_CORPORATE.PRICING` | Pricing Page |
| 26 | `PAGE.MARKETING_CORPORATE.PRICING_COMPARISON` | Pricing Comparison Page |
| 27 | `PAGE.MARKETING_CORPORATE.FAQ` | FAQ Page |
| 28 | `PAGE.MARKETING_CORPORATE.TESTIMONIALS` | Testimonials Page |
| 29 | `PAGE.MARKETING_CORPORATE.CASE_STUDY` | Case Study Page |
| 30 | `PAGE.MARKETING_CORPORATE.CASE_STUDIES_INDEX` | Case Studies Index |

### P02 Content & Editorial (6)

| # | ID | Name |
| --- | --- | --- |
| 31 | `PAGE.CONTENT_EDITORIAL.PORTFOLIO` | Portfolio Page |
| 32 | `PAGE.CONTENT_EDITORIAL.GALLERY` | Gallery Page |
| 33 | `PAGE.CONTENT_EDITORIAL.BLOG_INDEX` | Blog Index |
| 34 | `PAGE.CONTENT_EDITORIAL.BLOG_ARTICLE` | Blog Article |
| 35 | `PAGE.CONTENT_EDITORIAL.NEWS_INDEX` | News Index |
| 36 | `PAGE.CONTENT_EDITORIAL.NEWS_ARTICLE` | News Article |

### P03 Documentation & Developer (12)

| # | ID | Name |
| --- | --- | --- |
| 37 | `PAGE.DOCUMENTATION_DEVELOPER.DOCUMENTATION_HOME` | Documentation Home |
| 38 | `PAGE.DOCUMENTATION_DEVELOPER.DOCUMENTATION_ARTICLE` | Documentation Article |
| 39 | `PAGE.DOCUMENTATION_DEVELOPER.KNOWLEDGE_BASE_HOME` | Knowledge Base Home |
| 40 | `PAGE.DOCUMENTATION_DEVELOPER.KNOWLEDGE_ARTICLE` | Knowledge Article |
| 41 | `PAGE.DOCUMENTATION_DEVELOPER.TUTORIAL` | Tutorial Page |
| 42 | `PAGE.DOCUMENTATION_DEVELOPER.GUIDE` | Guide Page |
| 43 | `PAGE.DOCUMENTATION_DEVELOPER.API_DOCUMENTATION` | API Documentation Page |
| 44 | `PAGE.DOCUMENTATION_DEVELOPER.SDK_DOCUMENTATION` | SDK Documentation Page |
| 45 | `PAGE.DOCUMENTATION_DEVELOPER.CHANGELOG` | Changelog Page |
| 46 | `PAGE.DOCUMENTATION_DEVELOPER.RELEASE_NOTES` | Release Notes Page |
| 47 | `PAGE.DOCUMENTATION_DEVELOPER.ROADMAP` | Roadmap Page |
| 48 | `PAGE.DOCUMENTATION_DEVELOPER.STATUS` | Status Page |

### P04 Legal & Trust (10)

| # | ID | Name |
| --- | --- | --- |
| 49 | `PAGE.LEGAL_TRUST.TRUST_CENTER` | Trust Center Page |
| 50 | `PAGE.LEGAL_TRUST.SECURITY` | Security Page |
| 51 | `PAGE.LEGAL_TRUST.COMPLIANCE` | Compliance Page |
| 52 | `PAGE.LEGAL_TRUST.PRIVACY_POLICY` | Privacy Policy Page |
| 53 | `PAGE.LEGAL_TRUST.TERMS` | Terms Page |
| 54 | `PAGE.LEGAL_TRUST.COOKIE_POLICY` | Cookie Policy Page |
| 55 | `PAGE.LEGAL_TRUST.REFUND_POLICY` | Refund Policy Page |
| 56 | `PAGE.LEGAL_TRUST.LEGAL_NOTICE` | Legal Notice Page |
| 57 | `PAGE.LEGAL_TRUST.LICENSE` | License Page |
| 58 | `PAGE.LEGAL_TRUST.ACCESSIBILITY_STATEMENT` | Accessibility Statement Page |

### P05 Authentication (17)

| # | ID | Name |
| --- | --- | --- |
| 59 | `PAGE.AUTHENTICATION.SIGN_IN` | Sign In Page |
| 60 | `PAGE.AUTHENTICATION.SIGN_UP` | Sign Up Page |
| 61 | `PAGE.AUTHENTICATION.SIGN_OUT` | Sign Out Page |
| 62 | `PAGE.AUTHENTICATION.FORGOT_PASSWORD` | Forgot Password Page |
| 63 | `PAGE.AUTHENTICATION.RESET_PASSWORD` | Reset Password Page |
| 64 | `PAGE.AUTHENTICATION.EMAIL_VERIFICATION` | Email Verification Page |
| 65 | `PAGE.AUTHENTICATION.PHONE_VERIFICATION` | Phone Verification Page |
| 66 | `PAGE.AUTHENTICATION.MFA_CHALLENGE` | MFA Challenge Page |
| 67 | `PAGE.AUTHENTICATION.PASSKEY` | Passkey Page |
| 68 | `PAGE.AUTHENTICATION.SSO` | SSO Page |
| 69 | `PAGE.AUTHENTICATION.MAGIC_LINK` | Magic Link Page |
| 70 | `PAGE.AUTHENTICATION.UNLOCK_SESSION` | Unlock Session Page |
| 71 | `PAGE.AUTHENTICATION.SESSION_EXPIRED` | Session Expired Page |
| 72 | `PAGE.AUTHENTICATION.ACCOUNT_CONFIRMATION` | Account Confirmation Page |
| 73 | `PAGE.AUTHENTICATION.INVITE_ACCEPTANCE` | Invite Acceptance Page |
| 74 | `PAGE.AUTHENTICATION.ACCESS_REQUEST` | Access Request Page |
| 75 | `PAGE.AUTHENTICATION.PERMISSION_DENIED` | Permission Denied Page |

### P06 Onboarding (8)

| # | ID | Name |
| --- | --- | --- |
| 76 | `PAGE.ONBOARDING.ONBOARDING_WELCOME` | Onboarding Welcome Page |
| 77 | `PAGE.ONBOARDING.ONBOARDING_PROFILE` | Onboarding Profile Page |
| 78 | `PAGE.ONBOARDING.ONBOARDING_ORGANISATION` | Onboarding Organisation Page |
| 79 | `PAGE.ONBOARDING.ONBOARDING_WORKSPACE` | Onboarding Workspace Page |
| 80 | `PAGE.ONBOARDING.ONBOARDING_ROLE` | Onboarding Role Page |
| 81 | `PAGE.ONBOARDING.ONBOARDING_PREFERENCES` | Onboarding Preferences Page |
| 82 | `PAGE.ONBOARDING.ONBOARDING_INTEGRATION` | Onboarding Integration Page |
| 83 | `PAGE.ONBOARDING.ONBOARDING_COMPLETION` | Onboarding Completion Page |

### P07 Dashboard & Overview (16)

| # | ID | Name |
| --- | --- | --- |
| 84 | `PAGE.DASHBOARD_OVERVIEW.DASHBOARD` | Dashboard Page |
| 85 | `PAGE.DASHBOARD_OVERVIEW.EXECUTIVE_DASHBOARD` | Executive Dashboard |
| 86 | `PAGE.DASHBOARD_OVERVIEW.OPERATIONAL_DASHBOARD` | Operational Dashboard |
| 87 | `PAGE.DASHBOARD_OVERVIEW.ANALYTICS_DASHBOARD` | Analytics Dashboard |
| 88 | `PAGE.DASHBOARD_OVERVIEW.PERSONAL_DASHBOARD` | Personal Dashboard |
| 89 | `PAGE.DASHBOARD_OVERVIEW.ROLE_DASHBOARD` | Role Dashboard |
| 90 | `PAGE.DASHBOARD_OVERVIEW.TEAM_DASHBOARD` | Team Dashboard |
| 91 | `PAGE.DASHBOARD_OVERVIEW.ORGANISATION_DASHBOARD` | Organisation Dashboard |
| 92 | `PAGE.DASHBOARD_OVERVIEW.WORKSPACE_DASHBOARD` | Workspace Dashboard |
| 93 | `PAGE.DASHBOARD_OVERVIEW.PROJECT_DASHBOARD` | Project Dashboard |
| 94 | `PAGE.DASHBOARD_OVERVIEW.PROGRAM_DASHBOARD` | Program Dashboard |
| 95 | `PAGE.DASHBOARD_OVERVIEW.COMMAND_CENTER` | Command Center Page |
| 96 | `PAGE.DASHBOARD_OVERVIEW.CONTROL_ROOM` | Control Room Page |
| 97 | `PAGE.DASHBOARD_OVERVIEW.OPERATIONS_WALLBOARD` | Operations Wallboard Page |
| 98 | `PAGE.DASHBOARD_OVERVIEW.COCKPIT` | Cockpit Page |
| 99 | `PAGE.DASHBOARD_OVERVIEW.OVERVIEW` | Overview Page |

### P08 Entity CRUD (17)

| # | ID | Name |
| --- | --- | --- |
| 100 | `PAGE.ENTITY_CRUD.INDEX_LIST` | Index/List Page |
| 101 | `PAGE.ENTITY_CRUD.DETAIL` | Detail Page |
| 102 | `PAGE.ENTITY_CRUD.CREATE` | Create Page |
| 103 | `PAGE.ENTITY_CRUD.EDIT` | Edit Page |
| 104 | `PAGE.ENTITY_CRUD.CLONE` | Clone Page |
| 105 | `PAGE.ENTITY_CRUD.REVIEW` | Review Page |
| 106 | `PAGE.ENTITY_CRUD.APPROVAL` | Approval Page |
| 107 | `PAGE.ENTITY_CRUD.COMPARISON` | Comparison Page |
| 108 | `PAGE.ENTITY_CRUD.HISTORY` | History Page |
| 109 | `PAGE.ENTITY_CRUD.ACTIVITY` | Activity Page |
| 110 | `PAGE.ENTITY_CRUD.AUDIT_LOG` | Audit Log Page |
| 111 | `PAGE.ENTITY_CRUD.VERSION_HISTORY` | Version History Page |
| 112 | `PAGE.ENTITY_CRUD.DIFF` | Diff Page |
| 113 | `PAGE.ENTITY_CRUD.TIMELINE` | Timeline Page |
| 114 | `PAGE.ENTITY_CRUD.EVIDENCE` | Evidence Page |
| 115 | `PAGE.ENTITY_CRUD.RELATIONSHIPS` | Relationships Page |
| 116 | `PAGE.ENTITY_CRUD.DEPENDENCY` | Dependency Page |

### P09 Search & Discovery (5)

| # | ID | Name |
| --- | --- | --- |
| 117 | `PAGE.SEARCH_DISCOVERY.SEARCH` | Search Page |
| 118 | `PAGE.SEARCH_DISCOVERY.SEARCH_RESULTS` | Search Results Page |
| 119 | `PAGE.SEARCH_DISCOVERY.ADVANCED_SEARCH` | Advanced Search Page |
| 120 | `PAGE.SEARCH_DISCOVERY.SAVED_SEARCHES` | Saved Searches Page |
| 121 | `PAGE.SEARCH_DISCOVERY.FILTER_EXPLORER` | Filter Explorer Page |

### P10 Data & Schema (11)

| # | ID | Name |
| --- | --- | --- |
| 122 | `PAGE.DATA_SCHEMA.DATA_TABLE` | Data Table Page |
| 123 | `PAGE.DATA_SCHEMA.DATA_EXPLORER` | Data Explorer Page |
| 124 | `PAGE.DATA_SCHEMA.DATA_BROWSER` | Data Browser Page |
| 125 | `PAGE.DATA_SCHEMA.DATA_DETAIL` | Data Detail Page |
| 126 | `PAGE.DATA_SCHEMA.SCHEMA_EXPLORER` | Schema Explorer Page |
| 127 | `PAGE.DATA_SCHEMA.SCHEMA_DETAIL` | Schema Detail Page |
| 128 | `PAGE.DATA_SCHEMA.DATA_STUDIO` | Data Studio Page |
| 129 | `PAGE.DATA_SCHEMA.DOMAIN_REGISTRY` | Domain Registry Page |
| 130 | `PAGE.DATA_SCHEMA.DOMAIN_DETAIL` | Domain Detail Page |
| 131 | `PAGE.DATA_SCHEMA.CONTRACT_REGISTRY` | Contract Registry Page |
| 132 | `PAGE.DATA_SCHEMA.CONTRACT_DETAIL` | Contract Detail Page |

### P11 API & Integration (16)

| # | ID | Name |
| --- | --- | --- |
| 133 | `PAGE.API_INTEGRATION.API_STUDIO` | API Studio Page |
| 134 | `PAGE.API_INTEGRATION.API_SERVICE` | API Service Page |
| 135 | `PAGE.API_INTEGRATION.API_ENDPOINT` | API Endpoint Page |
| 136 | `PAGE.API_INTEGRATION.API_REQUEST_BUILDER` | API Request Builder Page |
| 137 | `PAGE.API_INTEGRATION.API_RESPONSE_VIEWER` | API Response Viewer Page |
| 138 | `PAGE.API_INTEGRATION.API_ENVIRONMENT` | API Environment Page |
| 139 | `PAGE.API_INTEGRATION.API_MOCK` | API Mock Page |
| 140 | `PAGE.API_INTEGRATION.API_CONFORMANCE` | API Conformance Page |
| 141 | `PAGE.API_INTEGRATION.API_KEYS` | API Keys Page |
| 142 | `PAGE.API_INTEGRATION.WEBHOOK` | Webhook Page |
| 143 | `PAGE.API_INTEGRATION.WEBHOOK_DELIVERY` | Webhook Delivery Page |
| 144 | `PAGE.API_INTEGRATION.INTEGRATION_CATALOG` | Integration Catalog Page |
| 145 | `PAGE.API_INTEGRATION.INTEGRATION_DETAIL` | Integration Detail Page |
| 146 | `PAGE.API_INTEGRATION.INTEGRATION_SETUP` | Integration Setup Page |
| 147 | `PAGE.API_INTEGRATION.INTEGRATION_CONNECTION` | Integration Connection Page |
| 148 | `PAGE.API_INTEGRATION.DEVELOPER_CONSOLE` | Developer Console Page |

### P12 Development & Source (11)

| # | ID | Name |
| --- | --- | --- |
| 149 | `PAGE.DEVELOPMENT_SOURCE.CODE_STUDIO` | Code Studio Page |
| 150 | `PAGE.DEVELOPMENT_SOURCE.CODE_EDITOR` | Code Editor Page |
| 151 | `PAGE.DEVELOPMENT_SOURCE.REPOSITORY` | Repository Page |
| 152 | `PAGE.DEVELOPMENT_SOURCE.REPOSITORY_BROWSER` | Repository Browser Page |
| 153 | `PAGE.DEVELOPMENT_SOURCE.COMMIT_DETAIL` | Commit Detail Page |
| 154 | `PAGE.DEVELOPMENT_SOURCE.BRANCH` | Branch Page |
| 155 | `PAGE.DEVELOPMENT_SOURCE.PULL_REQUEST` | Pull Request Page |
| 156 | `PAGE.DEVELOPMENT_SOURCE.ISSUE` | Issue Page |
| 157 | `PAGE.DEVELOPMENT_SOURCE.BUILD` | Build Page |
| 158 | `PAGE.DEVELOPMENT_SOURCE.CI_CD` | CI/CD Page |
| 159 | `PAGE.DEVELOPMENT_SOURCE.PIPELINE_DETAIL` | Pipeline Detail Page |

### P13 Infrastructure & Runtime (14)

| # | ID | Name |
| --- | --- | --- |
| 160 | `PAGE.INFRASTRUCTURE_RUNTIME.DEPLOYMENT` | Deployment Page |
| 161 | `PAGE.INFRASTRUCTURE_RUNTIME.DEPLOYMENT_HISTORY` | Deployment History Page |
| 162 | `PAGE.INFRASTRUCTURE_RUNTIME.ENVIRONMENT` | Environment Page |
| 163 | `PAGE.INFRASTRUCTURE_RUNTIME.ENVIRONMENT_DETAIL` | Environment Detail Page |
| 164 | `PAGE.INFRASTRUCTURE_RUNTIME.INFRASTRUCTURE` | Infrastructure Page |
| 165 | `PAGE.INFRASTRUCTURE_RUNTIME.INFRASTRUCTURE_RESOURCE` | Infrastructure Resource Page |
| 166 | `PAGE.INFRASTRUCTURE_RUNTIME.SERVER` | Server Page |
| 167 | `PAGE.INFRASTRUCTURE_RUNTIME.SERVICE` | Service Page |
| 168 | `PAGE.INFRASTRUCTURE_RUNTIME.DATABASE` | Database Page |
| 169 | `PAGE.INFRASTRUCTURE_RUNTIME.DATABASE_EXPLORER` | Database Explorer Page |
| 170 | `PAGE.INFRASTRUCTURE_RUNTIME.MIGRATION` | Migration Page |
| 171 | `PAGE.INFRASTRUCTURE_RUNTIME.MIGRATION_HISTORY` | Migration History Page |
| 172 | `PAGE.INFRASTRUCTURE_RUNTIME.BACKUP` | Backup Page |
| 173 | `PAGE.INFRASTRUCTURE_RUNTIME.RESTORE` | Restore Page |

### P14 Observability & Reliability (11)

| # | ID | Name |
| --- | --- | --- |
| 174 | `PAGE.OBSERVABILITY_RELIABILITY.OBSERVABILITY` | Observability Page |
| 175 | `PAGE.OBSERVABILITY_RELIABILITY.METRICS` | Metrics Page |
| 176 | `PAGE.OBSERVABILITY_RELIABILITY.LOGS` | Logs Page |
| 177 | `PAGE.OBSERVABILITY_RELIABILITY.TRACE` | Trace Page |
| 178 | `PAGE.OBSERVABILITY_RELIABILITY.INCIDENT` | Incident Page |
| 179 | `PAGE.OBSERVABILITY_RELIABILITY.INCIDENT_DETAIL` | Incident Detail Page |
| 180 | `PAGE.OBSERVABILITY_RELIABILITY.ALERT` | Alert Page |
| 181 | `PAGE.OBSERVABILITY_RELIABILITY.ALERT_DETAIL` | Alert Detail Page |
| 182 | `PAGE.OBSERVABILITY_RELIABILITY.HEALTH` | Health Page |
| 183 | `PAGE.OBSERVABILITY_RELIABILITY.TOPOLOGY` | Topology Page |
| 184 | `PAGE.OBSERVABILITY_RELIABILITY.NETWORK` | Network Page |

### P15 Administration & Configuration (29)

| # | ID | Name |
| --- | --- | --- |
| 185 | `PAGE.ADMIN_CONFIGURATION.SECRET_REFERENCES` | Secret References Page |
| 186 | `PAGE.ADMIN_CONFIGURATION.CONFIGURATION` | Configuration Page |
| 187 | `PAGE.ADMIN_CONFIGURATION.FEATURE_FLAGS` | Feature Flags Page |
| 188 | `PAGE.ADMIN_CONFIGURATION.WORKSPACE` | Workspace Page |
| 189 | `PAGE.ADMIN_CONFIGURATION.WORKSPACE_MEMBERS` | Workspace Members Page |
| 190 | `PAGE.ADMIN_CONFIGURATION.ORGANISATION` | Organisation Page |
| 191 | `PAGE.ADMIN_CONFIGURATION.ORGANISATION_MEMBERS` | Organisation Members Page |
| 192 | `PAGE.ADMIN_CONFIGURATION.PEOPLE_DIRECTORY` | People Directory Page |
| 193 | `PAGE.ADMIN_CONFIGURATION.PERSON_PROFILE` | Person Profile Page |
| 194 | `PAGE.ADMIN_CONFIGURATION.USER_PROFILE` | User Profile Page |
| 195 | `PAGE.ADMIN_CONFIGURATION.ACCOUNT` | Account Page |
| 196 | `PAGE.ADMIN_CONFIGURATION.PREFERENCES` | Preferences Page |
| 197 | `PAGE.ADMIN_CONFIGURATION.SETTINGS_HOME` | Settings Home Page |
| 198 | `PAGE.ADMIN_CONFIGURATION.GENERAL_SETTINGS` | General Settings Page |
| 199 | `PAGE.ADMIN_CONFIGURATION.APPEARANCE_SETTINGS` | Appearance Settings Page |
| 200 | `PAGE.ADMIN_CONFIGURATION.NOTIFICATION_SETTINGS` | Notification Settings Page |
| 201 | `PAGE.ADMIN_CONFIGURATION.SECURITY_SETTINGS` | Security Settings Page |
| 202 | `PAGE.ADMIN_CONFIGURATION.PRIVACY_SETTINGS` | Privacy Settings Page |
| 203 | `PAGE.ADMIN_CONFIGURATION.LANGUAGE_AND_REGION` | Language & Region Page |
| 204 | `PAGE.ADMIN_CONFIGURATION.CONNECTED_APPS` | Connected Apps Page |
| 205 | `PAGE.ADMIN_CONFIGURATION.SESSIONS` | Sessions Page |
| 206 | `PAGE.ADMIN_CONFIGURATION.DEVICES` | Devices Page |
| 207 | `PAGE.ADMIN_CONFIGURATION.ROLES` | Roles Page |
| 208 | `PAGE.ADMIN_CONFIGURATION.ROLE_DETAIL` | Role Detail Page |
| 209 | `PAGE.ADMIN_CONFIGURATION.PERMISSIONS` | Permissions Page |
| 210 | `PAGE.ADMIN_CONFIGURATION.ACCESS_POLICIES` | Access Policies Page |
| 211 | `PAGE.ADMIN_CONFIGURATION.TEAMS` | Teams Page |
| 212 | `PAGE.ADMIN_CONFIGURATION.TEAM_DETAIL` | Team Detail Page |
| 213 | `PAGE.ADMIN_CONFIGURATION.CONTACTS` | Contacts Page |

### P16 CRM & Sales (8)

| # | ID | Name |
| --- | --- | --- |
| 214 | `PAGE.CRM_SALES.CONTACT_DETAIL` | Contact Detail Page |
| 215 | `PAGE.CRM_SALES.CRM_ACCOUNTS` | CRM Accounts Page |
| 216 | `PAGE.CRM_SALES.CRM_ACCOUNT_DETAIL` | CRM Account Detail Page |
| 217 | `PAGE.CRM_SALES.LEADS` | Leads Page |
| 218 | `PAGE.CRM_SALES.LEAD_DETAIL` | Lead Detail Page |
| 219 | `PAGE.CRM_SALES.OPPORTUNITIES` | Opportunities Page |
| 220 | `PAGE.CRM_SALES.OPPORTUNITY_DETAIL` | Opportunity Detail Page |
| 221 | `PAGE.CRM_SALES.PIPELINE` | Pipeline Page |

### P17 Communication (10)

| # | ID | Name |
| --- | --- | --- |
| 222 | `PAGE.COMMUNICATION.INBOX` | Inbox Page |
| 223 | `PAGE.COMMUNICATION.MESSAGE_THREAD` | Message Thread Page |
| 224 | `PAGE.COMMUNICATION.COMPOSE_MESSAGE` | Compose Message Page |
| 225 | `PAGE.COMMUNICATION.CHAT` | Chat Page |
| 226 | `PAGE.COMMUNICATION.MESSENGER` | Messenger Page |
| 227 | `PAGE.COMMUNICATION.ANNOUNCEMENTS` | Announcements Page |
| 228 | `PAGE.COMMUNICATION.ANNOUNCEMENT_DETAIL` | Announcement Detail Page |
| 229 | `PAGE.COMMUNICATION.NOTIFICATIONS` | Notifications Page |
| 230 | `PAGE.COMMUNICATION.NOTIFICATION_DETAIL` | Notification Detail Page |
| 231 | `PAGE.COMMUNICATION.MAIL` | Mail Page |

### P18 Productivity & Planning (13)

| # | ID | Name |
| --- | --- | --- |
| 232 | `PAGE.PRODUCTIVITY_PLANNING.CALENDAR` | Calendar Page |
| 233 | `PAGE.PRODUCTIVITY_PLANNING.CALENDAR_EVENT` | Calendar Event Page |
| 234 | `PAGE.PRODUCTIVITY_PLANNING.SCHEDULER` | Scheduler Page |
| 235 | `PAGE.PRODUCTIVITY_PLANNING.AGENDA` | Agenda Page |
| 236 | `PAGE.PRODUCTIVITY_PLANNING.TASKS` | Tasks Page |
| 237 | `PAGE.PRODUCTIVITY_PLANNING.TASK_DETAIL` | Task Detail Page |
| 238 | `PAGE.PRODUCTIVITY_PLANNING.KANBAN` | Kanban Page |
| 239 | `PAGE.PRODUCTIVITY_PLANNING.SCRUM_BOARD` | Scrum Board Page |
| 240 | `PAGE.PRODUCTIVITY_PLANNING.BACKLOG` | Backlog Page |
| 241 | `PAGE.PRODUCTIVITY_PLANNING.SPRINT` | Sprint Page |
| 242 | `PAGE.PRODUCTIVITY_PLANNING.MILESTONES` | Milestones Page |
| 243 | `PAGE.PRODUCTIVITY_PLANNING.GANTT` | Gantt Page |
| 244 | `PAGE.PRODUCTIVITY_PLANNING.ROADMAP_PLANNER` | Roadmap Planner Page |

### P19 Projects & Programs (8)

| # | ID | Name |
| --- | --- | --- |
| 245 | `PAGE.PROJECTS_PROGRAMS.PROJECT_LIST` | Project List Page |
| 246 | `PAGE.PROJECTS_PROGRAMS.PROJECT_DETAIL` | Project Detail Page |
| 247 | `PAGE.PROJECTS_PROGRAMS.PROJECT_WORKSPACE` | Project Workspace Page |
| 248 | `PAGE.PROJECTS_PROGRAMS.PROJECT_FILES` | Project Files Page |
| 249 | `PAGE.PROJECTS_PROGRAMS.PROJECT_TEAM` | Project Team Page |
| 250 | `PAGE.PROJECTS_PROGRAMS.PROJECT_ACTIVITY` | Project Activity Page |
| 251 | `PAGE.PROJECTS_PROGRAMS.PROJECT_TIMELINE` | Project Timeline Page |
| 252 | `PAGE.PROJECTS_PROGRAMS.PROJECT_SETTINGS` | Project Settings Page |

### P20 Documents & Files (15)

| # | ID | Name |
| --- | --- | --- |
| 253 | `PAGE.DOCUMENTS_FILES.FILE_MANAGER` | File Manager Page |
| 254 | `PAGE.DOCUMENTS_FILES.FILE_DETAIL` | File Detail Page |
| 255 | `PAGE.DOCUMENTS_FILES.DOCUMENT_LIBRARY` | Document Library Page |
| 256 | `PAGE.DOCUMENTS_FILES.DOCUMENT_VIEWER` | Document Viewer Page |
| 257 | `PAGE.DOCUMENTS_FILES.DOCUMENT_EDITOR` | Document Editor Page |
| 258 | `PAGE.DOCUMENTS_FILES.SPREADSHEET` | Spreadsheet Page |
| 259 | `PAGE.DOCUMENTS_FILES.PRESENTATION` | Presentation Page |
| 260 | `PAGE.DOCUMENTS_FILES.NOTES` | Notes Page |
| 261 | `PAGE.DOCUMENTS_FILES.NOTE_EDITOR` | Note Editor Page |
| 262 | `PAGE.DOCUMENTS_FILES.NOTEBOOK` | Notebook Page |
| 263 | `PAGE.DOCUMENTS_FILES.WHITEBOARD` | Whiteboard Page |
| 264 | `PAGE.DOCUMENTS_FILES.CANVAS` | Canvas Page |
| 265 | `PAGE.DOCUMENTS_FILES.DIAGRAM` | Diagram Page |
| 266 | `PAGE.DOCUMENTS_FILES.GRAPH` | Graph Page |
| 267 | `PAGE.DOCUMENTS_FILES.MIND_MAP` | Mind Map Page |

### P21 Builders & Automation (17)

| # | ID | Name |
| --- | --- | --- |
| 268 | `PAGE.BUILDERS_AUTOMATION.WORKFLOW_BUILDER` | Workflow Builder Page |
| 269 | `PAGE.BUILDERS_AUTOMATION.WORKFLOW_DETAIL` | Workflow Detail Page |
| 270 | `PAGE.BUILDERS_AUTOMATION.WORKFLOW_RUN` | Workflow Run Page |
| 271 | `PAGE.BUILDERS_AUTOMATION.WORKFLOW_HISTORY` | Workflow History Page |
| 272 | `PAGE.BUILDERS_AUTOMATION.AUTOMATION` | Automation Page |
| 273 | `PAGE.BUILDERS_AUTOMATION.AUTOMATION_BUILDER` | Automation Builder Page |
| 274 | `PAGE.BUILDERS_AUTOMATION.RULE_BUILDER` | Rule Builder Page |
| 275 | `PAGE.BUILDERS_AUTOMATION.FORM_BUILDER` | Form Builder Page |
| 276 | `PAGE.BUILDERS_AUTOMATION.FORM` | Form Page |
| 277 | `PAGE.BUILDERS_AUTOMATION.FORM_SUBMISSION` | Form Submission Page |
| 278 | `PAGE.BUILDERS_AUTOMATION.SURVEY_BUILDER` | Survey Builder Page |
| 279 | `PAGE.BUILDERS_AUTOMATION.SURVEY` | Survey Page |
| 280 | `PAGE.BUILDERS_AUTOMATION.PAGE_BUILDER` | Page Builder Page |
| 281 | `PAGE.BUILDERS_AUTOMATION.APP_BUILDER` | App Builder Page |
| 282 | `PAGE.BUILDERS_AUTOMATION.MOBILE_BUILDER` | Mobile Builder Page |
| 283 | `PAGE.BUILDERS_AUTOMATION.TEMPLATE_GALLERY` | Template Gallery Page |
| 284 | `PAGE.BUILDERS_AUTOMATION.TEMPLATE_DETAIL` | Template Detail Page |

### P22 Design System (6)

| # | ID | Name |
| --- | --- | --- |
| 285 | `PAGE.DESIGN_SYSTEM.COMPONENT_GALLERY` | Component Gallery Page |
| 286 | `PAGE.DESIGN_SYSTEM.COMPONENT_DETAIL` | Component Detail Page |
| 287 | `PAGE.DESIGN_SYSTEM.DESIGN_SYSTEM` | Design System Page |
| 288 | `PAGE.DESIGN_SYSTEM.TOKEN_EXPLORER` | Token Explorer Page |
| 289 | `PAGE.DESIGN_SYSTEM.THEME_BUILDER` | Theme Builder Page |
| 290 | `PAGE.DESIGN_SYSTEM.ICON_LIBRARY` | Icon Library Page |

### P23 Media & Creative (11)

| # | ID | Name |
| --- | --- | --- |
| 291 | `PAGE.MEDIA_CREATIVE.ASSET_LIBRARY` | Asset Library Page |
| 292 | `PAGE.MEDIA_CREATIVE.MEDIA_LIBRARY` | Media Library Page |
| 293 | `PAGE.MEDIA_CREATIVE.IMAGE_DETAIL` | Image Detail Page |
| 294 | `PAGE.MEDIA_CREATIVE.VIDEO_DETAIL` | Video Detail Page |
| 295 | `PAGE.MEDIA_CREATIVE.AUDIO_DETAIL` | Audio Detail Page |
| 296 | `PAGE.MEDIA_CREATIVE.MEDIA_VIEWER` | Media Viewer Page |
| 297 | `PAGE.MEDIA_CREATIVE.LIGHTBOX` | Lightbox Page |
| 298 | `PAGE.MEDIA_CREATIVE.VIDEO_EDITOR` | Video Editor Page |
| 299 | `PAGE.MEDIA_CREATIVE.AUDIO_EDITOR` | Audio Editor Page |
| 300 | `PAGE.MEDIA_CREATIVE.MEDIA_STUDIO` | Media Studio Page |
| 301 | `PAGE.MEDIA_CREATIVE.CREATIVE_STUDIO` | Creative Studio Page |

### P24 Spatial & 3D (12)

| # | ID | Name |
| --- | --- | --- |
| 302 | `PAGE.SPATIAL_3D.THREE_D_STUDIO` | 3D Studio Page |
| 303 | `PAGE.SPATIAL_3D.SPATIAL_STUDIO` | Spatial Studio Page |
| 304 | `PAGE.SPATIAL_3D.CAD` | CAD Page |
| 305 | `PAGE.SPATIAL_3D.THREE_D_PREVIEW` | 3D Preview Page |
| 306 | `PAGE.SPATIAL_3D.FLOOR_PLAN` | Floor Plan Page |
| 307 | `PAGE.SPATIAL_3D.VENUE_LAYOUT` | Venue Layout Page |
| 308 | `PAGE.SPATIAL_3D.MAP` | Map Page |
| 309 | `PAGE.SPATIAL_3D.MAP_EXPLORER` | Map Explorer Page |
| 310 | `PAGE.SPATIAL_3D.ROUTE_PLANNER` | Route Planner Page |
| 311 | `PAGE.SPATIAL_3D.LOCATION_DETAIL` | Location Detail Page |
| 312 | `PAGE.SPATIAL_3D.DIGITAL_TWIN` | Digital Twin Page |
| 313 | `PAGE.SPATIAL_3D.SIMULATION` | Simulation Page |

### P25 AI & Knowledge (17)

| # | ID | Name |
| --- | --- | --- |
| 314 | `PAGE.AI_KNOWLEDGE.AI_HOME` | AI Home Page |
| 315 | `PAGE.AI_KNOWLEDGE.AI_ASSISTANT` | AI Assistant Page |
| 316 | `PAGE.AI_KNOWLEDGE.AI_CHAT` | AI Chat Page |
| 317 | `PAGE.AI_KNOWLEDGE.AGENT_CATALOG` | Agent Catalog Page |
| 318 | `PAGE.AI_KNOWLEDGE.AGENT_DETAIL` | Agent Detail Page |
| 319 | `PAGE.AI_KNOWLEDGE.AGENT_BUILDER` | Agent Builder Page |
| 320 | `PAGE.AI_KNOWLEDGE.AGENT_RUN` | Agent Run Page |
| 321 | `PAGE.AI_KNOWLEDGE.PROMPT_LIBRARY` | Prompt Library Page |
| 322 | `PAGE.AI_KNOWLEDGE.PROMPT_EDITOR` | Prompt Editor Page |
| 323 | `PAGE.AI_KNOWLEDGE.MODEL_CATALOG` | Model Catalog Page |
| 324 | `PAGE.AI_KNOWLEDGE.MODEL_DETAIL` | Model Detail Page |
| 325 | `PAGE.AI_KNOWLEDGE.AI_PLAYGROUND` | AI Playground Page |
| 326 | `PAGE.AI_KNOWLEDGE.AI_EVALUATION` | AI Evaluation Page |
| 327 | `PAGE.AI_KNOWLEDGE.AI_OBSERVABILITY` | AI Observability Page |
| 328 | `PAGE.AI_KNOWLEDGE.KNOWLEDGE` | Knowledge Page |
| 329 | `PAGE.AI_KNOWLEDGE.KNOWLEDGE_SOURCE` | Knowledge Source Page |
| 330 | `PAGE.AI_KNOWLEDGE.RAG_INDEX` | RAG/Index Page |

### P26 Marketplace & Commerce (19)

| # | ID | Name |
| --- | --- | --- |
| 331 | `PAGE.MARKETPLACE_COMMERCE.MARKETPLACE_HOME` | Marketplace Home Page |
| 332 | `PAGE.MARKETPLACE_COMMERCE.MARKETPLACE_SEARCH` | Marketplace Search Page |
| 333 | `PAGE.MARKETPLACE_COMMERCE.CATEGORY` | Category Page |
| 334 | `PAGE.MARKETPLACE_COMMERCE.LISTING` | Listing Page |
| 335 | `PAGE.MARKETPLACE_COMMERCE.VENDOR_DIRECTORY` | Vendor Directory Page |
| 336 | `PAGE.MARKETPLACE_COMMERCE.VENDOR_PROFILE` | Vendor Profile Page |
| 337 | `PAGE.MARKETPLACE_COMMERCE.VENDOR_DASHBOARD` | Vendor Dashboard Page |
| 338 | `PAGE.MARKETPLACE_COMMERCE.SERVICE_CATALOG` | Service Catalog Page |
| 339 | `PAGE.MARKETPLACE_COMMERCE.SERVICE_DETAIL` | Service Detail Page |
| 340 | `PAGE.MARKETPLACE_COMMERCE.SKU_CATALOG` | SKU Catalog Page |
| 341 | `PAGE.MARKETPLACE_COMMERCE.SKU_DETAIL` | SKU Detail Page |
| 342 | `PAGE.MARKETPLACE_COMMERCE.COMPARE_VENDORS` | Compare Vendors Page |
| 343 | `PAGE.MARKETPLACE_COMMERCE.WISHLIST` | Wishlist Page |
| 344 | `PAGE.MARKETPLACE_COMMERCE.FAVORITES` | Favorites Page |
| 345 | `PAGE.MARKETPLACE_COMMERCE.CART` | Cart Page |
| 346 | `PAGE.MARKETPLACE_COMMERCE.CHECKOUT` | Checkout Page |
| 347 | `PAGE.MARKETPLACE_COMMERCE.ORDER_CONFIRMATION` | Order Confirmation Page |
| 348 | `PAGE.MARKETPLACE_COMMERCE.ORDERS` | Orders Page |
| 349 | `PAGE.MARKETPLACE_COMMERCE.ORDER_DETAIL` | Order Detail Page |

### P27 Booking (8)

| # | ID | Name |
| --- | --- | --- |
| 350 | `PAGE.BOOKING.BOOKING_HOME` | Booking Home Page |
| 351 | `PAGE.BOOKING.BOOKING_SEARCH` | Booking Search Page |
| 352 | `PAGE.BOOKING.BOOKING_SELECTION` | Booking Selection Page |
| 353 | `PAGE.BOOKING.BOOKING_REVIEW` | Booking Review Page |
| 354 | `PAGE.BOOKING.BOOKING_PAYMENT` | Booking Payment Page |
| 355 | `PAGE.BOOKING.BOOKING_CONFIRMATION` | Booking Confirmation Page |
| 356 | `PAGE.BOOKING.BOOKINGS` | Bookings Page |
| 357 | `PAGE.BOOKING.BOOKING_DETAIL` | Booking Detail Page |

### P28 Commercial, Finance & Investment (25)

| # | ID | Name |
| --- | --- | --- |
| 358 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.QUOTE` | Quote Page |
| 359 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PROPOSAL` | Proposal Page |
| 360 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PROPOSAL_BUILDER` | Proposal Builder Page |
| 361 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.CONTRACT` | Contract Page |
| 362 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.INVOICE` | Invoice Page |
| 363 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.INVOICES` | Invoices Page |
| 364 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PAYMENTS` | Payments Page |
| 365 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PAYMENT_DETAIL` | Payment Detail Page |
| 366 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PAYOUTS` | Payouts Page |
| 367 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.TRANSACTIONS` | Transactions Page |
| 368 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.FINANCE_DASHBOARD` | Finance Dashboard Page |
| 369 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.BUDGET` | Budget Page |
| 370 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.EXPENSE` | Expense Page |
| 371 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.REVENUE` | Revenue Page |
| 372 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.CASH_FLOW` | Cash Flow Page |
| 373 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.FORECAST` | Forecast Page |
| 374 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.ACCOUNTING` | Accounting Page |
| 375 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.LEDGER` | Ledger Page |
| 376 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.RECONCILIATION` | Reconciliation Page |
| 377 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.TAX` | Tax Page |
| 378 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.INVESTOR_DASHBOARD` | Investor Dashboard Page |
| 379 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.PORTFOLIO` | Portfolio Page |
| 380 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.INVESTMENT_DETAIL` | Investment Detail Page |
| 381 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.FUNDRAISING` | Fundraising Page |
| 382 | `PAGE.COMMERCIAL_FINANCE_INVESTMENT.CAP_TABLE` | Cap Table Page |

### P29 Events (17)

| # | ID | Name |
| --- | --- | --- |
| 383 | `PAGE.EVENTS.EVENT_DISCOVERY` | Event Discovery Page |
| 384 | `PAGE.EVENTS.EVENT_CATEGORY` | Event Category Page |
| 385 | `PAGE.EVENTS.EVENT_DETAIL` | Event Detail Page |
| 386 | `PAGE.EVENTS.EVENT_BUILDER` | Event Builder Page |
| 387 | `PAGE.EVENTS.EVENT_DASHBOARD` | Event Dashboard Page |
| 388 | `PAGE.EVENTS.EVENT_PRODUCTION` | Event Production Page |
| 389 | `PAGE.EVENTS.EVENT_SCHEDULE` | Event Schedule Page |
| 390 | `PAGE.EVENTS.EVENT_GUESTS` | Event Guests Page |
| 391 | `PAGE.EVENTS.GUEST_DETAIL` | Guest Detail Page |
| 392 | `PAGE.EVENTS.EVENT_VENDORS` | Event Vendors Page |
| 393 | `PAGE.EVENTS.EVENT_SERVICES` | Event Services Page |
| 394 | `PAGE.EVENTS.EVENT_VENUE` | Event Venue Page |
| 395 | `PAGE.EVENTS.EVENT_SPATIAL` | Event Spatial Page |
| 396 | `PAGE.EVENTS.EVENT_SPONSORSHIP` | Event Sponsorship Page |
| 397 | `PAGE.EVENTS.SPONSOR_DETAIL` | Sponsor Detail Page |
| 398 | `PAGE.EVENTS.EVENT_ROI` | Event ROI Page |
| 399 | `PAGE.EVENTS.EVENT_SETTLEMENT` | Event Settlement Page |

### P30 Production & Logistics (24)

| # | ID | Name |
| --- | --- | --- |
| 400 | `PAGE.PRODUCTION_LOGISTICS.PRODUCTION_DASHBOARD` | Production Dashboard Page |
| 401 | `PAGE.PRODUCTION_LOGISTICS.PRODUCTION_SCHEDULE` | Production Schedule Page |
| 402 | `PAGE.PRODUCTION_LOGISTICS.CALL_SHEET` | Call Sheet Page |
| 403 | `PAGE.PRODUCTION_LOGISTICS.CASTING` | Casting Page |
| 404 | `PAGE.PRODUCTION_LOGISTICS.CASTING_DETAIL` | Casting Detail Page |
| 405 | `PAGE.PRODUCTION_LOGISTICS.CREW` | Crew Page |
| 406 | `PAGE.PRODUCTION_LOGISTICS.CREW_DETAIL` | Crew Detail Page |
| 407 | `PAGE.PRODUCTION_LOGISTICS.LOCATIONS` | Locations Page |
| 408 | `PAGE.PRODUCTION_LOGISTICS.LOCATION_WORKSPACE` | Location Workspace Page |
| 409 | `PAGE.PRODUCTION_LOGISTICS.SHOT_LIST` | Shot List Page |
| 410 | `PAGE.PRODUCTION_LOGISTICS.SHOT_DETAIL` | Shot Detail Page |
| 411 | `PAGE.PRODUCTION_LOGISTICS.STORYBOARD` | Storyboard Page |
| 412 | `PAGE.PRODUCTION_LOGISTICS.SCENE` | Scene Page |
| 413 | `PAGE.PRODUCTION_LOGISTICS.SCRIPT` | Script Page |
| 414 | `PAGE.PRODUCTION_LOGISTICS.SCRIPT_BREAKDOWN` | Script Breakdown Page |
| 415 | `PAGE.PRODUCTION_LOGISTICS.SCHEDULE_BOARD` | Schedule Board Page |
| 416 | `PAGE.PRODUCTION_LOGISTICS.EQUIPMENT` | Equipment Page |
| 417 | `PAGE.PRODUCTION_LOGISTICS.LOGISTICS` | Logistics Page |
| 418 | `PAGE.PRODUCTION_LOGISTICS.TRAVEL` | Travel Page |
| 419 | `PAGE.PRODUCTION_LOGISTICS.ACCOMMODATION` | Accommodation Page |
| 420 | `PAGE.PRODUCTION_LOGISTICS.TRANSPORT` | Transport Page |
| 421 | `PAGE.PRODUCTION_LOGISTICS.PERMITS` | Permits Page |
| 422 | `PAGE.PRODUCTION_LOGISTICS.INSURANCE` | Insurance Page |
| 423 | `PAGE.PRODUCTION_LOGISTICS.PRODUCTION_FINANCE` | Production Finance Page |

### P31 Education (9)

| # | ID | Name |
| --- | --- | --- |
| 424 | `PAGE.EDUCATION.EDUCATION_HOME` | Education Home Page |
| 425 | `PAGE.EDUCATION.COURSE_CATALOG` | Course Catalog Page |
| 426 | `PAGE.EDUCATION.COURSE_DETAIL` | Course Detail Page |
| 427 | `PAGE.EDUCATION.LESSON` | Lesson Page |
| 428 | `PAGE.EDUCATION.QUIZ` | Quiz Page |
| 429 | `PAGE.EDUCATION.EXAM` | Exam Page |
| 430 | `PAGE.EDUCATION.ASSIGNMENT` | Assignment Page |
| 431 | `PAGE.EDUCATION.PROGRESS` | Progress Page |
| 432 | `PAGE.EDUCATION.CERTIFICATE` | Certificate Page |

### P32 Community (5)

| # | ID | Name |
| --- | --- | --- |
| 433 | `PAGE.COMMUNITY.COMMUNITY` | Community Page |
| 434 | `PAGE.COMMUNITY.FORUM` | Forum Page |
| 435 | `PAGE.COMMUNITY.DISCUSSION_DETAIL` | Discussion Detail Page |
| 436 | `PAGE.COMMUNITY.MEMBERS` | Members Page |
| 437 | `PAGE.COMMUNITY.FEED` | Feed Page |

### P33 System States (12)

| # | ID | Name |
| --- | --- | --- |
| 438 | `PAGE.SYSTEM_STATES.404` | 404 Page |
| 439 | `PAGE.SYSTEM_STATES.401` | 401 Page |
| 440 | `PAGE.SYSTEM_STATES.403` | 403 Page |
| 441 | `PAGE.SYSTEM_STATES.500` | 500 Page |
| 442 | `PAGE.SYSTEM_STATES.502_503` | 502/503 Page |
| 443 | `PAGE.SYSTEM_STATES.OFFLINE` | Offline Page |
| 444 | `PAGE.SYSTEM_STATES.MAINTENANCE` | Maintenance Page |
| 445 | `PAGE.SYSTEM_STATES.RATE_LIMIT` | Rate Limit Page |
| 446 | `PAGE.SYSTEM_STATES.UNSUPPORTED_BROWSER` | Unsupported Browser Page |
| 447 | `PAGE.SYSTEM_STATES.UPGRADE_REQUIRED` | Upgrade Required Page |
| 448 | `PAGE.SYSTEM_STATES.EMPTY_STATE` | Empty State Page |
| 449 | `PAGE.SYSTEM_STATES.LOADING` | Loading Page |

### P34 Transaction States (5)

| # | ID | Name |
| --- | --- | --- |
| 450 | `PAGE.TRANSACTION_STATES.PROCESSING` | Processing Page |
| 451 | `PAGE.TRANSACTION_STATES.SUCCESS` | Success Page |
| 452 | `PAGE.TRANSACTION_STATES.FAILURE` | Failure Page |
| 453 | `PAGE.TRANSACTION_STATES.CONFIRMATION` | Confirmation Page |
| 454 | `PAGE.TRANSACTION_STATES.REDIRECT` | Redirect Page |

### P35 Presentation Modes (8)

| # | ID | Name |
| --- | --- | --- |
| 455 | `PAGE.PRESENTATION_MODES.PRINT` | Print Page |
| 456 | `PAGE.PRESENTATION_MODES.SHARE` | Share Page |
| 457 | `PAGE.PRESENTATION_MODES.EMBED` | Embed Page |
| 458 | `PAGE.PRESENTATION_MODES.PREVIEW` | Preview Page |
| 459 | `PAGE.PRESENTATION_MODES.FULLSCREEN` | Fullscreen Page |
| 460 | `PAGE.PRESENTATION_MODES.KIOSK` | Kiosk Page |
| 461 | `PAGE.PRESENTATION_MODES.TV_DISPLAY` | TV/Display Page |
| 462 | `PAGE.PRESENTATION_MODES.WALLBOARD` | Wallboard Page |

### P36 Experimental & Internal (6)

| # | ID | Name |
| --- | --- | --- |
| 463 | `PAGE.EXPERIMENTAL_INTERNAL.DEMO` | Demo Page |
| 464 | `PAGE.EXPERIMENTAL_INTERNAL.SANDBOX` | Sandbox Page |
| 465 | `PAGE.EXPERIMENTAL_INTERNAL.PLAYGROUND` | Playground Page |
| 466 | `PAGE.EXPERIMENTAL_INTERNAL.PROTOTYPE` | Prototype Page |
| 467 | `PAGE.EXPERIMENTAL_INTERNAL.LABS` | Labs Page |
| 468 | `PAGE.EXPERIMENTAL_INTERNAL.INTERNAL_TOOLS` | Internal Tools Page |

### P37 System Administration (11)

| # | ID | Name |
| --- | --- | --- |
| 469 | `PAGE.SYSTEM_ADMINISTRATION.ADMIN_HOME` | Admin Home Page |
| 470 | `PAGE.SYSTEM_ADMINISTRATION.ADMIN_DASHBOARD` | Admin Dashboard Page |
| 471 | `PAGE.SYSTEM_ADMINISTRATION.SYSTEM_SETTINGS` | System Settings Page |
| 472 | `PAGE.SYSTEM_ADMINISTRATION.FEATURE_MANAGEMENT` | Feature Management Page |
| 473 | `PAGE.SYSTEM_ADMINISTRATION.USER_ADMINISTRATION` | User Administration Page |
| 474 | `PAGE.SYSTEM_ADMINISTRATION.ORGANISATION_ADMINISTRATION` | Organisation Administration Page |
| 475 | `PAGE.SYSTEM_ADMINISTRATION.WORKSPACE_ADMINISTRATION` | Workspace Administration Page |
| 476 | `PAGE.SYSTEM_ADMINISTRATION.PERMISSION_ADMINISTRATION` | Permission Administration Page |
| 477 | `PAGE.SYSTEM_ADMINISTRATION.INTEGRATION_ADMINISTRATION` | Integration Administration Page |
| 478 | `PAGE.SYSTEM_ADMINISTRATION.BILLING_ADMINISTRATION` | Billing Administration Page |
| 479 | `PAGE.SYSTEM_ADMINISTRATION.CONTENT_ADMINISTRATION` | Content Administration Page |

### P38 CMS & Publishing (7)

| # | ID | Name |
| --- | --- | --- |
| 480 | `PAGE.CMS_PUBLISHING.CMS` | CMS Page |
| 481 | `PAGE.CMS_PUBLISHING.CMS_COLLECTION` | CMS Collection Page |
| 482 | `PAGE.CMS_PUBLISHING.CMS_ENTRY` | CMS Entry Page |
| 483 | `PAGE.CMS_PUBLISHING.SEO` | SEO Page |
| 484 | `PAGE.CMS_PUBLISHING.REDIRECT_MANAGEMENT` | Redirect Management Page |
| 485 | `PAGE.CMS_PUBLISHING.LOCALIZATION` | Localization Page |
| 486 | `PAGE.CMS_PUBLISHING.NOTIFICATION_ADMINISTRATION` | Notification Administration Page |

### P39 Operations Administration (3)

| # | ID | Name |
| --- | --- | --- |
| 487 | `PAGE.OPERATIONS_ADMINISTRATION.JOBS_QUEUE` | Jobs/Queue Page |
| 488 | `PAGE.OPERATIONS_ADMINISTRATION.JOB_DETAIL` | Job Detail Page |
| 489 | `PAGE.OPERATIONS_ADMINISTRATION.RUNTIME_ADMINISTRATION` | Runtime Administration Page |

### P40 Control Plane (9)

| # | ID | Name |
| --- | --- | --- |
| 490 | `PAGE.CONTROL_PLANE.CONTROL_PLANE` | Control Plane Page |
| 491 | `PAGE.CONTROL_PLANE.APPLICATION_REGISTRY` | Application Registry Page |
| 492 | `PAGE.CONTROL_PLANE.APPLICATION_DETAIL` | Application Detail Page |
| 493 | `PAGE.CONTROL_PLANE.ENVIRONMENT_REGISTRY` | Environment Registry Page |
| 494 | `PAGE.CONTROL_PLANE.DATABASE_TARGETS` | Database Targets Page |
| 495 | `PAGE.CONTROL_PLANE.INFRASTRUCTURE_INVENTORY` | Infrastructure Inventory Page |
| 496 | `PAGE.CONTROL_PLANE.DEPLOYMENT_APPROVAL` | Deployment Approval Page |
| 497 | `PAGE.CONTROL_PLANE.MIGRATION_APPROVAL` | Migration Approval Page |
| 498 | `PAGE.CONTROL_PLANE.RELEASE_READINESS` | Release Readiness Page |

### P41 Evidence & Approval (2)

| # | ID | Name |
| --- | --- | --- |
| 499 | `PAGE.EVIDENCE_APPROVAL.EVIDENCE_GATE` | Evidence Gate Page |
| 500 | `PAGE.EVIDENCE_APPROVAL.AUDIT_EVIDENCE_REPORT` | Audit/Evidence Report Page |


## Workspaces (647)

### W01 Personal & Home Workspaces (15)

| # | ID | Name |
| --- | --- | --- |
| 1 | `WORKSPACE.PERSONAL_HOME.PERSONAL` | Personal Workspace |
| 2 | `WORKSPACE.PERSONAL_HOME.MY_WORK` | My Work Workspace |
| 3 | `WORKSPACE.PERSONAL_HOME.HOME` | Home Workspace |
| 4 | `WORKSPACE.PERSONAL_HOME.TODAY` | Today Workspace |
| 5 | `WORKSPACE.PERSONAL_HOME.MY_TASKS` | My Tasks Workspace |
| 6 | `WORKSPACE.PERSONAL_HOME.MY_CALENDAR` | My Calendar Workspace |
| 7 | `WORKSPACE.PERSONAL_HOME.MY_NOTES` | My Notes Workspace |
| 8 | `WORKSPACE.PERSONAL_HOME.MY_FILES` | My Files Workspace |
| 9 | `WORKSPACE.PERSONAL_HOME.MY_ACTIVITY` | My Activity Workspace |
| 10 | `WORKSPACE.PERSONAL_HOME.MY_NOTIFICATIONS` | My Notifications Workspace |
| 11 | `WORKSPACE.PERSONAL_HOME.MY_APPROVALS` | My Approvals Workspace |
| 12 | `WORKSPACE.PERSONAL_HOME.MY_DRAFTS` | My Drafts Workspace |
| 13 | `WORKSPACE.PERSONAL_HOME.FAVORITES` | Favorites Workspace |
| 14 | `WORKSPACE.PERSONAL_HOME.RECENT` | Recent Workspace |
| 15 | `WORKSPACE.PERSONAL_HOME.SAVED` | Saved Workspace |

### W02 Organisation Workspaces (11)

| # | ID | Name |
| --- | --- | --- |
| 16 | `WORKSPACE.ORGANISATION.ORGANISATION` | Organisation Workspace |
| 17 | `WORKSPACE.ORGANISATION.ORGANISATION_COMMAND_CENTER` | Organisation Command Center |
| 18 | `WORKSPACE.ORGANISATION.ORGANISATION_OPERATIONS` | Organisation Operations Workspace |
| 19 | `WORKSPACE.ORGANISATION.ORGANISATION_PEOPLE` | Organisation People Workspace |
| 20 | `WORKSPACE.ORGANISATION.ORGANISATION_FINANCE` | Organisation Finance Workspace |
| 21 | `WORKSPACE.ORGANISATION.ORGANISATION_PROJECTS` | Organisation Projects Workspace |
| 22 | `WORKSPACE.ORGANISATION.ORGANISATION_DOCUMENTS` | Organisation Documents Workspace |
| 23 | `WORKSPACE.ORGANISATION.ORGANISATION_ANALYTICS` | Organisation Analytics Workspace |
| 24 | `WORKSPACE.ORGANISATION.ORGANISATION_SETTINGS` | Organisation Settings Workspace |
| 25 | `WORKSPACE.ORGANISATION.ORGANISATION_GOVERNANCE` | Organisation Governance Workspace |
| 26 | `WORKSPACE.ORGANISATION.MULTI_ORGANISATION` | Multi-Organisation Workspace |

### W03 Team Workspaces (10)

| # | ID | Name |
| --- | --- | --- |
| 27 | `WORKSPACE.TEAM.TEAM` | Team Workspace |
| 28 | `WORKSPACE.TEAM.DEPARTMENT` | Department Workspace |
| 29 | `WORKSPACE.TEAM.FUNCTIONAL_TEAM` | Functional Team Workspace |
| 30 | `WORKSPACE.TEAM.CROSS_FUNCTIONAL` | Cross-Functional Workspace |
| 31 | `WORKSPACE.TEAM.SQUAD` | Squad Workspace |
| 32 | `WORKSPACE.TEAM.POD` | Pod Workspace |
| 33 | `WORKSPACE.TEAM.COMMITTEE` | Committee Workspace |
| 34 | `WORKSPACE.TEAM.WORKING_GROUP` | Working Group Workspace |
| 35 | `WORKSPACE.TEAM.LEADERSHIP` | Leadership Workspace |
| 36 | `WORKSPACE.TEAM.EXECUTIVE` | Executive Workspace |

### W04 Project & Program Workspaces (11)

| # | ID | Name |
| --- | --- | --- |
| 37 | `WORKSPACE.PROJECT_PROGRAM.PROJECT` | Project Workspace |
| 38 | `WORKSPACE.PROJECT_PROGRAM.PROGRAM` | Program Workspace |
| 39 | `WORKSPACE.PROJECT_PROGRAM.PORTFOLIO` | Portfolio Workspace |
| 40 | `WORKSPACE.PROJECT_PROGRAM.INITIATIVE` | Initiative Workspace |
| 41 | `WORKSPACE.PROJECT_PROGRAM.WORKSTREAM` | Workstream Workspace |
| 42 | `WORKSPACE.PROJECT_PROGRAM.MILESTONE` | Milestone Workspace |
| 43 | `WORKSPACE.PROJECT_PROGRAM.PROJECT_PLANNING` | Project Planning Workspace |
| 44 | `WORKSPACE.PROJECT_PROGRAM.PROJECT_EXECUTION` | Project Execution Workspace |
| 45 | `WORKSPACE.PROJECT_PROGRAM.PROJECT_REVIEW` | Project Review Workspace |
| 46 | `WORKSPACE.PROJECT_PROGRAM.PROJECT_CLOSURE` | Project Closure Workspace |
| 47 | `WORKSPACE.PROJECT_PROGRAM.PROJECT_EVIDENCE` | Project Evidence Workspace |

### W05 Task & Productivity Workspaces (13)

| # | ID | Name |
| --- | --- | --- |
| 48 | `WORKSPACE.TASK_PRODUCTIVITY.TASK` | Task Workspace |
| 49 | `WORKSPACE.TASK_PRODUCTIVITY.KANBAN` | Kanban Workspace |
| 50 | `WORKSPACE.TASK_PRODUCTIVITY.SCRUM` | Scrum Workspace |
| 51 | `WORKSPACE.TASK_PRODUCTIVITY.SPRINT` | Sprint Workspace |
| 52 | `WORKSPACE.TASK_PRODUCTIVITY.BACKLOG` | Backlog Workspace |
| 53 | `WORKSPACE.TASK_PRODUCTIVITY.ROADMAP` | Roadmap Workspace |
| 54 | `WORKSPACE.TASK_PRODUCTIVITY.GANTT` | Gantt Workspace |
| 55 | `WORKSPACE.TASK_PRODUCTIVITY.TIMELINE` | Timeline Workspace |
| 56 | `WORKSPACE.TASK_PRODUCTIVITY.CALENDAR` | Calendar Workspace |
| 57 | `WORKSPACE.TASK_PRODUCTIVITY.SCHEDULER` | Scheduler Workspace |
| 58 | `WORKSPACE.TASK_PRODUCTIVITY.AGENDA` | Agenda Workspace |
| 59 | `WORKSPACE.TASK_PRODUCTIVITY.CHECKLIST` | Checklist Workspace |
| 60 | `WORKSPACE.TASK_PRODUCTIVITY.APPROVAL_QUEUE` | Approval Queue Workspace |

### W06 Communication Workspaces (11)

| # | ID | Name |
| --- | --- | --- |
| 61 | `WORKSPACE.COMMUNICATION.INBOX` | Inbox Workspace |
| 62 | `WORKSPACE.COMMUNICATION.MAIL` | Mail Workspace |
| 63 | `WORKSPACE.COMMUNICATION.MESSENGER` | Messenger Workspace |
| 64 | `WORKSPACE.COMMUNICATION.CHAT` | Chat Workspace |
| 65 | `WORKSPACE.COMMUNICATION.COMMUNICATION_HUB` | Communication Hub |
| 66 | `WORKSPACE.COMMUNICATION.THREAD` | Thread Workspace |
| 67 | `WORKSPACE.COMMUNICATION.ANNOUNCEMENT` | Announcement Workspace |
| 68 | `WORKSPACE.COMMUNICATION.NOTIFICATION_CENTER` | Notification Center Workspace |
| 69 | `WORKSPACE.COMMUNICATION.CONTACT` | Contact Workspace |
| 70 | `WORKSPACE.COMMUNICATION.COMMUNICATION_CAMPAIGN` | Communication Campaign Workspace |
| 71 | `WORKSPACE.COMMUNICATION.SUPPORT_CONVERSATION` | Support Conversation Workspace |

### W07 Documents & Knowledge Workspaces (13)

| # | ID | Name |
| --- | --- | --- |
| 72 | `WORKSPACE.DOCUMENT_KNOWLEDGE.DOCUMENT` | Document Workspace |
| 73 | `WORKSPACE.DOCUMENT_KNOWLEDGE.DOCUMENT_EDITOR` | Document Editor Workspace |
| 74 | `WORKSPACE.DOCUMENT_KNOWLEDGE.SPREADSHEET` | Spreadsheet Workspace |
| 75 | `WORKSPACE.DOCUMENT_KNOWLEDGE.PRESENTATION` | Presentation Workspace |
| 76 | `WORKSPACE.DOCUMENT_KNOWLEDGE.NOTES` | Notes Workspace |
| 77 | `WORKSPACE.DOCUMENT_KNOWLEDGE.NOTEBOOK` | Notebook Workspace |
| 78 | `WORKSPACE.DOCUMENT_KNOWLEDGE.KNOWLEDGE` | Knowledge Workspace |
| 79 | `WORKSPACE.DOCUMENT_KNOWLEDGE.KNOWLEDGE_BASE` | Knowledge Base Workspace |
| 80 | `WORKSPACE.DOCUMENT_KNOWLEDGE.WIKI` | Wiki Workspace |
| 81 | `WORKSPACE.DOCUMENT_KNOWLEDGE.DOCUMENTATION` | Documentation Workspace |
| 82 | `WORKSPACE.DOCUMENT_KNOWLEDGE.RESEARCH` | Research Workspace |
| 83 | `WORKSPACE.DOCUMENT_KNOWLEDGE.REFERENCE_LIBRARY` | Reference Library Workspace |
| 84 | `WORKSPACE.DOCUMENT_KNOWLEDGE.EVIDENCE_LIBRARY` | Evidence Library Workspace |

### W08 File & Asset Workspaces (10)

| # | ID | Name |
| --- | --- | --- |
| 85 | `WORKSPACE.FILE_ASSET.FILE_MANAGER` | File Manager Workspace |
| 86 | `WORKSPACE.FILE_ASSET.DOCUMENT_LIBRARY` | Document Library Workspace |
| 87 | `WORKSPACE.FILE_ASSET.ASSET_LIBRARY` | Asset Library Workspace |
| 88 | `WORKSPACE.FILE_ASSET.MEDIA_LIBRARY` | Media Library Workspace |
| 89 | `WORKSPACE.FILE_ASSET.IMAGE_LIBRARY` | Image Library Workspace |
| 90 | `WORKSPACE.FILE_ASSET.VIDEO_LIBRARY` | Video Library Workspace |
| 91 | `WORKSPACE.FILE_ASSET.AUDIO_LIBRARY` | Audio Library Workspace |
| 92 | `WORKSPACE.FILE_ASSET.BRAND_ASSET` | Brand Asset Workspace |
| 93 | `WORKSPACE.FILE_ASSET.TEMPLATE_LIBRARY` | Template Library Workspace |
| 94 | `WORKSPACE.FILE_ASSET.ARCHIVE` | Archive Workspace |

### W09 Data Workspaces (14)

| # | ID | Name |
| --- | --- | --- |
| 95 | `WORKSPACE.DATA.DATA` | Data Workspace |
| 96 | `WORKSPACE.DATA.DATA_EXPLORER` | Data Explorer Workspace |
| 97 | `WORKSPACE.DATA.DATA_BROWSER` | Data Browser Workspace |
| 98 | `WORKSPACE.DATA.DATA_TABLE` | Data Table Workspace |
| 99 | `WORKSPACE.DATA.DATA_STUDIO` | Data Studio Workspace |
| 100 | `WORKSPACE.DATA.DATASET` | Dataset Workspace |
| 101 | `WORKSPACE.DATA.SCHEMA` | Schema Workspace |
| 102 | `WORKSPACE.DATA.SCHEMA_EXPLORER` | Schema Explorer Workspace |
| 103 | `WORKSPACE.DATA.DOMAIN_REGISTRY` | Domain Registry Workspace |
| 104 | `WORKSPACE.DATA.CONTRACT_REGISTRY` | Contract Registry Workspace |
| 105 | `WORKSPACE.DATA.DATA_QUALITY` | Data Quality Workspace |
| 106 | `WORKSPACE.DATA.DATA_MAPPING` | Data Mapping Workspace |
| 107 | `WORKSPACE.DATA.DATA_IMPORT` | Data Import Workspace |
| 108 | `WORKSPACE.DATA.DATA_EXPORT` | Data Export Workspace |

### W10 API Workspaces (12)

| # | ID | Name |
| --- | --- | --- |
| 109 | `WORKSPACE.API.API_STUDIO` | API Studio Workspace |
| 110 | `WORKSPACE.API.API_DESIGN` | API Design Workspace |
| 111 | `WORKSPACE.API.API_CONTRACT` | API Contract Workspace |
| 112 | `WORKSPACE.API.API_EXPLORER` | API Explorer Workspace |
| 113 | `WORKSPACE.API.API_TESTING` | API Testing Workspace |
| 114 | `WORKSPACE.API.API_REQUEST` | API Request Workspace |
| 115 | `WORKSPACE.API.API_MOCK` | API Mock Workspace |
| 116 | `WORKSPACE.API.API_CONFORMANCE` | API Conformance Workspace |
| 117 | `WORKSPACE.API.API_ENVIRONMENT` | API Environment Workspace |
| 118 | `WORKSPACE.API.API_KEY` | API Key Workspace |
| 119 | `WORKSPACE.API.WEBHOOK` | Webhook Workspace |
| 120 | `WORKSPACE.API.INTEGRATION_API` | Integration API Workspace |

### W11 Developer Workspaces (13)

| # | ID | Name |
| --- | --- | --- |
| 121 | `WORKSPACE.DEVELOPER.DEVELOPER` | Developer Workspace |
| 122 | `WORKSPACE.DEVELOPER.CODE` | Code Workspace |
| 123 | `WORKSPACE.DEVELOPER.CODE_STUDIO` | Code Studio Workspace |
| 124 | `WORKSPACE.DEVELOPER.REPOSITORY` | Repository Workspace |
| 125 | `WORKSPACE.DEVELOPER.SOURCE_BROWSER` | Source Browser Workspace |
| 126 | `WORKSPACE.DEVELOPER.BRANCH` | Branch Workspace |
| 127 | `WORKSPACE.DEVELOPER.PULL_REQUEST` | Pull Request Workspace |
| 128 | `WORKSPACE.DEVELOPER.ISSUE` | Issue Workspace |
| 129 | `WORKSPACE.DEVELOPER.BUILD` | Build Workspace |
| 130 | `WORKSPACE.DEVELOPER.CI` | CI Workspace |
| 131 | `WORKSPACE.DEVELOPER.PIPELINE` | Pipeline Workspace |
| 132 | `WORKSPACE.DEVELOPER.RELEASE_ENGINEERING` | Release Engineering Workspace |
| 133 | `WORKSPACE.DEVELOPER.SDK` | SDK Workspace |

### W12 Application Builder Workspaces (11)

| # | ID | Name |
| --- | --- | --- |
| 134 | `WORKSPACE.APPLICATION_BUILDER.APP_BUILDER` | App Builder Workspace |
| 135 | `WORKSPACE.APPLICATION_BUILDER.WEB_APP_BUILDER` | Web App Builder Workspace |
| 136 | `WORKSPACE.APPLICATION_BUILDER.MOBILE_APP_BUILDER` | Mobile App Builder Workspace |
| 137 | `WORKSPACE.APPLICATION_BUILDER.DESKTOP_APP_BUILDER` | Desktop App Builder Workspace |
| 138 | `WORKSPACE.APPLICATION_BUILDER.PAGE_BUILDER` | Page Builder Workspace |
| 139 | `WORKSPACE.APPLICATION_BUILDER.FORM_BUILDER` | Form Builder Workspace |
| 140 | `WORKSPACE.APPLICATION_BUILDER.WORKFLOW_BUILDER` | Workflow Builder Workspace |
| 141 | `WORKSPACE.APPLICATION_BUILDER.AUTOMATION_BUILDER` | Automation Builder Workspace |
| 142 | `WORKSPACE.APPLICATION_BUILDER.RULE_BUILDER` | Rule Builder Workspace |
| 143 | `WORKSPACE.APPLICATION_BUILDER.TEMPLATE_BUILDER` | Template Builder Workspace |
| 144 | `WORKSPACE.APPLICATION_BUILDER.COMPONENT_BUILDER` | Component Builder Workspace |

### W13 UI & Design-System Workspaces (13)

| # | ID | Name |
| --- | --- | --- |
| 145 | `WORKSPACE.UI_DESIGN_SYSTEM.UI_STUDIO` | UI Studio Workspace |
| 146 | `WORKSPACE.UI_DESIGN_SYSTEM.DESIGN_SYSTEM` | Design System Workspace |
| 147 | `WORKSPACE.UI_DESIGN_SYSTEM.COMPONENT_STUDIO` | Component Studio Workspace |
| 148 | `WORKSPACE.UI_DESIGN_SYSTEM.COMPONENT_GALLERY` | Component Gallery Workspace |
| 149 | `WORKSPACE.UI_DESIGN_SYSTEM.ATOMIC_COMPONENT` | Atomic Component Workspace |
| 150 | `WORKSPACE.UI_DESIGN_SYSTEM.LAYOUT_STUDIO` | Layout Studio Workspace |
| 151 | `WORKSPACE.UI_DESIGN_SYSTEM.PAGE_STUDIO` | Page Studio Workspace |
| 152 | `WORKSPACE.UI_DESIGN_SYSTEM.THEME_STUDIO` | Theme Studio Workspace |
| 153 | `WORKSPACE.UI_DESIGN_SYSTEM.TOKEN_STUDIO` | Token Studio Workspace |
| 154 | `WORKSPACE.UI_DESIGN_SYSTEM.TYPOGRAPHY` | Typography Workspace |
| 155 | `WORKSPACE.UI_DESIGN_SYSTEM.ICON_STUDIO` | Icon Studio Workspace |
| 156 | `WORKSPACE.UI_DESIGN_SYSTEM.MOTION` | Motion Workspace |
| 157 | `WORKSPACE.UI_DESIGN_SYSTEM.ACCESSIBILITY` | Accessibility Workspace |

### W14 Creative Workspaces (12)

| # | ID | Name |
| --- | --- | --- |
| 158 | `WORKSPACE.CREATIVE.CREATIVE_STUDIO` | Creative Studio Workspace |
| 159 | `WORKSPACE.CREATIVE.DESIGN` | Design Workspace |
| 160 | `WORKSPACE.CREATIVE.GRAPHIC_DESIGN` | Graphic Design Workspace |
| 161 | `WORKSPACE.CREATIVE.BRAND_STUDIO` | Brand Studio Workspace |
| 162 | `WORKSPACE.CREATIVE.CAMPAIGN_CREATIVE` | Campaign Creative Workspace |
| 163 | `WORKSPACE.CREATIVE.CONTENT_STUDIO` | Content Studio Workspace |
| 164 | `WORKSPACE.CREATIVE.COPY` | Copy Workspace |
| 165 | `WORKSPACE.CREATIVE.STORY` | Story Workspace |
| 166 | `WORKSPACE.CREATIVE.STORYBOARD` | Storyboard Workspace |
| 167 | `WORKSPACE.CREATIVE.MOODBOARD` | Moodboard Workspace |
| 168 | `WORKSPACE.CREATIVE.WHITEBOARD` | Whiteboard Workspace |
| 169 | `WORKSPACE.CREATIVE.IDEATION` | Ideation Workspace |

### W15 Media Production Workspaces (11)

| # | ID | Name |
| --- | --- | --- |
| 170 | `WORKSPACE.MEDIA_PRODUCTION.MEDIA_STUDIO` | Media Studio Workspace |
| 171 | `WORKSPACE.MEDIA_PRODUCTION.IMAGE_EDITING` | Image Editing Workspace |
| 172 | `WORKSPACE.MEDIA_PRODUCTION.VIDEO_EDITING` | Video Editing Workspace |
| 173 | `WORKSPACE.MEDIA_PRODUCTION.AUDIO_EDITING` | Audio Editing Workspace |
| 174 | `WORKSPACE.MEDIA_PRODUCTION.PHOTO` | Photo Workspace |
| 175 | `WORKSPACE.MEDIA_PRODUCTION.VIDEO` | Video Workspace |
| 176 | `WORKSPACE.MEDIA_PRODUCTION.AUDIO` | Audio Workspace |
| 177 | `WORKSPACE.MEDIA_PRODUCTION.MOTION_GRAPHICS` | Motion Graphics Workspace |
| 178 | `WORKSPACE.MEDIA_PRODUCTION.POST_PRODUCTION` | Post-Production Workspace |
| 179 | `WORKSPACE.MEDIA_PRODUCTION.REVIEW_AND_APPROVAL` | Review & Approval Workspace |
| 180 | `WORKSPACE.MEDIA_PRODUCTION.MEDIA_DELIVERY` | Media Delivery Workspace |

### W16 Spatial & 3D Workspaces (15)

| # | ID | Name |
| --- | --- | --- |
| 181 | `WORKSPACE.SPATIAL_3D.SPATIAL` | Spatial Workspace |
| 182 | `WORKSPACE.SPATIAL_3D.SPATIAL_STUDIO` | Spatial Studio Workspace |
| 183 | `WORKSPACE.SPATIAL_3D.CAD` | CAD Workspace |
| 184 | `WORKSPACE.SPATIAL_3D.TWO_D_PLAN` | 2D Plan Workspace |
| 185 | `WORKSPACE.SPATIAL_3D.THREE_D` | 3D Workspace |
| 186 | `WORKSPACE.SPATIAL_3D.THREE_D_PREVIEW` | 3D Preview Workspace |
| 187 | `WORKSPACE.SPATIAL_3D.FLOOR_PLAN` | Floor Plan Workspace |
| 188 | `WORKSPACE.SPATIAL_3D.VENUE_PLAN` | Venue Plan Workspace |
| 189 | `WORKSPACE.SPATIAL_3D.SCENE` | Scene Workspace |
| 190 | `WORKSPACE.SPATIAL_3D.DIGITAL_TWIN` | Digital Twin Workspace |
| 191 | `WORKSPACE.SPATIAL_3D.SIMULATION` | Simulation Workspace |
| 192 | `WORKSPACE.SPATIAL_3D.MAPPING` | Mapping Workspace |
| 193 | `WORKSPACE.SPATIAL_3D.GIS` | GIS Workspace |
| 194 | `WORKSPACE.SPATIAL_3D.ROUTE_PLANNING` | Route Planning Workspace |
| 195 | `WORKSPACE.SPATIAL_3D.LOCATION` | Location Workspace |

### W17 AI Workspaces (15)

| # | ID | Name |
| --- | --- | --- |
| 196 | `WORKSPACE.AI.AI` | AI Workspace |
| 197 | `WORKSPACE.AI.AI_ASSISTANT` | AI Assistant Workspace |
| 198 | `WORKSPACE.AI.AGENT` | Agent Workspace |
| 199 | `WORKSPACE.AI.AGENT_BUILDER` | Agent Builder Workspace |
| 200 | `WORKSPACE.AI.MULTI_AGENT` | Multi-Agent Workspace |
| 201 | `WORKSPACE.AI.PROMPT` | Prompt Workspace |
| 202 | `WORKSPACE.AI.PROMPT_STUDIO` | Prompt Studio Workspace |
| 203 | `WORKSPACE.AI.MODEL` | Model Workspace |
| 204 | `WORKSPACE.AI.MODEL_PLAYGROUND` | Model Playground Workspace |
| 205 | `WORKSPACE.AI.AI_EVALUATION` | AI Evaluation Workspace |
| 206 | `WORKSPACE.AI.AI_OBSERVABILITY` | AI Observability Workspace |
| 207 | `WORKSPACE.AI.AI_KNOWLEDGE` | AI Knowledge Workspace |
| 208 | `WORKSPACE.AI.RAG` | RAG Workspace |
| 209 | `WORKSPACE.AI.EMBEDDING` | Embedding Workspace |
| 210 | `WORKSPACE.AI.AI_WORKFLOW` | AI Workflow Workspace |

### W18 Analytics Workspaces (13)

| # | ID | Name |
| --- | --- | --- |
| 211 | `WORKSPACE.ANALYTICS.ANALYTICS` | Analytics Workspace |
| 212 | `WORKSPACE.ANALYTICS.BI` | BI Workspace |
| 213 | `WORKSPACE.ANALYTICS.DASHBOARD` | Dashboard Workspace |
| 214 | `WORKSPACE.ANALYTICS.EXECUTIVE_ANALYTICS` | Executive Analytics Workspace |
| 215 | `WORKSPACE.ANALYTICS.OPERATIONAL_ANALYTICS` | Operational Analytics Workspace |
| 216 | `WORKSPACE.ANALYTICS.PRODUCT_ANALYTICS` | Product Analytics Workspace |
| 217 | `WORKSPACE.ANALYTICS.USER_ANALYTICS` | User Analytics Workspace |
| 218 | `WORKSPACE.ANALYTICS.MARKETING_ANALYTICS` | Marketing Analytics Workspace |
| 219 | `WORKSPACE.ANALYTICS.REVENUE_ANALYTICS` | Revenue Analytics Workspace |
| 220 | `WORKSPACE.ANALYTICS.FINANCE_ANALYTICS` | Finance Analytics Workspace |
| 221 | `WORKSPACE.ANALYTICS.FUNNEL` | Funnel Workspace |
| 222 | `WORKSPACE.ANALYTICS.COHORT` | Cohort Workspace |
| 223 | `WORKSPACE.ANALYTICS.REPORT_BUILDER` | Report Builder Workspace |

### W19 Command & Operations Workspaces (10)

| # | ID | Name |
| --- | --- | --- |
| 224 | `WORKSPACE.COMMAND_OPERATIONS.COMMAND_CENTER` | Command Center Workspace |
| 225 | `WORKSPACE.COMMAND_OPERATIONS.OPERATIONS_CENTER` | Operations Center Workspace |
| 226 | `WORKSPACE.COMMAND_OPERATIONS.CONTROL_ROOM` | Control Room Workspace |
| 227 | `WORKSPACE.COMMAND_OPERATIONS.MISSION_CONTROL` | Mission Control Workspace |
| 228 | `WORKSPACE.COMMAND_OPERATIONS.COCKPIT` | Cockpit Workspace |
| 229 | `WORKSPACE.COMMAND_OPERATIONS.OPERATIONS_WALLBOARD` | Operations Wallboard Workspace |
| 230 | `WORKSPACE.COMMAND_OPERATIONS.MONITORING` | Monitoring Workspace |
| 231 | `WORKSPACE.COMMAND_OPERATIONS.SITUATION_ROOM` | Situation Room Workspace |
| 232 | `WORKSPACE.COMMAND_OPERATIONS.INCIDENT_COMMAND` | Incident Command Workspace |
| 233 | `WORKSPACE.COMMAND_OPERATIONS.REAL_TIME_OPERATIONS` | Real-Time Operations Workspace |

### W20 Infrastructure Workspaces (12)

| # | ID | Name |
| --- | --- | --- |
| 234 | `WORKSPACE.INFRASTRUCTURE.INFRASTRUCTURE` | Infrastructure Workspace |
| 235 | `WORKSPACE.INFRASTRUCTURE.INFRASTRUCTURE_STUDIO` | Infrastructure Studio Workspace |
| 236 | `WORKSPACE.INFRASTRUCTURE.CLOUD` | Cloud Workspace |
| 237 | `WORKSPACE.INFRASTRUCTURE.SERVER` | Server Workspace |
| 238 | `WORKSPACE.INFRASTRUCTURE.SERVICE` | Service Workspace |
| 239 | `WORKSPACE.INFRASTRUCTURE.RUNTIME` | Runtime Workspace |
| 240 | `WORKSPACE.INFRASTRUCTURE.NETWORK` | Network Workspace |
| 241 | `WORKSPACE.INFRASTRUCTURE.STORAGE` | Storage Workspace |
| 242 | `WORKSPACE.INFRASTRUCTURE.QUEUE` | Queue Workspace |
| 243 | `WORKSPACE.INFRASTRUCTURE.COMPUTE` | Compute Workspace |
| 244 | `WORKSPACE.INFRASTRUCTURE.RESOURCE_INVENTORY` | Resource Inventory Workspace |
| 245 | `WORKSPACE.INFRASTRUCTURE.INFRASTRUCTURE_TOPOLOGY` | Infrastructure Topology Workspace |

### W21 Control Plane Workspaces (10)

| # | ID | Name |
| --- | --- | --- |
| 246 | `WORKSPACE.CONTROL_PLANE.MAATAA_CONTROL_PLANE` | MAATAA Control Plane Workspace |
| 247 | `WORKSPACE.CONTROL_PLANE.APPLICATION_REGISTRY` | Application Registry Workspace |
| 248 | `WORKSPACE.CONTROL_PLANE.ENVIRONMENT_REGISTRY` | Environment Registry Workspace |
| 249 | `WORKSPACE.CONTROL_PLANE.RUNTIME_REGISTRY` | Runtime Registry Workspace |
| 250 | `WORKSPACE.CONTROL_PLANE.DATABASE_TARGET` | Database Target Workspace |
| 251 | `WORKSPACE.CONTROL_PLANE.INFRASTRUCTURE_REGISTRY` | Infrastructure Registry Workspace |
| 252 | `WORKSPACE.CONTROL_PLANE.DESIRED_STATE` | Desired State Workspace |
| 253 | `WORKSPACE.CONTROL_PLANE.OBSERVED_STATE` | Observed State Workspace |
| 254 | `WORKSPACE.CONTROL_PLANE.RECONCILIATION` | Reconciliation Workspace |
| 255 | `WORKSPACE.CONTROL_PLANE.DEPLOYMENT_CONTROL` | Deployment Control Workspace |

### W22 Environment & Release Workspaces (11)

| # | ID | Name |
| --- | --- | --- |
| 256 | `WORKSPACE.ENVIRONMENT_RELEASE.DEVELOPMENT_ENVIRONMENT` | Development Environment Workspace |
| 257 | `WORKSPACE.ENVIRONMENT_RELEASE.PREVIEW_ENVIRONMENT` | Preview Environment Workspace |
| 258 | `WORKSPACE.ENVIRONMENT_RELEASE.TEST_ENVIRONMENT` | Test Environment Workspace |
| 259 | `WORKSPACE.ENVIRONMENT_RELEASE.QA` | QA Workspace |
| 260 | `WORKSPACE.ENVIRONMENT_RELEASE.STAGING` | Staging Workspace |
| 261 | `WORKSPACE.ENVIRONMENT_RELEASE.PILOT` | Pilot Workspace |
| 262 | `WORKSPACE.ENVIRONMENT_RELEASE.PRODUCTION` | Production Workspace |
| 263 | `WORKSPACE.ENVIRONMENT_RELEASE.RELEASE` | Release Workspace |
| 264 | `WORKSPACE.ENVIRONMENT_RELEASE.RELEASE_READINESS` | Release Readiness Workspace |
| 265 | `WORKSPACE.ENVIRONMENT_RELEASE.DEPLOYMENT` | Deployment Workspace |
| 266 | `WORKSPACE.ENVIRONMENT_RELEASE.ROLLBACK` | Rollback Workspace |

### W23 Database Workspaces (12)

| # | ID | Name |
| --- | --- | --- |
| 267 | `WORKSPACE.DATABASE.DATABASE` | Database Workspace |
| 268 | `WORKSPACE.DATABASE.DATABASE_STUDIO` | Database Studio Workspace |
| 269 | `WORKSPACE.DATABASE.SQL` | SQL Workspace |
| 270 | `WORKSPACE.DATABASE.POSTGRESQL` | PostgreSQL Workspace |
| 271 | `WORKSPACE.DATABASE.SQLITE` | SQLite Workspace |
| 272 | `WORKSPACE.DATABASE.LIBSQL` | libSQL Workspace |
| 273 | `WORKSPACE.DATABASE.DATABASE_TARGET` | Database Target Workspace |
| 274 | `WORKSPACE.DATABASE.SCHEMA_MIGRATION` | Schema Migration Workspace |
| 275 | `WORKSPACE.DATABASE.MIGRATION_PLANNING` | Migration Planning Workspace |
| 276 | `WORKSPACE.DATABASE.MIGRATION_REVIEW` | Migration Review Workspace |
| 277 | `WORKSPACE.DATABASE.MIGRATION_EXECUTION` | Migration Execution Workspace |
| 278 | `WORKSPACE.DATABASE.DATABASE_RECOVERY` | Database Recovery Workspace |

### W24 Reliability & Observability Workspaces (13)

| # | ID | Name |
| --- | --- | --- |
| 279 | `WORKSPACE.RELIABILITY_OBSERVABILITY.OBSERVABILITY` | Observability Workspace |
| 280 | `WORKSPACE.RELIABILITY_OBSERVABILITY.METRICS` | Metrics Workspace |
| 281 | `WORKSPACE.RELIABILITY_OBSERVABILITY.LOGS` | Logs Workspace |
| 282 | `WORKSPACE.RELIABILITY_OBSERVABILITY.TRACES` | Traces Workspace |
| 283 | `WORKSPACE.RELIABILITY_OBSERVABILITY.HEALTH` | Health Workspace |
| 284 | `WORKSPACE.RELIABILITY_OBSERVABILITY.STATUS` | Status Workspace |
| 285 | `WORKSPACE.RELIABILITY_OBSERVABILITY.ALERTS` | Alerts Workspace |
| 286 | `WORKSPACE.RELIABILITY_OBSERVABILITY.INCIDENT` | Incident Workspace |
| 287 | `WORKSPACE.RELIABILITY_OBSERVABILITY.RELIABILITY` | Reliability Workspace |
| 288 | `WORKSPACE.RELIABILITY_OBSERVABILITY.SRE` | SRE Workspace |
| 289 | `WORKSPACE.RELIABILITY_OBSERVABILITY.BACKUP` | Backup Workspace |
| 290 | `WORKSPACE.RELIABILITY_OBSERVABILITY.RESTORE` | Restore Workspace |
| 291 | `WORKSPACE.RELIABILITY_OBSERVABILITY.DISASTER_RECOVERY` | Disaster Recovery Workspace |

### W25 Security & Identity Workspaces (13)

| # | ID | Name |
| --- | --- | --- |
| 292 | `WORKSPACE.SECURITY_IDENTITY.IDENTITY` | Identity Workspace |
| 293 | `WORKSPACE.SECURITY_IDENTITY.AUTHENTICATION` | Authentication Workspace |
| 294 | `WORKSPACE.SECURITY_IDENTITY.SESSION` | Session Workspace |
| 295 | `WORKSPACE.SECURITY_IDENTITY.USER_ACCESS` | User Access Workspace |
| 296 | `WORKSPACE.SECURITY_IDENTITY.ROLE` | Role Workspace |
| 297 | `WORKSPACE.SECURITY_IDENTITY.PERMISSION` | Permission Workspace |
| 298 | `WORKSPACE.SECURITY_IDENTITY.POLICY` | Policy Workspace |
| 299 | `WORKSPACE.SECURITY_IDENTITY.RBAC` | RBAC Workspace |
| 300 | `WORKSPACE.SECURITY_IDENTITY.MFA` | MFA Workspace |
| 301 | `WORKSPACE.SECURITY_IDENTITY.SECURITY_OPERATIONS` | Security Operations Workspace |
| 302 | `WORKSPACE.SECURITY_IDENTITY.SECURITY_REVIEW` | Security Review Workspace |
| 303 | `WORKSPACE.SECURITY_IDENTITY.SECRET_REFERENCE` | Secret Reference Workspace |
| 304 | `WORKSPACE.SECURITY_IDENTITY.DEVICE_SECURITY` | Device Security Workspace |

### W26 Governance & Evidence Workspaces (13)

| # | ID | Name |
| --- | --- | --- |
| 305 | `WORKSPACE.GOVERNANCE_EVIDENCE.GOVERNANCE` | Governance Workspace |
| 306 | `WORKSPACE.GOVERNANCE_EVIDENCE.EVIDENCE` | Evidence Workspace |
| 307 | `WORKSPACE.GOVERNANCE_EVIDENCE.EVIDENCE_GATE` | Evidence Gate Workspace |
| 308 | `WORKSPACE.GOVERNANCE_EVIDENCE.AUDIT` | Audit Workspace |
| 309 | `WORKSPACE.GOVERNANCE_EVIDENCE.AUDIT_TRAIL` | Audit Trail Workspace |
| 310 | `WORKSPACE.GOVERNANCE_EVIDENCE.COMPLIANCE` | Compliance Workspace |
| 311 | `WORKSPACE.GOVERNANCE_EVIDENCE.POLICY` | Policy Workspace |
| 312 | `WORKSPACE.GOVERNANCE_EVIDENCE.RISK` | Risk Workspace |
| 313 | `WORKSPACE.GOVERNANCE_EVIDENCE.CONTROL` | Control Workspace |
| 314 | `WORKSPACE.GOVERNANCE_EVIDENCE.REVIEW` | Review Workspace |
| 315 | `WORKSPACE.GOVERNANCE_EVIDENCE.CERTIFICATION` | Certification Workspace |
| 316 | `WORKSPACE.GOVERNANCE_EVIDENCE.APPROVAL` | Approval Workspace |
| 317 | `WORKSPACE.GOVERNANCE_EVIDENCE.PROVENANCE` | Provenance Workspace |

### W27 Finance Workspaces (15)

| # | ID | Name |
| --- | --- | --- |
| 318 | `WORKSPACE.FINANCE.FINANCE` | Finance Workspace |
| 319 | `WORKSPACE.FINANCE.FINANCE_COMMAND_CENTER` | Finance Command Center |
| 320 | `WORKSPACE.FINANCE.ACCOUNTING` | Accounting Workspace |
| 321 | `WORKSPACE.FINANCE.LEDGER` | Ledger Workspace |
| 322 | `WORKSPACE.FINANCE.BUDGET` | Budget Workspace |
| 323 | `WORKSPACE.FINANCE.EXPENSE` | Expense Workspace |
| 324 | `WORKSPACE.FINANCE.REVENUE` | Revenue Workspace |
| 325 | `WORKSPACE.FINANCE.CASH_FLOW` | Cash Flow Workspace |
| 326 | `WORKSPACE.FINANCE.FORECAST` | Forecast Workspace |
| 327 | `WORKSPACE.FINANCE.RECONCILIATION` | Reconciliation Workspace |
| 328 | `WORKSPACE.FINANCE.INVOICE` | Invoice Workspace |
| 329 | `WORKSPACE.FINANCE.PAYMENT` | Payment Workspace |
| 330 | `WORKSPACE.FINANCE.PAYOUT` | Payout Workspace |
| 331 | `WORKSPACE.FINANCE.TAX` | Tax Workspace |
| 332 | `WORKSPACE.FINANCE.TREASURY` | Treasury Workspace |

### W28 Investment Workspaces (12)

| # | ID | Name |
| --- | --- | --- |
| 333 | `WORKSPACE.INVESTMENT.INVESTOR` | Investor Workspace |
| 334 | `WORKSPACE.INVESTMENT.INVESTOR_RELATIONS` | Investor Relations Workspace |
| 335 | `WORKSPACE.INVESTMENT.INVESTMENT` | Investment Workspace |
| 336 | `WORKSPACE.INVESTMENT.INVESTMENT_COMMITTEE` | Investment Committee Workspace |
| 337 | `WORKSPACE.INVESTMENT.PORTFOLIO` | Portfolio Workspace |
| 338 | `WORKSPACE.INVESTMENT.FUND` | Fund Workspace |
| 339 | `WORKSPACE.INVESTMENT.FUNDRAISING` | Fundraising Workspace |
| 340 | `WORKSPACE.INVESTMENT.DEAL` | Deal Workspace |
| 341 | `WORKSPACE.INVESTMENT.DUE_DILIGENCE` | Due Diligence Workspace |
| 342 | `WORKSPACE.INVESTMENT.CAP_TABLE` | Cap Table Workspace |
| 343 | `WORKSPACE.INVESTMENT.INVESTMENT_ANALYSIS` | Investment Analysis Workspace |
| 344 | `WORKSPACE.INVESTMENT.INVESTMENT_EVIDENCE` | Investment Evidence Workspace |

### W29 CRM & Sales Workspaces (12)

| # | ID | Name |
| --- | --- | --- |
| 345 | `WORKSPACE.CRM_SALES.CRM` | CRM Workspace |
| 346 | `WORKSPACE.CRM_SALES.SALES` | Sales Workspace |
| 347 | `WORKSPACE.CRM_SALES.SALES_PIPELINE` | Sales Pipeline Workspace |
| 348 | `WORKSPACE.CRM_SALES.LEAD` | Lead Workspace |
| 349 | `WORKSPACE.CRM_SALES.ACCOUNT` | Account Workspace |
| 350 | `WORKSPACE.CRM_SALES.OPPORTUNITY` | Opportunity Workspace |
| 351 | `WORKSPACE.CRM_SALES.DEAL` | Deal Workspace |
| 352 | `WORKSPACE.CRM_SALES.CUSTOMER` | Customer Workspace |
| 353 | `WORKSPACE.CRM_SALES.CONTACT` | Contact Workspace |
| 354 | `WORKSPACE.CRM_SALES.SALES_FORECAST` | Sales Forecast Workspace |
| 355 | `WORKSPACE.CRM_SALES.SALES_OPERATIONS` | Sales Operations Workspace |
| 356 | `WORKSPACE.CRM_SALES.CUSTOMER_SUCCESS` | Customer Success Workspace |

### W30 Marketing Workspaces (12)

| # | ID | Name |
| --- | --- | --- |
| 357 | `WORKSPACE.MARKETING.MARKETING` | Marketing Workspace |
| 358 | `WORKSPACE.MARKETING.CAMPAIGN` | Campaign Workspace |
| 359 | `WORKSPACE.MARKETING.CAMPAIGN_PLANNING` | Campaign Planning Workspace |
| 360 | `WORKSPACE.MARKETING.CAMPAIGN_EXECUTION` | Campaign Execution Workspace |
| 361 | `WORKSPACE.MARKETING.BRAND` | Brand Workspace |
| 362 | `WORKSPACE.MARKETING.CONTENT_MARKETING` | Content Marketing Workspace |
| 363 | `WORKSPACE.MARKETING.SOCIAL_MEDIA` | Social Media Workspace |
| 364 | `WORKSPACE.MARKETING.ADVERTISING` | Advertising Workspace |
| 365 | `WORKSPACE.MARKETING.SEO` | SEO Workspace |
| 366 | `WORKSPACE.MARKETING.MARKETING_AUTOMATION` | Marketing Automation Workspace |
| 367 | `WORKSPACE.MARKETING.MARKETING_ANALYTICS` | Marketing Analytics Workspace |
| 368 | `WORKSPACE.MARKETING.AUDIENCE` | Audience Workspace |

### W31 Commerce Workspaces (13)

| # | ID | Name |
| --- | --- | --- |
| 369 | `WORKSPACE.COMMERCE.COMMERCE` | Commerce Workspace |
| 370 | `WORKSPACE.COMMERCE.STORE` | Store Workspace |
| 371 | `WORKSPACE.COMMERCE.CATALOG` | Catalog Workspace |
| 372 | `WORKSPACE.COMMERCE.PRODUCT` | Product Workspace |
| 373 | `WORKSPACE.COMMERCE.SKU` | SKU Workspace |
| 374 | `WORKSPACE.COMMERCE.CART_OPERATIONS` | Cart Operations Workspace |
| 375 | `WORKSPACE.COMMERCE.ORDER` | Order Workspace |
| 376 | `WORKSPACE.COMMERCE.CHECKOUT` | Checkout Workspace |
| 377 | `WORKSPACE.COMMERCE.FULFILMENT` | Fulfilment Workspace |
| 378 | `WORKSPACE.COMMERCE.RETURNS` | Returns Workspace |
| 379 | `WORKSPACE.COMMERCE.PRICING` | Pricing Workspace |
| 380 | `WORKSPACE.COMMERCE.PROMOTION` | Promotion Workspace |
| 381 | `WORKSPACE.COMMERCE.INVENTORY` | Inventory Workspace |

### W32 Marketplace Workspaces (12)

| # | ID | Name |
| --- | --- | --- |
| 382 | `WORKSPACE.MARKETPLACE.MARKETPLACE` | Marketplace Workspace |
| 383 | `WORKSPACE.MARKETPLACE.VENDOR_MARKETPLACE` | Vendor Marketplace Workspace |
| 384 | `WORKSPACE.MARKETPLACE.VENDOR_DIRECTORY` | Vendor Directory Workspace |
| 385 | `WORKSPACE.MARKETPLACE.SERVICE_MARKETPLACE` | Service Marketplace Workspace |
| 386 | `WORKSPACE.MARKETPLACE.PRODUCT_MARKETPLACE` | Product Marketplace Workspace |
| 387 | `WORKSPACE.MARKETPLACE.VENDOR` | Vendor Workspace |
| 388 | `WORKSPACE.MARKETPLACE.VENDOR_ONBOARDING` | Vendor Onboarding Workspace |
| 389 | `WORKSPACE.MARKETPLACE.VENDOR_OPERATIONS` | Vendor Operations Workspace |
| 390 | `WORKSPACE.MARKETPLACE.SERVICE_CATALOG` | Service Catalog Workspace |
| 391 | `WORKSPACE.MARKETPLACE.CAPABILITY` | Capability Workspace |
| 392 | `WORKSPACE.MARKETPLACE.RATE` | Rate Workspace |
| 393 | `WORKSPACE.MARKETPLACE.COMPARISON` | Comparison Workspace |

### W33 Booking Workspaces (11)

| # | ID | Name |
| --- | --- | --- |
| 394 | `WORKSPACE.BOOKING.BOOKING` | Booking Workspace |
| 395 | `WORKSPACE.BOOKING.BOOKING_BUILDER` | Booking Builder Workspace |
| 396 | `WORKSPACE.BOOKING.BOOKING_OPERATIONS` | Booking Operations Workspace |
| 397 | `WORKSPACE.BOOKING.AVAILABILITY` | Availability Workspace |
| 398 | `WORKSPACE.BOOKING.RESERVATION` | Reservation Workspace |
| 399 | `WORKSPACE.BOOKING.QUOTE` | Quote Workspace |
| 400 | `WORKSPACE.BOOKING.PROPOSAL` | Proposal Workspace |
| 401 | `WORKSPACE.BOOKING.RATE_REVIEW` | Rate Review Workspace |
| 402 | `WORKSPACE.BOOKING.CONFIRMATION` | Confirmation Workspace |
| 403 | `WORKSPACE.BOOKING.BOOKING_FULFILMENT` | Booking Fulfilment Workspace |
| 404 | `WORKSPACE.BOOKING.BOOKING_SETTLEMENT` | Booking Settlement Workspace |

### W34 Event Workspaces (14)

| # | ID | Name |
| --- | --- | --- |
| 405 | `WORKSPACE.EVENT.EVENT` | Event Workspace |
| 406 | `WORKSPACE.EVENT.EVENT_BUILDER` | Event Builder Workspace |
| 407 | `WORKSPACE.EVENT.EVENT_COMMAND_CENTER` | Event Command Center |
| 408 | `WORKSPACE.EVENT.EVENT_PLANNING` | Event Planning Workspace |
| 409 | `WORKSPACE.EVENT.EVENT_PRODUCTION` | Event Production Workspace |
| 410 | `WORKSPACE.EVENT.EVENT_SCHEDULE` | Event Schedule Workspace |
| 411 | `WORKSPACE.EVENT.EVENT_GUEST` | Event Guest Workspace |
| 412 | `WORKSPACE.EVENT.EVENT_VENDOR` | Event Vendor Workspace |
| 413 | `WORKSPACE.EVENT.EVENT_SERVICE` | Event Service Workspace |
| 414 | `WORKSPACE.EVENT.EVENT_VENUE` | Event Venue Workspace |
| 415 | `WORKSPACE.EVENT.EVENT_SPATIAL` | Event Spatial Workspace |
| 416 | `WORKSPACE.EVENT.EVENT_SPONSORSHIP` | Event Sponsorship Workspace |
| 417 | `WORKSPACE.EVENT.EVENT_ROI` | Event ROI Workspace |
| 418 | `WORKSPACE.EVENT.EVENT_SETTLEMENT` | Event Settlement Workspace |

### W35 TLPS Production Workspaces (13)

| # | ID | Name |
| --- | --- | --- |
| 419 | `WORKSPACE.TLPS_PRODUCTION.PRODUCTION` | Production Workspace |
| 420 | `WORKSPACE.TLPS_PRODUCTION.PRODUCTION_COMMAND_CENTER` | Production Command Center |
| 421 | `WORKSPACE.TLPS_PRODUCTION.PROJECT_PRODUCTION` | Project Production Workspace |
| 422 | `WORKSPACE.TLPS_PRODUCTION.PRE_PRODUCTION` | Pre-Production Workspace |
| 423 | `WORKSPACE.TLPS_PRODUCTION.SHOOT` | Shoot Workspace |
| 424 | `WORKSPACE.TLPS_PRODUCTION.POST_PRODUCTION` | Post-Production Workspace |
| 425 | `WORKSPACE.TLPS_PRODUCTION.SCRIPT` | Script Workspace |
| 426 | `WORKSPACE.TLPS_PRODUCTION.SCRIPT_BREAKDOWN` | Script Breakdown Workspace |
| 427 | `WORKSPACE.TLPS_PRODUCTION.SCENE` | Scene Workspace |
| 428 | `WORKSPACE.TLPS_PRODUCTION.SHOT` | Shot Workspace |
| 429 | `WORKSPACE.TLPS_PRODUCTION.SHOT_LIST` | Shot List Workspace |
| 430 | `WORKSPACE.TLPS_PRODUCTION.STORYBOARD` | Storyboard Workspace |
| 431 | `WORKSPACE.TLPS_PRODUCTION.SCHEDULE_BOARD` | Schedule Board Workspace |

### W36 Casting Workspaces (10)

| # | ID | Name |
| --- | --- | --- |
| 432 | `WORKSPACE.CASTING.CASTING` | Casting Workspace |
| 433 | `WORKSPACE.CASTING.CASTING_BOARD` | Casting Board Workspace |
| 434 | `WORKSPACE.CASTING.CASTING_SEARCH` | Casting Search Workspace |
| 435 | `WORKSPACE.CASTING.TALENT` | Talent Workspace |
| 436 | `WORKSPACE.CASTING.ARTIST` | Artist Workspace |
| 437 | `WORKSPACE.CASTING.AUDITION` | Audition Workspace |
| 438 | `WORKSPACE.CASTING.CASTING_REVIEW` | Casting Review Workspace |
| 439 | `WORKSPACE.CASTING.CASTING_APPROVAL` | Casting Approval Workspace |
| 440 | `WORKSPACE.CASTING.CASTING_AVAILABILITY` | Casting Availability Workspace |
| 441 | `WORKSPACE.CASTING.CASTING_CONTRACT` | Casting Contract Workspace |

### W37 Crew Workspaces (8)

| # | ID | Name |
| --- | --- | --- |
| 442 | `WORKSPACE.CREW.CREW` | Crew Workspace |
| 443 | `WORKSPACE.CREW.CREW_DIRECTORY` | Crew Directory Workspace |
| 444 | `WORKSPACE.CREW.DEPARTMENT` | Department Workspace |
| 445 | `WORKSPACE.CREW.CREW_SCHEDULING` | Crew Scheduling Workspace |
| 446 | `WORKSPACE.CREW.CREW_AVAILABILITY` | Crew Availability Workspace |
| 447 | `WORKSPACE.CREW.CREW_ASSIGNMENT` | Crew Assignment Workspace |
| 448 | `WORKSPACE.CREW.CREW_COMMUNICATION` | Crew Communication Workspace |
| 449 | `WORKSPACE.CREW.CREW_CONTRACT` | Crew Contract Workspace |

### W38 Location & Venue Workspaces (10)

| # | ID | Name |
| --- | --- | --- |
| 450 | `WORKSPACE.LOCATION_VENUE.LOCATION` | Location Workspace |
| 451 | `WORKSPACE.LOCATION_VENUE.LOCATION_SCOUT` | Location Scout Workspace |
| 452 | `WORKSPACE.LOCATION_VENUE.LOCATION_LIBRARY` | Location Library Workspace |
| 453 | `WORKSPACE.LOCATION_VENUE.VENUE` | Venue Workspace |
| 454 | `WORKSPACE.LOCATION_VENUE.VENUE_SEARCH` | Venue Search Workspace |
| 455 | `WORKSPACE.LOCATION_VENUE.VENUE_COMPARISON` | Venue Comparison Workspace |
| 456 | `WORKSPACE.LOCATION_VENUE.VENUE_PLANNING` | Venue Planning Workspace |
| 457 | `WORKSPACE.LOCATION_VENUE.VENUE_FLOOR_PLAN` | Venue Floor Plan Workspace |
| 458 | `WORKSPACE.LOCATION_VENUE.LOCATION_APPROVAL` | Location Approval Workspace |
| 459 | `WORKSPACE.LOCATION_VENUE.PERMIT` | Permit Workspace |

### W39 Equipment & Logistics Workspaces (12)

| # | ID | Name |
| --- | --- | --- |
| 460 | `WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS` | Logistics Workspace |
| 461 | `WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS_COMMAND_CENTER` | Logistics Command Center |
| 462 | `WORKSPACE.EQUIPMENT_LOGISTICS.EQUIPMENT` | Equipment Workspace |
| 463 | `WORKSPACE.EQUIPMENT_LOGISTICS.INVENTORY` | Inventory Workspace |
| 464 | `WORKSPACE.EQUIPMENT_LOGISTICS.EQUIPMENT_ASSIGNMENT` | Equipment Assignment Workspace |
| 465 | `WORKSPACE.EQUIPMENT_LOGISTICS.TRANSPORT` | Transport Workspace |
| 466 | `WORKSPACE.EQUIPMENT_LOGISTICS.TRAVEL` | Travel Workspace |
| 467 | `WORKSPACE.EQUIPMENT_LOGISTICS.ACCOMMODATION` | Accommodation Workspace |
| 468 | `WORKSPACE.EQUIPMENT_LOGISTICS.ROUTE` | Route Workspace |
| 469 | `WORKSPACE.EQUIPMENT_LOGISTICS.SHIPMENT` | Shipment Workspace |
| 470 | `WORKSPACE.EQUIPMENT_LOGISTICS.PERMIT` | Permit Workspace |
| 471 | `WORKSPACE.EQUIPMENT_LOGISTICS.INSURANCE` | Insurance Workspace |

### W40 Event Guest Workspaces (10)

| # | ID | Name |
| --- | --- | --- |
| 472 | `WORKSPACE.EVENT_GUEST.GUEST` | Guest Workspace |
| 473 | `WORKSPACE.EVENT_GUEST.GUEST_DIRECTORY` | Guest Directory Workspace |
| 474 | `WORKSPACE.EVENT_GUEST.INVITATION` | Invitation Workspace |
| 475 | `WORKSPACE.EVENT_GUEST.RSVP` | RSVP Workspace |
| 476 | `WORKSPACE.EVENT_GUEST.GUEST_JOURNEY` | Guest Journey Workspace |
| 477 | `WORKSPACE.EVENT_GUEST.CHECK_IN` | Check-In Workspace |
| 478 | `WORKSPACE.EVENT_GUEST.ACCESS` | Access Workspace |
| 479 | `WORKSPACE.EVENT_GUEST.SEATING` | Seating Workspace |
| 480 | `WORKSPACE.EVENT_GUEST.HOSPITALITY` | Hospitality Workspace |
| 481 | `WORKSPACE.EVENT_GUEST.VIP` | VIP Workspace |

### W41 Sponsorship Workspaces (8)

| # | ID | Name |
| --- | --- | --- |
| 482 | `WORKSPACE.SPONSORSHIP.SPONSORSHIP` | Sponsorship Workspace |
| 483 | `WORKSPACE.SPONSORSHIP.SPONSOR` | Sponsor Workspace |
| 484 | `WORKSPACE.SPONSORSHIP.SPONSOR_PIPELINE` | Sponsor Pipeline Workspace |
| 485 | `WORKSPACE.SPONSORSHIP.SPONSOR_PACKAGE` | Sponsor Package Workspace |
| 486 | `WORKSPACE.SPONSORSHIP.SPONSOR_ACTIVATION` | Sponsor Activation Workspace |
| 487 | `WORKSPACE.SPONSORSHIP.DELIVERABLES` | Deliverables Workspace |
| 488 | `WORKSPACE.SPONSORSHIP.BRAND_PLACEMENT` | Brand Placement Workspace |
| 489 | `WORKSPACE.SPONSORSHIP.SPONSORSHIP_ROI` | Sponsorship ROI Workspace |

### W42 Education Workspaces (12)

| # | ID | Name |
| --- | --- | --- |
| 490 | `WORKSPACE.EDUCATION.LEARNING` | Learning Workspace |
| 491 | `WORKSPACE.EDUCATION.COURSE` | Course Workspace |
| 492 | `WORKSPACE.EDUCATION.CLASSROOM` | Classroom Workspace |
| 493 | `WORKSPACE.EDUCATION.LESSON` | Lesson Workspace |
| 494 | `WORKSPACE.EDUCATION.ASSIGNMENT` | Assignment Workspace |
| 495 | `WORKSPACE.EDUCATION.QUIZ` | Quiz Workspace |
| 496 | `WORKSPACE.EDUCATION.EXAM` | Exam Workspace |
| 497 | `WORKSPACE.EDUCATION.STUDENT` | Student Workspace |
| 498 | `WORKSPACE.EDUCATION.TEACHER` | Teacher Workspace |
| 499 | `WORKSPACE.EDUCATION.PROGRESS` | Progress Workspace |
| 500 | `WORKSPACE.EDUCATION.CERTIFICATE` | Certificate Workspace |
| 501 | `WORKSPACE.EDUCATION.CURRICULUM` | Curriculum Workspace |

### W43 Community Workspaces (8)

| # | ID | Name |
| --- | --- | --- |
| 502 | `WORKSPACE.COMMUNITY.COMMUNITY` | Community Workspace |
| 503 | `WORKSPACE.COMMUNITY.MEMBER` | Member Workspace |
| 504 | `WORKSPACE.COMMUNITY.FORUM` | Forum Workspace |
| 505 | `WORKSPACE.COMMUNITY.DISCUSSION` | Discussion Workspace |
| 506 | `WORKSPACE.COMMUNITY.FEED` | Feed Workspace |
| 507 | `WORKSPACE.COMMUNITY.GROUP` | Group Workspace |
| 508 | `WORKSPACE.COMMUNITY.COMMUNITY_MODERATION` | Community Moderation Workspace |
| 509 | `WORKSPACE.COMMUNITY.COMMUNITY_EVENTS` | Community Events Workspace |

### W44 Support Workspaces (9)

| # | ID | Name |
| --- | --- | --- |
| 510 | `WORKSPACE.SUPPORT.SUPPORT` | Support Workspace |
| 511 | `WORKSPACE.SUPPORT.HELP_DESK` | Help Desk Workspace |
| 512 | `WORKSPACE.SUPPORT.TICKET` | Ticket Workspace |
| 513 | `WORKSPACE.SUPPORT.SERVICE_DESK` | Service Desk Workspace |
| 514 | `WORKSPACE.SUPPORT.CUSTOMER_SUPPORT` | Customer Support Workspace |
| 515 | `WORKSPACE.SUPPORT.KNOWLEDGE_SUPPORT` | Knowledge Support Workspace |
| 516 | `WORKSPACE.SUPPORT.INCIDENT_SUPPORT` | Incident Support Workspace |
| 517 | `WORKSPACE.SUPPORT.SLA` | SLA Workspace |
| 518 | `WORKSPACE.SUPPORT.ESCALATION` | Escalation Workspace |

### W45 CMS & Publishing Workspaces (10)

| # | ID | Name |
| --- | --- | --- |
| 519 | `WORKSPACE.CMS_PUBLISHING.CMS` | CMS Workspace |
| 520 | `WORKSPACE.CMS_PUBLISHING.CONTENT_COLLECTION` | Content Collection Workspace |
| 521 | `WORKSPACE.CMS_PUBLISHING.CONTENT_ENTRY` | Content Entry Workspace |
| 522 | `WORKSPACE.CMS_PUBLISHING.EDITORIAL` | Editorial Workspace |
| 523 | `WORKSPACE.CMS_PUBLISHING.PUBLISHING` | Publishing Workspace |
| 524 | `WORKSPACE.CMS_PUBLISHING.SEO` | SEO Workspace |
| 525 | `WORKSPACE.CMS_PUBLISHING.LOCALIZATION` | Localization Workspace |
| 526 | `WORKSPACE.CMS_PUBLISHING.TRANSLATION` | Translation Workspace |
| 527 | `WORKSPACE.CMS_PUBLISHING.REDIRECT` | Redirect Workspace |
| 528 | `WORKSPACE.CMS_PUBLISHING.CONTENT_APPROVAL` | Content Approval Workspace |

### W46 Public-Site Workspaces (10)

| # | ID | Name |
| --- | --- | --- |
| 529 | `WORKSPACE.PUBLIC_SITE.WEBSITE` | Website Workspace |
| 530 | `WORKSPACE.PUBLIC_SITE.LANDING_PAGE` | Landing Page Workspace |
| 531 | `WORKSPACE.PUBLIC_SITE.MARKETING_SITE` | Marketing Site Workspace |
| 532 | `WORKSPACE.PUBLIC_SITE.DOCUMENTATION_SITE` | Documentation Site Workspace |
| 533 | `WORKSPACE.PUBLIC_SITE.NEWS_SITE` | News Site Workspace |
| 534 | `WORKSPACE.PUBLIC_SITE.BLOG` | Blog Workspace |
| 535 | `WORKSPACE.PUBLIC_SITE.PORTFOLIO_SITE` | Portfolio Site Workspace |
| 536 | `WORKSPACE.PUBLIC_SITE.CAREERS_SITE` | Careers Site Workspace |
| 537 | `WORKSPACE.PUBLIC_SITE.INVESTOR_SITE` | Investor Site Workspace |
| 538 | `WORKSPACE.PUBLIC_SITE.TRUST_CENTER` | Trust Center Workspace |

### W47 Mobile Workspaces (8)

| # | ID | Name |
| --- | --- | --- |
| 539 | `WORKSPACE.MOBILE.MOBILE_APP` | Mobile App Workspace |
| 540 | `WORKSPACE.MOBILE.MOBILE_BUILDER` | Mobile Builder Workspace |
| 541 | `WORKSPACE.MOBILE.MOBILE_PREVIEW` | Mobile Preview Workspace |
| 542 | `WORKSPACE.MOBILE.DEVICE_PREVIEW` | Device Preview Workspace |
| 543 | `WORKSPACE.MOBILE.OFFLINE` | Offline Workspace |
| 544 | `WORKSPACE.MOBILE.SYNC` | Sync Workspace |
| 545 | `WORKSPACE.MOBILE.MOBILE_NAVIGATION` | Mobile Navigation Workspace |
| 546 | `WORKSPACE.MOBILE.MOBILE_FORMS` | Mobile Forms Workspace |

### W48 Desktop Workspaces (6)

| # | ID | Name |
| --- | --- | --- |
| 547 | `WORKSPACE.DESKTOP.DESKTOP_APP` | Desktop App Workspace |
| 548 | `WORKSPACE.DESKTOP.DESKTOP_BUILDER` | Desktop Builder Workspace |
| 549 | `WORKSPACE.DESKTOP.MULTI_WINDOW` | Multi-Window Workspace |
| 550 | `WORKSPACE.DESKTOP.DESKTOP_COMMAND_CENTER` | Desktop Command Center |
| 551 | `WORKSPACE.DESKTOP.LOCAL_FILES` | Local Files Workspace |
| 552 | `WORKSPACE.DESKTOP.NATIVE_INTEGRATION` | Native Integration Workspace |

### W49 Review & Decision Workspaces (10)

| # | ID | Name |
| --- | --- | --- |
| 553 | `WORKSPACE.REVIEW_DECISION.REVIEW` | Review Workspace |
| 554 | `WORKSPACE.REVIEW_DECISION.APPROVAL` | Approval Workspace |
| 555 | `WORKSPACE.REVIEW_DECISION.DECISION` | Decision Workspace |
| 556 | `WORKSPACE.REVIEW_DECISION.COMPARISON` | Comparison Workspace |
| 557 | `WORKSPACE.REVIEW_DECISION.DIFF` | Diff Workspace |
| 558 | `WORKSPACE.REVIEW_DECISION.EVIDENCE_REVIEW` | Evidence Review Workspace |
| 559 | `WORKSPACE.REVIEW_DECISION.QUALITY_REVIEW` | Quality Review Workspace |
| 560 | `WORKSPACE.REVIEW_DECISION.LEGAL_REVIEW` | Legal Review Workspace |
| 561 | `WORKSPACE.REVIEW_DECISION.FINANCE_REVIEW` | Finance Review Workspace |
| 562 | `WORKSPACE.REVIEW_DECISION.RELEASE_REVIEW` | Release Review Workspace |

### W50 System Administration Workspaces (9)

| # | ID | Name |
| --- | --- | --- |
| 563 | `WORKSPACE.SYSTEM_ADMINISTRATION.ADMIN` | Admin Workspace |
| 564 | `WORKSPACE.SYSTEM_ADMINISTRATION.SUPER_ADMIN` | Super Admin Workspace |
| 565 | `WORKSPACE.SYSTEM_ADMINISTRATION.USER_ADMINISTRATION` | User Administration Workspace |
| 566 | `WORKSPACE.SYSTEM_ADMINISTRATION.ORGANISATION_ADMINISTRATION` | Organisation Administration Workspace |
| 567 | `WORKSPACE.SYSTEM_ADMINISTRATION.WORKSPACE_ADMINISTRATION` | Workspace Administration Workspace |
| 568 | `WORKSPACE.SYSTEM_ADMINISTRATION.ROLES_AND_PERMISSIONS` | Roles & Permissions Workspace |
| 569 | `WORKSPACE.SYSTEM_ADMINISTRATION.SYSTEM_CONFIGURATION` | System Configuration Workspace |
| 570 | `WORKSPACE.SYSTEM_ADMINISTRATION.FEATURE_FLAG` | Feature Flag Workspace |
| 571 | `WORKSPACE.SYSTEM_ADMINISTRATION.INTEGRATION_ADMINISTRATION` | Integration Administration Workspace |

### W51 Operations Administration Workspaces (7)

| # | ID | Name |
| --- | --- | --- |
| 572 | `WORKSPACE.OPERATIONS_ADMINISTRATION.QUEUE_ADMINISTRATION` | Queue Administration Workspace |
| 573 | `WORKSPACE.OPERATIONS_ADMINISTRATION.JOB_ADMINISTRATION` | Job Administration Workspace |
| 574 | `WORKSPACE.OPERATIONS_ADMINISTRATION.NOTIFICATION_ADMINISTRATION` | Notification Administration Workspace |
| 575 | `WORKSPACE.OPERATIONS_ADMINISTRATION.WEBHOOK_ADMINISTRATION` | Webhook Administration Workspace |
| 576 | `WORKSPACE.OPERATIONS_ADMINISTRATION.RUNTIME_ADMINISTRATION` | Runtime Administration Workspace |
| 577 | `WORKSPACE.OPERATIONS_ADMINISTRATION.DEPLOYMENT_ADMINISTRATION` | Deployment Administration Workspace |
| 578 | `WORKSPACE.OPERATIONS_ADMINISTRATION.AUDIT_ADMINISTRATION` | Audit Administration Workspace |

### W52 Testing Workspaces (10)

| # | ID | Name |
| --- | --- | --- |
| 579 | `WORKSPACE.TESTING.TEST` | Test Workspace |
| 580 | `WORKSPACE.TESTING.QA` | QA Workspace |
| 581 | `WORKSPACE.TESTING.BROWSER_TEST` | Browser Test Workspace |
| 582 | `WORKSPACE.TESTING.COMPONENT_TEST` | Component Test Workspace |
| 583 | `WORKSPACE.TESTING.INTEGRATION_TEST` | Integration Test Workspace |
| 584 | `WORKSPACE.TESTING.E2E` | E2E Workspace |
| 585 | `WORKSPACE.TESTING.ACCESSIBILITY_TEST` | Accessibility Test Workspace |
| 586 | `WORKSPACE.TESTING.PERFORMANCE_TEST` | Performance Test Workspace |
| 587 | `WORKSPACE.TESTING.CONFORMANCE` | Conformance Workspace |
| 588 | `WORKSPACE.TESTING.REGRESSION` | Regression Workspace |

### W53 Demo & Experimental Workspaces (8)

| # | ID | Name |
| --- | --- | --- |
| 589 | `WORKSPACE.DEMO_EXPERIMENTAL.DEMO` | Demo Workspace |
| 590 | `WORKSPACE.DEMO_EXPERIMENTAL.SANDBOX` | Sandbox Workspace |
| 591 | `WORKSPACE.DEMO_EXPERIMENTAL.PLAYGROUND` | Playground Workspace |
| 592 | `WORKSPACE.DEMO_EXPERIMENTAL.PROTOTYPE` | Prototype Workspace |
| 593 | `WORKSPACE.DEMO_EXPERIMENTAL.LABS` | Labs Workspace |
| 594 | `WORKSPACE.DEMO_EXPERIMENTAL.EXPERIMENTAL` | Experimental Workspace |
| 595 | `WORKSPACE.DEMO_EXPERIMENTAL.PREVIEW` | Preview Workspace |
| 596 | `WORKSPACE.DEMO_EXPERIMENTAL.SHOWCASE` | Showcase Workspace |

### W54 Presentation & Display Workspaces (9)

| # | ID | Name |
| --- | --- | --- |
| 597 | `WORKSPACE.PRESENTATION_DISPLAY.PRESENTATION` | Presentation Workspace |
| 598 | `WORKSPACE.PRESENTATION_DISPLAY.FULLSCREEN` | Fullscreen Workspace |
| 599 | `WORKSPACE.PRESENTATION_DISPLAY.KIOSK` | Kiosk Workspace |
| 600 | `WORKSPACE.PRESENTATION_DISPLAY.TV` | TV Workspace |
| 601 | `WORKSPACE.PRESENTATION_DISPLAY.WALLBOARD` | Wallboard Workspace |
| 602 | `WORKSPACE.PRESENTATION_DISPLAY.PUBLIC_DISPLAY` | Public Display Workspace |
| 603 | `WORKSPACE.PRESENTATION_DISPLAY.EMBEDDED` | Embedded Workspace |
| 604 | `WORKSPACE.PRESENTATION_DISPLAY.SHARE` | Share Workspace |
| 605 | `WORKSPACE.PRESENTATION_DISPLAY.PRINT` | Print Workspace |

### W55 Emergency & State Workspaces (6)

| # | ID | Name |
| --- | --- | --- |
| 606 | `WORKSPACE.EMERGENCY_STATE.MAINTENANCE` | Maintenance Workspace |
| 607 | `WORKSPACE.EMERGENCY_STATE.RECOVERY` | Recovery Workspace |
| 608 | `WORKSPACE.EMERGENCY_STATE.OFFLINE` | Offline Workspace |
| 609 | `WORKSPACE.EMERGENCY_STATE.INCIDENT` | Incident Workspace |
| 610 | `WORKSPACE.EMERGENCY_STATE.DEGRADED_SERVICE` | Degraded Service Workspace |
| 611 | `WORKSPACE.EMERGENCY_STATE.EMERGENCY_OPERATIONS` | Emergency Operations Workspace |

### W56 MAATAA Core Studio Workspaces (15)

| # | ID | Name |
| --- | --- | --- |
| 612 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_UI_STUDIO` | MAATAA UI Studio |
| 613 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_DOMAIN_STUDIO` | MAATAA Domain Studio |
| 614 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_DATA_STUDIO` | MAATAA Data Studio |
| 615 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_API_STUDIO` | MAATAA API Studio |
| 616 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_CODE_STUDIO` | MAATAA Code Studio |
| 617 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_WORKFLOW_STUDIO` | MAATAA Workflow Studio |
| 618 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_FORM_STUDIO` | MAATAA Form Studio |
| 619 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_PAGE_STUDIO` | MAATAA Page Studio |
| 620 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_APP_STUDIO` | MAATAA App Studio |
| 621 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_MOBILE_STUDIO` | MAATAA Mobile Studio |
| 622 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_THEME_STUDIO` | MAATAA Theme Studio |
| 623 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_AGENT_STUDIO` | MAATAA Agent Studio |
| 624 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_KNOWLEDGE_STUDIO` | MAATAA Knowledge Studio |
| 625 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_INFRASTRUCTURE_STUDIO` | MAATAA Infrastructure Studio |
| 626 | `WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_CONTROL_PLANE_STUDIO` | MAATAA Control Plane Studio |

### W57 Workspace Meta/Management (13)

| # | ID | Name |
| --- | --- | --- |
| 627 | `WORKSPACE.WORKSPACE_META.WORKSPACE_SELECTOR` | Workspace Selector |
| 628 | `WORKSPACE.WORKSPACE_META.WORKSPACE_SWITCHER` | Workspace Switcher |
| 629 | `WORKSPACE.WORKSPACE_META.WORKSPACE_DIRECTORY` | Workspace Directory |
| 630 | `WORKSPACE.WORKSPACE_META.WORKSPACE_CREATOR` | Workspace Creator |
| 631 | `WORKSPACE.WORKSPACE_META.WORKSPACE_TEMPLATE_GALLERY` | Workspace Template Gallery |
| 632 | `WORKSPACE.WORKSPACE_META.WORKSPACE_SETTINGS` | Workspace Settings |
| 633 | `WORKSPACE.WORKSPACE_META.WORKSPACE_MEMBERS` | Workspace Members |
| 634 | `WORKSPACE.WORKSPACE_META.WORKSPACE_ROLES` | Workspace Roles |
| 635 | `WORKSPACE.WORKSPACE_META.WORKSPACE_PERMISSIONS` | Workspace Permissions |
| 636 | `WORKSPACE.WORKSPACE_META.WORKSPACE_INTEGRATIONS` | Workspace Integrations |
| 637 | `WORKSPACE.WORKSPACE_META.WORKSPACE_ACTIVITY` | Workspace Activity |
| 638 | `WORKSPACE.WORKSPACE_META.WORKSPACE_AUDIT` | Workspace Audit |
| 639 | `WORKSPACE.WORKSPACE_META.WORKSPACE_ARCHIVE` | Workspace Archive |

### W58 Multi-Workspace Systems (8)

| # | ID | Name |
| --- | --- | --- |
| 640 | `WORKSPACE.MULTI_WORKSPACE.WORKSPACE_HUB` | Workspace Hub |
| 641 | `WORKSPACE.MULTI_WORKSPACE.WORKSPACE_FEDERATION` | Workspace Federation |
| 642 | `WORKSPACE.MULTI_WORKSPACE.WORKSPACE_PORTFOLIO` | Workspace Portfolio |
| 643 | `WORKSPACE.MULTI_WORKSPACE.MULTI_TENANT_HUB` | Multi-Tenant Workspace Hub |
| 644 | `WORKSPACE.MULTI_WORKSPACE.CROSS_WORKSPACE_SEARCH` | Cross-Workspace Search |
| 645 | `WORKSPACE.MULTI_WORKSPACE.CROSS_WORKSPACE_ACTIVITY` | Cross-Workspace Activity |
| 646 | `WORKSPACE.MULTI_WORKSPACE.CROSS_WORKSPACE_ANALYTICS` | Cross-Workspace Analytics |
| 647 | `WORKSPACE.MULTI_WORKSPACE.CROSS_WORKSPACE_COMMAND_CENTER` | Cross-Workspace Command Center |
