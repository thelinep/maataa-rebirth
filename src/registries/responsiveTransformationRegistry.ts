export type ResponsiveTransformationDefinition = Readonly<{ id:string; name:string; from:string; to:string; condition:string; operation?:"sidebar-drawer"|"inspector-sheet"|"navigation-bottom"|"grid-stack" }>;

export const RESPONSIVE_TRANSFORMATION_REGISTRY: readonly ResponsiveTransformationDefinition[] = [
  {
    "id": "RESPONSIVE.SIDEBAR_TO_DRAWER",
    "name": "Sidebar To Drawer",
    "from": "Sidebar",
    "to": "Drawer",
    "condition": "tablet-and-below",
    "operation": "sidebar-drawer"
  },
  {
    "id": "RESPONSIVE.INSPECTOR_TO_BOTTOM_SHEET",
    "name": "Inspector To Bottom Sheet",
    "from": "Inspector",
    "to": "BottomSheet",
    "condition": "mobile",
    "operation": "inspector-sheet"
  },
  {
    "id": "RESPONSIVE.TOP_NAV_TO_BOTTOM_NAV",
    "name": "Top Nav To Bottom Nav",
    "from": "TopNav",
    "to": "BottomNavigation",
    "condition": "mobile",
    "operation": "navigation-bottom"
  },
  {
    "id": "RESPONSIVE.GRID_TO_STACK",
    "name": "Grid To Stack",
    "from": "Grid",
    "to": "Stack",
    "condition": "mobile",
    "operation": "grid-stack"
  },
  {
    "id": "RESPONSIVE.MASTER_DETAIL_TO_ROUTES",
    "name": "Master Detail To Routes",
    "from": "MasterDetail",
    "to": "SeparateRoutes",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.TABLE_TO_CARDS",
    "name": "Table To Cards",
    "from": "DataTable",
    "to": "CardList",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.TOOLBAR_TO_OVERFLOW",
    "name": "Toolbar To Overflow",
    "from": "Toolbar",
    "to": "OverflowMenu",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.FILTERS_TO_DRAWER",
    "name": "Filters To Drawer",
    "from": "FilterBar",
    "to": "Drawer",
    "condition": "tablet-and-below"
  },
  {
    "id": "RESPONSIVE.DIALOG_TO_FULLSCREEN",
    "name": "Dialog To Fullscreen",
    "from": "Dialog",
    "to": "FullscreenDialog",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.MULTIPANE_TO_SINGLE",
    "name": "Multipane To Single",
    "from": "MultiPane",
    "to": "SinglePane",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.HOVER_TO_TAP",
    "name": "Hover To Tap",
    "from": "HoverInteraction",
    "to": "TapInteraction",
    "condition": "touch-only"
  },
  {
    "id": "RESPONSIVE.CONTEXT_MENU_TO_ACTION_SHEET",
    "name": "Context Menu To Action Sheet",
    "from": "ContextMenu",
    "to": "ActionSheet",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.SPLIT_TO_STACK",
    "name": "Split To Stack",
    "from": "SplitPane",
    "to": "Stack",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.CANVAS_TO_FLOATING_TOOLS",
    "name": "Canvas To Floating Tools",
    "from": "CanvasToolbar",
    "to": "FloatingToolbar",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.TIMELINE_TO_SCROLL",
    "name": "Timeline To Scroll",
    "from": "Timeline",
    "to": "HorizontalScroll",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.CALENDAR_TO_AGENDA",
    "name": "Calendar To Agenda",
    "from": "CalendarGrid",
    "to": "Agenda",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.SIDEBAR_COLLAPSE",
    "name": "Sidebar Collapse",
    "from": "Sidebar",
    "to": "CollapsedSidebar",
    "condition": "tablet"
  },
  {
    "id": "RESPONSIVE.RAIL_TO_POPOVER",
    "name": "Rail To Popover",
    "from": "ContextRail",
    "to": "Popover",
    "condition": "tablet"
  },
  {
    "id": "RESPONSIVE.TABS_TO_SELECT",
    "name": "Tabs To Select",
    "from": "Tabs",
    "to": "Select",
    "condition": "compact-mobile"
  },
  {
    "id": "RESPONSIVE.BREADCRUMB_TO_BACK",
    "name": "Breadcrumb To Back",
    "from": "Breadcrumb",
    "to": "BackNavigation",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.PAGINATION_TO_LOAD_MORE",
    "name": "Pagination To Load More",
    "from": "Pagination",
    "to": "LoadMore",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.DENSE_TABLE_TO_SCROLL",
    "name": "Dense Table To Scroll",
    "from": "DenseTable",
    "to": "HorizontalScrollTable",
    "condition": "tablet-and-below"
  },
  {
    "id": "RESPONSIVE.MULTI_COLUMN_TO_SINGLE",
    "name": "Multi Column To Single",
    "from": "MultiColumn",
    "to": "SingleColumn",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.FIXED_ACTIONS_TO_STICKY_FOOTER",
    "name": "Fixed Actions To Sticky Footer",
    "from": "ActionBar",
    "to": "StickyActionFooter",
    "condition": "mobile"
  },
  {
    "id": "RESPONSIVE.DESKTOP_MODAL_TO_SHEET",
    "name": "Desktop Modal To Sheet",
    "from": "Modal",
    "to": "BottomSheet",
    "condition": "mobile"
  }
] as const;
