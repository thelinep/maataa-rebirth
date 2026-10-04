import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type DocumentationPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function DocumentationPage({ pageType = "PAGE.TEMPLATE.DOCUMENTATION", ...props }: DocumentationPageProps) { return <PagePreset pageType={pageType} {...props} />; }
