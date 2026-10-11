import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/**
 * Stepper-driven form.
 * @deprecated Same template as `WizardLayout`; use `WizardLayout` instead. Kept for compatibility (decision 2026-10-12).
 */
export function StepperFormLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="StepperForm" template="wizard" {...props} />;
}
