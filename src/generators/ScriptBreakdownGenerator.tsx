import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ScriptBreakdownGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ScriptBreakdownGenerator(props:ScriptBreakdownGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SCRIPT_BREAKDOWN_GENERATOR" name="Script Breakdown Generator" {...props} />; }
