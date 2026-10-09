import * as React from "react";
import { MAATAA_WORKSPACE_PROJECTS_KEY, readLocalWorkspaceProjects, type MaataaWorkspaceProject } from "../../apps/shared/maataa-workspace";
const TlpsWorkflow = React.lazy(() => import("./TlpsWorkflow").then(module => ({ default: module.TlpsWorkflow })));
const TlpsSurfaces = React.lazy(() => import("./TlpsSurfaces").then(module => ({ default: module.TlpsSurfaces })));
const ThemeStudio = React.lazy(() => import("./ThemeStudio").then(module => ({ default: module.ThemeStudio })));
const BrandingStudio = React.lazy(() => import("./BrandingStudio").then(module => ({ default: module.BrandingStudio })));
const BrahminiWorkbench = React.lazy(() => import("./BrahminiWorkbench").then(module => ({ default: module.BrahminiWorkbench })));
import { STUDIO_ACTIVE_KEY, applyThemeTokens, parseActiveTheme } from "./themeStudioModel";
import { MaataaReduxProvider } from "@maataa/ui/redux/MaataaReduxProvider";
import { useAutoHideNavbar } from "@maataa/ui/hooks";
import { createMaataaStore } from "@maataa/ui/redux/store";
import { useMaataaDispatch, useMaataaSelector } from "@maataa/ui/redux/hooks";
import { uiActions } from "@maataa/ui/redux/slices/uiSlice";
import { demoActions } from "@maataa/ui/redux/slices/demoSlice";
import { builderActions } from "@maataa/ui/redux/slices/builderSlice";
import {
  selectAI,
  selectDevice,
  selectGenerator,
  selectLayout,
  selectPage,
  selectTool,
  selectUnreadNotificationCount,
  selectUI,
  selectWorkspace,
} from "@maataa/ui/redux/selectors/coreSelectors";
import { selectDemoScenario } from "@maataa/ui/redux/selectors/demoSelectors";
import {
  selectComposerScene,
  selectComposerSelectedBlock,
  selectComposerCanUndo,
  selectComposerCanRedo,
} from "@maataa/ui/redux/selectors/builderSelectors";
import { DEMO_SCENARIOS } from "@maataa/ui/demo/scenarios";
import { DEMO_ROUTES } from "@maataa/ui/demo/routes";
import {
  PUBLIC_SURFACE_DOC_SECTIONS,
  PUBLIC_SURFACE_HELP_TOPICS,
  PUBLIC_SURFACE_ROUTES,
  PUBLIC_SURFACE_SUPPORT_CATEGORIES,
} from "@maataa/ui/demo/publicSurface";
import { DEMO_AGENTS, DEMO_EVALUATIONS } from "@maataa/ui/static-data/demoAI";
import { DEMO_EVENTS } from "@maataa/ui/static-data/demoEvents";
import { DEMO_FINANCE_KPIS } from "@maataa/ui/static-data/demoFinance";
import { DEMO_PROJECTS } from "@maataa/ui/static-data/demoProjects";
import { DEMO_TASKS } from "@maataa/ui/static-data/demoTasks";
import { DEMO_USERS } from "@maataa/ui/static-data/demoUsers";
import { DEMO_IDENTITIES } from "@maataa/ui/static-data/demoIdentities";
import { AI_SPACE_REGISTRY } from "@maataa/ui/registries/aiSpaceRegistry";
import { ACTOR_REGISTRY } from "@maataa/ui/registries/actorRegistry";
import { ATOMIC_COMPONENT_REGISTRY } from "@maataa/ui/registries/atomicComponentRegistry";
import { COMPONENT_REGISTRY } from "@maataa/ui/registries/componentRegistry";
import { DEMO_DATASET_REGISTRY } from "@maataa/ui/registries/demoDatasetRegistry";
import { DEMO_SCENARIO_REGISTRY } from "@maataa/ui/registries/demoScenarioRegistry";
import { DEVICE_REGISTRY } from "@maataa/ui/registries/deviceRegistry";
import { GENERATOR_REGISTRY } from "@maataa/ui/registries/generatorRegistry";
import { ICON_REGISTRY } from "@maataa/ui/registries/iconRegistry";
import { LAYOUT_TYPES } from "@maataa/ui/registries/layoutRegistry";
import { PAGE_TYPES } from "@maataa/ui/registries/pageRegistry";
import { REDUX_SELECTOR_REGISTRY } from "@maataa/ui/registries/reduxSelectorRegistry";
import { REDUX_SLICE_REGISTRY } from "@maataa/ui/registries/reduxSliceRegistry";
import { REGISTRY_REGISTRY } from "@maataa/ui/registries/registryRegistry";
import { TOOL_REGISTRY } from "@maataa/ui/registries/toolRegistry";
import { TYPE_CONTRACT_REGISTRY } from "@maataa/ui/registries/typeContractRegistry";
import { WORKSPACE_TYPES } from "@maataa/ui/registries/workspaceRegistry";
import { Button } from "@maataa/ui/actions/Button";
import { Input } from "@maataa/ui/forms/Input";
import { Modal, Drawer } from "@maataa/ui/surfaces";
import { Combobox } from "@maataa/ui/forms";
import { Card } from "@maataa/ui/surfaces/Card";
import { Badge } from "@maataa/ui/feedback/Badge";
import { EmptyState, ErrorState, Skeleton } from "@maataa/ui/feedback";
import { Tabs } from "@maataa/ui/navigation/Tabs";
import { SmartphoneFrame } from "@maataa/ui/devices/SmartphoneFrame";
import { DeviceSurface } from "@maataa/ui/devices/DeviceSurface";
import { IdentityAvatar } from "@maataa/ui/identity/IdentityAvatar";
import { IdentityAvatarGroup } from "@maataa/ui/identity/IdentityAvatarGroup";
import { IdentityBadge } from "@maataa/ui/identity/IdentityBadge";
import { MaataaIcon, type MaataaIconName } from "@maataa/ui/icons/MaataaIcon";
import { ActualComponentPreview } from "./ActualComponentPreview";
import { ComponentPropInspector, VisualComposer, parseCompositionInput } from "@maataa/ui/composer";
import { CanonicalCompositionRuntime, ResponsiveDeviceRuntime } from "@maataa/ui/runtime";
import { createPageSpecimen } from "./pageSpecimens";
import { createProductPageSlice, type ProductPageContext } from "./productPageSlices";
import { createWorkspaceDataSlice } from "./workspaceDataSlices";
import { createLayoutDataSlice } from "./layoutDataSlices";
import { createAISpaceDataSlice, createDeviceDataSlice, createGeneratorDataSlice, createToolDataSlice } from "./catalogDataSlices";
import { createRecordCatalogDataSlice, type RecordCatalogKind } from "./recordCatalogDataSlices";
import { DemoExperience } from "./DemoExperiences";
import { deleteComposition, duplicateComposition, emptyCompositionLibrary, loadCompositionLibrary, restoreCompositionRevision, saveComposition, writeCompositionLibrary, type CompositionLibraryV1 } from "./compositionLibrary";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

type AnyRecord = Record<string, unknown>;
type DemoLocale = "en-IN" | "hi-IN";
type DemoTheme = "light" | "dark" | "system" | "high-contrast" | "oled";
const SHELL_COPY: Record<DemoLocale, Record<string, string>> = {
  "en-IN": {
    settings: "Settings", appearance: "Appearance", theme: "Theme", language: "Language",
    dark: "Dark", light: "Light", system: "System", highContrast: "High contrast", oled: "OLED black", english: "English (India)", hindi: "हिन्दी (भारत)",
    scope: "Shared navigation and settings are translated. Catalog and product copy remains in its authored language.",
    menu: "Menu", playground: "Playground", openDemo: "Open demo", home: "MAATAA UI home",
    landing: "Home", surface: "Full Surface", sandbox: "Sandbox", demos: "Demos", docs: "Docs", help: "Help", support: "Support",
    footer: "Registry-driven, atomic, host-neutral React UI vocabulary.",
  },
  "hi-IN": {
    settings: "सेटिंग्स", appearance: "रूप-रंग", theme: "थीम", language: "भाषा",
    dark: "डार्क", light: "लाइट", system: "सिस्टम", highContrast: "हाई कॉन्ट्रास्ट", oled: "OLED ब्लैक", english: "English (India)", hindi: "हिन्दी (भारत)",
    scope: "नेविगेशन और सेटिंग्स का अनुवाद उपलब्ध है। कैटलॉग और उत्पाद सामग्री अपनी मूल भाषा में है।",
    menu: "मेनू", playground: "प्लेग्राउंड", openDemo: "डेमो खोलें", home: "MAATAA UI होम",
    landing: "होम", surface: "फुल सरफेस", sandbox: "सैंडबॉक्स", demos: "डेमो", docs: "दस्तावेज़", help: "सहायता", support: "सपोर्ट",
    footer: "रजिस्ट्री-आधारित, atomic और host-neutral React UI vocabulary.",
  },
};
const HINDI_ROUTE_LABELS: Record<string, string> = {
  "PUBLIC_SURFACE.LANDING": "होम", "PUBLIC_SURFACE.SURFACE": "फुल सरफेस",
  "PUBLIC_SURFACE.PLAYGROUND": "प्लेग्राउंड", "PUBLIC_SURFACE.SANDBOX": "सैंडबॉक्स",
  "PUBLIC_SURFACE.DEMOS": "डेमो", "PUBLIC_SURFACE.DOCS": "दस्तावेज़",
  "PUBLIC_SURFACE.HELP": "सहायता", "PUBLIC_SURFACE.SUPPORT": "सपोर्ट",
};
type CatalogItem = { id: string; name: string; meta?: string; importPath?: string; ordinal?: number; groupId?: string; groupKey?: string; groupLabel?: string };
type Catalog = { key: string; label: string; description: string; items: readonly CatalogItem[] };
const ROUTE_ICONS: Record<string, MaataaIconName> = {
  "PUBLIC_SURFACE.LANDING":"home",
  "PUBLIC_SURFACE.SURFACE":"surface",
  "PUBLIC_SURFACE.PLAYGROUND":"playground",
  "PUBLIC_SURFACE.SANDBOX":"sandbox",
  "PUBLIC_SURFACE.DEMOS":"demos",
  "PUBLIC_SURFACE.DOCS":"docs",
  "PUBLIC_SURFACE.HELP":"help",
  "PUBLIC_SURFACE.SUPPORT":"support"
};

