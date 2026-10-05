import * as React from "react";
import { MaataaReduxProvider } from "@maataa/ui/redux/MaataaReduxProvider";
import { createMaataaStore } from "@maataa/ui/redux/store";
import { useMaataaDispatch, useMaataaSelector } from "@maataa/ui/redux/hooks";
import { demoActions } from "@maataa/ui/redux/slices/demoSlice";
import { builderActions } from "@maataa/ui/redux/slices/builderSlice";
import {
  selectAI,
  selectDevice,
  selectLayout,
  selectPage,
  selectUnreadNotificationCount,
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
import { Tabs } from "@maataa/ui/navigation/Tabs";
import { SmartphoneFrame } from "@maataa/ui/devices/SmartphoneFrame";
import { IdentityAvatar } from "@maataa/ui/identity/IdentityAvatar";
import { IdentityAvatarGroup } from "@maataa/ui/identity/IdentityAvatarGroup";
import { IdentityBadge } from "@maataa/ui/identity/IdentityBadge";
import { MaataaIcon, type MaataaIconName } from "@maataa/ui/icons/MaataaIcon";
import { ActualComponentPreview } from "./ActualComponentPreview";
import { ComponentPropInspector, VisualComposer } from "@maataa/ui/composer";
import { CanonicalCompositionRuntime, ResponsiveDeviceRuntime } from "@maataa/ui/runtime";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

type AnyRecord = Record<string, unknown>;
type CatalogItem = { id: string; name: string; meta?: string; importPath?: string };
type Catalog = { key: string; label: string; description: string; items: readonly CatalogItem[] };
type SandboxBlock = "header" | "metrics" | "form" | "table" | "actions" | "activity";

type SandboxSpec = {
  title: string;
  subtitle: string;
  blocks: SandboxBlock[];
  accent: "gold" | "neutral" | "success";
  compact: boolean;
};

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
  return <div className="site-shell" data-maataa-demo-ready="true">
    <header className="site-header">
      <button className="brand-button" onClick={() => navigate("/")} aria-label="MAATAA UI home">
        <IdentityAvatar identity="IDENTITY.BRAHMINI" size={34}/><span><strong>MAATAA UI</strong><small>Alpha 8</small></span>
      </button>
      <button className="nav-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open}><MaataaIcon name="menu"/> Menu</button>
      <nav className="site-nav" data-open={open} aria-label="Primary navigation">
        {PUBLIC_SURFACE_ROUTES.map((item) => <button key={item.id} data-active={route === item.path || (item.path !== "/" && route.startsWith(item.path))} onClick={() => { navigate(item.path); setOpen(false); }}><MaataaIcon name={ROUTE_ICONS[item.id] ?? "page"}/><span>{item.label}</span></button>)}
      </nav>
      <div className="header-actions"><button className="ghost-button" onClick={() => navigate("/playground")}><MaataaIcon name="playground"/> Playground</button><button className="gold-button" onClick={() => navigate("/demos")}><MaataaIcon name="demos"/> Open demo</button></div>
    </header>
    <main>{children}</main>
    <footer className="site-footer">
      <div><strong>MAATAA UI</strong><p>Registry-driven, atomic, host-neutral React UI vocabulary.</p></div>
      <div className="footer-links">{PUBLIC_SURFACE_ROUTES.map((item) => <button key={item.id} onClick={() => navigate(item.path)}>{item.label}</button>)}</div>
      <div className="demo-muted">Demo data only · no live backend authority</div>
    </footer>
  </div>;
}

