import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type SettingsPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function SettingsPage({ pageType = "PAGE.TEMPLATE.SETTINGS", ...props }: SettingsPageProps) { return <PagePreset pageType={pageType} {...props} />; }
