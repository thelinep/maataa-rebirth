import { useMemo, useState } from "react";
import type { MaataaSurfaceFrame } from "./contracts.js";
import { modules, type MaataaModuleId } from "./modules.js";
import { Panel, StatusBadge } from "./components.js";
import type { MaataaClaim } from "./host.js";
export function MaataaWorkspace({frame,claims=[],capabilities=[]}: {frame:MaataaSurfaceFrame; claims?:readonly MaataaClaim[]; capabilities?:readonly string[]}) {
 const [active,setActive]=useState<MaataaModuleId>("overview"); const [query,setQuery]=useState("");
 const found=useMemo(()=>modules.filter(m=>(m.title+" "+m.description).toLowerCase().includes(query.toLowerCase())),[query]);
 const chosen=modules.find(m=>m.id===active)!; const available=!chosen.capability||capabilities.includes(chosen.capability);
 return <div className="maataa-workspace" dir={frame.locale.direction}>
  <aside className="maataa-workspace-nav"><div className="maataa-brand"><span>माता</span><strong>Maataa UI</strong></div><label className="maataa-search">Find a surface<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search modules" /></label><nav aria-label="Maataa modules">{found.map(m=><button key={m.id} type="button" aria-current={active===m.id?"page":undefined} onClick={()=>setActive(m.id)}>{m.title}<StatusBadge state={m.readiness}/></button>)}</nav></aside>
  <main className="maataa-workspace-main"><header><div><p className="maataa-eyebrow">{frame.product.name} / {frame.workspace.name}</p><h1>{chosen.title}</h1><p>{chosen.description}</p></div><StatusBadge state={chosen.readiness}/></header>
  {!available?<div className="maataa-boundary" role="status">This module is a design surface. The host has not configured its service capability.</div>:<div className="maataa-workspace-grid">
   <Panel title="Current context" eyebrow="Authority"><dl><dt>Actor</dt><dd>{frame.identity.displayName}</dd><dt>Role</dt><dd>{frame.authority.role}</dd><dt>Tenant</dt><dd>{frame.tenant.name}</dd><dt>Route</dt><dd>{frame.route.title}</dd></dl></Panel>
   <Panel title="Runtime & evidence" eyebrow="Trust boundary"><p>Runtime <StatusBadge state={frame.runtime.readiness}/></p><p>Evidence <StatusBadge state={frame.evidence.state}/></p><p>{frame.evidence.sourceCount} linked sources</p></Panel>
   {active==="evidence"&&<Panel title="Claims" eyebrow="Source review">{claims.length?claims.map(c=><article key={c.id}><p>{c.text} <StatusBadge state={c.state}/></p><ul>{c.sources.map((s,i)=><li key={i}>{s.url?<a href={s.url}>{s.label}</a>:s.label}</li>)}</ul></article>):<p>No claims provided by this host.</p>}</Panel>}
   {active==="approvals"&&<Panel title="Human decision" eyebrow="Governance"><p>Approvals must be supplied and recorded by the host product. This package does not grant authority.</p></Panel>}
  </div>}
  <footer>Interface preview · Runtime and capability states are provided by the host.</footer></main>
 </div>;
}
