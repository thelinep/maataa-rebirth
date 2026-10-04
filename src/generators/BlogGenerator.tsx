import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type BlogGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function BlogGenerator(props:BlogGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.BLOG_GENERATOR" name="Blog Generator" {...props} />; }
