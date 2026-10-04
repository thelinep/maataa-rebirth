import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type APITestGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function APITestGenerator(props:APITestGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.API_TEST_GENERATOR" name="API Test Generator" {...props} />; }
