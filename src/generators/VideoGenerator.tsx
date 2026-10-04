import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type VideoGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function VideoGenerator(props:VideoGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.VIDEO_GENERATOR" name="Video Generator" {...props} />; }
