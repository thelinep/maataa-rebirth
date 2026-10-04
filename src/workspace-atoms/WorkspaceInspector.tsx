import React from "react";
import { cx } from "../utils";

export type WorkspaceInspectorProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceInspector({ className, ...props }: WorkspaceInspectorProps) {
  return <div data-workspace-region="workspaceinspector" className={cx("m-workspace-atom", "m-workspace-workspaceinspector", className)} {...props} />;
}
