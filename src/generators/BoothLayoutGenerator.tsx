import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type BoothLayoutGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function BoothLayoutGenerator(props:BoothLayoutGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.BOOTH_LAYOUT_GENERATOR" name="Booth Layout Generator" {...props} />; }
