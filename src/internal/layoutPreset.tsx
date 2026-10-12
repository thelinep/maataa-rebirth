import React from "react";
import { cx } from "../utils";
import { LayoutRoot, LayoutHeader, LayoutFooter, LayoutMain, LayoutSidebar, LayoutSecondarySidebar, LayoutRail, LayoutToolbar, LayoutInspector, LayoutCanvas, LayoutDock, LayoutHero, LayoutTimeline, LayoutNav, LayoutActions, LayoutPanel, LayoutStage, LayoutPreview, LayoutPalette, LayoutProperties, LayoutStatusBar, LayoutBottomNav, LayoutFilters, LayoutList, LayoutDetails } from "../layout-atoms";

import { atomClass } from "./layoutAtom";
import { LAYOUT_READING_ORDER } from "./layoutReadingOrder.generated";

export type LayoutSlot = "header" | "nav" | "sidebar" | "secondarySidebar" | "rail" | "toolbar" | "main" | "inspector" | "footer" | "hero" | "canvas" | "dock" | "palette" | "stage" | "preview" | "timeline" | "actions" | "properties" | "statusBar" | "bottomNav" | "filters" | "list" | "details";

export type LayoutPresetProps = React.HTMLAttributes<HTMLDivElement> & {
  header?: React.ReactNode; nav?: React.ReactNode; sidebar?: React.ReactNode; secondarySidebar?: React.ReactNode; rail?: React.ReactNode; toolbar?: React.ReactNode;
  main?: React.ReactNode; inspector?: React.ReactNode; footer?: React.ReactNode; hero?: React.ReactNode; canvas?: React.ReactNode; dock?: React.ReactNode; palette?: React.ReactNode;
  stage?: React.ReactNode; preview?: React.ReactNode; timeline?: React.ReactNode; actions?: React.ReactNode; properties?: React.ReactNode; statusBar?: React.ReactNode; bottomNav?: React.ReactNode;
  filters?: React.ReactNode; list?: React.ReactNode; details?: React.ReactNode;
  /** Accessible names for slot landmarks, e.g. { sidebar: "Filters", nav: "Sections" }. */
  slotLabels?: Partial<Record<LayoutSlot, string>>;
  /**
   * Element for the main slot. Defaults to "main" for a top-level layout and "div" when the
   * layout is nested inside another layout, so a page never gets two main landmarks.
   * Use "div" when the host app already renders its own <main>.
   */
  mainElement?: "main" | "div";
  inset?: boolean; scroll?: boolean; sticky?: boolean;
};

const NestedLayoutContext = React.createContext(false);

/** Fixed DOM order used when a template declares no grid areas. */
const DEFAULT_ORDER: readonly LayoutSlot[] = ["header", "nav", "hero", "toolbar", "sidebar", "secondarySidebar", "rail", "palette", "filters", "list", "stage", "canvas", "preview", "details", "main", "inspector", "properties", "timeline", "dock", "actions", "statusBar", "footer", "bottomNav"];
const AREA_TO_SLOT: Readonly<Record<string, LayoutSlot>> = Object.fromEntries(DEFAULT_ORDER.map(slot => [slot.toLowerCase(), slot]));

/**
 * Slots placed by the template's grid areas take the grid's row-major order; other slots keep
 * their default positions, so only the declared regions are reordered.
 */
function readingOrder(template: string): readonly LayoutSlot[] {
  const areas = (LAYOUT_READING_ORDER[template] ?? []).map(area => AREA_TO_SLOT[area]).filter((slot): slot is LayoutSlot => !!slot);
  if (!areas.length) return DEFAULT_ORDER;
  const placed = new Set(areas);
  let next = 0;
  return DEFAULT_ORDER.map(slot => (placed.has(slot) ? areas[next++] : slot));
}

