import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type StudioPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function StudioPage({ pageType = "PAGE.TEMPLATE.STUDIO", ...props }: StudioPageProps) { return <PagePreset pageType={pageType} {...props} />; }
