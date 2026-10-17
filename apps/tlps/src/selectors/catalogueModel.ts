import { TLPS_CREW_ROLES, TLPS_CAST_ROLES, TLPS_HOD_ROLES } from '../types';
import type { MaataaIconName } from '@maataa/ui/icons/MaataaIcon';
import internal from './shabdkosh.snapshot.json';
import manifest from './catalogue/manifest.json';

export type CatalogueItem = {
  id: string; label: string; description: string | null; subtype: string;
  source: string; code: string | null; parent: string | null; aliases: string[];
  image: string | null; sourceImage: string | null; sourceIcon?: string | null;
};
export type GroupId = 'accounts'|'industry'|'departments'|'designations'|'services'|'features'|'other'|'location'|'equipment'|'transport'|'accommodation'|'catering'|'costume'|'makeup'|'hair'|'props'|'vfx'|'sfx'|'others'|'talents'|'languages'|'countries'|'continents'|'galaxies'|'stars'|'systems'|'planets'|'satellites';
export type CatalogueGroup = { id: GroupId; label: string; family: string; icon: MaataaIconName; coverage: string; count: number };
const appItem = (group: string, label: string, description: string): CatalogueItem => ({id:`app:${group}:${label}`,label,description,subtype:'App-defined option',source:'app',code:null,parent:null,aliases:[],image:null,sourceImage:null});
const fromInternal = (row: typeof internal.items[number]): CatalogueItem => ({id:`internal:${row.id}`,label:row.label,description:row.description,subtype:row.category,source:'internal',code:row.id,parent:null,aliases:[],image:null,sourceImage:row.image,sourceIcon:row.icon});
const industries = [
  'Agriculture, forestry and fishing','Mining and quarrying','Manufacturing','Electricity, gas, steam and air conditioning supply','Water supply; sewerage, waste management and remediation activities','Construction','Wholesale and retail trade; repair of motor vehicles and motorcycles','Transportation and storage','Accommodation and food service activities','Information and communication','Financial and insurance activities','Real estate activities','Professional, scientific and technical activities','Administrative and support service activities','Public administration and defence; compulsory social security','Education','Human health and social work activities','Arts, entertainment and recreation','Other service activities','Activities of households as employers; undifferentiated goods- and services-producing activities of households for own use','Activities of extraterritorial organizations and bodies',
].map((label,index)=>({...appItem('industry',label,`ISIC Rev.4 broad economic activity section ${String.fromCharCode(65+index)}. This category does not imply certification or service availability.`),id:`isic4:${String.fromCharCode(65+index)}`,source:'isic4',code:String.fromCharCode(65+index),subtype:'ISIC Rev.4 section'}));
const originalDesignations=internal.items.filter(r=>r.group==='Designations').map(fromInternal);
const knownNames = new Set(originalDesignations.map(x=>x.label.toLowerCase()));
const extraDesignations=[...new Set([...TLPS_CREW_ROLES,...TLPS_CAST_ROLES,...TLPS_HOD_ROLES])].filter(label=>!knownNames.has(label.toLowerCase())).map(label=>({...appItem('designation',label,`${label} designation from the TLPS product vocabulary; selection does not assign access or employment.`),source:'tlps-roles',subtype:'TLPS designation'}));
const services=[...new Map(internal.items.filter(r=>r.category==='service pricings').map(row=>[row.label.toLowerCase(),row])).values()].map(row=>({...fromInternal(row),id:`service:${row.id}`,description:`${row.label} service label from the internal intake. Historical source prices are not current offers.`,subtype:'Service label'}));
const productionOptions: Array<{id:GroupId;label:string;items:string[]}>= [
  {id:'location',label:'Location',items:['Location scouting','Location recce','Location manager','Location coordinator','Location assistant','Location permit','Location agreement','Unit base']},
  {id:'equipment',label:'Equipment',items:['Camera package','Lens package','Lighting package','Grip package','Sound package','Camera support','Video village','Power distribution']},
  {id:'transport',label:'Transport',items:['Crew transport','Cast transport','Production vehicle','Cargo transport','Shuttle service','Driver','Parking','Unit move']},
  {id:'accommodation',label:'Accommodation',items:['Hotel room','Guesthouse','Serviced apartment','Crew lodging','Cast lodging','Room block','Accessible room','Late check-in']},
  {id:'catering',label:'Catering',items:['Breakfast','Lunch','Dinner','Craft services','Dietary meal','Hydration station','Meal service','Meal break']},
  {id:'costume',label:'Costume',items:['Costume design','Wardrobe','Costume fitting','Costume continuity','Costume rental','Costume alteration','Costume breakdown','Costume standby']},
  {id:'makeup',label:'Makeup',items:['Makeup design','Makeup artist','Beauty makeup','Character makeup','SFX makeup','Makeup continuity','Makeup touch-up','Makeup standby']},
  {id:'hair',label:'Hair',items:['Hair design','Hair stylist','Wig','Hairpiece','Hair continuity','Barber','Hair touch-up','Hair standby']},
  {id:'props',label:'Props',items:['Hand props','Hero props','Prop sourcing','Prop fabrication','Prop rental','Prop continuity','Set dressing','Props standby']},
  {id:'vfx',label:'VFX',items:['Compositing','CGI','3D animation','Motion capture','Virtual production','Rotoscoping','Matchmoving','Digital matte painting']},
  {id:'sfx',label:'SFX',items:['Practical effects','Mechanical effects','Atmospheric effects','Rain, wind and snow','Pyrotechnics','Rigging effects','Blood and injury effects','SFX standby']},
  {id:'others',label:'Others',items:['Other production service','General production requirement','Unclassified item','Custom production request','Additional crew need','Additional equipment need','Additional travel need','Production note']},
  {id:'talents',label:'Talents',items:['Actor','Voice actor','Presenter','Host','Dancer','Singer','Musician','Stunt performer','Model','Background performer','Comedian','Puppeteer','Voice-over artist','Athlete','Cultural performer','Digital creator']},
];
const productionGroupItems=Object.fromEntries(productionOptions.map(({id,label,items})=>[id,items.map(name=>({...appItem(id,name,id==='talents'?'Talent type for casting and production planning. Selection does not represent an audition, engagement, availability or employment decision.':`${label} planning option. Selecting this label does not book, reserve, dispatch, contract or pay for anything.`),subtype:`${label} option`}))])) as Partial<Record<GroupId,CatalogueItem[]>>;
const continents = ['Africa','Antarctica','Asia','Europe','North America','South America','Australia'].map(label=>({...appItem('continent',label,`Continent in the seven-continent convention. ${label==='Australia'?'Oceania is a wider geographic region and is a search alias here, not an equivalent continent.':''}`.trim()),source:'geography-convention',subtype:'Continent',aliases:label==='Australia'?['Oceania']:[]}));
const smallGroups: Partial<Record<GroupId,CatalogueItem[]>>={
  accounts:['Individual','Team','Organization','Agency','Service provider','Institution'].map(label=>appItem('account',label,`${label} account category for setup and filtering. This label does not create an account or grant permissions.`)),
  industry:industries,
  departments:['Direction','Production','Writing','Camera','Lighting','Grip','Art','Costume','Hair and makeup','Sound','Music','Choreography','Action and stunts','Visual effects','Editing','Casting','Locations','Finance and legal'].map(label=>appItem('department',label,`${label} department option for organizing project work.`)),
  designations:[...originalDesignations,...extraDesignations],services,
  features:internal.items.filter(r=>r.group==='Features').map(fromInternal),
  other:internal.items.filter(r=>r.group==='Other labels').map(fromInternal),continents,...productionGroupItems,
};
const referenceLoaders = {
  languages:()=>import('./catalogue/languages.json'),countries:()=>import('./catalogue/countries.json'),
  galaxies:()=>import('./catalogue/galaxies.json'),stars:()=>import('./catalogue/stars.json'),
  systems:()=>import('./catalogue/systems.json'),planets:()=>import('./catalogue/planets.json'),satellites:()=>import('./catalogue/satellites.json'),
};
const group = (id:GroupId,label:string,family:string,icon:MaataaIconName,coverage?:string):CatalogueGroup=>({id,label,family,icon,count:smallGroups[id]?.length??manifest.groups[id as keyof typeof manifest.groups]?.count??0,coverage:coverage??manifest.groups[id as keyof typeof manifest.groups]?.coverage??''});
export const CATALOGUE_GROUPS:CatalogueGroup[]=[
  group('accounts','Account types','Work & identity','user','Six app-defined setup categories. Catalogue labels only; no account provisioning or access changes.'),
  group('industry','Industry','Work & identity','workspace','21 ISIC Rev.4 broad sections. This is the selected revision, not a claim to implement the latest revision or every detailed industry class.'),
  group('departments','Departments','Work & identity','layout','18 app-defined project departments. Extendable vocabulary; not a universal department standard.'),
  group('designations','Designations','Work & identity','users','Internal designation records extended with the existing TLPS crew, cast and department-head vocabulary.'),
  group('services','Services','Work & identity','tool','Distinct service names extracted from the internal service-pricing category. Source prices are deliberately excluded from the selectable descriptions.'),
  group('location','Location','Production & crew','surface','Eight app-defined location planning labels. These do not verify site access, permissions, availability or agreements.'),
  group('equipment','Equipment','Production & crew','device','Eight app-defined production equipment labels. No inventory, availability, hire or safety status is implied.'),
  group('transport','Transport','Production & crew','activity','Eight app-defined transport planning labels. No vehicle, driver or journey is booked.'),
  group('accommodation','Accommodation','Production & crew','workspace','Eight app-defined accommodation planning labels. No room availability or reservation is implied.'),
  group('catering','Catering','Production & crew','sparkles','Eight app-defined catering labels. No food order or dietary suitability is confirmed.'),
  group('costume','Costume','Production & crew','users','Eight app-defined costume and wardrobe labels.'),
  group('makeup','Makeup','Production & crew','user','Eight app-defined makeup planning labels.'),
  group('hair','Hair','Production & crew','users','Eight app-defined hair and wig planning labels.'),
  group('props','Props','Production & crew','tool','Eight app-defined props planning labels.'),
  group('vfx','VFX','Production & crew','sparkles','Eight app-defined visual-effects planning labels.'),
  group('sfx','SFX','Production & crew','activity','Eight app-defined special-effects planning labels.'),
  group('others','Others','Production & crew','registry','Eight app-defined catch-all production planning labels.'),
  group('talents','Talents','Production & crew','users','Sixteen app-defined talent types for production planning. This is an illustrative label set, not a complete talent registry or audition/engagement system.'),
  group('features','Features','Work & identity','sparkles','26 original internal feature records, including source duplicates. Labels do not establish working product capability.'),
  group('other','Other labels','Work & identity','registry','628 remaining internal source records. Original IDs and metadata are preserved; the source is unreviewed intake.'),
  group('languages','Languages','Language & geography','type'),group('countries','Countries','Language & geography','surface'),
  group('continents','Continents','Language & geography','layout','Seven-continent convention, including Australia. Other conventions exist; Oceania is a region alias, not a country or additional continent.'),
  group('galaxies','Galaxies','Space','sparkles'),group('stars','Stars','Space','star'),
  group('systems','Solar systems','Space','activity'),group('planets','Planets','Space','surface'),group('satellites','Satellites','Space','device'),
];
export const CATALOGUE_FAMILIES=[...new Set(CATALOGUE_GROUPS.map(group=>group.family))];
export const CATALOGUE_DATE=manifest.snapshotDate;
export const CATALOGUE_TOTAL=CATALOGUE_GROUPS.reduce((sum,g)=>sum+g.count,0);
export const CATALOGUE_SOURCES:Record<string,{label:string;url?:string}>={...manifest.sources,
  internal:{label:'Internal Shabdkosh · unreviewed label_rows.csv snapshot'},app:{label:'MAATAA / TLPS · app-defined vocabulary'},
  'tlps-roles':{label:'TLPS product vocabulary · types.ts'},
  isic4:{label:'UN Statistics · ISIC Rev.4 sections',url:'https://unstats.un.org/unsd/classifications/Family/Detail/27'},
  'geography-convention':{label:'MAATAA · seven-continent convention'},
};
const cache=new Map<GroupId,Promise<CatalogueItem[]>>();
export function loadCatalogueGroup(id:GroupId):Promise<CatalogueItem[]> {
  if(smallGroups[id])return Promise.resolve(smallGroups[id]!);
  if(!cache.has(id)){
    const loader=referenceLoaders[id as keyof typeof referenceLoaders];
    const promise=loader().then(module=>module.default as CatalogueItem[]).catch(error=>{cache.delete(id);throw error;});
    cache.set(id,promise);
  }
  return cache.get(id)!;
}
export function normalizeCatalogueSearch(text:string):string {return text.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().trim();}
export function filterCatalogue(items:CatalogueItem[],query:string,subtype='all'):CatalogueItem[]{
  const words=normalizeCatalogueSearch(query).split(/\s+/).filter(Boolean);
  const matches=items.filter(item=>(subtype==='all'||item.subtype===subtype)&&words.every(word=>normalizeCatalogueSearch([item.label,item.description,item.code,item.parent,...item.aliases].join(' ')).includes(word)));
  if(!words.length)return matches;
  const exact=normalizeCatalogueSearch(query);
  const rank=(item:CatalogueItem)=>[item.label,item.code??'',...item.aliases].some(value=>normalizeCatalogueSearch(value)===exact)?0:normalizeCatalogueSearch(item.label).startsWith(exact)?1:2;
  return matches.sort((a,b)=>rank(a)-rank(b));
}
