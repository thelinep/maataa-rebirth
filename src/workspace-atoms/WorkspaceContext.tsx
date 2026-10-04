import React from "react";
import { cx } from "../utils";

export type WorkspaceContextProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceContext({ className, ...props }: WorkspaceContextProps) {
  return <div data-workspace-region="workspacecontext" className={cx("m-workspace-atom", "m-workspace-workspacecontext", className)} {...props} />;
}
