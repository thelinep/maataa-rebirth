import React from "react";
import { cx } from "../utils";
export type DeviceControlsProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceControls({ className, ...props }: DeviceControlsProps) {
  return <div data-device-region="controls" className={cx("m-device-atom", "m-device-controls", className)} {...props} />;
}
