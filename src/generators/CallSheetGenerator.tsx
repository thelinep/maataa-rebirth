import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type CallSheetGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function CallSheetGenerator(props:CallSheetGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.CALL_SHEET_GENERATOR" name="Call Sheet Generator" {...props} />; }
