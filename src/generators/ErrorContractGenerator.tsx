import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ErrorContractGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ErrorContractGenerator(props:ErrorContractGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ERROR_CONTRACT_GENERATOR" name="Error Contract Generator" {...props} />; }
