import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type SponsorshipPackageGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function SponsorshipPackageGenerator(props:SponsorshipPackageGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.SPONSORSHIP_PACKAGE_GENERATOR" name="Sponsorship Package Generator" {...props} />; }
