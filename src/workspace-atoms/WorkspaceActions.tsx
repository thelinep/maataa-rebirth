import React from "react";
import { cx } from "../utils";

export type WorkspaceActionsProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceActions({ className, ...props }: WorkspaceActionsProps) {
  return <div data-workspace-region="workspaceactions" className={cx("m-workspace-atom", "m-workspace-workspaceactions", className)} {...props} />;
}
