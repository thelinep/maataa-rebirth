import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type InteractiveWhiteboardFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function InteractiveWhiteboardFrame({viewportWidth=1366, viewportHeight=768, ...props}:InteractiveWhiteboardFrameProps) { return <DeviceSurface deviceId="DEVICE.EDUCATION.INTERACTIVE_WHITEBOARD" name="Interactive Whiteboard" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
