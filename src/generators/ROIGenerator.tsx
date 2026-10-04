import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ROIGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ROIGenerator(props:ROIGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ROI_GENERATOR" name="ROI Generator" {...props} />; }
