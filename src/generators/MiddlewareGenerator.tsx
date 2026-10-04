import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MiddlewareGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MiddlewareGenerator(props:MiddlewareGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MIDDLEWARE_GENERATOR" name="Middleware Generator" {...props} />; }
