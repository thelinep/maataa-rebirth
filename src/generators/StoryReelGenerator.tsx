import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type StoryReelGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function StoryReelGenerator(props:StoryReelGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.STORY_REEL_GENERATOR" name="Story Reel Generator" {...props} />; }
