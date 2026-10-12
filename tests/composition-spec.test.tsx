import React from "react";
import {describe,expect,it,vi} from "vitest";
import {render,screen} from "@testing-library/react";
import {DEFAULT_COMPOSER_SCENE,createComposerBlock} from "../src/composer/defaults";
import {toCompositionSpec,validateCompositionSpec,acceptCompositionProposal,parseCompositionInput,updateCompositionSpec} from "../src/composer/spec";
import {validateCompositionKernel} from "../src/composer/compositionKernel";
import {isCompositionData} from "../src/composer/sceneData";
import {CanonicalCompositionRuntime} from "../src/runtime/CanonicalCompositionRuntime";
import {generateComposerJsx} from "../src/composer/codegen";
describe("shared composition spec",()=>{
 it("roundtrips visual/default scenes through the same accepted planner contract",()=>{
  const spec=toCompositionSpec(DEFAULT_COMPOSER_SCENE);expect(validateCompositionSpec(spec).accepted).toBe(true);
  expect(parseCompositionInput(JSON.stringify(spec))).toEqual(spec);expect(acceptCompositionProposal(spec).explanation).toMatch(/recorded compatibility evidence/);
 });
 it.each([null,{}, {blocks:[]}, {...DEFAULT_COMPOSER_SCENE,schemaVersion:"2"},{...DEFAULT_COMPOSER_SCENE,blocks:[{id:"a",kind:"invented",props:{}}]},{...DEFAULT_COMPOSER_SCENE,jsx:"alert(1)"}])("rejects malformed or AI-invented input without rendering",input=>{
  expect(validateCompositionSpec(input).accepted).toBe(false);expect(()=>parseCompositionInput(JSON.stringify(input))).toThrow();expect(validateCompositionKernel(input as any).valid).toBe(false);
 });
 it("rejects accessor input without reading it, cycles and unsafe keys",()=>{
  const getter=vi.fn(()=>"unexpected");const value={...DEFAULT_COMPOSER_SCENE};Object.defineProperty(value,"name",{get:getter});
  expect(validateCompositionSpec(value).accepted).toBe(false);expect(getter).not.toHaveBeenCalled();
  const cycle:any={};cycle.self=cycle;expect(isCompositionData(cycle)).toBe(false);
  expect(isCompositionData(JSON.parse('{"__proto__":{"polluted":true}}'))).toBe(false);
 });
 it("does not invent component IDs or silently permit binding substitutions",()=>{
  const spec=toCompositionSpec(DEFAULT_COMPOSER_SCENE);spec.blocks[0]={...spec.blocks[0],componentId:"COMPONENT.INVENTED"};expect(validateCompositionSpec(spec).accepted).toBe(false);
  spec.blocks[0].componentId="COMPONENT.ACTIONS.BUTTON";expect(validateCompositionSpec(spec).accepted).toBe(false);
 });
 it("preserves canonical unverified selections",()=>{
  const spec=toCompositionSpec({...DEFAULT_COMPOSER_SCENE,pageTypeId:"PAGE.EVENTS.EVENT_DASHBOARD"});const result=acceptCompositionProposal(spec);
  expect(result.accepted).toBe(true);expect(result.explanation).toMatch(/no verified compatibility record/);
 });
 it("maintains region bookkeeping when visual blocks are added/deleted",()=>{
  const next=updateCompositionSpec({...DEFAULT_COMPOSER_SCENE,blocks:[...DEFAULT_COMPOSER_SCENE.blocks.slice(1),createComposerBlock("text","new")]});
  expect(validateCompositionSpec(next).accepted).toBe(true);expect(next.regions!.flatMap(region=>region.blockIds)).not.toContain("block-1");
  expect(next.regions!.flatMap(region=>region.blockIds)).toContain("new");
 });
 it("executes explicit multi-region placement and generates matching canonical JSX",async()=>{
  const scene={...toCompositionSpec(DEFAULT_COMPOSER_SCENE),regions:[{regionId:"REGION.LAYOUT.LAYOUTHEADER",blockIds:["block-1"]},{regionId:"REGION.LAYOUT.LAYOUTCANVAS",blockIds:["block-2","block-3","block-4","block-5"]}]};
  const {container}=render(<CanonicalCompositionRuntime scene={scene}/>);await screen.findByRole("button",{name:"Primary action"});
  expect(container.querySelector('[data-layout-region="header"]')).toHaveTextContent("MAATAA composition");expect(container.querySelector('[data-layout-region="canvas"]')).toHaveTextContent("Primary action");
  const source=generateComposerJsx(scene);expect(source).toContain('header={<div>');expect(source).toContain('canvas={<div>');
 });
});

import { CompositionRuntime } from "../src/runtime/CompositionRuntime";
import { loadPersistedMaataaState } from "../src/redux/persistence";
it("cannot bypass runtime validation with a valid override",()=>{
 render(<CompositionRuntime scene={null as any} validation={{valid:true}}/>);expect(screen.getByRole("alert")).toHaveTextContent("invalid");
});
it("ignores corrupt persisted scenes rather than trusting parsed JSON",()=>{
 const storage={getItem:()=>JSON.stringify({builder:{present:{blocks:null},past:[],future:[]}})} as unknown as Storage;
 expect(loadPersistedMaataaState(storage)).toBeUndefined();
});

import {planCanonicalComposition} from "../src/composer/planner";
it("bounds host planner proposals with canonical vocabulary and shared validation",async()=>{
 const planner=vi.fn(async(request)=>{expect(request.vocabulary.workspaces.length).toBe(616);expect(request.vocabulary.renderableComponents).toHaveLength(9);return {...toCompositionSpec(DEFAULT_COMPOSER_SCENE),layoutTypeId:"LAYOUT.INVENTED"};});
 const result=await planCanonicalComposition("Compose a workspace",planner);expect(result.accepted).toBe(false);expect(result.explanation).toMatch(/rejected before rendering/);
});
