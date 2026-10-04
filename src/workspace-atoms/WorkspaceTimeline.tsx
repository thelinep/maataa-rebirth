import React from "react";
import { cx } from "../utils";

export type WorkspaceTimelineProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceTimeline({ className, ...props }: WorkspaceTimelineProps) {
  return <div data-workspace-region="workspacetimeline" className={cx("m-workspace-atom", "m-workspace-workspacetimeline", className)} {...props} />;
}
