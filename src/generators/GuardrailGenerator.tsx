import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type GuardrailGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function GuardrailGenerator(props:GuardrailGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.GUARDRAIL_GENERATOR" name="Guardrail Generator" {...props} />; }
