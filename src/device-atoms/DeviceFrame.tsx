import React from "react";
import { cx } from "../utils";
export type DeviceFrameProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceFrame({ className, ...props }: DeviceFrameProps) {
  return <div data-device-region="frame" className={cx("m-device-atom", "m-device-frame", className)} {...props} />;
}
