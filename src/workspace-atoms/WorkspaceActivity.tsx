import React from "react";
import { cx } from "../utils";

export type WorkspaceActivityProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceActivity({ className, ...props }: WorkspaceActivityProps) {
  return <div data-workspace-region="workspaceactivity" className={cx("m-workspace-atom", "m-workspace-workspaceactivity", className)} {...props} />;
}
