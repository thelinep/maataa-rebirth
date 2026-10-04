import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type DataViewGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function DataViewGenerator(props:DataViewGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.DATA_VIEW_GENERATOR" name="Data View Generator" {...props} />; }
