import React from "react";
import { cx } from "../utils";
export function OverlayBackdrop({className,...p}:React.HTMLAttributes<HTMLDivElement>){return <div className={cx("m-modal-backdrop",className)} {...p}/>;}
