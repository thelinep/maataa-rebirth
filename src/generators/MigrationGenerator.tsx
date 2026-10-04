import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MigrationGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MigrationGenerator(props:MigrationGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MIGRATION_GENERATOR" name="Migration Generator" {...props} />; }
