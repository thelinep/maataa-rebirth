import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type SearchPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function SearchPage({ pageType = "PAGE.TEMPLATE.SEARCH", ...props }: SearchPageProps) { return <PagePreset pageType={pageType} {...props} />; }
