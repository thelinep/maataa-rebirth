import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type AutomationGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function AutomationGenerator(props:AutomationGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.AUTOMATION_GENERATOR" name="Automation Generator" {...props} />; }
