#!/usr/bin/env python3
"""Inspect/apply/restore only the tlps.in apex CNAME. Credentials never leave this process."""
import argparse,base64,json,os,urllib.request
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--apply',action='store_true');p.add_argument('--rollback',action='store_true');a=p.parse_args()
root=Path(__file__).resolve().parents[2];private=root/'.local/tlps-api/runtime';backup=private/'dns-before-tlps.json'
cert=Path.home()/'.cloudflared/cert.pem';d=json.loads(base64.b64decode(''.join(s for s in cert.read_text().splitlines() if not s.startswith('---'))));token=d.get('APIToken') or d.get('apiToken')
if not token:raise SystemExit('Cloudflare certificate lacks zone API access')
def api(path,method='GET',body=None):
 req=urllib.request.Request('https://api.cloudflare.com/client/v4'+path,method=method,headers={'Authorization':'Bearer '+token,'Content-Type':'application/json'},data=json.dumps(body).encode() if body is not None else None)
 with urllib.request.urlopen(req,timeout=20) as response:data=json.load(response)
 if not data.get('success'):raise SystemExit('Cloudflare API rejected the operation')
 return data['result']
zones=api('/zones?name=tlps.in')
if len(zones)!=1 or zones[0]['status']!='active':raise SystemExit('Expected one active tlps.in zone')
zone=zones[0]['id'];records=api(f'/zones/{zone}/dns_records?name=tlps.in&type=CNAME')
if len(records)!=1:raise SystemExit('Expected one existing apex CNAME; no automatic replacement')
current=records[0];tunnel=json.loads((private/'cloudflare-tunnel.json').read_text())['TunnelID'];target=tunnel+'.cfargotunnel.com'
if not backup.exists():
 fd=os.open(backup,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
 with os.fdopen(fd,'w') as f:json.dump({'zoneId':zone,'record':current},f,indent=2)
old=json.loads(backup.read_text())
if old['zoneId']!=zone or old['record']['id']!=current['id']:raise SystemExit('Saved rollback record does not match current record identity')
if current['content'] not in [old['record']['content'],target]:raise SystemExit('DNS changed outside this rollout; inspect before proceeding')
body={key:old['record'][key] for key in ['type','name','content','ttl','proxied','comment','tags'] if key in old['record']}
if not a.rollback:body.update(content=target,proxied=True,ttl=1)
if a.apply:
 result=api(f"/zones/{zone}/dns_records/{current['id']}",'PUT',body)
 print('Updated only tlps.in apex CNAME:',result['content'])
else:print('Dry run: tlps.in CNAME',current['content'],'->',body['content'],'; rollback saved privately')
