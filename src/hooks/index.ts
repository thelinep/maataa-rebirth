import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type Dispatch,
  type RefCallback,
  type RefObject,
  type SetStateAction,
} from "react";

export { useScrollBackToTop } from "../mobile/useScrollBackToTop";
export type { UseScrollBackToTopOptions, UseScrollBackToTopResult } from "../mobile/useScrollBackToTop";

export function useOutsideClick<T extends Element>(
  ref: RefObject<T | null>,
  onOutsideClick: (event: PointerEvent) => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled || typeof document === "undefined") return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !ref.current?.contains(target)) onOutsideClick(event);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [enabled, onOutsideClick, ref]);
}

export function useEscapeKey(
  onEscape: (event: KeyboardEvent) => void,
  options: { enabled?: boolean; preventDefault?: boolean } = {},
): void {
  const { enabled = true, preventDefault = false } = options;
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (preventDefault) event.preventDefault();
      onEscape(event);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, onEscape, preventDefault]);
}

export function useMediaQuery(query: string, serverMatches = false): boolean {
  const subscribe = useCallback((notify: () => void) => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => {};
    const media = window.matchMedia(query);
    if (media.addEventListener) {
      media.addEventListener("change", notify);
      return () => media.removeEventListener("change", notify);
    }
    media.addListener(notify);
    return () => media.removeListener(notify);
  }, [query]);
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return serverMatches;
    return window.matchMedia(query).matches;
  }, [query, serverMatches]);
  const getServerSnapshot = useCallback(() => serverMatches, [serverMatches]);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export type UseAutoHideNavbarOptions = {
  /** Keep the navbar visible while the user is within this many pixels of the top. Defaults to 80. */
  threshold?: number;
  /** Ignore smaller scroll changes to avoid jitter. Defaults to 6px. */
  delta?: number;
  enabled?: boolean;
};

export type UseAutoHideNavbarResult = { isHidden: boolean; reveal: () => void };

/** Hides navigation while scrolling down and reveals it on upward scroll. */
export function useAutoHideNavbar({ threshold = 80, delta = 6, enabled = true }: UseAutoHideNavbarOptions = {}): UseAutoHideNavbarResult {
  const [isHidden, setIsHidden] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const previousY = useRef(0);
  const safeThreshold = Number.isFinite(threshold) ? Math.max(0, threshold) : 80;
  const safeDelta = Number.isFinite(delta) ? Math.max(0, delta) : 6;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const readScrollY = () => Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
    previousY.current = readScrollY();
    if (!enabled || prefersReducedMotion) {
      setIsHidden(false);
      return;
    }
    const onScroll = () => {
      const currentY = readScrollY();
      const change = currentY - previousY.current;
      if (currentY <= safeThreshold) setIsHidden(false);
      else if (Math.abs(change) >= safeDelta) setIsHidden(change > 0);
      previousY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, prefersReducedMotion, safeDelta, safeThreshold]);

  const reveal = useCallback(() => {
    previousY.current = typeof window === "undefined" ? 0 : Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
    setIsHidden(false);
  }, []);

  return { isHidden, reveal };
}

export type UseResizeObserverResult<T extends Element> = {
  ref: RefCallback<T>;
  width: number;
  height: number;
  entry: ResizeObserverEntry | null;
};

export function useResizeObserver<T extends Element = HTMLElement>(
  options: ResizeObserverOptions = {},
): UseResizeObserverResult<T> {
  const [target, setTarget] = useState<T | null>(null);
  const [entry, setEntry] = useState<ResizeObserverEntry | null>(null);
  const ref = useCallback<RefCallback<T>>((node) => setTarget(node), []);
  const box = options.box;

  useEffect(() => {
    if (!target || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([nextEntry]) => setEntry(nextEntry ?? null));
    observer.observe(target, box ? { box } : undefined);
    return () => observer.disconnect();
  }, [target, box]);

  return { ref, width: entry?.contentRect.width ?? 0, height: entry?.contentRect.height ?? 0, entry };
}

export type UseIntersectionObserverOptions = IntersectionObserverInit & { enabled?: boolean };
export type UseIntersectionObserverResult<T extends Element> = {
  ref: RefCallback<T>;
  entry: IntersectionObserverEntry | null;
  isIntersecting: boolean;
};

