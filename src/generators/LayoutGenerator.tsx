import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type LayoutGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function LayoutGenerator(props:LayoutGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.LAYOUT_GENERATOR" name="Layout Generator" {...props} />; }
