import React from "react";
import { cx } from "../utils";

export type WorkspaceCanvasProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceCanvas({ className, ...props }: WorkspaceCanvasProps) {
  return <div data-workspace-region="workspacecanvas" className={cx("m-workspace-atom", "m-workspace-workspacecanvas", className)} {...props} />;
}
