import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type PodcastGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function PodcastGenerator(props:PodcastGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PODCAST_GENERATOR" name="Podcast Generator" {...props} />; }
