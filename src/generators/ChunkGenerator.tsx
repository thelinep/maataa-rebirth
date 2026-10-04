import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ChunkGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ChunkGenerator(props:ChunkGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.CHUNK_GENERATOR" name="Chunk Generator" {...props} />; }
