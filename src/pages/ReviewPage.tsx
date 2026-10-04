import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type ReviewPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function ReviewPage({ pageType = "PAGE.TEMPLATE.REVIEW", ...props }: ReviewPageProps) { return <PagePreset pageType={pageType} {...props} />; }
