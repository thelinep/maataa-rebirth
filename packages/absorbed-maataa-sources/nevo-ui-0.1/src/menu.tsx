"use client";

import type { ComponentProps, ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";

// "use client": Menu is interactive (click/hover/keyboard-driven
// open/close and roving highlight via @base-ui/react), same rule as
// every other stateful primitive in this package.

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export type MenuSide = NonNullable<ComponentProps<typeof BaseMenu.Positioner>["side"]>;
export type MenuAlign = ComponentProps<typeof BaseMenu.Positioner>["align"];

/**
 * `Menu` IS `Menu.Root` -- mirrors Base UI's own `Menu.Root`/`.Trigger`/
 * `.Popup` (this wrapper's own composed part, see `MenuPopupPart` below)/
 * `.Item`/`.Group`/`.GroupLabel` naming, the same "don't invent new part
 * names" rule `Tabs`/`Accordion` follow. `Menu.Root` renders no DOM
 * element of its own ("Doesn't render its own HTML element", confirmed in
 * menu/root/MenuRoot.d.ts) -- it's a controller/context provider only, so
 * unlike `Tabs`/`Accordion`'s Root this wrapper adds no `className` of
 * its own to pass through.
 *
 * Deliberately uncontrolled by default, same reasoning as `Tooltip` (see
 * tooltip.tsx's doc comment): a menu's open/closed state is almost always
 * transient interaction state, not application state a caller needs to
 * own. `open`/`onOpenChange` are still accepted here (passed straight
 * through to `Menu.Root`, both optional per menu/root/MenuRoot.d.ts) for
 * the cases that do need it -- e.g. closing the menu after a successful
 * async action started from one of its own items.
 */
function MenuRoot(props: ComponentProps<typeof BaseMenu.Root>) {
  return <BaseMenu.Root {...props} />;
}

export interface MenuTriggerProps extends Omit<ComponentProps<typeof BaseMenu.Trigger>, "className"> {
  className?: string;
}

/** Opens the menu. Renders a real `<button>` (menu/trigger/
 * MenuTrigger.d.ts) with `aria-haspopup`/`aria-expanded` wired by Base UI
 * itself. */
function MenuTriggerPart({ className, ...props }: MenuTriggerProps) {
  return <BaseMenu.Trigger className={classes("maataa-ui__menu-trigger", className)} {...props} />;
}

export interface MenuPopupProps {
  children?: ReactNode;
  /** Applied to the popup itself, alongside `maataa-ui__menu`. */
  className?: string;
  /** Which side of the trigger the popup opens on -- passed to
   * `Menu.Positioner`'s own `side` prop (menu/positioner/
   * MenuPositioner.d.ts), same collision-aware flipping `Tooltip`'s
   * `side` prop documents. @default "bottom" */
  side?: MenuSide;
  /** Base UI's own root-menu default is `"center"` (menu/positioner/
   * MenuPositioner.d.ts); overridden here to `"start"` to match the
   * left-aligned shape most of this app's own menus (row actions, nav
   * overflow) want -- still fully overridable per call site.
   * @default "start" */
  align?: MenuAlign;
}

/**
 * The menu's visible surface -- wraps Base UI's `Menu.Portal` >
 * `Menu.Positioner` > `Menu.Popup` (+ `Menu.Arrow`) the same way
 * `Tooltip` wraps its own Portal/Positioner/Popup/Arrow internally (see
 * tooltip.tsx), so a caller composing `Menu.Item`s never has to touch
 * positioning plumbing directly. Unlike `Tooltip`, a menu's content is a
 * variable list the caller assembles from `Menu.Item`/`Menu.Group`/
 * `Menu.GroupLabel`, not a single fixed `content` prop -- so this part
 * takes `children`, not `content`, and is exposed as its own named part
 * rather than folded invisibly into `Menu` the way Tooltip's plumbing is.
 */
function MenuPopupPart({ children, className, side = "bottom", align = "start" }: MenuPopupProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner className="maataa-ui__menu-positioner" side={side} align={align} sideOffset={4}>
        <BaseMenu.Popup className={classes("maataa-ui", "maataa-ui__menu", className)}>
          <BaseMenu.Arrow className="maataa-ui__menu-arrow" />
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export interface MenuItemProps extends Omit<ComponentProps<typeof BaseMenu.Item>, "className"> {
  className?: string;
}

/** One selectable row (`menu/item/MenuItem.d.ts`). `closeOnClick`
 * defaults to `true` there, so a plain item click closes the menu without
 * this wrapper adding any logic of its own for it. Roving highlight is
 * Base UI's own list-navigation state, exposed as `[data-highlighted]` --
 * not a class computed here -- which `advanced.css` keys hover/keyboard-
 * focus styling off of, the same `[data-...]`-over-computed-class rule
 * `Combobox`'s own item styling already follows. */
function MenuItemPart({ className, ...props }: MenuItemProps) {
  return <BaseMenu.Item className={classes("maataa-ui__menu-item", className)} {...props} />;
}

export interface MenuGroupProps extends Omit<ComponentProps<typeof BaseMenu.Group>, "className"> {
  className?: string;
}

/** Groups related items with their `GroupLabel`. Renders a `<div>`
 * (menu/group/MenuGroup.d.ts). */
function MenuGroupPart({ className, ...props }: MenuGroupProps) {
  return <BaseMenu.Group className={classes("maataa-ui__menu-group", className)} {...props} />;
}

export interface MenuGroupLabelProps extends Omit<ComponentProps<typeof BaseMenu.GroupLabel>, "className"> {
  className?: string;
}

/** An accessible label automatically associated with the enclosing
 * `Menu.Group` (menu/group-label/MenuGroupLabel.d.ts) -- not just visual
 * text, so a screen reader announces the group's name on entering it. */
function MenuGroupLabelPart({ className, ...props }: MenuGroupLabelProps) {
  return <BaseMenu.GroupLabel className={classes("maataa-ui__menu-group-label", className)} {...props} />;
}

export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTriggerPart,
  Popup: MenuPopupPart,
  Item: MenuItemPart,
  Group: MenuGroupPart,
  GroupLabel: MenuGroupLabelPart,
});
