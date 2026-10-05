import * as React from "react";

import {
  validateCompositionKernel,
  type CompositionContext,
} from "../composer/compositionKernel";

import type {
  ComposerScene,
} from "../composer/types";

import {
  CompositionRuntime,
  type CompositionRuntimeProps,
} from "./CompositionRuntime";

export interface CanonicalCompositionRuntimeProps
  extends Omit<
    CompositionRuntimeProps,
    "scene" | "validation"
  > {
  scene: ComposerScene;
  context?: CompositionContext;
}

export function CanonicalCompositionRuntime({
  scene,
  context,
  ...props
}: CanonicalCompositionRuntimeProps) {
  const validation = React.useMemo(
    () =>
      validateCompositionKernel(
        scene,
        context,
      ),
    [scene, context],
  );

  return (
    <CompositionRuntime
      {...props}
      scene={scene}
      validation={validation}
    />
  );
}
