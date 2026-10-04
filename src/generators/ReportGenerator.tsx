import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ReportGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ReportGenerator(props:ReportGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.REPORT_GENERATOR" name="Report Generator" {...props} />; }
