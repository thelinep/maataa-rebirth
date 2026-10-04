import React from "react";
import { ToolSurface, type ToolSurfaceProps } from "./ToolSurface";
export type WebhookDeliveryInspectorProps = Omit<ToolSurfaceProps, "toolId" | "name">;
export function WebhookDeliveryInspector(props:WebhookDeliveryInspectorProps) { return <ToolSurface toolId="TOOL.WEBHOOK_DELIVERY_INSPECTOR" name="Webhook Delivery Inspector" {...props} />; }
