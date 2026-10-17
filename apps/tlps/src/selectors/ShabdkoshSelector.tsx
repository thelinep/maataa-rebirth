import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from '@maataa/ui/surfaces';
import { MaataaIcon } from '@maataa/ui/icons/MaataaIcon';
import { CATALOGUE_GROUPS, CATALOGUE_FAMILIES, CATALOGUE_DATE, CATALOGUE_TOTAL, loadCatalogueGroup, filterCatalogue, type CatalogueItem, type GroupId } from './catalogueModel';
import './shabdkosh-selector.css';
import { CatalogueIcon } from './CatalogueIcon';
import { CatalogueRow } from './CatalogueRow';

export const SELECTOR_GROUPS=CATALOGUE_GROUPS.map(group=>group.label);
const PAGE_SIZE=30;
export function ShabdkoshSelector({initialGroup='accounts'}:{initialGroup?:GroupId}) {
  const [open,setOpen]=useState(false);
  const [groupId,setGroupId]=useState<GroupId>(initialGroup);
  const [query,setQuery]=useState('');
  const [subtype,setSubtype]=useState('all');
  const [parent,setParent]=useState<string|null>(null);
  const [page,setPage]=useState(0);
  const [retry,setRetry]=useState(0);
  const [loaded,setLoaded]=useState<{id:GroupId;items:CatalogueItem[]}|null>(null);
  const [error,setError]=useState('');
  const [draft,setDraft]=useState<CatalogueItem|null>(null);
  const [selected,setSelected]=useState<CatalogueItem|null>(null);
  const group=CATALOGUE_GROUPS.find(g=>g.id===groupId)!;
  const items=loaded?.id===groupId?loaded.items:[];
  const loading=loaded?.id!==groupId&&!error;
  useEffect(()=>{
    if(!open)return;
    let active=true;setError('');setLoaded(null);
    loadCatalogueGroup(groupId).then(items=>{if(active)setLoaded({id:groupId,items});}).catch(()=>{if(active)setError('This catalogue could not be loaded. Retry or choose another category.');});
    return ()=>{active=false;};
  },[open,groupId,retry]);
  const filtered=useMemo(()=>filterCatalogue(items,query,subtype).filter(item=>!parent||item.parent===parent),[items,query,subtype,parent]);
  const types=useMemo(()=>[...new Set(items.map(item=>item.subtype))].sort(),[items]);
  const pages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const visible=filtered.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE);
  const changeGroup=(id:GroupId)=>{setGroupId(id);setQuery('');setSubtype('all');setParent(null);setPage(0);setError('');};
  const launch=(id:GroupId)=>{changeGroup(id);setDraft(selected);setOpen(true);};
  const related=(id:GroupId,parentId:string)=>{changeGroup(id);setParent(parentId);};
  return <section className="shabd-launch maataa-root">
    <h1>Shabdkosh selectors</h1>
    <p>Choose labels for your work, production, the world and space.</p>
    <p className="shabd-summary">{CATALOGUE_GROUPS.length} categories · {CATALOGUE_TOTAL.toLocaleString('en-IN')} catalogue entries · Snapshot {CATALOGUE_DATE}</p>
    <button type="button" className="shabd-primary" onClick={()=>launch(groupId)}>Open selector catalogue</button>
    <p role="status">{selected?`Selected: ${selected.label}`:'No label selected.'}</p>
    <div className="shabd-directory">{CATALOGUE_FAMILIES.map(family=><section key={family}><h2>{family}</h2><ul>{CATALOGUE_GROUPS.filter(g=>g.family===family).map(g=><li key={g.id}><button type="button" onClick={()=>launch(g.id)}><CatalogueIcon group={g.id} size={20}/><span>{g.label}</span><span>{g.count.toLocaleString('en-IN')}</span><MaataaIcon name="chevron-right" size={16}/></button></li>)}</ul></section>)}</div>
    <p className="shabd-note">Internal Shabdkosh labels, app-defined options and public reference snapshots. Each category states its source and coverage. Astronomy collections are bounded. Flags, NASA visuals and talent photo references are source-linked; category artwork is labelled separately.</p>
    <Modal open={open} onClose={()=>setOpen(false)} title="Choose a catalogue label" description="Browse a category, inspect its source and confirm a label."
      footer={<div className="shabd-footer"><p aria-live="polite">{draft?`Selected: ${draft.label}`:'Choose a label to continue.'}</p><div className="shabd-actions"><button type="button" onClick={()=>setOpen(false)}>Cancel</button><button type="button" className="shabd-primary" disabled={!draft} onClick={()=>{setSelected(draft);setOpen(false);}}>Use selected label</button></div></div>}>
      <div className="shabd-browser">
        <nav className="shabd-sidebar" aria-label="Catalogue categories">{CATALOGUE_FAMILIES.map(family=><div key={family}><h3>{family}</h3>{CATALOGUE_GROUPS.filter(g=>g.family===family).map(g=><button type="button" key={g.id} aria-current={groupId===g.id?'true':undefined} onClick={()=>changeGroup(g.id)}><CatalogueIcon group={g.id} size={18}/><span>{g.label}</span><span className="shabd-count">{g.count.toLocaleString('en-IN')}</span></button>)}</div>)}</nav>
        <div className="shabd-main">
          <label className="shabd-mobile-category">Category<select value={groupId} onChange={e=>changeGroup(e.target.value as GroupId)}>{CATALOGUE_GROUPS.map(g=><option key={g.id} value={g.id}>{g.label} ({g.count.toLocaleString('en-IN')})</option>)}</select></label>
          <header className="shabd-category-heading"><h3>{group.label}</h3><span>{group.count.toLocaleString('en-IN')} entries</span></header>
          <details className="shabd-coverage"><summary>Source & coverage · {CATALOGUE_DATE}</summary><p>{group.coverage}</p><p>Flags, NASA visuals and talent photographs have source credits. Other thumbnails are labelled category references or artwork, not images of the individual entry. Internal records remain unreviewed.</p></details>
          <div className="shabd-filters"><label>Search {group.label.toLowerCase()}<input type="search" value={query} onChange={e=>{setQuery(e.target.value);setPage(0);}} placeholder="Name, code or alias" /></label><label>Type<select value={subtype} onChange={e=>{setSubtype(e.target.value);setPage(0);}}><option value="all">All types</option>{types.map(type=><option key={type} value={type}>{type}</option>)}</select></label></div>
          {parent&&<p className="shabd-parent-filter">Orbiting {parent.replace(/^(system:|planet:solar:)/,'')} <button type="button" onClick={()=>{setParent(null);setPage(0);}}>Clear relationship filter</button></p>}
          <p className="shabd-result-count" role="status">{error?'Catalogue unavailable':loading?'Loading catalogue…':`${filtered.length.toLocaleString('en-IN')} results${filtered.length?` · ${page*PAGE_SIZE+1}–${Math.min((page+1)*PAGE_SIZE,filtered.length)}`:''}`}</p>
          <div className="shabd-results" aria-busy={loading} role="group" aria-label={`${group.label} labels`}>
            {error?<div className="shabd-empty" role="alert"><p>{error}</p><button type="button" onClick={()=>setRetry(x=>x+1)}>Retry catalogue</button></div>:loading?<div className="shabd-empty">Loading {group.label.toLowerCase()}…</div>:visible.length===0?<div className="shabd-empty"><p>No labels match these filters.</p><button type="button" onClick={()=>{setQuery('');setSubtype('all');setParent(null);setPage(0);}}>Clear filters</button></div>:visible.map(item=><CatalogueRow key={`${groupId}:${item.id}`} item={item} groupId={groupId} selected={draft?.id===item.id} onSelect={setDraft} onRelated={related}/>)}
          </div>
          <div className="shabd-pagination" aria-label="Result pages"><button type="button" disabled={page===0||loading||!!error} onClick={()=>setPage(p=>p-1)}>Previous</button><span>Page {page+1} of {pages}</span><button type="button" disabled={page+1>=pages||loading||!!error} onClick={()=>setPage(p=>p+1)}>Next</button></div>
        </div>
      </div>
    </Modal>
  </section>;
}
