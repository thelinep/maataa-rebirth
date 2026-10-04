import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SeedGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SeedGenerator(props:SeedGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SEED_GENERATOR" name="Seed Generator" {...props} />; }
