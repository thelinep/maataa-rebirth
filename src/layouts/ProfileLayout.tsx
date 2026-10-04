import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Profile hero and content. */
export function ProfileLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Profile" template="profile" {...props} />;
}
