import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Hero, sections, proof, CTA, footer. */
export function LandingPageLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="LandingPage" template="landing" {...props} />;
}
