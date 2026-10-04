import * as React from "react";

export const MAATAA_ICON_NAMES = [
  "home","surface","playground","sandbox","demos","docs","help","support","copy","search","settings","user","users","workspace","page","layout","device","generator","tool","ai","registry","redux","type","database","evidence","activity","metrics","form","table","actions","chevron-right","plus","minus","check","warning","info","star","sparkles","menu","close","arrow-left","arrow-right"
] as const;
export type MaataaIconName = typeof MAATAA_ICON_NAMES[number];

const paths: Record<MaataaIconName, React.ReactNode> = {
  home:<><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
  surface:<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16M16 4v16M8 9h8M8 15h8"/></>,
  playground:<><path d="M5 6h14v12H5z"/><path d="m10 9 5 3-5 3z"/><path d="M8 3v3M16 3v3"/></>,
  sandbox:<><path d="m4 8 8-4 8 4-8 4-8-4Z"/><path d="m4 8v8l8 4 8-4V8"/><path d="M12 12v8"/></>,
  demos:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3z"/></>,
  docs:<><path d="M5 3h10l4 4v14H5z"/><path d="M15 3v5h5M8 12h8M8 16h8"/></>,
  help:<><circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.5 2.5 0 1 1 4.5 1.5c-.8.8-2.2 1.2-2.2 2.7M12 17h.01"/></>,
  support:<><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 13h3v6H5a1 1 0 0 1-1-1v-5ZM20 13h-3v6h2a1 1 0 0 0 1-1v-5Z"/><path d="M17 19c0 2-2 2-5 2"/></>,
  copy:<><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5H5v11h3"/></>,
  search:<><circle cx="11" cy="11" r="6"/><path d="m16 16 5 5"/></>,
  settings:<><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a8 8 0 0 0-1.7-1L14.5 3h-5L9 6a8 8 0 0 0-1.7 1L5 6 3 9.5 5 11a7 7 0 0 0 0 2l-2 1.5L5 18l2.3-1a8 8 0 0 0 1.7 1l.5 3h5l.5-3a8 8 0 0 0 1.7-1L19 18l2-3.5L19 13a7 7 0 0 0 .1-1Z"/></>,
  user:<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  users:<><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M14 16a5 5 0 0 1 7 4"/></>,
  workspace:<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 9v11"/></>,
  page:<><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h5"/></>,
  layout:<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/></>,
  device:<><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M10 5h4M11 19h2"/></>,
  generator:<><path d="m12 3 1.3 4.2L17.5 6 15 9.5l4 2.5-4 2.5 2.5 3.5-4.2-1.2L12 21l-1.3-4.2L6.5 18 9 14.5 5 12l4-2.5L6.5 6l4.2 1.2L12 3Z"/></>,
  tool:<><path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.3 2.3-3-3L14.7 6.3Z"/></>,
  ai:<><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><rect x="6" y="6" width="12" height="12" rx="3"/><circle cx="10" cy="11" r="1"/><circle cx="14" cy="11" r="1"/><path d="M9 15h6"/></>,
  registry:<><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></>,
  redux:<><path d="M6 15c2 4 8 5 11 1M7 9c3-4 9-3 11 1M4 12c0-2 1-4 3-5"/><circle cx="6" cy="16" r="1.5"/><circle cx="18" cy="10" r="1.5"/><circle cx="4" cy="12" r="1.5"/></>,
  type:<><path d="M5 5h14M12 5v14M8 19h8"/></>,
  database:<><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></>,
  evidence:<><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h5M9 13l2 2 4-4"/></>,
  activity:<><path d="M3 12h4l2-5 4 10 2-5h6"/></>,
  metrics:<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  form:<><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  table:<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 4v16M15 4v16"/></>,
  actions:<><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></>,
  "chevron-right":<path d="m9 5 7 7-7 7"/>,
  plus:<path d="M12 5v14M5 12h14"/>,
  minus:<path d="M5 12h14"/>,
  check:<path d="m5 12 4 4L19 6"/>,
  warning:<><path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v5M12 17h.01"/></>,
  info:<><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
  star:<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>,
  sparkles:<><path d="m8 3 1.2 3.8L13 8l-3.8 1.2L8 13l-1.2-3.8L3 8l3.8-1.2L8 3ZM17 12l.8 2.2L20 15l-2.2.8L17 18l-.8-2.2L14 15l2.2-.8L17 12Z"/></>,
  menu:<path d="M4 7h16M4 12h16M4 17h16"/>,
  close:<path d="m6 6 12 12M18 6 6 18"/>,
  "arrow-left":<><path d="M20 12H5"/><path d="m10 7-5 5 5 5"/></>,
  "arrow-right":<><path d="M4 12h15"/><path d="m14 7 5 5-5 5"/></>
};

export interface MaataaIconProps extends React.SVGAttributes<SVGSVGElement> { name: MaataaIconName; size?: number; title?: string; }
export function MaataaIcon({ name, size=18, title, ...props }: MaataaIconProps) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} {...props}>{title&&<title>{title}</title>}{paths[name]}</svg>;
}
