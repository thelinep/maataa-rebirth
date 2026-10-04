import React from "react";
import { cx } from "../utils";
export type DeviceSpeakerProps = React.HTMLAttributes<HTMLDivElement>;
export function DeviceSpeaker({ className, ...props }: DeviceSpeakerProps) {
  return <div data-device-region="speaker" className={cx("m-device-atom", "m-device-speaker", className)} {...props} />;
}
