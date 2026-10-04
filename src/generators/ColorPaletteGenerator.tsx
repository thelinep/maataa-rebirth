import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ColorPaletteGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ColorPaletteGenerator(props:ColorPaletteGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.COLOR_PALETTE_GENERATOR" name="Color Palette Generator" {...props} />; }
