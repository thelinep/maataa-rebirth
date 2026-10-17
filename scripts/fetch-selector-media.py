"""Restore the pinned, source-linked selector media without executing downloaded code.
Run from repository root: python3 scripts/fetch-selector-media.py
The existing media-provenance.json is authoritative; changed upstream bytes fail closed.
"""
import concurrent.futures,hashlib,io,json,pathlib,shutil,subprocess,urllib.request,zipfile
root=pathlib.Path(__file__).resolve().parents[1]
assets=root/'apps/tlps/src/selectors/assets'
manifest=json.loads((assets/'media-provenance.json').read_text())
def fetch(url):
 with urllib.request.urlopen(url,timeout=45) as response:return response.read()
def nasa(pair):
 name,meta=pair;data=fetch(meta['imageUrl'])
 if hashlib.sha256(data).hexdigest()!=meta['sha256']:raise ValueError('Upstream image changed; review source update: '+name)
 return meta,data
archive_bytes=fetch(manifest['flagArchive']['url'])
if hashlib.sha256(archive_bytes).hexdigest()!=manifest['flagArchive']['sha256']:raise ValueError('Flag archive changed; review pinned source.')
archive=zipfile.ZipFile(io.BytesIO(archive_bytes))
flags=[]
for code,meta in manifest['flags'].items():
 data=archive.read('flag-icons-7.3.2/flags/4x3/'+code.lower()+'.svg')
 if hashlib.sha256(data).hexdigest()!=meta['sha256'] or b'<script' in data.lower():raise ValueError('Invalid flag asset '+code)
 flags.append((meta,data))
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:images=list(pool.map(nasa,manifest['nasa'].items()))
for meta,data in flags+images:(assets/meta['file']).write_bytes(data)
(assets/'FLAG-ICONS-LICENSE.txt').write_bytes(archive.read('flag-icons-7.3.2/LICENSE'))
embed=pathlib.Path.home()/'.agents/skills/impeccable/scripts/impeccable'
for meta,_ in images:
 origin='Origin: '+meta['source']+' | Image: '+meta['imageUrl']+' | Credit: '+meta['credit']
 if embed.exists():subprocess.run([str(embed),'embed-prompt',str(assets/meta['file']),'--prompt',origin],check=True,capture_output=True)
 else:(assets/(meta['file']+'.json')).write_text(json.dumps({'origin':origin},indent=2)+'\n')
print(f'Restored {len(flags)} flags and {len(images)} NASA images. Original hashes verified; source credits retained.')
