import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "./store";
export const MAATAA_PERSISTENCE_KEY="@maataa/ui-demo-state/v1";
export type PersistedMaataaState=Pick<RootState,"ui"|"workspace"|"page"|"layout"|"device"|"builder">;
export function loadPersistedMaataaState(storage:Storage|undefined=typeof window!=="undefined"?window.localStorage:undefined):Partial<RootState>|undefined{if(!storage)return undefined;try{const raw=storage.getItem(MAATAA_PERSISTENCE_KEY);return raw?JSON.parse(raw):undefined}catch{return undefined}}
export function clearPersistedMaataaState(storage:Storage|undefined=typeof window!=="undefined"?window.localStorage:undefined){try{storage?.removeItem(MAATAA_PERSISTENCE_KEY)}catch{}}
export function createPersistenceMiddleware(storage:Storage|undefined=typeof window!=="undefined"?window.localStorage:undefined):Middleware<{},RootState>{let queued=false;return(api)=>(next)=>(action)=>{const result=next(action);if(!storage)return result;const state=api.getState();if(!state.builder.persistenceEnabled)return result;if(!queued){queued=true;queueMicrotask(()=>{queued=false;const s=api.getState();const payload:PersistedMaataaState={ui:s.ui,workspace:s.workspace,page:s.page,layout:s.layout,device:s.device,builder:s.builder};try{storage.setItem(MAATAA_PERSISTENCE_KEY,JSON.stringify(payload))}catch{}})}return result}}
