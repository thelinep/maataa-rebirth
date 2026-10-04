import React from "react";
import { cx } from "../utils";
export type DeviceContentProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceContent({ className, ...props }: DeviceContentProps) {
  return <div data-device-region="content" className={cx("m-device-atom", "m-device-content", className)} {...props} />;
}
