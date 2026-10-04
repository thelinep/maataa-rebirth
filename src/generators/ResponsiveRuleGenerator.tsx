import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ResponsiveRuleGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ResponsiveRuleGenerator(props:ResponsiveRuleGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.RESPONSIVE_RULE_GENERATOR" name="Responsive Rule Generator" {...props} />; }
