import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PageState } from "../../types/redux";
import type { PageTypeId } from "../../types/identifiers";
export const initialPageState:PageState={activePageTypeId:"PAGE.DESIGN_SYSTEM.DESIGN_SYSTEM",recentPageTypeIds:["PAGE.DESIGN_SYSTEM.DESIGN_SYSTEM"],pageState:{}};
const slice=createSlice({name:"page",initialState:initialPageState,reducers:{activatePage:(s,a:PayloadAction<PageTypeId>)=>{s.activePageTypeId=a.payload;s.recentPageTypeIds=[a.payload,...s.recentPageTypeIds.filter(x=>x!==a.payload)].slice(0,20)},setPageState:(s,a:PayloadAction<{pageTypeId:PageTypeId;state:Record<string,unknown>}>)=>{s.pageState[a.payload.pageTypeId]={...(s.pageState[a.payload.pageTypeId]??{}),...a.payload.state}},resetPageState:(s,a:PayloadAction<PageTypeId>)=>{delete s.pageState[a.payload]}}});
export const pageActions=slice.actions; export const pageReducer=slice.reducer;