function Landing({ navigate }: { navigate: (path: string) => void }) {
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

    <section className="content-section">
      <SectionHeading kicker="Live system" title="Preview, change, compose, copy" body="The demo host now exposes real visual work surfaces rather than text-only inventory." />
      <div className="feature-grid">
        <article className="feature-card"><span>01</span><h3>Full Surface</h3><strong>Live three-pane explorer</strong><p>Select a registry record, inspect a visual specimen, and copy its ID, import path, or generated example.</p><button className="text-link" onClick={() => navigate('/surface')}>Explore →</button></article>
        <article className="feature-card"><span>02</span><h3>Playground</h3><strong>Interactive real components</strong><p>Change theme, density, radius and viewport width while interacting with package-owned Button, Input, Card, Badge and Tabs.</p><button className="text-link" onClick={() => navigate('/playground')}>Play →</button></article>
        <article className="feature-card"><span>03</span><h3>Sandbox</h3><strong>Safe composition builder</strong><p>Add and remove regions, edit JSON configuration, apply it without eval, and copy generated JSX or JSON.</p><button className="text-link" onClick={() => navigate('/sandbox')}>Compose →</button></article>
        <article className="feature-card"><span>04</span><h3>Demo scenarios</h3><strong>{DEMO_SCENARIOS.length} Redux scenarios</strong><p>Switch complete deterministic workspace/page/layout/device compositions and inspect supporting static data.</p><button className="text-link" onClick={() => navigate('/demos')}>Run →</button></article>
      </div>
    </section>

    <section className="content-section">
      <SectionHeading kicker="System scale" title="Full surface, one canonical vocabulary" body="The live site reads the same canonical catalogs used by the package and Redux demo." />
      <div className="metrics-grid">
        <Stat value={COMPONENT_REGISTRY.length} label="components"/><Stat value={PAGE_TYPES.length} label="page types"/><Stat value={WORKSPACE_TYPES.length} label="workspaces"/><Stat value={LAYOUT_TYPES.length} label="layouts"/><Stat value={DEVICE_REGISTRY.length} label="devices"/><Stat value={TOOL_REGISTRY.length} label="tools"/><Stat value={GENERATOR_REGISTRY.length} label="generators"/><Stat value={AI_SPACE_REGISTRY.length} label="AI spaces"/>
      </div>
    </section>

    <section className="content-section identity-showcase"><SectionHeading kicker="Demo identities" title="A symbolic identity constellation for the demo" body="Brahmini, Shiv, Parvati, the Saptarishis and Panchtatva identities replace anonymous placeholder users and give demo activity a consistent visual language."/><div className="identity-showcase-grid">{DEMO_IDENTITIES.map((identity)=><article key={identity.id}><IdentityAvatar identity={identity.id} size={58}/><div><strong>{identity.name}</strong><span>{identity.title}</span><small>{identity.demoRole}</small></div></article>)}</div><p className="demo-muted">These software roles are symbolic demo metaphors only; they are not theological claims.</p></section>

    <section className="content-section final-cta"><div><div className="demo-kicker">Start building</div><h2>Use MAATAA UI as a package, a visual reference, or a living composition laboratory.</h2></div><div className="hero-actions"><button className="ghost-button" onClick={() => navigate("/docs")}>Read docs</button><button className="gold-button" onClick={() => navigate("/playground")}>Launch Playground</button></div></section>
  </>;
}

function LayoutPreview({ name }: { name: string }) {
  return <div className="layout-preview"><div className="lp-header">{name} · Header</div><div className="lp-body"><div className="lp-sidebar">Navigation</div><div className="lp-main"><div className="lp-toolbar">Toolbar</div><div className="lp-canvas"><div className="mini-card large"></div><div className="mini-card"></div><div className="mini-card"></div><div className="mini-card wide"></div></div></div><div className="lp-inspector">Inspector</div></div><div className="lp-footer">Status / footer</div></div>;
}

function PagePreview({ name }: { name: string }) {
  return <div className="page-preview"><div className="preview-page-head"><div><small>PAGE PREVIEW</small><h3>{name}</h3><p>Canonical page purpose rendered inside a generic MAATAA application shell.</p></div><Button>Primary action</Button></div><div className="preview-metrics"><Stat value="72%" label="progress"/><Stat value="12" label="active"/><Stat value="4" label="blocked"/></div><div className="preview-content-grid"><Card header={<strong>Primary content</strong>}><p>Page content, states, data and actions compose here without changing the page identity.</p><div className="fake-chart"><span style={{height:'40%'}}></span><span style={{height:'67%'}}></span><span style={{height:'52%'}}></span><span style={{height:'82%'}}></span><span style={{height:'71%'}}></span></div></Card><Card header={<strong>Context</strong>}><ul className="preview-list"><li>Evidence <Badge tone="success">verified</Badge></li><li>Runtime <Badge tone="info">demo</Badge></li><li>Actions <Badge>3</Badge></li></ul></Card></div></div>;
}

