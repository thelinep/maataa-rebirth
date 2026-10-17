#!/usr/bin/env python3
"""Provision a bounded project team through the private administration API.

Talks to the Auth/API over its private Unix socket (the hosted pilot runs the
API with MAATAA_AUTH_API_PORT=off). --server selects a development loopback
TCP origin instead."""
import argparse,http.client,json,os,socket,uuid
from pathlib import Path
DEFAULT_SOCKET=Path.home()/'Library/Application Support/MAATAA/AuthAPI/maataa-auth-api.sock'
p=argparse.ArgumentParser();p.add_argument('--bootstrap-file',required=True);p.add_argument('--owner',required=True);p.add_argument('--reviewer',required=True);p.add_argument('--title',required=True)
p.add_argument('--socket',default=os.environ.get('MAATAA_AUTH_API_SOCKET',str(DEFAULT_SOCKET)),help='private Auth/API socket (default: the per-user MAATAA path)')
p.add_argument('--server',help='development only: loopback origin such as http://127.0.0.1:4381')
p.add_argument('--output',required=True);args=p.parse_args()
if args.server and (not args.server.startswith('http://127.0.0.1:') or '/' in args.server[len('http://127.0.0.1:'):]):p.error('use a private loopback API origin')
if not args.server:
 parent=Path(args.socket).parent.stat()
 if parent.st_mode & 0o077 or parent.st_uid!=os.getuid():p.error('API socket directory must be owner-only (0700) and owned by you')
if args.owner==args.reviewer:p.error('owner and reviewer must be separate principals')
source=Path(args.bootstrap_file)
if source.stat().st_mode & 0o077:p.error('bootstrap token file must be private (0600)')
bootstrap=source.read_text().strip();out=Path(args.output)
if out.exists():p.error('output directory must be new; provisioning never overwrites credentials')
out.mkdir(parents=True,mode=0o700)
class UnixConnection(http.client.HTTPConnection):
 def __init__(self,path):super().__init__('localhost',timeout=15);self.path=path
 def connect(self):self.sock=socket.socket(socket.AF_UNIX,socket.SOCK_STREAM);self.sock.settimeout(15);self.sock.connect(self.path)
def connection():
 if args.server:
  host,port=args.server[len('http://'):].split(':');return http.client.HTTPConnection(host,int(port),timeout=15)
 return UnixConnection(args.socket)
def write(name,data):
 fd=os.open(out/name,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
 with os.fdopen(fd,'w') as f:json.dump(data,f,indent=2)
def call(path,token,body):
 c=connection()
 try:
  c.request('POST',path,body=json.dumps(body).encode(),headers={'Authorization':'Bearer '+token,'Content-Type':'application/json'})
  r=c.getresponse();data=r.read()
 finally:c.close()
 # Do not echo response/request bodies containing credentials.
 if r.status>=300:raise RuntimeError(f'Provisioning stopped: HTTP {r.status} at {path}; retained private output for recovery')
 return json.loads(data)
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
