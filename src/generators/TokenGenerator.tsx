import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type TokenGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function TokenGenerator(props:TokenGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.TOKEN_GENERATOR" name="Token Generator" {...props} />; }