function normalize(items: readonly AnyRecord[], nameKeys: string[] = ["name"]): CatalogItem[] {
  return items.map((item, index) => {
    const id = String(item.id ?? `ITEM.${index + 1}`);
    const key = nameKeys.find((candidate) => typeof item[candidate] === "string");
    const name = key ? String(item[key]) : id;
    const group = item.groupLabel ?? item.group ?? item.groupKey ?? item.category ?? item.kind ?? item.module ?? item.reducerKey;
    return {
      id,
      name,
      meta: group ? String(group) : undefined,
      importPath: typeof item.importPath === "string" ? item.importPath : undefined,
      ordinal: typeof item.ordinal === "number" ? item.ordinal : index + 1,
      groupId: typeof item.groupId === "string" ? item.groupId : "CATALOG",
      groupKey: typeof item.groupKey === "string" ? item.groupKey : undefined,
      groupLabel: typeof item.groupLabel === "string" ? item.groupLabel : (group ? String(group) : "MAATAA UI"),
    };
  });
}

const CATALOGS: readonly Catalog[] = [
  { key: "identities", label: "Identities", description: "Symbolic Brahmini, Shiv, Parvati, Saptarishi and Panchtatva demo identities.", items: normalize(ACTOR_REGISTRY as readonly AnyRecord[], ["name"]) },
  { key: "icons", label: "Icons", description: "Core MAATAA vector icon vocabulary used by the demo surface.", items: normalize(ICON_REGISTRY as readonly AnyRecord[], ["name"]) },
  { key: "components", label: "Components", description: "All public component declarations.", items: normalize(COMPONENT_REGISTRY as readonly AnyRecord[]) },
  { key: "atoms", label: "Atomic components", description: "Lowest directly importable UI parts.", items: normalize(ATOMIC_COMPONENT_REGISTRY as readonly AnyRecord[]) },
  { key: "pages", label: "Pages", description: "Canonical page-purpose types.", items: normalize(PAGE_TYPES as readonly AnyRecord[]) },
  { key: "workspaces", label: "Workspaces", description: "Persistent operational workspace types.", items: normalize(WORKSPACE_TYPES as readonly AnyRecord[]) },
  { key: "layouts", label: "Layouts", description: "Reusable structural layout archetypes.", items: normalize(LAYOUT_TYPES as readonly AnyRecord[]) },
  { key: "devices", label: "Devices", description: "Device definitions and preview frames.", items: normalize(DEVICE_REGISTRY as readonly AnyRecord[]) },
  { key: "generators", label: "Generators", description: "Artifact-generation UI vocabulary.", items: normalize(GENERATOR_REGISTRY as readonly AnyRecord[]) },
  { key: "tools", label: "Tools", description: "Operational and AI tool UI vocabulary.", items: normalize(TOOL_REGISTRY as readonly AnyRecord[]) },
  { key: "ai", label: "AI spaces", description: "AI coding, creative, business, MAATAA and command-center spaces.", items: normalize(AI_SPACE_REGISTRY as readonly AnyRecord[]) },
  { key: "registries", label: "Registries", description: "Registry Registry and governed catalogs.", items: normalize(REGISTRY_REGISTRY as readonly AnyRecord[]) },
  { key: "redux", label: "Redux slices", description: "Typed Redux Toolkit state domains.", items: normalize(REDUX_SLICE_REGISTRY as readonly AnyRecord[]) },
  { key: "selectors", label: "Redux selectors", description: "Typed derived-state selectors.", items: normalize(REDUX_SELECTOR_REGISTRY as readonly AnyRecord[]) },
  { key: "types", label: "Type contracts", description: "Shared TypeScript contract modules.", items: normalize(TYPE_CONTRACT_REGISTRY as readonly AnyRecord[], ["module", "name"]) },
  { key: "datasets", label: "Static datasets", description: "Deterministic demo datasets.", items: normalize(DEMO_DATASET_REGISTRY as readonly AnyRecord[]) },
  { key: "scenarios", label: "Demo scenarios", description: "Registered deterministic demo scenarios.", items: normalize(DEMO_SCENARIO_REGISTRY as readonly AnyRecord[], ["scenarioId", "name"]) },
];

