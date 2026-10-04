import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type BudgetGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function BudgetGenerator(props:BudgetGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.BUDGET_GENERATOR" name="Budget Generator" {...props} />; }
