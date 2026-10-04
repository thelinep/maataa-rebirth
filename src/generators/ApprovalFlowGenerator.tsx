import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ApprovalFlowGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ApprovalFlowGenerator(props:ApprovalFlowGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.APPROVAL_FLOW_GENERATOR" name="Approval Flow Generator" {...props} />; }
