import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RegistryState } from "../../types/redux";
import type { RegistryId } from "../../types/identifiers";
export const initialRegistryState:RegistryState={activeRegistryId:"REGISTRY.UI_STRUCTURE.COMPONENT",query:"",group:null,lifecycle:null,selectedId:null};
const slice=createSlice({name:"registry",initialState:initialRegistryState,reducers:{activateRegistry:(s,a:PayloadAction<RegistryId>)=>{s.activeRegistryId=a.payload;s.selectedId=null},setRegistryQuery:(s,a:PayloadAction<string>)=>{s.query=a.payload},setRegistryGroup:(s,a:PayloadAction<string|null>)=>{s.group=a.payload},setLifecycleFilter:(s,a:PayloadAction<string|null>)=>{s.lifecycle=a.payload},selectRegistryItem:(s,a:PayloadAction<string|null>)=>{s.selectedId=a.payload},clearRegistryFilters:s=>{s.query="";s.group=null;s.lifecycle=null}}});
export const registryActions=slice.actions; export const registryReducer=slice.reducer;
