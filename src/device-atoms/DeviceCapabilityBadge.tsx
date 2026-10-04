import React from "react";
import { cx } from "../utils";
export type DeviceCapabilityBadgeProps = React.HTMLAttributes<HTMLSpanElement>;
export function DeviceCapabilityBadge({ className, ...props }: DeviceCapabilityBadgeProps) {
  return <span data-device-region="capability-badge" className={cx("m-device-atom", "m-device-capability-badge", className)} {...props} />;
}
