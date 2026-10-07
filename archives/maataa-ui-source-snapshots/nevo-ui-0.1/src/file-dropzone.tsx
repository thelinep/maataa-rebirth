"use client";

import { useId, useState, type DragEvent } from "react";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export interface FileDropzoneProps {
  label: string;
  hint?: string;
  /** Controlled-only list of selected files, same contract as every
   * other field here -- `FileList` is avoided since it's live/mutable
   * and awkward to diff against; a plain array is not. */
  files: readonly File[];
  onFilesChange(files: File[]): void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

/**
 * A drag-and-drop *affordance* wrapped around a real, always-present
 * `<input type="file">` -- not a replacement for it. The native input is
 * layered visibly underneath (via a "browse" trigger it's paired with,
 * not hidden or made unreachable), so keyboard and screen-reader users
 * get the exact same file-picker experience `MediaInput` (experience.tsx)
 * already provides; drag-over/drop handling only adds a second, sighted-
 * pointer-only way to reach the same `onFilesChange` callback both paths
 * share. No Base UI primitive exists for file drop zones (checked the
 * package list); this composes native `<input type="file">` plus the
 * standard HTML5 drag-and-drop events instead.
 */
export function FileDropzone({ label, hint, files, onFilesChange, accept, multiple = false, disabled, required, className }: FileDropzoneProps) {
  const inputId = useId();
  const [dragging, setDragging] = useState(false);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = Array.from(incoming);
    onFilesChange(multiple ? [...files, ...next] : next.slice(0, 1));
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (disabled) return;
    addFiles(event.dataTransfer.files);
  };

  const removeFile = (index: number) => onFilesChange(files.filter((_, current) => current !== index));

  return (
    <div className={classes("maataa-ui", "maataa-ui__file-dropzone", className)}>
      <label htmlFor={inputId} className="maataa-ui__file-dropzone-label">
        {label}
        {required ? " *" : ""}
      </label>
      {hint ? <small>{hint}</small> : null}
      <div
        className={classes("maataa-ui__file-dropzone-surface", dragging && "maataa-ui__file-dropzone-surface--active")}
        onDragOver={event => { event.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <p>Drag files here, or</p>
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          required={required && files.length === 0}
          disabled={disabled}
          onChange={event => addFiles(event.target.files)}
        />
      </div>
      {files.length > 0 ? (
        <ul className="maataa-ui__file-dropzone-list">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`}>
              <span>{file.name}</span>
              <button type="button" disabled={disabled} onClick={() => removeFile(index)} aria-label={`Remove ${file.name}`}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
