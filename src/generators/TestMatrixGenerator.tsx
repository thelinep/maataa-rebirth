import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type TestMatrixGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function TestMatrixGenerator(props:TestMatrixGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.TEST_MATRIX_GENERATOR" name="Test Matrix Generator" {...props} />; }
