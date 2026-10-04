import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ImageGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ImageGenerator(props:ImageGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.IMAGE_GENERATOR" name="Image Generator" {...props} />; }
