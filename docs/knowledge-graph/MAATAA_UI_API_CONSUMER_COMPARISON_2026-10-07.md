# MAATAA UI export comparison against active consumers

Canonical package: `@maataa/ui@1.0.0-alpha.8.4` (`src/`). The archived source inventory is indexed by [the absorption manifest](../../packages/absorbed-maataa-sources/manifest.json). This scan reads active consumer TS/JS imports and compares named imports and subpaths to the canonical public API manifest; generated output and static assets are excluded.

Migration and validation outcomes are tracked in [the consumer migration status matrix](MAATAA_UI_CONSUMER_MIGRATION_STATUS_2026-10-07.md).

## Consumer findings

### NEVO web

Scanned 128 distinct named imports across 5 package subpaths. The canonical package has 90 unresolved import/API gaps.

- `@maataa/ui/themes/nevo/index.css`: subpath missing.
- `@maataa/ui/themes/nevo/storybook/index.css`: subpath missing.
- `@maataa/ui`: subpath exists; missing names: Anchor, AudioOutput, AutoGrid, Body, ButtonBase, CardMachine, CreateCard, DataList, DateRange, Details, DocumentCover, DocumentIndex, DocumentMachine, Glossary, Glyph, GlyphName, HeroImage, Html, ImageHolder, Img, LineBreak, ListCards, ListGroup, ListItem, MarketingLinkComponent, MarketingNav, MarketingNavLink, MediaAssetReferenceAdapter, MediaInput, MegaMenu, NevoIcon, NevoIconGradientDefs, NevoIconKey, Option, OtpInput, Picture, Region, SelectOption, SignaturePad, SignerListAdapter, Source, SpatialPreview, Summary, TableColumn, TextInput, TextLink, Toggle, ToolCard, TrendChart, UiLinkComponent, UiLinkProvider, VarScope, VideoOutput, Widget, themeFamilies, themes.
  - `Anchor` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `AudioOutput` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `AutoGrid` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Body` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `ButtonBase` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `CardMachine` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `CreateCard` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `DataList` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `DateRange` exists in absorbed snapshot(s): `fused-ui-alpha0`, `nevo-ui-0.1`; inspect before porting.
  - `Details` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `DocumentCover` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `DocumentIndex` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `DocumentMachine` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Glossary` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Glyph` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `GlyphName` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `HeroImage` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Html` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `ImageHolder` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Img` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `LineBreak` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `ListCards` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `ListGroup` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `ListItem` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `MarketingLinkComponent` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `MarketingNav` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `MarketingNavLink` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `MediaAssetReferenceAdapter` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `MediaInput` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `MegaMenu` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`, `nevo-ui-0.1`; inspect before porting.
  - `NevoIcon` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `NevoIconGradientDefs` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `NevoIconKey` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Option` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `OtpInput` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Picture` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Region` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `SelectOption` exists in absorbed snapshot(s): `fused-ui-alpha0`, `nevo-ui-0.1`; inspect before porting.
  - `SignaturePad` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `SignerListAdapter` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Source` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `SpatialPreview` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Summary` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `TableColumn` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `TextInput` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`, `nevo-ui-0.1`; inspect before porting.
  - `TextLink` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Toggle` exists in absorbed snapshot(s): `fused-ui-alpha0`, `mom-investor-demo-stage1`, `mom-ui-stage1`, `nevo-ui-0.1`; inspect before porting.
  - `ToolCard` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `TrendChart` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `UiLinkComponent` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `UiLinkProvider` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `VarScope` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `VideoOutput` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Widget` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `themeFamilies` exists in absorbed snapshot(s): `legacy-ui-repository-0.1`, `nevo-ui-0.1`, `reference-ui-0.1`; inspect before porting.
  - `themes` exists in absorbed snapshot(s): `legacy-ui-repository-0.1`, `nevo-ui-0.1`, `reference-ui-0.1`; inspect before porting.
