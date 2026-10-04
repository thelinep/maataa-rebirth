import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type AtomicComponentGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function AtomicComponentGenerator(props:AtomicComponentGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ATOMIC_COMPONENT_GENERATOR" name="Atomic Component Generator" {...props} />; }
