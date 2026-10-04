import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type ErrorPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function ErrorPage({ pageType = "PAGE.TEMPLATE.ERROR", ...props }: ErrorPageProps) { return <PagePreset pageType={pageType} {...props} />; }
