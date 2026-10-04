import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type DashboardGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function DashboardGenerator(props:DashboardGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.DASHBOARD_GENERATOR" name="Dashboard Generator" {...props} />; }
