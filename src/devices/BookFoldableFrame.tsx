import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type BookFoldableFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function BookFoldableFrame({viewportWidth=360, viewportHeight=800, ...props}:BookFoldableFrameProps) { return <DeviceSurface deviceId="DEVICE.FOLDABLES.BOOK_FOLDABLE" name="Book Foldable" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
