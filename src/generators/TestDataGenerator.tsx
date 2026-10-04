import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type TestDataGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function TestDataGenerator(props:TestDataGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.TEST_DATA_GENERATOR" name="Test Data Generator" {...props} />; }
