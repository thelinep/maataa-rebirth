"""Build bounded selector snapshots from public source files, never execute source code.
Usage: python3 scripts/import-selector-reference-data.py SOURCE_DIRECTORY
See selectors/PRODUCT.md for source URLs. Original bytes are hashed in manifest.
"""
import collections, csv, gzip, hashlib, html, json, pathlib, re, sys
from urllib.parse import quote
BASE=pathlib.Path('apps/tlps/src/selectors/catalogue')
INPUT=pathlib.Path(sys.argv[1])
DATE='2026-10-16'
SOURCES={
 'languages':('languages.json','https://salsa.debian.org/iso-codes-team/iso-codes/-/raw/main/data/iso_639-3.json','Debian iso-codes · ISO 639-3'),
 'countries':('countries.json','https://salsa.debian.org/iso-codes-team/iso-codes/-/raw/main/data/iso_3166-1.json','Debian iso-codes · ISO 3166-1'),
 'stars':('stars.csv','https://exopla.net/wp-content/uploads/2025/05/NEC.csv','IAU WGSN · named NEC entries'),
 'faint-stars':('faint-stars.csv','https://exopla.net/wp-content/uploads/2025/05/wgsnFaints.csv','IAU WGSN · faint star names'),
 'planets':('exoplanets.csv','https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,discoverymethod,disc_year,sy_pnum+from+pscomppars&format=csv','NASA Exoplanet Archive · PSCompPars'),
 'satellites':('moons.html','https://ssd.jpl.nasa.gov/sats/discovery.html','NASA JPL · satellite discovery table'),
 'galaxies':('galaxies.tdat','https://heasarc.gsfc.nasa.gov/FTP/heasarc/dbase/tdat_files/heasarc_messier.tdat.gz','NASA HEASARC · Messier snapshot'),
}
manifest={'snapshotDate':DATE,'sources':{},'groups':{}}
for key,(filename,url,label) in SOURCES.items():
 raw=(INPUT/filename).read_bytes()
 manifest['sources'][key]={'label':label,'url':url,'sha256':hashlib.sha256(raw).hexdigest(),'bytes':len(raw)}
def write(group,items,coverage):
 assert len({x['id'] for x in items})==len(items),group+' duplicate IDs'
 items.sort(key=lambda x:x['label'].casefold())
 (BASE/(group+'.json')).write_text(json.dumps(items,ensure_ascii=False,separators=(',',':'))+'\n')
 manifest['groups'][group]={'count':len(items),'coverage':coverage}
def item(id,label,description,subtype,source,code=None,parent=None,aliases=None):
 return dict(id=id,label=label,description=description,subtype=subtype,source=source,code=code,parent=parent,aliases=aliases or [],image=None,sourceImage=None)
lang_types={'L':'Living','E':'Extinct','A':'Ancient','H':'Historical','C':'Constructed','S':'Special'}
langs=[]
for r in json.loads((INPUT/'languages.json').read_text())['639-3']:
 code=r['alpha_3'];kind=lang_types.get(r['type'],r['type'])
 langs.append(item('language:'+code,r['name'],f'{kind} language entry · ISO 639-3 {code}.','Macrolanguage' if r['scope']=='M' else kind+' language','languages',code,aliases=[r.get('alpha_2',''),r.get('bibliographic',''),r.get('inverted_name','')]))
write('languages',langs,'All entries in the downloaded ISO 639-3 registry snapshot; includes living, historical, extinct and constructed languages. Language selection does not translate the interface.')
countries=[]
for r in json.loads((INPUT/'countries.json').read_text())['3166-1']:
 code=r['alpha_2'];aliases=[r.get('common_name',''),r.get('official_name',''),r['alpha_3'],r['numeric']]
 if code=='IN':aliases+=['Bharat','Bhaarat','भारत']
 countries.append(item('country:'+code,r['name'],f'Country or territory code {code} / {r["alpha_3"]} · ISO 3166-1.','Country / territory','countries',code,aliases=aliases))
assert len(countries)==249
write('countries',countries,'249 ISO 3166-1 country and territory entries in the source snapshot. Territories are included; this is not a list of 249 sovereign states.')
star_items=[];seen=set()
for source in ['stars','faint-stars']:
 for r in csv.DictReader((INPUT/SOURCES[source][0]).open()):
  name=r['Name'].strip()
  if not name or name.casefold() in seen:continue
  seen.add(name.casefold());code=r.get('NEC') or r.get('WGSN-ID')
  constellation=r.get('constellation','').strip()
  star_items.append(item('star:'+source+':'+code,name,f'Named star catalogue entry{(" in "+constellation) if constellation else ""}.','Named star',source,code,aliases=[r.get('HIP',''),r.get('Bayer/other','')]))
star_items.append(item('star:sol','Sun','The star at the centre of our Solar System.','Solar star','nasa-solar','Sol',aliases=['Surya','सूर्य','Sol']))
write('stars',star_items,'Named entries from WGSN NEC and faint-star CSV snapshots, plus the Sun. Unnamed NEC entries are excluded; later naming decisions may not appear. Not all stars in the universe.')
exo=list(csv.DictReader((INPUT/'exoplanets.csv').open()))
planets=[];hosts=collections.defaultdict(list)
for r in exo:
 name=r['pl_name'].strip();host=r['hostname'].strip();hosts[host].append(name)
 planets.append(item('planet:exo:'+name,name,f'Confirmed exoplanet in the NASA archive; host: {host}.','Exoplanet','planets',name,'system:'+host))
