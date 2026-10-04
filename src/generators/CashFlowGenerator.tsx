import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type CashFlowGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function CashFlowGenerator(props:CashFlowGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.CASH_FLOW_GENERATOR" name="Cash-Flow Generator" {...props} />; }
