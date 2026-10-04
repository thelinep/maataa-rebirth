import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type OrderTemplateGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function OrderTemplateGenerator(props:OrderTemplateGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ORDER_TEMPLATE_GENERATOR" name="Order Template Generator" {...props} />; }
