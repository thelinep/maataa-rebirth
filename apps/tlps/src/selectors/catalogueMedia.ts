import type { CatalogueItem, GroupId } from './catalogueModel';
import provenance from './assets/media-provenance.json';
import creative from '../../../../examples/support-center/public/artwork/creative.webp';
import people from '../../../../examples/support-center/public/artwork/people.webp';
import market from '../../../../examples/support-center/public/artwork/market.webp';
import operations from '../../../../examples/support-center/public/artwork/operations.webp';
import platform from '../../../../examples/support-center/public/artwork/platform.webp';
import data from '../../../../examples/support-center/public/artwork/data.webp';
import talentPhotos from './assets/talent-photo-provenance.json';

const files=import.meta.glob<string>('./assets/**/*.{svg,jpg,webp,png}',{query:'?url',import:'default',eager:true});
export type CatalogueMedia={url:string;alt:string;caption:string;credit:string;source?:string;license?:string;kind:'flag'|'object'|'category'};
const nasa=(name:keyof typeof provenance.nasa,alt:string,kind:CatalogueMedia['kind']='category'):CatalogueMedia=>{
  const record=provenance.nasa[name];
  return {url:files[`./assets/${record.file}`],alt,kind,caption:kind==='object'?'NASA visual':'Category reference',credit:record.credit,source:record.source};
};
const artwork=(url:string,alt:string):CatalogueMedia=>({url,alt,kind:'category',caption:'Category artwork',credit:'Existing MAATAA Arcade Quest artwork · AI-generated illustration; not a photograph of this entry.'});
const talentPhoto=(name:keyof typeof talentPhotos,alt:string):CatalogueMedia=>{
  const record=talentPhotos[name];
  return {url:files[`./assets/${record.file}`],alt:`${alt}; representative category reference, not the selected person`,kind:'category',caption:'Photo · category reference',credit:`${record.author} · ${record.licenseLabel} · Wikimedia Commons`,source:record.source,license:record.license};
};
export const CATEGORY_MEDIA:Record<GroupId,CatalogueMedia>={
  accounts:artwork(people,'Illustrated community environment'),industry:artwork(market,'Illustrated market and trade environment'),
  departments:artwork(operations,'Illustrated operations environment'),designations:artwork(people,'Illustrated team environment'),
  services:artwork(creative,'Illustrated makers’ atelier'),features:artwork(platform,'Illustrated platform environment'),other:artwork(data,'Illustrated data-library environment'),
  location:artwork(operations,'Illustrated production planning environment; location category artwork'),
  equipment:artwork(creative,'Illustrated makers’ workspace; equipment category artwork'),
  transport:artwork(operations,'Illustrated production operations environment; transport category artwork'),
  accommodation:artwork(people,'Illustrated team environment; accommodation category artwork'),
  catering:artwork(market,'Illustrated food and market environment; catering category artwork'),
  costume:artwork(creative,'Illustrated creative workspace; costume category artwork'),
  makeup:artwork(people,'Illustrated team workspace; makeup category artwork'),
  hair:artwork(people,'Illustrated team workspace; hair category artwork'),
  props:artwork(creative,'Illustrated creative workspace; props category artwork'),
  vfx:artwork(platform,'Illustrated digital workspace; VFX category artwork'),
  sfx:artwork(operations,'Illustrated production workspace; SFX category artwork'),
  others:artwork(data,'Illustrated project library; other production category artwork'),
  talents:talentPhoto('dance','Dance performance photograph'),
  languages:{url:files['./assets/languages.svg'],alt:'A and अ on overlapping language cards',kind:'category',caption:'Category artwork',credit:'MAATAA-authored language category graphic. Does not specify the script of an individual language.'},
  countries:nasa('earth','Earth reference image for country and territory catalogue'),continents:nasa('earth','Earth reference image for continent catalogue; not a map of this continent'),
  galaxies:nasa('galaxies','NASA-hosted spiral galaxy category reference'),stars:nasa('sun','Sun image used as a star category reference'),
  systems:nasa('solar-system','Solar System category reference'),planets:nasa('solar-system','Solar System category reference for planet catalogue'),
  satellites:nasa('moon','Earth’s Moon used as a natural-satellite category reference'),
};
export function catalogueMediaFor(item:CatalogueItem,group:GroupId):CatalogueMedia{
  if(group==='talents'){
    const label=item.label.toLowerCase();
    if(/puppet/.test(label))return talentPhoto('puppet','Puppetry demonstration photograph');
    if(/athlete/.test(label))return talentPhoto('athlete','Basketball player photograph');
    if(/stunt/.test(label))return talentPhoto('stunt','Bicycle stunt performance photograph');
    if(/model/.test(label))return talentPhoto('runway','Fashion runway model photograph');
    if(/presenter|host/.test(label))return talentPhoto('speaker','Conference speaker photograph');
    if(/singer/.test(label))return talentPhoto('singer','Live singer photograph');
    if(/musician/.test(label))return talentPhoto('producer','Music producer in studio photograph');
    if(/voice/.test(label))return talentPhoto('voiceover','Voice-over recording microphone photograph');
    if(/digital creator/.test(label))return talentPhoto('producer','Digital music creator in studio photograph');
    if(/dancer|cultural performer/.test(label))return talentPhoto('dance','Stage dance performance photograph');
    return talentPhoto('dance','Stage performance photograph');
  }
  if(group==='countries'&&item.code){
    const record=provenance.flags[item.code as keyof typeof provenance.flags];
    if(record)return {url:files[`./assets/${record.file}`],alt:`${item.label} flag`,kind:'flag',caption:'Flag',credit:'flag-icons v7.3.2 · MIT license · Lipis and contributors',source:record.source};
  }
  if(item.id.startsWith('planet:solar:'))return nasa(item.id.split(':').at(-1) as keyof typeof provenance.nasa,`${item.label} visual from NASA`,'object');
  if(item.id==='star:sol')return nasa('sun','The Sun, NASA source image','object');
  if(item.id==='satellite:earth:moon')return nasa('moon','Earth’s Moon, NASA source image','object');
  if(item.id==='system:sol')return nasa('solar-system','Our Solar System, NASA visual','object');
  if(group==='satellites'&&item.subtype==='Artificial satellite')return nasa('spacecraft','Hubble in orbit: artificial-satellite category reference, not the selected spacecraft');
  if(['designations','departments','services'].includes(group)){
    if(/camera|photograph|film|edit|director|writ|music|sound|costume|visual effect|art/.test(item.label.toLowerCase()))return artwork(creative,'Illustrated film and makers’ atelier; category artwork');
    if(/cater/.test(item.label.toLowerCase()))return artwork(market,'Illustrated market environment; category artwork');
    if(/production|grip|gaffer|lighting/.test(item.label.toLowerCase()))return artwork(operations,'Illustrated production operations environment; category artwork');
  }
  return CATEGORY_MEDIA[group];
}
