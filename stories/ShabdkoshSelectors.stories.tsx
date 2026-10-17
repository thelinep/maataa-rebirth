import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CatalogueRow } from '../apps/tlps/src/selectors/CatalogueRow';
import { catalogueMediaFor } from '../apps/tlps/src/selectors/catalogueMedia';
import countries from '../apps/tlps/src/selectors/catalogue/countries.json';
import { ShabdkoshSelector } from '../apps/tlps/src/selectors/ShabdkoshSelector';
const meta={title:'Selectors/Shabdkosh',component:ShabdkoshSelector,parameters:{layout:'fullscreen'}} satisfies Meta<typeof ShabdkoshSelector>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Catalogue:Story={};
export const Languages:Story={args:{initialGroup:'languages'}};
export const Countries:Story={args:{initialGroup:'countries'}};
export const Space:Story={args:{initialGroup:'planets'}};
export const Production:Story={args:{initialGroup:'location'}};
export const Talents:Story={args:{initialGroup:'talents'}};

function FallbackPreview(){
  const [selected,setSelected]=React.useState(false);
  const item=countries.find(row=>row.code==='IN')!;
  const media={...catalogueMediaFor(item,'countries'),url:'./intentionally-missing-selector-flag.svg'};
  return <section className="shabd-launch maataa-root"><h1>Image fallback preview</h1><p>The flag request deliberately returns 404. The actual image-error handler should display an Earth category reference with the matching NASA credit.</p><CatalogueRow item={item} groupId="countries" selected={selected} onSelect={()=>setSelected(true)} onRelated={()=>{}} media={media}/></section>;
}
export const ImageFallback:Story={render:()=> <FallbackPreview/>};
