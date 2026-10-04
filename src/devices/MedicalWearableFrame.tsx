import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type MedicalWearableFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function MedicalWearableFrame({viewportWidth=320, viewportHeight=320, ...props}:MedicalWearableFrameProps) { return <DeviceSurface deviceId="DEVICE.WEARABLES.MEDICAL_WEARABLE" name="Medical Wearable" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
