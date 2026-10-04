import React from "react";
import { cx } from "../utils";
import { LayoutRoot, LayoutHeader, LayoutFooter, LayoutMain, LayoutSidebar, LayoutSecondarySidebar, LayoutRail, LayoutToolbar, LayoutInspector, LayoutCanvas, LayoutDock, LayoutHero, LayoutTimeline, LayoutNav, LayoutActions, LayoutPanel, LayoutStage, LayoutPreview, LayoutPalette, LayoutProperties, LayoutStatusBar, LayoutBottomNav, LayoutFilters, LayoutList, LayoutDetails } from "../layout-atoms";

export type LayoutPresetProps = React.HTMLAttributes<HTMLDivElement> & {
  header?: React.ReactNode; nav?: React.ReactNode; sidebar?: React.ReactNode; secondarySidebar?: React.ReactNode; rail?: React.ReactNode; toolbar?: React.ReactNode;
  main?: React.ReactNode; inspector?: React.ReactNode; footer?: React.ReactNode; hero?: React.ReactNode; canvas?: React.ReactNode; dock?: React.ReactNode; palette?: React.ReactNode;
  stage?: React.ReactNode; preview?: React.ReactNode; timeline?: React.ReactNode; actions?: React.ReactNode; properties?: React.ReactNode; statusBar?: React.ReactNode; bottomNav?: React.ReactNode;
  filters?: React.ReactNode; list?: React.ReactNode; details?: React.ReactNode;
};

export function LayoutPreset({ preset, template, className, children, header, nav, sidebar, secondarySidebar, rail, toolbar, main, inspector, footer, hero, canvas, dock, palette, stage, preview, timeline, actions, properties, statusBar, bottomNav, filters, list, details, ...props }: LayoutPresetProps & { preset: string; template: string }) {
  return <LayoutRoot data-layout-name={preset} data-layout-template={template} className={cx("m-layout-preset", className)} {...props}>
    {header !== undefined && <LayoutHeader>{header}</LayoutHeader>}
    {nav !== undefined && <LayoutNav>{nav}</LayoutNav>}
    {hero !== undefined && <LayoutHero>{hero}</LayoutHero>}
    {toolbar !== undefined && <LayoutToolbar>{toolbar}</LayoutToolbar>}
    {sidebar !== undefined && <LayoutSidebar>{sidebar}</LayoutSidebar>}
    {secondarySidebar !== undefined && <LayoutSecondarySidebar>{secondarySidebar}</LayoutSecondarySidebar>}
    {rail !== undefined && <LayoutRail>{rail}</LayoutRail>}
    {palette !== undefined && <LayoutPalette>{palette}</LayoutPalette>}
    {filters !== undefined && <LayoutFilters>{filters}</LayoutFilters>}
    {list !== undefined && <LayoutList>{list}</LayoutList>}
    {stage !== undefined && <LayoutStage>{stage}</LayoutStage>}
    {canvas !== undefined && <LayoutCanvas>{canvas}</LayoutCanvas>}
    {preview !== undefined && <LayoutPreview>{preview}</LayoutPreview>}
    {details !== undefined && <LayoutDetails>{details}</LayoutDetails>}
    <LayoutMain>{main ?? children}</LayoutMain>
    {inspector !== undefined && <LayoutInspector>{inspector}</LayoutInspector>}
    {properties !== undefined && <LayoutProperties>{properties}</LayoutProperties>}
    {timeline !== undefined && <LayoutTimeline>{timeline}</LayoutTimeline>}
    {dock !== undefined && <LayoutDock>{dock}</LayoutDock>}
    {actions !== undefined && <LayoutActions>{actions}</LayoutActions>}
    {statusBar !== undefined && <LayoutStatusBar>{statusBar}</LayoutStatusBar>}
    {footer !== undefined && <LayoutFooter>{footer}</LayoutFooter>}
    {bottomNav !== undefined && <LayoutBottomNav>{bottomNav}</LayoutBottomNav>}
  </LayoutRoot>;
}
