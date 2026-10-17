import React from 'react';
import { fireEvent,render,screen } from '@testing-library/react';
import { describe,it,expect,vi } from 'vitest';
import { CatalogueRow } from '../apps/tlps/src/selectors/CatalogueRow';
import type { CatalogueItem } from '../apps/tlps/src/selectors/catalogueModel';
const india:CatalogueItem={id:'country:IN',label:'India',description:'Country entry',subtype:'Country / territory',source:'countries',code:'IN',parent:null,aliases:[],image:null,sourceImage:null};
function row(){render(<CatalogueRow item={india} groupId="countries" selected={false} onSelect={vi.fn()} onRelated={vi.fn()}/>);fireEvent.click(screen.getByText('Source & details'));}
describe('Thumbnail failure recovery and visible-image attribution',()=>{
 it('switches the failed flag and its source credit to the Earth category reference together',()=>{
  row();expect(screen.getByRole('link',{name:'Image source'}).getAttribute('href')).toContain('/in.svg');
  fireEvent.error(screen.getByRole('img',{name:'India flag'}));
  expect(screen.getByRole('img',{name:'Earth reference image for country and territory catalogue'})).toBeTruthy();
  expect(screen.getByRole('link',{name:'Image source'}).getAttribute('href')).toBe('https://science.nasa.gov/earth/');
  expect(screen.queryByText(/flag-icons v7.3.2/)).toBeNull();
 });
 it('removes image-source attribution when neither the primary image nor fallback can display',()=>{
  row();fireEvent.error(screen.getByRole('img',{name:'India flag'}));
  fireEvent.error(screen.getByRole('img',{name:'Earth reference image for country and territory catalogue'}));
  expect(screen.queryByRole('img')).toBeNull();expect(screen.queryByRole('link',{name:'Image source'})).toBeNull();
  expect(screen.getByText('Image unavailable; no image is displayed.')).toBeTruthy();
 });
});
