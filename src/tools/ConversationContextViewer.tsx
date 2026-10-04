import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ConversationContextViewerProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ConversationContextViewer(props:ConversationContextViewerProps) { return <ToolSurface toolId="TOOL.CONVERSATION_CONTEXT_VIEWER" name="Conversation Context Viewer" {...props} />; }
