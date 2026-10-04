import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ProposalGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ProposalGenerator(props:ProposalGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.PROPOSAL_GENERATOR" name="Proposal Generator" {...props} />; }
