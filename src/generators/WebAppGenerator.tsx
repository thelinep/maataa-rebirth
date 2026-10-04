import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type WebAppGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function WebAppGenerator(props:WebAppGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.WEB_APP_GENERATOR" name="Web App Generator" {...props} />; }
