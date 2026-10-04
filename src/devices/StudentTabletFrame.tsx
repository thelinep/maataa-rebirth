import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type StudentTabletFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function StudentTabletFrame({viewportWidth=1366, viewportHeight=768, ...props}:StudentTabletFrameProps) { return <DeviceSurface deviceId="DEVICE.EDUCATION.STUDENT_TABLET" name="Student Tablet" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
