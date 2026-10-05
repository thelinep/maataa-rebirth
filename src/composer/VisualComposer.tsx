import * as React from "react";
import { Button } from "../actions/Button";
import { Input } from "../forms/Input";
import { Select } from "../forms";
import { Badge } from "../feedback/Badge";
import { PAGE_TYPES } from "../registries/pageRegistry";
import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
import { LAYOUT_TYPES } from "../registries/layoutRegistry";
import { DEVICE_REGISTRY } from "../registries/deviceRegistry";
import { createComposerBlock } from "./defaults";
import { ComposerBlockView } from "./ComposerRenderer";
import { generateComposerJsx } from "./codegen";
import { validateCompositionKernel } from "./compositionKernel";
import { getVerifiedPageIdsForWorkspace, getVerifiedLayoutIdsForComposition } from "./compatibility";
import type { ComposerBlock, ComposerBlockKind, ComposerScene } from "./types";

export interface VisualComposerProps {
  scene: ComposerScene;
  selectedBlockId?: string | null;
  canUndo?: boolean;
  canRedo?: boolean;
  onSceneChange: (scene: ComposerScene) => void;
  onSelectBlock?: (id: string | null) => void;
  onUndo?: () => void;
  onRedo?: () => void;
}

const palette: {kind:ComposerBlockKind;label:string}[] = [
  {kind:"heading",label:"Heading"},{kind:"text",label:"Text"},{kind:"button",label:"Button"},{kind:"input",label:"Input"},{kind:"card",label:"Card"},{kind:"table",label:"Data table"},{kind:"metric",label:"Metric"},{kind:"badge",label:"Badge"},{kind:"divider",label:"Divider"},
];

function nextId(scene: ComposerScene) { const n = scene.blocks.reduce((max,b)=>Math.max(max,Number(b.id.match(/(\d+)$/)?.[1]??0)),0)+1; return `block-${n}`; }

