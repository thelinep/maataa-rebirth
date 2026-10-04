import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Stepper-driven form. */
export function StepperFormLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="StepperForm" template="wizard" {...props} />;
}
