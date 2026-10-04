import * as React from "react";
import { DEMO_IDENTITY_BY_ID } from "./identityRegistry";
import { IdentityAvatar } from "./IdentityAvatar";
import type { DemoIdentityId } from "./types";
export function IdentityBadge({ identity, size=28, showRole=false }: { identity: DemoIdentityId; size?: number; showRole?: boolean }) {
  const item=DEMO_IDENTITY_BY_ID[identity];
  return <span style={{display:"inline-flex",alignItems:"center",gap:8,minWidth:0}}><IdentityAvatar identity={identity} size={size}/><span style={{display:"grid",lineHeight:1.15,minWidth:0}}><strong style={{fontSize:13,whiteSpace:"nowrap"}}>{item.name}</strong>{showRole&&<small style={{fontSize:10,opacity:.66,whiteSpace:"nowrap"}}>{item.demoRole}</small>}</span></span>;
}
