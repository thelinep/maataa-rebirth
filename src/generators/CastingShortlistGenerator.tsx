import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type CastingShortlistGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function CastingShortlistGenerator(props:CastingShortlistGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.CASTING_SHORTLIST_GENERATOR" name="Casting Shortlist Generator" {...props} />; }
