import React from "react";
import { cx } from "../utils";

export type WorkspaceHeaderProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceHeader({ className, ...props }: WorkspaceHeaderProps) {
  return <div data-workspace-region="workspaceheader" className={cx("m-workspace-atom", "m-workspace-workspaceheader", className)} {...props} />;
}
