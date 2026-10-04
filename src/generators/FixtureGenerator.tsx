import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type FixtureGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function FixtureGenerator(props:FixtureGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.FIXTURE_GENERATOR" name="Fixture Generator" {...props} />; }
