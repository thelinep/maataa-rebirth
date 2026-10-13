export type EditorHistory<T> = {
  past: T[];
  present: T;
  future: T[];
  limit: number;
};

export function createEditorHistory<T>(initial: T, limit = 40): EditorHistory<T> {
  return { past: [], present: initial, future: [], limit: Math.max(1, Math.floor(limit)) };
}

export function updateEditorHistory<T>(history: EditorHistory<T>, next: T): EditorHistory<T> {
  if (Object.is(history.present, next)) return history;
  return { ...history, past: [...history.past, history.present].slice(-history.limit), present: next, future: [] };
}

export function undoEditorHistory<T>(history: EditorHistory<T>): EditorHistory<T> {
  if (history.past.length === 0) return history;
  const previous = history.past[history.past.length - 1];
  return { ...history, past: history.past.slice(0, -1), present: previous, future: [history.present, ...history.future].slice(0, history.limit) };
}

export function redoEditorHistory<T>(history: EditorHistory<T>): EditorHistory<T> {
  if (history.future.length === 0) return history;
  const next = history.future[0];
  return { ...history, past: [...history.past, history.present].slice(-history.limit), present: next, future: history.future.slice(1) };
}

export function serializeEditorDocument(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export function parseEditorDocument<T>(source: string, validate: (value: unknown) => value is T, maximumBytes = 2_000_000): T {
  if (new TextEncoder().encode(source).byteLength > maximumBytes) throw new Error("Editor document exceeds the supported import size.");
  let value: unknown;
  try { value = JSON.parse(source); }
  catch { throw new Error("Editor document must be valid JSON."); }
  if (!validate(value)) throw new Error("Editor document does not match the expected schema.");
  return value;
}
