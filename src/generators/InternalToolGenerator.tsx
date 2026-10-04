import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type InternalToolGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function InternalToolGenerator(props:InternalToolGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.INTERNAL_TOOL_GENERATOR" name="Internal Tool Generator" {...props} />; }
