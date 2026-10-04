import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MotionTokenGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MotionTokenGenerator(props:MotionTokenGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MOTION_TOKEN_GENERATOR" name="Motion Token Generator" {...props} />; }
