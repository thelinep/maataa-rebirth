// Contract tests for the components emitted by generateComposerJsx, made stable by
// owner decision on 2026-10-12 (acceptance packet, gate 7): six block components
// plus every layout in LAYOUT_TYPES. Only behaviour proposed as frozen is asserted.
import React from "react";
import fs from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { Heading } from "../src/typography/Heading";
import { Text } from "../src/typography/Text";
import { DataTable } from "../src/data/DataTable";
import { Metric } from "../src/data/Metric";
import { Badge } from "../src/feedback/Badge";
import { Divider } from "../src/foundation/Divider";
import { LAYOUT_TYPES } from "../src/registries/layoutRegistry";
import { COMPOSER_COMPONENT_BINDINGS } from "../src/composer/componentBindings.generated";
import { DEFAULT_COMPOSER_SCENE, createComposerBlock, generateComposerJsx, type ComposerBlockKind, type ComposerScene } from "../src/composer";
import { DEPRECATED_LAYOUT_ALIASES } from "../src/composer/layoutAliases";
import { LAYOUT_READING_ORDER } from "../src/internal/layoutReadingOrder.generated";

const manifest = JSON.parse(fs.readFileSync("manifests/PUBLIC_API.json", "utf8")) as { exports: { subpath: string; name: string }[] };
const inManifest = (importPath: string, name: string) =>
  manifest.exports.some((e) => e.subpath === importPath.replace("@maataa/ui", ".") && e.name === name);

// A scene without region assignments; the generator assigns blocks to the layout's primary region.
const { regions: _regions, ...BASE_SCENE } = DEFAULT_COMPOSER_SCENE;

const layoutModules = import.meta.glob("../src/layouts/*Layout.tsx", { eager: true }) as Record<string, Record<string, React.ComponentType<Record<string, unknown>>>>;

