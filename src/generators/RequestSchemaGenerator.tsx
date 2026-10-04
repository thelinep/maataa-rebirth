import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type RequestSchemaGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function RequestSchemaGenerator(props:RequestSchemaGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.REQUEST_SCHEMA_GENERATOR" name="Request Schema Generator" {...props} />; }
