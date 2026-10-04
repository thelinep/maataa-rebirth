import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SettingsPageGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SettingsPageGenerator(props:SettingsPageGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SETTINGS_PAGE_GENERATOR" name="Settings Page Generator" {...props} />; }
