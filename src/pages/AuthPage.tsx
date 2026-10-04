import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type AuthPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function AuthPage({ pageType = "PAGE.TEMPLATE.AUTH", ...props }: AuthPageProps) { return <PagePreset pageType={pageType} {...props} />; }
