import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type NextJsGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function NextJsGenerator(props:NextJsGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.NEXT_JS_GENERATOR" name="Next.js Generator" {...props} />; }