export function useIntersectionObserver<T extends Element = HTMLElement>(
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverResult<T> {
  const { enabled = true, root = null, rootMargin = "0px", threshold = 0 } = options;
  const [target, setTarget] = useState<T | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const ref = useCallback<RefCallback<T>>((node) => {
    setTarget(node);
    setEntry(null);
  }, []);
  const thresholdKey = Array.isArray(threshold) ? threshold.join(",") : threshold;
  const observerThreshold = Array.isArray(threshold) ? [...threshold] : threshold;

  useEffect(() => {
    if (!enabled || !target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([nextEntry]) => setEntry(nextEntry ?? null), {
      root,
      rootMargin,
      threshold: observerThreshold,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [enabled, target, root, rootMargin, thresholdKey]);

  return { ref, entry, isIntersecting: entry?.isIntersecting ?? false };
}

export type PersistentState<T> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  remove: () => void;
  error: Error | null;
};

type StorageKind = "localStorage" | "sessionStorage";

function usePersistentState<T>(kind: StorageKind, key: string, initialValue: T | (() => T)): PersistentState<T> {
  const initial = useRef(initialValue);
  const getInitial = useCallback((): T => {
    const fallback = typeof initial.current === "function" ? (initial.current as () => T)() : initial.current;
    if (typeof window === "undefined") return fallback;
    try {
      const raw = window[kind].getItem(key);
      return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  }, [key, kind]);
  const [value, setStoredValue] = useState<T>(getInitial);
  const [error, setError] = useState<Error | null>(null);
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    setStoredValue(getInitial());
    if (typeof window === "undefined") return;
    const onStorage = (event: StorageEvent) => {
      if (event.storageArea && event.storageArea !== window[kind]) return;
      if (event.key !== key && event.key !== null) return;
      const next = event.key === null || event.newValue === null ? getInitialFallback(initial.current) : parseStored<T>(event.newValue, getInitialFallback(initial.current));
      valueRef.current = next;
      setStoredValue(next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [getInitial, key, kind]);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>((action) => {
    const next = typeof action === "function" ? (action as (previous: T) => T)(valueRef.current) : action;
    valueRef.current = next;
    setStoredValue(next);
    try {
      if (typeof window !== "undefined") window[kind].setItem(key, JSON.stringify(next));
      setError(null);
    } catch (cause) {
      setError(toError(cause));
    }
  }, [key, kind]);

  const remove = useCallback(() => {
    const next = getInitialFallback(initial.current);
    valueRef.current = next;
    setStoredValue(next);
    try {
      if (typeof window !== "undefined") window[kind].removeItem(key);
      setError(null);
    } catch (cause) {
      setError(toError(cause));
    }
  }, [key, kind]);

  return { value, setValue, remove, error };
}

function getInitialFallback<T>(initialValue: T | (() => T)): T {
  return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;
}

function parseStored<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

function toError(cause: unknown): Error {
  return cause instanceof Error ? cause : new Error(String(cause));
}

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)): PersistentState<T> {
  return usePersistentState("localStorage", key, initialValue);
}

export function useSessionStorage<T>(key: string, initialValue: T | (() => T)): PersistentState<T> {
  return usePersistentState("sessionStorage", key, initialValue);
}

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const safeDelay = Number.isFinite(delay) ? Math.max(0, delay) : 300;
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), safeDelay);
    return () => clearTimeout(timer);
  }, [value, safeDelay]);
  return debouncedValue;
}

export type UseClipboardResult = { isCopied: boolean; error: Error | null; copy: (text: string) => Promise<boolean> };

export function useClipboard(resetAfter = 1800): UseClipboardResult {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = useCallback(async (text: string) => {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) throw new Error("Clipboard access is unavailable.");
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setError(null);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setIsCopied(false), Math.max(0, resetAfter));
      return true;
    } catch (cause) {
      setIsCopied(false);
      setError(toError(cause));
      return false;
    }
  }, [resetAfter]);
  return { isCopied, error, copy };
}

function subscribeOnline(notify: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("online", notify);
  window.addEventListener("offline", notify);
  return () => {
    window.removeEventListener("online", notify);
    window.removeEventListener("offline", notify);
  };
}

function getOnlineSnapshot(): boolean {
  return typeof navigator === "undefined" ? true : navigator.onLine;
}

export function useOnlineStatus(): boolean {
  return useSyncExternalStore(subscribeOnline, getOnlineSnapshot, () => true);
}

export type UsePaginationResult<T> = {
  page: number;
  pageCount: number;
  currentItems: readonly T[];
  setPage: (next: number | ((page: number) => number)) => void;
  next: () => void;
  previous: () => void;
  canNext: boolean;
  canPrevious: boolean;
};

export function usePagination<T>(items: readonly T[], pageSize = 10): UsePaginationResult<T> {
  const safePageSize = Number.isFinite(pageSize) ? Math.max(1, Math.floor(pageSize)) : 10;
  const pageCount = Math.ceil(items.length / safePageSize);
  const [requestedPage, setRequestedPage] = useState(1);
  const page = pageCount === 0 ? 1 : Math.min(requestedPage, pageCount);
  const setPage = useCallback((next: number | ((page: number) => number)) => {
    setRequestedPage((current) => {
      const resolved = typeof next === "function" ? next(current) : next;
      return Math.max(1, Math.min(Number.isFinite(resolved) ? Math.floor(resolved) : 1, Math.max(1, pageCount)));
    });
  }, [pageCount]);
  const start = (page - 1) * safePageSize;
  return {
    page,
    pageCount,
    currentItems: items.slice(start, start + safePageSize),
    setPage,
    next: () => setPage((current) => current + 1),
    previous: () => setPage((current) => current - 1),
    canNext: page < pageCount,
    canPrevious: page > 1 && pageCount > 0,
  };
}

export function usePrevious<T>(value: T): T | undefined {
  const previous = useRef<T | undefined>(undefined);
  useEffect(() => { previous.current = value; }, [value]);
  return previous.current;
}

export type UseControllableStateOptions<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

export function useControllableState<T>({ value, defaultValue, onChange }: UseControllableStateOptions<T>): [T, Dispatch<SetStateAction<T>>, boolean] {
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = controlled ? value : internalValue;
  const setValue = useCallback<Dispatch<SetStateAction<T>>>((action) => {
    const next = typeof action === "function" ? (action as (previous: T) => T)(currentValue) : action;
    if (Object.is(next, currentValue)) return;
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  }, [controlled, currentValue, onChange]);
  return [currentValue, setValue, controlled];
}
