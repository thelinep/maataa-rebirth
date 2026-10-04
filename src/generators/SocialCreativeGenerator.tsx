import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SocialCreativeGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SocialCreativeGenerator(props:SocialCreativeGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SOCIAL_CREATIVE_GENERATOR" name="Social Creative Generator" {...props} />; }
