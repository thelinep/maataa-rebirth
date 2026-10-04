import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type BundleGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function BundleGenerator(props:BundleGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.BUNDLE_GENERATOR" name="Bundle Generator" {...props} />; }
