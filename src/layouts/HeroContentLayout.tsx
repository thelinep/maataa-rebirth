import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Large hero plus content. */
export function HeroContentLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="HeroContent" template="hero-content" {...props} />;
}
