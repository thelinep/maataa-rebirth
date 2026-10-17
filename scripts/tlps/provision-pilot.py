#!/usr/bin/env python3
"""Provision a bounded project team through the private loopback administration API."""
import argparse,json,os,stat,urllib.request,urllib.error,uuid
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--bootstrap-file',required=True);p.add_argument('--owner',required=True);p.add_argument('--reviewer',required=True);p.add_argument('--title',required=True);p.add_argument('--server',default='http://127.0.0.1:4381');p.add_argument('--output',required=True);args=p.parse_args()
if not args.server.startswith('http://127.0.0.1:') or '/' in args.server[len('http://127.0.0.1:'):]:p.error('use a private loopback API origin')
if args.owner==args.reviewer:p.error('owner and reviewer must be separate principals')
source=Path(args.bootstrap_file)
if source.stat().st_mode & 0o077:p.error('bootstrap token file must be private (0600)')
bootstrap=source.read_text().strip();out=Path(args.output)
if out.exists():p.error('output directory must be new; provisioning never overwrites credentials')
out.mkdir(parents=True,mode=0o700)
def write(name,data):
 fd=os.open(out/name,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
 with os.fdopen(fd,'w') as f:json.dump(data,f,indent=2)
def call(path,token,body):
 req=urllib.request.Request(args.server+path,data=json.dumps(body).encode(),headers={'Authorization':'Bearer '+token,'Content-Type':'application/json'},method='POST')
 try:
  with urllib.request.urlopen(req,timeout=15) as r:return json.load(r)
 except urllib.error.HTTPError as e:
  # Do not echo response/request bodies containing credentials.
  raise RuntimeError(f'Provisioning stopped: HTTP {e.code} at {path}; retained private output for recovery') from None
pid='prj:'+str(uuid.uuid4());write('project.json',{'projectId':pid,'title':args.title,'scope':'administrator-provisioned planning pilot'})
for principal in [args.owner,args.reviewer]:
 try:call('/v1/admin/principals',bootstrap,{'principalId':principal,'displayName':principal})
 except RuntimeError as e:
  if 'HTTP 409 ' not in str(e):raise
 tokens=call('/v1/admin/tokens',bootstrap,{'principalId':principal,'projectId':pid,'scopes':['project:read','project:write'],'ttlSeconds':3600})
 write('owner-token.json' if principal==args.owner else 'reviewer-token.json',tokens)
 if principal==args.owner:
  call('/v1/projects',tokens['access_token'],{'schema':'maataa.project-record/1.0.0','projectId':pid,'title':args.title,'domain':'film-production','ownerApp':'tlps','currentVersion':0,'versions':[]})
 call('/v1/admin/tlps/memberships',bootstrap,{'projectId':pid,'principalId':principal,'role':'owner' if principal==args.owner else 'reviewer','active':True})
print('Project provisioned. Credentials are in private files; they expire after one hour. Project ID:',pid)
