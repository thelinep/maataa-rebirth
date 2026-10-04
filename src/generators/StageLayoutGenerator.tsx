import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type StageLayoutGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function StageLayoutGenerator(props:StageLayoutGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.STAGE_LAYOUT_GENERATOR" name="Stage Layout Generator" {...props} />; }
