import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type PortalGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function PortalGenerator(props:PortalGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PORTAL_GENERATOR" name="Portal Generator" {...props} />; }
