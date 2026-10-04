import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ThreeDSceneGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ThreeDSceneGenerator(props:ThreeDSceneGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.3D_SCENE_GENERATOR" name="3D Scene Generator" {...props} />; }
