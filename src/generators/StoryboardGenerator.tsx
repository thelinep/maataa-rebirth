import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type StoryboardGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function StoryboardGenerator(props:StoryboardGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.STORYBOARD_GENERATOR" name="Storyboard Generator" {...props} />; }
