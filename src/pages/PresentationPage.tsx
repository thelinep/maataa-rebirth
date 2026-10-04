import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type PresentationPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function PresentationPage({ pageType = "PAGE.TEMPLATE.PRESENTATION", ...props }: PresentationPageProps) { return <PagePreset pageType={pageType} {...props} />; }