- `@maataa/ui/nevo`: subpath missing; missing names: ActionGroup, Button, Card, EmptyState, EventTypeIcon, IconButton, LoadingState, PageHeader, Pill, Section, Select, Stat, StatusBadge.
  - `ActionGroup` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Button` exists in absorbed snapshot(s): `hybrid-runtime-ui-1.0`, `independent-product-scaffold-0.1`, `mom-investor-demo-stage1`, `mom-ui-stage1`, `nevo-ui-0.1`, `standalone-ui-lib-alpha0`; inspect before porting.
  - `Card` exists in absorbed snapshot(s): `hybrid-runtime-ui-1.0`, `independent-product-scaffold-0.1`, `mom-investor-demo-stage1`, `mom-ui-stage1`, `nevo-ui-0.1`, `standalone-ui-lib-alpha0`; inspect before porting.
  - `EmptyState` exists in absorbed snapshot(s): `fused-ui-alpha0`, `independent-product-scaffold-0.1`, `mom-investor-demo-stage1`, `mom-ui-stage1`, `nevo-ui-0.1`, `standalone-ui-lib-alpha0`; inspect before porting.
  - `EventTypeIcon` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `IconButton` exists in absorbed snapshot(s): `fused-ui-alpha0`, `nevo-ui-0.1`, `standalone-ui-lib-alpha0`; inspect before porting.
  - `LoadingState` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `PageHeader` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Pill` exists in absorbed snapshot(s): `fused-ui-alpha0`, `nevo-ui-0.1`, `standalone-ui-lib-alpha0`; inspect before porting.
  - `Section` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Select` exists in absorbed snapshot(s): `fused-ui-alpha0`, `nevo-ui-0.1`; inspect before porting.
  - `Stat` exists in absorbed snapshot(s): `hybrid-runtime-ui-1.0`, `nevo-ui-0.1`; inspect before porting.
  - `StatusBadge` exists in absorbed snapshot(s): `fused-ui-alpha0`, `legacy-ui-repository-0.1`, `nevo-ui-0.1`, `reference-ui-0.1`, `standalone-ui-lib-alpha0`; inspect before porting.
- `@maataa/ui/wizard`: subpath missing; missing names: NevoWizard, NevoWizardActions, NevoWizardBody, NevoWizardDefaultLayout, NevoWizardHeader, NevoWizardMobileNav, NevoWizardProgress, NevoWizardShell, NevoWizardStep, NevoWizardStepper, NevoWizardSummary, Wizard, WizardMode, WizardPersistenceAdapter, WizardStepDefinition, WizardValidationResult, useNevoWizard.
  - `NevoWizard` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `NevoWizardActions` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `NevoWizardBody` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `NevoWizardDefaultLayout` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `NevoWizardHeader` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `NevoWizardMobileNav` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `NevoWizardProgress` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `NevoWizardShell` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `NevoWizardStep` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `NevoWizardStepper` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `NevoWizardSummary` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `Wizard` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `WizardMode` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `WizardPersistenceAdapter` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `WizardStepDefinition` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `WizardValidationResult` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.
  - `useNevoWizard` exists in absorbed snapshot(s): `nevo-ui-0.1`; inspect before porting.

### MOM web

Scanned 80 distinct named imports across 6 package subpaths. The canonical package has 80 unresolved import/API gaps.

- `@maataa/ui/layouts/universal`: subpath missing; missing names: UniversalGrid, UniversalLayout, UniversalPanel.
  - `UniversalGrid` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `UniversalLayout` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `UniversalPanel` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
- `@maataa/ui`: subpath exists; missing names: AdminKpiCard, GlassPanel, GraphLegend, MetricCard, PageShell, ReleaseBadge, RuntimeActionBar, RuntimeActionGate, RuntimeApprovalCenter, RuntimeApprovalItem, RuntimeApprovalWidget, RuntimeClock, RuntimeDeploymentCenter, RuntimeDeploymentItem, RuntimeEvidenceCenter, RuntimeEvidenceItem, RuntimeHUDMobile, RuntimeHUDNotification, RuntimeHUDOverlay, RuntimeHUDOverlayTab, RuntimeHUDPanelId, RuntimeHUDRail, RuntimeHUDRoleMode, RuntimeHUDStatus, RuntimeHUDStatusBar, RuntimeHUDWidgetProps, RuntimeHealthWidget, RuntimeNotificationCenter, RuntimeObservatoryHUD, RuntimeOperatorWorkspace, RuntimePageShell, RuntimeRouteWidget, RuntimeStatusGrid, RuntimeStatusGridItem, RuntimeTelemetryHUD, RuntimeTelemetryWidget, RuntimeTimeline, RuntimeTopologyHUD, RuntimeTopologyWidget, SectionHeader, SovereignRuntimeProvider, ThemeRuntimeProvider.
  - `AdminKpiCard` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `GlassPanel` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `GraphLegend` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `MetricCard` exists in absorbed snapshot(s): `fused-ui-alpha0`, `independent-product-scaffold-0.1`, `mom-investor-demo-stage1`, `mom-ui-stage1`, `standalone-ui-lib-alpha0`; inspect before porting.
  - `PageShell` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `ReleaseBadge` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeActionBar` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeActionGate` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeApprovalCenter` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeApprovalItem` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeApprovalWidget` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeClock` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeDeploymentCenter` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeDeploymentItem` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeEvidenceCenter` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeEvidenceItem` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDMobile` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDNotification` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDOverlay` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDOverlayTab` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDPanelId` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDRail` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDRoleMode` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDStatus` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDStatusBar` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDWidgetProps` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHealthWidget` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeNotificationCenter` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeObservatoryHUD` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeOperatorWorkspace` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimePageShell` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeRouteWidget` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeStatusGrid` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeStatusGridItem` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTelemetryHUD` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTelemetryWidget` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTimeline` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTopologyHUD` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTopologyWidget` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `SectionHeader` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `SovereignRuntimeProvider` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `ThemeRuntimeProvider` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
