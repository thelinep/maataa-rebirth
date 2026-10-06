export type PublicSurfaceRoute = Readonly<{
  id: string;
  path: string;
  label: string;
  description: string;
  pageTypeId: string;
}>;

export const PUBLIC_SURFACE_ROUTES: readonly PublicSurfaceRoute[] = [
  { id: "PUBLIC_SURFACE.LANDING", path: "/", label: "Home", description: "MAATAA UI landing and package overview.", pageTypeId: "PAGE.MARKETING_CORPORATE.LANDING" },
  { id: "PUBLIC_SURFACE.SURFACE", path: "/surface", label: "Full Surface", description: "Search, preview and inspect every canonical UI surface catalog.", pageTypeId: "PAGE.DESIGN_SYSTEM.COMPONENT_GALLERY" },
  { id: "PUBLIC_SURFACE.PLAYGROUND", path: "/playground", label: "Playground", description: "Interactive MAATAA component, layout and responsive playground.", pageTypeId: "PAGE.EXPERIMENTAL_INTERNAL.PLAYGROUND" },
  { id: "PUBLIC_SURFACE.SANDBOX", path: "/sandbox", label: "Sandbox", description: "Isolated composition sandbox with generated JSX and JSON.", pageTypeId: "PAGE.EXPERIMENTAL_INTERNAL.SANDBOX" },
  { id: "PUBLIC_SURFACE.DEMOS", path: "/demos", label: "Demos", description: "Deterministic Redux demo scenarios.", pageTypeId: "PAGE.EXPERIMENTAL_INTERNAL.DEMO" },
  { id: "PUBLIC_SURFACE.DOCS", path: "/docs", label: "Docs", description: "Package architecture, imports, Redux, devices and AI documentation.", pageTypeId: "PAGE.DOCUMENTATION_DEVELOPER.DOCUMENTATION_HOME" },
  { id: "PUBLIC_SURFACE.HELP", path: "/help", label: "Help", description: "Getting-started guidance and troubleshooting.", pageTypeId: "PAGE.DOCUMENTATION_DEVELOPER.KNOWLEDGE_BASE_HOME" },
  { id: "PUBLIC_SURFACE.SUPPORT", path: "/support", label: "Support", description: "Demo support center and local ticket composer.", pageTypeId: "PAGE.MARKETING_CORPORATE.SUPPORT_LANDING" }
] as const;

export const PUBLIC_SURFACE_DOC_SECTIONS = [
  { id: "getting-started", title: "Getting started", summary: "Install, import and run the MAATAA UI demo host." },
  { id: "architecture", title: "Architecture", summary: "Registry → Workspace → Page → Layout → Region → Component → Atom." },
  { id: "surface", title: "Live surface explorer", summary: "Select catalog records and inspect visual preview, metadata and copyable code." },
  { id: "playground", title: "Playground", summary: "Interactively tune theme, density, radius and device width while previewing MAATAA components." },
  { id: "sandbox", title: "Sandbox", summary: "Compose a safe isolated scene, edit JSON configuration and copy generated JSX." },
  { id: "redux", title: "Redux demo state", summary: "Optional typed demo slices, selectors, listeners, preloaded scenarios and interaction state." },
  { id: "registries", title: "Registry system", summary: "Governed catalogs for UI, devices, AI, generators, tools, Redux and demo data." },
  { id: "devices", title: "Device system", summary: "187 device definitions plus viewport, input, orientation, capability, safe-area and transformation metadata." },
  { id: "identities", title: "Icons & working agents", summary: "Fifteen named software identities map to task prompts and provider assignments in the optional Brahmini Workbench, alongside MAATAA core vector icons." },
  { id: "ai", title: "AI surfaces", summary: "AI spaces, agents, prompts, models, knowledge, evaluation, safety and evidence-oriented UI vocabulary." },
  { id: "theming", title: "Theming", summary: "Tokens, themes and interaction rules, including static-at-rest gold glare." },
  { id: "accessibility", title: "Accessibility", summary: "Keyboard, focus, contrast, reduced-motion and semantic requirements." }
] as const;

export const PUBLIC_SURFACE_HELP_TOPICS = [
  { id: "run-demo", title: "Run the demo", body: "Run pnpm install, then pnpm demo. The Vite host starts at 127.0.0.1:4173 by default." },
  { id: "surface-preview", title: "Preview a surface", body: "Open Full Surface, select any catalog record, then use the center preview canvas and right inspector. Copy ID, import path or generated example directly." },
  { id: "playground", title: "Use the Playground", body: "Open Playground to tune theme, density, radius and viewport width while interacting with real MAATAA components." },
  { id: "sandbox", title: "Use the Sandbox", body: "Open Sandbox to add/remove composition blocks, edit the JSON scene spec, apply it safely, and copy generated JSX or JSON." },
  { id: "build-demo", title: "Build the demo", body: "Run pnpm demo:build to create a production Vite build of the public/demo surface." },
  { id: "imports", title: "Use direct imports", body: "Prefer explicit public subpaths such as @maataa/ui/actions/Button or @maataa/ui/layouts/HolyGrailLayout." },
  { id: "identity-avatars", title: "Use icons and agent identities", body: "Import IdentityAvatar from @maataa/ui/identity/IdentityAvatar and MaataaIcon from @maataa/ui/icons/MaataaIcon. Brahmini Workbench assigns the named software identities to agent roles; avatar components only render their visual identity." },
  { id: "redux", title: "Use Redux optionally", body: "Import createMaataaStore or MaataaReduxProvider from @maataa/ui/redux only when demo/application state is required." },
  { id: "esbuild", title: "pnpm blocks esbuild", body: "Approve esbuild for the project build policy, rebuild it, and rerun pnpm demo." },
  { id: "authority", title: "UI is not authority", body: "Permissions, production identity, APIs, database writes and model/tool execution remain host/runtime responsibilities. The optional local Brahmini demo host can call configured models but does not authorize production actions." }
] as const;

export const PUBLIC_SURFACE_SUPPORT_CATEGORIES = [
  "Installation",
  "TypeScript / types",
  "Components",
  "Layouts & pages",
  "Full Surface preview",
  "Playground & sandbox",
  "Redux demo",
  "Devices & responsive",
  "AI surfaces",
  "Accessibility",
  "Build / package",
  "Other"
] as const;
