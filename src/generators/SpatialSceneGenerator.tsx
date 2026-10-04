import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SpatialSceneGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SpatialSceneGenerator(props:SpatialSceneGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SPATIAL_SCENE_GENERATOR" name="Spatial Scene Generator" {...props} />; }
