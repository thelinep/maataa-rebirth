import * as React from "react";
import { createRoot } from "react-dom/client";
import "@maataa/ui/styles.css";
import { Button } from "@maataa/ui/actions/Button";
import { Card } from "@maataa/ui/surfaces";
import { VisualComposer, DEFAULT_COMPOSER_SCENE, generateComposerJsx, validateCompositionSpec, type ComposerScene } from "@maataa/ui/composer";
import { CompositionRuntime, CanonicalCompositionRuntime } from "@maataa/ui/runtime";
function App(){const [scene,setScene]=React.useState<ComposerScene>(DEFAULT_COMPOSER_SCENE);if(!validateCompositionSpec(scene).accepted)throw new Error("Invalid fixture scene");return <Card><Button>Packed leaf import</Button><VisualComposer scene={scene} onSceneChange={setScene}/><CompositionRuntime scene={scene}/><CanonicalCompositionRuntime scene={scene}/><pre>{generateComposerJsx(scene)}</pre></Card>;}
createRoot(document.getElementById("root")!).render(<React.StrictMode><App/></React.StrictMode>);
