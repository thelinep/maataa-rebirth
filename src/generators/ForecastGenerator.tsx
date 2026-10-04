import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ForecastGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ForecastGenerator(props:ForecastGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.FORECAST_GENERATOR" name="Forecast Generator" {...props} />; }
