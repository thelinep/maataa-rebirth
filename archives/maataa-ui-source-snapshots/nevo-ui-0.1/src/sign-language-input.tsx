"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "./components.js";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export interface SignLanguageInputProps {
  label: string;
  hint?: string;
  /** A recorded or uploaded video response -- a `File`, same reasoning
   * as `AudioInput.value` (audio-input.tsx). */
  value: File | null;
  onValueChange(value: File | null): void;
  /** A caller-owned plain-text equivalent of the signed response.
   * Deliberately paired here rather than left to a separate field
   * elsewhere: nothing in this component -- or anywhere in this
   * package -- performs sign-language recognition or translation, so
   * without a written equivalent the recorded video is opaque to
   * anyone who can't already read the signer's language, including this
   * package's own tests and any reviewer who isn't fluent in it. */
  transcript: string;
  onTranscriptChange(transcript: string): void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  maxSeconds?: number;
}

/**
 * A video-response field for the case a plain text field can't serve:
 * letting a signing user answer in their own language rather than a
 * typed one, the same accessibility reasoning `MediaAssetReferenceAdapter`
 * and `AudioInput` (audio-input.tsx) already apply to other media types.
 * "Sign-language input" as literally *understanding what was signed* is
 * a distinct, much harder speech-to-text-class problem this component
 * does not attempt -- there is no sign-language recognition anywhere in
 * this package or its dependencies -- so `transcript` is a required
 * companion, not an optional nicety, and the recorded video is captioned
 * by the person providing it, not machine-derived. Recording uses
 * `getUserMedia`/`MediaRecorder` the same way `AudioInput` does, with the
 * same file-upload fallback for when camera access isn't available.
 */
export function SignLanguageInput({ label, hint, value, onValueChange, transcript, onTranscriptChange, disabled, required, className, maxSeconds = 120 }: SignLanguageInputProps) {
  const inputId = useId();
  const transcriptId = useId();
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const previewRef = useRef<HTMLVideoElement | null>(null);
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
      setPermissionError("This browser can't record video here. Use “Upload a file instead.”");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (previewRef.current) { previewRef.current.srcObject = stream; void previewRef.current.play(); }
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = event => { if (event.data.size > 0) chunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "video/webm" });
        onValueChange(new File([blob], `sign-response.${(recorder.mimeType || "video/webm").split("/")[1]?.split(";")[0] ?? "webm"}`, { type: blob.type }));
        stream.getTracks().forEach(track => track.stop());
        if (previewRef.current) previewRef.current.srcObject = null;
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
      setPermissionError("Camera access was denied or unavailable. Use “Upload a file instead.”");
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    timerRef.current && clearInterval(timerRef.current);
    setRecording(false);
  };

  return (
    <div className={classes("maataa-ui", "maataa-ui__sign-language-input", className)}>
      <span className="maataa-ui__sign-language-input-label">
        {label}
        {required ? " *" : ""}
      </span>
      {hint ? <small>{hint}</small> : null}
      <video ref={previewRef} muted playsInline className="maataa-ui__sign-language-input-preview" aria-hidden="true" hidden={!recording} />
      <div className="maataa-ui__sign-language-input-controls">
        {recording ? (
          <Button type="button" variant="primary" onClick={stopRecording} disabled={disabled}>
            Stop recording ({seconds}s)
          </Button>
        ) : (
          <Button type="button" onClick={startRecording} disabled={disabled}>
            Record a video response
          </Button>
        )}
        <label htmlFor={inputId} className="maataa-ui__sign-language-input-file-label">
          <span>Upload a file instead</span>
          <input id={inputId} type="file" accept="video/*" disabled={disabled} onChange={event => onValueChange(event.target.files?.[0] ?? null)} />
        </label>
      </div>
      {permissionError ? <p role="alert">{permissionError}</p> : null}
      {value ? <video controls src={URL.createObjectURL(value)} aria-label={`${label}: recorded response`} className="maataa-ui__sign-language-input-playback" /> : null}
      <label htmlFor={transcriptId} className="maataa-ui__sign-language-input-transcript-label">
        Written equivalent
        {required ? " *" : ""}
        <textarea
          id={transcriptId}
          value={transcript}
          required={required}
          disabled={disabled}
          placeholder="A plain-text version of what's signed in the video, for anyone reviewing this who isn't fluent in it."
          onChange={event => onTranscriptChange(event.target.value)}
        />
      </label>
    </div>
  );
}
