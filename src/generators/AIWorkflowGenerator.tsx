import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type AIWorkflowGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function AIWorkflowGenerator(props:AIWorkflowGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.AI_WORKFLOW_GENERATOR" name="AI Workflow Generator" {...props} />; }
