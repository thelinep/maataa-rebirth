import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type DocumentIndexGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function DocumentIndexGenerator(props:DocumentIndexGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.DOCUMENT_INDEX_GENERATOR" name="Document Index Generator" {...props} />; }
