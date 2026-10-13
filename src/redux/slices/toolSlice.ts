import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ToolState } from "../../types/redux";
import type { ToolId } from "../../types/identifiers";
export const initialToolState:ToolState={selectedToolId:"TOOL.COMPONENT_EXPLORER",favorites:[],executions:[]};
const slice=createSlice({name:"tool",initialState:initialToolState,reducers:{selectTool:(s,a:PayloadAction<ToolId|null>)=>{s.selectedToolId=a.payload},toggleToolFavorite:(s,a:PayloadAction<ToolId>)=>{const i=s.favorites.indexOf(a.payload);if(i>=0)s.favorites.splice(i,1);else s.favorites.push(a.payload)},startToolExecution:(s,a:PayloadAction<{id:string;toolId:ToolId;createdAt:string}>)=>{s.executions.unshift({...a.payload,status:"loading"})},completeToolExecution:(s,a:PayloadAction<{id:string;result:unknown;ok:boolean}>)=>{const e=s.executions.find(x=>x.id===a.payload.id);if(e){e.status=a.payload.ok?"success":"error";e.result=a.payload.result}}}});
export const toolActions=slice.actions; export const toolReducer=slice.reducer;
