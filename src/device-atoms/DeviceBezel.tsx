import React from "react";
import { cx } from "../utils";
export type DeviceBezelProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceBezel({ className, ...props }: DeviceBezelProps) {
  return <div data-device-region="bezel" className={cx("m-device-atom", "m-device-bezel", className)} {...props} />;
}
