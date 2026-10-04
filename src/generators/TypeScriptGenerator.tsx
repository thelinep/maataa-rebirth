import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type TypeScriptGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function TypeScriptGenerator(props:TypeScriptGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.TYPESCRIPT_GENERATOR" name="TypeScript Generator" {...props} />; }
