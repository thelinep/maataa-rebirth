import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type AdminPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function AdminPage({ pageType = "PAGE.TEMPLATE.ADMIN", ...props }: AdminPageProps) { return <PagePreset pageType={pageType} {...props} />; }