describe("generator emits only stable import paths", () => {
  it.each(Object.entries(COMPOSER_COMPONENT_BINDINGS))("block kind %s maps to a public export", (_kind, binding) => {
    expect(inManifest(binding.path, binding.name)).toBe(true);
  });
  it("every layout record maps to a public export", () => {
    expect(LAYOUT_TYPES.length).toBe(100);
    for (const layout of LAYOUT_TYPES) expect(inManifest(layout.importPath, layout.name), layout.importPath).toBe(true);
  });
  it("a scene with every block kind generates imports only from those paths", () => {
    const kinds = Object.keys(COMPOSER_COMPONENT_BINDINGS) as ComposerBlockKind[];
    const blocks = kinds.map((kind, i) => createComposerBlock(kind, `block-${i + 1}`));
    const source = generateComposerJsx({ ...BASE_SCENE, blocks });
    const allowed = new Set([...Object.values(COMPOSER_COMPONENT_BINDINGS).map((b) => b.path), ...LAYOUT_TYPES.filter((l) => !(l.name in DEPRECATED_LAYOUT_ALIASES)).map((l) => l.importPath)]);
    const imported = [...source.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    expect(imported.length).toBe(kinds.length + 1);
    for (const path of imported) expect(allowed.has(path), path).toBe(true);
  });
});

describe("deprecated layout aliases", () => {
  it("has exactly the seven aliases, each pointing at a non-deprecated layout with a public export", () => {
    expect(Object.keys(DEPRECATED_LAYOUT_ALIASES).sort()).toEqual(["BeforeAfterLayout", "CenteredContainerLayout", "CollapsibleSidebarLayout", "KnowledgeBaseLayout", "PageBuilderLayout", "ResponsiveThreePaneLayout", "StepperFormLayout"]);
    for (const [deprecated, stable] of Object.entries(DEPRECATED_LAYOUT_ALIASES)) {
      expect(stable in DEPRECATED_LAYOUT_ALIASES).toBe(false);
      expect(manifest.exports.some((e) => e.subpath === `./layouts/${deprecated}` && e.name === deprecated && (e as { stability?: string }).stability === "DEPRECATED")).toBe(true);
      expect(inManifest(`@maataa/ui/layouts/${stable}`, stable)).toBe(true);
    }
  });
  it.each(Object.entries(DEPRECATED_LAYOUT_ALIASES))("the generator emits %s's replacement %s", (deprecated, stable) => {
    const layout = LAYOUT_TYPES.find((l) => l.name === deprecated)!;
    const source = generateComposerJsx({ ...BASE_SCENE, layoutTypeId: layout.id } as ComposerScene);
    expect(source).toContain(`from "@maataa/ui/layouts/${stable}"`);
    expect(source).not.toContain(deprecated);
  });
});

describe("Heading", () => {
  it("defaults to h2 and honours level and native attributes", () => {
    render(<><Heading>Two</Heading><Heading level={4} id="h" className="extra">Four</Heading></>);
    expect(screen.getByRole("heading", { level: 2, name: "Two" })).toBeInTheDocument();
    const four = screen.getByRole("heading", { level: 4, name: "Four" });
    expect(four).toHaveAttribute("id", "h");
    expect(four.className).toContain("extra");
  });
});

describe("Text", () => {
  it("renders a paragraph by default and span/div via as", () => {
    render(<><Text data-testid="p">p</Text><Text as="span" data-testid="s">s</Text><Text as="div" data-testid="d">d</Text></>);
    expect(screen.getByTestId("p").tagName).toBe("P");
    expect(screen.getByTestId("s").tagName).toBe("SPAN");
    expect(screen.getByTestId("d").tagName).toBe("DIV");
  });
});

describe("DataTable", () => {
  const rows = [{ id: 1, name: "Alpha", status: "ready" }, { id: 2, name: "Beta", status: "draft" }];
  const columns = [{ id: "name", header: "Name", sortable: true }, { id: "status", header: "Status" }];
  it("renders rows by column id and uses accessor when given", () => {
    render(<DataTable data={rows} columns={[columns[0], { id: "status", header: "Status", accessor: (r: typeof rows[number]) => r.status.toUpperCase() }]} />);
    const table = screen.getByRole("table");
    expect(within(table).getByText("Alpha")).toBeInTheDocument();
    expect(within(table).getByText("READY")).toBeInTheDocument();
  });
  it("shows the empty content when there are no rows", () => {
    render(<DataTable data={[]} columns={columns} empty="Nothing yet" />);
    expect(screen.queryByRole("table")).toBeNull();
    expect(screen.getByText("Nothing yet")).toBeInTheDocument();
  });
  it("reports selection and sort requests", () => {
    const onSelectionChange = vi.fn();
    const onSort = vi.fn();
    render(<DataTable data={rows} columns={columns} selectedIds={[]} onSelectionChange={onSelectionChange} onSort={onSort} />);
    fireEvent.click(screen.getByRole("checkbox", { name: "Select row 1" }));
    expect(onSelectionChange).toHaveBeenCalledWith([1]);
    fireEvent.click(screen.getByRole("button", { name: /Name/ }));
    expect(onSort).toHaveBeenCalledWith("name");
  });
});

describe("DataTable accessibility", () => {
  const rows = [{ id: 1, name: "Alpha" }, { id: 2, name: "Beta" }];
  it("takes its accessible name from caption or aria-label", () => {
    const { unmount } = render(<DataTable data={rows} columns={[{ id: "name", header: "Name" }]} caption="Projects" />);
    expect(screen.getByRole("table", { name: "Projects" })).toBeInTheDocument();
    unmount();
    render(<DataTable data={rows} columns={[{ id: "name", header: "Name" }]} aria-label="Project list" />);
    expect(screen.getByRole("table", { name: "Project list" })).toBeInTheDocument();
  });
  it("exposes sort state with aria-sort and renders non-sortable headers as plain text", () => {
    render(<DataTable data={rows} columns={[{ id: "name", header: "Name", sortable: true }, { id: "id", header: "Number", sortable: true }, { id: "plain", header: "Plain" }]} sort={{ id: "name", direction: "asc" }} onSort={() => {}} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers[0]).toHaveAttribute("aria-sort", "ascending");
    expect(headers[1]).toHaveAttribute("aria-sort", "none");
    expect(headers[2]).not.toHaveAttribute("aria-sort");
    expect(within(headers[2]).queryByRole("button")).toBeNull();
    expect(headers[2]).toHaveTextContent("Plain");
  });
  it("does not render sort buttons when onSort is not given", () => {
    render(<DataTable data={rows} columns={[{ id: "name", header: "Name", sortable: true }]} />);
    expect(screen.queryByRole("button")).toBeNull();
  });
  it("uses selectionLabel and selectionHeader for the selection column", () => {
    render(<DataTable data={rows} columns={[{ id: "name", header: "Name" }]} selectedIds={[]} onSelectionChange={() => {}} selectionLabel={(row) => `Choose ${row.name}`} selectionHeader="Choose" />);
    expect(screen.getByRole("checkbox", { name: "Choose Alpha" })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")[0]).toHaveTextContent("Choose");
  });
});

describe("Metric", () => {
  it("shows label, value and optional helper", () => {
    render(<Metric label="Users" value="42" helper="this week" />);
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("this week")).toBeInTheDocument();
  });
});

describe("Badge", () => {
  it.each(["neutral", "success", "warning", "danger", "info"] as const)("accepts tone %s", (tone) => {
    render(<Badge tone={tone}>{tone}</Badge>);
    expect(screen.getByText(tone)).toHaveAttribute("data-tone", tone);
  });
  it("defaults to neutral and passes native attributes", () => {
    render(<Badge title="t" className="extra">b</Badge>);
    const badge = screen.getByText("b");
    expect(badge).toHaveAttribute("data-tone", "neutral");
    expect(badge).toHaveAttribute("title", "t");
    expect(badge.className).toContain("extra");
  });
});

describe("Divider", () => {
  it("renders a separator with native attributes", () => {
    render(<Divider className="extra" />);
    expect(screen.getByRole("separator").className).toContain("extra");
  });
});

describe("layout landmarks", () => {
  const Single = layoutModules["../src/layouts/SingleColumnLayout.tsx"].SingleColumnLayout;
  const Sidebar = layoutModules["../src/layouts/SidebarShellLayout.tsx"].SidebarShellLayout;
  it("a top-level layout renders one main landmark", () => {
    render(<Single>Body</Single>);
    expect(screen.getAllByRole("main")).toHaveLength(1);
  });
  it("a nested layout does not add a second main landmark", () => {
    render(<Single main={<Sidebar data-testid="inner">Inner</Sidebar>} />);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getByTestId("inner")).toHaveTextContent("Inner");
  });
  it("mainElement=div opts out when the host already has a main", () => {
    render(<Single mainElement="div">Body</Single>);
    expect(screen.queryByRole("main")).toBeNull();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });
  it("slotLabels name slot landmarks", () => {
    render(<Sidebar sidebar={<span>s</span>} nav={<span>n</span>} slotLabels={{ sidebar: "Filters", nav: "Sections", main: "Results" }}>Body</Sidebar>);
    expect(screen.getByRole("complementary", { name: "Filters" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Sections" })).toBeInTheDocument();
    expect(screen.getByRole("main", { name: "Results" })).toBeInTheDocument();
  });
});

describe("layout reading order", () => {
  const SLOTS = ["header", "nav", "hero", "toolbar", "sidebar", "secondarySidebar", "rail", "palette", "filters", "list", "stage", "canvas", "preview", "details", "main", "inspector", "properties", "timeline", "dock", "actions", "statusBar", "footer", "bottomNav"];
  const REGION_ATTR: Record<string, string> = { secondarysidebar: "secondary-sidebar", bottomnav: "bottom-nav" };
  it.each(LAYOUT_TYPES.map((l) => [l.name, l] as const))("%s renders declared regions in grid order", (name, layout) => {
    const Layout = layoutModules[`../src/layouts/${layout.importPath.split("/").pop()}.tsx`][name];
    const slotProps = Object.fromEntries(SLOTS.map((slot) => [slot, <span>{slot}</span>]));
    const { container } = render(<Layout {...slotProps} />);
    const root = container.querySelector("[data-layout-template]")!;
    const expected = (LAYOUT_READING_ORDER[root.getAttribute("data-layout-template")!] ?? []).map((area) => REGION_ATTR[area] ?? area);
    const rendered = [...root.children].map((child) => child.getAttribute("data-layout-region")!);
    expect(rendered).toHaveLength(SLOTS.length);
    expect(rendered.filter((region) => expected.includes(region))).toEqual(expected);
  });
});

describe("layouts", () => {
  it.each(LAYOUT_TYPES.map((l) => [l.name, l] as const))("%s renders slots, main/children and native attributes", (name, layout) => {
    const file = `../src/layouts/${layout.importPath.split("/").pop()}.tsx`;
    const Layout = layoutModules[file]?.[name];
    expect(Layout, file).toBeTypeOf("function");
    const { container, unmount } = render(<Layout className="host" data-testid="root" header={<span>H</span>} footer={<span>F</span>}>Body</Layout>);
    const root = screen.getByTestId("root");
    expect(root.className).toContain("host");
    expect(root).toHaveAttribute("data-layout-name");
    expect(container).toHaveTextContent("H");
    expect(container).toHaveTextContent("Body");
    expect(container).toHaveTextContent("F");
    unmount();
    render(<Layout data-testid="root2" main={<span>Main slot</span>}>ignored</Layout>);
    expect(screen.getByTestId("root2")).toHaveTextContent("Main slot");
    expect(screen.getByTestId("root2")).not.toHaveTextContent("ignored");
  });
});
