import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type ApprovalPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function ApprovalPage({ pageType = "PAGE.TEMPLATE.APPROVAL", ...props }: ApprovalPageProps) { return <PagePreset pageType={pageType} {...props} />; }
