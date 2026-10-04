export type RegistryDefinition = Readonly<{ ordinal: number; id: string; name: string; group: string; authority: string; kind: "meta" | "catalog" }>;

export const REGISTRY_REGISTRY = [
  {
    ordinal: 0,
    id: "REGISTRY.REGISTRY",
    name: "Registry Registry",
    group: "META",
    authority: "@maataa/ui",
    kind: "meta"
  },
  {
    ordinal: 1,
    id: "REGISTRY.UI_STRUCTURE.WORKSPACE",
    name: "Workspace Registry",
    group: "UI_STRUCTURE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 2,
    id: "REGISTRY.UI_STRUCTURE.PAGE",
    name: "Page Registry",
    group: "UI_STRUCTURE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 3,
    id: "REGISTRY.UI_STRUCTURE.LAYOUT",
    name: "Layout Registry",
    group: "UI_STRUCTURE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 4,
    id: "REGISTRY.UI_STRUCTURE.LAYOUT_ATOM",
    name: "Layout Atom Registry",
    group: "UI_STRUCTURE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 5,
    id: "REGISTRY.UI_STRUCTURE.REGION",
    name: "Region Registry",
    group: "UI_STRUCTURE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 6,
    id: "REGISTRY.UI_STRUCTURE.SLOT",
    name: "Slot Registry",
    group: "UI_STRUCTURE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 7,
    id: "REGISTRY.UI_STRUCTURE.COMPONENT",
    name: "Component Registry",
    group: "UI_STRUCTURE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 8,
    id: "REGISTRY.UI_STRUCTURE.ATOMIC_COMPONENT",
    name: "Atomic Component Registry",
    group: "UI_STRUCTURE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 9,
    id: "REGISTRY.UI_STRUCTURE.COMPOUND_COMPONENT",
    name: "Compound Component Registry",
    group: "UI_STRUCTURE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 10,
    id: "REGISTRY.UI_STRUCTURE.COMPOSITION",
    name: "Composition Registry",
    group: "UI_STRUCTURE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 11,
    id: "REGISTRY.UI_STRUCTURE.PATTERN",
    name: "Pattern Registry",
    group: "UI_STRUCTURE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 12,
    id: "REGISTRY.UI_STRUCTURE.TEMPLATE",
    name: "Template Registry",
    group: "UI_STRUCTURE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 13,
    id: "REGISTRY.VISUAL_SYSTEM.DESIGN_TOKEN",
    name: "Design Token Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 14,
    id: "REGISTRY.VISUAL_SYSTEM.THEME",
    name: "Theme Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 15,
    id: "REGISTRY.VISUAL_SYSTEM.COLOR",
    name: "Color Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 16,
    id: "REGISTRY.VISUAL_SYSTEM.TYPOGRAPHY",
    name: "Typography Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 17,
    id: "REGISTRY.VISUAL_SYSTEM.SPACING",
    name: "Spacing Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 18,
    id: "REGISTRY.VISUAL_SYSTEM.RADIUS",
    name: "Radius Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 19,
    id: "REGISTRY.VISUAL_SYSTEM.SHADOW_ELEVATION",
    name: "Shadow/Elevation Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 20,
    id: "REGISTRY.VISUAL_SYSTEM.MOTION",
    name: "Motion Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 21,
    id: "REGISTRY.VISUAL_SYSTEM.EFFECT",
    name: "Effect Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 22,
    id: "REGISTRY.VISUAL_SYSTEM.BREAKPOINT",
    name: "Breakpoint Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 23,
    id: "REGISTRY.VISUAL_SYSTEM.DENSITY",
    name: "Density Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 24,
    id: "REGISTRY.VISUAL_SYSTEM.Z_INDEX_LAYER",
    name: "Z-Index/Layer Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 25,
    id: "REGISTRY.VISUAL_SYSTEM.ICON",
    name: "Icon Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 26,
    id: "REGISTRY.VISUAL_SYSTEM.ILLUSTRATION",
    name: "Illustration Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 27,
    id: "REGISTRY.VISUAL_SYSTEM.ASSET",
    name: "Asset Registry",
    group: "VISUAL_SYSTEM",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 28,
    id: "REGISTRY.BEHAVIOR.STATE",
    name: "State Registry",
    group: "BEHAVIOR",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 29,
    id: "REGISTRY.BEHAVIOR.INTERACTION",
    name: "Interaction Registry",
    group: "BEHAVIOR",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 30,
    id: "REGISTRY.BEHAVIOR.ACTION",
    name: "Action Registry",
    group: "BEHAVIOR",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 31,
    id: "REGISTRY.BEHAVIOR.COMMAND",
    name: "Command Registry",
    group: "BEHAVIOR",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 32,
    id: "REGISTRY.BEHAVIOR.EVENT",
    name: "Event Registry",
    group: "BEHAVIOR",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 33,
    id: "REGISTRY.BEHAVIOR.GESTURE",
    name: "Gesture Registry",
    group: "BEHAVIOR",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 34,
    id: "REGISTRY.BEHAVIOR.KEYBOARD_SHORTCUT",
    name: "Keyboard Shortcut Registry",
    group: "BEHAVIOR",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 35,
    id: "REGISTRY.BEHAVIOR.FOCUS",
    name: "Focus Registry",
    group: "BEHAVIOR",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 36,
    id: "REGISTRY.BEHAVIOR.SELECTION",
    name: "Selection Registry",
    group: "BEHAVIOR",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 37,
    id: "REGISTRY.BEHAVIOR.DRAG_AND_DROP",
    name: "Drag-and-Drop Registry",
    group: "BEHAVIOR",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 38,
    id: "REGISTRY.BEHAVIOR.TRANSITION",
    name: "Transition Registry",
    group: "BEHAVIOR",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 39,
    id: "REGISTRY.NAVIGATION.ROUTE",
    name: "Route Registry",
    group: "NAVIGATION",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 40,
    id: "REGISTRY.NAVIGATION.NAVIGATION",
    name: "Navigation Registry",
    group: "NAVIGATION",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 41,
    id: "REGISTRY.NAVIGATION.MENU",
    name: "Menu Registry",
    group: "NAVIGATION",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 42,
    id: "REGISTRY.NAVIGATION.BREADCRUMB",
    name: "Breadcrumb Registry",
    group: "NAVIGATION",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 43,
    id: "REGISTRY.NAVIGATION.TAB",
    name: "Tab Registry",
    group: "NAVIGATION",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 44,
    id: "REGISTRY.NAVIGATION.DEEP_LINK",
    name: "Deep-Link Registry",
    group: "NAVIGATION",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 45,
    id: "REGISTRY.NAVIGATION.ENTRY_POINT",
    name: "Entry-Point Registry",
    group: "NAVIGATION",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 46,
    id: "REGISTRY.NAVIGATION.REDIRECT",
    name: "Redirect Registry",
    group: "NAVIGATION",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 47,
    id: "REGISTRY.RESPONSIVE_DEVICE.VIEWPORT",
    name: "Viewport Registry",
    group: "RESPONSIVE_DEVICE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 48,
    id: "REGISTRY.RESPONSIVE_DEVICE.DEVICE",
    name: "Device Registry",
    group: "RESPONSIVE_DEVICE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 49,
    id: "REGISTRY.RESPONSIVE_DEVICE.RESPONSIVE_TRANSFORMATION",
    name: "Responsive Transformation Registry",
    group: "RESPONSIVE_DEVICE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 50,
    id: "REGISTRY.RESPONSIVE_DEVICE.INPUT_MODALITY",
    name: "Input Modality Registry",
    group: "RESPONSIVE_DEVICE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 51,
    id: "REGISTRY.RESPONSIVE_DEVICE.SAFE_AREA",
    name: "Safe-Area Registry",
    group: "RESPONSIVE_DEVICE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 52,
    id: "REGISTRY.RESPONSIVE_DEVICE.ORIENTATION",
    name: "Orientation Registry",
    group: "RESPONSIVE_DEVICE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 53,
    id: "REGISTRY.RESPONSIVE_DEVICE.CAPABILITY",
    name: "Capability Registry",
    group: "RESPONSIVE_DEVICE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 54,
    id: "REGISTRY.ACCESSIBILITY.ACCESSIBILITY_REQUIREMENT",
    name: "Accessibility Requirement Registry",
    group: "ACCESSIBILITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 55,
    id: "REGISTRY.ACCESSIBILITY.ARIA_ROLE",
    name: "ARIA Role Registry",
    group: "ACCESSIBILITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 56,
    id: "REGISTRY.ACCESSIBILITY.KEYBOARD_BEHAVIOR",
    name: "Keyboard Behavior Registry",
    group: "ACCESSIBILITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 57,
    id: "REGISTRY.ACCESSIBILITY.FOCUS_MANAGEMENT",
    name: "Focus Management Registry",
    group: "ACCESSIBILITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 58,
    id: "REGISTRY.ACCESSIBILITY.CONTRAST",
    name: "Contrast Registry",
    group: "ACCESSIBILITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 59,
    id: "REGISTRY.ACCESSIBILITY.REDUCED_MOTION",
    name: "Reduced Motion Registry",
    group: "ACCESSIBILITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 60,
    id: "REGISTRY.ACCESSIBILITY.TOUCH_TARGET",
    name: "Touch Target Registry",
    group: "ACCESSIBILITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 61,
    id: "REGISTRY.ACCESSIBILITY.ACCESSIBILITY_EVIDENCE",
    name: "Accessibility Evidence Registry",
    group: "ACCESSIBILITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 62,
    id: "REGISTRY.CONTENT.CONTENT_TYPE",
    name: "Content Type Registry",
    group: "CONTENT",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 63,
    id: "REGISTRY.CONTENT.COPY_PATTERN",
    name: "Copy Pattern Registry",
    group: "CONTENT",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 64,
    id: "REGISTRY.CONTENT.MESSAGE",
    name: "Message Registry",
    group: "CONTENT",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 65,
    id: "REGISTRY.CONTENT.ERROR_MESSAGE",
    name: "Error Message Registry",
    group: "CONTENT",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 66,
    id: "REGISTRY.CONTENT.EMPTY_STATE",
    name: "Empty-State Registry",
    group: "CONTENT",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 67,
    id: "REGISTRY.CONTENT.NOTIFICATION",
    name: "Notification Registry",
    group: "CONTENT",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 68,
    id: "REGISTRY.CONTENT.LOCALE",
    name: "Locale Registry",
    group: "CONTENT",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 69,
    id: "REGISTRY.CONTENT.TRANSLATION_KEY",
    name: "Translation Key Registry",
    group: "CONTENT",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 70,
    id: "REGISTRY.CONTENT.FORMATTING",
    name: "Formatting Registry",
    group: "CONTENT",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 71,
    id: "REGISTRY.FORMS.FIELD",
    name: "Field Registry",
    group: "FORMS",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 72,
    id: "REGISTRY.FORMS.INPUT",
    name: "Input Registry",
    group: "FORMS",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 73,
    id: "REGISTRY.FORMS.VALIDATION",
    name: "Validation Registry",
    group: "FORMS",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 74,
    id: "REGISTRY.FORMS.FORM_PATTERN",
    name: "Form Pattern Registry",
    group: "FORMS",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 75,
    id: "REGISTRY.FORMS.FORM_SCHEMA",
    name: "Form Schema Registry",
    group: "FORMS",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 76,
    id: "REGISTRY.FORMS.FORM_STATE",
    name: "Form State Registry",
    group: "FORMS",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 77,
    id: "REGISTRY.FORMS.ERROR_PRESENTATION",
    name: "Error Presentation Registry",
    group: "FORMS",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 78,
    id: "REGISTRY.FORMS.WIZARD",
    name: "Wizard Registry",
    group: "FORMS",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 79,
    id: "REGISTRY.DATA_DISPLAY.DATA_VIEW",
    name: "Data View Registry",
    group: "DATA_DISPLAY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 80,
    id: "REGISTRY.DATA_DISPLAY.COLUMN",
    name: "Column Registry",
    group: "DATA_DISPLAY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 81,
    id: "REGISTRY.DATA_DISPLAY.FILTER",
    name: "Filter Registry",
    group: "DATA_DISPLAY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 82,
    id: "REGISTRY.DATA_DISPLAY.SORT",
    name: "Sort Registry",
    group: "DATA_DISPLAY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 83,
    id: "REGISTRY.DATA_DISPLAY.PAGINATION",
    name: "Pagination Registry",
    group: "DATA_DISPLAY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 84,
    id: "REGISTRY.DATA_DISPLAY.CHART",
    name: "Chart Registry",
    group: "DATA_DISPLAY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 85,
    id: "REGISTRY.DATA_DISPLAY.VISUALIZATION",
    name: "Visualization Registry",
    group: "DATA_DISPLAY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 86,
    id: "REGISTRY.DATA_DISPLAY.METRIC",
    name: "Metric Registry",
    group: "DATA_DISPLAY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 87,
    id: "REGISTRY.DOMAIN_APPLICATION.PRODUCT",
    name: "Product Registry",
    group: "DOMAIN_APPLICATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 88,
    id: "REGISTRY.DOMAIN_APPLICATION.APPLICATION",
    name: "Application Registry",
    group: "DOMAIN_APPLICATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 89,
    id: "REGISTRY.DOMAIN_APPLICATION.MODULE",
    name: "Module Registry",
    group: "DOMAIN_APPLICATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 90,
    id: "REGISTRY.DOMAIN_APPLICATION.FEATURE",
    name: "Feature Registry",
    group: "DOMAIN_APPLICATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 91,
    id: "REGISTRY.DOMAIN_APPLICATION.CAPABILITY",
    name: "Capability Registry",
    group: "DOMAIN_APPLICATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 92,
    id: "REGISTRY.DOMAIN_APPLICATION.DOMAIN",
    name: "Domain Registry",
    group: "DOMAIN_APPLICATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 93,
    id: "REGISTRY.DOMAIN_APPLICATION.ENTITY",
    name: "Entity Registry",
    group: "DOMAIN_APPLICATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 94,
    id: "REGISTRY.DOMAIN_APPLICATION.RELATIONSHIP",
    name: "Relationship Registry",
    group: "DOMAIN_APPLICATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 95,
    id: "REGISTRY.DOMAIN_APPLICATION.FLOW",
    name: "Flow Registry",
    group: "DOMAIN_APPLICATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 96,
    id: "REGISTRY.DOMAIN_APPLICATION.JOURNEY",
    name: "Journey Registry",
    group: "DOMAIN_APPLICATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 97,
    id: "REGISTRY.DOMAIN_APPLICATION.ROLE",
    name: "Role Registry",
    group: "DOMAIN_APPLICATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 98,
    id: "REGISTRY.DOMAIN_APPLICATION.PERSONA",
    name: "Persona Registry",
    group: "DOMAIN_APPLICATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 99,
    id: "REGISTRY.IDENTITY_SECURITY.ACTOR",
    name: "Actor Registry",
    group: "IDENTITY_SECURITY",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 100,
    id: "REGISTRY.IDENTITY_SECURITY.ROLE",
    name: "Role Registry",
    group: "IDENTITY_SECURITY",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 101,
    id: "REGISTRY.IDENTITY_SECURITY.PERMISSION",
    name: "Permission Registry",
    group: "IDENTITY_SECURITY",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 102,
    id: "REGISTRY.IDENTITY_SECURITY.POLICY",
    name: "Policy Registry",
    group: "IDENTITY_SECURITY",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 103,
    id: "REGISTRY.IDENTITY_SECURITY.RESOURCE",
    name: "Resource Registry",
    group: "IDENTITY_SECURITY",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 104,
    id: "REGISTRY.IDENTITY_SECURITY.SESSION",
    name: "Session Registry",
    group: "IDENTITY_SECURITY",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 105,
    id: "REGISTRY.IDENTITY_SECURITY.AUTHENTICATION_METHOD",
    name: "Authentication Method Registry",
    group: "IDENTITY_SECURITY",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 106,
    id: "REGISTRY.IDENTITY_SECURITY.SECURITY_CONTROL",
    name: "Security Control Registry",
    group: "IDENTITY_SECURITY",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 107,
    id: "REGISTRY.API_INTEGRATION.API_SERVICE",
    name: "API Service Registry",
    group: "API_INTEGRATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 108,
    id: "REGISTRY.API_INTEGRATION.API_OPERATION",
    name: "API Operation Registry",
    group: "API_INTEGRATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 109,
    id: "REGISTRY.API_INTEGRATION.API_CONTRACT",
    name: "API Contract Registry",
    group: "API_INTEGRATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 110,
    id: "REGISTRY.API_INTEGRATION.API_ERROR",
    name: "API Error Registry",
    group: "API_INTEGRATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 111,
    id: "REGISTRY.API_INTEGRATION.API_ENVIRONMENT",
    name: "API Environment Registry",
    group: "API_INTEGRATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 112,
    id: "REGISTRY.API_INTEGRATION.INTEGRATION",
    name: "Integration Registry",
    group: "API_INTEGRATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 113,
    id: "REGISTRY.API_INTEGRATION.PROVIDER",
    name: "Provider Registry",
    group: "API_INTEGRATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 114,
    id: "REGISTRY.API_INTEGRATION.WEBHOOK",
    name: "Webhook Registry",
    group: "API_INTEGRATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 115,
    id: "REGISTRY.API_INTEGRATION.EVENT_CONTRACT",
    name: "Event Contract Registry",
    group: "API_INTEGRATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 116,
    id: "REGISTRY.API_INTEGRATION.ADAPTER",
    name: "Adapter Registry",
    group: "API_INTEGRATION",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 117,
    id: "REGISTRY.RUNTIME_CONTROL_PLANE.ENVIRONMENT",
    name: "Environment Registry",
    group: "RUNTIME_CONTROL_PLANE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 118,
    id: "REGISTRY.RUNTIME_CONTROL_PLANE.RUNTIME",
    name: "Runtime Registry",
    group: "RUNTIME_CONTROL_PLANE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 119,
    id: "REGISTRY.RUNTIME_CONTROL_PLANE.SERVICE",
    name: "Service Registry",
    group: "RUNTIME_CONTROL_PLANE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 120,
    id: "REGISTRY.RUNTIME_CONTROL_PLANE.DATABASE_TARGET",
    name: "Database Target Registry",
    group: "RUNTIME_CONTROL_PLANE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 121,
    id: "REGISTRY.RUNTIME_CONTROL_PLANE.STORAGE",
    name: "Storage Registry",
    group: "RUNTIME_CONTROL_PLANE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 122,
    id: "REGISTRY.RUNTIME_CONTROL_PLANE.QUEUE",
    name: "Queue Registry",
    group: "RUNTIME_CONTROL_PLANE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 123,
    id: "REGISTRY.RUNTIME_CONTROL_PLANE.INFRASTRUCTURE",
    name: "Infrastructure Registry",
    group: "RUNTIME_CONTROL_PLANE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 124,
    id: "REGISTRY.RUNTIME_CONTROL_PLANE.NETWORK",
    name: "Network Registry",
    group: "RUNTIME_CONTROL_PLANE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 125,
    id: "REGISTRY.RUNTIME_CONTROL_PLANE.SECRET_REFERENCE",
    name: "Secret Reference Registry",
    group: "RUNTIME_CONTROL_PLANE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 126,
    id: "REGISTRY.RUNTIME_CONTROL_PLANE.DEPLOYMENT",
    name: "Deployment Registry",
    group: "RUNTIME_CONTROL_PLANE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 127,
    id: "REGISTRY.RUNTIME_CONTROL_PLANE.BUILD",
    name: "Build Registry",
    group: "RUNTIME_CONTROL_PLANE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 128,
    id: "REGISTRY.RUNTIME_CONTROL_PLANE.ARTIFACT",
    name: "Artifact Registry",
    group: "RUNTIME_CONTROL_PLANE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 129,
    id: "REGISTRY.OPERATIONS.HEALTH",
    name: "Health Registry",
    group: "OPERATIONS",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 130,
    id: "REGISTRY.OPERATIONS.METRIC",
    name: "Metric Registry",
    group: "OPERATIONS",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 131,
    id: "REGISTRY.OPERATIONS.LOG_SOURCE",
    name: "Log Source Registry",
    group: "OPERATIONS",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 132,
    id: "REGISTRY.OPERATIONS.TRACE",
    name: "Trace Registry",
    group: "OPERATIONS",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 133,
    id: "REGISTRY.OPERATIONS.ALERT",
    name: "Alert Registry",
    group: "OPERATIONS",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 134,
    id: "REGISTRY.OPERATIONS.INCIDENT",
    name: "Incident Registry",
    group: "OPERATIONS",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 135,
    id: "REGISTRY.OPERATIONS.SLO",
    name: "SLO Registry",
    group: "OPERATIONS",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 136,
    id: "REGISTRY.OPERATIONS.BACKUP",
    name: "Backup Registry",
    group: "OPERATIONS",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 137,
    id: "REGISTRY.OPERATIONS.RECOVERY",
    name: "Recovery Registry",
    group: "OPERATIONS",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 138,
    id: "REGISTRY.OPERATIONS.RPO_RTO",
    name: "RPO/RTO Registry",
    group: "OPERATIONS",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 139,
    id: "REGISTRY.GOVERNANCE_EVIDENCE.PROVENANCE",
    name: "Provenance Registry",
    group: "GOVERNANCE_EVIDENCE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 140,
    id: "REGISTRY.GOVERNANCE_EVIDENCE.EVIDENCE",
    name: "Evidence Registry",
    group: "GOVERNANCE_EVIDENCE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 141,
    id: "REGISTRY.GOVERNANCE_EVIDENCE.AUDIT",
    name: "Audit Registry",
    group: "GOVERNANCE_EVIDENCE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 142,
    id: "REGISTRY.GOVERNANCE_EVIDENCE.DECISION",
    name: "Decision Registry",
    group: "GOVERNANCE_EVIDENCE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 143,
    id: "REGISTRY.GOVERNANCE_EVIDENCE.APPROVAL",
    name: "Approval Registry",
    group: "GOVERNANCE_EVIDENCE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 144,
    id: "REGISTRY.GOVERNANCE_EVIDENCE.POLICY",
    name: "Policy Registry",
    group: "GOVERNANCE_EVIDENCE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 145,
    id: "REGISTRY.GOVERNANCE_EVIDENCE.GATE",
    name: "Gate Registry",
    group: "GOVERNANCE_EVIDENCE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 146,
    id: "REGISTRY.GOVERNANCE_EVIDENCE.RISK",
    name: "Risk Registry",
    group: "GOVERNANCE_EVIDENCE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 147,
    id: "REGISTRY.GOVERNANCE_EVIDENCE.EXCEPTION",
    name: "Exception Registry",
    group: "GOVERNANCE_EVIDENCE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 148,
    id: "REGISTRY.GOVERNANCE_EVIDENCE.COMPLIANCE",
    name: "Compliance Registry",
    group: "GOVERNANCE_EVIDENCE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 149,
    id: "REGISTRY.PACKAGE_DEVELOPER.PACKAGE",
    name: "Package Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 150,
    id: "REGISTRY.PACKAGE_DEVELOPER.EXPORT",
    name: "Export Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 151,
    id: "REGISTRY.PACKAGE_DEVELOPER.ATOMIC_IMPORT",
    name: "Atomic Import Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 152,
    id: "REGISTRY.PACKAGE_DEVELOPER.DEPENDENCY",
    name: "Dependency Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 153,
    id: "REGISTRY.PACKAGE_DEVELOPER.BOUNDARY",
    name: "Boundary Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 154,
    id: "REGISTRY.PACKAGE_DEVELOPER.VERSION",
    name: "Version Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 155,
    id: "REGISTRY.PACKAGE_DEVELOPER.DEPRECATION",
    name: "Deprecation Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 156,
    id: "REGISTRY.PACKAGE_DEVELOPER.COMPATIBILITY",
    name: "Compatibility Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 157,
    id: "REGISTRY.PACKAGE_DEVELOPER.CONSUMER",
    name: "Consumer Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 158,
    id: "REGISTRY.PACKAGE_DEVELOPER.STORY",
    name: "Story Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 159,
    id: "REGISTRY.PACKAGE_DEVELOPER.TEST",
    name: "Test Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 160,
    id: "REGISTRY.PACKAGE_DEVELOPER.DOCUMENTATION",
    name: "Documentation Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 161,
    id: "REGISTRY.QUALITY.TEST_CASE",
    name: "Test Case Registry",
    group: "QUALITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 162,
    id: "REGISTRY.QUALITY.CERTIFICATION",
    name: "Certification Registry",
    group: "QUALITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 163,
    id: "REGISTRY.QUALITY.BROWSER_SUPPORT",
    name: "Browser Support Registry",
    group: "QUALITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 164,
    id: "REGISTRY.QUALITY.DEVICE_SUPPORT",
    name: "Device Support Registry",
    group: "QUALITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 165,
    id: "REGISTRY.QUALITY.PERFORMANCE_BUDGET",
    name: "Performance Budget Registry",
    group: "QUALITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 166,
    id: "REGISTRY.QUALITY.ACCESSIBILITY_CERTIFICATION",
    name: "Accessibility Certification Registry",
    group: "QUALITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 167,
    id: "REGISTRY.QUALITY.VISUAL_REGRESSION",
    name: "Visual Regression Registry",
    group: "QUALITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 168,
    id: "REGISTRY.QUALITY.KNOWN_ISSUE",
    name: "Known Issue Registry",
    group: "QUALITY",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 169,
    id: "REGISTRY.RELEASE_LIFECYCLE.LIFECYCLE",
    name: "Lifecycle Registry",
    group: "RELEASE_LIFECYCLE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 170,
    id: "REGISTRY.RELEASE_LIFECYCLE.RELEASE",
    name: "Release Registry",
    group: "RELEASE_LIFECYCLE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 171,
    id: "REGISTRY.RELEASE_LIFECYCLE.RELEASE_GATE",
    name: "Release Gate Registry",
    group: "RELEASE_LIFECYCLE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 172,
    id: "REGISTRY.RELEASE_LIFECYCLE.MIGRATION",
    name: "Migration Registry",
    group: "RELEASE_LIFECYCLE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 173,
    id: "REGISTRY.RELEASE_LIFECYCLE.DEPLOYMENT_APPROVAL",
    name: "Deployment Approval Registry",
    group: "RELEASE_LIFECYCLE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 174,
    id: "REGISTRY.RELEASE_LIFECYCLE.ROLLBACK",
    name: "Rollback Registry",
    group: "RELEASE_LIFECYCLE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 175,
    id: "REGISTRY.RELEASE_LIFECYCLE.CHANGE",
    name: "Change Registry",
    group: "RELEASE_LIFECYCLE",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 176,
    id: "REGISTRY.RELEASE_LIFECYCLE.BREAKING_CHANGE",
    name: "Breaking Change Registry",
    group: "RELEASE_LIFECYCLE",
    authority: "host-or-platform",
    kind: "catalog"
  }
,
  {
    ordinal: 177,
    id: "REGISTRY.GENERATION.GENERATOR",
    name: "Generator Registry",
    group: "GENERATION",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 178,
    id: "REGISTRY.TOOLING.TOOL",
    name: "Tool Registry",
    group: "TOOLING",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 179,
    id: "REGISTRY.AI_SPACE.SPACE",
    name: "AI Space Registry",
    group: "AI_SPACE",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 180,
    id: "REGISTRY.AI.MODEL",
    name: "Model Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 181,
    id: "REGISTRY.AI.MODEL_CAPABILITY",
    name: "Model Capability Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 182,
    id: "REGISTRY.AI.MODEL_VERSION",
    name: "Model Version Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 183,
    id: "REGISTRY.AI.AGENT",
    name: "Agent Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 184,
    id: "REGISTRY.AI.AGENT_VERSION",
    name: "Agent Version Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 185,
    id: "REGISTRY.AI.PROMPT",
    name: "Prompt Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 186,
    id: "REGISTRY.AI.PROMPT_TEMPLATE",
    name: "Prompt Template Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 187,
    id: "REGISTRY.AI.TOOL",
    name: "AI Tool Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 188,
    id: "REGISTRY.AI.FUNCTION",
    name: "Function Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 189,
    id: "REGISTRY.AI.CONNECTOR",
    name: "Connector Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 190,
    id: "REGISTRY.AI.MCP_SERVER",
    name: "MCP Server Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 191,
    id: "REGISTRY.AI.KNOWLEDGE_SOURCE",
    name: "Knowledge Source Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 192,
    id: "REGISTRY.AI.KNOWLEDGE_INDEX",
    name: "Knowledge Index Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 193,
    id: "REGISTRY.AI.EMBEDDING_MODEL",
    name: "Embedding Model Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 194,
    id: "REGISTRY.AI.RETRIEVER",
    name: "Retriever Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 195,
    id: "REGISTRY.AI.RERANKER",
    name: "Reranker Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 196,
    id: "REGISTRY.AI.DATASET",
    name: "Dataset Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 197,
    id: "REGISTRY.AI.EVALUATION",
    name: "Evaluation Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 198,
    id: "REGISTRY.AI.EVALUATOR",
    name: "Evaluator Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 199,
    id: "REGISTRY.AI.RUBRIC",
    name: "Rubric Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 200,
    id: "REGISTRY.AI.GUARDRAIL",
    name: "Guardrail Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 201,
    id: "REGISTRY.AI.SAFETY_POLICY",
    name: "Safety Policy Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 202,
    id: "REGISTRY.AI.ROUTER",
    name: "Router Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 203,
    id: "REGISTRY.AI.WORKFLOW",
    name: "AI Workflow Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 204,
    id: "REGISTRY.AI.CONTEXT_POLICY",
    name: "Context Policy Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 205,
    id: "REGISTRY.AI.MEMORY_POLICY",
    name: "Memory Policy Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 206,
    id: "REGISTRY.AI.OUTPUT_SCHEMA",
    name: "Output Schema Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 207,
    id: "REGISTRY.AI.PROVIDER",
    name: "AI Provider Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 208,
    id: "REGISTRY.AI.RUNTIME_BINDING",
    name: "AI Runtime Binding Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 209,
    id: "REGISTRY.AI.OBSERVABILITY_METRIC",
    name: "AI Observability Metric Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 210,
    id: "REGISTRY.AI.COST_POLICY",
    name: "AI Cost Policy Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 211,
    id: "REGISTRY.AI.EVIDENCE",
    name: "AI Evidence Registry",
    group: "AI",
    authority: "host-or-platform",
    kind: "catalog"
  },
  {
    ordinal: 212,
    id: "REGISTRY.PACKAGE_DEVELOPER.REDUX_SLICE",
    name: "Redux Slice Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 213,
    id: "REGISTRY.PACKAGE_DEVELOPER.REDUX_SELECTOR",
    name: "Redux Selector Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 214,
    id: "REGISTRY.PACKAGE_DEVELOPER.TYPE_CONTRACT",
    name: "Type Contract Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 215,
    id: "REGISTRY.PACKAGE_DEVELOPER.DEMO_DATASET",
    name: "Demo Dataset Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
  {
    ordinal: 216,
    id: "REGISTRY.PACKAGE_DEVELOPER.DEMO_SCENARIO",
    name: "Demo Scenario Registry",
    group: "PACKAGE_DEVELOPER",
    authority: "@maataa/ui",
    kind: "catalog"
  },
] as const satisfies readonly RegistryDefinition[];
