import React from "react";
import { cx } from "../utils";

export type WorkspaceNavProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceNav({ className, ...props }: WorkspaceNavProps) {
  return <div data-workspace-region="workspacenav" className={cx("m-workspace-atom", "m-workspace-workspacenav", className)} {...props} />;
}
