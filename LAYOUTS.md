# MAATAA Layout System

`@maataa/ui` keeps layout regions atomic and layout archetypes compositional. Import atoms from `@maataa/ui/layout-atoms/*` and named patterns from `@maataa/ui/layouts/*`.

## Atomic regions

`LayoutRoot`, `LayoutHeader`, `LayoutFooter`, `LayoutMain`, `LayoutAside`, `LayoutSidebar`, `LayoutSecondarySidebar`, `LayoutRail`, `LayoutToolbar`, `LayoutInspector`, `LayoutCanvas`, `LayoutDock`, `LayoutPane`, `LayoutSticky`, `LayoutScroll`, `LayoutRegion`, `LayoutGrid`, `LayoutCell`, `LayoutOverlay`, `LayoutHero`, `LayoutTimeline`, `LayoutNav`, `LayoutContent`, `LayoutActions`, `LayoutPanel`, `LayoutStage`, `LayoutPreview`, `LayoutPalette`, `LayoutProperties`, `LayoutStatusBar`, `LayoutBottomNav`, `LayoutFilters`, `LayoutList`, `LayoutDetails`.

## Named layout archetypes

| Layout | Template | Purpose |
|---|---|---|
| `HolyGrailLayout` | `holy-grail` | Holy Grail — header, left rail, main, right rail, footer |
| `SingleColumnLayout` | `single-column` | Single centered content column |
| `TwoColumnLayout` | `two-column` | Two-column content/sidebar |
| `ThreeColumnLayout` | `three-column` | Left rail, main, right rail |
| `DashboardGridLayout` | `dashboard` | Responsive dashboard grid |
| `BentoGridLayout` | `bento` | Asymmetric bento grid |
| `CardGridLayout` | `card-grid` | Repeating equal card grid |
| `MasonryLayout` | `masonry` | Variable-height masonry |
| `SplitScreenLayout` | `split` | Primary split screen |
| `MasterDetailLayout` | `master-detail` | Master list plus detail |
| `ListDetailInspectorLayout` | `list-detail-inspector` | List, detail, inspector three-pane |
| `SidebarShellLayout` | `sidebar-shell` | Persistent sidebar shell |
| `CollapsibleSidebarLayout` | `sidebar-shell` | Collapsible sidebar shell |
| `DoubleSidebarLayout` | `double-sidebar` | Global and section sidebars |
| `TopNavigationLayout` | `topnav` | Top navigation with content |
| `TopNavSidebarLayout` | `topnav-sidebar` | Top navigation plus sidebar |
| `CommandCenterLayout` | `command-center` | Operational command center |
| `WorkbenchLayout` | `workbench` | Toolbar, canvas, inspector workbench |
| `IDELayout` | `ide` | Navigator, editor, terminal/status panes |
| `StudioLayout` | `studio` | Asset palette, stage, inspector, timeline |
| `CanvasLayout` | `canvas` | Primary freeform canvas |
| `SpatialCADLayout` | `spatial-cad` | Layers, 2D/3D viewport, inspector, tools |
| `MapWorkspaceLayout` | `map` | Map-first workspace |
| `DataExplorerLayout` | `data-explorer` | Filters, results, detail |
| `TableWorkspaceLayout` | `table-workspace` | Toolbar, filters, table content |
| `AnalyticsLayout` | `analytics` | KPI, chart and data regions |
| `KanbanLayout` | `kanban` | Horizontal workflow columns |
| `BoardLayout` | `board` | General card board |
| `TimelineLayout` | `timeline` | Timeline tracks and detail |
| `GanttLayout` | `gantt` | Task tree plus schedule |
| `CalendarLayout` | `calendar` | Calendar grid |
| `SchedulerLayout` | `scheduler` | Resources versus time |
| `InboxLayout` | `inbox` | Folders, message list, detail |
| `ChatLayout` | `chat` | Conversation list, thread, context |
| `SocialFeedLayout` | `social-feed` | Feed with supporting rails |
| `CRMLayout` | `crm` | Records, detail, activity |
| `ProfileLayout` | `profile` | Profile hero and content |
| `SettingsLayout` | `settings` | Settings navigation and forms |
| `WizardLayout` | `wizard` | Sequential step workflow |
| `StepperFormLayout` | `wizard` | Stepper-driven form |
| `FormPreviewLayout` | `form-preview` | Form/editor plus live preview |
| `BuilderLayout` | `builder` | Palette, canvas, inspector |
| `PageBuilderLayout` | `builder` | Block library, canvas, layer/property tools |
| `WorkflowBuilderLayout` | `workflow-builder` | Node canvas with palette and inspector |
| `ApprovalWorkspaceLayout` | `approval` | Record, evidence, decision rail |
| `ReviewLayout` | `review` | Content, annotations, decision controls |
| `ComparisonLayout` | `comparison` | Parallel comparison panes |
| `BeforeAfterLayout` | `comparison` | Before/after synchronized panes |
| `GalleryLayout` | `gallery` | Media gallery grid |
| `LightboxLayout` | `lightbox` | Fullscreen media viewer |
| `MediaEditingLayout` | `media-editor` | Asset browser, viewer, timeline, inspector |
| `VideoEditingLayout` | `video-editor` | Bins, viewer, timeline, inspector |
| `PresentationLayout` | `presentation` | Slide navigator, stage, notes |
| `DocumentEditorLayout` | `document` | Outline, document canvas, comments/tools |
| `KnowledgeBaseLayout` | `documentation` | Tree, article, contextual navigation |
| `DocumentationLayout` | `documentation` | Sidebar, article, table of contents |
| `SearchResultsLayout` | `search-results` | Facets and results |
| `FacetedCommerceLayout` | `commerce` | Filters and product/result grid |
| `ProductDetailLayout` | `product-detail` | Media/gallery with details/actions |
| `MarketplaceLayout` | `marketplace` | Search, filters, listings, optional map |
| `BookingLayout` | `booking` | Booking steps with persistent summary |
| `CheckoutLayout` | `checkout` | Checkout form and order summary |
| `PricingLayout` | `pricing` | Pricing cards/comparison |
| `LandingPageLayout` | `landing` | Hero, sections, proof, CTA, footer |
| `MagazineLayout` | `magazine` | Editorial feature and support columns |
| `NewspaperLayout` | `newspaper` | Dense multi-column editorial |
| `EditorialLayout` | `editorial` | Article with side notes/media |
| `HeroContentLayout` | `hero-content` | Large hero plus content |
| `FullBleedLayout` | `full-bleed` | Viewport-edge content/media |
| `CenteredContainerLayout` | `single-column` | Centered max-width content |
| `FluidLayout` | `fluid` | Fluid viewport-filling content |
| `FixedLayout` | `fixed` | Fixed-width centered layout |
| `ResponsiveAdaptiveLayout` | `adaptive` | Breakpoint-adaptive structure |
| `IntrinsicLayout` | `intrinsic` | Content-driven intrinsic layout |
| `ResponsiveThreePaneLayout` | `three-column` | Three-pane responsive collapse |
| `StickyHeaderLayout` | `sticky-header` | Sticky header with scrolling content |
| `StickySidebarLayout` | `sticky-sidebar` | Sticky navigation/context rail |
| `StickyActionFooterLayout` | `sticky-footer` | Sticky action footer |
| `FixedAppShellLayout` | `fixed-shell` | Fixed app chrome with scrollable content |
| `ScrollablePaneLayout` | `scroll-panes` | Independent scroll panes |
| `TabbedWorkspaceLayout` | `tabbed` | Tabbed workspace shell |
| `DockablePanelLayout` | `dockable` | Dockable panel workspace |
| `ResizableSplitPaneLayout` | `resizable-split` | Resizable split panes |
| `AccordionLayout` | `accordion` | Stacked expandable sections |
| `DisclosureLayout` | `disclosure` | Progressively disclosed regions |
| `DrawerLayout` | `drawer` | Content with contextual drawer |
| `ModalWorkspaceLayout` | `modal-workspace` | Focused overlay workspace |
| `BottomSheetLayout` | `bottom-sheet` | Mobile bottom-sheet workspace |
| `MobileStackLayout` | `mobile-stack` | Single-column mobile stack |
| `MobileTabLayout` | `mobile-tabs` | Mobile tabbed content |
| `BottomNavigationAppLayout` | `mobile-bottom-nav` | Mobile app with bottom navigation |
| `MobileMasterDetailLayout` | `mobile-master-detail` | Mobile master/detail navigation |
| `SidebarToDrawerLayout` | `sidebar-drawer` | Desktop sidebar to mobile drawer |
| `InspectorToSheetLayout` | `inspector-sheet` | Desktop inspector to mobile sheet |
| `KioskLayout` | `kiosk` | Fullscreen touch-first kiosk |
| `TVLargeScreenLayout` | `tv` | Distance-view large-screen layout |
| `OperationsWallboardLayout` | `wallboard` | Always-on operational wallboard |
| `ControlRoomLayout` | `control-room` | Monitoring zones, alerts and controls |
| `CockpitLayout` | `cockpit` | Dense operational cockpit |
| `HUDLayout` | `hud` | Overlay/HUD around visual content |

Named archetypes never own routing, data loading, authorization, or persistence. They only place host-provided regions.
