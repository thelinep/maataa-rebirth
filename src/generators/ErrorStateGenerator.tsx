import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ErrorStateGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ErrorStateGenerator(props:ErrorStateGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ERROR_STATE_GENERATOR" name="Error-State Generator" {...props} />; }
