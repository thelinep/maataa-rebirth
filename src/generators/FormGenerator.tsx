import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type FormGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function FormGenerator(props:FormGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.FORM_GENERATOR" name="Form Generator" {...props} />; }
