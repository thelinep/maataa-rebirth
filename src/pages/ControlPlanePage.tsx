import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type ControlPlanePageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function ControlPlanePage({ pageType = "PAGE.TEMPLATE.CONTROLPLANE", ...props }: ControlPlanePageProps) { return <PagePreset pageType={pageType} {...props} />; }
