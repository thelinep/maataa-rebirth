// Derived from layout registry, implementation and CSS by generate-layout-loaders.mjs.
export const LAYOUT_RUNTIME_CONTRACTS: Readonly<Record<string,{primarySlot:"main"|"canvas"|"details";placementStatus:"source-declared"|"fallback-main";template:string;gridRegions:readonly string[]}>> = {
  "LAYOUT.BASIC_CONTENT.SINGLECOLUMN": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "single-column",
    "gridRegions": [
      "header",
      "nav",
      "hero",
      "toolbar",
      "main",
      "actions",
      "footer"
    ]
  },
  "LAYOUT.BASIC_CONTENT.CENTEREDCONTAINER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "single-column",
    "gridRegions": [
      "header",
      "nav",
      "hero",
      "toolbar",
      "main",
      "actions",
      "footer"
    ]
  },
  "LAYOUT.BASIC_CONTENT.FLUID": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "fluid",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.BASIC_CONTENT.FIXED": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "fixed",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.BASIC_CONTENT.FULLBLEED": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "full-bleed",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.BASIC_CONTENT.HEROCONTENT": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "hero-content",
    "gridRegions": [
      "header",
      "nav",
      "hero",
      "toolbar",
      "main",
      "actions",
      "footer"
    ]
  },
  "LAYOUT.BASIC_CONTENT.EDITORIAL": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "editorial",
    "gridRegions": [
      "header",
      "nav",
      "hero",
      "toolbar",
      "main",
      "actions",
      "footer"
    ]
  },
  "LAYOUT.COLUMN_SYSTEMS.TWOCOLUMN": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "two-column",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "filters",
      "footer"
    ]
  },
  "LAYOUT.COLUMN_SYSTEMS.THREECOLUMN": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "three-column",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "inspector",
      "list",
      "details",
      "footer"
    ]
  },
  "LAYOUT.COLUMN_SYSTEMS.HOLYGRAIL": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "holy-grail",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "rail",
      "footer"
    ]
  },
  "LAYOUT.COLUMN_SYSTEMS.RESPONSIVETHREEPANE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "three-column",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "inspector",
      "list",
      "details",
      "footer"
    ]
  },
  "LAYOUT.APP_SHELLS.SIDEBARSHELL": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "sidebar-shell",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "filters",
      "footer"
    ]
  },
  "LAYOUT.APP_SHELLS.TOPNAVIGATION": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "topnav",
    "gridRegions": [
      "header",
      "nav",
      "sidebar",
      "main",
      "footer"
    ]
  },
  "LAYOUT.APP_SHELLS.TOPNAVSIDEBAR": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "topnav-sidebar",
    "gridRegions": [
      "header",
      "nav",
      "sidebar",
      "main",
      "footer"
    ]
  },
  "LAYOUT.APP_SHELLS.COLLAPSIBLESIDEBAR": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "sidebar-shell",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "filters",
      "footer"
    ]
  },
  "LAYOUT.APP_SHELLS.DOUBLESIDEBAR": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "double-sidebar",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "inspector",
      "list",
      "details",
      "footer"
    ]
  },
  "LAYOUT.APP_SHELLS.FIXEDAPPSHELL": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "fixed-shell",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.SPLIT_PANE.SPLITSCREEN": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "split",
    "gridRegions": [
      "header",
      "toolbar",
      "main",
      "preview",
      "footer"
    ]
  },
  "LAYOUT.SPLIT_PANE.MASTERDETAIL": {
    "primarySlot": "details",
    "placementStatus": "source-declared",
    "template": "master-detail",
    "gridRegions": [
      "header",
      "toolbar",
      "list",
      "details",
      "footer"
    ]
  },
  "LAYOUT.SPLIT_PANE.LISTDETAILINSPECTOR": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "list-detail-inspector",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "inspector",
      "list",
      "details",
      "footer"
    ]
  },
  "LAYOUT.SPLIT_PANE.RESIZABLESPLITPANE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "resizable-split",
    "gridRegions": [
      "header",
      "toolbar",
      "main",
      "preview",
      "footer"
    ]
  },
  "LAYOUT.SPLIT_PANE.SCROLLABLEPANE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "scroll-panes",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.GRID_SYSTEMS.DASHBOARDGRID": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "dashboard",
    "gridRegions": []
  },
  "LAYOUT.GRID_SYSTEMS.CARDGRID": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "card-grid",
    "gridRegions": []
  },
  "LAYOUT.GRID_SYSTEMS.BENTOGRID": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "bento",
    "gridRegions": []
  },
  "LAYOUT.GRID_SYSTEMS.MASONRY": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "masonry",
    "gridRegions": []
  },
  "LAYOUT.GRID_SYSTEMS.RESPONSIVEADAPTIVE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "adaptive",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.GRID_SYSTEMS.INTRINSIC": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "intrinsic",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.WORKSPACE.WORKBENCH": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "workbench",
    "gridRegions": [
      "header",
      "toolbar",
      "palette",
      "canvas",
      "inspector",
      "timeline",
      "statusbar"
    ]
  },
  "LAYOUT.WORKSPACE.IDE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "ide",
    "gridRegions": [
      "toolbar",
      "sidebar",
      "main",
      "inspector",
      "dock",
      "statusbar"
    ]
  },
  "LAYOUT.WORKSPACE.STUDIO": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "studio",
    "gridRegions": [
      "header",
      "toolbar",
      "palette",
      "canvas",
      "inspector",
      "timeline",
      "statusbar"
    ]
  },
  "LAYOUT.WORKSPACE.TABBEDWORKSPACE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "tabbed",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.WORKSPACE.DOCKABLEPANEL": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "dockable",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.WORKSPACE.BUILDER": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "builder",
    "gridRegions": [
      "header",
      "toolbar",
      "palette",
      "canvas",
      "inspector",
      "timeline",
      "statusbar"
    ]
  },
  "LAYOUT.WORKSPACE.PAGEBUILDER": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "builder",
    "gridRegions": [
      "header",
      "toolbar",
      "palette",
      "canvas",
      "inspector",
      "timeline",
      "statusbar"
    ]
  },
  "LAYOUT.WORKSPACE.WORKFLOWBUILDER": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "workflow-builder",
    "gridRegions": [
      "header",
      "toolbar",
      "palette",
      "canvas",
      "inspector",
      "timeline",
      "statusbar"
    ]
  },
  "LAYOUT.CANVAS_SPATIAL.CANVAS": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "canvas",
    "gridRegions": [
      "toolbar",
      "canvas",
      "statusbar"
    ]
  },
  "LAYOUT.CANVAS_SPATIAL.SPATIALCAD": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "spatial-cad",
    "gridRegions": [
      "header",
      "toolbar",
      "palette",
      "canvas",
      "inspector",
      "timeline",
      "statusbar"
    ]
  },
  "LAYOUT.CANVAS_SPATIAL.MAPWORKSPACE": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "map",
    "gridRegions": [
      "toolbar",
      "canvas",
      "statusbar"
    ]
  },
  "LAYOUT.DATA_ANALYTICS.DATAEXPLORER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "data-explorer",
    "gridRegions": [
      "toolbar",
      "filters",
      "main",
      "details",
      "footer"
    ]
  },
  "LAYOUT.DATA_ANALYTICS.TABLEWORKSPACE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "table-workspace",
    "gridRegions": [
      "toolbar",
      "filters",
      "main",
      "details",
      "footer"
    ]
  },
  "LAYOUT.DATA_ANALYTICS.ANALYTICS": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "analytics",
    "gridRegions": []
  },
  "LAYOUT.DATA_ANALYTICS.COMPARISON": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "comparison",
    "gridRegions": [
      "header",
      "toolbar",
      "main",
      "preview",
      "footer"
    ]
  },
  "LAYOUT.DATA_ANALYTICS.BEFOREAFTER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "comparison",
    "gridRegions": [
      "header",
      "toolbar",
      "main",
      "preview",
      "footer"
    ]
  },
  "LAYOUT.PLANNING.KANBAN": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "kanban",
    "gridRegions": []
  },
  "LAYOUT.PLANNING.BOARD": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "board",
    "gridRegions": []
  },
  "LAYOUT.PLANNING.TIMELINE": {
    "primarySlot": "details",
    "placementStatus": "source-declared",
    "template": "timeline",
    "gridRegions": [
      "toolbar",
      "sidebar",
      "timeline",
      "details"
    ]
  },
  "LAYOUT.PLANNING.GANTT": {
    "primarySlot": "details",
    "placementStatus": "source-declared",
    "template": "gantt",
    "gridRegions": [
      "toolbar",
      "sidebar",
      "timeline",
      "details"
    ]
  },
  "LAYOUT.PLANNING.CALENDAR": {
    "primarySlot": "details",
    "placementStatus": "source-declared",
    "template": "calendar",
    "gridRegions": [
      "toolbar",
      "sidebar",
      "timeline",
      "details"
    ]
  },
  "LAYOUT.PLANNING.SCHEDULER": {
    "primarySlot": "details",
    "placementStatus": "source-declared",
    "template": "scheduler",
    "gridRegions": [
      "toolbar",
      "sidebar",
      "timeline",
      "details"
    ]
  },
  "LAYOUT.COMMUNICATION.INBOX": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "inbox",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "inspector",
      "list",
      "details",
      "footer"
    ]
  },
  "LAYOUT.COMMUNICATION.CHAT": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "chat",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "inspector",
      "list",
      "details",
      "footer"
    ]
  },
  "LAYOUT.COMMUNICATION.SOCIALFEED": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "social-feed",
    "gridRegions": []
  },
  "LAYOUT.COMMUNICATION.CRM": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "crm",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "inspector",
      "list",
      "details",
      "footer"
    ]
  },
  "LAYOUT.MEDIA.GALLERY": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "gallery",
    "gridRegions": []
  },
  "LAYOUT.MEDIA.LIGHTBOX": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "lightbox",
    "gridRegions": [
      "main"
    ]
  },
  "LAYOUT.MEDIA.MEDIAEDITING": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "media-editor",
    "gridRegions": [
      "toolbar",
      "sidebar",
      "main",
      "inspector",
      "dock",
      "statusbar"
    ]
  },
  "LAYOUT.MEDIA.VIDEOEDITING": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "video-editor",
    "gridRegions": [
      "toolbar",
      "sidebar",
      "main",
      "inspector",
      "dock",
      "statusbar"
    ]
  },
  "LAYOUT.MEDIA.PRESENTATION": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "presentation",
    "gridRegions": [
      "toolbar",
      "sidebar",
      "main",
      "rail",
      "footer"
    ]
  },
  "LAYOUT.FORMS_PROCESS.WIZARD": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "wizard",
    "gridRegions": [
      "header",
      "nav",
      "main",
      "rail",
      "actions"
    ]
  },
  "LAYOUT.FORMS_PROCESS.STEPPERFORM": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "wizard",
    "gridRegions": [
      "header",
      "nav",
      "main",
      "rail",
      "actions"
    ]
  },
  "LAYOUT.FORMS_PROCESS.FORMPREVIEW": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "form-preview",
    "gridRegions": [
      "header",
      "toolbar",
      "main",
      "preview",
      "footer"
    ]
  },
  "LAYOUT.FORMS_PROCESS.APPROVALWORKSPACE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "approval",
    "gridRegions": [
      "header",
      "nav",
      "main",
      "rail",
      "actions"
    ]
  },
  "LAYOUT.FORMS_PROCESS.REVIEW": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "review",
    "gridRegions": [
      "header",
      "nav",
      "main",
      "rail",
      "actions"
    ]
  },
  "LAYOUT.COMMERCE.FACETEDCOMMERCE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "commerce",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "filters",
      "footer"
    ]
  },
  "LAYOUT.COMMERCE.PRODUCTDETAIL": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "product-detail",
    "gridRegions": [
      "header",
      "nav",
      "main",
      "rail",
      "actions",
      "footer"
    ]
  },
  "LAYOUT.COMMERCE.MARKETPLACE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "marketplace",
    "gridRegions": [
      "header",
      "nav",
      "main",
      "rail",
      "actions",
      "footer"
    ]
  },
  "LAYOUT.COMMERCE.BOOKING": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "booking",
    "gridRegions": [
      "header",
      "nav",
      "main",
      "rail",
      "actions",
      "footer"
    ]
  },
  "LAYOUT.COMMERCE.CHECKOUT": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "checkout",
    "gridRegions": [
      "header",
      "nav",
      "main",
      "rail",
      "actions",
      "footer"
    ]
  },
  "LAYOUT.COMMERCE.PRICING": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "pricing",
    "gridRegions": [
      "header",
      "nav",
      "main",
      "rail",
      "actions",
      "footer"
    ]
  },
  "LAYOUT.DOCUMENTATION.DOCUMENTEDITOR": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "document",
    "gridRegions": [
      "toolbar",
      "sidebar",
      "main",
      "rail",
      "footer"
    ]
  },
  "LAYOUT.DOCUMENTATION.KNOWLEDGEBASE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "documentation",
    "gridRegions": [
      "toolbar",
      "sidebar",
      "main",
      "rail",
      "footer"
    ]
  },
  "LAYOUT.DOCUMENTATION.DOCUMENTATION": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "documentation",
    "gridRegions": [
      "toolbar",
      "sidebar",
      "main",
      "rail",
      "footer"
    ]
  },
  "LAYOUT.DOCUMENTATION.SEARCHRESULTS": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "search-results",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "filters",
      "footer"
    ]
  },
  "LAYOUT.MARKETING.LANDINGPAGE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "landing",
    "gridRegions": [
      "header",
      "nav",
      "hero",
      "toolbar",
      "main",
      "actions",
      "footer"
    ]
  },
  "LAYOUT.MARKETING.MAGAZINE": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "magazine",
    "gridRegions": []
  },
  "LAYOUT.MARKETING.NEWSPAPER": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "newspaper",
    "gridRegions": []
  },
  "LAYOUT.RESPONSIVE_MOBILE.MOBILESTACK": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "mobile-stack",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.RESPONSIVE_MOBILE.MOBILETAB": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "mobile-tabs",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.RESPONSIVE_MOBILE.BOTTOMNAVIGATIONAPP": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "mobile-bottom-nav",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.RESPONSIVE_MOBILE.MOBILEMASTERDETAIL": {
    "primarySlot": "details",
    "placementStatus": "source-declared",
    "template": "mobile-master-detail",
    "gridRegions": [
      "header",
      "toolbar",
      "list",
      "details",
      "footer"
    ]
  },
  "LAYOUT.RESPONSIVE_MOBILE.SIDEBARTODRAWER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "sidebar-drawer",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.RESPONSIVE_MOBILE.INSPECTORTOSHEET": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "inspector-sheet",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.OVERLAY_TEMPORARY.ACCORDION": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "accordion",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.OVERLAY_TEMPORARY.DISCLOSURE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "disclosure",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.OVERLAY_TEMPORARY.DRAWER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "drawer",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.OVERLAY_TEMPORARY.MODALWORKSPACE": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "modal-workspace",
    "gridRegions": [
      "main"
    ]
  },
  "LAYOUT.OVERLAY_TEMPORARY.BOTTOMSHEET": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "bottom-sheet",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.OPERATIONAL.COMMANDCENTER": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "command-center",
    "gridRegions": []
  },
  "LAYOUT.OPERATIONAL.COCKPIT": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "cockpit",
    "gridRegions": []
  },
  "LAYOUT.OPERATIONAL.CONTROLROOM": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "control-room",
    "gridRegions": []
  },
  "LAYOUT.OPERATIONAL.OPERATIONSWALLBOARD": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "wallboard",
    "gridRegions": []
  },
  "LAYOUT.OPERATIONAL.HUD": {
    "primarySlot": "canvas",
    "placementStatus": "source-declared",
    "template": "hud",
    "gridRegions": [
      "toolbar",
      "canvas",
      "statusbar"
    ]
  },
  "LAYOUT.OPERATIONAL.KIOSK": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "kiosk",
    "gridRegions": [
      "main"
    ]
  },
  "LAYOUT.OPERATIONAL.TVLARGESCREEN": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "tv",
    "gridRegions": [
      "main"
    ]
  },
  "LAYOUT.OPERATIONAL.STICKYHEADER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "sticky-header",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.OPERATIONAL.STICKYSIDEBAR": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "sticky-sidebar",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "filters",
      "footer"
    ]
  },
  "LAYOUT.OPERATIONAL.STICKYACTIONFOOTER": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "sticky-footer",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "main",
      "details",
      "actions",
      "footer",
      "bottomnav"
    ]
  },
  "LAYOUT.OPERATIONAL.SETTINGS": {
    "primarySlot": "main",
    "placementStatus": "source-declared",
    "template": "settings",
    "gridRegions": [
      "header",
      "nav",
      "toolbar",
      "sidebar",
      "main",
      "filters",
      "footer"
    ]
  },
  "LAYOUT.OPERATIONAL.PROFILE": {
    "primarySlot": "main",
    "placementStatus": "fallback-main",
    "template": "profile",
    "gridRegions": []
  }
};
