import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type OpenAPIGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function OpenAPIGenerator(props:OpenAPIGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.OPENAPI_GENERATOR" name="OpenAPI Generator" {...props} />; }
