import { DEVICE_REGISTRY } from "./deviceRegistry";
import { VIEWPORT_REGISTRY } from "./viewportRegistry";
import { DEVICE_CAPABILITY_REGISTRY } from "./deviceCapabilityRegistry";
export function resolveDeviceRuntime(deviceId:string,orientation?:"portrait"|"landscape") {
  const device=DEVICE_REGISTRY.find(item=>item.id===deviceId);
  if(!device)return undefined;
  const viewport=VIEWPORT_REGISTRY.find(item=>item.id===device.defaultViewport);
  if(!viewport)return undefined;
  const direction=orientation??device.defaultOrientation;
  const width=direction==="portrait"?Math.min(viewport.width,viewport.height):Math.max(viewport.width,viewport.height);
  const height=direction==="portrait"?Math.max(viewport.width,viewport.height):Math.min(viewport.width,viewport.height);
  return {device,viewport,width,height,orientation:direction};
}
export type DeviceCapabilityStatus="SUPPORTED"|"LIMITED"|"UNVERIFIED"|"UNSUPPORTED";
export function evaluateDeviceCapabilities(deviceId:string,required:readonly string[]=[]) {
  const device=DEVICE_REGISTRY.find(item=>item.id===deviceId);
  const known=new Set(DEVICE_CAPABILITY_REGISTRY.map(item=>item.id));
  const supported=required.filter(id=>device?.capabilities.includes(id));
  const missing=required.filter(id=>known.has(id)&&!device?.capabilities.includes(id));
  const unknown=required.filter(id=>!known.has(id));
  // Positive registry metadata is not evidence that an absent capability is forbidden.
  const status:DeviceCapabilityStatus=!device||unknown.length?"UNVERIFIED":missing.length?"LIMITED":"SUPPORTED";
  return {status,supported,missing,unknown,evidence:"device-registry-declaration" as const};
}
