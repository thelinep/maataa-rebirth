import React from "react";
import { cx } from "../utils";

export type WorkspacePaletteProps = React.HTMLAttributes<HTMLElement>;

export function WorkspacePalette({ className, ...props }: WorkspacePaletteProps) {
  return <div data-workspace-region="workspacepalette" className={cx("m-workspace-atom", "m-workspace-workspacepalette", className)} {...props} />;
}
