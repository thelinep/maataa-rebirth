import React, { useState } from 'react';
import type { CatalogueMedia } from './catalogueMedia';

export function CatalogueThumbnail({media,fallback,onDisplayedMediaChange}:{media:CatalogueMedia;fallback:CatalogueMedia;onDisplayedMediaChange?:(media:CatalogueMedia|null)=>void}){
  const [failures,setFailures]=useState(0);
  const current=failures?fallback:media;
  return <figure className={`shabd-thumbnail is-${current.kind}`}>
    {failures<2?<img src={current.url} alt={current.alt} width={88} height={66} loading="lazy" decoding="async" onError={()=>{const next=failures+1;setFailures(next);onDisplayedMediaChange?.(next===1?fallback:null);}}/>:<span className="shabd-image-failed">Image unavailable</span>}
    <figcaption title={failures>1?undefined:current.credit}>{failures>1?'Image unavailable':current.caption}</figcaption>
  </figure>;
}
