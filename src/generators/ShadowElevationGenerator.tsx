import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ShadowElevationGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ShadowElevationGenerator(props:ShadowElevationGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SHADOW_ELEVATION_GENERATOR" name="Shadow/Elevation Generator" {...props} />; }
