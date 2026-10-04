import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GeneratorState } from "../../types/redux";
import type { GeneratorId } from "../../types/identifiers";
export const initialGeneratorState:GeneratorState={selectedGeneratorId:"GENERATOR.COMPONENT_GENERATOR" as GeneratorId,drafts:{},runs:[]};
const slice=createSlice({name:"generator",initialState:initialGeneratorState,reducers:{selectGenerator:(s,a:PayloadAction<GeneratorId|null>)=>{s.selectedGeneratorId=a.payload},saveDraft:(s,a:PayloadAction<{generatorId:GeneratorId;values:Record<string,unknown>}>)=>{s.drafts[a.payload.generatorId]=a.payload.values},startRun:(s,a:PayloadAction<{id:string;generatorId:GeneratorId;createdAt:string}>)=>{s.runs.unshift({...a.payload,status:"loading"})},completeRun:(s,a:PayloadAction<{id:string;ok:boolean}>)=>{const r=s.runs.find(x=>x.id===a.payload.id);if(r)r.status=a.payload.ok?"success":"error"}}});
export const generatorActions=slice.actions; export const generatorReducer=slice.reducer;
