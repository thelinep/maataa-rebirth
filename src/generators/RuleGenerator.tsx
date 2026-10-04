import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type RuleGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function RuleGenerator(props:RuleGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.RULE_GENERATOR" name="Rule Generator" {...props} />; }
