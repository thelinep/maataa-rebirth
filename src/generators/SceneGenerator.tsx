import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SceneGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SceneGenerator(props:SceneGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SCENE_GENERATOR" name="Scene Generator" {...props} />; }
