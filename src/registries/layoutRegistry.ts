export type LayoutTypeRecord = Readonly<{ ordinal: number; id: string; name: string; groupKey: string; importPath: string }>;

export const LAYOUT_TYPES = [
  {
    ordinal: 1,
    id: "LAYOUT.BASIC_CONTENT.SINGLECOLUMN",
    name: "SingleColumnLayout",
    groupKey: "BASIC_CONTENT",
    importPath: "@maataa/ui/layouts/SingleColumnLayout"
  },
  {
    ordinal: 2,
    id: "LAYOUT.BASIC_CONTENT.CENTEREDCONTAINER",
    name: "CenteredContainerLayout",
    groupKey: "BASIC_CONTENT",
    importPath: "@maataa/ui/layouts/CenteredContainerLayout"
  },
  {
    ordinal: 3,
    id: "LAYOUT.BASIC_CONTENT.FLUID",
    name: "FluidLayout",
    groupKey: "BASIC_CONTENT",
    importPath: "@maataa/ui/layouts/FluidLayout"
  },
  {
    ordinal: 4,
    id: "LAYOUT.BASIC_CONTENT.FIXED",
    name: "FixedLayout",
    groupKey: "BASIC_CONTENT",
    importPath: "@maataa/ui/layouts/FixedLayout"
  },
  {
    ordinal: 5,
    id: "LAYOUT.BASIC_CONTENT.FULLBLEED",
    name: "FullBleedLayout",
    groupKey: "BASIC_CONTENT",
    importPath: "@maataa/ui/layouts/FullBleedLayout"
  },
  {
    ordinal: 6,
    id: "LAYOUT.BASIC_CONTENT.HEROCONTENT",
    name: "HeroContentLayout",
    groupKey: "BASIC_CONTENT",
    importPath: "@maataa/ui/layouts/HeroContentLayout"
  },
  {
    ordinal: 7,
    id: "LAYOUT.BASIC_CONTENT.EDITORIAL",
    name: "EditorialLayout",
    groupKey: "BASIC_CONTENT",
    importPath: "@maataa/ui/layouts/EditorialLayout"
  },
  {
    ordinal: 8,
    id: "LAYOUT.COLUMN_SYSTEMS.TWOCOLUMN",
    name: "TwoColumnLayout",
    groupKey: "COLUMN_SYSTEMS",
    importPath: "@maataa/ui/layouts/TwoColumnLayout"
  },
  {
    ordinal: 9,
    id: "LAYOUT.COLUMN_SYSTEMS.THREECOLUMN",
    name: "ThreeColumnLayout",
    groupKey: "COLUMN_SYSTEMS",
    importPath: "@maataa/ui/layouts/ThreeColumnLayout"
  },
  {
    ordinal: 10,
    id: "LAYOUT.COLUMN_SYSTEMS.HOLYGRAIL",
    name: "HolyGrailLayout",
    groupKey: "COLUMN_SYSTEMS",
    importPath: "@maataa/ui/layouts/HolyGrailLayout"
  },
  {
    ordinal: 11,
    id: "LAYOUT.COLUMN_SYSTEMS.RESPONSIVETHREEPANE",
    name: "ResponsiveThreePaneLayout",
    groupKey: "COLUMN_SYSTEMS",
    importPath: "@maataa/ui/layouts/ResponsiveThreePaneLayout"
  },
  {
    ordinal: 12,
    id: "LAYOUT.APP_SHELLS.SIDEBARSHELL",
    name: "SidebarShellLayout",
    groupKey: "APP_SHELLS",
    importPath: "@maataa/ui/layouts/SidebarShellLayout"
  },
  {
    ordinal: 13,
    id: "LAYOUT.APP_SHELLS.TOPNAVIGATION",
    name: "TopNavigationLayout",
    groupKey: "APP_SHELLS",
    importPath: "@maataa/ui/layouts/TopNavigationLayout"
  },
  {
    ordinal: 14,
    id: "LAYOUT.APP_SHELLS.TOPNAVSIDEBAR",
    name: "TopNavSidebarLayout",
    groupKey: "APP_SHELLS",
    importPath: "@maataa/ui/layouts/TopNavSidebarLayout"
  },
  {
    ordinal: 15,
    id: "LAYOUT.APP_SHELLS.COLLAPSIBLESIDEBAR",
    name: "CollapsibleSidebarLayout",
    groupKey: "APP_SHELLS",
    importPath: "@maataa/ui/layouts/CollapsibleSidebarLayout"
  },
  {
    ordinal: 16,
    id: "LAYOUT.APP_SHELLS.DOUBLESIDEBAR",
    name: "DoubleSidebarLayout",
    groupKey: "APP_SHELLS",
    importPath: "@maataa/ui/layouts/DoubleSidebarLayout"
  },
  {
    ordinal: 17,
    id: "LAYOUT.APP_SHELLS.FIXEDAPPSHELL",
    name: "FixedAppShellLayout",
    groupKey: "APP_SHELLS",
    importPath: "@maataa/ui/layouts/FixedAppShellLayout"
  },
  {
    ordinal: 18,
    id: "LAYOUT.SPLIT_PANE.SPLITSCREEN",
    name: "SplitScreenLayout",
    groupKey: "SPLIT_PANE",
    importPath: "@maataa/ui/layouts/SplitScreenLayout"
  },
  {
    ordinal: 19,
    id: "LAYOUT.SPLIT_PANE.MASTERDETAIL",
    name: "MasterDetailLayout",
    groupKey: "SPLIT_PANE",
    importPath: "@maataa/ui/layouts/MasterDetailLayout"
  },
  {
    ordinal: 20,
    id: "LAYOUT.SPLIT_PANE.LISTDETAILINSPECTOR",
    name: "ListDetailInspectorLayout",
    groupKey: "SPLIT_PANE",
    importPath: "@maataa/ui/layouts/ListDetailInspectorLayout"
  },
  {
    ordinal: 21,
    id: "LAYOUT.SPLIT_PANE.RESIZABLESPLITPANE",
    name: "ResizableSplitPaneLayout",
    groupKey: "SPLIT_PANE",
    importPath: "@maataa/ui/layouts/ResizableSplitPaneLayout"
  },
  {
    ordinal: 22,
    id: "LAYOUT.SPLIT_PANE.SCROLLABLEPANE",
    name: "ScrollablePaneLayout",
    groupKey: "SPLIT_PANE",
    importPath: "@maataa/ui/layouts/ScrollablePaneLayout"
  },
  {
    ordinal: 23,
    id: "LAYOUT.GRID_SYSTEMS.DASHBOARDGRID",
    name: "DashboardGridLayout",
    groupKey: "GRID_SYSTEMS",
    importPath: "@maataa/ui/layouts/DashboardGridLayout"
  },
  {
    ordinal: 24,
    id: "LAYOUT.GRID_SYSTEMS.CARDGRID",
    name: "CardGridLayout",
    groupKey: "GRID_SYSTEMS",
    importPath: "@maataa/ui/layouts/CardGridLayout"
  },
  {
    ordinal: 25,
    id: "LAYOUT.GRID_SYSTEMS.BENTOGRID",
    name: "BentoGridLayout",
    groupKey: "GRID_SYSTEMS",
    importPath: "@maataa/ui/layouts/BentoGridLayout"
  },
  {
    ordinal: 26,
    id: "LAYOUT.GRID_SYSTEMS.MASONRY",
    name: "MasonryLayout",
    groupKey: "GRID_SYSTEMS",
    importPath: "@maataa/ui/layouts/MasonryLayout"
  },
  {
    ordinal: 27,
    id: "LAYOUT.GRID_SYSTEMS.RESPONSIVEADAPTIVE",
    name: "ResponsiveAdaptiveLayout",
    groupKey: "GRID_SYSTEMS",
    importPath: "@maataa/ui/layouts/ResponsiveAdaptiveLayout"
  },
  {
    ordinal: 28,
    id: "LAYOUT.GRID_SYSTEMS.INTRINSIC",
    name: "IntrinsicLayout",
    groupKey: "GRID_SYSTEMS",
    importPath: "@maataa/ui/layouts/IntrinsicLayout"
  },
  {
    ordinal: 29,
    id: "LAYOUT.WORKSPACE.WORKBENCH",
    name: "WorkbenchLayout",
    groupKey: "WORKSPACE",
    importPath: "@maataa/ui/layouts/WorkbenchLayout"
  },
  {
    ordinal: 30,
    id: "LAYOUT.WORKSPACE.IDE",
    name: "IDELayout",
    groupKey: "WORKSPACE",
    importPath: "@maataa/ui/layouts/IDELayout"
  },
  {
    ordinal: 31,
    id: "LAYOUT.WORKSPACE.STUDIO",
    name: "StudioLayout",
    groupKey: "WORKSPACE",
    importPath: "@maataa/ui/layouts/StudioLayout"
  },
  {
    ordinal: 32,
    id: "LAYOUT.WORKSPACE.TABBEDWORKSPACE",
    name: "TabbedWorkspaceLayout",
    groupKey: "WORKSPACE",
    importPath: "@maataa/ui/layouts/TabbedWorkspaceLayout"
  },
  {
    ordinal: 33,
    id: "LAYOUT.WORKSPACE.DOCKABLEPANEL",
    name: "DockablePanelLayout",
    groupKey: "WORKSPACE",
    importPath: "@maataa/ui/layouts/DockablePanelLayout"
  },
  {
    ordinal: 34,
    id: "LAYOUT.WORKSPACE.BUILDER",
    name: "BuilderLayout",
    groupKey: "WORKSPACE",
    importPath: "@maataa/ui/layouts/BuilderLayout"
  },
  {
    ordinal: 35,
    id: "LAYOUT.WORKSPACE.PAGEBUILDER",
    name: "PageBuilderLayout",
    groupKey: "WORKSPACE",
    importPath: "@maataa/ui/layouts/PageBuilderLayout"
  },
  {
    ordinal: 36,
    id: "LAYOUT.WORKSPACE.WORKFLOWBUILDER",
    name: "WorkflowBuilderLayout",
    groupKey: "WORKSPACE",
    importPath: "@maataa/ui/layouts/WorkflowBuilderLayout"
  },
  {
    ordinal: 37,
    id: "LAYOUT.CANVAS_SPATIAL.CANVAS",
    name: "CanvasLayout",
    groupKey: "CANVAS_SPATIAL",
    importPath: "@maataa/ui/layouts/CanvasLayout"
  },
  {
    ordinal: 38,
    id: "LAYOUT.CANVAS_SPATIAL.SPATIALCAD",
    name: "SpatialCADLayout",
    groupKey: "CANVAS_SPATIAL",
    importPath: "@maataa/ui/layouts/SpatialCADLayout"
  },
  {
    ordinal: 39,
    id: "LAYOUT.CANVAS_SPATIAL.MAPWORKSPACE",
    name: "MapWorkspaceLayout",
    groupKey: "CANVAS_SPATIAL",
    importPath: "@maataa/ui/layouts/MapWorkspaceLayout"
  },
  {
    ordinal: 40,
    id: "LAYOUT.DATA_ANALYTICS.DATAEXPLORER",
    name: "DataExplorerLayout",
    groupKey: "DATA_ANALYTICS",
    importPath: "@maataa/ui/layouts/DataExplorerLayout"
  },
  {
    ordinal: 41,
    id: "LAYOUT.DATA_ANALYTICS.TABLEWORKSPACE",
    name: "TableWorkspaceLayout",
    groupKey: "DATA_ANALYTICS",
    importPath: "@maataa/ui/layouts/TableWorkspaceLayout"
  },
  {
    ordinal: 42,
    id: "LAYOUT.DATA_ANALYTICS.ANALYTICS",
    name: "AnalyticsLayout",
    groupKey: "DATA_ANALYTICS",
    importPath: "@maataa/ui/layouts/AnalyticsLayout"
  },
  {
    ordinal: 43,
    id: "LAYOUT.DATA_ANALYTICS.COMPARISON",
    name: "ComparisonLayout",
    groupKey: "DATA_ANALYTICS",
    importPath: "@maataa/ui/layouts/ComparisonLayout"
  },
  {
    ordinal: 44,
    id: "LAYOUT.DATA_ANALYTICS.BEFOREAFTER",
    name: "BeforeAfterLayout",
    groupKey: "DATA_ANALYTICS",
    importPath: "@maataa/ui/layouts/BeforeAfterLayout"
  },
  {
    ordinal: 45,
    id: "LAYOUT.PLANNING.KANBAN",
    name: "KanbanLayout",
    groupKey: "PLANNING",
    importPath: "@maataa/ui/layouts/KanbanLayout"
  },
  {
    ordinal: 46,
    id: "LAYOUT.PLANNING.BOARD",
    name: "BoardLayout",
    groupKey: "PLANNING",
    importPath: "@maataa/ui/layouts/BoardLayout"
  },
  {
    ordinal: 47,
    id: "LAYOUT.PLANNING.TIMELINE",
    name: "TimelineLayout",
    groupKey: "PLANNING",
    importPath: "@maataa/ui/layouts/TimelineLayout"
  },
  {
    ordinal: 48,
    id: "LAYOUT.PLANNING.GANTT",
    name: "GanttLayout",
    groupKey: "PLANNING",
    importPath: "@maataa/ui/layouts/GanttLayout"
  },
  {
    ordinal: 49,
    id: "LAYOUT.PLANNING.CALENDAR",
    name: "CalendarLayout",
    groupKey: "PLANNING",
    importPath: "@maataa/ui/layouts/CalendarLayout"
  },
  {
    ordinal: 50,
    id: "LAYOUT.PLANNING.SCHEDULER",
    name: "SchedulerLayout",
    groupKey: "PLANNING",
    importPath: "@maataa/ui/layouts/SchedulerLayout"
  },
  {
    ordinal: 51,
    id: "LAYOUT.COMMUNICATION.INBOX",
    name: "InboxLayout",
    groupKey: "COMMUNICATION",
    importPath: "@maataa/ui/layouts/InboxLayout"
  },
  {
    ordinal: 52,
    id: "LAYOUT.COMMUNICATION.CHAT",
    name: "ChatLayout",
    groupKey: "COMMUNICATION",
    importPath: "@maataa/ui/layouts/ChatLayout"
  },
  {
    ordinal: 53,
    id: "LAYOUT.COMMUNICATION.SOCIALFEED",
    name: "SocialFeedLayout",
    groupKey: "COMMUNICATION",
    importPath: "@maataa/ui/layouts/SocialFeedLayout"
  },
  {
    ordinal: 54,
    id: "LAYOUT.COMMUNICATION.CRM",
    name: "CRMLayout",
    groupKey: "COMMUNICATION",
    importPath: "@maataa/ui/layouts/CRMLayout"
  },
  {
    ordinal: 55,
    id: "LAYOUT.MEDIA.GALLERY",
    name: "GalleryLayout",
    groupKey: "MEDIA",
    importPath: "@maataa/ui/layouts/GalleryLayout"
  },
  {
    ordinal: 56,
    id: "LAYOUT.MEDIA.LIGHTBOX",
    name: "LightboxLayout",
    groupKey: "MEDIA",
    importPath: "@maataa/ui/layouts/LightboxLayout"
  },
  {
    ordinal: 57,
    id: "LAYOUT.MEDIA.MEDIAEDITING",
    name: "MediaEditingLayout",
    groupKey: "MEDIA",
    importPath: "@maataa/ui/layouts/MediaEditingLayout"
  },
  {
    ordinal: 58,
    id: "LAYOUT.MEDIA.VIDEOEDITING",
    name: "VideoEditingLayout",
    groupKey: "MEDIA",
    importPath: "@maataa/ui/layouts/VideoEditingLayout"
  },
  {
    ordinal: 59,
    id: "LAYOUT.MEDIA.PRESENTATION",
    name: "PresentationLayout",
    groupKey: "MEDIA",
    importPath: "@maataa/ui/layouts/PresentationLayout"
  },
  {
    ordinal: 60,
    id: "LAYOUT.FORMS_PROCESS.WIZARD",
    name: "WizardLayout",
    groupKey: "FORMS_PROCESS",
    importPath: "@maataa/ui/layouts/WizardLayout"
  },
  {
    ordinal: 61,
    id: "LAYOUT.FORMS_PROCESS.STEPPERFORM",
    name: "StepperFormLayout",
    groupKey: "FORMS_PROCESS",
    importPath: "@maataa/ui/layouts/StepperFormLayout"
  },
  {
    ordinal: 62,
    id: "LAYOUT.FORMS_PROCESS.FORMPREVIEW",
    name: "FormPreviewLayout",
    groupKey: "FORMS_PROCESS",
    importPath: "@maataa/ui/layouts/FormPreviewLayout"
  },
  {
    ordinal: 63,
    id: "LAYOUT.FORMS_PROCESS.APPROVALWORKSPACE",
    name: "ApprovalWorkspaceLayout",
    groupKey: "FORMS_PROCESS",
    importPath: "@maataa/ui/layouts/ApprovalWorkspaceLayout"
  },
  {
    ordinal: 64,
    id: "LAYOUT.FORMS_PROCESS.REVIEW",
    name: "ReviewLayout",
    groupKey: "FORMS_PROCESS",
    importPath: "@maataa/ui/layouts/ReviewLayout"
  },
  {
    ordinal: 65,
    id: "LAYOUT.COMMERCE.FACETEDCOMMERCE",
    name: "FacetedCommerceLayout",
    groupKey: "COMMERCE",
    importPath: "@maataa/ui/layouts/FacetedCommerceLayout"
  },
  {
    ordinal: 66,
    id: "LAYOUT.COMMERCE.PRODUCTDETAIL",
    name: "ProductDetailLayout",
    groupKey: "COMMERCE",
    importPath: "@maataa/ui/layouts/ProductDetailLayout"
  },
  {
    ordinal: 67,
    id: "LAYOUT.COMMERCE.MARKETPLACE",
    name: "MarketplaceLayout",
    groupKey: "COMMERCE",
    importPath: "@maataa/ui/layouts/MarketplaceLayout"
  },
  {
    ordinal: 68,
    id: "LAYOUT.COMMERCE.BOOKING",
    name: "BookingLayout",
    groupKey: "COMMERCE",
    importPath: "@maataa/ui/layouts/BookingLayout"
  },
  {
    ordinal: 69,
    id: "LAYOUT.COMMERCE.CHECKOUT",
    name: "CheckoutLayout",
    groupKey: "COMMERCE",
    importPath: "@maataa/ui/layouts/CheckoutLayout"
  },
  {
    ordinal: 70,
    id: "LAYOUT.COMMERCE.PRICING",
    name: "PricingLayout",
    groupKey: "COMMERCE",
    importPath: "@maataa/ui/layouts/PricingLayout"
  },
  {
    ordinal: 71,
    id: "LAYOUT.DOCUMENTATION.DOCUMENTEDITOR",
    name: "DocumentEditorLayout",
    groupKey: "DOCUMENTATION",
    importPath: "@maataa/ui/layouts/DocumentEditorLayout"
  },
  {
    ordinal: 72,
    id: "LAYOUT.DOCUMENTATION.KNOWLEDGEBASE",
    name: "KnowledgeBaseLayout",
    groupKey: "DOCUMENTATION",
    importPath: "@maataa/ui/layouts/KnowledgeBaseLayout"
  },
  {
    ordinal: 73,
    id: "LAYOUT.DOCUMENTATION.DOCUMENTATION",
    name: "DocumentationLayout",
    groupKey: "DOCUMENTATION",
    importPath: "@maataa/ui/layouts/DocumentationLayout"
  },
  {
    ordinal: 74,
    id: "LAYOUT.DOCUMENTATION.SEARCHRESULTS",
    name: "SearchResultsLayout",
    groupKey: "DOCUMENTATION",
    importPath: "@maataa/ui/layouts/SearchResultsLayout"
  },
  {
    ordinal: 75,
    id: "LAYOUT.MARKETING.LANDINGPAGE",
    name: "LandingPageLayout",
    groupKey: "MARKETING",
    importPath: "@maataa/ui/layouts/LandingPageLayout"
  },
  {
    ordinal: 76,
    id: "LAYOUT.MARKETING.MAGAZINE",
    name: "MagazineLayout",
    groupKey: "MARKETING",
    importPath: "@maataa/ui/layouts/MagazineLayout"
  },
  {
    ordinal: 77,
    id: "LAYOUT.MARKETING.NEWSPAPER",
    name: "NewspaperLayout",
    groupKey: "MARKETING",
    importPath: "@maataa/ui/layouts/NewspaperLayout"
  },
  {
    ordinal: 78,
    id: "LAYOUT.RESPONSIVE_MOBILE.MOBILESTACK",
    name: "MobileStackLayout",
    groupKey: "RESPONSIVE_MOBILE",
    importPath: "@maataa/ui/layouts/MobileStackLayout"
  },
  {
    ordinal: 79,
    id: "LAYOUT.RESPONSIVE_MOBILE.MOBILETAB",
    name: "MobileTabLayout",
    groupKey: "RESPONSIVE_MOBILE",
    importPath: "@maataa/ui/layouts/MobileTabLayout"
  },
  {
    ordinal: 80,
    id: "LAYOUT.RESPONSIVE_MOBILE.BOTTOMNAVIGATIONAPP",
    name: "BottomNavigationAppLayout",
    groupKey: "RESPONSIVE_MOBILE",
    importPath: "@maataa/ui/layouts/BottomNavigationAppLayout"
  },
  {
    ordinal: 81,
    id: "LAYOUT.RESPONSIVE_MOBILE.MOBILEMASTERDETAIL",
    name: "MobileMasterDetailLayout",
    groupKey: "RESPONSIVE_MOBILE",
    importPath: "@maataa/ui/layouts/MobileMasterDetailLayout"
  },
  {
    ordinal: 82,
    id: "LAYOUT.RESPONSIVE_MOBILE.SIDEBARTODRAWER",
    name: "SidebarToDrawerLayout",
    groupKey: "RESPONSIVE_MOBILE",
    importPath: "@maataa/ui/layouts/SidebarToDrawerLayout"
  },
  {
    ordinal: 83,
    id: "LAYOUT.RESPONSIVE_MOBILE.INSPECTORTOSHEET",
    name: "InspectorToSheetLayout",
    groupKey: "RESPONSIVE_MOBILE",
    importPath: "@maataa/ui/layouts/InspectorToSheetLayout"
  },
  {
    ordinal: 84,
    id: "LAYOUT.OVERLAY_TEMPORARY.ACCORDION",
    name: "AccordionLayout",
    groupKey: "OVERLAY_TEMPORARY",
    importPath: "@maataa/ui/layouts/AccordionLayout"
  },
  {
    ordinal: 85,
    id: "LAYOUT.OVERLAY_TEMPORARY.DISCLOSURE",
    name: "DisclosureLayout",
    groupKey: "OVERLAY_TEMPORARY",
    importPath: "@maataa/ui/layouts/DisclosureLayout"
  },
  {
    ordinal: 86,
    id: "LAYOUT.OVERLAY_TEMPORARY.DRAWER",
    name: "DrawerLayout",
    groupKey: "OVERLAY_TEMPORARY",
    importPath: "@maataa/ui/layouts/DrawerLayout"
  },
  {
    ordinal: 87,
    id: "LAYOUT.OVERLAY_TEMPORARY.MODALWORKSPACE",
    name: "ModalWorkspaceLayout",
    groupKey: "OVERLAY_TEMPORARY",
    importPath: "@maataa/ui/layouts/ModalWorkspaceLayout"
  },
  {
    ordinal: 88,
    id: "LAYOUT.OVERLAY_TEMPORARY.BOTTOMSHEET",
    name: "BottomSheetLayout",
    groupKey: "OVERLAY_TEMPORARY",
    importPath: "@maataa/ui/layouts/BottomSheetLayout"
  },
  {
    ordinal: 89,
    id: "LAYOUT.OPERATIONAL.COMMANDCENTER",
    name: "CommandCenterLayout",
    groupKey: "OPERATIONAL",
    importPath: "@maataa/ui/layouts/CommandCenterLayout"
  },
  {
    ordinal: 90,
    id: "LAYOUT.OPERATIONAL.COCKPIT",
    name: "CockpitLayout",
    groupKey: "OPERATIONAL",
    importPath: "@maataa/ui/layouts/CockpitLayout"
  },
  {
    ordinal: 91,
    id: "LAYOUT.OPERATIONAL.CONTROLROOM",
    name: "ControlRoomLayout",
    groupKey: "OPERATIONAL",
    importPath: "@maataa/ui/layouts/ControlRoomLayout"
  },
  {
    ordinal: 92,
    id: "LAYOUT.OPERATIONAL.OPERATIONSWALLBOARD",
    name: "OperationsWallboardLayout",
    groupKey: "OPERATIONAL",
    importPath: "@maataa/ui/layouts/OperationsWallboardLayout"
  },
  {
    ordinal: 93,
    id: "LAYOUT.OPERATIONAL.HUD",
    name: "HUDLayout",
    groupKey: "OPERATIONAL",
    importPath: "@maataa/ui/layouts/HUDLayout"
  },
  {
    ordinal: 94,
    id: "LAYOUT.OPERATIONAL.KIOSK",
    name: "KioskLayout",
    groupKey: "OPERATIONAL",
    importPath: "@maataa/ui/layouts/KioskLayout"
  },
  {
    ordinal: 95,
    id: "LAYOUT.OPERATIONAL.TVLARGESCREEN",
    name: "TVLargeScreenLayout",
    groupKey: "OPERATIONAL",
    importPath: "@maataa/ui/layouts/TVLargeScreenLayout"
  },
  {
    ordinal: 96,
    id: "LAYOUT.OPERATIONAL.STICKYHEADER",
    name: "StickyHeaderLayout",
    groupKey: "OPERATIONAL",
    importPath: "@maataa/ui/layouts/StickyHeaderLayout"
  },
  {
    ordinal: 97,
    id: "LAYOUT.OPERATIONAL.STICKYSIDEBAR",
    name: "StickySidebarLayout",
    groupKey: "OPERATIONAL",
    importPath: "@maataa/ui/layouts/StickySidebarLayout"
  },
  {
    ordinal: 98,
    id: "LAYOUT.OPERATIONAL.STICKYACTIONFOOTER",
    name: "StickyActionFooterLayout",
    groupKey: "OPERATIONAL",
    importPath: "@maataa/ui/layouts/StickyActionFooterLayout"
  },
  {
    ordinal: 99,
    id: "LAYOUT.OPERATIONAL.SETTINGS",
    name: "SettingsLayout",
    groupKey: "OPERATIONAL",
    importPath: "@maataa/ui/layouts/SettingsLayout"
  },
  {
    ordinal: 100,
    id: "LAYOUT.OPERATIONAL.PROFILE",
    name: "ProfileLayout",
    groupKey: "OPERATIONAL",
    importPath: "@maataa/ui/layouts/ProfileLayout"
  }
] as const satisfies readonly LayoutTypeRecord[];
