import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type WorkspaceGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function WorkspaceGenerator(props:WorkspaceGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.WORKSPACE_GENERATOR" name="Workspace Generator" {...props} />; }
