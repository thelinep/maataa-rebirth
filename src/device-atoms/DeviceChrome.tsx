import React from "react";
import { cx } from "../utils";
export type DeviceChromeProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceChrome({ className, ...props }: DeviceChromeProps) {
  return <div data-device-region="chrome" className={cx("m-device-atom", "m-device-chrome", className)} {...props} />;
}
