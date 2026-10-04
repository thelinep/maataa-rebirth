import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type EvaluationGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function EvaluationGenerator(props:EvaluationGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.EVALUATION_GENERATOR" name="Evaluation Generator" {...props} />; }
