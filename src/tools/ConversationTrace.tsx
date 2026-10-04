import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type ConversationTraceProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function ConversationTrace(props:ConversationTraceProps) { return <ToolSurface toolId="TOOL.CONVERSATION_TRACE" name="Conversation Trace" {...props} />; }
