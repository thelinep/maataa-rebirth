import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Settings navigation and forms. */
export function SettingsLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Settings" template="settings" {...props} />;
}
