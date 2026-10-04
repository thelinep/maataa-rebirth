import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MockDataGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MockDataGenerator(props:MockDataGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MOCK_DATA_GENERATOR" name="Mock Data Generator" {...props} />; }
