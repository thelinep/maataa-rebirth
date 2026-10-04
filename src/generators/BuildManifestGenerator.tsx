import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type BuildManifestGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function BuildManifestGenerator(props:BuildManifestGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.BUILD_MANIFEST_GENERATOR" name="Build Manifest Generator" {...props} />; }
