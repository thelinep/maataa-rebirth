import React from "react";
import { WORKSPACE_TYPES } from "@maataa/ui/registries/workspaceRegistry";
import { createWorkspaceDataSlice } from "../redux-demo/workspaceDataSlices";
import {
  ACTOR_REGISTRY,
  AI_SPACE_REGISTRY,
  ATOMIC_COMPONENT_REGISTRY,
  COMPONENT_REGISTRY,
  DEMO_DATASET_REGISTRY,
  DEMO_SCENARIO_REGISTRY,
  DEVICE_CAPABILITY_REGISTRY,
  DEVICE_REGISTRY,
  GENERATOR_REGISTRY,
  ICON_REGISTRY,
  INPUT_MODALITY_REGISTRY,
  LAYOUT_TYPES,
  ORIENTATION_REGISTRY,
  PAGE_TYPES,
  REDUX_SELECTOR_REGISTRY,
  REDUX_SLICE_REGISTRY,
  REGION_REGISTRY,
  REGISTRY_REGISTRY,
  RESPONSIVE_TRANSFORMATION_REGISTRY,
  SAFE_AREA_REGISTRY,
  THEME_REGISTRY,
  TOOL_REGISTRY,
  TYPE_CONTRACT_REGISTRY,
  VIEWPORT_REGISTRY,
} from "@maataa/ui/registries";
import * as HookExports from "@maataa/ui/hooks";
import * as LayoutAtoms from "@maataa/ui/layout-atoms";
import * as PageAtoms from "@maataa/ui/page-atoms";
import * as WorkspaceAtoms from "@maataa/ui/workspace-atoms";
import * as RegistryAtoms from "@maataa/ui/registry-atoms";
import * as GeneratorAtoms from "@maataa/ui/generator-atoms";
import * as ToolAtoms from "@maataa/ui/tool-atoms";
import * as AISpaceAtoms from "@maataa/ui/ai-space-atoms";
import * as DeviceAtoms from "@maataa/ui/device-atoms";
import { ADDITIONAL_PACKAGES } from "./ProductPackages";
const GameSupportCenter = React.lazy(() => import("./GameSupportCenter").then((module) => ({ default: module.GameSupportCenter })));
const ArtworkGallery = React.lazy(() => import("./ArtworkGallery").then((module) => ({ default: module.ArtworkGallery })));
const GameResources = React.lazy(() => import("./GameResources").then((module) => ({ default: module.GameResources })));
import { readStoredValue, removeStoredValue, SearchField, SelectField, TextAreaField, TextField, writeStoredValue } from "@maataa/ui/compounds";

type Article = {
  id: string;
  title: string;
  category: string;
  updated: string;
  summary: string;
  body: string[];
  related?: string[];
};
type LocalRequest = {
  id: string;
  category: string;
  subject: string;
  details: string;
  workspace: string;
  email: string;
  createdAt: string;
};
type Draft = Omit<LocalRequest, "id" | "createdAt">;
type ScreenshotGroup =
  | "App screens"
  | "Catalogues"
  | "Demo experiences"
  | "Support Center"
  | "Responsive views"
  | "Interaction states";
