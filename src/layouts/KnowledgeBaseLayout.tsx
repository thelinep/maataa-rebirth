import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/**
 * Tree, article, contextual navigation.
 * @deprecated Same template as `DocumentationLayout`; use `DocumentationLayout` instead. Kept for compatibility (decision 2026-10-12).
 */
export function KnowledgeBaseLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="KnowledgeBase" template="documentation" {...props} />;
}
