import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ChangelogGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ChangelogGenerator(props:ChangelogGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.CHANGELOG_GENERATOR" name="Changelog Generator" {...props} />; }
