# MAATAA / TLPS icon-bar inventory

Source inspection:16 October2026. This lists existing local source, including uncommitted Storybook reference files. Reference actions do not establish connected services.

## Active TLPS workplace bars

### Workplace action bar

1. New record
2. Load samples
3. Review plan
4. Check current step
5. Export handover
6. Restart steps

### Workplace steps bar

1. Prepare
2. Review
3. Rehearse
4. Handover

Steps show checked/current/locked states; future steps are disabled. These are local planning reviews, not authenticated approvals. Source: `apps/tlps/src/areas/WorkplaceBars.tsx` and `WorkplaceDemo.tsx`.

## Eight assistant-bar presentation variants

| Variant | Purpose |
| --- | --- |
| Labeled toolbar | The full tool names remain visible |
| Icon-only toolbar | Tight spaces; labels remain available to assistive technology |
| Grouped with primary action | The main action stands out; related tools sit in a separate group |
| Side rail | A collapsible window-edge rail |
| Floating tool dock | A compact group for canvas-heavy work |
| Phone tab bar | Four tools stay visible; remaining tools open in a sheet |
| Toolbar with overflow menu | Tools that do not fit move into More |
| Quick-action chips | Suggestions can sit below a reply or message box |

## Nine assistant reference areas / 68 action examples

These come from `stories/AssistantIconBars.stories.tsx` (Storybook: Assistant/Icon Bars → AllVersions). Buttons select preview state; the story explicitly says they do not call services. Four preview themes: light/dark/high contrast/OLED. Three densities: compact/default/comfortable.

### General Information

Ask a question, Current events, Weather, Forecast details, General knowledge, Places and world, Time and dates.

### Email Management

Compose, Inbox, Check for new mail, Reply, Forward, Attach file, Archive, Search mail, Manage accounts.

### Task and Schedule Management

New reminder, To-do list, Calendar, New event, Alarm, Repeat, Priority.

### Document Handling

Open, New document, Edit, Save, Word document, Export as PDF, Print, Share or send.

### File Organization

Folders, Sort, Search in folder, Find file, Duplicate, Back up now, Restore from backup, Move to trash.

### Web Search

Search the web, Open website, Quick links, Bookmark, History, Filter results, Open in browser.

### Programming Help

Explain code, Write a function, Debug, Run a command, Run, Version control, Docs and references.

### Language Translation

Translate, Swap languages, Speak to translate, Listen, Translate text in an image, Dictionary, Copy translation.

### Personal Finance Management

Accounts, Add expense, Budget, Savings goals, Bills due, Spending trends, Banks, Currency.

## 27 reference workflow step bars

These come from `stories/workflow-step-bars.reference-data.json` and `WorkflowStepBars.stories.tsx` (Storybook: Workflows/Step Bars → ReferenceInventory). They are marked reference-example-not-verified. Horizontal/vertical presentations and local preview state are not product/provider integrations.

### TLPS

| Flow | Steps |
| --- | --- |
| TLPS production workflow | Project intake → Budget → Crew & location → Call sheet → Review & approval → Local rehearsal → Evidence → Closeout |
| TLPS app planning flow | Choose role → Work areas → Project → Plan → Owner review → Rehearsal → Handover |
| TLPS → TLP Film handoff | Save plan locally → Open TLP Film → Preview access → Confirm import |
| Idea → Script | Capture idea → Approve idea → Draft script → Review draft → Approve script → Save version 1 |
| TLPS guided onboarding | Your idea → How far to go → How much help → Your path |

### Work areas