- `@maataa/ui/themes`: subpath exists; missing names: ACCESSIBILITY_THEMES, AGE_THEMES, BASE_COLOR_TOKENS, BASE_TYPOGRAPHY_TOKENS, CHAKRA_THEMES, CSSVariableMap, DEVICE_THEMES, NETWORK_THEMES, THEME_FAMILIES, THEME_REGISTRY, ThemeFamily, ThemeId, getThemeById, getThemeFamilies, getThemesByFamily, resolveThemeStack, themeToCSSVariables.
  - `ACCESSIBILITY_THEMES` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `AGE_THEMES` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `BASE_COLOR_TOKENS` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `BASE_TYPOGRAPHY_TOKENS` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `CHAKRA_THEMES` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `CSSVariableMap` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `DEVICE_THEMES` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `NETWORK_THEMES` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `THEME_FAMILIES` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `THEME_REGISTRY` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `ThemeFamily` exists in absorbed snapshot(s): `legacy-ui-repository-0.1`, `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`, `nevo-ui-0.1`, `reference-ui-0.1`; inspect before porting.
  - `ThemeId` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `getThemeById` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `getThemeFamilies` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `getThemesByFamily` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `resolveThemeStack` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `themeToCSSVariables` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
- `@maataa/ui/runtime-observatory`: subpath missing; missing names: RuntimeObservatoryEvidence, loadRuntimeObservatoryEvidence.
  - `RuntimeObservatoryEvidence` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `loadRuntimeObservatoryEvidence` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
- `@maataa/ui/theme`: subpath missing; missing names: RouteThemeBoundary, ThemeNode, applyTheme, loadTheme, restoreTheme, saveTheme.
  - `RouteThemeBoundary` exists in absorbed snapshot(s): `mom-ui-stage1`; inspect before porting.
  - `ThemeNode` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `applyTheme` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `loadTheme` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `restoreTheme` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `saveTheme` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
