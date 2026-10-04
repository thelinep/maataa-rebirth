import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type WebhookBuilderProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function WebhookBuilder(props:WebhookBuilderProps) { return <ToolSurface toolId="TOOL.WEBHOOK_BUILDER" name="Webhook Builder" {...props} />; }
