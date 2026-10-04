import React from "react";
import { cx } from "../utils";
import { PageRoot, PageHeader, PageBreadcrumbs, PageHero, PageToolbar, PageActions, PageSummary, PageFilters, PageSearch, PageTabs, PageBody, PageSidebar, PageRail, PageInspector, PageMeta, PageStatus, PageFooter } from "../page-atoms";

export type PagePresetProps = React.HTMLAttributes<HTMLDivElement> & { pageType?: string; header?: React.ReactNode; breadcrumbs?: React.ReactNode; hero?: React.ReactNode; toolbar?: React.ReactNode; actions?: React.ReactNode; summary?: React.ReactNode; filters?: React.ReactNode; search?: React.ReactNode; tabs?: React.ReactNode; sidebar?: React.ReactNode; rail?: React.ReactNode; inspector?: React.ReactNode; meta?: React.ReactNode; status?: React.ReactNode; footer?: React.ReactNode; body?: React.ReactNode; };

export function PagePreset({ pageType = "PAGE.GENERIC", className, children, header, breadcrumbs, hero, toolbar, actions, summary, filters, search, tabs, sidebar, rail, inspector, meta, status, footer, body, ...props }: PagePresetProps) {
  return <PageRoot data-page-type={pageType} className={cx("m-page-preset", className)} {...props}>
    {header !== undefined && <PageHeader>{header}</PageHeader>}
    {breadcrumbs !== undefined && <PageBreadcrumbs>{breadcrumbs}</PageBreadcrumbs>}
    {hero !== undefined && <PageHero>{hero}</PageHero>}
    {toolbar !== undefined && <PageToolbar>{toolbar}</PageToolbar>}
    {actions !== undefined && <PageActions>{actions}</PageActions>}
    {summary !== undefined && <PageSummary>{summary}</PageSummary>}
    {filters !== undefined && <PageFilters>{filters}</PageFilters>}
    {search !== undefined && <PageSearch>{search}</PageSearch>}
    {tabs !== undefined && <PageTabs>{tabs}</PageTabs>}
    {sidebar !== undefined && <PageSidebar>{sidebar}</PageSidebar>}
    <PageBody>{body ?? children}</PageBody>
    {rail !== undefined && <PageRail>{rail}</PageRail>}
    {inspector !== undefined && <PageInspector>{inspector}</PageInspector>}
    {meta !== undefined && <PageMeta>{meta}</PageMeta>}
    {status !== undefined && <PageStatus>{status}</PageStatus>}
    {footer !== undefined && <PageFooter>{footer}</PageFooter>}
  </PageRoot>;
}
