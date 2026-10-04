import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type E2ETestGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function E2ETestGenerator(props:E2ETestGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.E2E_TEST_GENERATOR" name="E2E Test Generator" {...props} />; }
