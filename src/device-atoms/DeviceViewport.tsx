import React from "react";
import { cx } from "../utils";
export type DeviceViewportProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceViewport({ className, ...props }: DeviceViewportProps) {
  return <div data-device-region="viewport" className={cx("m-device-atom", "m-device-viewport", className)} {...props} />;
}
