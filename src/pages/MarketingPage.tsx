import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type MarketingPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function MarketingPage({ pageType = "PAGE.TEMPLATE.MARKETING", ...props }: MarketingPageProps) { return <PagePreset pageType={pageType} {...props} />; }
