import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Overlay/HUD around visual content. */
export function HUDLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="HUD" template="hud" {...props} />;
}
