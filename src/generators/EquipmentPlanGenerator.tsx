import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type EquipmentPlanGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function EquipmentPlanGenerator(props:EquipmentPlanGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.EQUIPMENT_PLAN_GENERATOR" name="Equipment Plan Generator" {...props} />; }
