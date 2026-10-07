"use client";

import { Toast } from "@base-ui/react/toast";
import type {
  ToastManager,
  ToastManagerAddOptions,
  ToastManagerPromiseOptions,
  ToastManagerUpdateOptions,
  ToastObject,
  UseToastManagerReturnValue,
} from "@base-ui/react/toast";
import type { ReactNode } from "react";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

/* ---------- provider ---------- */

/**
 * Thin wrapper over Base UI's `Toast.Provider` -- kept as its own named
 * export (rather than re-exporting `Toast.Provider` directly) so callers
 * only ever import from `@maataa/ui`, never reach for `@base-ui/react`
 * themselves, matching how the rest of this package hides its vendor
 * dependencies (e.g. maplibre-gl behind `Map`). Must wrap the tree once,
 * near the root -- both `Toaster` and `useToast` read this context, and
 * neither renders or does anything meaningful without it.
 */
export function ToastProvider({ children, timeout, limit, toastManager }: {
  children?: ReactNode;
  /** Default auto-dismiss delay in ms for a toast that doesn't set its
   * own `timeout`. `0` disables auto-dismiss. @default 5000 */
  timeout?: number;
  /** Max toasts visible at once; older ones are marked `limited` (see
   * Base UI's `data-limited`) rather than dropped, so `Toaster` can still
   * choose to render or animate them out. @default 3 */
  limit?: number;
  /** Only needed to raise toasts from outside React (e.g. a non-component
   * module) via Base UI's own `createToastManager()`. Most callers never
   * pass this -- `useToast()` inside a component is the normal path. */
  toastManager?: ToastManager;
}) {
  return (
    <Toast.Provider timeout={timeout} limit={limit} toastManager={toastManager}>
      {children}
    </Toast.Provider>
  );
}

/* ---------- toaster (renders the live toasts) ---------- */

export interface ToasterProps {
  className?: string;
}

/**
 * Mounts the toast viewport exactly once (typically near the root, next to
 * `ToastProvider`) and renders every active toast from `useToastManager()`
 * into it. A host app raises toasts from anywhere with `useToast().add(...)`
 * -- it never renders toast markup itself, the same controlled-by-props
 * split as the rest of this package, just with the "state" living in Base
 * UI's own manager instead of caller-owned React state, since the whole
 * point of a toast queue (stacking, auto-dismiss timers, swipe-to-dismiss)
 * is easiest to get right once, in one place, rather than re-derived by
 * every consumer.
 *
 * `Toast.Portal` moves the viewport to `<body>` so a toast raised from deep
 * in a form (e.g. inside a `<dialog>` or a scrollable panel) still stacks
 * above everything and isn't clipped by an ancestor's `overflow: hidden`.
 */
export function Toaster({ className }: ToasterProps) {
  return (
    <Toast.Portal>
      <Toast.Viewport className={classes("maataa-ui", "maataa-ui__toast-viewport", className)}>
        <ToastList />
      </Toast.Viewport>
    </Toast.Portal>
  );
}

function ToastList() {
  const { toasts, close } = useToast();
  return (
    <>
      {toasts.map(toast => (
        <Toast.Root
          key={toast.id}
          toast={toast}
          className={classes("maataa-ui__toast", toast.type && `maataa-ui__toast--${toast.type}`)}
        >
          {/* Title is optional per Base UI (a toast can be description-only),
           * so it's only rendered when set -- an empty <h2> would otherwise
           * still satisfy the root's aria-labelledby, but with no content
           * for it to announce. */}
          {toast.title ? <Toast.Title className="maataa-ui__toast-title">{toast.title}</Toast.Title> : null}
          {toast.description ? <Toast.Description className="maataa-ui__toast-description">{toast.description}</Toast.Description> : null}
          {/* Base UI's Toast.Close is hidden from the accessibility tree for
           * ordinary toasts. A native labelled button preserves a keyboard
           * and screen-reader dismissal path while still delegating queue
           * state to the provider-owned toast manager. */}
          <button type="button" className="maataa-ui__toast-close" aria-label="Dismiss notification" onClick={() => close(toast.id)}>
            ×
          </button>
        </Toast.Root>
      ))}
    </>
  );
}

/* ---------- useToast ---------- */

/** Default toast data shape when a caller doesn't supply its own `Data`
 * generic. Base UI's own `useToastManager` defaults this to `any`; every
 * other typed surface in this package avoids `any` under `strict`, so
 * `useToast` narrows the default to an empty-ish object instead and lets a
 * caller still opt into a richer `Data` type via `useToast<MyData>()`. */
export type ToastData = Record<string, unknown>;

export interface UseToastResult<Data extends object = ToastData> extends UseToastManagerReturnValue<Data> {}

/**
 * Thin, typed wrapper over Base UI's `useToastManager()` -- same shape
 * (`toasts`/`add`/`close`/`update`/`promise`), just re-exported under this
 * package's own name so `@base-ui/react` stays an implementation detail.
 * Must be called from a component rendered under `ToastProvider`.
 */
export function useToast<Data extends object = ToastData>(): UseToastResult<Data> {
  return Toast.useToastManager<Data>();
}

export type {
  ToastManagerAddOptions,
  ToastManagerPromiseOptions,
  ToastManagerUpdateOptions,
  ToastObject,
  UseToastManagerReturnValue,
};
