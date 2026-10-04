import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Feed with supporting rails. */
export function SocialFeedLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="SocialFeed" template="social-feed" {...props} />;
}
