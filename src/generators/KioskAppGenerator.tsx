import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type KioskAppGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function KioskAppGenerator(props:KioskAppGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.KIOSK_APP_GENERATOR" name="Kiosk App Generator" {...props} />; }
