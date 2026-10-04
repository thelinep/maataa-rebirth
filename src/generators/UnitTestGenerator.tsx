import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type UnitTestGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function UnitTestGenerator(props:UnitTestGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.UNIT_TEST_GENERATOR" name="Unit Test Generator" {...props} />; }
