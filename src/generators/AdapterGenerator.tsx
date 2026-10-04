import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type AdapterGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function AdapterGenerator(props:AdapterGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ADAPTER_GENERATOR" name="Adapter Generator" {...props} />; }
