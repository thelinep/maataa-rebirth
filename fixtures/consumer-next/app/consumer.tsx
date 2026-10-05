"use client";
import { useState } from "react";
import { VisualComposer, DEFAULT_COMPOSER_SCENE, type ComposerScene, generateComposerJsx } from "@maataa/ui/composer";
import { CompositionRuntime, CanonicalCompositionRuntime } from "@maataa/ui/runtime";
export default function Consumer(){const [scene,setScene]=useState<ComposerScene>(DEFAULT_COMPOSER_SCENE);return <><VisualComposer scene={scene} onSceneChange={setScene}/><CompositionRuntime scene={scene}/><CanonicalCompositionRuntime scene={scene}/><pre>{generateComposerJsx(scene)}</pre></>;}
