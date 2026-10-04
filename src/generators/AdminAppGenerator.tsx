import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type AdminAppGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function AdminAppGenerator(props:AdminAppGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ADMIN_APP_GENERATOR" name="Admin App Generator" {...props} />; }
