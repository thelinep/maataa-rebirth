import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ArticleGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ArticleGenerator(props:ArticleGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ARTICLE_GENERATOR" name="Article Generator" {...props} />; }
