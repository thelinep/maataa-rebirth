import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type EmptyStateGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function EmptyStateGenerator(props:EmptyStateGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.EMPTY_STATE_GENERATOR" name="Empty-State Generator" {...props} />; }
