import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type BuilderPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function BuilderPage({ pageType = "PAGE.TEMPLATE.BUILDER", ...props }: BuilderPageProps) { return <PagePreset pageType={pageType} {...props} />; }
