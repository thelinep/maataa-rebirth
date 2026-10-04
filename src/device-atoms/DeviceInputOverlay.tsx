import React from "react";
import { cx } from "../utils";
export type DeviceInputOverlayProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceInputOverlay({ className, ...props }: DeviceInputOverlayProps) {
  return <div data-device-region="input-overlay" className={cx("m-device-atom", "m-device-input-overlay", className)} {...props} />;
}
