import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SchemaGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SchemaGenerator(props:SchemaGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SCHEMA_GENERATOR" name="Schema Generator" {...props} />; }
