import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type WebhookTesterProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function WebhookTester(props:WebhookTesterProps) { return <ToolSurface toolId="TOOL.WEBHOOK_TESTER" name="Webhook Tester" {...props} />; }
