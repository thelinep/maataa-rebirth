import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ThemeGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ThemeGenerator(props:ThemeGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.THEME_GENERATOR" name="Theme Generator" {...props} />; }
