"use client";

import { parseRuntimeCommand } from "@maataa/runtime-intelligence";
import { searchRuntime } from "@maataa/runtime-search";
import { useMemo, useState } from "react";

export function RuntimeSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const command = useMemo(() => parseRuntimeCommand(query), [query]);
  const results = useMemo(() => {
    return searchRuntime(query, undefined, query.trim() ? 8 : 6);
  }, [query]);

  return (
    <div className="runtime-search" onBlur={() => window.setTimeout(() => setFocused(false), 120)} onFocus={() => setFocused(true)}>
      <label className="sr-only" htmlFor="runtime-search">
        Search Vaigyaaniq
      </label>
      <input id="runtime-search" type="search" value={query} placeholder="Search" onChange={(event) => setQuery(event.target.value)} />
      {focused ? (
        <div className="runtime-search-results" role="listbox" aria-label="Search results">
          {query.trim() && command.href ? (
            <a href={command.href}>
              <span>{command.label}</span>
              <small>quick action</small>
            </a>
          ) : null}
          {results.map((item) => (
            <a href={item.href} key={`${item.id}-${item.href}`}>
              <span>{item.title}</span>
              <small>{item.kind}</small>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
