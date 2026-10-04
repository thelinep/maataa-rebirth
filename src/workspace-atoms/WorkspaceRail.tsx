import React from "react";
import { cx } from "../utils";

export type WorkspaceRailProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceRail({ className, ...props }: WorkspaceRailProps) {
  return <div data-workspace-region="workspacerail" className={cx("m-workspace-atom", "m-workspace-workspacerail", className)} {...props} />;
}
