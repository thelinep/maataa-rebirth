import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEMO_SCENARIOS } from "../../demo/scenarios";
export interface DemoState { enabled:boolean; activeScenarioId:string; deterministic:boolean; simulatedLatencyMs:number; now:string; }
export const initialDemoState:DemoState={enabled:true,activeScenarioId:DEMO_SCENARIOS[0].id,deterministic:true,simulatedLatencyMs:250,now:"2026-10-04T08:30:00+05:30"};
const slice=createSlice({name:"demo",initialState:initialDemoState,reducers:{setDemoEnabled:(s,a:PayloadAction<boolean>)=>{s.enabled=a.payload},activateScenario:(s,a:PayloadAction<string>)=>{if(DEMO_SCENARIOS.some(x=>x.id===a.payload))s.activeScenarioId=a.payload},setSimulatedLatency:(s,a:PayloadAction<number>)=>{s.simulatedLatencyMs=Math.max(0,Math.min(5000,a.payload))},setDemoNow:(s,a:PayloadAction<string>)=>{s.now=a.payload},resetDemo:()=>initialDemoState}});
export const demoActions=slice.actions; export const demoReducer=slice.reducer;