function useHashRoute() {
  const read = React.useCallback(() => {
    const raw = window.location.hash.replace(/^#/, "");
    return raw || "/";
  }, []);
  const [route, setRoute] = React.useState(read);
  React.useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, [read]);
  const navigate = React.useCallback((path: string) => {
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return [route, navigate] as const;
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return <div className="metric-card"><strong>{value}</strong><span>{label}</span></div>;
}

function SectionHeading({ kicker, title, body }: { kicker: string; title: string; body?: string }) {
  return <div className="section-heading"><div className="demo-kicker">{kicker}</div><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  return <button type="button" className="copy-button" onClick={copy}>{copied ? "Copied" : label}</button>;
}

function CodeBlock({ code, label = "Code" }: { code: string; label?: string }) {
  return <div className="code-block"><div className="code-block-head"><span>{label}</span><CopyButton text={code}/></div><pre><code>{code}</code></pre></div>;
}

function Shell({ route, navigate, children }: { route: string; navigate: (path: string) => void; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const { isHidden: navbarHidden, reveal: revealNavbar } = useAutoHideNavbar({ enabled: !open && !settingsOpen });
  const dispatch = useMaataaDispatch();
  const ui = useMaataaSelector(selectUI);
  const locale: DemoLocale = ui.locale === "hi-IN" ? "hi-IN" : "en-IN";
  const copy = SHELL_COPY[locale];
  const [systemDark, setSystemDark] = React.useState(() => typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches === true);
  const theme: DemoTheme = ui.theme === "light" || ui.theme === "dark" || ui.theme === "high-contrast" || ui.theme === "oled" ? ui.theme : "system";
  const resolvedTheme = theme === "system" ? (systemDark ? "dark" : "light") : theme;
  React.useEffect(() => {
    const query = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!query) return;
    const update = () => setSystemDark(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);
  React.useEffect(() => {
    document.documentElement.dataset.maataaTheme = resolvedTheme;
    document.documentElement.lang = locale;
    return () => { delete document.documentElement.dataset.maataaTheme; document.documentElement.lang = "en"; };
  }, [resolvedTheme, locale]);
  React.useEffect(() => {
    if (!settingsOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSettingsOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [settingsOpen]);
  const routeLabel = (id: string, label: string) => locale === "hi-IN" ? HINDI_ROUTE_LABELS[id] ?? label : label;
  return <div className="site-shell" data-demo-theme={resolvedTheme} data-locale={locale} data-maataa-demo-ready="true">
    <header className="site-header" data-hidden={navbarHidden ? "true" : undefined} onFocusCapture={revealNavbar}>
      <button className="brand-button" onClick={() => navigate("/")} aria-label={copy.home}>
        <IdentityAvatar identity="IDENTITY.BRAHMINI" size={34}/><span><strong>MAATAA UI</strong><small>Alpha 8</small></span>
      </button>
      <div className="global-preferences">
        <button className="preferences-trigger" aria-label={copy.settings} aria-expanded={settingsOpen} aria-controls="global-preferences-panel" onClick={() => setSettingsOpen((value) => !value)}><MaataaIcon name="settings"/><span>{copy.settings}</span></button>
        <div className="preferences-panel" id="global-preferences-panel" role="group" aria-label={copy.settings} hidden={!settingsOpen}>
          <strong>{copy.appearance} &amp; {copy.language}</strong>
          <label>{copy.theme}<select aria-label={copy.theme} value={theme} onChange={(event) => dispatch(uiActions.setTheme(event.target.value as DemoTheme))}><option value="system">{copy.system}</option><option value="dark">{copy.dark}</option><option value="light">{copy.light}</option><option value="high-contrast">{copy.highContrast}</option><option value="oled">{copy.oled}</option></select></label>
          <label>{copy.language}<select aria-label={copy.language} value={locale} onChange={(event) => dispatch(uiActions.setLocale(event.target.value))}><option value="en-IN">{copy.english}</option><option value="hi-IN">{copy.hindi}</option></select></label>
          <p>{copy.scope}</p>
        </div>
      </div>
      <button className="nav-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open}><MaataaIcon name="menu"/> {copy.menu}</button>
      <nav className="site-nav" data-open={open} aria-label="Primary navigation">
        {PUBLIC_SURFACE_ROUTES.map((item) => <button key={item.id} data-active={route === item.path || (item.path !== "/" && route.startsWith(item.path))} onClick={() => { navigate(item.path); setOpen(false); }}><MaataaIcon name={ROUTE_ICONS[item.id] ?? "page"}/><span>{routeLabel(item.id, item.label)}</span></button>)}
        <button data-active={route.startsWith("/theme-studio")} onClick={() => { navigate("/theme-studio"); setOpen(false); }}><MaataaIcon name="settings"/><span>Theme Studio</span></button>
        <button data-active={route.startsWith("/branding-studio")} onClick={() => { navigate("/branding-studio"); setOpen(false); }}><MaataaIcon name="star"/><span>Branding Studio</span></button>
        <button data-active={route.startsWith("/tlps")} onClick={() => { navigate("/tlps"); setOpen(false); }}>TLPS</button>
      </nav>
      <div className="header-actions"><button className="ghost-button" onClick={() => navigate("/playground")}><MaataaIcon name="playground"/> {copy.playground}</button><button className="gold-button" onClick={() => navigate("/demos")}><MaataaIcon name="demos"/> {copy.openDemo}</button></div>
    </header>
    <main>{children}</main>
    {!route.startsWith("/brahmini") && !route.startsWith("/tlps") && <button className="brahmini-global-trigger" type="button" onClick={() => navigate(`/brahmini?from=${encodeURIComponent(route)}`)} aria-label="Open Brahmini help and product assistant"><IdentityAvatar identity="IDENTITY.BRAHMINI" size={30}/><span>Brahmini</span></button>}
    <footer className="site-footer">
      <div><strong>MAATAA UI</strong><p>{copy.footer}</p></div>
      <div className="footer-links">{PUBLIC_SURFACE_ROUTES.map((item) => <button key={item.id} onClick={() => navigate(item.path)}>{routeLabel(item.id, item.label)}</button>)}</div>
      <div className="demo-muted">Demo data only · no live backend authority</div>
    </footer>
  </div>;
}

function Landing({ navigate }: { navigate: (path: string) => void }) {
  const [sharedProjects, setSharedProjects] = React.useState<MaataaWorkspaceProject[]>(readLocalWorkspaceProjects);
  React.useEffect(() => {
    const refresh = () => setSharedProjects(readLocalWorkspaceProjects());
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);
  const continueProject = (project: MaataaWorkspaceProject) => {
    if (window.parent === window) return;
    window.parent.postMessage({ type: "maataa:desktop:open-product-workspace", product: project.product }, window.location.origin);
  };
  return <>
    <section className="hero-section">
      <div className="hero-copy">
        <div className="demo-kicker">Atomic UI · live previews · playground · sandbox</div>
        <h1>One UI system for every MAATAA surface.</h1>
        <p>Components, layouts, pages, workspaces, devices, AI spaces, generators, tools, Redux state and static demo data—now with an interactive visual explorer and copyable code.</p>
        <div className="hero-actions"><button className="gold-button large" onClick={() => navigate("/surface")}>Explore live surface</button><button className="ghost-button large" onClick={() => navigate("/playground")}>Open Playground</button><button className="ghost-button large" onClick={() => navigate("/sandbox")}>Open Sandbox</button></div>
        <div className="hero-proof"><span>React 19</span><span>TypeScript</span><span>Redux Toolkit</span><span>Live canvas</span><span>Copy code</span></div>
      </div>
      <div className="hero-visual" aria-label="MAATAA UI architecture preview">
        <div className="architecture-stack">
          {['Registry Registry','Workspace / AI Space','Page','Layout','Region / Slot','Generator / Tool','Component','Atom'].map((label, index) => <div key={label} style={{'--depth': index} as React.CSSProperties}><span>{label}</span></div>)}
        </div>
      </div>
    </section>

    <section className="content-section current-work-section" aria-labelledby="current-work-title">
      <div className="current-work-heading"><h2 id="current-work-title">Current projects and pilots</h2><p>See what is being built, what has only been rehearsed locally, and what still needs an owner or test environment.</p></div>
      <div className="current-work-grid">
        <section className="current-work-column" aria-labelledby="current-projects-title">
          <h3 id="current-projects-title">Projects</h3>
          <article className="current-work-row">
            <div><div className="current-work-title-line"><h4>MAATAA UI</h4><span className="work-status work-status-active">In development</span></div><p>Shared React UI package, explorer, theme tools, composition and demo surfaces.</p></div>
            <button className="text-link" onClick={() => navigate("/surface")}>Explore UI →</button>
          </article>
          <article className="current-work-row">
            <div><div className="current-work-title-line"><h4>Brahmini Workbench</h4><span className="work-status">Planning prototype</span></div><p>Provider-backed agent discussions and product drafts. Repository edits and test execution are not connected yet.</p></div>
            <button className="text-link" onClick={() => navigate("/brahmini")}>Open Brahmini →</button>
          </article>
          {sharedProjects.map(project => <article className="current-work-row" key={project.id}>
            <div><div className="current-work-title-line"><h4>{project.title}</h4><span className="work-status">{project.sample ? "Example" : "Saved locally"}</span></div><p>{project.product === "tlps" ? "TLPS" : "TLP Film"} · {project.projectType || "Project"} · shared from this Desktop.</p></div>
            {window.parent !== window && <button className="text-link" onClick={() => continueProject(project)}>Continue →</button>}
          </article>)}
        </section>
        <section className="current-work-column" aria-labelledby="current-pilots-title">
          <h3 id="current-pilots-title">Pilots</h3>
          <article className="current-work-row">
            <div><div className="current-work-title-line"><h4>TLPS production planning</h4><span className="work-status work-status-ready">Local rehearsal done</span></div><p>Local workflow checks passed. The real pilot has not started; test tenant and named participants are still needed.</p></div>
            <button className="text-link" onClick={() => navigate("/tlps-workflow")}>Open TLPS workflow →</button>
          </article>
          <article className="current-work-row">
            <div><div className="current-work-title-line"><h4>NEVO Events</h4><span className="work-status work-status-pending">Proposed</span></div><p>Local planning demo only. An accountable owner and isolated test tenant are still needed for a pilot.</p></div>
            <button className="text-link" onClick={() => navigate("/demo/nevo")}>Open NEVO demo →</button>
          </article>
        </section>
      </div>
      <p className="current-work-boundary">Pilot status is based on local project records. No live TLPS or NEVO tenant was used for these demos.</p>
    </section>

    <section className="content-section">
      <SectionHeading kicker="Live system" title="Preview, change, compose, copy" body="The demo host now exposes real visual work surfaces rather than text-only inventory." />
      <div className="feature-grid">
        <article className="feature-card"><span>01</span><h3>Full Surface</h3><strong>Live three-pane explorer</strong><p>Select a registry record, inspect a visual specimen, and copy its ID, import path, or generated example.</p><button className="text-link" onClick={() => navigate('/surface')}>Explore →</button></article>
        <article className="feature-card"><span>02</span><h3>Playground</h3><strong>Interactive real components</strong><p>Change theme, density, radius and viewport width while interacting with package-owned Button, Input, Card, Badge and Tabs.</p><button className="text-link" onClick={() => navigate('/playground')}>Play →</button></article>
        <article className="feature-card"><span>03</span><h3>Sandbox</h3><strong>Safe composition builder</strong><p>Add and remove regions, edit JSON configuration, apply it without eval, and copy generated JSX or JSON.</p><button className="text-link" onClick={() => navigate('/sandbox')}>Compose →</button></article>
        <article className="feature-card"><span>04</span><h3>Demo scenarios</h3><strong>{DEMO_SCENARIOS.length} Redux scenarios</strong><p>Switch complete deterministic workspace/page/layout/device compositions and inspect supporting static data.</p><button className="text-link" onClick={() => navigate('/demos')}>Run →</button></article>
        <article className="feature-card"><span>05</span><h3>Theme Studio</h3><strong>Design tokens, live</strong><p>Build typography, color, surface, shadow, motion and focus systems, then preview, save and export them.</p><button className="text-link" onClick={() => navigate('/theme-studio')}>Design →</button></article>
        <article className="feature-card"><span>06</span><h3>Branding Studio</h3><strong>One reviewable brand workflow</strong><p>Map identity sources, refine candidate tokens, preview components, review versions and prepare product assignments.</p><button className="text-link" onClick={() => navigate('/branding-studio')}>Open studio →</button></article>
      </div>
    </section>

    <section className="content-section">
      <SectionHeading kicker="System scale" title="Full surface, one canonical vocabulary" body="The live site reads the same canonical catalogs used by the package and Redux demo." />
      <div className="metrics-grid">
        <Stat value={COMPONENT_REGISTRY.length} label="components"/><Stat value={PAGE_TYPES.length} label="page types"/><Stat value={WORKSPACE_TYPES.length} label="workspaces"/><Stat value={LAYOUT_TYPES.length} label="layouts"/><Stat value={DEVICE_REGISTRY.length} label="devices"/><Stat value={TOOL_REGISTRY.length} label="tools"/><Stat value={GENERATOR_REGISTRY.length} label="generators"/><Stat value={AI_SPACE_REGISTRY.length} label="AI spaces"/>
      </div>
    </section>

    <section className="content-section identity-showcase"><div className="section-heading"><h2>Named roles that do real product work</h2><p>Each identity maps to an executable agent role in Brahmini Workbench: research, architecture, experience, engineering, quality, governance, operations, data, platform and communications.</p></div><div className="identity-showcase-grid">{DEMO_IDENTITIES.map((identity)=><article key={identity.id}><IdentityAvatar identity={identity.id} size={58}/><div><strong>{identity.name}</strong><span>{identity.title}</span><small>{identity.demoRole}</small></div></article>)}</div><p className="demo-muted">Agent roles act only when you start a run. They use the provider assigned in Brahmini Workbench; proposals do not edit or deploy the product.</p><button className="gold-button" onClick={()=>navigate("/brahmini?from=%2F")}>Open Brahmini Workbench</button></section>

    <section className="content-section final-cta"><div><div className="demo-kicker">Start building</div><h2>Use MAATAA UI as a package, a visual reference, or a living composition laboratory.</h2></div><div className="hero-actions"><button className="ghost-button" onClick={() => navigate("/docs")}>Read docs</button><button className="gold-button" onClick={() => navigate("/playground")}>Launch Playground</button></div></section>
  </>;
}

function LayoutPreview({ item }: { item: CatalogItem }) {
  const slice = createLayoutDataSlice({
    id: item.id,
    name: item.name,
    ordinal: item.ordinal ?? 1,
    groupKey: item.groupKey ?? "",
    importPath: item.importPath ?? "",
  });
  return <div className="layout-preview" data-layout-id={item.id} data-layout-slice={slice.domain} data-layout-reference={slice.reference}>
    <div className="lp-header"><span>{slice.title}</span><small>SYNTHETIC LAYOUT DATA · {slice.domain.toUpperCase()}</small></div>
    <p className="layout-slice-summary">{slice.summary}</p>
    <div className="layout-regions" style={{ gridTemplateColumns: slice.columns }}>
      {slice.regions.map((region) => <section className="layout-region" data-layout-region={region.title} key={region.title}>
        <h4>{region.title}</h4><p>{region.label}</p><strong>{region.value}</strong><span>{region.note}</span>
      </section>)}
    </div>
    <footer className="layout-slice-footer"><span>{slice.provenance} · {slice.boundary}</span><code>{slice.reference}</code></footer>
  </div>;
}

function PagePreview({ item, dataContext }: { item: CatalogItem; dataContext: ProductPageContext }) {
  const specimen = createPageSpecimen({
    id: item.id,
    name: item.name,
    ordinal: item.ordinal ?? 1,
    groupId: item.groupId ?? "CATALOG",
    groupKey: item.groupKey ?? "",
    groupLabel: item.groupLabel ?? item.meta ?? "MAATAA UI",
  });
  const slice = createProductPageSlice({
    id: item.id,
    name: item.name,
    ordinal: item.ordinal ?? 1,
    groupId: item.groupId ?? "CATALOG",
    groupKey: item.groupKey ?? "",
    groupLabel: item.groupLabel ?? item.meta ?? "MAATAA UI",
  }, dataContext);
  return <article className="page-preview" data-page-id={specimen.id} data-page-kind={specimen.kind}>
    <header className="preview-page-head"><div><small>SYNTHETIC PAGE SPECIMEN · {specimen.groupLabel}</small><h3>{specimen.heading}</h3><p>{specimen.purpose}</p><code>{specimen.id}</code></div><span className="page-specimen-action">Illustrative action · {specimen.action}</span></header>
    {slice?.mapped ? <section className="product-page-slice" data-product-slice={slice.product} data-product-domain={slice.domain}>
      <div className="product-slice-heading"><small>{slice.product} · SYNTHETIC DATA SLICE</small><h4>{slice.title}</h4><p>{slice.summary}</p></div>
      <div className="product-slice-rows">{slice.rows.map((row) => <article key={row.label}><small>{row.label}</small><strong>{row.value}</strong><span>{row.note}</span></article>)}</div>
      <footer className="page-specimen-boundary"><span>{specimen.boundary}</span><code>{slice.reference}</code></footer>
    </section> : <>
      {slice && <aside className="product-slice-unmapped" data-product-slice-unmapped={slice.product}><strong>{slice.title}</strong><span>{slice.summary}</span><code>{slice.reference}</code></aside>}
      <div className="page-specimen-metrics">{specimen.metrics.map((metric) => <div className="page-specimen-metric" key={metric.label}><small>{metric.label}</small><strong>{metric.value}</strong></div>)}</div>
      <div className="page-specimen-sections" data-page-kind={specimen.kind}>{specimen.sections.map((section) => <section className="page-specimen-section" key={section.reference}><h4>{section.title}</h4><p>{section.detail}</p><code>{section.reference}</code></section>)}</div>
      <footer className="page-specimen-boundary"><span>{specimen.boundary}</span><code>FIXTURE {specimen.reference}</code></footer>
    </>}
  </article>;
}

function WorkspacePreview({ item }: { item: CatalogItem }) {
  const slice = createWorkspaceDataSlice({
    ordinal: item.ordinal ?? 1,
    id: item.id,
    name: item.name,
    groupId: item.groupId ?? "W00",
    groupKey: item.groupKey ?? "",
    groupLabel: item.groupLabel ?? item.meta ?? "Workspace",
  });
  return <div className="workspace-preview" data-workspace-id={item.id} data-workspace-slice={slice.domain}>
    <div className="ws-rail" aria-hidden="true"><MaataaIcon name="home"/><MaataaIcon name="workspace"/><MaataaIcon name="settings"/></div>
    <div className="ws-shell">
      <header className="ws-top"><div><strong>{item.name}</strong><p>{slice.title} · {slice.summary}</p></div></header>
      <nav className="ws-toolbar" aria-label="Illustrative workspace sections">{slice.navigation.map((label) => <span key={label}>{label}</span>)}</nav>
      <div className="ws-grid">{slice.sections.map((section) => <section className="workspace-sample-section" key={section.title}><h4>{section.title}</h4><ul>{section.lines.map((line) => <li key={line}>{line}</li>)}</ul></section>)}</div>
      <footer className="workspace-slice-footer"><span><strong>{slice.provenance}</strong> · {slice.boundary}</span><code>{slice.reference}</code></footer>
    </div>
  </div>;
}

function ComponentPreview({ item, overrides }: { item: CatalogItem; overrides?: Record<string, unknown> }) {
  return <ActualComponentPreview item={item} overrides={overrides}/>;
}

function IdentityPreview({ item }: { item: CatalogItem }) {
  const identity = DEMO_IDENTITIES.find((entry) => entry.id === item.id) ?? DEMO_IDENTITIES[0];
  return <div className="identity-preview"><div className="identity-hero"><IdentityAvatar identity={identity.id} size={112}/><div><small>DEMO IDENTITY</small><h3>{identity.name}</h3><strong>{identity.title}</strong><p>{identity.description}</p><Badge tone="info">{identity.family}</Badge></div></div><div className="identity-team"><strong>Identity constellation</strong><IdentityAvatarGroup identities={DEMO_IDENTITIES.map((entry) => entry.id)} size={42} max={15}/></div><div className="state-tree"><div><span>Canonical ID</span><strong>{identity.id}</strong></div><div><span>Demo role</span><strong>{identity.demoRole}</strong></div><div><span>Motif</span><strong>{identity.motif}</strong></div></div></div>;
}

function IconPreview({ item }: { item: CatalogItem }) {
  const iconName = item.name as MaataaIconName;
  return <div className="icon-preview"><div className="icon-hero"><span className="icon-hero-mark"><MaataaIcon name={iconName} size={72}/></span><div><small>MAATAA CORE ICON</small><h3>{item.name}</h3><code>{item.id}</code></div></div><div className="icon-size-row">{[16,20,24,32,48].map((size)=><div key={size}><MaataaIcon name={iconName} size={size}/><span>{size}px</span></div>)}</div><div className="icon-context-row"><button><MaataaIcon name={iconName}/> Action</button><span><MaataaIcon name={iconName}/> Navigation</span><Badge><MaataaIcon name={iconName} size={13}/> status</Badge></div></div>;
}

function DevicePreview({ item }: { item: CatalogItem }) {
  const definition = DEVICE_REGISTRY.find((device) => device.id === item.id);
  const slice = definition ? createDeviceDataSlice(definition) : undefined;
  const sourceWidth = slice?.width ?? 390;
  const sourceHeight = slice?.height ?? 844;
  const scale = Math.min(1, 720 / sourceWidth, 440 / sourceHeight);
  const viewWidth = Math.max(1, Math.round(sourceWidth * scale));
  const viewHeight = Math.max(1, Math.round(sourceHeight * scale));
  return <div className="device-preview-stage" data-device-id={item.id} data-device-slice={slice?.domain} data-device-reference={slice?.reference}>
    <div className="device-preview-meta"><strong>{item.name}</strong><span>Simulated viewport · {slice?.viewportName ?? "unmapped viewport"} · {sourceWidth} × {sourceHeight}</span><span>Inputs · {slice?.inputModalities.join(", ") ?? "not declared"}</span><span>Safe area · {slice?.safeArea ?? "not declared"}</span><span>Capabilities · {slice?.capabilities.join(", ") ?? "not declared"}</span></div>
    {definition ? <DeviceSurface deviceId={item.id} name={item.name} viewportWidth={viewWidth} viewportHeight={viewHeight} orientation={definition.defaultOrientation as "portrait" | "landscape"} label="Synthetic viewport specimen">
      <div className="device-sample-content"><small>SYNTHETIC DEVICE DATA · {slice!.family}</small><h3>{slice!.title}</h3><p>{slice!.summary}</p><div className="device-sample-row">{slice!.regions.map((region) => <span key={region.title}><strong>{region.title}</strong>{region.value}</span>)}</div></div>
    </DeviceSurface> : <p className="demo-muted">No device record is registered for this selection.</p>}
    {slice && <footer className="catalog-slice-footer"><span>{slice.provenance} · {slice.boundary}</span><code>{slice.reference}</code></footer>}
  </div>;
}

function GeneratorPreview({ item }: { item: CatalogItem }) {
  const slice = createGeneratorDataSlice(item.id);
  const [brief, setBrief] = React.useState(slice.initialInput);
  React.useEffect(() => setBrief(slice.initialInput), [item.id]);
  return <div className="tool-preview catalog-slice-preview" data-generator-id={item.id} data-generator-slice={slice.domain} data-generator-reference={slice.reference}>
    <div className="tool-preview-head"><Badge tone="info">SYNTHETIC GENERATOR DATA · {slice.family}</Badge><h3>{slice.title}</h3></div>
    <p className="catalog-slice-summary">{slice.summary}</p>
    <label>{slice.inputLabel}<Input value={brief} onChange={(event) => setBrief(event.target.value)}/></label>
    <div className="generated-artifact"><small>LOCAL OUTLINE · NO PROVIDER CALLED</small><strong>{brief || "Enter a brief to update this local outline"}</strong><p>{slice.outputShape}</p></div>
    <footer className="catalog-slice-footer"><span>{slice.provenance} · {slice.boundary}</span><code>{slice.reference}</code></footer>
  </div>;
}

function ToolPreview({ item }: { item: CatalogItem }) {
  const slice = createToolDataSlice(item.id);
  return <div className="tool-preview catalog-slice-preview" data-tool-id={item.id} data-tool-slice={slice.domain} data-tool-reference={slice.reference}>
    <div className="tool-preview-head"><Badge tone="warning">SYNTHETIC TOOL DATA · {slice.family}</Badge><h3>{slice.title}</h3></div>
    <p className="catalog-slice-summary">{slice.summary}</p>
    <div className="tool-call"><div><small>ILLUSTRATIVE INPUT · NOT SENT</small><code>{slice.input}</code></div><span aria-hidden="true">→</span><div><small>NON-EXECUTED OUTPUT SHAPE</small><code>{slice.output}</code></div></div>
    <div className="tool-boundary"><strong>Not executed</strong><span>{slice.boundary}</span></div>
    <footer className="catalog-slice-footer"><span>{slice.provenance} · No permission is granted by this preview.</span><code>{slice.reference}</code></footer>
  </div>;
}

function AiPreview({ item }: { item: CatalogItem }) {
  const slice = createAISpaceDataSlice(item.id);
  return <div className="ai-preview catalog-slice-preview" data-ai-space-id={item.id} data-ai-space-slice={slice.domain} data-ai-space-reference={slice.reference}>
    <aside className="ai-sidebar"><small>SYNTHETIC AI-SPACE DATA · {slice.family}</small><strong>{item.name}</strong><span>Session · {slice.reference}</span><span>Context · synthetic only</span><span>Tools · disabled</span><span>Evaluations · not run</span></aside>
    <div className="ai-thread"><section className="ai-space-context"><h3>{slice.task}</h3><p>{slice.summary}</p><p>{slice.context}</p><p>{slice.tools}</p></section><section className="ai-space-output"><small>ILLUSTRATIVE OUTPUT · NO MODEL CALLED</small><p>{slice.output}</p><span>Provider: not connected · Tool execution: disabled</span></section><footer className="catalog-slice-footer"><span>{slice.provenance} · {slice.boundary}</span><code>{slice.reference}</code></footer></div>
  </div>;
}

function RecordCatalogPreview({ kind, item }: { kind: RecordCatalogKind; item: CatalogItem }) {
  const slice = createRecordCatalogDataSlice(kind, item);
  return <article className="data-preview record-catalog-preview" data-record-catalog-kind={kind} data-record-id={slice.recordId} data-record-reference={slice.reference}>
    <div className="tool-preview-head"><Badge>{kind === "redux" ? "REDUX SLICE CONTRACT" : kind === "selectors" ? "SELECTOR CONTRACT" : kind === "types" ? "TYPE CONTRACT" : kind === "datasets" ? "SYNTHETIC DATASET" : kind === "scenarios" ? "DETERMINISTIC SCENARIO" : "REGISTRY METADATA"}</Badge><h3>{slice.title}</h3></div>
    <p>{slice.detail}</p>
    <dl className="record-catalog-facts"><div><dt>Group</dt><dd>{slice.family}</dd></div><div><dt>Source</dt><dd><code>{slice.source}</code></dd></div><div><dt>Reference</dt><dd><code>{slice.reference}</code></dd></div></dl>
    <details><summary>Inspect registered sample</summary><pre>{slice.sample}</pre></details>
    <footer className="catalog-slice-footer"><span>{slice.provenance} · {slice.boundary}</span><code>{slice.recordId}</code></footer>
  </article>;
}

function PreviewCanvas({ catalogKey, item, propOverrides, pageDataContext = "generic" }: { catalogKey: string; item: CatalogItem; propOverrides?: Record<string, unknown>; pageDataContext?: ProductPageContext }) {
  if (catalogKey === "identities") return <IdentityPreview item={item}/>;
  if (catalogKey === "icons") return <IconPreview item={item}/>;
  if (catalogKey === "components" || catalogKey === "atoms") return <ComponentPreview item={item} overrides={propOverrides}/>;
  if (catalogKey === "layouts") return <LayoutPreview item={item}/>;
  if (catalogKey === "pages") return <PagePreview item={item} dataContext={pageDataContext}/>;
  if (catalogKey === "workspaces") return <WorkspacePreview item={item}/>;
  if (catalogKey === "devices") return <DevicePreview item={item}/>;
  if (catalogKey === "generators") return <GeneratorPreview item={item}/>;
  if (catalogKey === "tools") return <ToolPreview item={item}/>;
  if (catalogKey === "ai") return <AiPreview item={item}/>;
  if (["redux", "selectors", "types", "datasets", "scenarios", "registries"].includes(catalogKey)) return <RecordCatalogPreview kind={catalogKey as RecordCatalogKind} item={item}/>;
  return <div className="actual-preview-message" data-tone="warning" data-record-preview-unsupported={catalogKey}><strong>No preview contract is registered.</strong><p>{item.id} is listed, but this catalog has no record-specific specimen renderer yet.</p></div>;
}

type SurfacePreviewState = "example" | "loading" | "empty" | "error" | "disabled";
const SURFACE_PREVIEW_STATES: { id: SurfacePreviewState; label: string }[] = [
  { id: "example", label: "Example" },
  { id: "loading", label: "Skeleton" },
  { id: "empty", label: "Empty" },
  { id: "error", label: "Error" },
  { id: "disabled", label: "Disabled" },
];

function SurfaceSkeleton({ catalogKey, name }: { catalogKey: string; name: string }) {
  return <div className={`surface-specimen-skeleton surface-specimen-skeleton--${catalogKey}`} data-surface-state="loading" aria-busy="true" role="status" aria-label={`Loading ${name} example`}>
    <div aria-hidden="true">
    <div className="surface-skeleton-heading"><Skeleton width="38%" height={22} label={`Loading ${name} example`}/><Skeleton width="24%" height={12} label="Loading status"/></div>
    <div className="surface-skeleton-grid"><section><Skeleton height={14}/><Skeleton height={74}/><Skeleton width="76%" height={14}/></section><section><Skeleton height={14}/><Skeleton height={74}/><Skeleton width="64%" height={14}/></section><section className="surface-skeleton-wide"><Skeleton height={14}/><Skeleton height={54}/></section></div>
    <small>Loading the {catalogKey === "ai" ? "AI-space" : catalogKey === "generators" ? "generator" : catalogKey.slice(0, -1)} example</small>
    </div>
  </div>;
}

function StatefulPreviewCanvas({ catalogKey, item, state, propOverrides, pageDataContext, onRetry }: { catalogKey: string; item: CatalogItem; state: SurfacePreviewState; propOverrides?: Record<string, unknown>; pageDataContext: ProductPageContext; onRetry: () => void }) {
  if (state === "loading") return <SurfaceSkeleton catalogKey={catalogKey} name={item.name}/>;
  if (state === "empty") return <div className="surface-specimen-state" data-surface-state="empty"><EmptyState title={`No ${catalogKey === "ai" ? "AI-space" : catalogKey.slice(0, -1)} data yet`} description={`This ${item.name} example has no records to show. Add a record or switch back to the example state.`}/></div>;
  if (state === "error") return <div className="surface-specimen-state" data-surface-state="error"><ErrorState title={`${item.name} could not be loaded`} description="This is a demonstration of an in-page error state. No request was sent and no data was changed." action={<Button onClick={onRetry}>Retry example</Button>}/></div>;
  if (state === "disabled") return <div className="surface-specimen-disabled" data-surface-state="disabled" aria-disabled="true"><PreviewCanvas catalogKey={catalogKey} item={item} propOverrides={propOverrides} pageDataContext={pageDataContext}/><div className="surface-disabled-note"><strong>Example unavailable</strong><span>This surface is currently disabled in the illustrative state.</span></div></div>;
  return <div data-surface-state="example"><PreviewCanvas catalogKey={catalogKey} item={item} propOverrides={propOverrides} pageDataContext={pageDataContext}/></div>;
}

function exampleCode(catalogKey: string, item: CatalogItem) {
  const safeName = item.name.replace(/[^A-Za-z0-9_$]/g, "");
  if (catalogKey === "identities") return `import { IdentityAvatar } from "@maataa/ui/identity/IdentityAvatar";\n\n<IdentityAvatar identity="${item.id}" size={48} />`;
  if (catalogKey === "icons") return `import { MaataaIcon } from "@maataa/ui/icons/MaataaIcon";\n\n<MaataaIcon name="${item.name}" size={20} />`;
  if (item.importPath) return `import { ${safeName || "Surface"} } from "${item.importPath}";\n\nexport function Example() {\n  return <${safeName || "Surface"} />;\n}`;
  if (catalogKey === "pages") return `const page = {\n  pageTypeId: "${item.id}",\n  layoutTypeId: "LAYOUT.APP_SHELLS.TOP_NAV_SIDEBAR"\n};`;
  if (catalogKey === "workspaces") return `const workspace = {\n  workspaceTypeId: "${item.id}",\n  pages: ["PAGE.DASHBOARD_OVERVIEW.DASHBOARD"]\n};`;
  if (catalogKey === "layouts") return `const layout = {\n  layoutTypeId: "${item.id}",\n  regions: ["header", "sidebar", "main", "inspector"]\n};`;
  return `const selected = "${item.id}";\n// ${item.name}`;
}

function SurfaceExplorer() {
  const [catalogKey, setCatalogKey] = React.useState("components");
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [propValues, setPropValues] = React.useState<Record<string, unknown>>({});
  const [pageDataContext, setPageDataContext] = React.useState<ProductPageContext>("generic");
  const [previewState, setPreviewState] = React.useState<SurfacePreviewState>("example");
  const pageSize = 40;
  const catalog = CATALOGS.find((item) => item.key === catalogKey) ?? CATALOGS[0];
  const normalized = query.trim().toLowerCase();
  const matches = catalog.items.filter((item) => !normalized || `${item.id} ${item.name} ${item.meta ?? ""} ${item.importPath ?? ""}`.toLowerCase().includes(normalized));
  const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
  React.useEffect(() => { setPage(0); setSelectedId(null); setPropValues({}); setPreviewState("example"); }, [catalogKey, query]);
  React.useEffect(() => { setPropValues({}); }, [selectedId]);
  const visible = matches.slice(page * pageSize, (page + 1) * pageSize);
  const selected = matches.find((item) => item.id === selectedId) ?? visible[0] ?? catalog.items[0];
  const snippet = selected ? exampleCode(catalogKey, selected) : "// No matching surface";
  return <section className="page-section surface-page">
    <SectionHeading kicker="Full surface" title="Live MAATAA UI explorer" body="Select a canonical record to drive the visual preview canvas. Inspect metadata and copy IDs, import paths and generated examples from the same screen." />
    <div className="catalog-tabs" role="tablist">{CATALOGS.map((item) => <button key={item.key} data-active={item.key === catalog.key} onClick={() => setCatalogKey(item.key)}>{item.label}<span>{item.items.length}</span></button>)}</div>
    {catalog.key === "pages" && <div className="page-data-context"><label>Page data context<select aria-label="Page data context" value={pageDataContext} onChange={(event) => setPageDataContext(event.target.value as ProductPageContext)}><option value="generic">Generic synthetic specimen</option><option value="tlps">TLPS production data slice</option><option value="nevo">NEVO Events data slice</option></select></label><span>All records shown here are synthetic demo fixtures.</span></div>}
    <div className="surface-workbench">
      <aside className="surface-catalog-pane">
        <div className="pane-head"><div><strong>{catalog.label}</strong><small>{matches.length} records</small></div><label className="surface-search"><span className="sr-only">Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${catalog.label.toLowerCase()}…`} /></label></div>
        <div className="surface-record-list">{visible.map((item) => <button key={item.id} className="surface-record" data-selected={selected?.id === item.id} onClick={() => setSelectedId(item.id)}><strong>{item.name}</strong><code>{item.id}</code>{item.meta && <span>{item.meta}</span>}</button>)}</div>
        <div className="surface-pagination"><button disabled={page === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}>‹</button><span>{page + 1}/{pageCount}</span><button disabled={page >= pageCount - 1} onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}>›</button></div>
      </aside>
      <div className="surface-preview-pane">
        <div className="pane-head preview-pane-head"><div><small>VISUAL PREVIEW</small><strong>{selected?.name ?? "No result"}</strong></div><div className="preview-mode-badges"><span>live</span><span>responsive</span></div></div>
        <div className="surface-state-picker" role="group" aria-label="Preview state">{SURFACE_PREVIEW_STATES.map(state => <button key={state.id} aria-pressed={previewState === state.id} data-active={previewState === state.id} onClick={() => setPreviewState(state.id)}>{state.label}</button>)}</div>
        <div className="surface-preview-canvas">{selected && <StatefulPreviewCanvas catalogKey={catalogKey} item={selected} state={previewState} propOverrides={propValues} pageDataContext={pageDataContext} onRetry={() => setPreviewState("example")}/>}</div>
      </div>
      <aside className="surface-inspector-pane">
        {selected && <><div className="inspector-section"><small>SELECTED</small><h3>{selected.name}</h3><div className="copy-row"><code>{selected.id}</code><CopyButton text={selected.id} label="Copy ID"/></div>{selected.meta && <p>{selected.meta}</p>}</div>{selected.importPath && <div className="inspector-section"><small>IMPORT</small><div className="copy-stack"><code>{selected.importPath}</code><CopyButton text={selected.importPath} label="Copy path"/></div></div>}{(catalogKey === "components" || catalogKey === "atoms") && <div className="inspector-section"><small>LIVE PROPS</small><ComponentPropInspector componentName={selected.name} values={propValues} onChange={setPropValues}/></div>}<div className="inspector-section"><CodeBlock code={snippet} label="Example"/></div><div className="inspector-section inspector-links"><a href="#/playground">Open Playground</a><a href="#/sandbox">Open Sandbox</a><a href="#/docs">Read docs</a></div></>}
      </aside>
    </div>
  </section>;
}

function KeyboardControls() {
 const [modal,setModal]=React.useState(false),[drawer,setDrawer]=React.useState(false),[choice,setChoice]=React.useState("one");
 const modalTrigger=React.useRef<HTMLButtonElement>(null),drawerTrigger=React.useRef<HTMLButtonElement>(null);
 const options=[{value:"one",label:"One"},{value:"two",label:"Two"}];
 return <Card header={<strong>Keyboard controls</strong>}><div className="specimen-actions"><Button ref={modalTrigger} onClick={()=>setModal(true)}>Open dialog</Button><Button ref={drawerTrigger} variant="secondary" onClick={()=>setDrawer(true)}>Open drawer</Button></div>
 <Combobox label="First choice" value={choice} onValueChange={setChoice} options={options}/><Combobox label="Second choice" options={options}/>
 <Modal returnFocusRef={modalTrigger} open={modal} onClose={()=>setModal(false)} title="Keyboard dialog"><Input aria-label="Dialog name"/><Button onClick={()=>setModal(false)}>Done</Button></Modal>
 <Drawer returnFocusRef={drawerTrigger} open={drawer} onClose={()=>setDrawer(false)} title="Keyboard drawer"><Button onClick={()=>setDrawer(false)}>Done</Button></Drawer>
 </Card>;
}
function Playground() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [density, setDensity] = React.useState<"comfortable" | "compact">("comfortable");
  const [radius, setRadius] = React.useState(16);
  const [width, setWidth] = React.useState(860);
  const [tab, setTab] = React.useState("overview");
  const [value, setValue] = React.useState("MAATAA live playground");
  const code = `import { Button } from "@maataa/ui/actions/Button";\nimport { Input } from "@maataa/ui/forms/Input";\nimport { Modal, Drawer } from "@maataa/ui/surfaces";
import { Combobox } from "@maataa/ui/forms";
import { Card } from "@maataa/ui/surfaces/Card";\n\nexport function PlaygroundSpecimen() {\n  return (\n    <Card>\n      <Input defaultValue="${value.replace(/"/g, '\\"')}" />\n      <Button>Run action</Button>\n    </Card>\n  );\n}`;
  return <section className="page-section">
    <SectionHeading kicker="MAATAA Playground" title="Interact with the real UI package" body="Tune presentation controls, interact with package-owned components, resize the canvas, and copy a usable source example." />
    <div className="playground-shell">
      <aside className="playground-controls">
        <div className="control-group"><label>Theme<select value={theme} onChange={(event) => setTheme(event.target.value as typeof theme)}><option value="dark">Dark</option><option value="light">Light</option></select></label></div>
        <div className="control-group"><label>Density<select value={density} onChange={(event) => setDensity(event.target.value as typeof density)}><option value="comfortable">Comfortable</option><option value="compact">Compact</option></select></label></div>
        <div className="control-group"><label>Radius <strong>{radius}px</strong><input type="range" min="0" max="32" value={radius} onChange={(event) => setRadius(Number(event.target.value))}/></label></div>
        <div className="control-group"><label>Canvas width <strong>{width}px</strong><input type="range" min="320" max="1120" step="10" value={width} onChange={(event) => setWidth(Number(event.target.value))}/></label></div>
        <div className="control-group"><small>QUICK WIDTHS</small><div className="quick-widths"><button onClick={() => setWidth(390)}>Mobile</button><button onClick={() => setWidth(768)}>Tablet</button><button onClick={() => setWidth(1120)}>Desktop</button></div></div>
      </aside>
      <div className="playground-main">
        <div className="playground-ruler"><span>320</span><span>768</span><span>1120</span></div>
        <div className="playground-viewport" data-theme={theme} data-maataa-theme={theme} data-density={density} style={{maxWidth: width, "--play-radius": `${radius}px`} as React.CSSProperties}>
          <div className="playground-topbar"><div><small>LIVE VIEWPORT</small><strong>{width}px · {theme} · {density}</strong></div><Badge tone="success">interactive</Badge></div>
          <div className="playground-content">
            <div className="pg-hero"><small>MAATAA UI</small><h2>Composable interface specimen</h2><p>Change the controls on the left. This surface is rendered from the same package components consumers import.</p><div className="specimen-actions"><Button>Primary action</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button></div></div>
            <div className="pg-grid"><Card header={<strong>Input</strong>}><Input value={value} onChange={(event) => setValue(event.target.value)} /></Card><Card header={<strong>Status</strong>}><div className="specimen-actions"><Badge tone="success">verified</Badge><Badge tone="warning">review</Badge><Badge tone="info">simulated</Badge></div></Card></div>
            <KeyboardControls/>
            <Card header={<strong>Tabs</strong>}><Tabs value={tab} onValueChange={setTab} tabs={[{id:'overview',label:'Overview',content:<p>Overview content responds to the live playground state.</p>},{id:'evidence',label:'Evidence',content:<p>Visual demo only. Runtime authority remains host-owned.</p>},{id:'states',label:'States',content:<div className="preview-list"><div>Theme <strong>{theme}</strong></div><div>Density <strong>{density}</strong></div><div>Radius <strong>{radius}px</strong></div></div>}]} /></Card>
          </div>
        </div>
      </div>
      <aside className="playground-code"><CodeBlock label="Copy React" code={code}/><CodeBlock label="Current settings" code={JSON.stringify({theme,density,radius,width},null,2)}/></aside>
    </div>
  </section>;
}

function Sandbox() {
  const dispatch = useMaataaDispatch();
  const scene = useMaataaSelector(selectComposerScene);
  const selectedBlock = useMaataaSelector(selectComposerSelectedBlock);
  const canUndo = useMaataaSelector(selectComposerCanUndo);
  const canRedo = useMaataaSelector(selectComposerCanRedo);
  const [mode, setMode] = React.useState<"compose"|"preview"|"json">("compose");
  const [draft, setDraft] = React.useState(JSON.stringify(scene, null, 2));
  const [error, setError] = React.useState<string|null>(null);
  const [library, setLibrary] = React.useState<CompositionLibraryV1>(() => {
    try { const loaded = loadCompositionLibrary(window.localStorage); if (loaded.migrated) writeCompositionLibrary(window.localStorage, loaded.library); return loaded.library; }
    catch { return emptyCompositionLibrary(); }
  });
  const [savedId, setSavedId] = React.useState("");
  const [revisionToRestore, setRevisionToRestore] = React.useState("");
  const [saveName, setSaveName] = React.useState(scene.name);
  const [libraryNotice, setLibraryNotice] = React.useState("");
  React.useEffect(()=>setDraft(JSON.stringify(scene,null,2)),[scene]);
  const updateLibrary = (next:CompositionLibraryV1) => { try { writeCompositionLibrary(window.localStorage,next); setLibrary(next); setLibraryNotice("Saved in this browser · library v1"); } catch (reason) { setLibraryNotice(reason instanceof Error ? reason.message : "Browser storage is unavailable."); } };
  const saveAsNew = () => { try { const next=saveComposition(library,scene,saveName); updateLibrary(next); setSavedId(next.items.at(-1)?.id??""); } catch(reason) { setLibraryNotice(reason instanceof Error?reason.message:"Composition could not be saved."); } };
  const updateSaved = () => { if(!savedId){saveAsNew();return;} try { const next=saveComposition(library,scene,saveName,new Date(),savedId); updateLibrary(next); } catch(reason) { setLibraryNotice(reason instanceof Error?reason.message:"Composition could not be updated."); } };
  const loadSaved = () => { const item=library.items.find(entry=>entry.id===savedId); if(!item){setLibraryNotice("Choose a saved composition first.");return;} dispatch(builderActions.setScene(item.scene)); setSaveName(item.name); setLibraryNotice(`Loaded ${item.name} · composition schema ${item.scene.schemaVersion}`); };
  const duplicateSaved = () => { try { const next=duplicateComposition(library,savedId); updateLibrary(next); const copy=next.items.at(-1); if(copy){setSavedId(copy.id);setSaveName(copy.name);} } catch(reason) { setLibraryNotice(reason instanceof Error?reason.message:"Composition could not be duplicated."); } };
  const removeSaved = () => { if(!savedId)return; const next=deleteComposition(library,savedId); updateLibrary(next); setSavedId(""); setSaveName(scene.name); };
  const restoreSavedRevision = () => { if(!savedId||!revisionToRestore)return; try { const next=restoreCompositionRevision(library,savedId,Number(revisionToRestore)); updateLibrary(next); const item=next.items.find(entry=>entry.id===savedId); if(item){dispatch(builderActions.setScene(item.scene));setRevisionToRestore("");setLibraryNotice(`Restored revision ${item.revision} as a new version.`);} } catch(reason) { setLibraryNotice(reason instanceof Error?reason.message:"Revision could not be restored."); } };
  const applyJson=()=>{try{const parsed=parseCompositionInput(draft);dispatch(builderActions.setScene(parsed));setError(null)}catch(reason){setError(reason instanceof Error?reason.message:"Invalid JSON")}};
  return <section className="page-section">
    <SectionHeading kicker="MAATAA Visual Composer" title="Compose real package components" body="Drag or add package-owned blocks, reorder them on canvas, edit props, switch workspace/page/layout/device/state context, undo/redo, persist locally, and preview the resulting canonical composition." />
    <section className="composer-library" aria-labelledby="composer-library-title"><div><h2 id="composer-library-title">Composition library</h2><p>Browser-local snapshots · schema v2 · revision restore · v1 and legacy-scene migration</p></div><label>Saved compositions<select aria-label="Saved compositions" value={savedId} onChange={event=>{setSavedId(event.target.value);setRevisionToRestore("");const item=library.items.find(entry=>entry.id===event.target.value);if(item)setSaveName(item.name);}}><option value="">Choose a saved composition</option>{library.items.map(item=><option key={item.id} value={item.id}>{item.name} · revision {item.revision}</option>)}</select></label><label>Composition name<input aria-label="Composition name" value={saveName} maxLength={120} onChange={event=>setSaveName(event.target.value)}/></label><div className="composer-library-actions"><button className="gold-button" type="button" onClick={saveAsNew}>Save as new</button><button className="ghost-button" type="button" onClick={updateSaved}>Update selected</button><button className="ghost-button" type="button" disabled={!savedId} onClick={loadSaved}>Open</button><button className="ghost-button" type="button" disabled={!savedId} onClick={duplicateSaved}>Duplicate</button><button className="ghost-button" type="button" disabled={!savedId} onClick={removeSaved}>Delete</button></div>{savedId&&library.items.find(item=>item.id===savedId)?.history.length ? <div className="composer-revision-controls"><label>Restore prior revision<select aria-label="Restore prior revision" value={revisionToRestore} onChange={event=>setRevisionToRestore(event.target.value)}><option value="">Choose a prior revision</option>{[...library.items.find(item=>item.id===savedId)!.history].reverse().map(entry=><option key={entry.revision} value={entry.revision}>Revision {entry.revision} · {new Date(entry.savedAt).toLocaleString()}</option>)}</select></label><button className="ghost-button" type="button" disabled={!revisionToRestore} onClick={restoreSavedRevision}>Restore as new revision</button><span>Up to 20 prior revisions per composition</span></div>:null}{libraryNotice&&<p role="status">{libraryNotice}</p>}</section>
    <div className="composer-mode-tabs"><button data-active={mode==="compose"} onClick={()=>setMode("compose")}>Composer</button><button data-active={mode==="preview"} onClick={()=>setMode("preview")}>Responsive preview</button><button data-active={mode==="json"} onClick={()=>setMode("json")}>Scene JSON</button><span>Selected: {selectedBlock?.id ?? "none"}</span></div>
    {mode==="compose" && <VisualComposer scene={scene} selectedBlockId={selectedBlock?.id??null} canUndo={canUndo} canRedo={canRedo} onSceneChange={(next)=>dispatch(builderActions.setScene(next))} onSelectBlock={(id)=>dispatch(builderActions.selectBlock(id))} onUndo={()=>dispatch(builderActions.undo())} onRedo={()=>dispatch(builderActions.redo())}/>} 
    {mode==="preview" && <div className="composer-preview-grid"><ResponsiveDeviceRuntime deviceId={scene.deviceId}><CanonicalCompositionRuntime scene={scene}/></ResponsiveDeviceRuntime><ResponsiveDeviceRuntime deviceId="DEVICE.PHONES.SMARTPHONE" orientation="portrait"><CanonicalCompositionRuntime scene={{...scene,deviceId:"DEVICE.PHONES.SMARTPHONE"}}/></ResponsiveDeviceRuntime></div>}
    {mode==="json" && <div className="composer-json"><div className="editor-tabs"><strong>Canonical ComposerScene</strong><CopyButton text={draft}/></div><textarea aria-label="Composition JSON" value={draft} onChange={(e)=>setDraft(e.target.value)} spellCheck={false}/>{error&&<div className="sandbox-error">{error}</div>}<div className="support-actions"><button className="gold-button" onClick={applyJson}>Apply JSON</button><button className="ghost-button" onClick={()=>dispatch(builderActions.resetScene())}>Reset scene</button></div></div>}
  </section>;
}

function DemoDashboard({ route, navigate }: { route: string; navigate: (path: string) => void }) {
  const dispatch = useMaataaDispatch();
  const scenario = useMaataaSelector(selectDemoScenario);
  const workspace = useMaataaSelector(selectWorkspace);
  const page = useMaataaSelector(selectPage);
  const layout = useMaataaSelector(selectLayout);
  const device = useMaataaSelector(selectDevice);
  const generator = useMaataaSelector(selectGenerator);
  const tool = useMaataaSelector(selectTool);
  const ai = useMaataaSelector(selectAI);
  const standalone = DEMO_ROUTES.find((item) => item.path === route);
  const activeScenario = standalone ? DEMO_SCENARIOS.find((item) => item.id === standalone.scenarioId) ?? scenario : scenario;
  React.useEffect(() => {
    if (standalone && scenario.id !== standalone.scenarioId) dispatch(demoActions.activateScenario(standalone.scenarioId));
  }, [dispatch, scenario.id, standalone]);
  const scenarioPath = (scenarioId: string) => DEMO_ROUTES.find((item) => item.scenarioId === scenarioId)?.path ?? "/demos";
  const isTlps = activeScenario.id === "scenario-tlps";
  return <section className="page-section">
    {standalone ? <div className="experience-return"><button className="text-link" onClick={() => navigate("/demos")}>← All demos</button><span>Sample workspace and local interactions</span></div> : <SectionHeading kicker="Seven guided experiences" title="Choose a demo to explore" body="Each demo opens its own interactive flow, uses labeled sample data, and keeps changes local to this browser." />}
    {!standalone && <div className="scenario-grid">{DEMO_SCENARIOS.map((item) => <button className="scenario-card" data-active={item.id === activeScenario.id} key={item.id} onClick={() => { dispatch(demoActions.activateScenario(item.id)); navigate(scenarioPath(item.id)); }}><strong>{item.name}</strong><span>{item.description}</span><span className="scenario-open-label">Open experience →</span></button>)}</div>}
    <div className="independent-demo" key={activeScenario.id}>
      {isTlps ? <React.Suspense fallback={<p role="status">Loading TLPS workflow…</p>}><TlpsWorkflow /></React.Suspense> : <DemoExperience scenarioId={activeScenario.id as "scenario-ui" | "scenario-nevo" | "scenario-spatial" | "scenario-ai" | "scenario-mobile" | "scenario-control"} />}
    </div>
    <article className="demo-card wide experience-composition"><h2>Active composition</h2><ul className="demo-list"><li className="demo-row"><span>Workspace</span><span className="demo-code">{workspace.activeWorkspaceTypeId}</span></li><li className="demo-row"><span>Page</span><span className="demo-code">{page.activePageTypeId}</span></li><li className="demo-row"><span>Layout</span><span className="demo-code">{layout.activeLayoutTypeId}</span></li><li className="demo-row"><span>Device</span><span className="demo-code">{device.deviceId}</span></li><li className="demo-row"><span>Generator</span><span className="demo-code">{generator.selectedGeneratorId ?? "None"}</span></li><li className="demo-row"><span>Tool</span><span className="demo-code">{tool.selectedToolId ?? "None"}</span></li><li className="demo-row"><span>AI space</span><span className="demo-code">{ai.activeSpaceId ?? "None"}</span></li></ul></article>
    {isTlps && <p className="tlps-dashboard-links"><a className="gold-button" href="#/tlps">TLPS public overview</a><a className="ghost-button" href="#/tlps/onboarding">Guided onboarding</a><a className="text-link" href="#/tlps-workflow">Open workflow on its own page →</a></p>}
  </section>;
}

const codeExamples = {
  install: `pnpm install\npnpm demo`,
  component: `import { Button } from "@maataa/ui/actions/Button";\nimport { HolyGrailLayout } from "@maataa/ui/layouts/HolyGrailLayout";`,
  redux: `import { MaataaReduxProvider } from "@maataa/ui/redux";\nimport { DEMO_SCENARIOS } from "@maataa/ui/demo";`,
  registries: `import { PAGE_TYPES, WORKSPACE_TYPES, DEVICE_REGISTRY } from "@maataa/ui/registries";`,
  identity: `import { IdentityAvatar } from "@maataa/ui/identity/IdentityAvatar";
import { MaataaIcon } from "@maataa/ui/icons/MaataaIcon";

<IdentityAvatar identity="IDENTITY.BRAHMINI" />
<MaataaIcon name="workspace" />`,
};

function Docs() {
  const [query, setQuery] = React.useState("");
  const filtered = PUBLIC_SURFACE_DOC_SECTIONS.filter((item) => `${item.title} ${item.summary}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="page-section docs-layout">
    <aside className="docs-sidebar"><div className="demo-kicker">Documentation</div><input className="docs-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search docs…" />{filtered.map((item) => <button key={item.id} onClick={() => document.getElementById(`docs-${item.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}>{item.title}</button>)}</aside>
    <div className="docs-content"><SectionHeading kicker="Docs" title="MAATAA UI package guide" body="Package architecture, live visual surfaces, direct imports, state and runtime boundaries." />
      <article className="doc-article" id="docs-getting-started"><h3>Getting started</h3><p>Install dependencies and launch the built-in Vite/Redux surface.</p><CodeBlock code={codeExamples.install}/></article>
      <article className="doc-article" id="docs-architecture"><h3>Architecture</h3><p>MAATAA UI separates operational intent from structural composition:</p><div className="architecture-inline">Registry Registry → Workspace / AI Space → Page → Layout → Region / Slot → Component → Atom</div></article>
      <article className="doc-article" id="docs-surface"><h3>Live surface explorer</h3><p>The explorer has a catalog pane, visual canvas and inspector. Select any record and copy its canonical ID, import path or generated example.</p><div className="doc-actions"><a href="#/surface">Open Full Surface</a></div></article>
      <article className="doc-article" id="docs-playground"><h3>Playground</h3><p>Interact with real package components while changing theme, density, radius and viewport width.</p><div className="doc-actions"><a href="#/playground">Open Playground</a></div></article>
      <article className="doc-article" id="docs-sandbox"><h3>Sandbox</h3><p>Compose a deterministic scene from approved blocks, edit its JSON config, apply it safely and copy generated JSX. Arbitrary code is never evaluated.</p><div className="doc-actions"><a href="#/sandbox">Open Sandbox</a></div></article>
      <article className="doc-article"><h3>Direct imports</h3><p>Use explicit public subpaths to keep package boundaries understandable and tree-shakable.</p><CodeBlock code={codeExamples.component}/></article>
      <article className="doc-article" id="docs-redux"><h3>Redux demo state</h3><p>Redux is optional. The demo layer includes {REDUX_SLICE_REGISTRY.length} slices and {REDUX_SELECTOR_REGISTRY.length} registered selectors.</p><CodeBlock code={codeExamples.redux}/></article>
      <article className="doc-article" id="docs-registries"><h3>Registries</h3><p>The package exposes canonical catalogs rather than requiring consumers to duplicate their own surface vocabulary.</p><CodeBlock code={codeExamples.registries}/></article>
      <article className="doc-article" id="docs-identities"><h3>Identity-backed working agents</h3><p>{DEMO_IDENTITIES.length} named software roles can be assigned provider-backed work in Brahmini Workbench. The identity registry still supplies display names and visual treatment; the Workbench supplies each role's task, prompt and provider assignment. {ICON_REGISTRY.length} core vector icons are also available.</p><CodeBlock code={codeExamples.identity}/><div style={{marginTop:16}}><IdentityAvatarGroup identities={DEMO_IDENTITIES.map((entry)=>entry.id)} size={36} max={15}/></div><div className="doc-actions"><a href="#/brahmini">Open Brahmini Workbench</a></div></article>
      <article className="doc-article" id="docs-devices"><h3>Devices & responsive</h3><p>{DEVICE_REGISTRY.length} canonical device definitions are available for visual simulation and responsive metadata. A declared frame is not a claim of real-device certification.</p></article>
      <article className="doc-article" id="docs-ai"><h3>AI surfaces</h3><p>{AI_SPACE_REGISTRY.length} AI spaces and {TOOL_REGISTRY.length} tools define host-neutral UI vocabulary. The optional Brahmini demo host connects to local Ollama, Anthropic, or Gemini through its local runtime; model execution remains outside the @maataa/ui package.</p><div className="doc-actions"><a href="#/brahmini">Configure providers and agents</a></div></article>
      <article className="doc-article" id="docs-theming"><h3>Theming</h3><p>Theme Studio edits the package CSS custom properties for semantic colors, font stacks, type scale, spacing density, surface style, radius, shadows, animation timing, reduced motion and focus rings. Apply a theme locally, save it in this browser, or export CSS variables and JSON. Custom font stacks use fonts available to the host application.</p></article>
      <article className="doc-article" id="docs-accessibility"><h3>Accessibility</h3><p>Keyboard, focus, semantics, contrast and reduced-motion behavior are required certification dimensions; demo presence alone is not certification.</p></article>
    </div>
  </section>;
}

function Help({ navigate }: { navigate: (path: string) => void }) {
  const [open, setOpen] = React.useState<string | null>(PUBLIC_SURFACE_HELP_TOPICS[0]?.id ?? null);
  return <section className="page-section"><SectionHeading kicker="Help center" title="Find answers quickly" body="Setup, visual explorer, playground, sandbox and package-usage guidance." />
    <div className="help-actions"><button onClick={() => navigate("/surface")}>Full Surface</button><button onClick={() => navigate("/playground")}>Playground</button><button onClick={() => navigate("/sandbox")}>Sandbox</button><button onClick={() => navigate("/docs")}>Documentation</button><button onClick={() => navigate("/support")}>Support</button></div>
    <div className="faq-list">{PUBLIC_SURFACE_HELP_TOPICS.map((topic) => <article key={topic.id} className="faq-item" data-open={open === topic.id}><button onClick={() => setOpen(open === topic.id ? null : topic.id)} aria-expanded={open === topic.id}><span>{topic.title}</span><span>{open === topic.id ? '−' : '+'}</span></button>{open === topic.id && <p>{topic.body}</p>}</article>)}</div>
    <div className="help-grid"><article><h3>Package architecture</h3><p>Use Full Surface to verify whether a page, layout, device, generator, tool or AI space already exists before creating another identity.</p></article><article><h3>Runtime boundary</h3><p>The package stays provider-neutral. Brahmini's optional local demo runtime can call Ollama, Anthropic and Gemini; production identity, authorization, persistence and integrations remain host responsibilities.</p></article><article><h3>Certification</h3><p>Distinguish declared, simulated, tested and certified support. Catalog coverage is not equivalent to runtime/browser/device certification.</p><button className="text-link" onClick={()=>navigate("/brahmini?from=%2Fhelp")}>Ask Brahmini →</button></article></div>
  </section>;
}

function Support() {
  const [submitted, setSubmitted] = React.useState(false);
  const [category, setCategory] = React.useState<(typeof PUBLIC_SURFACE_SUPPORT_CATEGORIES)[number]>(PUBLIC_SURFACE_SUPPORT_CATEGORIES[0]);
  const [subject, setSubject] = React.useState("");
  const [details, setDetails] = React.useState("");
  const ticket = `Category: ${category}\nSubject: ${subject}\n\n${details}`;
  return <section className="page-section"><SectionHeading kicker="Support" title="MAATAA UI support center" body="This package demo provides a local support composer only; it does not send data to a backend." />
    <div className="support-grid"><article><span className="support-number">01</span><h3>Install & build</h3><p>Dependency installation, pnpm build policies, Vite and package scripts.</p></article><article><span className="support-number">02</span><h3>Surface / Playground</h3><p>Live previews, component specimens, layout/page/workspace/device canvases and copied examples.</p></article><article><span className="support-number">03</span><h3>State & AI surfaces</h3><p>Redux demo state, registries, static data, AI spaces, tools and evidence surfaces.</p></article></div>
    <form className="support-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div><h3>Compose a support ticket</h3><p>Demo-only local form. No ticket is transmitted.</p></div><label>Category<select value={category} onChange={(event) => setCategory(event.target.value as (typeof PUBLIC_SURFACE_SUPPORT_CATEGORIES)[number])}>{PUBLIC_SURFACE_SUPPORT_CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></label><label>Subject<input required value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="What do you need help with?" /></label><label>Details<textarea required rows={7} value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Include command output, relevant import path, or component ID." /></label><div className="support-actions"><button className="gold-button" type="submit">Create local ticket preview</button><CopyButton text={ticket} label="Copy ticket"/></div>{submitted && <div className="success-panel"><strong>Local ticket prepared.</strong><span>{category} · {subject}</span><p>Copy this information into your real support workflow. The demo has not sent anything externally.</p></div>}</form>
  </section>;
}

function NotFound({ navigate }: { navigate: (path: string) => void }) { return <section className="page-section empty-page"><div className="demo-kicker">404</div><h1>Surface not found</h1><p>The demo host does not have this route.</p><button className="gold-button" onClick={() => navigate("/")}>Return home</button></section>; }

function AppBody() {
  const [route, navigate] = useHashRoute();
  React.useEffect(() => {
    try {
      const active = parseActiveTheme(window.localStorage.getItem(STUDIO_ACTIVE_KEY));
      if (active) applyThemeTokens(document.documentElement, active);
    } catch { /* Keep the built-in theme when browser storage is unavailable. */ }
  }, []);
  let content: React.ReactNode;
  if (route === "/") content = <Landing navigate={navigate}/>;
  else if (route === "/theme-studio") content = <React.Suspense fallback={<p role="status">Loading Theme Studio…</p>}><ThemeStudio navigate={navigate}/></React.Suspense>;
  else if (route === "/branding-studio") content = <React.Suspense fallback={<p role="status">Loading Branding Studio…</p>}><BrandingStudio navigate={navigate}/></React.Suspense>;
  else if ((route === "/tlps" || route.startsWith("/tlps/"))) content = <React.Suspense fallback={<p role="status">Loading TLPS…</p>}><TlpsSurfaces route={route} navigate={navigate}/></React.Suspense>;
  else if (route === "/tlps-workflow") content = <React.Suspense fallback={<p role="status">Loading TLPS workflow…</p>}><TlpsWorkflow/></React.Suspense>;
  else if (route.startsWith("/surface")) content = <SurfaceExplorer/>;
  else if (route.startsWith("/playground")) content = <Playground/>;
  else if (route.startsWith("/sandbox")) content = <Sandbox/>;
  else if (route.startsWith("/demos") || route === "/demo" || route.startsWith("/demo/")) content = <DemoDashboard route={route} navigate={navigate}/>;
  else if (route.startsWith("/brahmini")) content = <React.Suspense fallback={<section className="page-section"><p role="status">Opening Brahmini Workbench…</p></section>}><BrahminiWorkbench navigate={navigate} sourceRoute={route}/></React.Suspense>;
  else if (route.startsWith("/docs")) content = <Docs/>;
  else if (route.startsWith("/help")) content = <Help navigate={navigate}/>;
  else if (route.startsWith("/support")) content = <Support/>;
  else content = <NotFound navigate={navigate}/>;
  return <Shell route={route} navigate={navigate}>{content}</Shell>;
}

const demoStore = createMaataaStore({ persist: true });

export default function App() {
  return <MaataaReduxProvider store={demoStore}><AppBody /></MaataaReduxProvider>;
}
