import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type CardGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function CardGenerator(props:CardGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.CARD_GENERATOR" name="Card Generator" {...props} />; }
