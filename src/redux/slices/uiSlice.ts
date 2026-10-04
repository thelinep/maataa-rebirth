import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UIState } from "../../types/redux";
import type { ThemeMode, Density } from "../../types/common";
export const initialUIState:UIState={theme:"light",density:"default",locale:"en-IN",sidebarOpen:true,inspectorOpen:true,commandPaletteOpen:false,reducedMotion:false,fullscreen:false};
const slice=createSlice({name:"ui",initialState:initialUIState,reducers:{setTheme:(s,a:PayloadAction<ThemeMode>)=>{s.theme=a.payload},setDensity:(s,a:PayloadAction<Density>)=>{s.density=a.payload},setLocale:(s,a:PayloadAction<string>)=>{s.locale=a.payload},toggleSidebar:s=>{s.sidebarOpen=!s.sidebarOpen},toggleInspector:s=>{s.inspectorOpen=!s.inspectorOpen},setCommandPalette:(s,a:PayloadAction<boolean>)=>{s.commandPaletteOpen=a.payload},setReducedMotion:(s,a:PayloadAction<boolean>)=>{s.reducedMotion=a.payload},setFullscreen:(s,a:PayloadAction<boolean>)=>{s.fullscreen=a.payload}}});
export const uiActions=slice.actions; export const uiReducer=slice.reducer;
