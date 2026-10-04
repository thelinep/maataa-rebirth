import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Master list plus detail. */
export function MasterDetailLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="MasterDetail" template="master-detail" {...props} />;
}
