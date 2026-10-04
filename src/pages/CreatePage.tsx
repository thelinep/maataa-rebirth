import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type CreatePageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function CreatePage({ pageType = "PAGE.TEMPLATE.CREATE", ...props }: CreatePageProps) { return <PagePreset pageType={pageType} {...props} />; }
