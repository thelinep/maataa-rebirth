"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "./components.js";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export interface AudioInputProps {
  label: string;
  hint?: string;
  /** Controlled-only: a `File` once a recording is captured or a file is
   * picked, or `null` for nothing recorded/selected yet -- a `File`
   * rather than a data URL because a recorded clip can run long, and
   * every other domain adapter in this package that hands off binary
   * media (`MediaAssetReferenceAdapter`, components.tsx) already expects
   * to receive a stored reference rather than an inline blob. */
  value: File | null;
  onValueChange(value: File | null): void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  /** Maximum recording length in seconds; recording auto-stops at this
   * point. @default 120 */
  maxSeconds?: number;
}

/**
 * `experience.tsx`'s existing `MediaInput` covers *picking* an
 * already-recorded audio file (`<input type="file" accept="audio/*">`)
 * but never actually records anything -- this is the record-in-browser
 * field this package was missing, built on the standard
 * `MediaRecorder`/`getUserMedia` Web APIs (no Base UI equivalent exists;
 * checked the package list). Microphone access can be denied, missing,
 * or simply not attempted -- so recording is offered as one of two
 * equally-valid paths, never the only one: a real, focusable "Upload a
 * file instead" control (reusing the same `accept="audio/*"` file input
 * `MediaInput` uses) is always present alongside the record button, not
 * hidden behind a permission-error state a user has to hit first.
 */
export function AudioInput({ label, hint, value, onValueChange, disabled, required, className, maxSeconds = 120 }: AudioInputProps) {
  const inputId = useId();
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    timerRef.current && clearInterval(timerRef.current);
    streamRef.current?.getTracks().forEach(track => track.stop());
  }, []);

  const startRecording = async () => {
    setPermissionError(null);
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setPermissionError("This browser can't record audio here. Use “Upload a file instead.”");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = event => { if (event.data.size > 0) chunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        onValueChange(new File([blob], `recording.${(recorder.mimeType || "audio/webm").split("/")[1]?.split(";")[0] ?? "webm"}`, { type: blob.type }));
        stream.getTracks().forEach(track => track.stop());
      };
      recorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => {
        setSeconds(current => {
          if (current + 1 >= maxSeconds) { stopRecording(); return maxSeconds; }
          return current + 1;
        });
      }, 1000);
    } catch {
      setPermissionError("Microphone access was denied or unavailable. Use “Upload a file instead.”");
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    timerRef.current && clearInterval(timerRef.current);
    setRecording(false);
  };

  return (
    <div className={classes("maataa-ui", "maataa-ui__audio-input", className)}>
      <span className="maataa-ui__audio-input-label">
        {label}
        {required ? " *" : ""}
      </span>
      {hint ? <small>{hint}</small> : null}
      <div className="maataa-ui__audio-input-controls">
        {recording ? (
          <Button type="button" variant="primary" onClick={stopRecording} disabled={disabled}>
            Stop recording ({seconds}s)
          </Button>
        ) : (
          <Button type="button" onClick={startRecording} disabled={disabled}>
            Record audio
          </Button>
        )}
        <label htmlFor={inputId} className="maataa-ui__audio-input-file-label">
          <span>Upload a file instead</span>
          <input
            id={inputId}
            type="file"
            accept="audio/*"
            disabled={disabled}
            onChange={event => onValueChange(event.target.files?.[0] ?? null)}
          />
        </label>
      </div>
      {permissionError ? <p role="alert">{permissionError}</p> : null}
      {value ? (
        <audio controls src={URL.createObjectURL(value)} aria-label={`${label}: preview`}>
        </audio>
      ) : null}
    </div>
  );
}
