import { describe,it,expect } from 'vitest';
import { catalogueMediaFor,CATEGORY_MEDIA } from '../apps/tlps/src/selectors/catalogueMedia';
import { CATALOGUE_GROUPS,loadCatalogueGroup } from '../apps/tlps/src/selectors/catalogueModel';
import provenance from '../apps/tlps/src/selectors/assets/media-provenance.json';

describe('Shabdkosh media attribution and exact-entry boundaries',()=>{
  it('supplies local category media for every group',()=>{
    for(const group of CATALOGUE_GROUPS){const media=CATEGORY_MEDIA[group.id];expect(media.url).toBeTruthy();expect(media.kind).toBe('category');expect(media.credit).toBeTruthy();expect(media.alt).toBeTruthy();}
  });
  it('maps all 249 country codes to corresponding flags',async()=>{
    const rows=await loadCatalogueGroup('countries');
    expect(Object.keys(provenance.flags)).toHaveLength(249);
    for(const row of rows){const media=catalogueMediaFor(row,'countries');expect(media.kind).toBe('flag');expect(media.url).toBeTruthy();expect(media.alt).toContain(row.label);expect(media.source).toContain('/'+row.code?.toLowerCase()+'.svg');}
  });
  it('uses individual NASA visuals for all eight local planets, but not exoplanets',async()=>{
    const rows=await loadCatalogueGroup('planets');
    for(const row of rows.filter(x=>x.subtype==='Solar System planet')){const media=catalogueMediaFor(row,'planets');expect(media.kind).toBe('object');expect(media.source).toBe('https://science.nasa.gov/'+row.label.toLowerCase()+'/');}
    expect(catalogueMediaFor(rows.find(x=>x.subtype==='Exoplanet')!,'planets').kind).toBe('category');
  });
  it('does not pass Sun or Moon imagery off as an exact image of another object',async()=>{
    const stars=await loadCatalogueGroup('stars');expect(catalogueMediaFor(stars.find(x=>x.label==='Sirius')!,'stars').kind).toBe('category');expect(catalogueMediaFor(stars.find(x=>x.label==='Sun')!,'stars').kind).toBe('object');
    const moons=await loadCatalogueGroup('satellites');expect(catalogueMediaFor(moons.find(x=>x.label==='Moon')!,'satellites').kind).toBe('object');expect(catalogueMediaFor(moons.find(x=>x.label==='Phobos')!,'satellites').kind).toBe('category');
  });
});
