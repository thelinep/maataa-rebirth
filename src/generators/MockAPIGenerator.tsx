import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MockAPIGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MockAPIGenerator(props:MockAPIGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MOCK_API_GENERATOR" name="Mock API Generator" {...props} />; }
