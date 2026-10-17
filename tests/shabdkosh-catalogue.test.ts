import { describe, it, expect } from 'vitest';
import { CATALOGUE_GROUPS, CATALOGUE_SOURCES, loadCatalogueGroup, filterCatalogue } from '../apps/tlps/src/selectors/catalogueModel';
import manifest from '../apps/tlps/src/selectors/catalogue/manifest.json';
import source from '../apps/tlps/src/selectors/shabdkosh.snapshot.json';

describe('Shabdkosh catalogue integrity and bounded source coverage',()=>{
  it('populates all 27 selector categories and declares coverage',async()=>{
    expect(CATALOGUE_GROUPS).toHaveLength(28);
    for(const group of CATALOGUE_GROUPS){
      const rows=await loadCatalogueGroup(group.id);
      expect(rows.length).toBe(group.count);expect(rows.length).toBeGreaterThan(0);
      expect(group.coverage.length).toBeGreaterThan(30);
      expect(new Set(rows.map(x=>x.id)).size).toBe(rows.length);
      for(const row of rows){expect(row.label.trim()).not.toBe('');expect(CATALOGUE_SOURCES[row.source]).toBeDefined();}
    }
  });
  it('retains every original internal record across original categories',async()=>{
    const rows=(await Promise.all(['designations','features','other'].map(id=>loadCatalogueGroup(id as 'designations')))).flat();
    expect(rows.filter(x=>x.id.startsWith('internal:')).map(x=>x.code).sort()).toEqual(source.items.map(x=>x.id).sort());
  });
  it('has 249 unique country/territory codes and supports Bharat aliases',async()=>{
    const rows=await loadCatalogueGroup('countries');expect(rows).toHaveLength(249);
    expect(new Set(rows.map(x=>x.code)).size).toBe(249);
    for(const query of ['India','Bharat','Bhaarat','भारत','IND'])expect(filterCatalogue(rows,query).some(x=>x.id==='country:IN')).toBe(true);
  });
  it('keeps ISO language codes searchable without claiming UI translations',async()=>{
    const rows=await loadCatalogueGroup('languages');expect(rows).toHaveLength(manifest.groups.languages.count);
    expect(filterCatalogue(rows,'hin')[0].label).toBe('Hindi');
    expect(filterCatalogue(rows,'san').some(x=>x.label==='Sanskrit')).toBe(true);
    expect(manifest.groups.languages.coverage).toContain('does not translate');
  });
  it('distinguishes eight Solar System planets from confirmed exoplanets',async()=>{
    const rows=await loadCatalogueGroup('planets');const systems=await loadCatalogueGroup('systems');
    expect(filterCatalogue(rows,'','Solar System planet')).toHaveLength(8);
    expect(rows.some(x=>x.label==='Pluto')).toBe(false);
    const parents=new Set(systems.map(x=>x.id));
    for(const row of rows)expect(parents.has(row.parent!)).toBe(true);
  });
  it('keeps natural and artificial satellites separate with explicit scope',async()=>{
    const rows=await loadCatalogueGroup('satellites');
    expect(filterCatalogue(rows,'','Natural satellite')).toHaveLength(461);
    expect(filterCatalogue(rows,'','Artificial satellite')).toHaveLength(8);
    expect(rows.find(x=>x.label==='Moon')?.parent).toBe('planet:solar:earth');
    expect(rows.find(x=>x.label==='Phobos')?.parent).toBe('planet:solar:mars');
    expect(manifest.groups.satellites.coverage).toContain('not a global spacecraft registry');
  });
  it('includes only galaxy types from Messier, not nebulae or star clusters',async()=>{
    const rows=await loadCatalogueGroup('galaxies');expect(rows).toHaveLength(40);
    expect(rows.some(x=>x.label==='Andromeda Galaxy')).toBe(true);
    expect(rows.some(x=>x.code==='M42')).toBe(false);
  });
  it('matches accents, codes and aliases with all search terms',async()=>{
    const rows=await loadCatalogueGroup('stars');
    expect(filterCatalogue(rows,'sirius').some(x=>x.label==='Sirius')).toBe(true);
    expect(filterCatalogue(rows,'surya').some(x=>x.label==='Sun')).toBe(true);
    expect(filterCatalogue(rows,'unfindable_label_xyz')).toHaveLength(0);
  });
  it('does not promote legacy image paths or historical prices into current assets/offers',async()=>{
    for(const group of CATALOGUE_GROUPS){for(const item of await loadCatalogueGroup(group.id))expect(item.image).toBeNull();}
    const services=await loadCatalogueGroup('services');
    expect(services.every(x=>x.description?.includes('not current offers'))).toBe(true);
    expect(services.every(x=>!x.description?.includes('$'))).toBe(true);
  });
});
