"use client";

import { useEffect, useId, useRef } from "react";
import { Button } from "./components.js";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export interface RichTextEditorProps {
  label: string;
  /** Controlled-only HTML string, same contract as every other field
   * here. Deliberately a *small*, fixed vocabulary (bold/italic/bulleted
   * list) rather than an attempt at a general rich-text engine -- see
   * this component's doc comment below for why. */
  value: string;
  onValueChange(value: string): void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

/**
 * No Base UI primitive covers rich text (checked: nothing resembling an
 * editor anywhere in `@base-ui/react@1.8.0`'s package list), and a real
 * rich-text engine -- undo/redo history, paste sanitization across
 * source apps, collaborative editing, schema-constrained content -- is a
 * genuinely large, separate problem (that's what dedicated libraries
 * like Lexical or TipTap exist to solve). This is deliberately *not*
 * that: a small, fixed-vocabulary editor (bold, italic, bulleted list)
 * built on `contentEditable` and the browser's own (long-deprecated, but
 * still universally supported) `document.execCommand`, for the
 * "occasional formatted note" case. If a consumer needs paste
 * sanitization, undo history beyond the browser's native Ctrl+Z, or a
 * larger formatting vocabulary, that's a real gap this component does
 * not attempt to close -- reach for a dedicated editor library instead
 * of extending this one past its "small fixed vocabulary" scope.
 * Keyboard support beyond the toolbar buttons (Tab to move focus, the
 * browser's own Ctrl+B/Ctrl+I) comes from `contentEditable` and
 * `execCommand` themselves, not from any code here.
 */
export function RichTextEditor({ label, value, onValueChange, disabled, required, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  // Keeps the DOM in sync when `value` changes from *outside* this
  // component (e.g. loaded from storage) without fighting the browser's
  // own cursor position during normal typing -- only touches innerHTML
  // when it's actually out of sync with the last-known DOM content.
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== value) editor.innerHTML = value;
  }, [value]);

  const exec = (command: string) => {
    if (disabled) return;
    editorRef.current?.focus();
    document.execCommand(command);
    if (editorRef.current) onValueChange(editorRef.current.innerHTML);
  };

  return (
    <div className={classes("maataa-ui", "maataa-ui__rich-text", className)}>
      <span id={labelId} className="maataa-ui__rich-text-label">
        {label}
        {required ? " *" : ""}
      </span>
      <div role="toolbar" aria-label={`${label} formatting`} className="maataa-ui__rich-text-toolbar">
        <Button type="button" variant="quiet" disabled={disabled} onClick={() => exec("bold")} aria-label="Bold">
          <strong>B</strong>
        </Button>
        <Button type="button" variant="quiet" disabled={disabled} onClick={() => exec("italic")} aria-label="Italic">
          <em>I</em>
        </Button>
        <Button type="button" variant="quiet" disabled={disabled} onClick={() => exec("insertUnorderedList")} aria-label="Bulleted list">
          • List
        </Button>
      </div>
      <div
        ref={editorRef}
        role="textbox"
        aria-multiline="true"
        aria-labelledby={labelId}
        aria-required={required}
        aria-disabled={disabled}
        contentEditable={!disabled}
        suppressContentEditableWarning
        className="maataa-ui__rich-text-editor"
        onInput={event => onValueChange((event.target as HTMLDivElement).innerHTML)}
      />
    </div>
  );
}
