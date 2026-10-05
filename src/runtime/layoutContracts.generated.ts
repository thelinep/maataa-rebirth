// Derived from layout registry, implementation and CSS by generate-layout-loaders.mjs.
export const LAYOUT_RUNTIME_CONTRACTS: Readonly<Record<string,{primarySlot:"main"|"canvas"|"details";placementStatus:"source-declared"|"fallback-main";template:string}>> = {
  "LAYOUT.BASIC_CONTENT.SINGLECOLUMN": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "single-column"
  },
  "LAYOUT.BASIC_CONTENT.CENTEREDCONTAINER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "single-column"
  },
  "LAYOUT.BASIC_CONTENT.FLUID": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "fluid"
  },
  "LAYOUT.BASIC_CONTENT.FIXED": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "fixed"
  },
  "LAYOUT.BASIC_CONTENT.FULLBLEED": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "full-bleed"
  },
  "LAYOUT.BASIC_CONTENT.HEROCONTENT": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "hero-content"
  },
  "LAYOUT.BASIC_CONTENT.EDITORIAL": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "editorial"
  },
  "LAYOUT.COLUMN_SYSTEMS.TWOCOLUMN": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "two-column"
  },
  "LAYOUT.COLUMN_SYSTEMS.THREECOLUMN": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "three-column"
  },
  "LAYOUT.COLUMN_SYSTEMS.HOLYGRAIL": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "holy-grail"
  },
  "LAYOUT.COLUMN_SYSTEMS.RESPONSIVETHREEPANE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "three-column"
  },
  "LAYOUT.APP_SHELLS.SIDEBARSHELL": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "sidebar-shell"
  },
  "LAYOUT.APP_SHELLS.TOPNAVIGATION": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "topnav"
  },
  "LAYOUT.APP_SHELLS.TOPNAVSIDEBAR": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "topnav-sidebar"
  },
  "LAYOUT.APP_SHELLS.COLLAPSIBLESIDEBAR": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "sidebar-shell"
  },
  "LAYOUT.APP_SHELLS.DOUBLESIDEBAR": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "double-sidebar"
  },
  "LAYOUT.APP_SHELLS.FIXEDAPPSHELL": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "fixed-shell"
  },
  "LAYOUT.SPLIT_PANE.SPLITSCREEN": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "split"
  },
  "LAYOUT.SPLIT_PANE.MASTERDETAIL": {
    "primarySlot": "details",
    "placementStatus": "source-declared",
    "template": "master-detail"
  },
  "LAYOUT.SPLIT_PANE.LISTDETAILINSPECTOR": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "list-detail-inspector"
  },
  "LAYOUT.SPLIT_PANE.RESIZABLESPLITPANE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "resizable-split"
  },
  "LAYOUT.SPLIT_PANE.SCROLLABLEPANE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "scroll-panes"
  },
  "LAYOUT.GRID_SYSTEMS.DASHBOARDGRID": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "dashboard"
  },
  "LAYOUT.GRID_SYSTEMS.CARDGRID": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "card-grid"
  },
  "LAYOUT.GRID_SYSTEMS.BENTOGRID": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "bento"
  },
  "LAYOUT.GRID_SYSTEMS.MASONRY": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "masonry"
  },
  "LAYOUT.GRID_SYSTEMS.RESPONSIVEADAPTIVE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "adaptive"
  },
  "LAYOUT.GRID_SYSTEMS.INTRINSIC": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "intrinsic"
  },
  "LAYOUT.WORKSPACE.WORKBENCH": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "workbench"
  },
  "LAYOUT.WORKSPACE.IDE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "ide"
  },
  "LAYOUT.WORKSPACE.STUDIO": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "studio"
  },
  "LAYOUT.WORKSPACE.TABBEDWORKSPACE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "tabbed"
  },
  "LAYOUT.WORKSPACE.DOCKABLEPANEL": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "dockable"
  },
  "LAYOUT.WORKSPACE.BUILDER": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "builder"
  },
  "LAYOUT.WORKSPACE.PAGEBUILDER": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "builder"
  },
  "LAYOUT.WORKSPACE.WORKFLOWBUILDER": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "workflow-builder"
  },
  "LAYOUT.CANVAS_SPATIAL.CANVAS": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "canvas"
  },
  "LAYOUT.CANVAS_SPATIAL.SPATIALCAD": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "spatial-cad"
  },
  "LAYOUT.CANVAS_SPATIAL.MAPWORKSPACE": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "map"
  },
  "LAYOUT.DATA_ANALYTICS.DATAEXPLORER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "data-explorer"
  },
  "LAYOUT.DATA_ANALYTICS.TABLEWORKSPACE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "table-workspace"
  },
  "LAYOUT.DATA_ANALYTICS.ANALYTICS": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "analytics"
  },
  "LAYOUT.DATA_ANALYTICS.COMPARISON": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "comparison"
  },
  "LAYOUT.DATA_ANALYTICS.BEFOREAFTER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "comparison"
  },
  "LAYOUT.PLANNING.KANBAN": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "kanban"
  },
  "LAYOUT.PLANNING.BOARD": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "board"
  },
  "LAYOUT.PLANNING.TIMELINE": {
    "primarySlot": "details",
    "placementStatus": "source-declared",
    "template": "timeline"
  },
  "LAYOUT.PLANNING.GANTT": {
    "primarySlot": "details",
    "placementStatus": "source-declared",
    "template": "gantt"
  },
  "LAYOUT.PLANNING.CALENDAR": {
    "primarySlot": "details",
    "placementStatus": "source-declared",
    "template": "calendar"
  },
  "LAYOUT.PLANNING.SCHEDULER": {
    "primarySlot": "details",
    "placementStatus": "source-declared",
    "template": "scheduler"
  },
  "LAYOUT.COMMUNICATION.INBOX": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "inbox"
  },
  "LAYOUT.COMMUNICATION.CHAT": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "chat"
  },
  "LAYOUT.COMMUNICATION.SOCIALFEED": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "social-feed"
  },
  "LAYOUT.COMMUNICATION.CRM": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "crm"
  },
  "LAYOUT.MEDIA.GALLERY": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "gallery"
  },
  "LAYOUT.MEDIA.LIGHTBOX": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "lightbox"
  },
  "LAYOUT.MEDIA.MEDIAEDITING": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "media-editor"
  },
  "LAYOUT.MEDIA.VIDEOEDITING": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "video-editor"
  },
  "LAYOUT.MEDIA.PRESENTATION": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "presentation"
  },
  "LAYOUT.FORMS_PROCESS.WIZARD": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "wizard"
  },
  "LAYOUT.FORMS_PROCESS.STEPPERFORM": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "wizard"
  },
  "LAYOUT.FORMS_PROCESS.FORMPREVIEW": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "form-preview"
  },
  "LAYOUT.FORMS_PROCESS.APPROVALWORKSPACE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "approval"
  },
  "LAYOUT.FORMS_PROCESS.REVIEW": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "review"
  },
  "LAYOUT.COMMERCE.FACETEDCOMMERCE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "commerce"
  },
  "LAYOUT.COMMERCE.PRODUCTDETAIL": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "product-detail"
  },
  "LAYOUT.COMMERCE.MARKETPLACE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "marketplace"
  },
  "LAYOUT.COMMERCE.BOOKING": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "booking"
  },
  "LAYOUT.COMMERCE.CHECKOUT": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "checkout"
  },
  "LAYOUT.COMMERCE.PRICING": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "pricing"
  },
  "LAYOUT.DOCUMENTATION.DOCUMENTEDITOR": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "document"
  },
  "LAYOUT.DOCUMENTATION.KNOWLEDGEBASE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "documentation"
  },
  "LAYOUT.DOCUMENTATION.DOCUMENTATION": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "documentation"
  },
  "LAYOUT.DOCUMENTATION.SEARCHRESULTS": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "search-results"
  },
  "LAYOUT.MARKETING.LANDINGPAGE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "landing"
  },
  "LAYOUT.MARKETING.MAGAZINE": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "magazine"
  },
  "LAYOUT.MARKETING.NEWSPAPER": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "newspaper"
  },
  "LAYOUT.RESPONSIVE_MOBILE.MOBILESTACK": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "mobile-stack"
  },
  "LAYOUT.RESPONSIVE_MOBILE.MOBILETAB": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "mobile-tabs"
  },
  "LAYOUT.RESPONSIVE_MOBILE.BOTTOMNAVIGATIONAPP": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "mobile-bottom-nav"
  },
  "LAYOUT.RESPONSIVE_MOBILE.MOBILEMASTERDETAIL": {
    "primarySlot": "details",
    "placementStatus": "source-declared",
    "template": "mobile-master-detail"
  },
  "LAYOUT.RESPONSIVE_MOBILE.SIDEBARTODRAWER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "sidebar-drawer"
  },
  "LAYOUT.RESPONSIVE_MOBILE.INSPECTORTOSHEET": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "inspector-sheet"
  },
  "LAYOUT.OVERLAY_TEMPORARY.ACCORDION": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "accordion"
  },
  "LAYOUT.OVERLAY_TEMPORARY.DISCLOSURE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "disclosure"
  },
  "LAYOUT.OVERLAY_TEMPORARY.DRAWER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "drawer"
  },
  "LAYOUT.OVERLAY_TEMPORARY.MODALWORKSPACE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "modal-workspace"
  },
  "LAYOUT.OVERLAY_TEMPORARY.BOTTOMSHEET": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "bottom-sheet"
  },
  "LAYOUT.OPERATIONAL.COMMANDCENTER": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "command-center"
  },
  "LAYOUT.OPERATIONAL.COCKPIT": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "cockpit"
  },
  "LAYOUT.OPERATIONAL.CONTROLROOM": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "control-room"
  },
  "LAYOUT.OPERATIONAL.OPERATIONSWALLBOARD": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "wallboard"
  },
  "LAYOUT.OPERATIONAL.HUD": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "hud"
  },
  "LAYOUT.OPERATIONAL.KIOSK": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "kiosk"
  },
  "LAYOUT.OPERATIONAL.TVLARGESCREEN": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "tv"
  },
  "LAYOUT.OPERATIONAL.STICKYHEADER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "sticky-header"
  },
  "LAYOUT.OPERATIONAL.STICKYSIDEBAR": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "sticky-sidebar"
  },
  "LAYOUT.OPERATIONAL.STICKYACTIONFOOTER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "sticky-footer"
  },
  "LAYOUT.OPERATIONAL.SETTINGS": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "settings"
  },
  "LAYOUT.OPERATIONAL.PROFILE": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "profile"
  }
};
