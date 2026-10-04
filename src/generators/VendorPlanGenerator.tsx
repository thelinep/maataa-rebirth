import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type VendorPlanGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function VendorPlanGenerator(props:VendorPlanGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.VENDOR_PLAN_GENERATOR" name="Vendor Plan Generator" {...props} />; }
