import React from "react";
import { cx } from "../utils";
import { WorkspaceRoot, WorkspaceHeader, WorkspaceNav, WorkspaceSidebar, WorkspaceRail, WorkspaceToolbar, WorkspaceCommandBar, WorkspacePalette, WorkspaceFilters, WorkspaceList, WorkspaceMain, WorkspaceCanvas, WorkspaceDetails, WorkspaceInspector, WorkspaceProperties, WorkspaceTimeline, WorkspaceActivity, WorkspaceContext, WorkspacePanel, WorkspaceDock, WorkspaceActions, WorkspaceTabs, WorkspaceStatusBar, WorkspaceFooter } from "../workspace-atoms";

export type WorkspacePresetProps = React.HTMLAttributes<HTMLDivElement> & { workspaceType?: string; header?: React.ReactNode; nav?: React.ReactNode; sidebar?: React.ReactNode; rail?: React.ReactNode; toolbar?: React.ReactNode; commandBar?: React.ReactNode; palette?: React.ReactNode; filters?: React.ReactNode; list?: React.ReactNode; main?: React.ReactNode; canvas?: React.ReactNode; details?: React.ReactNode; inspector?: React.ReactNode; properties?: React.ReactNode; timeline?: React.ReactNode; activity?: React.ReactNode; context?: React.ReactNode; panel?: React.ReactNode; dock?: React.ReactNode; actions?: React.ReactNode; tabs?: React.ReactNode; statusBar?: React.ReactNode; footer?: React.ReactNode; };

export function WorkspacePreset({ workspaceType = "WORKSPACE.GENERIC", className, children, header, nav, sidebar, rail, toolbar, commandBar, palette, filters, list, main, canvas, details, inspector, properties, timeline, activity, context, panel, dock, actions, tabs, statusBar, footer, ...props }: WorkspacePresetProps) {
  return <WorkspaceRoot data-workspace-type={workspaceType} className={cx("m-workspace-preset", className)} {...props}>
    {header !== undefined && <WorkspaceHeader>{header}</WorkspaceHeader>}
    {nav !== undefined && <WorkspaceNav>{nav}</WorkspaceNav>}
    {toolbar !== undefined && <WorkspaceToolbar>{toolbar}</WorkspaceToolbar>}
    {commandBar !== undefined && <WorkspaceCommandBar>{commandBar}</WorkspaceCommandBar>}
    {tabs !== undefined && <WorkspaceTabs>{tabs}</WorkspaceTabs>}
    {sidebar !== undefined && <WorkspaceSidebar>{sidebar}</WorkspaceSidebar>}
    {rail !== undefined && <WorkspaceRail>{rail}</WorkspaceRail>}
    {palette !== undefined && <WorkspacePalette>{palette}</WorkspacePalette>}
    {filters !== undefined && <WorkspaceFilters>{filters}</WorkspaceFilters>}
    {list !== undefined && <WorkspaceList>{list}</WorkspaceList>}
    {canvas !== undefined && <WorkspaceCanvas>{canvas}</WorkspaceCanvas>}
    <WorkspaceMain>{main ?? children}</WorkspaceMain>
    {details !== undefined && <WorkspaceDetails>{details}</WorkspaceDetails>}
    {inspector !== undefined && <WorkspaceInspector>{inspector}</WorkspaceInspector>}
    {properties !== undefined && <WorkspaceProperties>{properties}</WorkspaceProperties>}
    {timeline !== undefined && <WorkspaceTimeline>{timeline}</WorkspaceTimeline>}
    {activity !== undefined && <WorkspaceActivity>{activity}</WorkspaceActivity>}
    {context !== undefined && <WorkspaceContext>{context}</WorkspaceContext>}
    {panel !== undefined && <WorkspacePanel>{panel}</WorkspacePanel>}
    {dock !== undefined && <WorkspaceDock>{dock}</WorkspaceDock>}
    {actions !== undefined && <WorkspaceActions>{actions}</WorkspaceActions>}
    {statusBar !== undefined && <WorkspaceStatusBar>{statusBar}</WorkspaceStatusBar>}
    {footer !== undefined && <WorkspaceFooter>{footer}</WorkspaceFooter>}
  </WorkspaceRoot>;
}
