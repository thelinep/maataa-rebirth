/** Typed client for the local project-scoped TLPS API. Does not migrate browser data or persist tokens. */
export type ProjectStage = 'idea' | 'story' | 'board' | 'pre' | 'production' | 'post' | 'release' | 'shree';
export interface TlpsCollectionData {
  profiles: { title: string; stage: ProjectStage; city?: string };
  onboarding: { audience: string; idea: string; journey: 'I2S' | 'I2R' | 'I2B' | 'undecided'; automation: 'guided' | 'assisted' | 'manual' | 'undecided' };
  'workplace-records': { areaId: string; workspaceId: string; values: Record<string, string>; status: 'draft' | 'review' | 'rehearsal' | 'handover' };
  'budget-items': { label: string; quantity: number; unitAmountMinor: number; currency: 'INR' };
  'crew-assignments': { name: string; role: string; department?: string; notes?: string };
  locations: { name: string; city?: string; notes?: string };
  'schedule-items': { title: string; date: string; startMinute: number; endMinute: number; locationId?: string };
  evidence: { title: string; kind: 'note' | 'checklist' | 'document' | 'image'; sourceRef: string; sha256?: string };
  circles: { name: string; purpose: string; coordinatorReference?: string; rules?: string };
  'membership-plans': { circleId: string; name: string; period: 'undecided' | 'monthly' | 'yearly'; benefits: string };
  'investment-interests': { circleId: string; partyReference: string; terms?: string };
  'escrow-reviews': { milestone: string; condition: string; evidenceReference?: string; reviewerReference?: string; disputeTerms?: string };
}
export type TlpsCollection = keyof TlpsCollectionData;
export interface TlpsEntity<K extends TlpsCollection> { id: string; projectId: string; kind: K; version: number; data: TlpsCollectionData[K]; createdAt: number; updatedAt: number; timeBasis: 'host-unix-clock-unverified' }
export class TlpsDataApiError extends Error {
  constructor(readonly status: number, readonly code: string) { super(`TLPS API: ${code}`); this.name = 'TlpsDataApiError'; }
}
const collections: readonly TlpsCollection[] = ['profiles','onboarding','workplace-records','budget-items','crew-assignments','locations','schedule-items','evidence','circles','membership-plans','investment-interests','escrow-reviews'];
const uuid = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
const projectPattern = new RegExp(`^prj:${uuid}$`), entityPattern = new RegExp(`^tlps:${uuid}$`);
function invalid(): never { throw new TlpsDataApiError(400, 'invalid-client-input'); }
function object(value: unknown): value is Record<string, unknown> { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function record<K extends TlpsCollection>(value: unknown, projectId: string, kind: K): TlpsEntity<K> {
  if (!object(value) || typeof value.id !== 'string' || !entityPattern.test(value.id) || value.projectId !== projectId || value.kind !== kind || !Number.isSafeInteger(value.version) || Number(value.version) < 1 || !object(value.data) || value.timeBasis !== 'host-unix-clock-unverified') throw new TlpsDataApiError(502, 'invalid-response');
  return value as unknown as TlpsEntity<K>;
}
export function createTlpsDataApi({ getToken, fetchImpl = fetch, base = '/api/maataa' }: { getToken: () => string | null; fetchImpl?: typeof fetch; base?: string }) {
  if (!/^\/api\/[A-Za-z0-9/_-]+$/.test(base)) invalid();
  const root = base.replace(/\/$/, '');
  const path = (projectId: string, kind?: TlpsCollection, id?: string) => {
    if (!projectPattern.test(projectId) || (kind !== undefined && !collections.includes(kind)) || (id !== undefined && !entityPattern.test(id))) invalid();
    return `/v1/tlps/projects/${projectId}${kind ? `/${kind}` : ''}${id ? `/${id}` : ''}`;
  };
  async function request(method: string, suffix: string, data?: unknown, headers: Record<string, string> = {}): Promise<unknown> {
    const token = getToken(); if (!token) throw new TlpsDataApiError(401, 'not-connected');
    let response: Response;
    try { response = await fetchImpl(`${root}${suffix}`, { method, headers: { authorization: `Bearer ${token}`, ...(data === undefined ? {} : { 'content-type': 'application/json' }), ...headers }, ...(data === undefined ? {} : { body: JSON.stringify({ data }) }), credentials: 'omit', redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(15000) }); }
    catch { throw new TlpsDataApiError(503, 'unavailable'); }
    let value: unknown; try { value = await response.json(); } catch { throw new TlpsDataApiError(502, 'invalid-response'); }
    if (!response.ok) { const error = object(value) && object(value.error) && typeof value.error.code === 'string' ? value.error.code : 'request-failed'; throw new TlpsDataApiError(response.status, error); }
    return value;
  }
  const version = (v: number) => { if (!Number.isSafeInteger(v) || v < 1) invalid(); return String(v); };
  return {
    async capabilities() { return request('GET', '/v1/tlps/capabilities'); },
    async skus() { return request('GET', '/v1/tlps/skus'); },
    async create<K extends TlpsCollection>(projectId: string, kind: K, data: TlpsCollectionData[K], requestKey: string) {
      const url = path(projectId, kind); if (!/^[A-Za-z0-9_-]{1,128}$/.test(requestKey)) invalid();
      return record(await request('POST', url, data, { 'idempotency-key': requestKey }), projectId, kind);
    },
    async read<K extends TlpsCollection>(projectId: string, kind: K, id: string) { return record(await request('GET', path(projectId, kind, id)), projectId, kind); },
    async list<K extends TlpsCollection>(projectId: string, kind: K, { cursor, limit = 50 }: { cursor?: string; limit?: number } = {}) {
      const url = path(projectId, kind); if (!Number.isInteger(limit) || limit < 1 || limit > 100 || (cursor !== undefined && !entityPattern.test(cursor))) invalid();
      const query = new URLSearchParams({ limit: String(limit), ...(cursor ? { cursor } : {}) });
      const value = await request('GET', `${url}?${query}`);
      if (!object(value) || !Array.isArray(value.items) || !(value.nextCursor === null || (typeof value.nextCursor === 'string' && entityPattern.test(value.nextCursor)))) throw new TlpsDataApiError(502, 'invalid-response');
      return { items: value.items.map((item) => record(item, projectId, kind)), nextCursor: value.nextCursor as string | null };
    },
    async update<K extends TlpsCollection>(projectId: string, kind: K, id: string, currentVersion: number, data: TlpsCollectionData[K]) { return record(await request('PUT', path(projectId, kind, id), data, { 'if-match': version(currentVersion) }), projectId, kind); },
    async remove(projectId: string, kind: TlpsCollection, id: string, currentVersion: number) {
      const value = await request('DELETE', path(projectId, kind, id), undefined, { 'if-match': version(currentVersion) });
      if (!object(value) || value.id !== id || value.deleted !== true || value.version !== currentVersion + 1) throw new TlpsDataApiError(502, 'invalid-response');
      return { id, version: Number(value.version), deleted: true as const };
    },
    async events(projectId: string, { after = 0, limit = 50 }: { after?: number; limit?: number } = {}) {
      const url = path(projectId); if (!Number.isSafeInteger(after) || after < 0 || !Number.isInteger(limit) || limit < 1 || limit > 100) invalid();
      return request('GET', `${url}/events?${new URLSearchParams({ after: String(after), limit: String(limit) })}`);
    },
    async export(projectId: string) { return request('GET', `${path(projectId)}/export`); },
  };
}
