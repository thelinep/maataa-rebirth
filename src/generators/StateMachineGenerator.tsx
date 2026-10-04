import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type StateMachineGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function StateMachineGenerator(props:StateMachineGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.STATE_MACHINE_GENERATOR" name="State Machine Generator" {...props} />; }
