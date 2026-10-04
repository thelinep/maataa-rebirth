import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type RepositoryGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function RepositoryGenerator(props:RepositoryGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.REPOSITORY_GENERATOR" name="Repository Generator" {...props} />; }
