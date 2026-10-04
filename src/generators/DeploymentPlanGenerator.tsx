import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type DeploymentPlanGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function DeploymentPlanGenerator(props:DeploymentPlanGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.DEPLOYMENT_PLAN_GENERATOR" name="Deployment Plan Generator" {...props} />; }
