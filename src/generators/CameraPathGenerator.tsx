import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type CameraPathGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function CameraPathGenerator(props:CameraPathGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.CAMERA_PATH_GENERATOR" name="Camera Path Generator" {...props} />; }