function WorkspacePreview({ name }: { name: string }) {
  return <div className="workspace-preview"><div className="ws-rail"><IdentityAvatar identity="IDENTITY.BRAHMINI" size={30}/><span><MaataaIcon name="home"/></span><span><MaataaIcon name="workspace"/></span><span><MaataaIcon name="ai"/></span><span><MaataaIcon name="settings"/></span></div><div className="ws-shell"><div className="ws-top"><div><small>WORKSPACE</small><strong>{name}</strong></div><IdentityBadge identity="IDENTITY.SHIV" showRole/></div><div className="ws-toolbar"><button><MaataaIcon name="home"/> Overview</button><button><MaataaIcon name="surface"/> Board</button><button><MaataaIcon name="database"/> Data</button><button><MaataaIcon name="evidence"/> Evidence</button></div><div className="ws-grid"><Card header={<strong>Work queue</strong>}><div className="preview-list"><div><IdentityBadge identity="IDENTITY.PARVATI" size={24}/> <span>Review surface registry</span> <Badge tone="warning">review</Badge></div><div><IdentityBadge identity="IDENTITY.SAPTARISHI.GAUTAMA" size={24}/> <span>Validate demo composition</span> <Badge tone="success">done</Badge></div><div><IdentityBadge identity="IDENTITY.SAPTARISHI.VASHISTHA" size={24}/> <span>Publish evidence pack</span> <Badge tone="info">next</Badge></div></div></Card><Card header={<strong>Live context</strong>}><p>Persistent workspace state survives navigation across its pages and layouts.</p><IdentityAvatarGroup identities={["IDENTITY.BRAHMINI","IDENTITY.SHIV","IDENTITY.PARVATI","IDENTITY.SAPTARISHI.ATRI","IDENTITY.PANCHTATVA.AGNI"]}/><div className="mini-timeline"><i></i><i></i><i></i><i></i></div></Card></div></div></div>;
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

function DevicePreview({ name }: { name: string }) {
  return <div className="device-preview-stage"><SmartphoneFrame label={`${name} · simulated`} viewportWidth={330} viewportHeight={620}><div className="phone-demo"><div className="phone-status"><span>9:41</span><span>● ● ●</span></div><div className="phone-hero"><small>MAATAA MOBILE</small><h3>Device-aware surface</h3><p>Viewport, modality, orientation, safe-area and responsive metadata.</p></div><div className="phone-cards"><div><strong>12</strong><span>tasks</span></div><div><strong>4</strong><span>alerts</span></div></div><button>Open workspace</button></div></SmartphoneFrame></div>;
}

function GeneratorPreview({ name }: { name: string }) {
  const [brief, setBrief] = React.useState("Premium operational dashboard");
  return <div className="tool-preview"><div className="tool-preview-head"><Badge tone="info">generator</Badge><h3>{name}</h3></div><label>Generation brief<Input value={brief} onChange={(event) => setBrief(event.target.value)}/></label><div className="generated-artifact"><small>GENERATED PREVIEW</small><strong>{brief}</strong><div className="artifact-grid"><i></i><i></i><i></i><i></i></div></div><Button>Generate variant</Button></div>;
}

function ToolPreview({ name }: { name: string }) {
  return <div className="tool-preview"><div className="tool-preview-head"><Badge tone="warning">tool</Badge><h3>{name}</h3></div><div className="tool-call"><div><small>INPUT</small><code>{`{ target: "current-surface", mode: "inspect" }`}</code></div><span>→</span><div><small>RESULT</small><code>{`{ status: "ready", evidence: 3 }`}</code></div></div><div className="preview-list"><div>Permission <Badge tone="success">allowed</Badge></div><div>Host binding <Badge tone="info">simulated</Badge></div><div>Evidence <Badge>available</Badge></div></div><Button variant="secondary">Run demo tool</Button></div>;
}

function AiPreview({ name }: { name: string }) {
  return <div className="ai-preview"><div className="ai-sidebar"><IdentityAvatar identity="IDENTITY.SAPTARISHI.GAUTAMA" size={44}/><small>AI SPACE</small><strong>{name}</strong><button data-active="true"><MaataaIcon name="ai"/> Session</button><button><MaataaIcon name="database"/> Knowledge</button><button><MaataaIcon name="tool"/> Tools</button><button><MaataaIcon name="evidence"/> Evaluations</button></div><div className="ai-thread"><div className="ai-message user"><IdentityAvatar identity="IDENTITY.BRAHMINI" size={28}/> <span>Review this MAATAA surface for unsupported claims.</span></div><div className="ai-message assistant"><div className="ai-message-head"><IdentityBadge identity="IDENTITY.SAPTARISHI.GAUTAMA" size={28}/><Badge tone="success">grounded</Badge></div><p>I found 3 claims. All are mapped to package-owned registry evidence in this deterministic demo.</p><div className="citation-row"><span><MaataaIcon name="registry"/> Registry</span><span><MaataaIcon name="docs"/> Manifest</span><span><MaataaIcon name="evidence"/> Source</span></div></div><div className="ai-composer">Ask {name}… <button><MaataaIcon name="arrow-right"/> Send</button></div></div></div>;
}

function RegistryPreview({ name }: { name: string }) {
  return <div className="registry-preview"><div className="registry-title"><div><small>GOVERNED REGISTRY</small><h3>{name}</h3></div><Badge tone="success">canonical</Badge></div><table><thead><tr><th>ID</th><th>Lifecycle</th><th>Authority</th></tr></thead><tbody><tr><td>REGISTRY.ITEM.001</td><td>CANONICAL</td><td>@maataa/ui</td></tr><tr><td>REGISTRY.ITEM.002</td><td>REVIEWED</td><td>@maataa/ui</td></tr><tr><td>REGISTRY.ITEM.003</td><td>DRAFT</td><td>@maataa/ui</td></tr></tbody></table><div className="hash-line">sha256: 008c994d…a232a42</div></div>;
}

function DataPreview({ kind, name }: { kind: string; name: string }) {
  return <div className="data-preview"><div className="tool-preview-head"><Badge>{kind}</Badge><h3>{name}</h3></div><div className="state-tree"><div><span>status</span><strong>ready</strong></div><div><span>records</span><strong>12</strong></div><div><span>source</span><strong>static-demo</strong></div><div><span>authority</span><strong>visual-only</strong></div></div><div className="json-lines"><code>{`{`}</code><code>{`  "selected": "${name}",`}</code><code>{`  "mode": "preview",`}</code><code>{`  "verified": true`}</code><code>{`}`}</code></div></div>;
}

function PreviewCanvas({ catalogKey, item, propOverrides }: { catalogKey: string; item: CatalogItem; propOverrides?: Record<string, unknown> }) {
  if (catalogKey === "identities") return <IdentityPreview item={item}/>;
  if (catalogKey === "icons") return <IconPreview item={item}/>;
  if (catalogKey === "components" || catalogKey === "atoms") return <ComponentPreview item={item} overrides={propOverrides}/>;
  if (catalogKey === "layouts") return <LayoutPreview name={item.name}/>;
  if (catalogKey === "pages") return <PagePreview name={item.name}/>;
  if (catalogKey === "workspaces") return <WorkspacePreview name={item.name}/>;
  if (catalogKey === "devices") return <DevicePreview name={item.name}/>;
  if (catalogKey === "generators") return <GeneratorPreview name={item.name}/>;
  if (catalogKey === "tools") return <ToolPreview name={item.name}/>;
  if (catalogKey === "ai") return <AiPreview name={item.name}/>;
  if (catalogKey === "registries") return <RegistryPreview name={item.name}/>;
  return <DataPreview kind={catalogKey} name={item.name}/>;
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
  const pageSize = 40;
  const catalog = CATALOGS.find((item) => item.key === catalogKey) ?? CATALOGS[0];
  const normalized = query.trim().toLowerCase();
  const matches = catalog.items.filter((item) => !normalized || `${item.id} ${item.name} ${item.meta ?? ""} ${item.importPath ?? ""}`.toLowerCase().includes(normalized));
  const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
  React.useEffect(() => { setPage(0); setSelectedId(null); setPropValues({}); }, [catalogKey, query]);
  React.useEffect(() => { setPropValues({}); }, [selectedId]);
  const visible = matches.slice(page * pageSize, (page + 1) * pageSize);
  const selected = matches.find((item) => item.id === selectedId) ?? visible[0] ?? catalog.items[0];
  const snippet = selected ? exampleCode(catalogKey, selected) : "// No matching surface";
  return <section className="page-section surface-page">
    <SectionHeading kicker="Full surface" title="Live MAATAA UI explorer" body="Select a canonical record to drive the visual preview canvas. Inspect metadata and copy IDs, import paths and generated examples from the same screen." />
    <div className="catalog-tabs" role="tablist">{CATALOGS.map((item) => <button key={item.key} data-active={item.key === catalog.key} onClick={() => setCatalogKey(item.key)}>{item.label}<span>{item.items.length}</span></button>)}</div>
    <div className="surface-workbench">
      <aside className="surface-catalog-pane">
        <div className="pane-head"><div><strong>{catalog.label}</strong><small>{matches.length} records</small></div><label className="surface-search"><span className="sr-only">Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${catalog.label.toLowerCase()}…`} /></label></div>
        <div className="surface-record-list">{visible.map((item) => <button key={item.id} className="surface-record" data-selected={selected?.id === item.id} onClick={() => setSelectedId(item.id)}><strong>{item.name}</strong><code>{item.id}</code>{item.meta && <span>{item.meta}</span>}</button>)}</div>
        <div className="surface-pagination"><button disabled={page === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}>‹</button><span>{page + 1}/{pageCount}</span><button disabled={page >= pageCount - 1} onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}>›</button></div>
      </aside>
      <div className="surface-preview-pane">
        <div className="pane-head preview-pane-head"><div><small>VISUAL PREVIEW</small><strong>{selected?.name ?? "No result"}</strong></div><div className="preview-mode-badges"><span>live</span><span>responsive</span></div></div>
        <div className="surface-preview-canvas">{selected && <PreviewCanvas catalogKey={catalogKey} item={selected} propOverrides={propValues}/>}</div>
      </div>
      <aside className="surface-inspector-pane">
        {selected && <><div className="inspector-section"><small>SELECTED</small><h3>{selected.name}</h3><div className="copy-row"><code>{selected.id}</code><CopyButton text={selected.id} label="Copy ID"/></div>{selected.meta && <p>{selected.meta}</p>}</div>{selected.importPath && <div className="inspector-section"><small>IMPORT</small><div className="copy-stack"><code>{selected.importPath}</code><CopyButton text={selected.importPath} label="Copy path"/></div></div>}{(catalogKey === "components" || catalogKey === "atoms") && <div className="inspector-section"><small>LIVE PROPS</small><ComponentPropInspector componentName={selected.name} values={propValues} onChange={setPropValues}/></div>}<div className="inspector-section"><CodeBlock code={snippet} label="Example"/></div><div className="inspector-section inspector-links"><a href="#/playground">Open Playground</a><a href="#/sandbox">Open Sandbox</a><a href="#/docs">Read docs</a></div></>}
      </aside>
    </div>
  </section>;
}

function KeyboardControls() {
 const [modal,setModal]=React.useState(false),[drawer,setDrawer]=React.useState(false),[choice,setChoice]=React.useState("one");
 const options=[{value:"one",label:"One"},{value:"two",label:"Two"}];
 return <Card header={<strong>Keyboard controls</strong>}><div className="specimen-actions"><Button onClick={()=>setModal(true)}>Open dialog</Button><Button variant="secondary" onClick={()=>setDrawer(true)}>Open drawer</Button></div>
 <Combobox label="First choice" value={choice} onValueChange={setChoice} options={options}/><Combobox label="Second choice" options={options}/>
 <Modal open={modal} onClose={()=>setModal(false)} title="Keyboard dialog"><Input aria-label="Dialog name"/><Button onClick={()=>setModal(false)}>Done</Button></Modal>
 <Drawer open={drawer} onClose={()=>setDrawer(false)} title="Keyboard drawer"><Button onClick={()=>setDrawer(false)}>Done</Button></Drawer>
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
        <div className="playground-viewport" data-theme={theme} data-density={density} style={{maxWidth: width, "--play-radius": `${radius}px`} as React.CSSProperties}>
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

const DEFAULT_SANDBOX: SandboxSpec = { title: "MAATAA Operations Sandbox", subtitle: "Safe isolated composition preview", blocks: ["header", "metrics", "form", "actions"], accent: "gold", compact: false };

function SandboxScene({ spec }: { spec: SandboxSpec }) {
  return <div className="sandbox-scene" data-accent={spec.accent} data-compact={spec.compact}><div className="sandbox-chrome"><span></span><span></span><span></span><strong>isolated sandbox</strong></div>{spec.blocks.map((block) => {
    if (block === "header") return <div className="sb-header" key={block}><div className="sb-header-identity"><IdentityAvatar identity="IDENTITY.BRAHMINI" size={48}/><div><small>COMPOSITION</small><h2>{spec.title}</h2><p>{spec.subtitle}</p></div></div><IdentityAvatarGroup identities={["IDENTITY.SHIV","IDENTITY.PARVATI","IDENTITY.SAPTARISHI.GAUTAMA"]} size={30}/></div>;
    if (block === "metrics") return <div className="sb-metrics" key={block}><Stat value="48" label="records"/><Stat value="92%" label="quality"/><Stat value="7" label="actions"/></div>;
    if (block === "form") return <Card key={block} header={<strong>Configuration</strong>}><div className="sb-form"><label>Name<Input defaultValue="MAATAA surface"/></label><label>Mode<select defaultValue="preview"><option>preview</option><option>review</option></select></label></div></Card>;
    if (block === "table") return <Card key={block} header={<strong>Records</strong>}><table className="sb-table"><tbody><tr><td>Surface Registry</td><td><Badge tone="success">ready</Badge></td></tr><tr><td>Device Matrix</td><td><Badge tone="info">simulated</Badge></td></tr><tr><td>Evidence Pack</td><td><Badge tone="warning">review</Badge></td></tr></tbody></table></Card>;
    if (block === "activity") return <Card key={block} header={<strong><MaataaIcon name="activity"/> Activity</strong>}><div className="preview-list"><div><IdentityBadge identity="IDENTITY.SAPTARISHI.GAUTAMA" size={22}/> <span>10:20 Registry validated</span></div><div><IdentityBadge identity="IDENTITY.PARVATI" size={22}/> <span>10:22 Preview composed</span></div><div><IdentityBadge identity="IDENTITY.SAPTARISHI.VASHISTHA" size={22}/> <span>10:24 Evidence updated</span></div></div></Card>;
    return <div className="sb-actions" key={block}><Button>Save composition</Button><Button variant="secondary">Preview</Button><Button variant="ghost">Reset</Button></div>;
  })}</div>;
}

function sandboxJsx(spec: SandboxSpec) {
  const lines = spec.blocks.map((block) => `      <${({header:'PageHeader',metrics:'MetricGrid',form:'FormPanel',table:'DataTable',actions:'ActionBar',activity:'ActivityPanel'} as Record<SandboxBlock,string>)[block]} />`).join("\n");
  return `export function SandboxComposition() {\n  return (\n    <WorkspaceSurface title="${spec.title.replace(/"/g,'\\"')}">\n${lines}\n    </WorkspaceSurface>\n  );\n}`;
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
  React.useEffect(()=>setDraft(JSON.stringify(scene,null,2)),[scene]);
  const applyJson=()=>{try{const parsed=JSON.parse(draft);dispatch(builderActions.setScene(parsed));setError(null)}catch(reason){setError(reason instanceof Error?reason.message:"Invalid JSON")}};
  return <section className="page-section">
    <SectionHeading kicker="MAATAA Visual Composer" title="Compose real package components" body="Drag or add package-owned blocks, reorder them on canvas, edit props, switch workspace/page/layout/device/state context, undo/redo, persist locally, and preview the resulting canonical composition." />
    <div className="composer-mode-tabs"><button data-active={mode==="compose"} onClick={()=>setMode("compose")}>Composer</button><button data-active={mode==="preview"} onClick={()=>setMode("preview")}>Responsive preview</button><button data-active={mode==="json"} onClick={()=>setMode("json")}>Scene JSON</button><span>Selected: {selectedBlock?.id ?? "none"}</span></div>
    {mode==="compose" && <VisualComposer scene={scene} selectedBlockId={selectedBlock?.id??null} canUndo={canUndo} canRedo={canRedo} onSceneChange={(next)=>dispatch(builderActions.setScene(next))} onSelectBlock={(id)=>dispatch(builderActions.selectBlock(id))} onUndo={()=>dispatch(builderActions.undo())} onRedo={()=>dispatch(builderActions.redo())}/>} 
    {mode==="preview" && <div className="composer-preview-grid"><ResponsiveDeviceRuntime deviceId={scene.deviceId}><CanonicalCompositionRuntime scene={scene}/></ResponsiveDeviceRuntime><ResponsiveDeviceRuntime deviceId="DEVICE.PHONES.SMARTPHONE" orientation="portrait"><CanonicalCompositionRuntime scene={{...scene,deviceId:"DEVICE.PHONES.SMARTPHONE"}}/></ResponsiveDeviceRuntime></div>}
    {mode==="json" && <div className="composer-json"><div className="editor-tabs"><strong>Canonical ComposerScene</strong><CopyButton text={draft}/></div><textarea value={draft} onChange={(e)=>setDraft(e.target.value)} spellCheck={false}/>{error&&<div className="sandbox-error">{error}</div>}<div className="support-actions"><button className="gold-button" onClick={applyJson}>Apply JSON</button><button className="ghost-button" onClick={()=>dispatch(builderActions.resetScene())}>Reset scene</button></div></div>}
  </section>;
}

function DemoDashboard() {
  const dispatch = useMaataaDispatch();
  const scenario = useMaataaSelector(selectDemoScenario);
  const unread = useMaataaSelector(selectUnreadNotificationCount);
  const workspace = useMaataaSelector(selectWorkspace);
  const page = useMaataaSelector(selectPage);
  const layout = useMaataaSelector(selectLayout);
  const device = useMaataaSelector(selectDevice);
  const ai = useMaataaSelector(selectAI);
  const compositionJson = JSON.stringify({workspace:workspace.activeWorkspaceTypeId,page:page.activePageTypeId,layout:layout.activeLayoutTypeId,device:device.deviceId,aiSpace:scenario.aiSpaceId ?? ai.activeSpaceId},null,2);
  return <section className="page-section">
    <SectionHeading kicker="Demos" title="Deterministic Redux scenario hub" body="Scenario switching updates workspace, page, layout and device state from canonical IDs." />
    <div className="scenario-grid">{DEMO_SCENARIOS.map((item) => <button className="scenario-card" data-active={item.id === scenario.id} key={item.id} onClick={() => dispatch(demoActions.activateScenario(item.id))}><strong>{item.name}</strong><span>{item.description}</span></button>)}</div>
    <div className="demo-dashboard-header"><div className="demo-dashboard-identity"><IdentityAvatar identity="IDENTITY.BRAHMINI" size={58}/><div><div className="demo-kicker">Active scenario</div><h2>{scenario.name}</h2><p>{scenario.description}</p></div></div><div className="header-copy-group"><IdentityAvatarGroup identities={["IDENTITY.SHIV","IDENTITY.PARVATI","IDENTITY.SAPTARISHI.GAUTAMA","IDENTITY.PANCHTATVA.AGNI"]} size={30}/><span className="demo-badge">{unread} unread</span><CopyButton text={compositionJson} label="Copy composition"/></div></div>
    <div className="metrics-grid compact"><Stat value={PAGE_TYPES.length} label="pages"/><Stat value={WORKSPACE_TYPES.length} label="workspaces"/><Stat value={LAYOUT_TYPES.length} label="layouts"/><Stat value={DEVICE_REGISTRY.length} label="devices"/></div>
    <div className="demo-grid">
      <article className="demo-card wide"><h2>Active composition</h2><ul className="demo-list"><li className="demo-row"><span>Workspace</span><span className="demo-code">{workspace.activeWorkspaceTypeId}</span></li><li className="demo-row"><span>Page</span><span className="demo-code">{page.activePageTypeId}</span></li><li className="demo-row"><span>Layout</span><span className="demo-code">{layout.activeLayoutTypeId}</span></li><li className="demo-row"><span>Device</span><span className="demo-code">{device.deviceId}</span></li><li className="demo-row"><span>AI space</span><span className="demo-code">{scenario.aiSpaceId ?? ai.activeSpaceId}</span></li></ul></article>
      <article className="demo-card wide"><h2>Finance demo</h2><ul className="demo-list"><li className="demo-row"><span>Cash available</span><strong>{money.format(DEMO_FINANCE_KPIS.cashAvailable)}</strong></li><li className="demo-row"><span>Committed cost</span><strong>{money.format(DEMO_FINANCE_KPIS.committedCost)}</strong></li><li className="demo-row"><span>Event budget</span><strong>{money.format(DEMO_FINANCE_KPIS.eventBudget)}</strong></li><li className="demo-row"><span>Approvals pending</span><strong>{DEMO_FINANCE_KPIS.approvalsPending}</strong></li></ul></article>
      <article className="demo-card wide"><h2>Projects</h2><ul className="demo-list">{DEMO_PROJECTS.slice(0, 4).map((project) => <li key={project.id}><div className="demo-row"><span>{project.name}</span><strong>{project.progress}%</strong></div><div className="demo-progress"><span style={{ width: `${project.progress}%` }} /></div></li>)}</ul></article>
      <article className="demo-card wide"><h2>AI evaluations</h2><ul className="demo-list">{DEMO_EVALUATIONS.map((evaluation) => <li className="demo-row" key={evaluation.id}><span>{evaluation.name}</span><strong>{Math.round(evaluation.score * 100)}%</strong></li>)}</ul></article>
      <article className="demo-card full"><h2>Static event data</h2><div className="table-scroll"><table className="demo-table"><thead><tr><th>Event</th><th>City</th><th>Status</th><th>Guests</th><th>Budget</th></tr></thead><tbody>{DEMO_EVENTS.map((event) => <tr key={event.id}><td>{event.name}</td><td>{event.city}</td><td>{event.status}</td><td>{event.guests}</td><td>{money.format(event.budget)}</td></tr>)}</tbody></table></div></article>
      <article className="demo-card wide"><h2>Tasks</h2><ul className="demo-list">{DEMO_TASKS.map((task) => <li className="demo-row" key={task.id}><span>{task.name}</span><span>{task.status} · {task.priority}</span></li>)}</ul></article>
      <article className="demo-card wide"><h2>Demo identities</h2><div className="identity-card-grid">{DEMO_USERS.slice(0,8).map((user)=><div key={user.id}><IdentityBadge identity={user.identityId} size={32} showRole/></div>)}</div></article>
      <article className="demo-card wide"><h2>Agents</h2><ul className="demo-list">{DEMO_AGENTS.map((agent) => <li className="demo-row" key={agent.id}><span>{agent.identityId ? <IdentityBadge identity={agent.identityId} size={28}/> : agent.name}</span><span>{agent.status}</span></li>)}</ul></article>
    </div>
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
      <article className="doc-article" id="docs-identities"><h3>Icons & symbolic demo identities</h3><p>{DEMO_IDENTITIES.length} symbolic demo identities and {ICON_REGISTRY.length} core vector icons are available. Identity software roles are demo metaphors, not theological claims.</p><CodeBlock code={codeExamples.identity}/><div style={{marginTop:16}}><IdentityAvatarGroup identities={DEMO_IDENTITIES.map((entry)=>entry.id)} size={36} max={15}/></div></article>
      <article className="doc-article" id="docs-devices"><h3>Devices & responsive</h3><p>{DEVICE_REGISTRY.length} canonical device definitions are available for visual simulation and responsive metadata. A declared frame is not a claim of real-device certification.</p></article>
      <article className="doc-article" id="docs-ai"><h3>AI surfaces</h3><p>{AI_SPACE_REGISTRY.length} AI spaces and {TOOL_REGISTRY.length} tools define host-neutral UI vocabulary. Actual model/tool execution remains outside the package.</p></article>
      <article className="doc-article" id="docs-theming"><h3>Theming</h3><p>Theme/token vocabulary is package-owned. Gold glare remains static at rest and may animate only on hover, focus or active interaction states.</p></article>
      <article className="doc-article" id="docs-accessibility"><h3>Accessibility</h3><p>Keyboard, focus, semantics, contrast and reduced-motion behavior are required certification dimensions; demo presence alone is not certification.</p></article>
    </div>
  </section>;
}

function Help({ navigate }: { navigate: (path: string) => void }) {
  const [open, setOpen] = React.useState<string | null>(PUBLIC_SURFACE_HELP_TOPICS[0]?.id ?? null);
  return <section className="page-section"><SectionHeading kicker="Help center" title="Find answers quickly" body="Setup, visual explorer, playground, sandbox and package-usage guidance." />
    <div className="help-actions"><button onClick={() => navigate("/surface")}>Full Surface</button><button onClick={() => navigate("/playground")}>Playground</button><button onClick={() => navigate("/sandbox")}>Sandbox</button><button onClick={() => navigate("/docs")}>Documentation</button><button onClick={() => navigate("/support")}>Support</button></div>
    <div className="faq-list">{PUBLIC_SURFACE_HELP_TOPICS.map((topic) => <article key={topic.id} className="faq-item" data-open={open === topic.id}><button onClick={() => setOpen(open === topic.id ? null : topic.id)} aria-expanded={open === topic.id}><span>{topic.title}</span><span>{open === topic.id ? '−' : '+'}</span></button>{open === topic.id && <p>{topic.body}</p>}</article>)}</div>
    <div className="help-grid"><article><h3>Package architecture</h3><p>Use Full Surface to verify whether a page, layout, device, generator, tool or AI space already exists before creating another identity.</p></article><article><h3>Runtime boundary</h3><p>The demo is deterministic and local. Identity, authorization, APIs, databases, live AI and external providers must be bound by the host application.</p></article><article><h3>Certification</h3><p>Distinguish declared, simulated, tested and certified support. Catalog coverage is not equivalent to runtime/browser/device certification.</p></article></div>
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
  let content: React.ReactNode;
  if (route === "/") content = <Landing navigate={navigate}/>;
  else if (route.startsWith("/surface")) content = <SurfaceExplorer/>;
  else if (route.startsWith("/playground")) content = <Playground/>;
  else if (route.startsWith("/sandbox")) content = <Sandbox/>;
  else if (route.startsWith("/demos")) content = <DemoDashboard/>;
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
