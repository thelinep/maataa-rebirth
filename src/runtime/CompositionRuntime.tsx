import * as React from "react";
import { ComposerRenderer } from "../composer/ComposerRenderer";
import { validateComposerScene } from "../composer/validate";
import type { ComposerScene } from "../composer/types";

export interface CompositionRuntimeProps {
  scene: ComposerScene;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  inspector?: React.ReactNode;
  validation?: Readonly<{ valid: boolean }>;
}
export function CompositionRuntime({
  scene,
  header,
  sidebar,
  inspector,
  validation: validationOverride,
}: CompositionRuntimeProps) {
  const validation =
    validationOverride ?? validateComposerScene(scene);
  return <div className="m-composition-runtime" data-workspace={scene.workspaceTypeId} data-page={scene.pageTypeId} data-layout={scene.layoutTypeId} data-maataa-theme={scene.theme} data-density={scene.density}>
    <header className="m-composition-header">{header??<><strong>{scene.name}</strong><small>{scene.pageTypeId}</small></>}</header>
    <aside className="m-composition-sidebar">{sidebar??<nav><span>Overview</span><span>Data</span><span>Evidence</span></nav>}</aside>
    <main className="m-composition-main"><ComposerRenderer scene={scene}/></main>
    <aside className="m-composition-inspector">{inspector??<><strong>Composition</strong><code>{scene.layoutTypeId}</code><span>{validation.valid?"valid":"needs review"}</span></>}</aside>
  </div>;
}
