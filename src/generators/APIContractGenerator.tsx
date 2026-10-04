import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type APIContractGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function APIContractGenerator(props:APIContractGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.API_CONTRACT_GENERATOR" name="API Contract Generator" {...props} />; }
