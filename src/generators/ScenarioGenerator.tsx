import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ScenarioGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ScenarioGenerator(props:ScenarioGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SCENARIO_GENERATOR" name="Scenario Generator" {...props} />; }
