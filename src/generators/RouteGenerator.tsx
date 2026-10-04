import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type RouteGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function RouteGenerator(props:RouteGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ROUTE_GENERATOR" name="Route Generator" {...props} />; }
