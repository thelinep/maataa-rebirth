import React from "react";
import { cx } from "../utils";

export type WorkspaceToolbarProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceToolbar({ className, ...props }: WorkspaceToolbarProps) {
  return <div data-workspace-region="workspacetoolbar" className={cx("m-workspace-atom", "m-workspace-workspacetoolbar", className)} {...props} />;
}
