import React from "react";
import { cx } from "../utils";
export type DeviceOrientationBadgeProps = React.HTMLAttributes<HTMLSpanElement>;
export function DeviceOrientationBadge({ className, ...props }: DeviceOrientationBadgeProps) {
  return <span data-device-region="orientation-badge" className={cx("m-device-atom", "m-device-orientation-badge", className)} {...props} />;
}
