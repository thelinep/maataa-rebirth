import type { DeviceTypeId } from "./identifiers";
export type DeviceOrientation = "portrait" | "landscape" | "auto" | "folded" | "half-open" | "flat";
export interface DeviceSimulationState { deviceId: DeviceTypeId; viewportId: string; orientation: DeviceOrientation; inputModalityId: string; safeAreaId: string; scale: number; showFrame: boolean; showSafeArea: boolean; showHinge: boolean; }
