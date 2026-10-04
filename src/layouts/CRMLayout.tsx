import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Records, detail, activity. */
export function CRMLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="CRM" template="crm" {...props} />;
}
