# MAATAA UI hooks

The shared utility hooks below are available from the package root and from
`@maataa/ui/hooks`. They do not require a provider.

```tsx
import { useOutsideClick, useMediaQuery, useLocalStorage } from "@maataa/ui/hooks";
```

| Hook | Purpose |
| --- | --- |
| `useOutsideClick(ref, callback, enabled?)` | Detect pointer presses outside an element. |
| `useEscapeKey(callback, options?)` | Subscribe to Escape key presses. |
| `useMediaQuery(query, serverMatches?)` | Subscribe to a CSS media query; `serverMatches` defaults to `false`. |
| `useAutoHideNavbar(options?)` | Hide on downward scroll and reveal on upward scroll; stays visible at the top and when reduced motion is requested. |
| `useResizeObserver(options?)` | Get a callback ref, element width/height, and observer entry. |
| `useIntersectionObserver(options?)` | Get a callback ref, intersection state, and observer entry. |
| `useLocalStorage(key, initialValue)` | Persist typed state in local storage; returns `{ value, setValue, remove, error }`. |
| `useSessionStorage(key, initialValue)` | Persist typed state for the current browser session. |
| `useDebounce(value, delay?)` | Return a delayed value; delay defaults to 300ms. |
| `useClipboard(resetAfter?)` | Copy text and expose `{ isCopied, error, copy }`. |
| `useOnlineStatus()` | Track the browser's online/offline state. |
| `usePagination(items, pageSize?)` | Paginate a list; page size defaults to 10. |
| `usePrevious(value)` | Read the previous committed value (initially `undefined`). |
| `useControllableState({ value, defaultValue, onChange })` | Share controlled/uncontrolled state logic. |
| `useScrollBackToTop(options?)` | Track a scroll threshold and return a scroll-to-top action. |

Browser APIs are read inside effects or external-store snapshots with server fallbacks. Observer hooks return zero dimensions or a non-intersecting state when the corresponding browser observer is unavailable. Storage hooks keep in-memory state usable when browser storage is blocked and report write/remove failures through `error`.
