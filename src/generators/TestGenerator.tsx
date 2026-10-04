import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type TestGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function TestGenerator(props:TestGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.TEST_GENERATOR" name="Test Generator" {...props} />; }
