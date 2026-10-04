import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ReleaseManifestGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ReleaseManifestGenerator(props:ReleaseManifestGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.RELEASE_MANIFEST_GENERATOR" name="Release Manifest Generator" {...props} />; }
