import React from "react";
import { cx } from "../utils";

export type WorkspaceCommandBarProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceCommandBar({ className, ...props }: WorkspaceCommandBarProps) {
  return <div data-workspace-region="workspacecommandbar" className={cx("m-workspace-atom", "m-workspace-workspacecommandbar", className)} {...props} />;
}
