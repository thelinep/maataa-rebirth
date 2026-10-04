import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SDKGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SDKGenerator(props:SDKGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SDK_GENERATOR" name="SDK Generator" {...props} />; }
