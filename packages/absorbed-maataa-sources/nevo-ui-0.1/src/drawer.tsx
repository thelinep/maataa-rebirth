"use client";

import type { ComponentProps, ReactNode } from "react";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

/** Which edge the drawer slides in from. Named `side` to match `Tooltip`'s
 * own `side` prop vocabulary (tooltip.tsx) rather than Base UI's own
 * `swipeDirection` naming -- mapped to it below via `SWIPE_DIRECTION`. */
export type DrawerSide = "bottom" | "top" | "left" | "right";

type PopupProps = ComponentProps<typeof BaseDrawer.Popup>;

export interface DrawerProps {
  /** Whether the drawer is currently open. Controlled-only, same
   * reasoning as `Modal` (modal.tsx): no `Drawer.Trigger` child is
   * rendered, so any caller-owned control can open it. */
  open: boolean;
  /** Fired whenever Base UI wants the open state to change -- a backdrop
   * or outside press, Escape, or the built-in close button all funnel
   * through here. */
  onOpenChange(open: boolean): void;
  /** Rendered as `Drawer.Title` (a real `<h2>`) and wired as the popup's
   * `aria-labelledby` target -- required for the same reason `Modal.title`
   * is (an untitled dialog has no accessible name). */
  title: ReactNode;
  /** Rendered as `Drawer.Description` (a `<p>`) and wired as the popup's
   * `aria-describedby` target. Omit when the title alone is enough. */
  description?: ReactNode;
  children?: ReactNode;
  /** Applied to the popup element, not the backdrop or portal. */
  className?: string;
  /** Accessible label for the built-in close button. @default "Close" */
  closeLabel?: string;
  /**
   * Which edge the drawer slides in from -- mapped to Base UI's
   * `Drawer.Root` `swipeDirection` prop (confirmed in
   * drawer/root/DrawerRootContext.d.ts: `'up' | 'down' | 'left' |
   * 'right'`) via `SWIPE_DIRECTION` below, and also applied as a
   * `maataa-ui__drawer--{side}` modifier class that `advanced.css` uses
   * for the actual fixed-position placement and slide transform --
   * `swipeDirection` only controls which way a drag gesture dismisses the
   * drawer, it doesn't position anything itself.
   * @default "bottom"
   */
  side?: DrawerSide;
  /** `false` renders a non-modal drawer (background stays interactive, no
   * scroll lock); `"trap-focus"` traps focus without locking scroll.
   * Passed straight through to `Drawer.Root`'s `modal` prop.
   * @default true */
  modal?: boolean | "trap-focus";
  initialFocus?: PopupProps["initialFocus"];
  finalFocus?: PopupProps["finalFocus"];
}

const SWIPE_DIRECTION: Record<DrawerSide, "up" | "down" | "left" | "right"> = {
  bottom: "down",
  top: "up",
  left: "left",
  right: "right",
};

/**
 * A sliding-panel dialog composed from `@base-ui/react`'s `Drawer`
 * primitives -- the same controlled-only `open`/`onOpenChange` contract
 * as `Modal` (see modal.tsx's own doc comment for the full reasoning:
 * Drawer, like Modal, renders no trigger of its own), plus a `side` prop
 * `Modal` has no equivalent of because a centered dialog has no edge to
 * slide in from. Base UI's `Drawer.Root` (drawer/root/DrawerRoot.d.ts)
 * already traps focus, restores it on close, and supports drag-to-dismiss
 * swipe gestures along whichever `swipeDirection` is set -- this
 * wrapper's job is limited to wiring `open`/`onOpenChange`/`side`
 * correctly and leaving that behavior unmodified, same reasoning as
 * `Modal`'s own doc comment. Snap points and the drag handle/swipe-area
 * parts (drawer/root/useDrawerSnapPoints.d.ts, drawer/handle.d.ts) are
 * deliberately not exposed here -- a first pass covering the common
 * "slide-in panel" shape, matching how `Tooltip` doesn't expose every
 * Base UI Tooltip prop either.
 */
export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  closeLabel = "Close",
  side = "bottom",
  modal = true,
  initialFocus,
  finalFocus,
}: DrawerProps) {
  return (
    <BaseDrawer.Root open={open} onOpenChange={nextOpen => onOpenChange(nextOpen)} swipeDirection={SWIPE_DIRECTION[side]} modal={modal}>
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="maataa-ui__drawer-backdrop" />
        <BaseDrawer.Popup
          className={classes("maataa-ui", "maataa-ui__drawer", `maataa-ui__drawer--${side}`, className)}
          initialFocus={initialFocus}
          finalFocus={finalFocus}
        >
          <div className="maataa-ui__drawer-header">
            <BaseDrawer.Title className="maataa-ui__drawer-title">{title}</BaseDrawer.Title>
            {/* A real, focusable close control, same reasoning as Modal's
             * own close button (see modal.tsx) -- not just an Escape/
             * outside-press affordance. */}
            <BaseDrawer.Close aria-label={closeLabel} className="maataa-ui__drawer-close">
              <span aria-hidden="true">×</span>
            </BaseDrawer.Close>
          </div>
          {description ? <BaseDrawer.Description className="maataa-ui__drawer-description">{description}</BaseDrawer.Description> : null}
          <div className="maataa-ui__drawer-body">{children}</div>
        </BaseDrawer.Popup>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
