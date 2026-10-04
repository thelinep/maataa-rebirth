import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type BannerGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function BannerGenerator(props:BannerGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.BANNER_GENERATOR" name="Banner Generator" {...props} />; }
