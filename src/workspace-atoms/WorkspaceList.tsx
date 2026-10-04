import React from "react";
import { cx } from "../utils";

export type WorkspaceListProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceList({ className, ...props }: WorkspaceListProps) {
  return <div data-workspace-region="workspacelist" className={cx("m-workspace-atom", "m-workspace-workspacelist", className)} {...props} />;
}
