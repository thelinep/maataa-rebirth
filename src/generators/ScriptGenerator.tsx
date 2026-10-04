import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ScriptGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ScriptGenerator(props:ScriptGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SCRIPT_GENERATOR" name="Script Generator" {...props} />; }
