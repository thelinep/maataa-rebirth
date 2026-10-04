import React from "react";
import { cx } from "../utils";

export type WorkspaceFiltersProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceFilters({ className, ...props }: WorkspaceFiltersProps) {
  return <div data-workspace-region="workspacefilters" className={cx("m-workspace-atom", "m-workspace-workspacefilters", className)} {...props} />;
}
