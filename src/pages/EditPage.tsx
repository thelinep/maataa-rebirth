import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type EditPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function EditPage({ pageType = "PAGE.TEMPLATE.EDIT", ...props }: EditPageProps) { return <PagePreset pageType={pageType} {...props} />; }
