import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type RollbackPlanGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function RollbackPlanGenerator(props:RollbackPlanGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ROLLBACK_PLAN_GENERATOR" name="Rollback Plan Generator" {...props} />; }
