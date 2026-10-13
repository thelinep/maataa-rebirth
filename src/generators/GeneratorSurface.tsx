"use client";

import React from "react";
import { cx } from "../utils";
import {
  GeneratorRoot,
  GeneratorHeader,
  GeneratorDescription,
  GeneratorInputs,
  GeneratorPrompt,
  GeneratorContext,
  GeneratorControls,
  GeneratorOutput,
  GeneratorPreview,
  GeneratorInspector,
  GeneratorHistory,
  GeneratorEvidence,
  GeneratorStatus,
  GeneratorFooter,
} from "../generator-atoms";

export type GeneratorRequest = Readonly<{
  generatorId: string;
  name: string;
  brief: string;
  context: string;
}>;

export type GeneratorSurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
  generatorId: string;
  name: string;
  description?: React.ReactNode;
  inputs?: React.ReactNode;
  prompt?: React.ReactNode;
  context?: React.ReactNode;
  controls?: React.ReactNode;
  output?: React.ReactNode;
  preview?: React.ReactNode;
  inspector?: React.ReactNode;
  history?: React.ReactNode;
  evidence?: React.ReactNode;
  status?: React.ReactNode;
  footer?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- documents that async handlers are accepted; type-identical to unknown and part of the public props
  onGenerate?: (request: GeneratorRequest) => unknown | Promise<unknown>;
};

function DraftOutput({ value }: { value: unknown }) {
  let serialized: string;
  try {
    serialized = JSON.stringify(value, null, 2);
  } catch {
    serialized = JSON.stringify(
      { error: "The generator result could not be displayed." },
      null,
      2,
    );
  }
  return (
    <pre
      className="m-generator-draft-output"
      data-testid="generator-draft-output"
    >
      {serialized}
    </pre>
  );
}

export function GeneratorSurface({
  generatorId,
  name,
  description,
  inputs,
  prompt,
  context,
  controls,
  output,
  preview,
  inspector,
  history,
  evidence,
  status,
  footer,
  onGenerate,
  className,
  children,
  ...props
}: GeneratorSurfaceProps) {
  const [brief, setBrief] = React.useState("");
  const [requestContext, setRequestContext] = React.useState("");
  const [result, setResult] = React.useState<unknown>(null);
  const [phase, setPhase] = React.useState<
    "idle" | "working" | "complete" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedBrief = brief.trim();
    if (!normalizedBrief) {
      setPhase("error");
      setErrorMessage("Add a brief before creating a draft.");
      return;
    }

    setPhase("working");
    setErrorMessage("");
    setResult(null);
    try {
      const request: GeneratorRequest = {
        generatorId,
        name,
        brief: normalizedBrief,
        context: requestContext.trim(),
      };
      const generated = onGenerate
        ? await onGenerate(request)
        : {
            kind: "illustrative-local-draft",
            generatorId,
            title: `${name} draft`,
            brief: normalizedBrief,
            context: request.context || null,
            note: "Preview only. Connect an authorized domain adapter to run production generation.",
          };
      setResult(generated);
      setPhase("complete");
    } catch (error) {
      setPhase("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Generation failed. Check the connected adapter and try again.",
      );
    }
  }

  return (
    <GeneratorRoot
      data-generator-id={generatorId}
      className={cx("m-generator-surface", className)}
      {...props}
    >
      <GeneratorHeader>
        <strong>{name}</strong>
      </GeneratorHeader>
      {description !== undefined && (
        <GeneratorDescription>{description}</GeneratorDescription>
      )}
      <form
        className="m-generator-workbench"
        onSubmit={(event) => void handleGenerate(event)}
      >
        {inputs !== undefined && <GeneratorInputs>{inputs}</GeneratorInputs>}
        <GeneratorInputs>
          <label className="m-generator-field">
            <span>Brief</span>
            <textarea
              aria-label="Brief"
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
              rows={4}
              aria-describedby={`${generatorId}-brief-help`}
            />
            <small id={`${generatorId}-brief-help`}>
              Describe what you want this generator to prepare.
            </small>
          </label>
          <label className="m-generator-field">
            <span>
              Context <small>(optional)</small>
            </span>
            <textarea
              aria-label="Context (optional)"
              value={requestContext}
              onChange={(event) => setRequestContext(event.target.value)}
              rows={2}
            />
          </label>
        </GeneratorInputs>
        {prompt !== undefined && <GeneratorPrompt>{prompt}</GeneratorPrompt>}
        {context !== undefined && (
          <GeneratorContext>{context}</GeneratorContext>
        )}
        <GeneratorControls>
          <button
            type="submit"
            className="m-generator-submit"
            disabled={phase === "working"}
          >
            {phase === "working" ? "Preparing…" : "Create draft"}
          </button>
          {controls}
        </GeneratorControls>
      </form>
      <GeneratorStatus
        role={phase === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {phase === "error"
          ? errorMessage
          : (status ??
            (phase === "working"
              ? "Preparing your draft…"
              : phase === "complete"
                ? "Draft ready for review."
                : "Ready · local preview only"))}
      </GeneratorStatus>
      {(result !== null || output !== undefined || children !== undefined) && (
        <GeneratorOutput>
          {result !== null && <DraftOutput value={result} />}
          {output ?? children}
        </GeneratorOutput>
      )}
      {preview !== undefined && <GeneratorPreview>{preview}</GeneratorPreview>}
      {inspector !== undefined && (
        <GeneratorInspector>{inspector}</GeneratorInspector>
      )}
      {history !== undefined && <GeneratorHistory>{history}</GeneratorHistory>}
      {evidence !== undefined && (
        <GeneratorEvidence>{evidence}</GeneratorEvidence>
      )}
      {footer !== undefined && <GeneratorFooter>{footer}</GeneratorFooter>}
    </GeneratorRoot>
  );
}
