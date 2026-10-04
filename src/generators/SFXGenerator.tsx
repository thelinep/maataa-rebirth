import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SFXGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SFXGenerator(props:SFXGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SFX_GENERATOR" name="SFX Generator" {...props} />; }
