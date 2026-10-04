import React from "react";
import { LayoutPreset, type LayoutPresetProps } from "../internal/layoutPreset";

/** Mobile master/detail navigation. */
export function MobileMasterDetailLayout(props: LayoutPresetProps) {
  return <LayoutPreset preset="MobileMasterDetail" template="mobile-master-detail" {...props} />;
}