export function VisualComposer({scene,selectedBlockId=null,canUndo,canRedo,onSceneChange,onSelectBlock,onUndo,onRedo}:VisualComposerProps) {
  const [dragId,setDragId] = React.useState<string|null>(null);
  const selected = scene.blocks.find((b)=>b.id===selectedBlockId) ?? null;
  const validation = React.useMemo(()=>validateCompositionKernel(scene),[scene]);
  const status = !validation.valid ? "invalid" : validation.compatibility.status;
  const recommendedPages = new Set(getVerifiedPageIdsForWorkspace(scene.workspaceTypeId));
  const recommendedLayouts = new Set(getVerifiedLayoutIdsForComposition(scene.workspaceTypeId, scene.pageTypeId));
  const rank = <T extends {id:string}>(items: readonly T[], ids: ReadonlySet<string>) => [...items].sort((a,b)=>Number(ids.has(b.id))-Number(ids.has(a.id)));
  const issues = [
    ...validation.sceneValidation.issues,
    ...validation.warnings.map(issue => ({code:issue.code,level:"warning",message:issue.message,blockId:undefined})),
  ];
  const commit = (next: ComposerScene) => onSceneChange({...next,updatedAt:new Date().toISOString()});
  const add = (kind:ComposerBlockKind) => { const block=createComposerBlock(kind,nextId(scene)); commit({...scene,blocks:[...scene.blocks,block]}); onSelectBlock?.(block.id); };
  const remove = (id:string) => { commit({...scene,blocks:scene.blocks.filter((b)=>b.id!==id)}); if(selectedBlockId===id)onSelectBlock?.(null); };
  const duplicate = (block:ComposerBlock) => { const copy={...block,id:nextId(scene),props:{...block.props}}; commit({...scene,blocks:[...scene.blocks,copy]}); onSelectBlock?.(copy.id); };
  const move = (fromId:string,toId:string) => { if(fromId===toId)return; const blocks=[...scene.blocks]; const from=blocks.findIndex((b)=>b.id===fromId),to=blocks.findIndex((b)=>b.id===toId); if(from<0||to<0)return; const [item]=blocks.splice(from,1); blocks.splice(to,0,item); commit({...scene,blocks}); };
  const updateSelected = (patch:Record<string,unknown>) => { if(!selected)return; commit({...scene,blocks:scene.blocks.map((b)=>b.id===selected.id?{...b,props:{...b.props,...patch}}:b)}); };
  return <div className="m-visual-composer" data-maataa-theme={scene.theme}>
    <div className="m-composer-toolbar">
      <div><strong>{scene.name}</strong><span>{scene.workspaceTypeId}</span></div>
      <div className="m-composer-toolbar-actions"><Button variant="ghost" disabled={!canUndo} onClick={onUndo}>Undo</Button><Button variant="ghost" disabled={!canRedo} onClick={onRedo}>Redo</Button><Badge role="status" aria-label="Composition status" tone={status==="verified"?"success":status==="invalid"?"danger":"warning"}>{status}</Badge></div>
    </div>
    <div className="m-composer-context">
      <label>Workspace<Select value={scene.workspaceTypeId} onChange={(e)=>commit({...scene,workspaceTypeId:e.target.value as any})}>{WORKSPACE_TYPES.slice(0,120).map((x)=><option key={x.id} value={x.id}>{x.name}</option>)}</Select></label>
      <label>Page<Select value={scene.pageTypeId} onChange={(e)=>commit({...scene,pageTypeId:e.target.value as any})}>{rank(PAGE_TYPES.slice(0,160),recommendedPages).map((x)=><option key={x.id} value={x.id}>{x.name}</option>)}</Select></label>
      <label>Layout<Select value={scene.layoutTypeId} onChange={(e)=>commit({...scene,layoutTypeId:e.target.value as any})}>{rank(LAYOUT_TYPES,recommendedLayouts).map((x)=><option key={x.id} value={x.id}>{x.name}</option>)}</Select></label>
      <label>Device<Select value={scene.deviceId} onChange={(e)=>commit({...scene,deviceId:e.target.value as any})}>{DEVICE_REGISTRY.slice(0,90).map((x)=><option key={x.id} value={x.id}>{x.name}</option>)}</Select></label>
      <label>State<Select value={scene.stateMode} onChange={(e)=>commit({...scene,stateMode:e.target.value as any})}>{["default","loading","empty","error","disabled","offline","success"].map((x)=><option key={x}>{x}</option>)}</Select></label>
    </div>
    <div className="m-composer-grid">
      <aside className="m-composer-palette"><small>PALETTE</small>{palette.map((item)=><button key={item.kind} draggable onDragStart={(e)=>e.dataTransfer.setData("maataa/palette",item.kind)} onClick={()=>add(item.kind)}>+ {item.label}</button>)}</aside>
      <div className="m-composer-canvas" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>{const kind=e.dataTransfer.getData("maataa/palette") as ComposerBlockKind;if(palette.some((p)=>p.kind===kind))add(kind)}}>
        {scene.blocks.map((block)=><div key={block.id} draggable={!block.locked} className="m-composer-node" data-selected={block.id===selectedBlockId} data-hidden={block.hidden||undefined} onClick={()=>onSelectBlock?.(block.id)} onDragStart={()=>{if(!block.locked)setDragId(block.id)}} onDragOver={(e)=>e.preventDefault()} onDrop={()=>{if(dragId)move(dragId,block.id);setDragId(null)}}>
          <div className="m-composer-node-head"><span>{block.kind} · {block.id}</span><div><button onClick={(e)=>{e.stopPropagation();duplicate(block)}}>Duplicate</button><button onClick={(e)=>{e.stopPropagation();commit({...scene,blocks:scene.blocks.map((b)=>b.id===block.id?{...b,hidden:!b.hidden}:b)})}}>{block.hidden?"Show":"Hide"}</button><button onClick={(e)=>{e.stopPropagation();remove(block.id)}}>Delete</button></div></div>
          {!block.hidden && <div className="m-composer-node-body"><ComposerBlockView block={block} disabled={scene.stateMode==="disabled"}/></div>}
        </div>)}
        {scene.blocks.length===0 && <div className="m-composer-drop-empty">Drop a palette item here.</div>}
      </div>
      <aside className="m-composer-inspector"><small>INSPECTOR</small>{selected?<><strong>{selected.kind}</strong><code>{selected.id}</code>{Object.entries(selected.props).map(([key,value])=><label key={key}><span>{key}</span>{typeof value==="boolean"?<input type="checkbox" checked={value} onChange={(e)=>updateSelected({[key]:e.target.checked})}/>:<Input value={String(value??"")} onChange={(e)=>updateSelected({[key]:key==="level"?Number(e.target.value):e.target.value})}/>}</label>)}</>:<p>Select a block on the canvas.</p>}<hr/><details><summary>Validation</summary>{issues.length===0?<p>No issues.</p>:issues.map((i)=><p key={`${i.code}-${i.blockId??"scene"}`} data-level={i.level}>{i.level}: {i.message}</p>)}</details><details><summary>Generated JSX</summary><pre><code>{generateComposerJsx(scene)}</code></pre></details></aside>
    </div>
  </div>;
}
