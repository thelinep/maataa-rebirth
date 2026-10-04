import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Facets and results. */
export function SearchResultsLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="SearchResults" template="search-results" {...props} />;
}
