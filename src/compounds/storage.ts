// Validated browser storage. Every read goes through a parse function, so stored data from
// an older version, another tab or a user edit can never reach the app in an unexpected shape.
import { useCallback, useEffect, useRef, useState } from "react";

export type StoredParser<T> = (raw: unknown) => T | null;
type Area = "local" | "session";

const storage = (area: Area): Storage | null => {
  try {
    if (typeof window === "undefined") return null;
    return area === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
};

/** Reads and validates a stored JSON value. Returns the fallback when missing, unreadable or rejected by parse. */
export function readStoredValue<T>(key: string, parse: StoredParser<T>, fallback: T, area: Area = "local"): T {
  const store = storage(area);
  if (!store) return fallback;
  try {
    const raw = store.getItem(key);
    if (raw === null) return fallback;
    return parse(JSON.parse(raw)) ?? fallback;
  } catch {
    return fallback;
  }
}

/** Reads a stored string as-is (no JSON). */
export function readStoredText(key: string, fallback = "", area: Area = "local"): string {
  try { return storage(area)?.getItem(key) ?? fallback; } catch { return fallback; }
}

/** Writes JSON; returns false when the browser refuses (private mode, quota, blocked storage). */
export function writeStoredValue(key: string, value: unknown, area: Area = "local"): boolean {
  try {
    const store = storage(area);
    if (!store) return false;
    store.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStoredValue(key: string, area: Area = "local"): boolean {
  try { storage(area)?.removeItem(key); return true; } catch { return false; }
}

export interface StoredValue<T> {
  value: T;
  setValue: (next: T | ((previous: T) => T)) => void;
  reset: () => void;
  /** False after the browser refused the last write; the value still updates in memory. */
  saved: boolean;
}

/** React state mirrored to browser storage, validated on every read (including changes from other tabs). */
export function useStoredValue<T>(key: string, parse: StoredParser<T>, initial: T | (() => T), area: Area = "local"): StoredValue<T> {
  const fallback = useRef(initial);
  const parser = useRef(parse);
  parser.current = parse;
  const resolveFallback = () => (typeof fallback.current === "function" ? (fallback.current as () => T)() : fallback.current);
  const [value, setState] = useState<T>(() => readStoredValue(key, parse, resolveFallback(), area));
  const [saved, setSaved] = useState(true);
  const latest = useRef(value);
  latest.current = value;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key && event.key !== null) return;
      const next = readStoredValue(key, parser.current, resolveFallback(), area);
      latest.current = next;
      setState(next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, area]);

  const setValue = useCallback((next: T | ((previous: T) => T)) => {
    const resolved = typeof next === "function" ? (next as (previous: T) => T)(latest.current) : next;
    latest.current = resolved;
    setState(resolved);
    setSaved(writeStoredValue(key, resolved, area));
  }, [key, area]);

  const reset = useCallback(() => {
    const next = resolveFallback();
    latest.current = next;
    setState(next);
    setSaved(removeStoredValue(key, area));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, area]);

  return { value, setValue, reset, saved };
}
