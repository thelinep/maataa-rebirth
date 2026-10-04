import React from "react";
import { cx } from "../utils";
export type DeviceKeyboardProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceKeyboard({ className, ...props }: DeviceKeyboardProps) {
  return <div data-device-region="keyboard" className={cx("m-device-atom", "m-device-keyboard", className)} {...props} />;
}
