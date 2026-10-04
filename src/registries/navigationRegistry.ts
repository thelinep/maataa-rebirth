export const NAVIGATION_PATTERNS = ["top-nav","sidebar","double-sidebar","tabs","breadcrumbs","bottom-nav","command-menu","drawer","stepper","pagination","master-detail","deep-link"] as const;
export type NavigationPattern = (typeof NAVIGATION_PATTERNS)[number];
