import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LayoutState } from "../../types/redux";
import type { LayoutTypeId } from "../../types/identifiers";
export const initialLayoutState:LayoutState={activeLayoutTypeId:"LAYOUT.WORKSPACE.WORKBENCH",regionVisibility:{header:true,sidebar:true,main:true,inspector:true,statusbar:true},regionSizes:{sidebar:280,inspector:360,header:56,statusbar:28}};
const slice=createSlice({name:"layout",initialState:initialLayoutState,reducers:{activateLayout:(s,a:PayloadAction<LayoutTypeId>)=>{s.activeLayoutTypeId=a.payload},setRegionVisible:(s,a:PayloadAction<{id:string;visible:boolean}>)=>{s.regionVisibility[a.payload.id]=a.payload.visible},setRegionSize:(s,a:PayloadAction<{id:string;size:number}>)=>{s.regionSizes[a.payload.id]=a.payload.size},resetRegions:s=>{s.regionVisibility=initialLayoutState.regionVisibility;s.regionSizes=initialLayoutState.regionSizes}}});
export const layoutActions=slice.actions; export const layoutReducer=slice.reducer;
