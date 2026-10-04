import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MigrationGuideGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MigrationGuideGenerator(props:MigrationGuideGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MIGRATION_GUIDE_GENERATOR" name="Migration Guide Generator" {...props} />; }
