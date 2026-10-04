import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Folders, message list, detail. */
export function InboxLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Inbox" template="inbox" {...props} />;
}
