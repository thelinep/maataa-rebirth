import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type PatientKioskFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function PatientKioskFrame({viewportWidth=1600, viewportHeight=900, ...props}:PatientKioskFrameProps) { return <DeviceSurface deviceId="DEVICE.MEDICAL.PATIENT_KIOSK" name="Patient Kiosk" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
