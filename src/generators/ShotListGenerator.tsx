import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ShotListGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ShotListGenerator(props:ShotListGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SHOT_LIST_GENERATOR" name="Shot List Generator" {...props} />; }
