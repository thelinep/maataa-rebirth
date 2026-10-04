import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MotionGraphicsGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MotionGraphicsGenerator(props:MotionGraphicsGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MOTION_GRAPHICS_GENERATOR" name="Motion Graphics Generator" {...props} />; }
