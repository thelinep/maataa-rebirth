import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Sequential step workflow. */
export function WizardLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="Wizard" template="wizard" {...props} />;
}
