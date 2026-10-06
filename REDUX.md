# Redux Toolkit demo architecture

MAATAA UI provides an **optional, host-neutral Redux Toolkit layer** under `@maataa/ui/redux`. It makes demos and consumer prototypes stateful without moving backend authority into the UI package.

## Store slices

The store mounts 26 registered slices: `session`, `ui`, `navigation`, `workspace`, `page`, `layout`, `registry`, `device`, `generator`, `tool`, `ai`, `notification`, `command`, `form`, `data`, `demo`, `builder`, `project`, `event`, `vendor`, `booking`, `finance`, `task`, `production`, `activity`, and `evaluation`. All 52 registered selectors are exported through `@maataa/ui/redux/selectors`.

The scenario listener synchronizes canonical workspace, page, layout, device, generator, tool, and AI-space selections. Switching to a scenario without an optional generator, tool, or AI space clears the prior scenario's selection. Registry selectors filter all seven canonical catalogs by trimmed text and their supported group fields, and memoize results until a filter changes.

Static catalogs remain the source for demo entities; Redux stores interaction state, selections, open panels, local execution simulations, and demo runtime state. Set `persist: true` when creating the store to opt into browser-local persistence for the UI, workspace, page, layout, device, and composition-builder slices. Composition data is validated when loaded. Host authentication, authorization, server persistence, real tool/model execution, databases, and APIs remain host concerns.

The project, event, vendor, booking, finance, task, production, activity, and evaluation slices hold only read-only fixture-backed collection UI state: search, facet, selection, and view mode. Their rows remain in `src/static-data`; these slices do not create or approve business records.

## Imports

```ts
import { createMaataaStore } from "@maataa/ui/redux";
import { workspaceActions } from "@maataa/ui/redux/slices/workspaceSlice";
import { selectFilteredPages } from "@maataa/ui/redux/selectors/registrySelectors";
```

React consumers can use `MaataaReduxProvider`, `useMaataaDispatch`, `useMaataaSelector`, and `useMaataaStore` from `@maataa/ui/redux`.

**Boundary:** the session slice and execution records are demo interaction state; they do not provide authentication, authorization, a remote persistence guarantee, or real tool/model execution. Demo credentials and execution results are explicitly fake/static.
