import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type CatalogGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function CatalogGenerator(props:CatalogGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.CATALOG_GENERATOR" name="Catalog Generator" {...props} />; }
