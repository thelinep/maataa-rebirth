import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type EmailGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function EmailGenerator(props:EmailGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.EMAIL_GENERATOR" name="Email Generator" {...props} />; }
