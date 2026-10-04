import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ReleaseNotesGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ReleaseNotesGenerator(props:ReleaseNotesGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.RELEASE_NOTES_GENERATOR" name="Release Notes Generator" {...props} />; }
