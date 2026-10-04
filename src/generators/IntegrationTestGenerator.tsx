import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type IntegrationTestGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function IntegrationTestGenerator(props:IntegrationTestGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.INTEGRATION_TEST_GENERATOR" name="Integration Test Generator" {...props} />; }
