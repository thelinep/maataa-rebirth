"use client";

// Epic A1: Theme Registry Authority — unified theme runtime aggregating
// @maataa/themelab + @maataa/theme + locally-authored themes under the
// canonical --runtime-* token contract. PHKD: productionReady = false.
export * from "./theme/index.js";

// App-shell primitives — global runtime providers, auto-hide chrome, FABs,
// domain switcher, context dock, universal search. Canonical --runtime-*
// tokens, SSR-safe, accessibility-conscious.
export * from "./app-shell/index.ts";
export * from "./hud/index.ts";

export * from "./runtime/RuntimeShell.tsx";
export * from "./runtime/RuntimePulse.tsx";
export * from "./runtime/RuntimeOverlay.tsx";
export * from "./runtime/RuntimeStatus.tsx";
export * from "./runtime/telemetry.ts";
export * from "./runtime/SovereignRuntimeProvider.tsx";
export * from "./runtime/ThemeRuntimeProvider.tsx";
export * from "./runtime/TruthBadge.tsx";

export * from "./mobile/MobileRuntimeShell.tsx";
export * from "./mobile/MobileBottomDock.tsx";
export * from "./mobile/MobileCommandOverlay.tsx";
export * from "./mobile/MobileRuntimeStatus.tsx";
export * from "./mobile/MobileQuickActions.tsx";
export * from "./mobile/gestures.ts";
export * from "./mobile/runtime.ts";

export * from "./navigation/SovereignHeader.tsx";
export * from "./navigation/MegaMenu.tsx";
export * from "./navigation/EcosystemExplorer.tsx";
export * from "./navigation/RuntimeSearch.tsx";
export * from "./navigation/MobileNavigator.tsx";
export * from "./navigation/SovereignFooter.tsx";
export * from "./navigation/FooterDomains.tsx";
export * from "./navigation/FooterStatus.tsx";
export * from "./navigation/FooterKnowledge.tsx";
export * from "./navigation/FooterTrust.tsx";

export * from "./homepage/CinematicHomepage.tsx";
export * from "./homepage/CinematicMotion.tsx";
export * from "./homepage/EcosystemGraph.tsx";
export * from "./homepage/LiveStatusMatrix.tsx";

export * from "./typography/HeroHeading.tsx";
export * from "./typography/GlowMetric.tsx";
export * from "./typography/DharmaQuote.tsx";
export * from "./typography/SectionLabel.tsx";
export * from "./typography/RuntimeStat.tsx";
export * from "./typography/CosmicCaption.tsx";

export * from "./surfaces/BrandAsset.tsx";
export * from "./surfaces/BrandButton.tsx";
export * from "./surfaces/GlowCard.tsx";
export * from "./surfaces/GlassPanel.tsx";
export * from "./surfaces/RuntimeCard.tsx";
export * from "./surfaces/DomainCard.tsx";
export * from "./surfaces/StatusCard.tsx";

export * from "./effects/AmbientGradient.tsx";
export * from "./effects/OrbitalOverlay.tsx";
export * from "./effects/CosmicGrid.tsx";
export * from "./effects/GlowRing.tsx";

export * from "./observability/StatusMatrix.tsx";
export { RuntimeTimeline as ObservabilityRuntimeTimeline, type RuntimeTimelineItem as ObservabilityRuntimeTimelineItem } from "./observability/RuntimeTimeline.tsx";
export * from "./observability/MetricsCard.tsx";

export * from "./time/RuntimeClock.tsx";
export * from "./time/HKDDate.tsx";
export * from "./time/HemantSamwatDate.tsx";
export * from "./time/RuntimeTimeline.tsx";

export * from "./layout/RuntimePageShell.tsx";
export * from "./layouts/universal.tsx";
export * from "./status/RuntimeStatusGrid.tsx";
export * from "./forms/FieldShell.tsx";
export * from "./graph/GraphLegend.tsx";
export * from "./release/ReleaseBadge.tsx";
export * from "./devices/DeviceTrustBadge.tsx";
export * from "./radio/UnlockTrustStrip.tsx";
export * from "./domain/DomainStatusBadge.tsx";
export * from "./admin/AdminKpiCard.tsx";
export {
  Layout,
  RuntimePage,
  RuntimeContainer,
  RuntimeGrid,
  RuntimePanel,
  RuntimeStack,
  Navigation,
  RuntimeSidebar,
  RuntimeTopbar,
  RuntimeDock,
  RuntimeBreadcrumbs,
  RuntimeInput,
  RuntimeTextarea,
  RuntimeSelect,
  RuntimeCheckbox,
  RuntimeSwitch,
  RuntimeTable,
  RuntimeDataTimeline,
  RuntimeTree,
  RuntimeTopologyMap,
  RuntimeBadge,
  RuntimeHealth,
  RuntimeMetricCard,
  RuntimeProgress,
  RuntimeReveal,
  RuntimeGlow,
  RuntimeOrbit
} from "./primitives/index.ts";
export * from "./topology/index.ts";

export * from "./types/index.ts";

export * from "./primitives/base-ui.ts";
