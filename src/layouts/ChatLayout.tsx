import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Conversation list, thread, context. */
export function ChatLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Chat" template="chat" {...props} />;
}
