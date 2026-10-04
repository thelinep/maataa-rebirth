# Registry Architecture

`REGISTRY.REGISTRY` is the registry of registries. `@maataa/ui` owns UI vocabulary and metadata only. Runtime/auth/data/infrastructure registries are declared as integration vocabulary and remain host/platform authority.

## UI_STRUCTURE

Workspace Registry, Page Registry, Layout Registry, Layout Atom Registry, Region Registry, Slot Registry, Component Registry, Atomic Component Registry, Compound Component Registry, Composition Registry, Pattern Registry, Template Registry

## VISUAL_SYSTEM

Design Token Registry, Theme Registry, Color Registry, Typography Registry, Spacing Registry, Radius Registry, Shadow/Elevation Registry, Motion Registry, Effect Registry, Breakpoint Registry, Density Registry, Z-Index/Layer Registry, Icon Registry, Illustration Registry, Asset Registry

## BEHAVIOR

State Registry, Interaction Registry, Action Registry, Command Registry, Event Registry, Gesture Registry, Keyboard Shortcut Registry, Focus Registry, Selection Registry, Drag-and-Drop Registry, Transition Registry

## NAVIGATION

Route Registry, Navigation Registry, Menu Registry, Breadcrumb Registry, Tab Registry, Deep-Link Registry, Entry-Point Registry, Redirect Registry

## RESPONSIVE_DEVICE

Viewport Registry, Device Registry, Responsive Transformation Registry, Input Modality Registry, Safe-Area Registry, Orientation Registry, Capability Registry

## ACCESSIBILITY

Accessibility Requirement Registry, ARIA Role Registry, Keyboard Behavior Registry, Focus Management Registry, Contrast Registry, Reduced Motion Registry, Touch Target Registry, Accessibility Evidence Registry

## CONTENT

Content Type Registry, Copy Pattern Registry, Message Registry, Error Message Registry, Empty-State Registry, Notification Registry, Locale Registry, Translation Key Registry, Formatting Registry

## FORMS

Field Registry, Input Registry, Validation Registry, Form Pattern Registry, Form Schema Registry, Form State Registry, Error Presentation Registry, Wizard Registry

## DATA_DISPLAY

Data View Registry, Column Registry, Filter Registry, Sort Registry, Pagination Registry, Chart Registry, Visualization Registry, Metric Registry

## DOMAIN_APPLICATION

Product Registry, Application Registry, Module Registry, Feature Registry, Capability Registry, Domain Registry, Entity Registry, Relationship Registry, Flow Registry, Journey Registry, Role Registry, Persona Registry

## IDENTITY_SECURITY

Actor Registry, Role Registry, Permission Registry, Policy Registry, Resource Registry, Session Registry, Authentication Method Registry, Security Control Registry

## API_INTEGRATION

API Service Registry, API Operation Registry, API Contract Registry, API Error Registry, API Environment Registry, Integration Registry, Provider Registry, Webhook Registry, Event Contract Registry, Adapter Registry

## RUNTIME_CONTROL_PLANE

Environment Registry, Runtime Registry, Service Registry, Database Target Registry, Storage Registry, Queue Registry, Infrastructure Registry, Network Registry, Secret Reference Registry, Deployment Registry, Build Registry, Artifact Registry

## OPERATIONS

Health Registry, Metric Registry, Log Source Registry, Trace Registry, Alert Registry, Incident Registry, SLO Registry, Backup Registry, Recovery Registry, RPO/RTO Registry

## GOVERNANCE_EVIDENCE

Provenance Registry, Evidence Registry, Audit Registry, Decision Registry, Approval Registry, Policy Registry, Gate Registry, Risk Registry, Exception Registry, Compliance Registry

## PACKAGE_DEVELOPER

Package Registry, Export Registry, Atomic Import Registry, Dependency Registry, Boundary Registry, Version Registry, Deprecation Registry, Compatibility Registry, Consumer Registry, Story Registry, Test Registry, Documentation Registry

## QUALITY

Test Case Registry, Certification Registry, Browser Support Registry, Device Support Registry, Performance Budget Registry, Accessibility Certification Registry, Visual Regression Registry, Known Issue Registry

## RELEASE_LIFECYCLE

Lifecycle Registry, Release Registry, Release Gate Registry, Migration Registry, Deployment Approval Registry, Rollback Registry, Change Registry, Breaking Change Registry


## GENERATION

Generator Registry

## TOOLING

Tool Registry

## AI_SPACE

AI Space Registry

## AI

Model Registry, Model Capability Registry, Model Version Registry, Agent Registry, Agent Version Registry, Prompt Registry, Prompt Template Registry, AI Tool Registry, Function Registry, Connector Registry, MCP Server Registry, Knowledge Source Registry, Knowledge Index Registry, Embedding Model Registry, Retriever Registry, Reranker Registry, Dataset Registry, Evaluation Registry, Evaluator Registry, Rubric Registry, Guardrail Registry, Safety Policy Registry, Router Registry, AI Workflow Registry, Context Policy Registry, Memory Policy Registry, Output Schema Registry, AI Provider Registry, AI Runtime Binding Registry, AI Observability Metric Registry, AI Cost Policy Registry, AI Evidence Registry

## Responsive/device registry family

Alpha 6 activates the concrete catalogs behind the previously-declared responsive/device registry family:

- `REGISTRY.RESPONSIVE_DEVICE.DEVICE` → 187 device identities
- `REGISTRY.RESPONSIVE_DEVICE.VIEWPORT` → 46 viewport classes
- `REGISTRY.RESPONSIVE_DEVICE.INPUT_MODALITY` → 18 input modalities
- `REGISTRY.RESPONSIVE_DEVICE.ORIENTATION` → 14 orientation/folding modes
- `REGISTRY.RESPONSIVE_DEVICE.CAPABILITY` → 46 device capabilities
- `REGISTRY.RESPONSIVE_DEVICE.SAFE_AREA` → 11 safe-area profiles
- `REGISTRY.RESPONSIVE_DEVICE.RESPONSIVE_TRANSFORMATION` → 25 responsive transformation rules

These registries describe UI behavior and preview assumptions; they do not assert physical-device verification.


## Alpha 7 additions
- `REGISTRY.PACKAGE_DEVELOPER.REDUX_SLICE`
- `REGISTRY.PACKAGE_DEVELOPER.REDUX_SELECTOR`
- `REGISTRY.PACKAGE_DEVELOPER.TYPE_CONTRACT`
- `REGISTRY.PACKAGE_DEVELOPER.DEMO_DATASET`
- `REGISTRY.PACKAGE_DEVELOPER.DEMO_SCENARIO`

Total registry entries including `REGISTRY.REGISTRY`: **217**.

## Concrete actor and icon catalogs — Alpha 7.4

- `ACTOR_REGISTRY`: 15 symbolic demo identities backed by the existing Actor Registry governance type.
- `ICON_REGISTRY`: 42 MAATAA core SVG icons backed by the existing Icon Registry governance type.

These catalogs do not add new Registry Registry types; they populate registry types that already existed.
