import React from "react";
import { cx } from "../utils";
export type DeviceCameraProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceCamera({ className, ...props }: DeviceCameraProps) {
  return <div data-device-region="camera" className={cx("m-device-atom", "m-device-camera", className)} {...props} />;
}
