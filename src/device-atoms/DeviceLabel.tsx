import React from "react";
import { cx } from "../utils";
export type DeviceLabelProps = React.HTMLAttributes<HTMLSpanElement>;
export function DeviceLabel({ className, ...props }: DeviceLabelProps) {
  return <span data-device-region="label" className={cx("m-device-atom", "m-device-label", className)} {...props} />;
}
