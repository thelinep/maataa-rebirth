import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type DashboardPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function DashboardPage({ pageType = "PAGE.TEMPLATE.DASHBOARD", ...props }: DashboardPageProps) { return <PagePreset pageType={pageType} {...props} />; }