type Screenshot = {
  id: string;
  title: string;
  description: string;
  group: ScreenshotGroup;
  route: string;
};
const readRoute = () =>
  window.location.hash.replace(/^#\/?/, "").split("?")[0] || "home";
const readTopic = () =>
  new URLSearchParams(window.location.hash.split("?")[1] ?? "").get(
    "category",
  ) ?? "All topics";
const readGalleryGroup = () => {
  const requested = new URLSearchParams(
    window.location.hash.split("?")[1] ?? "",
  ).get("group");
  return [
    "App screens",
    "Catalogues",
    "Demo experiences",
    "Support Center",
    "Responsive views",
    "Interaction states",
  ].includes(requested ?? "")
    ? requested!
    : "All screenshots";
};

const ARTICLES: Article[] = [
  {
    id: "gaming-ui", title: "Get started with Arcade Quest and Game UI Help", category: "Appearance", updated: "Local theme guide",
    summary: "Preview the video game inspired MAATAA theme and find help for local demos.",
    body: ["Choose MAATAA · Arcade Quest in Theme Studio. It uses a dark violet palette, lavender actions, mint focus indicators and compact solid surfaces. Selection changes the preview only; Apply theme applies it locally.", "Game UI Help includes searchable setup, troubleshooting and accessibility guides, plus the existing local support handoff. This is an interface theme and help hub, not a playable game or a connected ticket service."],
    related: ["themes", "accessibility", "support"],
  },
  {
    id: "start",
    title: "Start with MAATAA UI",
    category: "Getting started",
    updated: "Product guide",
    summary:
      "Choose a surface, inspect its records, then use the package from your host application.",
    body: [
      "The standalone demo is a browser-based catalogue and component workspace. Begin at Full Surface to search the canonical records and inspect the selected preview, metadata, and import example.",
      "Use the Playground to interact with package-owned components and the Sandbox to compose a scene from the allowed building blocks. The demo does not provide a production API or database.",
    ],
    related: ["surface", "playground", "sandbox"],
  },
  {
    id: "surface",
    title: "Find and inspect a surface",
    category: "Catalogues",
    updated: "Explorer guide",
    summary:
      "Search a canonical page, workspace, layout, device, generator, tool, or AI-space record.",
    body: [
      "Choose a catalogue, enter part of a name or canonical ID, then select a result. The preview, details, and generated example are driven by that record.",
      "A record establishes catalogue vocabulary. A preview or simulated device does not prove a production integration or real-device certification.",
    ],
    related: ["workspaces", "components"],
  },
  {
    id: "surface-states",
    title: "Examples, skeletons, and interface states",
    category: "Layouts and pages",
    updated: "Interactive specimen guide",
    summary:
      "Switch each surface preview between its working example, loading skeleton, empty, error, and disabled states.",
    body: [
      "In Full Surface, select a component, atomic component, layout, page, workspace, generator, or AI-space record. Use the state controls above the preview to compare the example with its loading skeleton, empty state, error recovery, and disabled treatment. The same controls follow the selected record, so you can review state patterns throughout each catalogue.",
      "Component examples load package-owned previews where available. Layouts, pages, and workspaces render illustrative compositions and synthetic data slices. Generator and AI-space examples remain local fixtures: they do not call a provider or execute tools. Use the screenshots below as visual references, then copy the generated import/example from the inspector.",
    ],
    related: ["surface", "components", "screenshots"],
  },
  {
    id: "product-map",
    title: "Find every MAATAA UI part",
    category: "Product map",
    updated: "Product directory",
    summary:
      "Browse the package foundations, surface registries, hooks, themes, state, and demos in one map.",
    body: [
      "The Full Surface explorer covers identities, icons, components, atomic components, pages, workspaces, layouts, devices, generators, tools, AI spaces, registries, Redux slices, selectors, type contracts, static datasets, and demo scenarios. The Product map adds hooks, visual tokens, responsive profiles, and the purpose of each layer.",
      "Counts come from the current package registries and hook exports. They describe declared catalogue entries, not proof that every entry is a complete production feature.",
    ],
    related: ["surface", "components", "redux"],
  },
  {
    id: "screenshots",
    title: "Browse MAATAA UI screenshots",
    category: "Screenshots",
    updated: "Visual gallery",
    summary:
      "See the actual app surfaces, all explorer catalogues, and each independent demo flow.",
    body: [
      "The gallery contains captures of the main MAATAA routes, each of the 17 Full Surface catalogue tabs, and all seven demo scenarios. Select a filter, search by name, and open a capture to inspect it at full size.",
      "Images are captured from the local demo and use illustrative data. A screenshot documents appearance; it does not establish a live backend or production integration.",
    ],
    related: ["surface", "playground", "support"],
  },
  {
    id: "hooks",
    title: "Use the complete hook library",
    category: "Components and hooks",
    updated: "API reference",
    summary:
      "Find the browser utility hooks, from outside-click and storage helpers to scroll-back-to-top.",
    body: [
      "The public hook surface includes useOutsideClick, useEscapeKey, useMediaQuery, useAutoHideNavbar, useResizeObserver, useIntersectionObserver, useLocalStorage, useSessionStorage, useDebounce, useClipboard, useOnlineStatus, usePagination, usePrevious, useControllableState, and useScrollBackToTop.",
      "Import hooks from @maataa/ui/hooks. Browser storage and observer behavior have fallbacks; check docs/product/HOOKS.md for each return contract and failure case.",
    ],
    related: ["components", "accessibility", "product-map"],
  },
  {
    id: "workspaces",
    title: "Browse the workspace directory",
    category: "Workspaces",
    updated: "Directory guide",
    summary:
      "The directory includes every entry in the current workspace registry, grouped by its canonical family.",
    body: [
      "Search by workspace name, identifier, or family. Select an entry to see its canonical ID and group. The directory is a reference to declared workspace types.",
      "Registry inclusion alone does not establish that each workspace is a separately implemented or connected product. Use the record's catalogue details and the current product documentation to verify behavior.",
    ],
    related: ["surface", "redux"],
  },
  {
    id: "workspace-slices",
    title: "Workspace data slices",
    category: "Workspaces",
    updated: "Synthetic data guide",
    summary:
      "Inspect the generated JSON fixture for every canonical workspace record, including TLPS and NEVO examples.",
    body: [
      "Each registry record has a deterministic, synthetic data slice with a domain profile, navigation labels, sections, a stable reference, and an explicit provenance and safety boundary. Search by workspace name, identifier, family, or sample content to inspect a slice.",
      "Download the complete JSON from the directory. It is generated from the current workspace registry and shared slice factory; it contains no live customer, booking, payment, or production data.",
    ],
    related: ["workspaces", "redux", "screenshots"],
  },
  {
    id: "playground",
    title: "Use the Playground",
    category: "Build and explore",
    updated: "Interactive guide",
    summary:
      "Change presentation controls and test package components in a live preview.",
    body: [
      "Change the theme, density, radius, and viewport controls; then interact with the rendered controls in the preview. Copy the shown example to start an integration.",
      "The Playground runs in the browser and is not an application deployment or persisted user workspace.",
    ],
    related: ["themes", "components"],
  },
  {
    id: "sandbox",
    title: "Compose a scene in Sandbox",
    category: "Build and explore",
    updated: "Interactive guide",
    summary:
      "Build a small composition from supported blocks and copy a JSON or code draft.",
    body: [
      "Select supported blocks, arrange a scene, review the generated specification, and copy the output. The sandbox does not evaluate arbitrary code.",
      "Treat generated source as a draft. Review and test it in the consuming application before use.",
    ],
    related: ["surface", "components"],
  },
  {
    id: "components",
    title: "Choose components and imports",
    category: "Development",
    updated: "Package guide",
    summary:
      "Prefer explicit package subpaths and check the registry before adding new surface vocabulary.",
    body: [
      "Package consumers can use direct imports such as @maataa/ui/actions/Button or @maataa/ui/layouts/HolyGrailLayout. Check the package export map and current documentation for the exact available entry.",
      "Generated snippets are examples. They do not replace a consumer build, typecheck, accessibility review, or application-specific testing.",
    ],
    related: ["surface", "start"],
  },
  {
    id: "redux",
    title: "Understand Redux demo state",
    category: "Data and state",
    updated: "State guide",
    summary:
      "Redux slices power optional demo state; static catalogues and product data remain separate.",
    body: [
      "Use the Redux documentation and slice registry to identify state owned by the demo layer. Static registry data is not automatically copied into Redux.",
      "Demo state is not a backend, authorization boundary, tenant store, or durable production data service.",
    ],
    related: ["workspaces", "ai"],
  },
  {
    id: "themes",
    title: "Theme, typography, and language",
    category: "Appearance",
    updated: "Theme Studio guide",
    summary:
      "Use Theme Studio for presentation tokens and global demo preferences for theme and language.",
    body: [
      "The Playground is a quick visual preview. Theme Studio exposes deeper semantic colors, font stacks, type scale, spacing, surface, borders, shadows, and motion settings.",
      "The theme studio's font stack refers to fonts available on the host. Theme preview and a language control do not establish that all product copy has been translated.",
    ],
    related: ["playground", "accessibility"],
  },
  {
    id: "branding-studio",
    title: "Build a reviewable brand and theme draft",
    category: "Appearance",
    updated: "Branding Studio guide",
    summary:
      "Move from a source-aware identity board to semantic theme preview and local product-assignment drafts.",
    body: [
      "Branding Studio keeps the brand thesis, existing asset references, candidate palette and typography, source/rights metadata, and relationships in an editable board. Drag an object's grip to position it; use the keyboard arrows or the inspector controls as an alternative. The object outline remains available as a list-based route through the board.",
      "Select the board objects to include before asking Brahmini for help. Choose a configured Local Ollama, Anthropic, or Gemini provider explicitly. Only the selected objects and your prompt are sent; there is no provider fallback. Model suggestions are validated as a structured change set and do not update the board until you accept selected changes. Provider, model, digest where supplied, prompt hash where supplied, timestamp, and count are recorded for accepted changes.",
      "Open Theme Studio to preview candidate semantic tokens against MAATAA package components. Save a local immutable Brand Kit snapshot, then create exact-version assignment drafts for MAATAA Workstation, Siddham, TLPS, NEVO, or InvestorHub. Drafts remain in this browser: they do not approve a brand, publish a domain, or deploy an application. No approved logo is included or replaced; asset rights remain owner-reviewed.",
    ],
    related: ["themes", "ai", "screenshots"],
  },
  {
    id: "accessibility",
    title: "Keyboard and accessibility checks",
    category: "Quality",
    updated: "Accessibility guide",
    summary:
      "Use keyboard controls and focus states; automated checks cover only their tested scenarios.",
    body: [
      "Navigate with the keyboard, confirm visible focus, and check reduced-motion settings. A passing automated check is evidence for its route and state, not a whole-product conformance claim.",
      "Run assistive-technology and real-device acceptance for the target product before making a certification claim.",
    ],
    related: ["themes", "support"],
  },
  {
    id: "ai",
    title: "AI surfaces and provider boundaries",
    category: "AI and providers",
    updated: "Architecture guide",
    summary:
      "AI catalogues describe UI vocabulary; model execution belongs to the configured host runtime.",
    body: [
      "AI spaces, tools, models, and evidence surfaces are registered UI concepts. The MAATAA package itself does not supply a production model provider or authorize tool execution.",
      "If you use the optional Brahmini local runtime, review the provider configuration and the exact model capability before running a task.",
    ],
    related: ["redux", "support"],
  },
  {
    id: "support",
    title: "Prepare a support handoff",
    category: "Support requests",
    updated: "Request guide",
    summary:
      "Create a reviewable request packet on this device, then copy or download it for your actual support channel.",
    body: [
      "The standalone Support Center stores draft and completed request packets locally on this device. It does not send them to a MAATAA support team.",
      "Do not include passwords, private keys, access tokens, personal data, or confidential production records. Remove sensitive material from logs before attaching them.",
    ],
    related: ["accessibility", "start"],
  },
];

const FAQS = [
  {
    q: "What is the fastest way to find a page or workspace?",
    a: "Use the search on this page, or open Workspaces to search the full current workspace registry by name, family, or ID. Open Workspace data slices to inspect synthetic sample data.",
  },
  {
    q: "Where can I find all MAATAA UI parts?",
    a: "Open Product map for components, atoms, pages, layouts, devices, generators, tools, AI spaces, hooks, themes, Redux, types, datasets, and demos.",
  },
  {
    q: "Where are the MAATAA product screenshots?",
    a: "Open Screenshots. The gallery includes app routes, all 17 explorer catalogues, and the seven independent demo experiences.",
  },
  {
    q: "Are registry counts proof that every part is finished?",
    a: "No. They count declared entries from the current registries or API exports. Verify implementation, tests, and product behavior separately.",
  },
  {
    q: "Does every registry entry mean a finished product feature?",
    a: "No. Registry entries are canonical vocabulary. Check the relevant page, implementation, tests, and product documentation for actual behavior.",
  },
  {
    q: "Does the support request go to a real team?",
    a: "No. This standalone application has no ticket service connection. It saves the request locally and lets you copy or download a handoff packet.",
  },
  {
    q: "Where are support drafts stored?",
    a: "In this app's local storage. Clearing this app's local data removes them. They are not synchronized to another device.",
  },
  {
    q: "Can I include screenshots or logs?",
    a: "The current form accepts text only. Paste a concise, redacted description and keep passwords, tokens, personal data, and confidential records out.",
  },
  {
    q: "Is the demo connected to a production database?",
    a: "No. The demo's browser state and synthetic examples are not a production database or source of operational authority.",
  },
  {
    q: "How do I preview responsive behavior?",
    a: "Use the Playground width controls or open the page at your target viewport. A simulated viewport does not replace testing on a physical device.",
  },
  {
    q: "Where do fonts and color tokens come from?",
    a: "Theme Studio edits the available preview tokens and host font stacks. Downloaded or bundled font availability depends on the consuming application.",
  },
  {
    q: "Does MAATAA run an AI model by itself?",
    a: "No. The package supplies UI and vocabulary. Any model call is the responsibility of an explicitly configured host runtime.",
  },
  {
    q: "What should I send with a bug report?",
    a: "Include the route, canonical record ID if relevant, expected result, actual result, reproducible steps, browser and version, viewport, and redacted console output.",
  },
  {
    q: "Can I restore a request on another computer?",
    a: "Not automatically. Use Download handoff to export a JSON packet and transfer it through your approved support channel.",
  },
  {
    q: "What if no article answers my question?",
    a: "Start a support handoff. The final step shows exactly what will be included and lets you copy or download it.",
  },
];
const FAQ_SECTIONS = [
  { id: "faq-demo", title: "Using MAATAA", indexes: [1, 2, 3, 9, 10, 11] },
  { id: "faq-workspaces", title: "Workspaces and data", indexes: [0, 4, 8] },
  {
    id: "faq-support",
    title: "Support and privacy",
    indexes: [5, 6, 7, 12, 13, 14],
  },
];

const CATEGORIES = [
  "Getting started",
  "Product map",
  "Screenshots",
  "Build and explore",
  "Catalogues",
  "Workspaces",
  "Components and hooks",
  "Development",
  "Data and state",
  "Appearance",
  "Quality",
  "AI and providers",
  "Support requests",
];
const APP_SCREENS = [
  {
    title: "Help home",
    group: "Discover",
    description: "Search guides, FAQs, workspace records, and support routes.",
    path: "home",
    action: "Open home",
  },
  {
    title: "Screen directory",
    group: "Discover",
    description: "Browse the app screens and see how each flow connects.",
    path: "screens",
    action: "Open screen directory",
  },
  {
    title: "Product map",
    group: "Explore",
    description:
      "Browse MAATAA UI foundations, catalogues, hooks, themes, state, and demo systems.",
    path: "product-map",
    action: "Explore product areas",
  },
  {
    title: "Package area detail",
    group: "Explore",
    description:
      "Inspect public imports and source-module paths for an individual package area.",
    path: "package/actions",
    action: "Open a package detail",
  },
  {
    title: "Screenshot gallery",
    group: "Explore",
    description:
      "View captured MAATAA application screens, all explorer catalogues, and seven demo experiences.",
    path: "screenshots",
    action: "View screenshots",
  },
  {
    title: "Guide library",
    group: "Learn",
    description: "Filter the guide set by topic and search phrase.",
    path: "guides",
    action: "Browse guides",
  },
  {
    title: "Guide detail",
    group: "Learn",
    description: "Read a guide with related links and contextual feedback.",
    path: "article/start",
    action: "Read a guide",
  },
  {
    title: "FAQ library",
    group: "Learn",
    description: "Search grouped answers about MAATAA and local handoffs.",
    path: "faqs",
    action: "Browse FAQs",
  },
  {
    title: "Workspace directory",
    group: "Registry",
    description: "Search and page through all current workspace records.",
    path: "workspaces",
    action: "Open directory",
  },
  {
    title: "Workspace data slices",
    group: "Registry",
    description:
      "Search synthetic data fixtures and inspect the generated slice contract.",
    path: "workspace-slices",
    action: "Browse data slices",
  },
  {
    title: "Branding Studio",
    group: "Create",
    description:
      "Build a source-aware Brand Kit, preview theme candidates, and draft explicit product assignments.",
    path: "branding-studio",
    action: "Open Branding Studio",
  },
  {
    title: "Workspace detail",
    group: "Registry",
    description:
      "Inspect one canonical record, its family, and related records.",
    path: "workspace/WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS",
    action: "Open an example",
  },
  {
    title: "Request form",
    group: "Support flow",
    description: "Describe an issue and optionally add workspace context.",
    path: "request/describe",
    action: "Prepare a handoff",
  },
  {
    title: "Review handoff",
    group: "Support flow",
    description:
      "Review a packet before saving; completion then offers copy and download.",
    path: "request/review",
    action: "Open review screen",
  },
  {
    title: "My handoffs",
    group: "Support flow",
    description: "Copy, download, or remove packets saved on this device.",
    path: "requests",
    action: "View saved handoffs",
  },
];
const SUPPORT_CATEGORIES = [
  "Getting started",
  "Product map and catalogues",
  "Components, atoms and hooks",
  "Screenshots and demos",
  "Layouts and pages",
  "Workspaces and registries",
  "Playground and Sandbox",
  "Theme and accessibility",
  "Redux and data",
  "AI and providers",
  "Build and packaging",
  "Other",
];

const HOOK_NAMES = Object.keys(HookExports)
  .filter((name) => /^use[A-Z]/.test(name))
  .sort();
const HOOK_EXPORT_COUNT = HOOK_NAMES.length;
const DOMAIN_ATOM_SETS = [
  {
    id: "layout-atoms",
    name: "Layout atoms",
    exports: Object.keys(LayoutAtoms).length,
    source: "@maataa/ui/layout-atoms",
    description:
      "Structural pieces such as headers, rails, panels, canvases, inspectors, regions, and responsive navigation.",
  },
  {
    id: "page-atoms",
    name: "Page atoms",
    exports: Object.keys(PageAtoms).length,
    source: "@maataa/ui/page-atoms",
    description:
      "Page roots, titles, breadcrumbs, toolbars, filters, content, summaries, empty states, and errors.",
  },
  {
    id: "workspace-atoms",
    name: "Workspace atoms",
    exports: Object.keys(WorkspaceAtoms).length,
    source: "@maataa/ui/workspace-atoms",
    description:
      "Workspace headers, navigation, command bars, sidebars, canvases, inspectors, activity, and status.",
  },
  {
    id: "registry-atoms",
    name: "Registry atoms",
    exports: Object.keys(RegistryAtoms).length,
    source: "@maataa/ui/registry-atoms",
    description:
      "Search, groups, items, counts, filters, metadata, detail, action, and empty-state primitives.",
  },
  {
    id: "device-atoms",
    name: "Device atoms",
    exports: Object.keys(DeviceAtoms).length,
    source: "@maataa/ui/device-atoms",
    description:
      "Device frames, screens, viewports, safe areas, notches, controls, input overlays, and capability badges.",
  },
  {
    id: "generator-atoms",
    name: "Generator atoms",
    exports: Object.keys(GeneratorAtoms).length,
    source: "@maataa/ui/generator-atoms",
    description:
      "Generator input, output, preview, settings, and status building blocks.",
  },
  {
    id: "tool-atoms",
    name: "Tool atoms",
    exports: Object.keys(ToolAtoms).length,
    source: "@maataa/ui/tool-atoms",
    description:
      "Tool inputs, outputs, traces, evidence, status, actions, and inspection building blocks.",
  },
  {
    id: "ai-space-atoms",
    name: "AI-space atoms",
    exports: Object.keys(AISpaceAtoms).length,
    source: "@maataa/ui/ai-space-atoms",
    description:
      "Agent, model, knowledge, tool, evaluation, safety, evidence, and observability regions.",
  },
];
const PRODUCT_SECTIONS = [
  {
    title: "Build interfaces",
    description:
      "The reusable building blocks and structural catalogues behind MAATAA surfaces.",
    areas: [
      {
        id: "components",
        name: "Components",
        count: COMPONENT_REGISTRY.length,
        unit: "registered components",
        description:
          "Buttons, forms, navigation, feedback, data display, overlays, and other importable UI pieces.",
        source: "@maataa/ui/components",
      },
      {
        id: "atoms",
        name: "Atomic components",
        count: ATOMIC_COMPONENT_REGISTRY.length,
        unit: "atomic entries",
        description:
          "Small, directly importable primitives and atoms used to assemble component compositions.",
        source: "@maataa/ui/atomic",
      },
      {
        id: "pages",
        name: "Pages",
        count: PAGE_TYPES.length,
        unit: "page types",
        description:
          "Canonical page purposes that keep the screen’s job separate from its layout.",
        source: "@maataa/ui/pages",
      },
      {
        id: "layouts",
        name: "Layouts and regions",
        count: LAYOUT_TYPES.length,
        unit: "layouts",
        description: `${REGION_REGISTRY.length} named regions and slots connect page structure to reusable components.`,
        source: "@maataa/ui/layouts",
      },
      {
        id: "workspaces",
        name: "Workspaces",
        count: WORKSPACE_TYPES.length,
        unit: "workspace types",
        description:
          "Operational contexts and their groups, with canonical IDs for app composition.",
        source: "@maataa/ui/workspaces",
      },
    ],
  },
  {
    title: "Composition atoms",
    description:
      "Domain-specific primitives are exported independently so hosts can assemble page, workspace, device, and agent surfaces.",
    areas: DOMAIN_ATOM_SETS.map((item) => ({
      id: item.id,
      name: item.name,
      count: item.exports,
      unit: "public exports",
      description: item.description,
      source: item.source,
    })),
  },
  {
    title: "Device and responsive system",
    description:
      "Declared viewport and input profiles used by previews and responsive composition.",
    areas: [
      {
        id: "devices",
        name: "Devices",
        count: DEVICE_REGISTRY.length,
        unit: "device definitions",
        description: `${VIEWPORT_REGISTRY.length} viewports, ${INPUT_MODALITY_REGISTRY.length} input modes, ${ORIENTATION_REGISTRY.length} orientations, ${DEVICE_CAPABILITY_REGISTRY.length} capabilities, ${SAFE_AREA_REGISTRY.length} safe areas, and ${RESPONSIVE_TRANSFORMATION_REGISTRY.length} transformations.`,
        source: "@maataa/ui/devices",
      },
    ],
  },
  {
    title: "Create and automate",
    description:
      "Host-neutral vocabulary for generators, tools, and AI workspaces.",
    areas: [
      {
        id: "generators",
        name: "Generators",
        count: GENERATOR_REGISTRY.length,
        unit: "generator types",
        description:
          "Registered artifact-generation concepts; execution belongs to the consuming host.",
        source: "@maataa/ui/generators",
      },
      {
        id: "tools",
        name: "Tools",
        count: TOOL_REGISTRY.length,
        unit: "tool types",
        description:
          "Tool, connector, function, MCP, and safety surfaces exposed as UI vocabulary.",
        source: "@maataa/ui/tools",
      },
      {
        id: "ai",
        name: "AI spaces",
        count: AI_SPACE_REGISTRY.length,
        unit: "AI-space types",
        description:
          "Workspace shapes for AI tasks. Registry entries do not execute a model or grant tool authority.",
        source: "@maataa/ui/ai-spaces",
      },
    ],
  },
  {
    title: "Govern the surface",
    description:
      "Registries describe the system’s names and relationships; counts indicate declared entries, not completed product features.",
    areas: [
      {
        id: "registries",
        name: "Registry definitions",
        count: REGISTRY_REGISTRY.length,
        unit: "definitions",
        description:
          "UI structure, visual tokens, behavior, navigation, accessibility, data, integration, runtime, quality, release, and AI registry families.",
        source: "@maataa/ui/registries",
      },
      {
        id: "identities",
        name: "Demo identities",
        count: ACTOR_REGISTRY.length,
        unit: "identity records",
        description:
          "Named illustrative software roles for the demo and Brahmini workbench.",
        source: "@maataa/ui/identity",
      },
      {
        id: "icons",
        name: "Icons",
        count: ICON_REGISTRY.length,
        unit: "core icons",
        description: "The package’s MAATAA SVG icon vocabulary.",
        source: "@maataa/ui/icons",
      },
      {
        id: "themes",
        name: "Themes and visual tokens",
        count: THEME_REGISTRY.length,
        unit: "built-in themes",
        description:
          "Theme Studio also covers color, type, font stacks, spacing, surfaces, borders, shadows, motion, and focus settings.",
      },
    ],
  },
  {
    title: "State, data, and behavior",
    description:
      "Optional demo state and browser utilities stay separate from production persistence and authorization.",
    areas: [
      {
        id: "hooks",
        name: "Hooks",
        count: HOOK_EXPORT_COUNT,
        unit: "public hooks",
        description: HOOK_NAMES.join(", "),
        source: "@maataa/ui/hooks",
      },
      {
        id: "redux",
        name: "Redux slices",
        count: REDUX_SLICE_REGISTRY.length,
        unit: "registered slices",
        description:
          "Typed state domains provided through the optional Redux Toolkit layer.",
        source: "@maataa/ui/redux/slices",
      },
      {
        id: "selectors",
        name: "Redux selectors",
        count: REDUX_SELECTOR_REGISTRY.length,
        unit: "registered selectors",
        description: "Typed selectors for derived demo state.",
        source: "@maataa/ui/redux/selectors",
      },
      {
        id: "types",
        name: "Type contracts",
        count: TYPE_CONTRACT_REGISTRY.length,
        unit: "contract modules",
        description:
          "Shared TypeScript contracts for IDs, navigation, devices, AI, demos, and Redux.",
        source: "@maataa/ui/types",
      },
      {
        id: "datasets",
        name: "Static datasets",
        count: DEMO_DATASET_REGISTRY.length,
        unit: "datasets",
        description:
          "Deterministic synthetic fixtures for demos; not a production source of truth.",
        source: "@maataa/ui/static-data",
      },
      {
        id: "scenarios",
        name: "Demo experiences",
        count: DEMO_SCENARIO_REGISTRY.length,
        unit: "independent scenarios",
        description:
          "MAATAA, NEVO, spatial planning, TLPS, AI evidence, mobile, and control-plane walkthroughs.",
        source: "@maataa/ui/demo",
      },
    ],
  },
  {
    title: "Additional public package areas",
    description:
      "Every remaining public package entry, with a searchable detail page and its source-module import paths.",
    areas: ADDITIONAL_PACKAGES.map((area) => ({
      id: `package-${area.id}`,
      name: area.title,
      count: area.modules.length,
      unit: "source modules",
      description: area.description,
      source: area.importPath,
      packageId: area.id,
      modules: area.modules.map((module) => module.name),
    })),
  },
];

const APP_SCREENSHOTS: Screenshot[] = [
  {
    id: "app-home",
    title: "MAATAA home",
    description: "The product entry point and system map.",
    group: "App screens",
    route: "/",
  },
  {
    id: "app-surface",
    title: "Full Surface explorer",
    description: "Live catalogue, preview canvas, and record inspector.",
    group: "App screens",
    route: "/surface",
  },
  {
    id: "app-playground",
    title: "Playground",
    description: "Global appearance controls and interactive components.",
    group: "App screens",
    route: "/playground",
  },
  {
    id: "app-sandbox",
    title: "Sandbox",
    description: "A guarded composition editor and source preview.",
    group: "App screens",
    route: "/sandbox",
  },
  {
    id: "app-demos",
    title: "Demos index",
    description: "Seven separate guided experiences.",
    group: "App screens",
    route: "/demos",
  },
  {
    id: "app-docs",
    title: "Documentation",
    description:
      "Package structure, imports, behavior, and runtime boundaries.",
    group: "App screens",
    route: "/docs",
  },
  {
    id: "app-help",
    title: "Help center",
    description: "Search and FAQ entry points.",
    group: "App screens",
    route: "/help",
  },
  {
    id: "app-support",
    title: "Support handoff",
    description: "Local issue report flow and review step.",
    group: "App screens",
    route: "/support",
  },
  {
    id: "app-theme-studio",
    title: "Theme Studio",
    description: "Typography, palette, surfaces, shadows, motion, and more.",
    group: "App screens",
    route: "/theme-studio",
  },
  {
    id: "app-branding-studio",
    title: "Branding Studio",
    description:
      "Source-aware brand board, candidate tokens, AI review, and local assignment drafts.",
    group: "App screens",
    route: "/branding-studio",
  },
  {
    id: "app-tlps-overview",
    title: "TLPS public start",
    description:
      "The first screen asks for a role and content format before the idea conversation.",
    group: "App screens",
    route: "/tlps",
  },
  {
    id: "app-tlps-marketing",
    title: "TLPS · How it works",
    description: "A simple view of the four planning steps.",
    group: "App screens",
    route: "/tlps/marketing",
  },
  {
    id: "app-tlps-catalog",
    title: "TLPS tools",
    description: "See which tools work in the demo and which are planned.",
    group: "App screens",
    route: "/tlps/catalog",
  },
  {
    id: "app-tlps-catalog-production",
    title: "TLPS · Film plan",
    description: "Sample film plan with costs, people, places and shoot days.",
    group: "App screens",
    route: "/tlps/catalog/production-film",
  },
  {
    id: "app-tlps-catalog-campaign",
    title: "TLPS · Campaigns and events",
    description: "Planned tools for ads and events.",
    group: "App screens",
    route: "/tlps/catalog/campaign-event",
  },
  {
    id: "app-tlps-catalog-finance",
    title: "TLPS · Finance",
    description: "Finance shown as its own area, separate from Evidence.",
    group: "App screens",
    route: "/tlps/catalog/finance",
  },
  {
    id: "app-tlps-catalog-evidence",
    title: "TLPS · Evidence",
    description: "A sample list of files and checks, separate from Finance.",
    group: "App screens",
    route: "/tlps/catalog/evidence",
  },
  {
    id: "app-tlps-onboarding",
    title: "TLPS guided setup",
    description:
      "Simple questions, speak or type an idea, and see the next steps.",
    group: "App screens",
    route: "/tlps/onboarding",
  },
  {
    id: "app-tlps-workflow",
    title: "TLPS workflow",
    description: "Production-planning flow and synthetic operational data.",
    group: "App screens",
    route: "/tlps-workflow",
  },
  {
    id: "app-brahmini",
    title: "Brahmini Workbench",
    description:
      "Provider configuration, role roster, and governed frontend drafts.",
    group: "App screens",
    route: "/brahmini",
  },
];
const SUPPORT_SCREENSHOTS: Screenshot[] = [
  {
    id: "support-home",
    title: "Support Center home",
    description: "Search, quick answers, guides, and workspace entry points.",
    group: "Support Center",
    route: "/home",
  },
  {
    id: "support-screen-directory",
    title: "Support Center screen directory",
    description: "Routes and flows available in the standalone help app.",
    group: "Support Center",
    route: "/screens",
  },
  {
    id: "support-product-map",
    title: "Support Center product map",
    description:
      "Searchable package areas and their source-module detail pages.",
    group: "Support Center",
    route: "/product-map",
  },
  {
    id: "support-package-detail",
    title: "Support Center package detail",
    description:
      "Public entry point and searchable source-module import index.",
    group: "Support Center",
    route: "/package/actions",
  },
  {
    id: "support-screenshot-gallery",
    title: "Support Center screenshot gallery",
    description: "Filter the full MAATAA and Support Center image collection.",
    group: "Support Center",
    route: "/screenshots?group=App%20screens",
  },
  {
    id: "support-guides",
    title: "Support Center guides",
    description: "Browse product, package, and workflow guides.",
    group: "Support Center",
    route: "/guides",
  },
  {
    id: "support-guide-detail",
    title: "Support Center guide detail",
    description:
      "Read the interactive examples and state-variants guide with screenshots.",
    group: "Support Center",
    route: "/article/surface-states",
  },
  {
    id: "support-branding-guide",
    title: "Branding Studio guide",
    description:
      "Learn the board, selected-context AI review, Theme Studio handoff, and assignment boundaries.",
    group: "Support Center",
    route: "/article/branding-studio",
  },
  {
    id: "support-faqs",
    title: "Support Center FAQs",
    description: "Search grouped answers about MAATAA and local handoffs.",
    group: "Support Center",
    route: "/faqs",
  },
  {
    id: "support-workspaces",
    title: "Support Center workspace directory",
    description: "Search canonical workspace records by name, group, or ID.",
    group: "Support Center",
    route: "/workspaces",
  },
  {
    id: "support-workspace-slices",
    title: "Support Center workspace data slices",
    description: "Search the complete synthetic workspace slice directory.",
    group: "Support Center",
    route: "/workspace-slices",
  },
  {
    id: "support-workspace-slice-tlps",
    title: "Production logistics workspace slice",
    description: "Inspect the synthetic production-logistics slice.",
    group: "Support Center",
    route: "/workspace-slice/WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS",
  },
  {
    id: "support-workspace-slice-nevo",
    title: "NEVO event workspace slice",
    description: "Inspect the synthetic event-planning slice for NEVO.",
    group: "Support Center",
    route: "/workspace-slice/WORKSPACE.EVENT.EVENT",
  },
  {
    id: "support-workspace-slices-guide",
    title: "Workspace data slices guide",
    description:
      "Read how the slice contract and generated examples fit together.",
    group: "Support Center",
    route: "/article/workspace-slices",
  },
  {
    id: "support-workspace-detail",
    title: "Support Center workspace detail",
    description: "Inspect one canonical workspace record and its family.",
    group: "Support Center",
    route: "/workspace/WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS",
  },
  {
    id: "support-request-form",
    title: "Support Center request form",
    description: "Prepare a private, device-local support handoff.",
    group: "Support Center",
    route: "/request/describe",
  },
  {
    id: "support-request-review",
    title: "Support Center handoff review",
    description: "Review a local request packet before saving it.",
    group: "Support Center",
    route: "/request/review",
  },
  {
    id: "support-saved-handoffs",
    title: "Support Center saved handoffs",
    description: "Manage request packets saved in this browser.",
    group: "Support Center",
    route: "/requests",
  },
];
const APP_ROUTES = APP_SCREENSHOTS.filter(
  (item) => item.group === "App screens",
);
const SUPPORT_ROUTES = SUPPORT_SCREENSHOTS;
const CATALOG_SCREENSHOTS: Screenshot[] = [
  ["identities", "Identities"],
  ["icons", "Icons"],
  ["components", "Components"],
  ["atoms", "Atomic components"],
  ["pages", "Pages"],
  ["workspaces", "Workspaces"],
  ["layouts", "Layouts"],
  ["devices", "Devices"],
  ["generators", "Generators"],
  ["tools", "Tools"],
  ["ai", "AI spaces"],
  ["registries", "Registries"],
  ["redux", "Redux slices"],
  ["selectors", "Redux selectors"],
  ["types", "Type contracts"],
  ["datasets", "Static datasets"],
  ["scenarios", "Demo scenarios"],
].map(([id, title]) => ({
  id: `catalog-${id}`,
  title,
  description: `Full Surface catalogue preview for ${title.toLowerCase()}.`,
  group: "Catalogues",
  route: `/surface?catalog=${id}`,
}));
const DEMO_SCREENSHOTS: Screenshot[] = [
  ["demo-ui", "MAATAA registry explorer", "/demo"],
  ["demo-nevo", "NEVO event command center", "/demo/nevo"],
  ["demo-spatial", "NEVO spatial planning", "/demo/nevo/spatial"],
  ["demo-tlps", "TLPS production", "/demo/tlps"],
  ["demo-ai-evidence", "AI evidence command center", "/demo/ai"],
  ["demo-mobile", "Mobile device preview", "/demo/mobile"],
  ["demo-control-plane", "Control-plane readiness", "/demo/control-plane"],
].map(([id, title, route]) => ({
  id,
  title,
  description: `${title} guided scenario with illustrative data.`,
  group: "Demo experiences",
  route,
}));
const RESPONSIVE_SCREENSHOTS: Screenshot[] = [
  ...APP_ROUTES.map((item) => ({
    id: `responsive-${item.id}`,
    title: `${item.title} · mobile view`,
    description: `390 × 844 responsive capture of ${item.title}.`,
    group: "Responsive views" as const,
    route: item.route,
  })),
  ...SUPPORT_ROUTES.map((item) => ({
    id: `responsive-${item.id}`,
    title: `${item.title} · mobile view`,
    description: `390 × 844 responsive capture of ${item.title}.`,
    group: "Responsive views" as const,
    route: item.route,
  })),
];
const INTERACTION_SCREENSHOTS: Screenshot[] = [
  {
    id: "state-surface-example",
    title: "Full Surface · component example",
    description:
      "Selected package component with its visual example and inspector import.",
    group: "Interaction states",
    route: "/surface",
  },
  {
    id: "state-surface-skeleton",
    title: "Full Surface · loading skeleton",
    description:
      "Responsive loading placeholder applied to a selected component record.",
    group: "Interaction states",
    route: "/surface",
  },
  {
    id: "state-surface-empty",
    title: "Full Surface · empty state",
    description: "Accessible empty-state example with recovery guidance.",
    group: "Interaction states",
    route: "/surface",
  },
  {
    id: "state-surface-error",
    title: "Full Surface · error recovery",
    description: "Illustrative inline error with a working retry action.",
    group: "Interaction states",
    route: "/surface",
  },
  {
    id: "state-surface-disabled",
    title: "Full Surface · disabled treatment",
    description:
      "Muted, non-interactive presentation for an unavailable surface example.",
    group: "Interaction states",
    route: "/surface",
  },
  {
    id: "state-surface-generator",
    title: "Full Surface · generator example",
    description:
      "Local generator input and output outline with the no-provider boundary visible.",
    group: "Interaction states",
    route: "/surface",
  },
  {
    id: "state-surface-ai-space",
    title: "Full Surface · AI-space example",
    description:
      "Synthetic AI-space context and output; no model is called and tools remain disabled.",
    group: "Interaction states",
    route: "/surface",
  },
  {
    id: "state-tlps-onboarding-perspective",
    title: "TLPS setup · your idea",
    description: "Tell us what you do, what you want to make and your idea.",
    group: "Interaction states",
    route: "/tlps/onboarding",
  },
  {
    id: "state-tlps-onboarding-work-area",
    title: "TLPS setup · help choices",
    description:
      "Choose step-by-step help, writing help or more automatic work.",
    group: "Interaction states",
    route: "/tlps/onboarding",
  },
  {
    id: "state-tlps-onboarding-review",
    title: "TLPS setup · next steps",
    description: "Six film steps with each tool marked as a demo or planned.",
    group: "Interaction states",
    route: "/tlps/onboarding",
  },
  {
    id: "state-tlps-onboarding-casting",
    title: "TLPS I2R · casting and pre-production OS",
    description:
      "Pre-production expanded to show Casting, Crew, Location, Equipment & Logistics, Finance, and their registered workspaces.",
    group: "Interaction states",
    route: "/tlps/onboarding",
  },
  {
    id: "state-tlps-onboarding-casting-roles",
    title: "TLPS I2R · cast and crew role lists",
    description:
      "The cast, crew and heads-of-department role vocabulary with contract rate bases, explicitly labeled as type contracts.",
    group: "Interaction states",
    route: "/tlps/onboarding",
  },
  {
    id: "state-tlps-workflow-budget",
    title: "TLPS workflow · budget planning",
    description: "Browser-local budget step with its ceiling and line items.",
    group: "Interaction states",
    route: "/tlps-workflow",
  },
  {
    id: "state-tlps-workflow-evidence",
    title: "TLPS workflow · evidence",
    description: "Local evidence metadata and file-hash workflow state.",
    group: "Interaction states",
    route: "/tlps-workflow",
  },
  {
    id: "state-playground-dialog",
    title: "Playground · open dialog",
    description: "Keyboard demo with an open modal dialog.",
    group: "Interaction states",
    route: "/playground",
  },
  {
    id: "state-theme-studio-colors",
    title: "Theme Studio · colors",
    description: "Color controls and semantic palette preview.",
    group: "Interaction states",
    route: "/theme-studio",
  },
  {
    id: "state-branding-ai-suggestions",
    title: "Branding Studio · AI suggestions",
    description:
      "Selected-context provider output held for human review before any board change.",
    group: "Interaction states",
    route: "/branding-studio",
  },
  {
    id: "state-support-search",
    title: "Support Center · search results",
    description:
      "Help search results across guides, answers, and the workspace directory.",
    group: "Interaction states",
    route: "/home",
  },
  {
    id: "state-support-faq-expanded",
    title: "Support Center · expanded answer",
    description: "An FAQ answer opened for direct reading.",
    group: "Interaction states",
    route: "/faqs",
  },
  {
    id: "state-support-mobile-navigation",
    title: "Support Center · mobile navigation",
    description: "The navigation menu expanded at a mobile viewport.",
    group: "Interaction states",
    route: "/home",
  },
];
const SCREENSHOTS: Screenshot[] = [
  ...APP_SCREENSHOTS,
  ...CATALOG_SCREENSHOTS,
  ...DEMO_SCREENSHOTS,
  ...SUPPORT_SCREENSHOTS,
  ...RESPONSIVE_SCREENSHOTS,
  ...INTERACTION_SCREENSHOTS,
];
const DRAFT_KEY = "maataa-support-center-draft-v1";
const REQUESTS_KEY = "maataa-support-center-requests-v1";
const pageSize = 30;

/** Stored JSON must have the fallback's shape (array, object or primitive type); anything else is ignored. */
function readJson<T>(key: string, fallback: T): T {
  return readStoredValue<T>(key, (raw) => {
    if (Array.isArray(fallback)) return Array.isArray(raw) ? (raw as T) : null;
    return raw !== null && typeof raw === typeof fallback && !Array.isArray(raw) ? (raw as T) : null;
  }, fallback);
}
function writeJson(key: string, value: unknown) {
  writeStoredValue(key, value); // Private mode may refuse; the in-memory state still updates.
}
function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" />
        <path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="5" rx="1" />
        <rect x="13" y="10" width="8" height="11" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
      </>
    ),
    chat: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l-2 2v-9.5a7.5 7.5 0 0 1 15 0" />
        <path d="M8 11h.01M12 11h.01M16 11h.01" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m0 0 5-5m-5 5-5-5" />
        <path d="M4 17v4h16v-4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] ?? paths.book}
    </svg>
  );
}

