import React from "react";
import { cx } from "../utils";
export type DeviceStandProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceStand({ className, ...props }: DeviceStandProps) {
  return <div data-device-region="stand" className={cx("m-device-atom", "m-device-stand", className)} {...props} />;
}
