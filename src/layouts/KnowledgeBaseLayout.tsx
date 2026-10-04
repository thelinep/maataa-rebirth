import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Tree, article, contextual navigation. */
export function KnowledgeBaseLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="KnowledgeBase" template="documentation" {...props} />;
}
