import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type WorkflowGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function WorkflowGenerator(props:WorkflowGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.WORKFLOW_GENERATOR" name="Workflow Generator" {...props} />; }
