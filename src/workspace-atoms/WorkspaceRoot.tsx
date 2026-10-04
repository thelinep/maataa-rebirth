import React from "react";
import { cx } from "../utils";

export type WorkspaceRootProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceRoot({ className, ...props }: WorkspaceRootProps) {
  return <div data-workspace-region="workspaceroot" className={cx("m-workspace-atom", "m-workspace-workspaceroot", className)} {...props} />;
}
