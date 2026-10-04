import React from "react";
import { cx } from "../utils";
export type DeviceScreenProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceScreen({ className, ...props }: DeviceScreenProps) {
  return <div data-device-region="screen" className={cx("m-device-atom", "m-device-screen", className)} {...props} />;
}