export function SupportCenter() {
  const [route, setRoute] = React.useState(readRoute);
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState(readTopic);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [productQuery, setProductQuery] = React.useState("");
  const [sliceQuery, setSliceQuery] = React.useState("");
  const [packageQuery, setPackageQuery] = React.useState("");
  const [galleryQuery, setGalleryQuery] = React.useState("");
  const [galleryGroup, setGalleryGroup] = React.useState(readGalleryGroup);
  const [selectedScreenshot, setSelectedScreenshot] =
    React.useState<Screenshot | null>(null);
  const [draft, setDraft] = React.useState<Draft>(() =>
    readJson<Draft>(DRAFT_KEY, {
      category: SUPPORT_CATEGORIES[0],
      subject: "",
      details: "",
      workspace: "",
      email: "",
    }),
  );
  const [requests, setRequests] = React.useState<LocalRequest[]>(() =>
    readJson(REQUESTS_KEY, []),
  );
  const [feedback, setFeedback] = React.useState<Record<string, string>>({});
  const [copied, setCopied] = React.useState(false);
  const [copyError, setCopyError] = React.useState(false);
  const selectedWorkspace = route.startsWith("workspace/")
    ? WORKSPACE_TYPES.find(
        (item) => item.id === decodeURIComponent(route.slice(10)),
      )
    : undefined;
  const selectedWorkspaceSliceRecord = route.startsWith("workspace-slice/")
    ? WORKSPACE_TYPES.find(
        (item) =>
          item.id ===
          decodeURIComponent(route.slice("workspace-slice/".length)),
      )
    : undefined;
  const selectedWorkspaceSlice = selectedWorkspaceSliceRecord
    ? createWorkspaceDataSlice(selectedWorkspaceSliceRecord)
    : undefined;
  const productPackage = route.startsWith("package/")
    ? ADDITIONAL_PACKAGES.find(
        (item) => item.id === decodeURIComponent(route.slice(8)),
      )
    : undefined;
  const matchingPackageModules =
    productPackage?.modules.filter((module) =>
      `${module.name} ${module.importPath}`
        .toLowerCase()
        .includes(packageQuery.trim().toLowerCase()),
    ) ?? [];
  const article = route.startsWith("article/")
    ? ARTICLES.find((item) => item.id === route.slice(8))
    : undefined;

  React.useEffect(() => {
    const handle = () => {
      setRoute(readRoute());
      setCategory(readTopic());
      setGalleryGroup(readGalleryGroup());
      setPage(0);
      setMenuOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handle);
    return () => window.removeEventListener("hashchange", handle);
  }, []);
  React.useEffect(() => {
    if (!selectedScreenshot) return;
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedScreenshot(null);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [selectedScreenshot]);
  React.useEffect(() => {
    writeJson(DRAFT_KEY, draft);
  }, [draft]);
  React.useEffect(() => {
    writeJson(REQUESTS_KEY, requests);
  }, [requests]);
  React.useEffect(() => {
    setPage(0);
  }, [query, category]);

  function navigate(path: string) {
    window.location.hash = `/${path}`;
  }
  function startRequest() {
    navigate("request/describe");
  }
  function updateDraft<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }
  function createRequest() {
    const request = {
      ...draft,
      id: `LOCAL-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
    setRequests((current) => [request, ...current]);
    removeStoredValue(DRAFT_KEY);
    setDraft({
      category: SUPPORT_CATEGORIES[0],
      subject: "",
      details: "",
      workspace: "",
      email: "",
    });
    navigate(`request/done/${request.id}`);
  }
  function exportRequest(request: LocalRequest) {
    const blob = new Blob(
      [
        JSON.stringify(
          { ...request, destination: "Not transmitted; local handoff" },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${request.id.toLowerCase()}-handoff.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }
  async function copyRequest(request: LocalRequest) {
    const text = `MAATAA UI support handoff (local only)\nReference: ${request.id}\nCategory: ${request.category}\nSubject: ${request.subject}\nWorkspace: ${request.workspace || "Not specified"}\nContact: ${request.email || "Not specified"}\n\n${request.details}\n\nNot transmitted. Send through your approved support channel.`;
    try {
      if (navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(text);
      else {
        const field = document.createElement("textarea");
        field.value = text;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.append(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error("Clipboard unavailable");
      }
      setCopyError(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      field.select();
      const copied = document.execCommand("copy");
      field.remove();
      setCopied(copied);
      setCopyError(!copied);
    }
  }

  const matchingArticles = ARTICLES.filter(
    (item) =>
      (category === "All topics" || item.category === category) &&
      `${item.title} ${item.summary} ${item.category} ${item.body.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const matchingFaqs = FAQS.filter((item) =>
    `${item.q} ${item.a}`.toLowerCase().includes(query.toLowerCase()),
  );
  const workspaceQuery = route === "workspaces" ? query.toLowerCase() : "";
  const matchingWorkspaces =
    route === "workspaces"
      ? WORKSPACE_TYPES.filter((item) =>
          `${item.name} ${item.id} ${item.groupLabel} ${item.groupKey}`
            .toLowerCase()
            .includes(workspaceQuery),
        )
      : [];
  const normalizedProductQuery = productQuery.trim().toLowerCase();
  const visibleProductSections = PRODUCT_SECTIONS.map((section) => ({
    ...section,
    areas: section.areas.filter((area) =>
      `${area.name} ${area.description} ${area.source ?? ""} ${"modules" in area && Array.isArray(area.modules) ? area.modules.join(" ") : ""}`
        .toLowerCase()
        .includes(normalizedProductQuery),
    ),
  })).filter((section) => section.areas.length > 0);
  const normalizedGalleryQuery = galleryQuery.trim().toLowerCase();
  const visibleScreenshots = SCREENSHOTS.filter(
    (item) =>
      (galleryGroup === "All screenshots" || item.group === galleryGroup) &&
      `${item.title} ${item.description} ${item.group}`
        .toLowerCase()
        .includes(normalizedGalleryQuery),
  );
  const shownWorkspaces = matchingWorkspaces.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );
  const normalizedSliceQuery = sliceQuery.trim().toLowerCase();
  const matchingWorkspaceSlices =
    route === "workspace-slices"
      ? WORKSPACE_TYPES.filter((item) => {
          if (!normalizedSliceQuery) return true;
          const slice = createWorkspaceDataSlice(item);
          return `${item.name} ${item.id} ${item.groupLabel} ${item.groupKey} ${slice.domain} ${slice.title} ${slice.summary} ${slice.navigation.join(" ")} ${slice.sections.map((section) => `${section.title} ${section.lines.join(" ")}`).join(" ")}`
            .toLowerCase()
            .includes(normalizedSliceQuery);
        })
      : [];
  const shownWorkspaceSlices = matchingWorkspaceSlices.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );
  const groups = Array.from(
    new Map(
      WORKSPACE_TYPES.map((item) => [
        item.groupKey,
        { key: item.groupKey, label: item.groupLabel, count: 0 },
      ]),
    ).values(),
  ).map((group) => ({
    ...group,
    count: WORKSPACE_TYPES.filter((item) => item.groupKey === group.key).length,
  }));
  const searchOpen = route === "home" && query.trim().length > 0;

  return (
    <div className="sc-app">
      <header className="sc-header">
        <a
          className="sc-brand"
          href="#/home"
          aria-label="MAATAA Support Center home"
        >
          <span className="sc-mark">M</span>
          <span>
            <strong>MAATAA</strong>
            <small>SUPPORT CENTER</small>
          </span>
        </a>
        <div className="sc-header-note">Help for the MAATAA UI system</div>
        <button
          className="sc-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        <nav
          className={`sc-top-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <a aria-current={route === "home" ? "page" : undefined} href="#/home">
            Help home
          </a>
          <a
            aria-current={route === "screens" ? "page" : undefined}
            href="#/screens"
          >
            Screens
          </a>
          <a
            aria-current={route === "product-map" ? "page" : undefined}
            href="#/product-map"
          >
            Product map
          </a>
          <a
            aria-current={route === "screenshots" ? "page" : undefined}
            href="#/screenshots"
          >
            Screenshots
          </a>
          <a
            aria-current={
              route === "guides" || route.startsWith("article/")
                ? "page"
                : undefined
            }
            href="#/guides"
          >
            Guides
          </a>
          <a
            aria-current={
              route === "workspaces" ||
              route.startsWith("workspace/") ||
              route === "workspace-slices" ||
              route.startsWith("workspace-slice/")
                ? "page"
                : undefined
            }
            href="#/workspaces"
          >
            Workspaces
          </a>
          <a aria-current={route === "faqs" ? "page" : undefined} href="#/faqs">
            FAQs
          </a>
          <a
            aria-current={
              route.startsWith("request/") || route === "requests"
                ? "page"
                : undefined
            }
            href="#/requests"
          >
            My handoffs
            {requests.length > 0 && (
              <span className="sc-count">{requests.length}</span>
            )}
          </a>
          <button
            className="sc-contact-link"
            type="button"
            onClick={startRequest}
          >
            Prepare a request <Icon name="arrow" size={16} />
          </button>
        </nav>
      </header>

      {route === "home" && (
        <main className="sc-main sc-home">
          <section className="sc-intro">
            <div>
              <h1>What can we help you find?</h1>
              <p>
                Explore practical guides, answers, and the full MAATAA workspace
                directory.
              </p>
            </div>
            <div className="sc-boundary">
              <span className="sc-boundary-dot" /> This center runs locally on
              this device
            </div>
          </section>
          <p><a className="sc-article-cta" href="#/gaming">Explore Game UI Help and Arcade Quest <Icon name="arrow" size={16} /></a></p>
          <div className="sc-search-wrap">
            <Icon name="search" size={22} />
            <input
              type="search"
              aria-label="Search help, FAQs, and workspaces"
              placeholder="Search a question, feature, or workspace…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim())
                  navigate(
                    matchingArticles[0]
                      ? `article/${matchingArticles[0].id}`
                      : matchingFaqs[0]
                        ? `faqs?focus=${FAQS.indexOf(matchingFaqs[0])}`
                        : "workspaces",
                  );
              }}
            />
            <kbd>↵</kbd>
          </div>
          {searchOpen ? (
            <section className="sc-search-results" aria-live="polite">
              <div className="sc-results-head">
                <h2>Search results</h2>
                <button className="sc-text-button" onClick={() => setQuery("")}>
                  Clear search
                </button>
              </div>
              <h3>
                Guides <span>{matchingArticles.length}</span>
              </h3>
              {matchingArticles.slice(0, 5).map((item) => (
                <a
                  className="sc-result-row"
                  key={item.id}
                  href={`#/article/${item.id}`}
                >
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.summary}</small>
                  </span>
                  <Icon name="arrow" />
                </a>
              ))}
              <h3>
                Frequently asked <span>{matchingFaqs.length}</span>
              </h3>
              {matchingFaqs.slice(0, 4).map((faq) => (
                <a
                  className="sc-result-row"
                  key={faq.q}
                  href={`#/faqs?focus=${FAQS.indexOf(faq)}`}
                >
                  <span>
                    <strong>{faq.q}</strong>
                    <small>{faq.a}</small>
                  </span>
                  <Icon name="arrow" />
                </a>
              ))}
              <h3>
                Workspaces{" "}
                <span>
                  {
                    WORKSPACE_TYPES.filter((item) =>
                      `${item.name} ${item.id} ${item.groupLabel}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                    ).length
                  }
                </span>
              </h3>
              <button
                className="sc-inline-link"
                onClick={() => {
                  navigate("workspaces");
                }}
              >
                Search the entire workspace directory{" "}
                <Icon name="arrow" size={15} />
              </button>
            </section>
          ) : (
            <>
              <section
                className="sc-shortcuts"
                aria-label="Popular destinations"
              >
                <a className="sc-shortcut-primary" href="#/workspaces">
                  <span className="sc-shortcut-icon">
                    <Icon name="grid" size={21} />
                  </span>
                  <span>
                    <small>DIRECTORY</small>
                    <strong>All workspaces</strong>
                    <em>
                      {WORKSPACE_TYPES.length} registry entries across{" "}
                      {groups.length} families
                    </em>
                  </span>
                  <Icon name="arrow" size={19} />
                </a>
                <a href="#/faqs">
                  <span className="sc-shortcut-icon">
                    <Icon name="book" size={20} />
                  </span>
                  <span>
                    <small>QUICK ANSWERS</small>
                    <strong>Frequently asked</strong>
                    <em>Concise answers to common questions</em>
                  </span>
                  <Icon name="arrow" size={19} />
                </a>
                <button onClick={startRequest}>
                  <span className="sc-shortcut-icon">
                    <Icon name="chat" size={20} />
                  </span>
                  <span>
                    <small>NEED A HAND?</small>
                    <strong>Prepare a request</strong>
                    <em>Create a reviewable local handoff packet</em>
                  </span>
                  <Icon name="arrow" size={19} />
                </button>
              </section>
              <section
                className="sc-home-start"
                aria-labelledby="sc-start-title"
              >
                <div className="sc-section-title">
                  <div>
                    <h2 id="sc-start-title">Start with the essentials</h2>
                    <p>
                      A short path from first look to building with the system.
                    </p>
                  </div>
                  <a href="#/guides">
                    Browse all guides <Icon name="arrow" size={15} />
                  </a>
                </div>
                <div className="sc-start-grid">
                  {["start", "surface", "playground"].map((id, index) => {
                    const item = ARTICLES.find((article) => article.id === id)!;
                    return (
                      <a
                        className="sc-start-card"
                        href={`#/article/${item.id}`}
                        key={id}
                      >
                        <span className="sc-card-kicker">
                          {String(index + 1).padStart(2, "0")} · {item.category}
                        </span>
                        <strong>{item.title}</strong>
                        <p>{item.summary}</p>
                        <span className="sc-card-link">
                          Read guide <Icon name="arrow" size={15} />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </section>
              <section
                className="sc-home-visual"
                aria-labelledby="sc-visual-title"
              >
                <div className="sc-section-title">
                  <div>
                    <h2 id="sc-visual-title">See the MAATAA product</h2>
                    <p>
                      Real captures from the main application, catalogue
                      explorer, and independent demos.
                    </p>
                  </div>
                  <a href="#/screenshots">
                    Browse all {SCREENSHOTS.length} screenshots{" "}
                    <Icon name="arrow" size={15} />
                  </a>
                </div>
                <div className="sc-home-shot-grid">
                  {["app-surface", "app-theme-studio", "demo-tlps"].map(
                    (id) => {
                      const shot = SCREENSHOTS.find((item) => item.id === id)!;
                      return (
                        <button
                          className="sc-home-shot"
                          key={id}
                          onClick={() => setSelectedScreenshot(shot)}
                        >
                          <img
                            src={`./screenshots/${shot.id}.webp`}
                            alt={`${shot.title} screenshot`}
                          />
                          <span>
                            <strong>{shot.title}</strong>
                            <small>{shot.description}</small>
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>
              </section>
              <section
                className="sc-home-workspaces"
                aria-labelledby="sc-workspace-families-title"
              >
                <div className="sc-section-title">
                  <div>
                    <h2 id="sc-workspace-families-title">
                      Browse workspace families
                    </h2>
                    <p>Jump into the registry by its declared family.</p>
                  </div>
                  <a href="#/workspaces">
                    Open all {WORKSPACE_TYPES.length} records{" "}
                    <Icon name="arrow" size={15} />
                  </a>
                </div>
                <div className="sc-family-grid">
                  {groups.slice(0, 4).map((group) => (
                    <a
                      href="#/workspaces"
                      key={group.key}
                      onClick={() => setQuery(group.label)}
                    >
                      <span>
                        <strong>{group.label}</strong>
                        <small>
                          {group.count} records in the current registry
                        </small>
                      </span>
                      <Icon name="arrow" size={17} />
                    </a>
                  ))}
                </div>
                <p className="sc-registry-note">
                  These are registry groupings. Each record describes declared
                  vocabulary and does not by itself prove a complete connected
                  workspace.
                </p>
              </section>
              <section className="sc-handoff-panel">
                <div>
                  <span className="sc-card-kicker">
                    PRIVATE, REVIEWABLE HANDOFF
                  </span>
                  <h2>Need help with a specific issue?</h2>
                  <p>
                    Prepare a clear request, review its contents, then save it
                    on this device and copy or download it for your approved
                    support channel.
                  </p>
                </div>
                <button className="sc-primary" onClick={startRequest}>
                  Prepare a request <Icon name="arrow" size={16} />
                </button>
                <small>No request is sent from this demo.</small>
              </section>
              <div className="sc-home-columns">
                <section className="sc-topic-section">
                  <div className="sc-section-title">
                    <div>
                      <h2>Explore help topics</h2>
                      <p>Guides for the work you are doing in MAATAA.</p>
                    </div>
                    <a href="#/guides">
                      All guides <Icon name="arrow" size={15} />
                    </a>
                  </div>
                  <div className="sc-topic-list">
                    {CATEGORIES.map((name) => (
                      <a
                        key={name}
                        href={`#/guides?category=${encodeURIComponent(name)}`}
                      >
                        <span>
                          <strong>{name}</strong>
                          <small>
                            {ARTICLES.find((item) => item.category === name)
                              ?.summary ??
                              "Guidance and answers for this part of MAATAA."}
                          </small>
                        </span>
                        <Icon name="arrow" size={17} />
                      </a>
                    ))}
                  </div>
                </section>
                <aside className="sc-latest">
                  <h2>Common questions</h2>
                  <p>Quick answers, with links to the full guide.</p>
                  {FAQS.slice(0, 5).map((faq) => (
                    <a href={`#/faqs?focus=${FAQS.indexOf(faq)}`} key={faq.q}>
                      {faq.q}
                      <Icon name="arrow" size={15} />
                    </a>
                  ))}
                  <a className="sc-all-faqs" href="#/faqs">
                    Browse all FAQs <Icon name="arrow" size={15} />
                  </a>
                </aside>
              </div>
            </>
          )}
        </main>
      )}

      {route === "gaming" && <React.Suspense fallback={<main className="sc-main"><p role="status">Loading Game UI Help…</p></main>}><GameSupportCenter onRequest={startRequest} /></React.Suspense>}
      {route.startsWith("gaming/") && <React.Suspense fallback={<main className="sc-main"><p role="status">Loading game resources…</p></main>}><GameResources section={route.slice(7)} /></React.Suspense>}
      {(route === "artwork" || route.startsWith("artwork/")) && <React.Suspense fallback={<main className="sc-main"><p role="status">Loading artwork…</p></main>}><ArtworkGallery route={route} /></React.Suspense>}

      {route === "screens" && (
        <main className="sc-main">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["Screens", "screens"],
            ]}
          />
          <section className="sc-page-heading">
            <div>
              <h1>Application screens</h1>
              <p>
                A screen-by-screen map of the standalone Support Center and its
                user flows.
              </p>
            </div>
            <span className="sc-record-total">
              {APP_SCREENS.length}
              <small>screen entries</small>
            </span>
          </section>
          <div className="sc-workspace-note">
            <Icon name="book" size={18} />
            <p>
              This map covers Help, Guides, FAQs, the Workspace Directory, and
              local Support Handoffs. It does not represent the separate MAATAA
              product demo or a connected ticketing system.
            </p>
          </div>
          <div className="sc-screen-grid">
            {APP_SCREENS.map((screen, index) => (
              <article className="sc-screen-card" key={screen.title}>
                <div className="sc-screen-card-top">
                  <span className="sc-card-kicker">{screen.group}</span>
                  <span aria-label={`Screen ${index + 1}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2>{screen.title}</h2>
                <p>{screen.description}</p>
                <a href={`#/${screen.path}`}>
                  {screen.action}
                  <Icon name="arrow" size={15} />
                </a>
              </article>
            ))}
          </div>
          <section className="sc-product-screen-showcase">
            <div className="sc-section-title">
              <div>
                <h2>MAATAA product application</h2>
                <p>Captured screens from the separate local MAATAA UI app.</p>
              </div>
              <a href="#/screenshots?group=App%20screens">
                Open all app captures <Icon name="arrow" size={15} />
              </a>
            </div>
            <div className="sc-app-shot-grid">
              {APP_SCREENSHOTS.map((shot) => (
                <article className="sc-app-shot" key={shot.id}>
                  <button
                    onClick={() => setSelectedScreenshot(shot)}
                    aria-label={`Enlarge ${shot.title} screenshot`}
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      src={`./screenshots/${shot.id}.webp`}
                      alt={`${shot.title} application screenshot`}
                    />
                  </button>
                  <div>
                    <strong>{shot.title}</strong>
                    <p>{shot.description}</p>
                    <button
                      className="sc-text-button"
                      onClick={() => setSelectedScreenshot(shot)}
                    >
                      View capture <Icon name="arrow" size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <div className="sc-screen-flow">
            <div>
              <span className="sc-card-kicker">PRIMARY USER FLOW</span>
              <h2>Find an answer, then prepare a handoff if needed.</h2>
              <p>
                Home search leads into a guide, FAQ, or workspace record. If the
                reference does not solve the issue, the request flow lets you
                review a local packet before copying or downloading it.
              </p>
            </div>
            <a className="sc-primary" href="#/home">
              Start at Help home <Icon name="arrow" size={16} />
            </a>
          </div>
        </main>
      )}

      {route === "product-map" && (
        <main className="sc-main">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["Product map", "product-map"],
            ]}
          />
          <section className="sc-page-heading">
            <div>
              <h1>MAATAA UI product map</h1>
              <p>
                Search package areas, then open a detail page for public imports
                and source modules.
              </p>
            </div>
            <span className="sc-record-total">
              {PRODUCT_SECTIONS.reduce(
                (count, section) => count + section.areas.length,
                0,
              )}
              <small>product areas</small>
            </span>
          </section>
          <div className="sc-workspace-note">
            <Icon name="book" size={18} />
            <p>
              Counts come from the package’s current registries and hook
              exports. They describe declared entries; a registry count alone
              does not prove a finished, connected, or certified feature.
            </p>
          </div>
          <div className="sc-product-controls">
            <SearchField className="sc-filter-search" icon={<Icon name="search" />} label="Search product areas" value={productQuery} onValueChange={setProductQuery} placeholder="Search components, hooks, state, themes…" />
            <a className="sc-primary" href="#/screenshots?group=Catalogues">
              See catalogue screenshots <Icon name="arrow" size={16} />
            </a>
          </div>
          <div className="sc-product-sections">
            {visibleProductSections.map((section) => (
              <section className="sc-product-section" key={section.title}>
                <header>
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </header>
                <div className="sc-product-list">
                  {section.areas.map((area) => {
                    const shotId =
                      area.id === "themes"
                        ? "app-theme-studio"
                        : `catalog-${area.id}`;
                    const shot = SCREENSHOTS.find((item) => item.id === shotId);
                    return (
                      <article className="sc-product-row" key={area.id}>
                        <div className="sc-product-name">
                          <strong>{area.name}</strong>
                          <code>
                            {area.source ?? "Theme Studio · global settings"}
                          </code>
                        </div>
                        <div className="sc-product-count">
                          <strong>{area.count}</strong>
                          <small>{area.unit}</small>
                        </div>
                        <p>{area.description}</p>
                        {"packageId" in area && (
                          <a
                            className="sc-text-button"
                            href={`#/package/${area.packageId}`}
                          >
                            Open detail <Icon name="arrow" size={14} />
                          </a>
                        )}
                        {shot && (
                          <button
                            className="sc-text-button"
                            onClick={() => setSelectedScreenshot(shot)}
                          >
                            View capture <Icon name="arrow" size={14} />
                          </button>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
          {visibleProductSections.length === 0 && (
            <div className="sc-empty-inline">
              <p>No product areas match that search.</p>
              <button
                className="sc-text-button"
                onClick={() => setProductQuery("")}
              >
                Clear search
              </button>
            </div>
          )}
          <section className="sc-state-guide-promo">
            <div>
              <span className="sc-card-kicker">
                EXAMPLES · SKELETONS · STATES
              </span>
              <h2>Inspect every surface state</h2>
              <p>
                Compare the live example, loading skeleton, empty state, error
                recovery, and disabled treatment across components, layouts,
                pages, workspaces, generators, and AI spaces.
              </p>
            </div>
            <a className="sc-primary" href="#/article/surface-states">
              Read the specimen guide <Icon name="arrow" size={16} />
            </a>
          </section>
          <div className="sc-screen-flow">
            <div>
              <span className="sc-card-kicker">FROM IDEA TO PREVIEW</span>
              <h2>Explore the working surfaces</h2>
              <p>
                Open the screenshot gallery for the main app, all 17 explorer
                catalogues, and seven demo scenarios.
              </p>
            </div>
            <a className="sc-primary" href="#/screenshots">
              Open screenshot gallery <Icon name="arrow" size={16} />
            </a>
          </div>
        </main>
      )}

      {productPackage && (
        <main className="sc-main sc-package-detail">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["Product map", "product-map"],
              [productPackage.title, `package/${productPackage.id}`],
            ]}
          />
          <section className="sc-page-heading">
            <div>
              <span className="sc-card-kicker">{productPackage.group}</span>
              <h1>{productPackage.title}</h1>
              <p>{productPackage.description}</p>
            </div>
            <span className="sc-record-total">
              {productPackage.modules.length}
              <small>source modules</small>
            </span>
          </section>
          <div className="sc-package-import">
            <div>
              <span className="sc-card-kicker">PUBLIC PACKAGE ENTRY</span>
              <code>{productPackage.importPath}</code>
              <p>
                Use the package entry point that matches your host application
                and installed version.
              </p>
            </div>
            <pre>
              <code>{`import * as Package from "${productPackage.importPath}";`}</code>
            </pre>
          </div>
          <section className="sc-package-modules">
            <div className="sc-section-title">
              <div>
                <h2>Source module index</h2>
                <p>
                  Module names are derived from the current source tree and
                  matched to public package subpaths.
                </p>
              </div>
              <a href="#/product-map">
                Back to product map <Icon name="arrow" size={15} />
              </a>
            </div>
            <SearchField className="sc-filter-search" icon={<Icon name="search" />} label="Search package modules" value={packageQuery} onValueChange={setPackageQuery} placeholder="Search module names or import paths" />
            <p className="sc-package-result-count" role="status">
              {matchingPackageModules.length} of {productPackage.modules.length}{" "}
              modules
            </p>
            {matchingPackageModules.length ? (
              <div className="sc-module-list">
                {matchingPackageModules.map((module) => (
                  <article key={module.importPath}>
                    <span>{module.name}</span>
                    <code>{module.importPath}</code>
                  </article>
                ))}
              </div>
            ) : (
              <div className="sc-empty-inline">
                <p>No modules match this search.</p>
                <button
                  className="sc-text-button"
                  onClick={() => setPackageQuery("")}
                >
                  Clear search
                </button>
              </div>
            )}
          </section>
          <div className="sc-workspace-note">
            <Icon name="book" size={18} />
            <p>
              This index describes declared package modules. Check their
              exports, types, and tests before treating a symbol as supported
              product behavior.
            </p>
          </div>
        </main>
      )}

      {route === "screenshots" && (
        <main className="sc-main">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["Screenshots", "screenshots"],
            ]}
          />
          <section className="sc-page-heading">
            <div>
              <h1>MAATAA UI screenshots</h1>
              <p>
                Captured screens from the MAATAA app, every Full Surface
                catalogue, and each guided demo experience.
              </p>
            </div>
            <span className="sc-record-total">
              {visibleScreenshots.length}{" "}
              <small>of {SCREENSHOTS.length} captures</small>
            </span>
          </section>
          <div className="sc-gallery-controls">
            <SearchField className="sc-filter-search" icon={<Icon name="search" />} label="Search screenshots" value={galleryQuery} onValueChange={setGalleryQuery} placeholder="Search screens, catalogues, demos…" />
            <label className="sc-gallery-filter">
              <span>Show</span>
              <select
                value={galleryGroup}
                onChange={(event) => setGalleryGroup(event.target.value)}
              >
                <option>All screenshots</option>
                {(
                  [
                    "App screens",
                    "Catalogues",
                    "Demo experiences",
                    "Support Center",
                    "Responsive views",
                    "Interaction states",
                  ] as const
                ).map((group) => (
                  <option key={group}>{group}</option>
                ))}
              </select>
            </label>
          </div>
          {visibleScreenshots.length > 0 ? (
            <div className="sc-screenshot-grid">
              {visibleScreenshots.map((shot) => (
                <article className="sc-screenshot-card" key={shot.id}>
                  <button
                    className="sc-screenshot-preview"
                    onClick={() => setSelectedScreenshot(shot)}
                    aria-label={`Enlarge ${shot.title} screenshot`}
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      src={`./screenshots/${shot.id}.webp`}
                      alt={`${shot.title} application screenshot`}
                    />
                    <span>View larger</span>
                  </button>
                  <div className="sc-screenshot-copy">
                    <span>{shot.group}</span>
                    <h2>{shot.title}</h2>
                    <p>{shot.description}</p>
                    <button
                      className="sc-text-button"
                      onClick={() => setSelectedScreenshot(shot)}
                    >
                      Open screenshot <Icon name="arrow" size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="sc-empty-inline">
              <p>No screenshots match those filters.</p>
              <button
                className="sc-text-button"
                onClick={() => {
                  setGalleryQuery("");
                  setGalleryGroup("All screenshots");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
          <p className="sc-registry-note">
            These are visual captures of the local MAATAA demo. Dataset values
            are illustrative; screenshots do not imply a live service or
            production integration.
          </p>
        </main>
      )}

      {route === "guides" && (
        <main className="sc-main">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["Guides", "guides"],
            ]}
          />
          <section className="sc-page-heading">
            <div>
              <h1>Guides</h1>
              <p>
                Step-by-step references for the MAATAA surfaces and package.
              </p>
            </div>
            <div className="sc-filter-row">
              <label htmlFor="guide-filter">Topic</label>
              <select
                id="guide-filter"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All topics</option>
                {CATEGORIES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <SearchField className="sc-filter-search" icon={<Icon name="search" />} label="Filter guides" value={query} onValueChange={setQuery} placeholder="Filter guides" />
            </div>
          </section>
          <div className="sc-article-list">
            {matchingArticles.map((item) => (
              <a href={`#/article/${item.id}`} key={item.id}>
                <span className="sc-article-list-content">
                  <span>
                    {item.category} · {item.updated}
                  </span>
                  <strong>{item.title}</strong>
                  <small>{item.summary}</small>
                </span>
                <Icon name="arrow" />
              </a>
            ))}
            {matchingArticles.length === 0 && (
              <Empty
                text="No guides match that search."
                action={() => {
                  setQuery("");
                  setCategory("All topics");
                }}
              />
            )}
          </div>
        </main>
      )}

      {article && (
        <main className="sc-main sc-reading">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["Guides", "guides"],
              [article.title, `article/${article.id}`],
            ]}
          />
          <article className="sc-article">
            <div className="sc-article-category">
              {article.category} <span>·</span> {article.updated}
            </div>
            <h1>{article.title}</h1>
            <p className="sc-article-lede">{article.summary}</p>
            {article.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            {article.id === "gaming-ui" && <a className="sc-article-cta" href="#/gaming">Open Game UI Help <Icon name="arrow" /></a>}
            {article.id === "branding-studio" && (
              <>
                <div className="sc-article-screenshot-grid">
                  {["app-branding-studio", "support-branding-guide"].map(
                    (id) => {
                      const shot = SCREENSHOTS.find((item) => item.id === id)!;
                      return (
                        <figure key={id}>
                          <button
                            onClick={() => setSelectedScreenshot(shot)}
                            aria-label={`Enlarge ${shot.title}`}
                          >
                            <img
                              loading="lazy"
                              decoding="async"
                              src={`./screenshots/${shot.id}.webp`}
                              alt={shot.title}
                            />
                          </button>
                          <figcaption>
                            <strong>{shot.title}</strong>
                            <span>{shot.description}</span>
                          </figcaption>
                        </figure>
                      );
                    },
                  )}
                </div>
                <a
                  className="sc-article-cta"
                  href="http://127.0.0.1:4173/#/branding-studio"
                >
                  Open Branding Studio <Icon name="arrow" />
                </a>
                <a
                  className="sc-article-cta"
                  href="#/screenshots?group=App%20screens"
                >
                  Browse related screenshots <Icon name="arrow" />
                </a>
              </>
            )}
            {article.id === "surface-states" && (
              <>
                <div className="sc-article-screenshot-grid">
                  {[
                    "catalog-layouts",
                    "catalog-pages",
                    "catalog-workspaces",
                    "state-surface-example",
                    "state-surface-skeleton",
                    "state-surface-empty",
                    "state-surface-error",
                    "state-surface-disabled",
                    "state-surface-generator",
                    "state-surface-ai-space",
                  ].map((id) => {
                    const shot = SCREENSHOTS.find((item) => item.id === id)!;
                    return (
                      <figure key={id}>
                        <button
                          onClick={() => setSelectedScreenshot(shot)}
                          aria-label={`Enlarge ${shot.title}`}
                        >
                          <img
                            loading="lazy"
                            decoding="async"
                            src={`./screenshots/${shot.id}.webp`}
                            alt={shot.title}
                          />
                        </button>
                        <figcaption>
                          <strong>{shot.title}</strong>
                          <span>{shot.description}</span>
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
                <a
                  className="sc-article-cta"
                  href="#/screenshots?group=Interaction%20states"
                >
                  Open the interaction-state gallery <Icon name="arrow" />
                </a>
              </>
            )}
            {article.id === "workspace-slices" && (
              <>
                <div className="sc-article-screenshot-grid">
                  {[
                    "support-workspace-slices",
                    "support-workspace-slice-tlps",
                    "support-workspace-slice-nevo",
                  ].map((id) => {
                    const shot = SCREENSHOTS.find((item) => item.id === id)!;
                    return (
                      <figure key={id}>
                        <button
                          onClick={() => setSelectedScreenshot(shot)}
                          aria-label={`Enlarge ${shot.title}`}
                        >
                          <img
                            loading="lazy"
                            decoding="async"
                            src={`./screenshots/${shot.id}.webp`}
                            alt={shot.title}
                          />
                        </button>
                        <figcaption>
                          <strong>{shot.title}</strong>
                          <span>{shot.description}</span>
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
                <a className="sc-article-cta" href="#/workspace-slices">
                  Browse all workspace slices <Icon name="arrow" />
                </a>
                <a
                  className="sc-article-cta"
                  href="./data/workspace-data-slices.json"
                  download
                >
                  Download complete JSON <Icon name="download" />
                </a>
              </>
            )}
            {article.id === "workspaces" && (
              <>
                <a className="sc-article-cta" href="#/workspaces">
                  Open the workspace directory <Icon name="arrow" />
                </a>
                <a className="sc-article-cta" href="#/workspace-slices">
                  Browse workspace data slices <Icon name="arrow" />
                </a>
              </>
            )}
            {article.id === "support" && (
              <button className="sc-article-cta" onClick={startRequest}>
                Prepare a support handoff <Icon name="arrow" />
              </button>
            )}
            <section className="sc-feedback">
              <div>
                <strong>Did this guide answer your question?</strong>
                <small>Your feedback is recorded on this page.</small>
              </div>
              <div>
                <button
                  aria-pressed={feedback[article.id] === "yes"}
                  onClick={() =>
                    setFeedback((v) => ({ ...v, [article.id]: "yes" }))
                  }
                >
                  Yes
                </button>
                <button
                  aria-pressed={feedback[article.id] === "no"}
                  onClick={() =>
                    setFeedback((v) => ({ ...v, [article.id]: "no" }))
                  }
                >
                  Not yet
                </button>
              </div>
              {feedback[article.id] && (
                <span role="status">
                  Thanks. Your feedback is recorded on this page.
                </span>
              )}
            </section>
            <div className="sc-related">
              <h2>Related guides</h2>
              {(article.related ?? []).map((id) => {
                const item = ARTICLES.find((entry) => entry.id === id)!;
                return (
                  <a href={`#/article/${id}`} key={id}>
                    {item.title}
                    <Icon name="arrow" size={16} />
                  </a>
                );
              })}
            </div>
          </article>
        </main>
      )}

      {route === "faqs" && (
        <main className="sc-main">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["FAQs", "faqs"],
            ]}
          />
          <section className="sc-page-heading">
            <div>
              <h1>Frequently asked</h1>
              <p>
                Answers about the demo, workspaces, providers, and local support
                handoffs.
              </p>
            </div>
            <SearchField className="sc-filter-search" icon={<Icon name="search" />} label="Search FAQs" value={query} onValueChange={setQuery} placeholder="Search questions" />
          </section>
          <div className="sc-faq-layout">
            <aside className="sc-faq-aside">
              <strong>In this section</strong>
              {FAQ_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() =>
                    document
                      .getElementById(section.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {section.title}
                </button>
              ))}
            </aside>
            <div className="sc-faq-list">
              {FAQ_SECTIONS.map((section) => {
                const items = section.indexes
                  .map((index) => ({ faq: FAQS[index], index }))
                  .filter(({ faq }) =>
                    `${faq.q} ${faq.a}`
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                  );
                return items.length ? (
                  <section id={section.id} key={section.id}>
                    <h2>{section.title}</h2>
                    {items.map(({ faq, index }) => (
                      <details
                        id={`faq-item-${index}`}
                        open={
                          new URLSearchParams(
                            window.location.hash.split("?")[1] ?? "",
                          ).get("focus") === String(index)
                        }
                        key={faq.q}
                      >
                        <summary>
                          {faq.q}
                          <span>+</span>
                        </summary>
                        <p>{faq.a}</p>
                      </details>
                    ))}
                  </section>
                ) : null;
              })}
              {matchingFaqs.length === 0 && (
                <Empty text="No answers found." action={() => setQuery("")} />
              )}
              <a className="sc-inline-link" href="#/article/support">
                Read the support handoff guide <Icon name="arrow" size={15} />
              </a>
            </div>
          </div>
        </main>
      )}

      {route === "workspaces" && (
        <main className="sc-main">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["Workspaces", "workspaces"],
            ]}
          />
          <section className="sc-page-heading">
            <div>
              <h1>Workspace directory</h1>
              <p>
                Search every canonical workspace record, grouped by its registry
                family.
              </p>
            </div>
            <span className="sc-record-total">
              {matchingWorkspaces.length.toLocaleString()}{" "}
              <small>matching records</small>
            </span>
          </section>
          <div className="sc-workspace-note">
            <Icon name="book" size={18} />
            <p>
              This is a registry reference. A listed workspace type does not by
              itself prove a separately implemented or connected product.
            </p>
          </div>
          <div className="sc-directory-actions">
            <a className="sc-article-cta" href="#/workspace-slices">
              Browse generated data slices <Icon name="arrow" size={15} />
            </a>
            <a
              className="sc-inline-link"
              href="./data/workspace-data-slices.json"
              download
            >
              Download all {WORKSPACE_TYPES.length} slices{" "}
              <Icon name="download" size={15} />
            </a>
          </div>
          <div className="sc-directory-controls">
            <SearchField className="sc-filter-search" icon={<Icon name="search" />} label="Search workspaces" value={query} onValueChange={setQuery} placeholder="Name, family, or canonical ID" />
            <span>{groups.length} families</span>
          </div>
          <section className="sc-directory-list" aria-label="Workspace records">
            {shownWorkspaces.map((item) => (
              <a
                href={`#/workspace/${encodeURIComponent(item.id)}`}
                key={item.id}
              >
                <span className="sc-directory-name">
                  <strong>{item.name}</strong>
                  <code>{item.id}</code>
                </span>
                <span className="sc-directory-group">{item.groupLabel}</span>
                <Icon name="arrow" size={17} />
              </a>
            ))}
            {shownWorkspaces.length === 0 && (
              <Empty
                text="No workspaces match those terms."
                action={() => setQuery("")}
              />
            )}
          </section>
          {matchingWorkspaces.length > pageSize && (
            <nav className="sc-pagination" aria-label="Workspace pages">
              <button
                disabled={page === 0}
                onClick={() => {
                  setPage((v) => v - 1);
                  window.scrollTo(0, 0);
                }}
              >
                Previous
              </button>
              <span>
                Page {page + 1} of{" "}
                {Math.ceil(matchingWorkspaces.length / pageSize)}
              </span>
              <button
                disabled={(page + 1) * pageSize >= matchingWorkspaces.length}
                onClick={() => {
                  setPage((v) => v + 1);
                  window.scrollTo(0, 0);
                }}
              >
                Next
              </button>
            </nav>
          )}
        </main>
      )}

      {route === "workspace-slices" && (
        <main className="sc-main">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["Workspaces", "workspaces"],
              ["Data slices", "workspace-slices"],
            ]}
          />
          <section className="sc-page-heading">
            <div>
              <h1>Workspace data slices</h1>
              <p>
                Search, inspect, and download synthetic fixtures generated for
                each canonical workspace.
              </p>
            </div>
            <span className="sc-record-total">
              {matchingWorkspaceSlices.length.toLocaleString()}
              <small>matching slices · {groups.length} families</small>
            </span>
          </section>
          <div className="sc-workspace-note">
            <Icon name="book" size={18} />
            <p>
              All {WORKSPACE_TYPES.length} records are generated from the
              workspace registry. Every slice is synthetic local demo data: no
              customer, booking, payment, production, or live service records
              are included.
            </p>
          </div>
          <div className="sc-directory-actions">
            <a
              className="sc-article-cta"
              href="./data/workspace-data-slices.json"
              download
            >
              Download complete JSON <Icon name="download" size={15} />
            </a>
            <a className="sc-inline-link" href="#/article/workspace-slices">
              How these slices work <Icon name="arrow" size={15} />
            </a>
          </div>
          <section
            className="sc-slice-featured"
            aria-label="Featured production and event slices"
          >
            <a href="#/workspace-slice/WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS">
              <span>PRODUCTION LOGISTICS</span>
              <strong>Logistics Workspace</strong>
              <small>
                Open the synthetic production-logistics slice{" "}
                <Icon name="arrow" size={14} />
              </small>
            </a>
            <a href="#/workspace-slice/WORKSPACE.EVENT.EVENT">
              <span>NEVO · EVENT PLANNING</span>
              <strong>Event Workspace</strong>
              <small>
                Open the synthetic NEVO event slice{" "}
                <Icon name="arrow" size={14} />
              </small>
            </a>
          </section>
          <div className="sc-directory-controls">
            <SearchField className="sc-filter-search" icon={<Icon name="search" />} label="Search workspace data slices" value={sliceQuery} onValueChange={(next) => { setSliceQuery(next); setPage(0); }} placeholder="Search name, ID, family, domain, sample content" />
            <span>Sorted by canonical registry order</span>
          </div>
          <section
            className="sc-directory-list"
            aria-label="Workspace data slices"
          >
            {shownWorkspaceSlices.map((item) => {
              const slice = createWorkspaceDataSlice(item);
              return (
                <a
                  href={`#/workspace-slice/${encodeURIComponent(item.id)}`}
                  key={item.id}
                >
                  <span className="sc-directory-name">
                    <strong>{item.name}</strong>
                    <code>
                      {item.id} · {slice.domain} · {slice.reference}
                    </code>
                  </span>
                  <span className="sc-directory-group">
                    {item.groupLabel} · synthetic
                  </span>
                  <Icon name="arrow" size={17} />
                </a>
              );
            })}
            {shownWorkspaceSlices.length === 0 && (
              <Empty
                text="No slices match those terms."
                action={() => setSliceQuery("")}
              />
            )}
          </section>
          {matchingWorkspaceSlices.length > pageSize && (
            <nav
              className="sc-pagination"
              aria-label="Workspace data slice pages"
            >
              <button
                disabled={page === 0}
                onClick={() => {
                  setPage((v) => v - 1);
                  window.scrollTo(0, 0);
                }}
              >
                Previous
              </button>
              <span>
                Page {page + 1} of{" "}
                {Math.ceil(matchingWorkspaceSlices.length / pageSize)}
              </span>
              <button
                disabled={
                  (page + 1) * pageSize >= matchingWorkspaceSlices.length
                }
                onClick={() => {
                  setPage((v) => v + 1);
                  window.scrollTo(0, 0);
                }}
              >
                Next
              </button>
            </nav>
          )}
        </main>
      )}

      {selectedWorkspace && (
        <main className="sc-main sc-reading">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["Workspaces", "workspaces"],
              [
                selectedWorkspace.name,
                `workspace/${encodeURIComponent(selectedWorkspace.id)}`,
              ],
            ]}
          />
          <article className="sc-article">
            <div className="sc-article-category">
              {selectedWorkspace.groupLabel}
            </div>
            <h1>{selectedWorkspace.name}</h1>
            <p className="sc-article-lede">
              Workspace reference from the current MAATAA registry.
            </p>
            <div className="sc-record-panel">
              <small>CANONICAL WORKSPACE ID</small>
              <code>{selectedWorkspace.id}</code>
              <dl>
                <div>
                  <dt>Family</dt>
                  <dd>{selectedWorkspace.groupLabel}</dd>
                </div>
                <div>
                  <dt>Family key</dt>
                  <dd>{selectedWorkspace.groupKey}</dd>
                </div>
                <div>
                  <dt>Registry ordinal</dt>
                  <dd>
                    {selectedWorkspace.ordinal} of {WORKSPACE_TYPES.length}
                  </dd>
                </div>
              </dl>
            </div>
            <p>
              This record describes declared workspace vocabulary. It does not
              verify that a complete application workflow, connected backend,
              permissions model, or durable workspace is implemented for this
              entry.
            </p>
            <a
              className="sc-article-cta"
              href={`#/guides?category=${encodeURIComponent("Workspaces")}`}
            >
              Read the workspace guide <Icon name="arrow" />
            </a>
            <div className="sc-related">
              <h2>Other in {selectedWorkspace.groupLabel}</h2>
              {WORKSPACE_TYPES.filter(
                (item) =>
                  item.groupKey === selectedWorkspace.groupKey &&
                  item.id !== selectedWorkspace.id,
              )
                .slice(0, 8)
                .map((item) => (
                  <a
                    href={`#/workspace/${encodeURIComponent(item.id)}`}
                    key={item.id}
                  >
                    {item.name}
                    <Icon name="arrow" size={16} />
                  </a>
                ))}
              <a href="#/workspaces">
                Return to all workspaces <Icon name="arrow" size={16} />
              </a>
            </div>
          </article>
        </main>
      )}

      {selectedWorkspaceSliceRecord && selectedWorkspaceSlice && (
        <main className="sc-main sc-reading">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["Workspaces", "workspaces"],
              ["Data slices", "workspace-slices"],
              [
                selectedWorkspaceSliceRecord.name,
                `workspace-slice/${encodeURIComponent(selectedWorkspaceSliceRecord.id)}`,
              ],
            ]}
          />
          <article className="sc-article">
            <div className="sc-article-category">
              {selectedWorkspaceSlice.domain} ·{" "}
              {selectedWorkspaceSlice.provenance}
            </div>
            <h1>{selectedWorkspaceSliceRecord.name} data slice</h1>
            <p className="sc-article-lede">{selectedWorkspaceSlice.summary}</p>
            <div className="sc-record-panel">
              <small>CANONICAL WORKSPACE ID</small>
              <code>{selectedWorkspaceSlice.workspaceId}</code>
              <dl>
                <div>
                  <dt>Domain profile</dt>
                  <dd>{selectedWorkspaceSlice.domain}</dd>
                </div>
                <div>
                  <dt>Family</dt>
                  <dd>{selectedWorkspaceSliceRecord.groupLabel}</dd>
                </div>
                <div>
                  <dt>Stable reference</dt>
                  <dd>{selectedWorkspaceSlice.reference}</dd>
                </div>
                <div>
                  <dt>Provenance</dt>
                  <dd>{selectedWorkspaceSlice.provenance}</dd>
                </div>
              </dl>
            </div>
            <section className="sc-slice-navigation">
              <h2>Sample navigation</h2>
              <div>
                {selectedWorkspaceSlice.navigation.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </section>
            <div className="sc-slice-sections">
              {selectedWorkspaceSlice.sections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  <ul>
                    {section.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <div className="sc-slice-boundary">
              <strong>Synthetic data boundary</strong>
              <p>{selectedWorkspaceSlice.boundary}</p>
              <small>
                Fixture source · examples/redux-demo/workspaceDataSlices.ts
              </small>
            </div>
            <a
              className="sc-article-cta"
              href="./data/workspace-data-slices.json"
              download
            >
              Download all {WORKSPACE_TYPES.length} workspace slices{" "}
              <Icon name="download" />
            </a>
            <div className="sc-related">
              <h2>Continue exploring</h2>
              <a href="#/workspace-slices">
                Return to data slice directory <Icon name="arrow" size={16} />
              </a>
              <a
                href={`#/workspace/${encodeURIComponent(selectedWorkspaceSliceRecord.id)}`}
              >
                Open the workspace record <Icon name="arrow" size={16} />
              </a>
              <a href="#/article/workspace-slices">
                Read the data slice guide <Icon name="arrow" size={16} />
              </a>
            </div>
          </article>
        </main>
      )}

      {route === "request/describe" && (
        <main className="sc-main">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["Prepare a request", "request/describe"],
            ]}
          />
          <RequestSteps current={1} />
          <section className="sc-request-heading">
            <h1>Describe what happened</h1>
            <p>
              Save a clear, redacted handoff for your approved support channel.
            </p>
          </section>
          <div className="sc-review-banner">
            <strong>No request will be sent.</strong>
            <span>
              This form prepares a packet on this device. You can review it
              before saving, copying, or downloading it for your approved
              support channel.
            </span>
          </div>
          <form
            className="sc-request-form"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("request/review");
            }}
          >
            <SelectField
              label="Topic"
              required
              value={draft.category}
              onValueChange={(value) => updateDraft("category", value)}
              options={SUPPORT_CATEGORIES}
            />
            <TextField
              label="Subject"
              required
              minLength={4}
              maxLength={120}
              value={draft.subject}
              onValueChange={(value) => updateDraft("subject", value)}
              placeholder="A short summary of the issue"
              description="4–120 characters"
            />
            <TextAreaField
              label="What were you trying to do, and what happened?"
              required
              minLength={20}
              maxLength={3000}
              rows={7}
              value={draft.details}
              onValueChange={(value) => updateDraft("details", value)}
              placeholder="Steps to reproduce · expected result · actual result · browser and viewport"
              description={<>{draft.details.length} / 3,000 · Include only information safe to share.</>}
            />
            <TextField
              label={<>Related workspace or canonical ID <span className="sc-optional">Optional</span></>}
              list="workspace-options"
              value={draft.workspace}
              onValueChange={(value) => updateDraft("workspace", value)}
              placeholder="Search or enter a workspace ID"
              description={<>Browse <a href="#/workspaces">all {WORKSPACE_TYPES.length} registry entries</a> to find the exact ID.</>}
            />
            <datalist id="workspace-options">
              {WORKSPACE_TYPES.slice(0, 100).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </datalist>
            <TextField
              label={<>Contact email <span className="sc-optional">Optional</span></>}
              type="email"
              autoComplete="email"
              maxLength={254}
              value={draft.email}
              onValueChange={(value) => updateDraft("email", value)}
              placeholder="name@example.com"
              description="Stored locally in this browser. It is not sent anywhere."
            />
            <div className="sc-privacy-note">
              <strong>Before continuing</strong>
              <span>
                Remove passwords, API keys, access tokens, personal data, and
                confidential records. This form accepts text only.
              </span>
            </div>
            <div className="sc-form-actions">
              <a href="#/home">Cancel</a>
              <button
                className="sc-primary"
                type="submit"
                disabled={
                  draft.subject.trim().length < 4 ||
                  draft.details.trim().length < 20
                }
              >
                Review handoff <Icon name="arrow" />
              </button>
            </div>
            <p className="sc-draft-status" role="status">
              Draft saves locally on this device automatically.
            </p>
          </form>
        </main>
      )}

      {route === "request/review" && (
        <main className="sc-main">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["Prepare a request", "request/describe"],
              ["Review", "request/review"],
            ]}
          />
          <RequestSteps current={2} />
          <section className="sc-request-heading">
            <h1>Review your handoff</h1>
            <p>Confirm the contents before saving a local copy.</p>
          </section>
          <div className="sc-review-banner">
            <strong>Nothing will be sent.</strong>
            <span>
              Creating this handoff saves it on this device only. Use copy or
              download to transfer it through your approved support channel.
            </span>
          </div>
          <dl className="sc-review-list">
            <div>
              <dt>Topic</dt>
              <dd>{draft.category}</dd>
            </div>
            <div>
              <dt>Subject</dt>
              <dd>{draft.subject || "Missing subject"}</dd>
            </div>
            <div>
              <dt>Details</dt>
              <dd>{draft.details || "Missing description"}</dd>
            </div>
            <div>
              <dt>Workspace</dt>
              <dd>{draft.workspace || "Not specified"}</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>{draft.email || "Not specified"}</dd>
            </div>
          </dl>
          <div className="sc-form-actions">
            <button
              className="sc-secondary"
              onClick={() => navigate("request/describe")}
            >
              Back to edit
            </button>
            <button
              className="sc-primary"
              onClick={createRequest}
              disabled={
                draft.subject.trim().length < 4 ||
                draft.details.trim().length < 20
              }
            >
              Save local handoff <Icon name="check" />
            </button>
          </div>
        </main>
      )}

      {route.startsWith("request/done/") && (
        <main className="sc-main">
          <section className="sc-complete">
            <span className="sc-complete-icon">
              <Icon name="check" size={26} />
            </span>
            <h1>Your handoff is ready</h1>
            <p>
              Reference <code>{route.split("/").at(-1)}</code> is saved on this
              device. It has not been sent to a support team.
            </p>
            <div className="sc-complete-actions">
              <button
                className="sc-primary"
                onClick={() => {
                  const item = requests[0];
                  if (item) void copyRequest(item);
                }}
              >
                {copied ? "Copied" : "Copy handoff"}
              </button>
              <button
                className="sc-secondary"
                onClick={() => requests[0] && exportRequest(requests[0])}
              >
                <Icon name="download" /> Download JSON
              </button>
            </div>
            {copied && (
              <p role="status">
                Copied to clipboard. Send it through your approved support
                channel.
              </p>
            )}
            {copyError && (
              <p role="status">
                Clipboard access was blocked. Use Download JSON to save your
                handoff instead.
              </p>
            )}
            <a href="#/requests">View local handoffs</a>
            <a href="#/home">Back to Help Center</a>
          </section>
        </main>
      )}

      {route === "requests" && (
        <main className="sc-main">
          <Breadcrumbs
            items={[
              ["Help", "home"],
              ["My handoffs", "requests"],
            ]}
          />
          <section className="sc-page-heading">
            <div>
              <h1>My local handoffs</h1>
              <p>
                Packets prepared on this device. They are not messages in a
                shared support queue.
              </p>
            </div>
            <button className="sc-primary" onClick={startRequest}>
              Prepare a request <Icon name="arrow" />
            </button>
          </section>
          {requests.length === 0 ? (
            <div className="sc-empty-state">
              <h2>No handoffs saved here</h2>
              <p>
                Prepare a local packet and review it before copying or
                downloading.
              </p>
              <button className="sc-primary" onClick={startRequest}>
                Prepare a request <Icon name="arrow" />
              </button>
            </div>
          ) : (
            <div className="sc-request-list">
              {requests.map((item) => (
                <article key={item.id}>
                  <div>
                    <small>
                      {item.id} ·{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </small>
                    <h2>{item.subject}</h2>
                    <p>
                      {item.category}
                      {item.workspace && ` · ${item.workspace}`}
                    </p>
                  </div>
                  <div>
                    <button
                      className="sc-secondary"
                      onClick={() => void copyRequest(item)}
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                    <button
                      className="sc-secondary"
                      onClick={() => exportRequest(item)}
                      aria-label={`Download ${item.id}`}
                    >
                      <Icon name="download" />
                    </button>
                    <button
                      className="sc-danger"
                      onClick={() =>
                        setRequests((current) =>
                          current.filter((request) => request.id !== item.id),
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      )}

      {!(
        [
          "home",
          "gaming",
          "artwork",
          "screens",
          "product-map",
          "screenshots",
          "guides",
          "faqs",
          "workspaces",
          "workspace-slices",
          "requests",
          "request/describe",
          "request/review",
        ].includes(route) ||
        Boolean(productPackage) ||
        route.startsWith("article/") ||
        route.startsWith("artwork/") ||
        route.startsWith("gaming/") ||
        route.startsWith("workspace/") ||
        route.startsWith("workspace-slice/") ||
        route.startsWith("request/done/")
      ) && (
        <main className="sc-main">
          <div className="sc-empty-state">
            <div className="sc-article-category">Page not found</div>
            <h1>We couldn’t find that page</h1>
            <p>Return to help home or search the guide library.</p>
            <a className="sc-primary" href="#/home">
              Go to Help Center <Icon name="arrow" />
            </a>
          </div>
        </main>
      )}

      {selectedScreenshot && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- pointer-only backdrop dismissal; Escape closes the lightbox (keydown handler on the window)
        <div
          className="sc-screenshot-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sc-screenshot-title"
          onClick={() => setSelectedScreenshot(null)}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- only stops backdrop dismissal for clicks inside the content; not an interactive control */}
          <div onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              aria-label="Close screenshot"
              onClick={() => setSelectedScreenshot(null)}
            >
              <Icon name="close" />
            </button>
            <h2 id="sc-screenshot-title">{selectedScreenshot.title}</h2>
            <p>{selectedScreenshot.description}</p>
            <img
              src={`./screenshots/${selectedScreenshot.id}.webp`}
              alt={`${selectedScreenshot.title} full-size screenshot`}
            />
          </div>
        </div>
      )}
      <footer className="sc-footer">
        <a className="sc-brand" href="#/home">
          <span className="sc-mark">M</span>
          <span>
            <strong>MAATAA</strong>
            <small>SUPPORT CENTER</small>
          </span>
        </a>
        <p>
          Reference material for MAATAA UI. Registry and preview content may
          describe declared or synthetic examples.
        </p>
        <div>
          <a href="#/screens">Screens</a>
          <a href="#/product-map">Product map</a>
          <a href="#/screenshots">Screenshots</a>
          <a href="#/guides">Guides</a>
          <a href="#/faqs">FAQs</a>
          <a href="#/article/support">Request guide</a>
          <a href="#/workspaces">Workspace directory</a>
        </div>
        <small>Local demo · No connected ticket service</small>
      </footer>
    </div>
  );
}

function Breadcrumbs({ items }: { items: [string, string][] }) {
  return (
    <nav className="sc-breadcrumbs" aria-label="Breadcrumb">
      {items.map(([label, path], i) => (
        <React.Fragment key={path}>
          {i > 0 && <span>/</span>}
          <a
            aria-current={i === items.length - 1 ? "page" : undefined}
            href={`#/${path}`}
          >
            {label}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
}
function Empty({ text, action }: { text: string; action: () => void }) {
  return (
    <div className="sc-empty-inline">
      <p>{text}</p>
      <button className="sc-text-button" onClick={action}>
        Clear filters
      </button>
    </div>
  );
}
function RequestSteps({ current }: { current: number }) {
  return (
    <ol className="sc-steps" aria-label="Request steps">
      {["Describe", "Review", "Saved locally"].map((item, i) => (
        <li
          aria-current={i + 1 === current ? "step" : undefined}
          data-complete={i + 1 < current}
          key={item}
        >
          <span>
            {i + 1 < current ? <Icon name="check" size={14} /> : i + 1}
          </span>
          {item}
        </li>
      ))}
    </ol>
  );
}
