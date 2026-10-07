"use client";

import type { ReactElement, ReactNode } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

/** Mirrors Base UI's own `Tooltip.Positioner` `side` prop/type exactly --
 * `'top' | 'bottom' | 'left' | 'right' | 'inline-end' | 'inline-start'`
 * (see node_modules/@base-ui/react/tooltip/positioner/TooltipPositioner.d.ts)
 * -- rather than a smaller hand-picked enum, so a caller can rely on Base
 * UI's own collision-aware flipping away from whichever side is
 * requested here. */
export type TooltipSide = NonNullable<BaseTooltip.Positioner.Props["side"]>;

export interface TooltipProps {
  /** The tooltip's own content, rendered inside the popup. The popup is
   * given `role="tooltip"` explicitly below (see this component's doc
   * comment for why that isn't automatic), so a screen reader's
   * accessible-name computation for that role reads exactly this
   * content. */
  content: ReactNode;
  /** The trigger element -- a single element (e.g. a `Button`), not a
   * fragment or bare string. Passed straight through as Base UI's
   * `render` prop on `Tooltip.Trigger` (Base UI's "asChild" equivalent):
   * Base UI clones it and merges the trigger's hover/focus/keyboard
   * handlers and ARIA/data attributes directly onto it, instead of
   * `Tooltip` wrapping it in a second, redundant interactive element. */
  children: ReactElement;
  /** Which side of the trigger the popup opens on. Base UI still flips it
   * to avoid viewport collisions -- this only sets the *preferred* side.
   * @default "top" */
  side?: TooltipSide;
  /** Applied to the popup itself, alongside `maataa-ui__tooltip`. */
  className?: string;
}

/**
 * A single `content` / `children` / `side` prop surface over Base UI's
 * Tooltip primitive -- the caller never sees Root, Trigger, Portal,
 * Positioner, Popup or Arrow, the same way `Select` (components.tsx)
 * hides the native `<select>`'s own complexity behind one simple prop
 * API.
 *
 * Deliberately *not* controlled the way `Table`/`Select` are (contrast
 * their "the caller owns all state" contract, per this package's
 * controlled-prop philosophy): a tooltip's open/closed state is
 * transient hover/focus-timing state, not application state a caller has
 * any reason to own or persist, so `Tooltip.Root` is left uncontrolled
 * here (no `open`/`onOpenChange` passed) and Base UI's own pointer and
 * keyboard logic -- hover-rest delay, focus-visible detection,
 * Escape-to-dismiss -- runs unmodified, the same reasoning that leaves
 * `<details>` to own its own open state in `Disclosure` (marketing.tsx).
 *
 * `role="tooltip"` is set explicitly on the popup rather than relied on
 * as a Base UI default: reading the installed `@base-ui/react@1.8.0`
 * source (tooltip/popup/TooltipPopup.js and tooltip/root/TooltipRoot.js)
 * shows this version assigns the popup no role -- and no
 * `aria-describedby` link back to the trigger -- itself, unlike its
 * Popover (popover/popup/PopoverPopup.js does set `aria-describedby`).
 * Passing `role="tooltip"` here lands in `TooltipPopup`'s own
 * `elementProps` spread (the last, and so highest-priority, entry in its
 * internal `useRenderElement` props list), so it reliably reaches the
 * rendered `<div>` and gives the popup the accessible role every
 * consumer and test in this package expects from a tooltip.
 */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner className="maataa-ui__tooltip-positioner" side={side} sideOffset={8}>
          <BaseTooltip.Popup role="tooltip" className={classes("maataa-ui", "maataa-ui__tooltip", className)}>
            {content}
            <BaseTooltip.Arrow className="maataa-ui__tooltip-arrow" />
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
