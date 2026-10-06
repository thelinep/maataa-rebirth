import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DeviceState } from "../../types/redux";
import type { DeviceTypeId } from "../../types/identifiers";
import type { DeviceOrientation } from "../../types/device";
import { DEVICE_REGISTRY } from "../../registries/deviceRegistry";
import { INPUT_MODALITY_REGISTRY } from "../../registries/inputModalityRegistry";
import { SAFE_AREA_REGISTRY } from "../../registries/safeAreaRegistry";
import { VIEWPORT_REGISTRY } from "../../registries/viewportRegistry";

export const initialDeviceState: DeviceState = {
  status: "success",
  deviceId: "DEVICE.DESKTOP_COMPUTING.DESKTOP",
  viewportId: "VIEWPORT.DESKTOP",
  orientation: "landscape",
  inputModalityId: "INPUT.MOUSE",
  safeAreaId: "SAFE_AREA.NONE",
  scale: 1,
  showFrame: true,
  showSafeArea: false,
  showHinge: false,
};

const slice = createSlice({
  name: "device",
  initialState: initialDeviceState,
  reducers: {
    setDevice: (state, action: PayloadAction<DeviceTypeId>) => {
      const device = DEVICE_REGISTRY.find((entry) => entry.id === action.payload);
      if (!device) return;
      state.deviceId = device.id;
      state.viewportId = device.defaultViewport;
      state.orientation = device.defaultOrientation as DeviceOrientation;
      state.inputModalityId = device.inputModalities[0] ?? state.inputModalityId;
      state.safeAreaId = device.safeArea;
      if (device.safeArea === "SAFE_AREA.NONE") state.showSafeArea = false;
      if (!device.capabilities.includes("CAPABILITY.DEVICE.HINGE")) state.showHinge = false;
    },
    setViewport: (state, action: PayloadAction<string>) => {
      if (VIEWPORT_REGISTRY.some((entry) => entry.id === action.payload)) state.viewportId = action.payload;
    },
    setOrientation: (state, action: PayloadAction<DeviceOrientation>) => {
      state.orientation = action.payload;
    },
    setInputModality: (state, action: PayloadAction<string>) => {
      const device = DEVICE_REGISTRY.find((entry) => entry.id === state.deviceId);
      const modalityExists = INPUT_MODALITY_REGISTRY.some((entry) => entry.id === action.payload);
      if (device?.inputModalities.includes(action.payload) && modalityExists) state.inputModalityId = action.payload;
    },
    setSafeArea: (state, action: PayloadAction<string>) => {
      if (!SAFE_AREA_REGISTRY.some((entry) => entry.id === action.payload)) return;
      state.safeAreaId = action.payload;
      if (action.payload === "SAFE_AREA.NONE") state.showSafeArea = false;
    },
    setScale: (state, action: PayloadAction<number>) => {
      if (Number.isFinite(action.payload)) state.scale = Math.max(0.25, Math.min(2, action.payload));
    },
    setFrameVisible: (state, action: PayloadAction<boolean>) => {
      state.showFrame = action.payload;
    },
    setSafeAreaVisible: (state, action: PayloadAction<boolean>) => {
      state.showSafeArea = action.payload && state.safeAreaId !== "SAFE_AREA.NONE";
    },
    setHingeVisible: (state, action: PayloadAction<boolean>) => {
      const device = DEVICE_REGISTRY.find((entry) => entry.id === state.deviceId);
      const hasHinge = device?.capabilities.includes("CAPABILITY.DEVICE.HINGE") ?? false;
      state.showHinge = action.payload && hasHinge;
    },
  },
});

export const deviceActions = slice.actions;
export const deviceReducer = slice.reducer;
