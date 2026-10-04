import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SmartSpeakerDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SmartSpeakerDisplayFrame({viewportWidth=1280, viewportHeight=720, ...props}:SmartSpeakerDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.AUDIO_DEVICES.SMART_SPEAKER_DISPLAY" name="Smart Speaker Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
