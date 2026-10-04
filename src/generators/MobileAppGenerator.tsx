import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type MobileAppGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function MobileAppGenerator(props:MobileAppGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MOBILE_APP_GENERATOR" name="Mobile App Generator" {...props} />; }
