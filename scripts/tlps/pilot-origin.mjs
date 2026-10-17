/** Production-build origin for Cloudflare Tunnel. Never proxies administrative endpoints. */
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(process.env.TLPS_WEB_ROOT||fileURLToPath(new URL('../../demo-dist',import.meta.url)));
const port=Number(process.env.TLPS_ORIGIN_PORT||4184);
const api=new URL(process.env.TLPS_API_ORIGIN||'http://127.0.0.1:4381');
if(api.hostname!=='127.0.0.1'||api.protocol!=='http:')throw Error('API must be a loopback HTTP origin');
const allowedHosts=new Set([`127.0.0.1:${port}`,`localhost:${port}`,'tlps.in']);
const allowedOrigins=new Set([...allowedHosts].map(h=>h==='tlps.in'?`https://${h}`:`http://${h}`));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{
 res.setHeader('x-content-type-options','nosniff');res.setHeader('referrer-policy','same-origin');res.setHeader('x-frame-options','DENY');res.setHeader('cache-control','no-store');res.setHeader('content-security-policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
 const send=(status,message)=>{res.writeHead(status,{'content-type':'application/json'});res.end(JSON.stringify({error:{code:message}}));};
 if(!allowedHosts.has(req.headers.host)||req.headers.origin&&!allowedOrigins.has(req.headers.origin)){send(403,'origin-denied');return;}
 let url;try{url=new URL(req.url,'http://localhost');}catch{send(400,'invalid-url');return;}
 if(url.pathname==='/healthz'){res.writeHead(200,{'content-type':'application/json'});res.end('{"status":"ok","service":"tlps-web-origin"}');return;}
 if(url.pathname.startsWith('/api/maataa/')){
  const path=url.pathname.slice('/api/maataa'.length);
  if(!(/^\/v1\/(?:tlps\/|projects(?:\/|$)|auth\/whoami$)/.test(path))||!['GET','POST','PUT','DELETE'].includes(req.method)){send(404,'not-found');return;}
  let size=0;const chunks=[];try{for await(const part of req){size+=part.length;if(size>1048576){send(413,'body-too-large');return;}chunks.push(part);}
   const upstream=await fetch(new URL(path+url.search,api),{method:req.method,headers:{...(req.headers.authorization?{authorization:req.headers.authorization}:{}),...(req.headers['content-type']?{'content-type':req.headers['content-type']}:{}),...(req.headers['if-match']?{'if-match':req.headers['if-match']}:{}),...(req.headers['idempotency-key']?{'idempotency-key':req.headers['idempotency-key']}:{})},...(['GET','HEAD'].includes(req.method)?{}:{body:Buffer.concat(chunks)}),redirect:'error',signal:AbortSignal.timeout(15000)});
   for(const h of ['content-type','x-request-id'])if(upstream.headers.has(h))res.setHeader(h,upstream.headers.get(h));res.writeHead(upstream.status);res.end(Buffer.from(await upstream.arrayBuffer()));
  }catch{send(503,'api-unavailable');}return;
 }
 if(!['GET','HEAD'].includes(req.method)){send(405,'method-not-allowed');return;}
 let pathname;try{pathname=decodeURIComponent(url.pathname);}catch{send(400,'invalid-path');return;}
 if(pathname==='/'){pathname='/index.html';}
 const file=resolve(root,'.'+pathname);
 if(!file.startsWith(root+sep)||pathname.split('/').some(p=>p.startsWith('.')&&p!=='')){send(404,'not-found');return;}
 try{const info=await stat(file);if(!info.isFile()){send(404,'not-found');return;}const body=await readFile(file);res.setHeader('content-type',mime[extname(file)]||'application/octet-stream');if(pathname.startsWith('/assets/'))res.setHeader('cache-control','public,max-age=31536000,immutable');res.writeHead(200);res.end(req.method==='HEAD'?undefined:body);}catch{send(404,'not-found');}
});
server.requestTimeout=20000;server.headersTimeout=10000;server.listen(port,'127.0.0.1',()=>console.log(`TLPS origin ready at http://127.0.0.1:${port}`));
for(const sig of ['SIGTERM','SIGINT'])process.on(sig,()=>server.close(()=>process.exit(0)));
