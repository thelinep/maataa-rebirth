import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ClassroomDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ClassroomDisplayFrame({viewportWidth=1366, viewportHeight=768, ...props}:ClassroomDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.EDUCATION.CLASSROOM_DISPLAY" name="Classroom Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
