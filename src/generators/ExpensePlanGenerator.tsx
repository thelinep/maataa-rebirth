import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ExpensePlanGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ExpensePlanGenerator(props:ExpensePlanGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.EXPENSE_PLAN_GENERATOR" name="Expense Plan Generator" {...props} />; }
