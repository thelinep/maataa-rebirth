import React from "react";
import { AISpaceSurface, type AISpaceSurfaceProps } from "./AISpaceSurface";
export type AICustomerSupportWorkspaceProps = Omit<AISpaceSurfaceProps, "spaceId" | "name">;
export function AICustomerSupportWorkspace(props:AICustomerSupportWorkspaceProps) { return <AISpaceSurface spaceId="AI_SPACE.AI_CUSTOMER_SUPPORT_WORKSPACE" name="AI Customer Support Workspace" {...props} />; }
