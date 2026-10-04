import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type VisualRegressionGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function VisualRegressionGenerator(props:VisualRegressionGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.VISUAL_REGRESSION_GENERATOR" name="Visual Regression Generator" {...props} />; }
