import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ETLGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ETLGenerator(props:ETLGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ETL_GENERATOR" name="ETL Generator" {...props} />; }
