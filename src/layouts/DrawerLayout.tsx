import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Content with contextual drawer. */
export function DrawerLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Drawer" template="drawer" {...props} />;
}
