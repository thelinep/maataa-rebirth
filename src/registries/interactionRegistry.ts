export const UI_INTERACTIONS = ["click","double-click","hover","focus","blur","keyboard","drag","drop","resize","scroll","swipe","pinch","pan","zoom","select","multi-select","context-menu"] as const;
export type UIInteraction = (typeof UI_INTERACTIONS)[number];
