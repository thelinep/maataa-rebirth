import React,{useState} from 'react';
import { CATALOGUE_SOURCES,type CatalogueItem,type GroupId } from './catalogueModel';
import { CatalogueIcon } from './CatalogueIcon';
import { CatalogueThumbnail } from './CatalogueThumbnail';
import { catalogueMediaFor,CATEGORY_MEDIA,type CatalogueMedia } from './catalogueMedia';

/** Row-local display state keeps rendered media and its credit together, including failures. */
export function CatalogueRow({item,groupId,selected,onSelect,onRelated,media:providedMedia}:{item:CatalogueItem;groupId:GroupId;selected:boolean;onSelect:(item:CatalogueItem)=>void;onRelated:(group:GroupId,parent:string)=>void;media?:CatalogueMedia}){
  const source=CATALOGUE_SOURCES[item.source];
  const original=providedMedia??catalogueMediaFor(item,groupId);
  const [displayed,setDisplayed]=useState<CatalogueMedia|null>(original);
  return <article className={`shabd-row${selected?' is-selected':''}`}>
    <label className="shabd-option"><input type="radio" name="shabdkosh-label" aria-label={`${item.label}${item.code?` · ${item.code}`:''}`} checked={selected} onChange={()=>onSelect(item)}/>
      <span className="shabd-symbol" title="MAATAA catalogue icon"><CatalogueIcon group={groupId} label={item.label} subtype={item.subtype} size={22}/></span>
      <span className="shabd-content"><strong>{item.label}</strong><span>{item.description||'Description missing in source.'}</span><small>{item.subtype}{item.code?` · ${item.code}`:''}</small></span>
      <CatalogueThumbnail media={original} fallback={CATEGORY_MEDIA[groupId]} onDisplayedMediaChange={setDisplayed}/>
    </label>
    <details className="shabd-metadata"><summary>Source & details</summary><dl>
      <dt>Source</dt><dd>{source?.url?<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>:source?.label??item.source}</dd>
      <dt>Record</dt><dd>{item.id}</dd><dt>Image</dt><dd>{displayed?<>{displayed.credit}{displayed.license&&<> · <a href={displayed.license} target="_blank" rel="noreferrer">License</a></>}{displayed.source&&<> · <a href={displayed.source} target="_blank" rel="noreferrer">Image source</a></>}</>:'Image unavailable; no image is displayed.'}{item.sourceImage&&<span className="shabd-legacy-image">Unverified legacy reference: {item.sourceImage}</span>}</dd>
      <dt>Icon</dt><dd>{item.sourceIcon?`Unverified source reference: ${item.sourceIcon}. `:''}MAATAA catalogue symbol; source icon references are not executed.</dd>
      {item.parent&&<><dt>Parent</dt><dd>{item.parent}</dd></>}
    </dl>
      {groupId==='systems'&&<button type="button" onClick={()=>onRelated('planets',item.id)}>Browse planets in this system</button>}
      {groupId==='planets'&&item.id.startsWith('planet:solar:')&&<button type="button" onClick={()=>onRelated('satellites',item.id)}>Browse satellites of {item.label}</button>}
    </details>
  </article>;
}
