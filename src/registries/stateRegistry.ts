export const UI_STATES = ["idle","loading","empty","ready","success","warning","error","disabled","read-only","offline","syncing","stale","selected","expanded","collapsed","active","inactive"] as const;
export type UIState = (typeof UI_STATES)[number];
