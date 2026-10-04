# Redux Toolkit demo architecture

Alpha 7 adds an **optional, host-neutral Redux Toolkit layer** under `@maataa/ui/redux`. It exists to make demos and consumer prototypes stateful without moving backend authority into the UI package.

## Store slices

`session`, `ui`, `navigation`, `workspace`, `page`, `layout`, `registry`, `device`, `generator`, `tool`, `ai`, `notification`, `command`, `form`, `data`, and `demo`.

The scenario listener synchronizes a selected demo scenario to its canonical workspace, page, layout and device IDs. Static catalogs remain the source for demo entities; Redux stores interaction state, selections, open panels, execution simulations, and demo runtime state.

## Imports

```ts
import { createMaataaStore } from "@maataa/ui/redux";
import { workspaceActions } from "@maataa/ui/redux/slices/workspaceSlice";
import { selectFilteredPages } from "@maataa/ui/redux/selectors/registrySelectors";
```

React consumers can use `MaataaReduxProvider`, `useMaataaDispatch`, `useMaataaSelector`, and `useMaataaStore` from `@maataa/ui/redux`.

**Boundary:** authentication, authorization, persistence, real tool/model execution, databases and APIs remain host concerns. Demo credentials and execution results are explicitly fake/static.
