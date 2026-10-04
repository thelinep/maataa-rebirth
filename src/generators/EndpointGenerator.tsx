import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type EndpointGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function EndpointGenerator(props:EndpointGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ENDPOINT_GENERATOR" name="Endpoint Generator" {...props} />; }
