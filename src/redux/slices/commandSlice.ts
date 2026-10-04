import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface CommandState { query:string; recent:string[]; favorites:string[]; scope:string|null; }
export const initialCommandState:CommandState={query:"",recent:[],favorites:["command.open-registry","command.switch-workspace"],scope:null};
const slice=createSlice({name:"command",initialState:initialCommandState,reducers:{setCommandQuery:(s,a:PayloadAction<string>)=>{s.query=a.payload},runCommand:(s,a:PayloadAction<string>)=>{s.recent=[a.payload,...s.recent.filter(x=>x!==a.payload)].slice(0,20);s.query=""},toggleCommandFavorite:(s,a:PayloadAction<string>)=>{const i=s.favorites.indexOf(a.payload);if(i>=0)s.favorites.splice(i,1);else s.favorites.push(a.payload)},setCommandScope:(s,a:PayloadAction<string|null>)=>{s.scope=a.payload}}});
export const commandActions=slice.actions; export const commandReducer=slice.reducer;
