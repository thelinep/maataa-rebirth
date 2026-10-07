"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type {
  TabsRootProps,
  TabsListProps as BaseTabsListProps,
  TabsTabProps as BaseTabsTabProps,
  TabsPanelProps as BaseTabsPanelProps,
} from "@base-ui/react/tabs";

// "use client": Tabs is interactive (click/keyboard-driven tab switching
// via @base-ui/react), same rule as every other stateful primitive in this
// package -- see marketing-client.tsx's header comment. table.tsx stays
// server-safe because it renders no client behavior of its own; Tabs
// can't make that claim since @base-ui/react's TabsList/TabsTab attach
// event listeners and manage roving focus.

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

/**
 * Root props narrowed to @maataa/ui's plain-string `className` convention
 * -- every other primitive in this package takes `className?: string`,
 * never Base UI's own `string | ((state) => string)` form (see
 * `BaseUIComponentProps` in the installed @base-ui/react/internals/types)
 * -- while keeping Base UI's exact controlled contract as confirmed in the
 * installed @base-ui/react/tabs/root/TabsRoot.d.ts: `value`/`onValueChange`
 * (not e.g. `activeTab`/`onTabChange`). That's already the same
 * "everything is caller-controlled via props" contract `Table` and
 * `Select` follow, so no extra state-lifting wrapper is needed here.
 */
export interface TabsProps extends Omit<TabsRootProps, "className"> {
  className?: string;
}

/**
 * `Tabs` IS the styled `Tabs.Root` -- see `Tabs.List`/`Tabs.Tab`/
 * `Tabs.Panel` below, attached as static properties so call sites use
 * `Tabs.Root`-style JSX (`<Tabs><Tabs.List>...`), the same compound-
 * component shape `Wizard.*` uses (packages/maataa-ui/src/wizard/index.ts)
 * and the shape Base UI itself exports (`Tabs.Root`/`Tabs.List`/
 * `Tabs.Tab`/`Tabs.Panel`) -- deliberately not inventing new part names.
 */
function TabsRoot({ className, ...props }: TabsProps) {
  return <BaseTabs.Root className={classes("maataa-ui", "maataa-ui__tabs", className)} {...props} />;
}

export interface TabsListProps extends Omit<BaseTabsListProps, "className"> {
  className?: string;
}

/** Groups the tab buttons and renders `role="tablist"`. Base UI's
 * `TabsList` already implements the WAI-ARIA Tabs roving-tabindex /
 * arrow-key model itself (confirmed against the installed
 * tabs/list/TabsList.js) -- by default (`activateOnFocus` left at its
 * Base UI default of `false`) arrow keys move focus only, and Enter/Space
 * or a click activates the focused tab, matching the "manual activation"
 * variant of the WAI-ARIA Tabs pattern. This wrapper only adds class
 * names; it does not re-implement any of that behavior. */
function TabsListPart({ className, ...props }: TabsListProps) {
  return <BaseTabs.List className={classes("maataa-ui__tabs-list", className)} {...props} />;
}

export interface TabsTabProps extends Omit<BaseTabsTabProps, "className"> {
  className?: string;
}

/** One tab button, rendering `role="tab"`. Active styling in
 * `advanced.css` keys off `[data-active]` -- the attribute Base UI's
 * `TabsTab` sets on the selected tab (confirmed against the installed
 * tabs/tab/TabsTabDataAttributes.d.ts) -- rather than a class toggle
 * computed here. `aria-selected` and `aria-controls` are also set by Base
 * UI itself (confirmed in tabs/tab/TabsTab.js), so a screen reader gets
 * the correct selection state and tab/panel relationship with zero extra
 * wiring in this wrapper. */
function TabsTabPart({ className, ...props }: TabsTabProps) {
  return <BaseTabs.Tab className={classes("maataa-ui__tabs-tab", className)} {...props} />;
}

export interface TabsPanelProps extends Omit<BaseTabsPanelProps, "className"> {
  className?: string;
}

/** One tab's content, rendering `role="tabpanel"`. Base UI toggles the
 * native `hidden` attribute on an inactive panel by default (confirmed in
 * tabs/panel/TabsPanel.js -- it does not unmount the panel unless
 * `keepMounted` is explicitly set some other way), so an inactive panel is
 * genuinely hidden from assistive tech and layout via the browser's own UA
 * stylesheet; no extra CSS is required here for that part. */
function TabsPanelPart({ className, ...props }: TabsPanelProps) {
  return <BaseTabs.Panel className={classes("maataa-ui__tabs-panel", className)} {...props} />;
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsListPart,
  Tab: TabsTabPart,
  Panel: TabsPanelPart,
});
