import React from "react";
import { cx } from "../utils";
export type DeviceNotchProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceNotch({ className, ...props }: DeviceNotchProps) {
  return <div data-device-region="notch" className={cx("m-device-atom", "m-device-notch", className)} {...props} />;
}
