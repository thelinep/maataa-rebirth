import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type TableGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function TableGenerator(props:TableGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.TABLE_GENERATOR" name="Table Generator" {...props} />; }
