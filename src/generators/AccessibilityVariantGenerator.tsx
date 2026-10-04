import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type AccessibilityVariantGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function AccessibilityVariantGenerator(props:AccessibilityVariantGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ACCESSIBILITY_VARIANT_GENERATOR" name="Accessibility Variant Generator" {...props} />; }