export function LayoutPreset({ preset, template, className, children, header, nav, sidebar, secondarySidebar, rail, toolbar, main, inspector, footer, hero, canvas, dock, palette, stage, preview, timeline, actions, properties, statusBar, bottomNav, filters, list, details, slotLabels, mainElement, ...props }: LayoutPresetProps & { preset: string; template: string }) {
  const nested = React.useContext(NestedLayoutContext);
  const mainTag = mainElement ?? (nested ? "div" : "main");
  const l = (slot: LayoutSlot) => (slotLabels?.[slot] ? { "aria-label": slotLabels[slot] } : {});
  const nodes: Record<LayoutSlot, React.ReactNode> = {
    header: header !== undefined && <LayoutHeader {...l("header")}>{header}</LayoutHeader>,
    nav: nav !== undefined && <LayoutNav {...l("nav")}>{nav}</LayoutNav>,
    hero: hero !== undefined && <LayoutHero {...l("hero")}>{hero}</LayoutHero>,
    toolbar: toolbar !== undefined && <LayoutToolbar {...l("toolbar")}>{toolbar}</LayoutToolbar>,
    sidebar: sidebar !== undefined && <LayoutSidebar {...l("sidebar")}>{sidebar}</LayoutSidebar>,
    secondarySidebar: secondarySidebar !== undefined && <LayoutSecondarySidebar {...l("secondarySidebar")}>{secondarySidebar}</LayoutSecondarySidebar>,
    rail: rail !== undefined && <LayoutRail {...l("rail")}>{rail}</LayoutRail>,
    palette: palette !== undefined && <LayoutPalette {...l("palette")}>{palette}</LayoutPalette>,
    filters: filters !== undefined && <LayoutFilters {...l("filters")}>{filters}</LayoutFilters>,
    list: list !== undefined && <LayoutList {...l("list")}>{list}</LayoutList>,
    stage: stage !== undefined && <LayoutStage {...l("stage")}>{stage}</LayoutStage>,
    canvas: canvas !== undefined && <LayoutCanvas {...l("canvas")}>{canvas}</LayoutCanvas>,
    preview: preview !== undefined && <LayoutPreview {...l("preview")}>{preview}</LayoutPreview>,
    details: details !== undefined && <LayoutDetails {...l("details")}>{details}</LayoutDetails>,
    main: mainTag === "main" ? <LayoutMain {...l("main")}>{main ?? children}</LayoutMain> : <div data-layout-region="main" className={atomClass("main")} {...l("main")}>{main ?? children}</div>,
    inspector: inspector !== undefined && <LayoutInspector {...l("inspector")}>{inspector}</LayoutInspector>,
    properties: properties !== undefined && <LayoutProperties {...l("properties")}>{properties}</LayoutProperties>,
    timeline: timeline !== undefined && <LayoutTimeline {...l("timeline")}>{timeline}</LayoutTimeline>,
    dock: dock !== undefined && <LayoutDock {...l("dock")}>{dock}</LayoutDock>,
    actions: actions !== undefined && <LayoutActions {...l("actions")}>{actions}</LayoutActions>,
    statusBar: statusBar !== undefined && <LayoutStatusBar {...l("statusBar")}>{statusBar}</LayoutStatusBar>,
    footer: footer !== undefined && <LayoutFooter {...l("footer")}>{footer}</LayoutFooter>,
    bottomNav: bottomNav !== undefined && <LayoutBottomNav {...l("bottomNav")}>{bottomNav}</LayoutBottomNav>,
  };
  // Render slots in the order they appear on screen for this template (WCAG 1.3.2 / 2.4.3).
  const order = readingOrder(template);
  return <NestedLayoutContext.Provider value={true}><LayoutRoot data-layout-name={preset} data-layout-template={template} className={cx("m-layout-preset", className)} {...props}>
    {order.map(slot => <React.Fragment key={slot}>{nodes[slot]}</React.Fragment>)}
  </LayoutRoot></NestedLayoutContext.Provider>;
}
