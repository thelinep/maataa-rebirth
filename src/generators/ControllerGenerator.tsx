import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ControllerGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ControllerGenerator(props:ControllerGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.CONTROLLER_GENERATOR" name="Controller Generator" {...props} />; }
