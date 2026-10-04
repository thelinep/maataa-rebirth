import React from "react";
import { cx } from "../utils";
export type DeviceHingeProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceHinge({ className, ...props }: DeviceHingeProps) {
  return <div data-device-region="hinge" className={cx("m-device-atom", "m-device-hinge", className)} {...props} />;
}
