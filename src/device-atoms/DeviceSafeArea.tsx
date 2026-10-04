import React from "react";
import { cx } from "../utils";
export type DeviceSafeAreaProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceSafeArea({ className, ...props }: DeviceSafeAreaProps) {
  return <div data-device-region="safe-area" className={cx("m-device-atom", "m-device-safe-area", className)} {...props} />;
}
