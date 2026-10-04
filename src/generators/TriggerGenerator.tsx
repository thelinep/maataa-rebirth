import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type TriggerGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function TriggerGenerator(props:TriggerGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.TRIGGER_GENERATOR" name="Trigger Generator" {...props} />; }
