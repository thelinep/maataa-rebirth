import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type DetailPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function DetailPage({ pageType = "PAGE.TEMPLATE.DETAIL", ...props }: DetailPageProps) { return <PagePreset pageType={pageType} {...props} />; }
