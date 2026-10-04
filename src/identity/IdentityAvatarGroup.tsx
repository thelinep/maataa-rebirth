import * as React from "react";
import { IdentityAvatar } from "./IdentityAvatar";
import type { DemoIdentityId } from "./types";
export function IdentityAvatarGroup({ identities, size=36, max=8 }: { identities: readonly DemoIdentityId[]; size?: number; max?: number }) {
  const visible = identities.slice(0, max);
  const remainder = identities.length - visible.length;
  return <div style={{display:"flex",alignItems:"center"}}>{visible.map((id,index)=><span key={id} style={{marginInlineStart:index?-Math.round(size*.24):0}}><IdentityAvatar identity={id} size={size}/></span>)}{remainder>0&&<span style={{marginInlineStart:8,fontSize:12,opacity:.7}}>+{remainder}</span>}</div>;
}
