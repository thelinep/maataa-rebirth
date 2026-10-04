import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_COMPOSER_SCENE, createComposerBlock } from "../../composer/defaults";
import type { ComposerBlockKind, ComposerScene } from "../../composer/types";

export interface BuilderState { past:ComposerScene[]; present:ComposerScene; future:ComposerScene[]; selectedBlockId:string|null; nextBlockNumber:number; persistenceEnabled:boolean; }
export const initialBuilderState:BuilderState={past:[],present:DEFAULT_COMPOSER_SCENE,future:[],selectedBlockId:DEFAULT_COMPOSER_SCENE.blocks[0]?.id??null,nextBlockNumber:6,persistenceEnabled:true};
function snapshot(scene:ComposerScene){return JSON.parse(JSON.stringify(current(scene) as ComposerScene)) as ComposerScene}
function commit(state:BuilderState,next:ComposerScene){state.past.push(snapshot(state.present));if(state.past.length>60)state.past.shift();state.present={...next,updatedAt:new Date().toISOString()};state.future=[];}
const slice=createSlice({name:"builder",initialState:initialBuilderState,reducers:{
  setScene:(s,a:PayloadAction<ComposerScene>)=>commit(s,a.payload),
  resetScene:(s)=>{commit(s,DEFAULT_COMPOSER_SCENE);s.selectedBlockId=DEFAULT_COMPOSER_SCENE.blocks[0]?.id??null},
  selectBlock:(s,a:PayloadAction<string|null>)=>{s.selectedBlockId=a.payload},
  addBlock:(s,a:PayloadAction<ComposerBlockKind>)=>{const id=`block-${s.nextBlockNumber++}`;commit(s,{...snapshot(s.present),blocks:[...snapshot(s.present).blocks,createComposerBlock(a.payload,id)]});s.selectedBlockId=id},
  removeBlock:(s,a:PayloadAction<string>)=>{commit(s,{...snapshot(s.present),blocks:snapshot(s.present).blocks.filter((b)=>b.id!==a.payload)});if(s.selectedBlockId===a.payload)s.selectedBlockId=null},
  duplicateBlock:(s,a:PayloadAction<string>)=>{const present=snapshot(s.present),source=present.blocks.find((b)=>b.id===a.payload);if(!source)return;const id=`block-${s.nextBlockNumber++}`;commit(s,{...present,blocks:[...present.blocks,{...source,id,props:{...source.props}}]});s.selectedBlockId=id},
  updateBlockProps:(s,a:PayloadAction<{id:string;props:Record<string,unknown>}>)=>{const present=snapshot(s.present);commit(s,{...present,blocks:present.blocks.map((b)=>b.id===a.payload.id?{...b,props:{...b.props,...a.payload.props}}:b)})},
  reorderBlock:(s,a:PayloadAction<{from:number;to:number}>)=>{const present=snapshot(s.present),blocks=[...present.blocks];if(a.payload.from<0||a.payload.to<0||a.payload.from>=blocks.length||a.payload.to>=blocks.length)return;const[item]=blocks.splice(a.payload.from,1);blocks.splice(a.payload.to,0,item);commit(s,{...present,blocks})},
  undo:(s)=>{const prev=s.past.pop();if(!prev)return;s.future.unshift(snapshot(s.present));s.present=prev},
  redo:(s)=>{const next=s.future.shift();if(!next)return;s.past.push(snapshot(s.present));s.present=next},
  setPersistence:(s,a:PayloadAction<boolean>)=>{s.persistenceEnabled=a.payload},
}});
export const builderActions=slice.actions;export const builderReducer=slice.reducer;