- `@maataa/ui/app-shell`: subpath missing; missing names: ContextDock, DomainSwitcher, GlobalRuntimeThemeProvider, RuntimeStatusItem, resolveThemeForHostname, useGlobalRuntimeTheme.
  - `ContextDock` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `DomainSwitcher` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `GlobalRuntimeThemeProvider` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeStatusItem` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `resolveThemeForHostname` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `useGlobalRuntimeTheme` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.

### MOM Storybook

Scanned 114 distinct named imports across 2 package subpaths. The canonical package has 115 unresolved import/API gaps.

- `@maataa/ui`: subpath exists; missing names: AdminKpiCard, AmbientGradient, BrandAsset, BrandButton, CinematicHomepage, ContextDock, CosmicCaption, CosmicGrid, DeviceTrustBadge, DharmaQuote, DomainCard, DomainStatusBadge, EcosystemExplorer, EcosystemGraph, FieldShell, FooterDomains, FooterKnowledge, FooterStatus, FooterTrust, GlassPanel, GlowCard, GlowMetric, GlowRing, GraphLegend, HKDDate, HemantSamwatDate, HeroHeading, HoverDepth, Layout, LiveStatusMatrix, MegaMenu, MetricsCard, MobileBottomDock, MobileCommandOverlay, MobileNavigator, MobileQuickActions, MobileRuntimeShell, MobileRuntimeStatus, MotionPanel, Navigation, ObservabilityRuntimeTimeline, OrbitalOverlay, ReleaseBadge, RuntimeActionBar, RuntimeApprovalCenter, RuntimeApprovalWidget, RuntimeBadge, RuntimeBreadcrumbs, RuntimeCard, RuntimeCheckbox, RuntimeClock, RuntimeContainer, RuntimeDataTimeline, RuntimeDeploymentCenter, RuntimeDock, RuntimeEvidenceCenter, RuntimeGlow, RuntimeGrid, RuntimeHUDMobile, RuntimeHUDOverlay, RuntimeHUDRail, RuntimeHUDStatusBar, RuntimeHealth, RuntimeHealthWidget, RuntimeInput, RuntimeMetricCard, RuntimeNotificationCenter, RuntimeObservatoryHUD, RuntimeOperatorWorkspace, RuntimeOrbit, RuntimeOverlay, RuntimePage, RuntimePageShell, RuntimePanel, RuntimeProgress, RuntimePulse, RuntimeReveal, RuntimeRouteWidget, RuntimeSearch, RuntimeSelect, RuntimeShell, RuntimeSidebar, RuntimeStack, RuntimeStat, RuntimeStatus, RuntimeStatusGrid, RuntimeSwitch, RuntimeTable, RuntimeTelemetryHUD, RuntimeTelemetryWidget, RuntimeTextarea, RuntimeTimeline, RuntimeTopbar, RuntimeTopologyHUD, RuntimeTopologyMap, RuntimeTopologyVisualizer, RuntimeTopologyWidget, RuntimeTree, SectionLabel, SovereignFooter, SovereignHeader, SovereignRuntimeProvider, StatusCard, StatusMatrix, ThemeRuntimeProvider, TruthBadge, UniversalContainer, UniversalGrid, UniversalLayout, UniversalPanel, UnlockTrustStrip, themeRegistry.
  - `AdminKpiCard` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `AmbientGradient` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `BrandAsset` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `BrandButton` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `CinematicHomepage` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `ContextDock` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `CosmicCaption` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `CosmicGrid` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `DeviceTrustBadge` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `DharmaQuote` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `DomainCard` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `DomainStatusBadge` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `EcosystemExplorer` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `EcosystemGraph` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `FieldShell` exists in absorbed snapshot(s): `fused-ui-alpha0`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `FooterDomains` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `FooterKnowledge` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `FooterStatus` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `FooterTrust` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `GlassPanel` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `GlowCard` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `GlowMetric` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `GlowRing` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `GraphLegend` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `HKDDate` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `HemantSamwatDate` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `HeroHeading` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `HoverDepth` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `Layout` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `LiveStatusMatrix` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `MegaMenu` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`, `nevo-ui-0.1`; inspect before porting.
  - `MetricsCard` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `MobileBottomDock` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `MobileCommandOverlay` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `MobileNavigator` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `MobileQuickActions` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `MobileRuntimeShell` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `MobileRuntimeStatus` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `MotionPanel` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `Navigation` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `ObservabilityRuntimeTimeline` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `OrbitalOverlay` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `ReleaseBadge` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeActionBar` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeApprovalCenter` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeApprovalWidget` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeBadge` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeBreadcrumbs` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeCard` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeCheckbox` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeClock` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeContainer` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeDataTimeline` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeDeploymentCenter` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeDock` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeEvidenceCenter` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeGlow` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeGrid` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDMobile` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDOverlay` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDRail` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHUDStatusBar` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHealth` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeHealthWidget` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeInput` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeMetricCard` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeNotificationCenter` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeObservatoryHUD` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeOperatorWorkspace` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeOrbit` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeOverlay` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimePage` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimePageShell` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimePanel` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeProgress` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimePulse` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeReveal` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeRouteWidget` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeSearch` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeSelect` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeShell` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeSidebar` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeStack` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeStat` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeStatus` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeStatusGrid` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeSwitch` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTable` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTelemetryHUD` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTelemetryWidget` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTextarea` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTimeline` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTopbar` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTopologyHUD` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTopologyMap` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTopologyVisualizer` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTopologyWidget` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `RuntimeTree` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `SectionLabel` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `SovereignFooter` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `SovereignHeader` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `SovereignRuntimeProvider` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `StatusCard` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `StatusMatrix` exists in absorbed snapshot(s): `independent-product-scaffold-0.1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `ThemeRuntimeProvider` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `TruthBadge` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `UniversalContainer` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `UniversalGrid` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `UniversalLayout` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `UniversalPanel` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `UnlockTrustStrip` exists in absorbed snapshot(s): `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
  - `themeRegistry` exists in absorbed snapshot(s): `maataa-os-ui-alpha1`, `mom-investor-demo-stage1`, `mom-ui-stage1`; inspect before porting.
