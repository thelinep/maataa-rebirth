import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type HookGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function HookGenerator(props:HookGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.HOOK_GENERATOR" name="Hook Generator" {...props} />; }
