import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Mobile app with bottom navigation. */
export function BottomNavigationAppLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="BottomNavigationApp" template="mobile-bottom-nav" {...props} />;
}
