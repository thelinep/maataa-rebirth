import React from "react";
import { cx } from "../utils";
export type DeviceIndicatorProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceIndicator({ className, ...props }: DeviceIndicatorProps) {
  return <div data-device-region="indicator" className={cx("m-device-atom", "m-device-indicator", className)} {...props} />;
}
