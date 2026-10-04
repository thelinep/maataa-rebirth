import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type AppShellGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function AppShellGenerator(props:AppShellGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.APP_SHELL_GENERATOR" name="App Shell Generator" {...props} />; }
