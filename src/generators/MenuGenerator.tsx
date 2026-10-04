import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MenuGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MenuGenerator(props:MenuGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MENU_GENERATOR" name="Menu Generator" {...props} />; }
