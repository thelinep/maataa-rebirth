import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type AccessibilityTestGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function AccessibilityTestGenerator(props:AccessibilityTestGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.ACCESSIBILITY_TEST_GENERATOR" name="Accessibility Test Generator" {...props} />; }