for n in ['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune']:
 planets.append(item('planet:solar:'+n.lower(),n,'One of the eight planets in our Solar System.','Solar System planet','nasa-solar',n,'system:sol',aliases=['Prithvi','पृथ्वी'] if n=='Earth' else []))
write('planets',planets,'The eight Solar System planets plus all confirmed exoplanet rows in the downloaded NASA PSCompPars snapshot. Dwarf planets are not included in this category.')
systems=[item('system:sol','Solar System','The Sun and its planetary system, in the Milky Way.','Solar System','nasa-solar','Sol','galaxy:milky-way',aliases=['Sol','Surya'])]
for host,entries in hosts.items():
 systems.append(item('system:'+host,host+' system',f'{len(entries)} confirmed planet entries in this NASA snapshot; host: {host}.','Exoplanetary system','planets',host,aliases=[host]))
write('systems',systems,'Our Solar System plus distinct host systems represented in the downloaded NASA confirmed-exoplanet snapshot. Only our system is called the Solar System; no complete census of all systems is implied.')
# The JPL table has six cells per satellite; headings carry the parent body.
s=(INPUT/'moons.html').read_text();table=re.search(r'<table class="sat-discovery.*?</table>',s,re.S).group()
clean=lambda x:re.sub(r'\s+',' ',html.unescape(re.sub('<[^>]+>',' ',x))).strip()
moons=[item('satellite:earth:moon','Moon','Earth’s natural satellite.','Natural satellite','nasa-moon','Moon','planet:solar:earth',aliases=['Luna','Chandra','चंद्रमा'])];parent=None
for row in re.findall('<tr[^>]*>(.*?)</tr>',table,re.S):
 cells=[clean(c) for c in re.findall('<td[^>]*>(.*?)</td>',row,re.S)]
 if len(cells)==1:
  parent=re.search(r'Satellites of\s+(?:Dwarf Planet )?(\w+):',cells[0]).group(1);continue
 if len(cells)!=6:continue
 number,name,provisional,year,_,_=cells;label=name or provisional
 assert label and parent
 moons.append(item('satellite:'+parent.lower()+':'+(provisional or number or name),label,f'Natural satellite of {parent}'+(f'; discovery year {year}.' if year else '.'),'Natural satellite','satellites',number or provisional, 'dwarf:pluto' if parent=='Pluto' else 'planet:solar:'+parent.lower(),[provisional,name]))
assert len(moons)==461
# A bounded selection of Earth satellites, verified against the ISRO mission list.
for n in ['Aryabhatta','ASTROSAT','XPoSat','INSAT-3DS','CARTOSAT-3','NVS-01','GSAT-24','NISAR']:
 moons.append(item('satellite:isro:'+n,n,'ISRO-listed Earth satellite mission. Historical catalogue entry; no current operating status or tracking data is supplied.','Artificial satellite','isro',n,'planet:solar:earth'))
write('satellites',moons,'461 natural satellites: all 460 rows in the JPL planetary/Pluto table, plus Earth’s Moon. Also eight selected ISRO Earth-satellite missions; artificial coverage is illustrative, not a global spacecraft registry. No small-body moon census or live tracking.')
s=gzip.decompress((INPUT/'galaxies.tdat').read_bytes()).decode()
rows=[r.split('|') for r in s.split('<DATA>')[1].split('</DATA>')[0].strip().splitlines() if '|' in r]
galaxies=[item('galaxy:milky-way','Milky Way','The galaxy containing our Solar System.','Home galaxy','nasa-galaxies','Milky Way',aliases=['Akash Ganga','आकाशगंगा'])]
for r in rows:
 if r[9] not in ['S','E','E?','IR']:continue
 code=r[7].replace(' ','');kind={'S':'Spiral galaxy','E':'Elliptical galaxy','E?':'Galaxy (elliptical classification uncertain)','IR':'Irregular galaxy'}[r[9]]
 label={'M31':'Andromeda Galaxy','M33':'Triangulum Galaxy','M51':'Whirlpool Galaxy','M104':'Sombrero Galaxy'}.get(code,code)
 galaxies.append(item('galaxy:'+code,label,f'{kind} · {code} / {r[0]} · constellation {r[3]}.',kind,'galaxies',code,aliases=[code,r[0]]))
write('galaxies',galaxies,'Galaxy-classified entries (S/E/E?/IR) in the HEASARC Messier table, plus the Milky Way. The source table was last modified in 2022. A bounded reference collection, not all galaxies.')
manifest['sources'].update({
'nasa-solar':{'label':'NASA · Solar System','url':'https://science.nasa.gov/solar-system/solar-system-facts/'},
'nasa-moon':{'label':'NASA · Moon','url':'https://science.nasa.gov/moon/'},
'nasa-galaxies':{'label':'NASA · Galaxies','url':'https://science.nasa.gov/universe/galaxies/'},
'isro':{'label':'ISRO · selected mission names','url':'https://www.isro.gov.in/SpacecraftMissions.html'},
})
(BASE/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(manifest['groups'],indent=2))
