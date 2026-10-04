import React from "react";
import { cx } from "../utils";
export function OverlayPanel({className,...p}:React.HTMLAttributes<HTMLDivElement>){return <div className={cx("m-dialog m-ui",className)} {...p}/>;}
