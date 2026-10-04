import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ShotGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ShotGenerator(props:ShotGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SHOT_GENERATOR" name="Shot Generator" {...props} />; }
