import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type IconGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function IconGenerator(props:IconGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ICON_GENERATOR" name="Icon Generator" {...props} />; }
