import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type DataPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function DataPage({ pageType = "PAGE.TEMPLATE.DATA", ...props }: DataPageProps) { return <PagePreset pageType={pageType} {...props} />; }
