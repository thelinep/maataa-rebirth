import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type PageGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function PageGenerator(props:PageGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PAGE_GENERATOR" name="Page Generator" {...props} />; }
