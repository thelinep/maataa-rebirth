import React from "react";
import { cx } from "../utils";

export type WorkspaceStatusBarProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceStatusBar({ className, ...props }: WorkspaceStatusBarProps) {
  return <div data-workspace-region="workspacestatusbar" className={cx("m-workspace-atom", "m-workspace-workspacestatusbar", className)} {...props} />;
}
