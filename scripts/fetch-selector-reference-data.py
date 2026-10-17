"""Download public selector inputs only; never run downloaded code or overwrite app files.
Usage: python3 scripts/fetch-selector-reference-data.py OUTPUT_DIRECTORY
The manifest records hashes of the currently bundled snapshot. Upstream data can change;
review import differences before replacing a shipped snapshot.
"""
import concurrent.futures, json, pathlib, sys, urllib.request
manifest=json.loads(pathlib.Path('apps/tlps/src/selectors/catalogue/manifest.json').read_text())
files={'languages':'languages.json','countries':'countries.json','stars':'stars.csv','faint-stars':'faint-stars.csv','planets':'exoplanets.csv','satellites':'moons.html','galaxies':'galaxies.tdat'}
out=pathlib.Path(sys.argv[1]);out.mkdir(parents=True,exist_ok=True)
def fetch(pair):
 key,filename=pair
 request=urllib.request.Request(manifest['sources'][key]['url'],headers={'User-Agent':'MAATAA-reference-catalogue/1.0'})
 with urllib.request.urlopen(request,timeout=45) as response:data=response.read()
 (out/filename).write_bytes(data)
 return filename,len(data)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for filename,size in pool.map(fetch,files.items()):print(f'{filename}: {size} bytes')
