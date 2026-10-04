import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DemoNotification } from "../../types/demo";
import { DEMO_NOTIFICATIONS } from "../../static-data/demoNotifications";
export interface NotificationState { items: DemoNotification[]; panelOpen:boolean; }
export const initialNotificationState:NotificationState={items:[...DEMO_NOTIFICATIONS],panelOpen:false};
const slice=createSlice({name:"notification",initialState:initialNotificationState,reducers:{addNotification:(s,a:PayloadAction<DemoNotification>)=>{s.items.unshift(a.payload)},markRead:(s,a:PayloadAction<string>)=>{const n=s.items.find(x=>x.id===a.payload);if(n)n.read=true},markAllRead:s=>{s.items.forEach(n=>n.read=true)},dismiss:(s,a:PayloadAction<string>)=>{s.items=s.items.filter(x=>x.id!==a.payload)},setNotificationPanel:(s,a:PayloadAction<boolean>)=>{s.panelOpen=a.payload}}});
export const notificationActions=slice.actions; export const notificationReducer=slice.reducer;
