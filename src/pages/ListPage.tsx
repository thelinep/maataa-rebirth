import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type ListPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function ListPage({ pageType = "PAGE.TEMPLATE.LIST", ...props }: ListPageProps) { return <PagePreset pageType={pageType} {...props} />; }
