import * as React from "react";
import { createEditorHistory, redoEditorHistory, undoEditorHistory, updateEditorHistory } from "./history";

export function useEditorHistory<T>(initialValue: T | (() => T), limit = 40) {
  const [history, setHistory] = React.useState(() => createEditorHistory(typeof initialValue === "function" ? (initialValue as () => T)() : initialValue, limit));
  const update = React.useCallback((edit: T | ((current: T) => T)) => {
    setHistory(current => updateEditorHistory(current, typeof edit === "function" ? (edit as (current: T) => T)(current.present) : edit));
  }, []);
  const undo = React.useCallback(() => setHistory(current => undoEditorHistory(current)), []);
  const redo = React.useCallback(() => setHistory(current => redoEditorHistory(current)), []);
  return { value: history.present, update, undo, redo, canUndo: history.past.length > 0, canRedo: history.future.length > 0, pastCount: history.past.length, futureCount: history.future.length };
}
