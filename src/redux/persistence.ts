import type { Middleware } from "@reduxjs/toolkit";
import { isCompositionData } from "../composer/sceneData";
import { parseCompositionInput } from "../composer/spec";
import type { RootState } from "./store";
export const MAATAA_PERSISTENCE_KEY="@maataa/ui-demo-state/v1";
export type PersistedMaataaState=Pick<RootState,"ui"|"workspace"|"page"|"layout"|"device"|"builder">;
function defaultStorage():Storage|undefined{try{return typeof window!=="undefined"?window.localStorage:undefined;}catch{return undefined;}}
export function loadPersistedMaataaState(storage:Storage|undefined=defaultStorage()):Partial<RootState>|undefined {
 if(!storage)return undefined;
 try{
  const raw=storage.getItem(MAATAA_PERSISTENCE_KEY);if(!raw)return undefined;
  const input:unknown=JSON.parse(raw);if(!isCompositionData(input)||!input||typeof input!=="object"||Array.isArray(input))return undefined;
  const state=input as PersistedMaataaState;
  if(!state.builder||!Array.isArray(state.builder.past)||!Array.isArray(state.builder.future))return undefined;
  state.builder.present=parseCompositionInput(JSON.stringify(state.builder.present));
  state.builder.past=state.builder.past.map(scene=>parseCompositionInput(JSON.stringify(scene)));
  state.builder.future=state.builder.future.map(scene=>parseCompositionInput(JSON.stringify(scene)));
  return state;
 }catch{return undefined;}
}
export function clearPersistedMaataaState(storage:Storage|undefined=defaultStorage()){try{storage?.removeItem(MAATAA_PERSISTENCE_KEY)}catch{}}
export function createPersistenceMiddleware(storage:Storage|undefined=defaultStorage()):Middleware<{},RootState>{let queued=false;return(api)=>(next)=>(action)=>{const result=next(action);if(!storage)return result;const state=api.getState();if(!state.builder.persistenceEnabled)return result;if(!queued){queued=true;queueMicrotask(()=>{queued=false;const s=api.getState();const payload:PersistedMaataaState={ui:s.ui,workspace:s.workspace,page:s.page,layout:s.layout,device:s.device,builder:s.builder};try{storage.setItem(MAATAA_PERSISTENCE_KEY,JSON.stringify(payload))}catch{}})}return result}}
