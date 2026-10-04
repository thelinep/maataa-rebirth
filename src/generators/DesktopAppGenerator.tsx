import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type DesktopAppGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function DesktopAppGenerator(props:DesktopAppGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.DESKTOP_APP_GENERATOR" name="Desktop App Generator" {...props} />; }