| Flow | Steps |
| --- | --- |
| Film OS | Ideation → Script → Pre-production → Production → Post-production → Release |
| Casting | Open → Shortlisted → Audition planned → Selected (local) → Not selected |
| Equipment & Logistics | Needed → Quote requested → Held (local note) → Returned |
| Campaign OS | Brief → Planning → Client review → Approved (local) → Wrapped |
| ATL | Proposed → Rate requested → Client review → Approved (local) |
| BTL | Idea → Planning → Permissions pending → Ready (local) → Done |
| OOH / DOOH | Shortlisted → Availability unknown → Client review → Approved (local) |
| Marketplace | Candidate → Needs confirmation → Compared → Preferred (local) |
| Investor Hub | Draft → Pitch ready → Shared (local note) → Interest noted → Closed |
| Event OS | Brief → Planning → Run-of-show draft → Ready (local) → Wrapped |
| Wedding OS | Idea → Planning → Family review → Ready (local) → Done |
| Exhibition & Spatial | Concept → Layout draft → Fabricator quote → Approved (local) → Dismantled |
| MAATAA AI | Draft → Ready to send → Reviewed by a person |
| Analytics | Planned → Draft → Reviewed |
| Core Platform | Listed → Invite drafted → Active (local) → Removed |

### Film

| Flow | Steps |
| --- | --- |
| Film lifecycle | Ideation → Script → Pre-production → Production → Post-production → Release |

### Shared records and services

| Flow | Steps |
| --- | --- |
| Project record versioning | Propose version → Preview → Approve → Save with If-Match → Server: version + 1 |
| Auth token lifecycle | Create person → Issue token → Use token → Expire or revoke |

### MAATAA UI site

| Flow | Steps |
| --- | --- |
| Product idea wizard → app scaffold | Concept → People → Journey → Data → Boundaries → Experience → Pilot → Review → Preview files → Approve → Create app |
| Branding Studio | Brand board → Brand Kit → Theme preview → Review & assign |
| Support Center request | Prepare a request → Describe → Review handoff → Save local handoff |

### AI

| Flow | Steps |
| --- | --- |
| AI spaces and assistants | Brief or ask → Model drafts → Person reviews → Nothing sent automatically |

## Shared toolbar and command-bar APIs

| Export | Canonical source | Scope |
| --- | --- | --- |
| `Toolbar` | `src/navigation/index.tsx` | Generic toolbar layout |
| `AppShellToolbar` | `src/atomic/AppShellToolbar.tsx` | Application shell toolbar container |
| `TableToolbar` | `src/data/index.tsx` | Search input and caller-supplied table actions |
| `FilterBar` | `src/data/index.tsx` | Alias of TableToolbar, not a separate implementation |
| `LayoutToolbar` | `src/layout-atoms/LayoutToolbar.tsx` | Layout-region container |
| `PageToolbar` | `src/page-atoms/PageToolbar.tsx` | Page-region container |
| `WorkspaceToolbar` | `src/workspace-atoms/WorkspaceToolbar.tsx` | Workspace-region container |
| `WorkspaceCommandBar` | `src/workspace-atoms/WorkspaceCommandBar.tsx` | Workspace command-region container |
| `ToolToolbar` | `src/tool-atoms/ToolToolbar.tsx` | Tool-region container |
| `AISpaceToolbar` | `src/ai-space-atoms/AISpaceToolbar.tsx` | AI-space toolbar-region container |
| `AISpaceCommandBar` | `src/ai-space-atoms/AISpaceCommandBar.tsx` | AI-space command-region container |

These11API names include one alias; most region atoms supply structure and accept caller content, not preset operational icons. Re-export wrappers under components/atomic/navigation are not counted again.

Related status containers: `LayoutStatusBar`, `WorkspaceStatusBar`, `AISpaceStatusBar`. They are not icon action bars. ProgressBar is likewise a progress indicator, not an action bar.

## User-specified project stage icon bar

Added separately from the 27 provisional reference flows:

**Idea → Story → Board → Pre → Production → Post → Release → Shree**

Focused story: `Workflows/Step Bars → Project Stages`; also displayed above the reference groups. Uses actual MAATAA SVG icons, responsive horizontal and vertical layouts, and four theme previews. Selection is local navigation preview, not workflow completion, project mutation, payment or release authority.

Source: `apps/tlps/src/project/ProjectStageIconBar.tsx`.
