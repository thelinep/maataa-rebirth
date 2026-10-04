import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type APIManifestGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function APIManifestGenerator(props:APIManifestGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.API_MANIFEST_GENERATOR" name="API Manifest Generator" {...props} />; }
