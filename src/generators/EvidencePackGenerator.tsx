import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type EvidencePackGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function EvidencePackGenerator(props:EvidencePackGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.EVIDENCE_PACK_GENERATOR" name="Evidence Pack Generator" {...props} />; }
