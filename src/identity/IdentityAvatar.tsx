import * as React from "react";
import { DEMO_IDENTITY_BY_ID } from "./identityRegistry";
import type { DemoIdentityDefinition, DemoIdentityId, IdentityMotif } from "./types";

export interface IdentityAvatarProps {
  identity: DemoIdentityId | DemoIdentityDefinition;
  size?: number;
  showRing?: boolean;
  label?: string;
  className?: string;
}

function Motif({ motif }: { motif: IdentityMotif }) {
  const common = { fill:"none", stroke:"currentColor", strokeWidth:1.8, strokeLinecap:"round" as const, strokeLinejoin:"round" as const };
  switch (motif) {
    case "lotus": return <g {...common}><path d="M12 18c-4-1-6-4-6-7 3 0 5 1 6 3 1-2 3-3 6-3 0 3-2 6-6 7Z"/><path d="M12 14c-2-2-2-6 0-9 2 3 2 7 0 9Z"/><path d="M4.5 19.5h15"/></g>;
    case "trishul": return <g {...common}><path d="M12 4v15"/><path d="M8 5c0 2 1.5 3 4 3s4-1 4-3"/><path d="M8 5 6.5 7M16 5l1.5 2"/><path d="M9.5 18h5"/></g>;
    case "mountain-lotus": return <g {...common}><path d="m4 16 4.5-6 3 3 2.5-4 6 7"/><path d="M8 19c2.5-3 5.5-3 8 0"/><path d="M12 17c-1.4-1.6-1.2-3.3 0-4.6 1.2 1.3 1.4 3 0 4.6Z"/></g>;
    case "star": return <g {...common}><path d="m12 4 1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7L12 4Z"/><circle cx="5" cy="17.5" r="1"/><circle cx="19" cy="17.5" r="1"/></g>;
    case "book": return <g {...common}><path d="M4 6.5c3-1.3 5.7-.8 8 1.2v11c-2.3-2-5-2.5-8-1.2v-11Z"/><path d="M20 6.5c-3-1.3-5.7-.8-8 1.2v11c2.3-2 5-2.5 8-1.2v-11Z"/></g>;
    case "evidence": return <g {...common}><path d="M7 4h10l3 3v13H7Z"/><path d="M17 4v4h4"/><path d="m10 14 1.7 1.7L16 11.5"/></g>;
    case "flame-staff": return <g {...common}><path d="M12 6c2 2 3 3.8 3 5.5A3 3 0 0 1 9 12c0-1.7 1-3.8 3-6Z"/><path d="M12 12v8"/><path d="M9 20h6"/></g>;
    case "leaf": return <g {...common}><path d="M18.5 5.5C12 5.4 7.5 8.5 7.5 13c0 3 2 5.5 5 5.5 4.5 0 7.1-5.2 6-13Z"/><path d="M5 20c3-4 6-7 11-10"/></g>;
    case "lamp": return <g {...common}><path d="M7 13h10c0 4-2 6-5 6s-5-2-5-6Z"/><path d="M5 13h14"/><path d="M12 11c-1.5-1.5-1.4-3.2 0-5 1.4 1.8 1.5 3.5 0 5Z"/></g>;
    case "bow-star": return <g {...common}><path d="M7 5c6 3 6 11 0 14"/><path d="M8 12h9"/><path d="m17 9 3 3-3 3"/><path d="m17.5 5 .7 1.8L20 7.5l-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"/></g>;
    case "earth": return <g {...common}><circle cx="12" cy="12" r="7"/><path d="M5 12h14M12 5a11 11 0 0 1 0 14M12 5a11 11 0 0 0 0 14"/></g>;
    case "water": return <g {...common}><path d="M4 10c2 2 4 2 6 0s4-2 6 0 4 2 6 0"/><path d="M4 15c2 2 4 2 6 0s4-2 6 0 4 2 6 0"/></g>;
    case "fire": return <g {...common}><path d="M12 4c4 4 5 7 4 10.5A4.4 4.4 0 0 1 7.5 16C6 12.5 8.2 9 10 7.5c0 2 1 3 2 3.5.5-2 0-4.5 0-7Z"/></g>;
    case "air": return <g {...common}><path d="M4 9h10c2 0 2.5-3 0-3-1 0-1.7.5-2 1.2"/><path d="M4 13h14c2.5 0 2.5 3.5 0 3.5-1.2 0-2-.6-2.3-1.5"/><path d="M4 17h7"/></g>;
    case "space": return <g {...common}><circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="8" ry="4.5" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="8" ry="4.5" transform="rotate(-30 12 12)"/></g>;
  }
}

export function IdentityAvatar({ identity, size=40, showRing=true, label, className }: IdentityAvatarProps) {
  const def = typeof identity === "string" ? DEMO_IDENTITY_BY_ID[identity] : identity;
  const title = label ?? `${def.name} — ${def.title}`;
  const gradientId = React.useId().replace(/:/g, "");
  return <span className={className} role="img" aria-label={title} title={title} style={{ display:"inline-grid", placeItems:"center", width:size, height:size, borderRadius:"50%", flex:"0 0 auto", boxShadow: showRing ? `0 0 0 1px ${def.accent}66, 0 0 0 4px ${def.surface}` : undefined, background:def.surface, overflow:"hidden" }}>
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs><radialGradient id={gradientId}><stop offset="0" stopColor={def.accent} stopOpacity=".28"/><stop offset="1" stopColor={def.surface} stopOpacity="1"/></radialGradient></defs>
      <circle cx="24" cy="24" r="24" fill={`url(#${gradientId})`}/>
      <circle cx="24" cy="24" r="18.5" fill="none" stroke={def.accent} strokeOpacity=".24"/>
      <g transform="translate(12 9)" color={def.accent}><Motif motif={def.motif}/></g>
      <text x="24" y="40" textAnchor="middle" fontSize="7" fontWeight="700" fill={def.accent} opacity=".95">{def.glyph}</text>
    </svg>
  </span>;
}
