import React from "react";
import { cx } from "../utils";
import { LayoutRoot, LayoutHeader, LayoutFooter, LayoutMain, LayoutSidebar, LayoutSecondarySidebar, LayoutRail, LayoutToolbar, LayoutInspector, LayoutCanvas, LayoutDock, LayoutHero, LayoutTimeline, LayoutNav, LayoutActions, LayoutPanel, LayoutStage, LayoutPreview, LayoutPalette, LayoutProperties, LayoutStatusBar, LayoutBottomNav, LayoutFilters, LayoutList, LayoutDetails } from "../layout-atoms";

import { atomClass } from "./layoutAtom";

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

export function LayoutPreset({ preset, template, className, children, header, nav, sidebar, secondarySidebar, rail, toolbar, main, inspector, footer, hero, canvas, dock, palette, stage, preview, timeline, actions, properties, statusBar, bottomNav, filters, list, details, slotLabels, mainElement, ...props }: LayoutPresetProps & { preset: string; template: string }) {
  const nested = React.useContext(NestedLayoutContext);
  const mainTag = mainElement ?? (nested ? "div" : "main");
  const l = (slot: LayoutSlot) => (slotLabels?.[slot] ? { "aria-label": slotLabels[slot] } : {});
  return <NestedLayoutContext.Provider value={true}><LayoutRoot data-layout-name={preset} data-layout-template={template} className={cx("m-layout-preset", className)} {...props}>
    {header !== undefined && <LayoutHeader {...l("header")}>{header}</LayoutHeader>}
    {nav !== undefined && <LayoutNav {...l("nav")}>{nav}</LayoutNav>}
    {hero !== undefined && <LayoutHero {...l("hero")}>{hero}</LayoutHero>}
    {toolbar !== undefined && <LayoutToolbar {...l("toolbar")}>{toolbar}</LayoutToolbar>}
    {sidebar !== undefined && <LayoutSidebar {...l("sidebar")}>{sidebar}</LayoutSidebar>}
    {secondarySidebar !== undefined && <LayoutSecondarySidebar {...l("secondarySidebar")}>{secondarySidebar}</LayoutSecondarySidebar>}
    {rail !== undefined && <LayoutRail {...l("rail")}>{rail}</LayoutRail>}
    {palette !== undefined && <LayoutPalette {...l("palette")}>{palette}</LayoutPalette>}
    {filters !== undefined && <LayoutFilters {...l("filters")}>{filters}</LayoutFilters>}
    {list !== undefined && <LayoutList {...l("list")}>{list}</LayoutList>}
    {stage !== undefined && <LayoutStage {...l("stage")}>{stage}</LayoutStage>}
    {canvas !== undefined && <LayoutCanvas {...l("canvas")}>{canvas}</LayoutCanvas>}
    {preview !== undefined && <LayoutPreview {...l("preview")}>{preview}</LayoutPreview>}
    {details !== undefined && <LayoutDetails {...l("details")}>{details}</LayoutDetails>}
    {mainTag === "main" ? <LayoutMain {...l("main")}>{main ?? children}</LayoutMain> : <div data-layout-region="main" className={atomClass("main")} {...l("main")}>{main ?? children}</div>}
    {inspector !== undefined && <LayoutInspector {...l("inspector")}>{inspector}</LayoutInspector>}
    {properties !== undefined && <LayoutProperties {...l("properties")}>{properties}</LayoutProperties>}
    {timeline !== undefined && <LayoutTimeline {...l("timeline")}>{timeline}</LayoutTimeline>}
    {dock !== undefined && <LayoutDock {...l("dock")}>{dock}</LayoutDock>}
    {actions !== undefined && <LayoutActions {...l("actions")}>{actions}</LayoutActions>}
    {statusBar !== undefined && <LayoutStatusBar {...l("statusBar")}>{statusBar}</LayoutStatusBar>}
    {footer !== undefined && <LayoutFooter {...l("footer")}>{footer}</LayoutFooter>}
    {bottomNav !== undefined && <LayoutBottomNav {...l("bottomNav")}>{bottomNav}</LayoutBottomNav>}
  </LayoutRoot></NestedLayoutContext.Provider>;
}
