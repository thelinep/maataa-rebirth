import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type CopyGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function CopyGenerator(props:CopyGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.COPY_GENERATOR" name="Copy Generator" {...props} />; }
