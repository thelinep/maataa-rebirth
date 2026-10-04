import React from "react";
import { cx } from "../utils";

export type WorkspacePanelProps = React.HTMLAttributes<HTMLElement>;

export function WorkspacePanel({ className, ...props }: WorkspacePanelProps) {
  return <div data-workspace-region="workspacepanel" className={cx("m-workspace-atom", "m-workspace-workspacepanel", className)} {...props} />;
}
