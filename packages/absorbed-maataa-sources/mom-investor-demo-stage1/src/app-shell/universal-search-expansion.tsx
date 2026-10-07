"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent
} from "react";
import { Search, X } from "lucide-react";

export type UniversalSearchResult = {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly href?: string;
  readonly onSelect?: () => void;
  readonly badge?: string;
};

export type UniversalSearchExpansionProps = {
  /** Synchronous result fetcher. Return [] for no results. Async via useEffect upstream. */
  readonly getResults: (query: string) => ReadonlyArray<UniversalSearchResult>;
  /** Placeholder for the input. */
  readonly placeholder?: string;
  /** Optional initial state. */
  readonly initialOpen?: boolean;
  /** Triggered on Enter when no result is selected. */
  readonly onSubmit?: (query: string) => void;
  /** Optional accessible label. */
  readonly label?: string;
  /** Optional className for the root wrapper. */
  readonly className?: string;
  /** Debounce delay before re-querying. Default 120ms. */
  readonly debounceMs?: number;
};

/**
 * UniversalSearchExpansion — expandable search input + result list.
 *
 * Collapsed: shows an icon-only button. Expanded: full search box + dropdown
 * result list with keyboard navigation (ArrowDown/Up to traverse, Enter to
 * select, Escape to collapse).
 *
 * PHKD: results are entirely driven by the consumer's getResults() — this
 * component never invents matches. Empty queries return [] by default.
 * "No results" is rendered as an honest empty state, not silently hidden.
 */
export function UniversalSearchExpansion({
  getResults,
  placeholder = "Search the runtime…",
  initialOpen = false,
  onSubmit,
  label = "Universal search",
  className,
  debounceMs = 120
}: UniversalSearchExpansionProps) {
  const [open, setOpen] = useState(initialOpen);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  /* Debounce query updates so getResults isn't called on every keystroke. */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), debounceMs);
    return () => clearTimeout(t);
  }, [query, debounceMs]);

  /* Focus input when expanding. */
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /* Reset active index when results change. */
  const results = debouncedQuery ? getResults(debouncedQuery) : [];
  useEffect(() => {
    setActiveIndex(results.length > 0 ? 0 : -1);
  }, [debouncedQuery, results.length]);

  /* Close on Escape (anywhere). */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const selectResult = useCallback((r: UniversalSearchResult) => {
    if (r.onSelect) {
      r.onSelect();
    } else if (r.href) {
      if (typeof window !== "undefined") window.location.href = r.href;
    }
    setOpen(false);
    setQuery("");
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % Math.max(1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + Math.max(1, results.length)) % Math.max(1, results.length));
    } else if (e.key === "Enter") {
      const r = results[activeIndex];
      if (r) {
        e.preventDefault();
        selectResult(r);
      } else if (onSubmit && query.trim().length > 0) {
        e.preventDefault();
        onSubmit(query.trim());
        setOpen(false);
        setQuery("");
      }
    }
  };

  return (
    <div className={"relative inline-block " + (className ?? "")}>
      {open ? (
        <div
          role="search"
          aria-label={label}
          className={
            "flex items-center gap-2 rounded-xl border px-3 py-1.5 " +
            "border-[color:var(--runtime-border)] bg-[color:var(--runtime-panel)]"
          }
        >
          <Search size={14} className="text-[color:var(--runtime-muted)]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={onChange}
            onKeyDown={onInputKey}
            placeholder={placeholder}
            aria-label={label}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? listId + "-item-" + activeIndex : undefined}
            className={
              "bg-transparent text-sm text-[color:var(--runtime-ink)] " +
              "placeholder:text-[color:var(--runtime-muted)] outline-none w-72"
            }
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={() => { setOpen(false); setQuery(""); }}
            className="text-[color:var(--runtime-muted)] hover:text-[color:var(--runtime-ink)]"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          aria-label={label}
          onClick={() => setOpen(true)}
          className={
            "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm " +
            "border-[color:var(--runtime-border)] bg-[color:var(--runtime-panel)] " +
            "text-[color:var(--runtime-muted)] hover:text-[color:var(--runtime-ink)] " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--runtime-accent)]"
          }
        >
          <Search size={14} aria-hidden="true" />
          <span>Search</span>
        </button>
      )}

      {open && debouncedQuery && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label + " results"}
          className={
            "absolute left-0 top-[calc(100%+6px)] z-50 min-w-full max-w-[480px] max-h-[60vh] overflow-auto " +
            "rounded-xl border border-[color:var(--runtime-border)] bg-[color:var(--runtime-panel)] " +
            "p-2 shadow-xl backdrop-blur"
          }
        >
          {results.length === 0 ? (
            <li className="px-3 py-2 text-sm text-[color:var(--runtime-muted)]" role="option" aria-selected="false">
              No results for "{debouncedQuery}".
            </li>
          ) : (
            results.map((r, i) => (
              <li
                key={r.id}
                id={listId + "-item-" + i}
                role="option"
                aria-selected={i === activeIndex}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectResult(r);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={
                  "flex items-start gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer " +
                  (i === activeIndex
                    ? "bg-[color:var(--runtime-bg)] "
                    : "hover:bg-[color:var(--runtime-bg)] ")
                }
              >
                <div className="flex-1">
                  <div className="text-[color:var(--runtime-ink)]">{r.title}</div>
                  {r.subtitle ? (
                    <div className="text-xs text-[color:var(--runtime-muted)] mt-[2px]">{r.subtitle}</div>
                  ) : null}
                </div>
                {r.badge ? (
                  <span className="shrink-0 rounded-full border border-[color:var(--runtime-border)] px-2 py-[1px] text-[10px] uppercase tracking-wider text-[color:var(--runtime-muted)]">
                    {r.badge}
                  </span>
                ) : null}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
