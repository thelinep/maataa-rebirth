import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ActionChainGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ActionChainGenerator(props:ActionChainGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ACTION_CHAIN_GENERATOR" name="Action Chain Generator" {...props} />; }
