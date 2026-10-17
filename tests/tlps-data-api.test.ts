import { describe, it, expect, vi } from 'vitest';
import { createTlpsDataApi } from '../apps/tlps/src/services/tlpsDataApi';
const pid='prj:11111111-1111-4111-8111-111111111111',id='tlps:22222222-2222-4222-8222-222222222222';
const row={ id,projectId:pid,kind:'locations',version:1,data:{name:'Place'},createdAt:1,updatedAt:1,timeBasis:'host-unix-clock-unverified' };
function fixture(value:unknown=row,status=200){const fetchImpl=vi.fn(async()=>new Response(JSON.stringify(value),{status}));const api=createTlpsDataApi({getToken:()=> 'test-only-fixture',fetchImpl:fetchImpl as typeof fetch});return {api,fetchImpl};}
describe('TLPS typed database API client',()=>{
 it('requires credentials without making a request',async()=>{const f=vi.fn();const api=createTlpsDataApi({getToken:()=>null,fetchImpl:f});await expect(api.read(pid,'locations',id)).rejects.toMatchObject({status:401,code:'not-connected'});expect(f).not.toHaveBeenCalled();});
 it('keeps tokens in authorization only and uses explicit idempotency keys',async()=>{const{api,fetchImpl}=fixture();expect(await api.create(pid,'locations',{name:'Place'},'stable-key')).toEqual(row);const[url,options]=fetchImpl.mock.calls[0] as unknown as[string,RequestInit];expect(url).toBe(`/api/maataa/v1/tlps/projects/${pid}/locations`);expect(options.headers).toMatchObject({authorization:'Bearer test-only-fixture','idempotency-key':'stable-key'});expect(options.body).toBe('{"data":{"name":"Place"}}');expect(options.redirect).toBe('error');expect(options.credentials).toBe('omit');});
 it('encodes pagination cursor once and verifies project ownership of returned rows',async()=>{const{api,fetchImpl}=fixture({items:[row],nextCursor:null});await api.list(pid,'locations',{cursor:id,limit:2});expect(fetchImpl.mock.calls[0][0]).toContain('cursor=tlps%3A22222222');const bad=fixture({items:[{...row,projectId:'other'}],nextCursor:null});await expect(bad.api.list(pid,'locations')).rejects.toMatchObject({code:'invalid-response'});});
 it('sends version guards for updates and removals',async()=>{const f=fixture({...row,version:2});await f.api.update(pid,'locations',id,1,{name:'Updated'});expect((f.fetchImpl.mock.calls[0] as unknown as [string,RequestInit])[1].headers).toMatchObject({'if-match':'1'});const d=fixture({id,version:3,deleted:true});await expect(d.api.remove(pid,'locations',id,2)).resolves.toEqual({id,version:3,deleted:true});expect((d.fetchImpl.mock.calls[0] as unknown as [string,RequestInit])[1].body).toBeUndefined();});
 it('preserves server conflict and authorization statuses',async()=>{for(const status of[401,403,404,409,428]){const{api}=fixture({error:{code:'test-error'}},status);await expect(api.read(pid,'locations',id)).rejects.toMatchObject({status,code:'test-error'});}});
 it('rejects invalid project, entity, version, limit and request keys before network calls',async()=>{const{api,fetchImpl}=fixture();await expect(api.read('../secret','locations',id)).rejects.toMatchObject({status:400});await expect(api.read(pid,'locations','../secret')).rejects.toMatchObject({status:400});await expect(api.update(pid,'locations',id,0,{name:'x'})).rejects.toMatchObject({status:400});await expect(api.list(pid,'locations',{limit:101})).rejects.toMatchObject({status:400});await expect(api.create(pid,'locations',{name:'x'},'bad key')).rejects.toMatchObject({status:400});expect(fetchImpl).not.toHaveBeenCalled();});
 it('rejects foreign origins and malformed success responses',async()=>{expect(()=>createTlpsDataApi({getToken:()=> 'x',base:'https://foreign.test'})).toThrow();for(const value of[null,{}, {...row,version:0},{...row,kind:'circles'}]){await expect(fixture(value).api.read(pid,'locations',id)).rejects.toMatchObject({code:'invalid-response'});}});
 it('reports transport failures without including tokens or payloads',async()=>{const api=createTlpsDataApi({getToken:()=> 'private-token',fetchImpl:vi.fn(async()=>{throw Error('private-token');})});await expect(api.read(pid,'locations',id)).rejects.toMatchObject({status:503,code:'unavailable',message:'TLPS API: unavailable'});});
 it('rejects non-JSON responses and exposes no automatic retries',async()=>{const fetchImpl=vi.fn(async()=>new Response('<html/>'));const api=createTlpsDataApi({getToken:()=> 'x',fetchImpl});await expect(api.read(pid,'locations',id)).rejects.toMatchObject({code:'invalid-response'});expect(fetchImpl).toHaveBeenCalledTimes(1);});
 it('supports explicit capabilities, draft catalogue, audit and export reads',async()=>{const f=fixture({ok:true});await f.api.capabilities();await f.api.skus();await f.api.events(pid,{after:2,limit:3});await f.api.export(pid);expect(f.fetchImpl.mock.calls.map(c=>c[0])).toEqual(['/api/maataa/v1/tlps/capabilities','/api/maataa/v1/tlps/skus',`/api/maataa/v1/tlps/projects/${pid}/events?after=2&limit=3`,`/api/maataa/v1/tlps/projects/${pid}/export`]);});
});

