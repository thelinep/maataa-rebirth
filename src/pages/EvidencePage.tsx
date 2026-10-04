import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type EvidencePageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function EvidencePage({ pageType = "PAGE.TEMPLATE.EVIDENCE", ...props }: EvidencePageProps) { return <PagePreset pageType={pageType} {...props} />; }
