import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type FunctionSchemaGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function FunctionSchemaGenerator(props:FunctionSchemaGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.FUNCTION_SCHEMA_GENERATOR" name="Function Schema Generator" {...props} />; }
