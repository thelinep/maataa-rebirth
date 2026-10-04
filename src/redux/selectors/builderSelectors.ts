import type { RootState } from "../store";
export const selectBuilder=(s:RootState)=>s.builder;
export const selectComposerScene=(s:RootState)=>s.builder.present;
export const selectComposerSelectedBlock=(s:RootState)=>s.builder.present.blocks.find((b)=>b.id===s.builder.selectedBlockId)??null;
export const selectComposerCanUndo=(s:RootState)=>s.builder.past.length>0;
export const selectComposerCanRedo=(s:RootState)=>s.builder.future.length>0;
