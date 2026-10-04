import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type CaptionGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function CaptionGenerator(props:CaptionGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.CAPTION_GENERATOR" name="Caption Generator" {...props} />; }
