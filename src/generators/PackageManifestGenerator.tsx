import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type PackageManifestGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function PackageManifestGenerator(props:PackageManifestGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PACKAGE_MANIFEST_GENERATOR" name="Package Manifest Generator" {...props} />; }
