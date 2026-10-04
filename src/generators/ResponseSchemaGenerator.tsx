import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ResponseSchemaGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ResponseSchemaGenerator(props:ResponseSchemaGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.RESPONSE_SCHEMA_GENERATOR" name="Response Schema Generator" {...props} />; }
