import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type DashboardAppGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function DashboardAppGenerator(props:DashboardAppGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.DASHBOARD_APP_GENERATOR" name="Dashboard App Generator" {...props} />; }
