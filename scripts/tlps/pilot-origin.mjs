/**
 * Production-build origin for the Cloudflare Tunnel (tlps.in). Serves the built
 * app and forwards an allow-list of authenticated project routes to the MAATAA
 * Auth/API over its private Unix socket. Never proxies administrative endpoints.
 *
 * Environment:
 *   TLPS_WEB_ROOT        built app directory (default demo-dist)
 *   TLPS_ORIGIN_PORT     loopback port for cloudflared (default 4184)
 *   TLPS_API_SOCKET      Auth/API socket (default: the per-user MAATAA path)
 *   TLPS_API_ORIGIN      development only: a loopback TCP origin instead of the
 *                        socket; refused unless TLPS_ALLOW_TCP_API=1
 *   TLPS_RATE_BURST / TLPS_RATE_PER_SECOND   per-client API limit (60 / 5)
 */
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {statSync} from 'node:fs';
import {homedir} from 'node:os';
import {resolve,dirname,extname,join,sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(process.env.TLPS_WEB_ROOT||fileURLToPath(new URL('../../demo-dist',import.meta.url)));
const port=Number(process.env.TLPS_ORIGIN_PORT||4184);
const upstream=apiTarget();
const burst=Number(process.env.TLPS_RATE_BURST||60), perSecond=Number(process.env.TLPS_RATE_PER_SECOND||5);
const allowedHosts=new Set([`127.0.0.1:${port}`,`localhost:${port}`,'tlps.in']);
const allowedOrigins=new Set([...allowedHosts].map(h=>h==='tlps.in'?`https://${h}`:`http://${h}`));
const forwardedHeaders=['authorization','content-type','if-match','idempotency-key'];
const apiRoute=/^\/v1\/(?:tlps\/|projects(?:\/|$)|auth\/whoami$)/;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2','.ico':'image/x-icon'};

/** The socket by default; TCP only when a developer opts in explicitly. */
function apiTarget(){
  if(process.env.TLPS_API_ORIGIN){
    if(process.env.TLPS_ALLOW_TCP_API!=='1')throw Error('TLPS_API_ORIGIN is development-only; set TLPS_ALLOW_TCP_API=1 to use it, or use the private socket');
    const url=new URL(process.env.TLPS_API_ORIGIN);
    if(url.hostname!=='127.0.0.1'||url.protocol!=='http:'||url.pathname!=='/')throw Error('API must be a loopback HTTP origin');
    console.warn('pilot origin: forwarding to a development TCP listener; do not serve tlps.in this way');
    return {host:'127.0.0.1',port:Number(url.port||80)};
  }
  const socketPath=process.env.TLPS_API_SOCKET||join(homedir(),'Library/Application Support/MAATAA/AuthAPI/maataa-auth-api.sock');
  const parent=statSync(dirname(socketPath));
  // Same rule as the API and Desktop: an owner-only directory owned by this user.
  if(!parent.isDirectory()||(parent.mode&0o077)!==0||(process.getuid&&parent.uid!==process.getuid()))throw Error('API socket directory must be owner-only (0700) and owned by this user');
  return {socketPath};
}

/** Token buckets per client address. cloudflared sets CF-Connecting-IP; the origin listens on loopback only. */
const buckets=new Map();
function allow(client,now=Date.now()){
  if(buckets.size>10000)for(const [key,[tokens,at]] of buckets)if(tokens+(now-at)/1000*perSecond>=burst)buckets.delete(key);
  const [tokens,at]=buckets.get(client)??[burst,now];
  const level=Math.min(burst,tokens+(now-at)/1000*perSecond);
  if(level<1){buckets.set(client,[level,now]);return false;}
  buckets.set(client,[level-1,now]);return true;
}

function forward(method,path,headers,body){
  return new Promise((done,fail)=>{
    const req=http.request({...upstream,method,path,headers:{...headers,host:'localhost',...(body.length?{'content-length':String(body.length)}:{})},timeout:15000},res=>{
      const chunks=[];let size=0;
      res.on('data',c=>{size+=c.length;if(size>2*1048576){req.destroy();fail(Error('response too large'));return;}chunks.push(c);});
      res.on('end',()=>done({status:res.statusCode??502,headers:res.headers,body:Buffer.concat(chunks)}));
      res.on('error',fail);
    });
    req.on('timeout',()=>req.destroy(Error('timeout')));
    req.on('error',fail);
    req.end(body.length?body:undefined);
  });
}

const server=http.createServer(async(req,res)=>{
 res.setHeader('x-content-type-options','nosniff');res.setHeader('referrer-policy','same-origin');res.setHeader('x-frame-options','DENY');res.setHeader('cache-control','no-store');res.setHeader('content-security-policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
 const send=(status,code,extra={})=>{res.writeHead(status,{'content-type':'application/json',...extra});res.end(JSON.stringify({error:{code}}));};
 if(!allowedHosts.has(req.headers.host)||req.headers.origin&&!allowedOrigins.has(req.headers.origin)){send(403,'origin-denied');return;}
 let url;try{url=new URL(req.url,'http://localhost');}catch{send(400,'invalid-url');return;}
 if(url.pathname==='/healthz'){res.writeHead(200,{'content-type':'application/json'});res.end('{"status":"ok","service":"tlps-web-origin"}');return;}
 if(url.pathname.startsWith('/api/maataa/')){
  const path=url.pathname.slice('/api/maataa'.length);
  if(!apiRoute.test(path)||!['GET','POST','PUT','DELETE'].includes(req.method)){send(404,'not-found');return;}
  const client=String(req.headers['cf-connecting-ip']||req.socket.remoteAddress||'unknown');
  if(!allow(client)){send(429,'rate-limited',{'retry-after':'1'});return;}
  let size=0;const chunks=[];
  try{
   for await(const part of req){size+=part.length;if(size>1048576){send(413,'body-too-large');return;}chunks.push(part);}
   const headers=Object.fromEntries(forwardedHeaders.filter(h=>req.headers[h]).map(h=>[h,req.headers[h]]));
   const reply=await forward(req.method,path+url.search,headers,['GET','HEAD'].includes(req.method)?Buffer.alloc(0):Buffer.concat(chunks));
   for(const h of ['content-type','x-request-id','retry-after'])if(reply.headers[h])res.setHeader(h,reply.headers[h]);
   res.writeHead(reply.status);res.end(reply.body);
  }catch{if(!res.headersSent)send(503,'api-unavailable');}
  return;
 }
 if(!['GET','HEAD'].includes(req.method)){send(405,'method-not-allowed');return;}
 let pathname;try{pathname=decodeURIComponent(url.pathname);}catch{send(400,'invalid-path');return;}
 if(pathname==='/'){pathname='/index.html';}
 const file=resolve(root,'.'+pathname);
 if(!file.startsWith(root+sep)||pathname.split('/').some(p=>p.startsWith('.')&&p!=='')){send(404,'not-found');return;}
 try{const info=await stat(file);if(!info.isFile()){send(404,'not-found');return;}const body=await readFile(file);res.setHeader('content-type',mime[extname(file)]||'application/octet-stream');if(pathname.startsWith('/assets/'))res.setHeader('cache-control','public,max-age=31536000,immutable');res.writeHead(200);res.end(req.method==='HEAD'?undefined:body);}catch{send(404,'not-found');}
});
server.requestTimeout=20000;server.headersTimeout=10000;
server.listen(port,'127.0.0.1',()=>console.log(`TLPS origin ready at http://127.0.0.1:${port}; API via ${upstream.socketPath?'private socket':'development TCP'}`));
for(const sig of ['SIGTERM','SIGINT'])process.on(sig,()=>server.close(()=>process.exit(0)));
