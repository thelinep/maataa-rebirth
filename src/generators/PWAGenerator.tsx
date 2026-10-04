import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type PWAGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function PWAGenerator(props:PWAGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PWA_GENERATOR" name="PWA Generator" {...props} />; }
