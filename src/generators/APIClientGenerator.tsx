import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type APIClientGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function APIClientGenerator(props:APIClientGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.API_CLIENT_GENERATOR" name="API Client Generator" {...props} />; }
