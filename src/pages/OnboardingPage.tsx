import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type OnboardingPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function OnboardingPage({ pageType = "PAGE.TEMPLATE.ONBOARDING", ...props }: OnboardingPageProps) { return <PagePreset pageType={pageType} {...props} />; }