- `@maataa/ui/ui-system`: subpath missing; missing names: components, foundations.

### MOM 3D exhibition (migrated)

Scanned 2 distinct named imports across 2 package subpaths. All scanned imports resolve through the canonical API.

### Hybrid Next consumer

Scanned 15 distinct named imports across 1 package subpaths. The canonical package has 5 unresolved import/API gaps.

- `@maataa/ui`: subpath exists; missing names: CardContent, ChakraAura, ChakraPulse, ChakraRing, ChakraTimeline.
  - `CardContent` exists in absorbed snapshot(s): `hybrid-runtime-ui-1.0`; inspect before porting.
  - `ChakraAura` exists in absorbed snapshot(s): `hybrid-runtime-ui-1.0`; inspect before porting.
  - `ChakraPulse` exists in absorbed snapshot(s): `hybrid-runtime-ui-1.0`; inspect before porting.
  - `ChakraRing` exists in absorbed snapshot(s): `hybrid-runtime-ui-1.0`; inspect before porting.
  - `ChakraTimeline` exists in absorbed snapshot(s): `hybrid-runtime-ui-1.0`; inspect before porting.

## Port and migration decisions

- MOM 3D Exhibition has moved its `Button` and `Card` imports and global package stylesheet to the canonical package through a local `file:` bridge. Its typecheck, 28 unit tests, production build, and Playwright checks for public routes, theme, and sign-in interaction passed. This bridge is machine-local and is not a distributable release dependency.
- NEVO, MOM web, and MOM Storybook remain on their adapters: the scan shows their unresolved branded/runtime APIs and style entry points. Hybrid Next remains on its consumer copy until a separate adapter and portable distribution path are prepared.
- No external package copy was retired. The MOM package still serves web, Storybook, and other workspaces; the NEVO adapter remains required by its active app. Retirement requires consumer-by-consumer migration plus a verified recovery snapshot.
- Promote neutral, dependency-light capabilities into the canonical package only when active consumers need them. Existing `ButtonGroup`, FAB, LinkButton, Portal, outside-click, media-query, storage, resize/intersection observer, clipboard, pagination, online-status, auto-hide, and scroll-back-to-top implementations already exist in the canonical source; the archived hybrid hook files were empty stubs.
- The neutral additions from this comparison are `Form`, `Fieldset`, and `FieldsetLegend` in the canonical forms surface, plus the dependency-free confirmation action. The plain `Legend` root name remains the existing chart legend; consumer adapters must use `FieldsetLegend` for native form semantics.
- Keep NEVO branded components and wizard behavior behind `@maataa/ui/nevo` and `@maataa/ui/wizard`, with their styles and optional peer dependencies explicit.
- Keep MOM runtime/HUD/theme surfaces in a MOM adapter package that consumes the canonical primitives; they depend on MOM-owned theme/runtime packages and are not neutral UI exports.
- Treat local path linking as a development bridge only. Do not claim a portable consumer migration until the canonical package has an installable, versioned distribution and the consumer builds pass against it.
