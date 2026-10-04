import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type WebhookGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function WebhookGenerator(props:WebhookGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.WEBHOOK_GENERATOR" name="Webhook Generator" {...props} />; }