// The same client over the shared transport (Desktop commands or the /api/maataa proxy):
// the token stays with the transport and guards travel as request options.
import { createDesktopTransport, createHttpTransport } from '../apps/tlps/src/services/maataaAuthApi';
describe('TLPS data client over the shared MAATAA transport', () => {
  it('sends TLPS calls through Desktop commands with If-Match and the idempotency key', async () => {
    const seen: Array<{ command: string; args?: Record<string, unknown> }> = [];
    const invoke = vi.fn(async (command: string, args?: Record<string, unknown>) => {
      seen.push({ command, args });
      if (command === 'api_connect') return { status: 200, body: JSON.stringify({ project_id: pid }) };
      if (args?.method === 'DELETE') return { status: 200, body: JSON.stringify({ id, version: 3, deleted: true }) };
      return { status: 200, body: JSON.stringify(row) };
    });
    const transport = createDesktopTransport(invoke);
    const api = createTlpsDataApi({ transport });
    await transport.connect('mta_test');
    await api.create(pid, 'locations', { name: 'Place' }, 'stable-key');
    await api.update(pid, 'locations', id, 1, { name: 'Place' });
    await api.remove(pid, 'locations', id, 2);
    const requests = seen.filter((s) => s.command === 'api_request').map((s) => s.args);
    expect(requests).toEqual([
      { method: 'POST', path: `/v1/tlps/projects/${pid}/locations`, body: '{"data":{"name":"Place"}}', ifMatch: null, idempotencyKey: 'stable-key' },
      { method: 'PUT', path: `/v1/tlps/projects/${pid}/locations/${id}`, body: '{"data":{"name":"Place"}}', ifMatch: 1, idempotencyKey: null },
      { method: 'DELETE', path: `/v1/tlps/projects/${pid}/locations/${id}`, body: null, ifMatch: 2, idempotencyKey: null },
    ]);
    expect(JSON.stringify(requests)).not.toContain('mta_test');
  });

  it('maps transport refusals to client errors without a network call', async () => {
    const fetchImpl = vi.fn();
    const api = createTlpsDataApi({ transport: createHttpTransport(fetchImpl) });
    await expect(api.read(pid, 'locations', id)).rejects.toMatchObject({ status: 401, code: 'not-connected' });
    expect(fetchImpl).not.toHaveBeenCalled();
    const refused = createTlpsDataApi({ transport: createDesktopTransport(async () => { throw 'invalid: MAATAA Desktop does not forward this request.'; }) });
    await expect(refused.read(pid, 'locations', id)).rejects.toMatchObject({ status: 400, code: 'invalid-client-input' });
    const down = createTlpsDataApi({ transport: createDesktopTransport(async () => { throw 'unavailable: The MAATAA Auth API is not running on this computer.'; }) });
    await expect(down.read(pid, 'locations', id)).rejects.toMatchObject({ status: 503, code: 'unavailable' });
  });

  it('keeps the browser token in the transport and adds the guards as headers', async () => {
    const fetchImpl = vi.fn(async (_url: string, init?: RequestInit) => new Response(JSON.stringify((init?.method ?? 'GET') === 'GET' && _url.endsWith('whoami') ? { project_id: pid } : row), { status: 200 }));
    const transport = createHttpTransport(fetchImpl);
    await transport.connect('mta_browser');
    await createTlpsDataApi({ transport }).create(pid, 'locations', { name: 'Place' }, 'k-1');
    const [url, init] = fetchImpl.mock.calls[1] as unknown as [string, RequestInit];
    expect(url).toBe(`/api/maataa/v1/tlps/projects/${pid}/locations`);
    expect(init.headers).toMatchObject({ authorization: 'Bearer mta_browser', 'idempotency-key': 'k-1' });
    expect(init).toMatchObject({ credentials: 'omit', redirect: 'error', cache: 'no-store' });
  });
});
