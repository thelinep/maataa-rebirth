import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DeviceState } from "../../types/redux";
import type { DeviceTypeId } from "../../types/identifiers";
import type { DeviceOrientation } from "../../types/device";
export const initialDeviceState:DeviceState={status:"success",deviceId:"DEVICE.DESKTOP_COMPUTING.DESKTOP",viewportId:"VIEWPORT.DESKTOP",orientation:"landscape",inputModalityId:"INPUT.MOUSE",safeAreaId:"SAFE_AREA.NONE",scale:1,showFrame:true,showSafeArea:false,showHinge:false};
const slice=createSlice({name:"device",initialState:initialDeviceState,reducers:{setDevice:(s,a:PayloadAction<DeviceTypeId>)=>{s.deviceId=a.payload},setViewport:(s,a:PayloadAction<string>)=>{s.viewportId=a.payload},setOrientation:(s,a:PayloadAction<DeviceOrientation>)=>{s.orientation=a.payload},setInputModality:(s,a:PayloadAction<string>)=>{s.inputModalityId=a.payload},setScale:(s,a:PayloadAction<number>)=>{s.scale=Math.max(.25,Math.min(2,a.payload))},setFrameVisible:(s,a:PayloadAction<boolean>)=>{s.showFrame=a.payload},setSafeAreaVisible:(s,a:PayloadAction<boolean>)=>{s.showSafeArea=a.payload},setHingeVisible:(s,a:PayloadAction<boolean>)=>{s.showHinge=a.payload}}});
export const deviceActions=slice.actions; export const deviceReducer=slice.reducer;
