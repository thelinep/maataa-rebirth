import React from "react";
import { cx } from "../utils";
export type DeviceTrackpadProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceTrackpad({ className, ...props }: DeviceTrackpadProps) {
  return <div data-device-region="trackpad" className={cx("m-device-atom", "m-device-trackpad", className)} {...props} />;
}
