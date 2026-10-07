"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type {
  AccordionRootProps as BaseAccordionRootProps,
  AccordionItemProps as BaseAccordionItemProps,
  AccordionHeaderProps as BaseAccordionHeaderProps,
  AccordionTriggerProps as BaseAccordionTriggerProps,
  AccordionPanelProps as BaseAccordionPanelProps,
} from "@base-ui/react/accordion";

// "use client": Accordion is interactive (click/keyboard-driven expand/
// collapse via @base-ui/react), same rule as every other stateful
// primitive in this package -- see tabs.tsx's own header comment.

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

/**
 * Root props narrowed to @maataa/ui's plain-string `className` convention
 * (see tabs.tsx's own comment on why -- Base UI's own `className` also
 * accepts a `(state) => string` function this package never uses). Base
 * UI's controlled contract itself is kept exactly as installed
 * (@base-ui/react/accordion/root/AccordionRoot.d.ts): `value`/
 * `onValueChange`, where `value` is an ARRAY of the currently-expanded
 * items' own `value`s, not a single boolean/string -- `multiple` (default
 * `false`) decides whether more than one of those can be expanded at
 * once. A single-expand accordion is still this same array contract with
 * `multiple={false}` (Base UI closes the previous item itself when a new
 * one opens), not a different prop shape, so this wrapper adds no
 * separate single-value convenience prop to keep in sync with Base UI's.
 */
export interface AccordionProps extends Omit<BaseAccordionRootProps, "className"> {
  className?: string;
}

/**
 * `Accordion` IS the styled `Accordion.Root` -- `Item`/`Header`/
 * `Trigger`/`Panel` are attached as static properties below, the same
 * compound shape `Tabs` uses (tabs.tsx) and the shape Base UI itself
 * exports (`Accordion.Root`/`.Item`/`.Header`/`.Trigger`/`.Panel`),
 * deliberately not inventing new part names.
 */
function AccordionRoot({ className, ...props }: AccordionProps) {
  return <BaseAccordion.Root className={classes("maataa-ui", "maataa-ui__accordion", className)} {...props} />;
}

export interface AccordionItemProps extends Omit<BaseAccordionItemProps, "className"> {
  className?: string;
}

/** Groups one header+trigger with its panel. Renders a `<div>` with no
 * accessible role of its own -- the roles that matter (`button` on
 * `Trigger`'s native `<button>`, the collapsible region on `Panel`) live
 * on its children (confirmed against the installed
 * accordion/item/AccordionItem.d.ts). */
function AccordionItemPart({ className, ...props }: AccordionItemProps) {
  return <BaseAccordion.Item className={classes("maataa-ui__accordion-item", className)} {...props} />;
}

export interface AccordionHeaderProps extends Omit<BaseAccordionHeaderProps, "className"> {
  className?: string;
}

/** Renders a real `<h3>` wrapping the `Trigger` button -- Base UI's own
 * default (accordion/header/AccordionHeader.d.ts) -- so each item's
 * trigger is discoverable as a heading, matching the WAI-ARIA Accordion
 * pattern's recommended `<h3><button>...</button></h3>` structure. */
function AccordionHeaderPart({ className, ...props }: AccordionHeaderProps) {
  return <BaseAccordion.Header className={classes("maataa-ui__accordion-header", className)} {...props} />;
}

export interface AccordionTriggerProps extends Omit<BaseAccordionTriggerProps, "className"> {
  className?: string;
}

/** The clickable control that expands/collapses its `Item`'s `Panel`.
 * Renders a real `<button>` (accordion/trigger/AccordionTrigger.d.ts)
 * with `aria-expanded`/`aria-controls` wired by Base UI itself, and
 * `[data-panel-open]` set on the trigger element specifically -- not the
 * `[data-open]` its sibling Item/Header/Panel get (confirmed by reading
 * the installed accordion/trigger/AccordionTrigger.js, which uses
 * `triggerOpenStateMapping` rather than the shared
 * `accordionStateAttributesMapping` the other parts use). `advanced.css`
 * keys the chevron rotation off that attribute rather than a class toggle
 * computed here, the same `[data-...]`-over-computed-class rule `Tabs`'
 * active-tab styling follows. */
function AccordionTriggerPart({ className, children, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger className={classes("maataa-ui__accordion-trigger", className)} {...props}>
      <span className="maataa-ui__accordion-trigger-label">{children}</span>
      <svg aria-hidden="true" className="maataa-ui__accordion-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </BaseAccordion.Trigger>
  );
}

export interface AccordionPanelProps extends Omit<BaseAccordionPanelProps, "className"> {
  className?: string;
}

/** The collapsible region revealed by `Trigger`. `keepMounted` defaults
 * to `false` (accordion/root/AccordionRoot.d.ts), so a closed panel is
 * removed from the DOM entirely rather than merely hidden -- genuinely
 * unreachable to assistive tech and to `getByText`-style queries alike,
 * with no extra wiring needed here for that. */
function AccordionPanelPart({ className, ...props }: AccordionPanelProps) {
  return <BaseAccordion.Panel className={classes("maataa-ui__accordion-panel", className)} {...props} />;
}

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItemPart,
  Header: AccordionHeaderPart,
  Trigger: AccordionTriggerPart,
  Panel: AccordionPanelPart,
});
