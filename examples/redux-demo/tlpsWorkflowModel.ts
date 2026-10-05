export type PreviewRole = 'producer' | 'owner';
export type WorkflowStatus = 'draft' | 'submitted' | 'approved' | 'rehearsing' | 'closed-local';
export interface TlpsWorkflow {
  schemaVersion: 1;
  project: { title: string; city: string; type: string; date: string; ceiling: number };
  budget: { id: string; name: string; quantity: number; rate: number }[];
  crew: { id: string; name: string; role: string }[];
  locations: { id: string; name: string; note: string }[];
  schedule: { id: string; time: string; scene: string }[];
  status: WorkflowStatus;
  approval: { owner: string; note: string; at: string } | null;
  tasks: { setup: boolean; rehearsal: boolean; wrap: boolean };
  evidence: { id: string; name: string; kind: 'planning' | 'rehearsal'; bytes: number; sha256: string }[];
  audit: { action: string; actor: PreviewRole; at: string }[];
}
export const TLPS_STORAGE_KEY = 'maataa.tlps.workflow.v1';
export function newWorkflow(): TlpsWorkflow { return { schemaVersion: 1, project: { title: '', city: '', type: 'Film', date: '', ceiling: 500000 }, budget: [], crew: [], locations: [], schedule: [], status: 'draft', approval: null, tasks: { setup: false, rehearsal: false, wrap: false }, evidence: [], audit: [] }; }
export function budgetTotal(s: TlpsWorkflow) { return s.budget.reduce((sum, line) => sum + line.quantity * line.rate, 0); }
const text = (s: unknown): s is string => typeof s === 'string' && s.trim().length > 0 && s.length <= 1000;
const amount = (n: unknown): n is number => typeof n === 'number' && Number.isSafeInteger(n) && n > 0 && n <= 1_000_000_000;
const date = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) && new Date(s).toISOString().slice(0,10) === s;
const time = (s: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(s);
export function submissionIssues(s: TlpsWorkflow): string[] {
  return [!text(s.project.title) && 'Enter a project title.', !text(s.project.city) && 'Enter the production city.', !date(s.project.date) && 'Choose a valid shoot date.', !amount(s.project.ceiling) && 'Set a positive whole-rupee budget ceiling.', !s.budget.length && 'Add at least one budget line.', budgetTotal(s) > s.project.ceiling && 'Planned cost exceeds the budget ceiling.', !s.crew.length && 'Assign at least one crew member.', !s.locations.length && 'Add a location planning note.', !s.schedule.length && 'Add a scene to the call sheet.'].filter(Boolean) as string[];
}
export function closeIssues(s: TlpsWorkflow) { return [!Object.values(s.tasks).every(Boolean) && 'Complete setup, rehearsal and wrap checks.', !s.evidence.some(e=>e.kind==='planning') && 'Attach planning evidence.', !s.evidence.some(e=>e.kind==='rehearsal') && 'Attach rehearsal evidence.'].filter(Boolean) as string[]; }
export type WorkflowAction =
 | { type: 'project'; project: TlpsWorkflow['project'] }
 | { type: 'budget'; line: TlpsWorkflow['budget'][number] }
 | { type: 'crew'; person: TlpsWorkflow['crew'][number] }
 | { type: 'location'; location: TlpsWorkflow['locations'][number] }
 | { type: 'schedule'; slot: TlpsWorkflow['schedule'][number] }
 | { type: 'remove'; collection: 'budget' | 'crew' | 'locations' | 'schedule'; id: string }
 | { type: 'submit' } | { type: 'approve'; note: string } | { type: 'return'; note: string }
 | { type: 'start' } | { type: 'task'; task: keyof TlpsWorkflow['tasks']; done: boolean }
 | { type: 'evidence'; file: TlpsWorkflow['evidence'][number] } | { type: 'close' };
export function transition(s: TlpsWorkflow, a: WorkflowAction, actor: PreviewRole, at = new Date().toISOString()): TlpsWorkflow {
  const n: TlpsWorkflow = structuredClone(s);
  const require = (ok: boolean, reason: string) => { if (!ok) throw new Error(reason); };
  if (['project','budget','crew','location','schedule','remove'].includes(a.type)) require(actor === 'producer' && s.status === 'draft', 'Planning changes require the producer preview role and a draft. Return the submission for changes first.');
  switch(a.type) {
    case 'project': require(text(a.project.title)&&text(a.project.city)&&text(a.project.type)&&date(a.project.date)&&amount(a.project.ceiling),'Complete the project title, city, date and positive whole-rupee ceiling.'); n.project=a.project; break;
    case 'budget': require(text(a.line.id)&&text(a.line.name)&&amount(a.line.quantity)&&amount(a.line.rate)&&amount(a.line.quantity*a.line.rate),'Enter a budget item, positive integer quantity and rate.'); require(!s.budget.some(x=>x.id===a.line.id),'Duplicate budget line.'); n.budget.push(a.line); break;
    case 'crew': require(text(a.person.id)&&text(a.person.name)&&text(a.person.role),'Enter a crew member and responsibility.'); n.crew.push(a.person); break;
    case 'location': require(text(a.location.id)&&text(a.location.name)&&text(a.location.note),'Enter a location and planning note.'); n.locations.push(a.location); break;
    case 'schedule': require(text(a.slot.id)&&text(a.slot.scene)&&time(a.slot.time),'Enter a scene and valid call time.'); n.schedule.push(a.slot); break;
    case 'remove': require(['budget','crew','locations','schedule'].includes(a.collection),'Unknown planning collection.'); (n[a.collection] as {id:string}[])=n[a.collection].filter(x=>x.id!==a.id); break;
    case 'submit': require(actor==='producer'&&s.status==='draft','Only a producer draft can be submitted.'); require(submissionIssues(s).length===0,submissionIssues(s).join(' ')); n.status='submitted'; break;
    case 'approve': require(actor==='owner'&&s.status==='submitted','Approval requires the owner preview role and a submitted plan.'); require(text(a.note),'Add an approval note.'); require(submissionIssues(s).length===0,'Resolve planning issues before approval.'); n.status='approved'; n.approval={owner:'Hemant Kumar Dixit (local preview)',note:a.note,at}; break;
    case 'return': require(actor==='owner'&&s.status==='submitted'&&text(a.note),'Return requires owner preview, a submitted plan and a review note.'); n.status='draft'; break;
    case 'start': require(actor==='producer'&&s.status==='approved','A producer may start the local rehearsal only after approval.'); n.status='rehearsing'; break;
    case 'task': require(actor==='producer'&&s.status==='rehearsing','Checks can change only during the local rehearsal.'); require(['setup','rehearsal','wrap'].includes(a.task)&&typeof a.done==='boolean','Unknown rehearsal check.'); n.tasks[a.task]=a.done; break;
    case 'evidence': require(actor==='producer'&&['approved','rehearsing'].includes(s.status),'Attach evidence after plan approval and before closeout.'); require(text(a.file.id)&&text(a.file.name)&&['planning','rehearsal'].includes(a.file.kind)&&amount(a.file.bytes)&&a.file.bytes<=2_000_000&&/^[a-f0-9]{64}$/.test(a.file.sha256),'Choose a non-empty file up to 2 MB; its SHA-256 is required.'); require(!s.evidence.some(e=>e.sha256===a.file.sha256),'This file is already attached. Choose a distinct evidence file.'); n.evidence.push(a.file); break;
    case 'close': require(actor==='producer'&&s.status==='rehearsing','Closeout requires an active producer rehearsal.'); require(closeIssues(s).length===0,closeIssues(s).join(' ')); n.status='closed-local'; break;
    default: throw new Error('Unknown workflow action.');
  }
  require(n.budget.length<=100&&n.crew.length<=100&&n.locations.length<=100&&n.schedule.length<=100&&n.evidence.length<=100,'This local workflow supports up to 100 records per section.');
  n.audit.push({action:a.type+(a.type==='return'?': '+a.note:''),actor,at}); n.audit=n.audit.slice(-300); return n;
}
/** Refuse corrupt or oversized browser-local drafts, including forged advanced stages. */
export function restoreWorkflow(raw: string | null): TlpsWorkflow | null {
 try {
  if(!raw||raw.length>1_000_000)return null;const s=JSON.parse(raw) as TlpsWorkflow;
  if(s.schemaVersion!==1||!s.project||typeof s.project.title!=='string'||typeof s.project.city!=='string'||typeof s.project.type!=='string'||typeof s.project.date!=='string'||!amount(s.project.ceiling))return null;
  if(!['draft','submitted','approved','rehearsing','closed-local'].includes(s.status))return null;
  if(!['budget','crew','locations','schedule','evidence','audit'].every(k=>Array.isArray(s[k as keyof TlpsWorkflow])&&(s[k as keyof TlpsWorkflow] as unknown[]).length<=(k==='audit'?300:100)))return null;
  if(!s.budget.every(x=>text(x.id)&&text(x.name)&&amount(x.quantity)&&amount(x.rate)&&amount(x.quantity*x.rate))||!s.crew.every(x=>text(x.id)&&text(x.name)&&text(x.role))||!s.locations.every(x=>text(x.id)&&text(x.name)&&text(x.note))||!s.schedule.every(x=>text(x.id)&&text(x.scene)&&time(x.time)))return null;
  if(!['budget','crew','locations','schedule','evidence'].every(k=>{const rows=s[k as 'budget'];return new Set(rows.map(x=>x.id)).size===rows.length;}))return null;
  if(!s.tasks||!['setup','rehearsal','wrap'].every(k=>typeof s.tasks[k as keyof typeof s.tasks]==='boolean'))return null;
  if(!s.evidence.every(x=>text(x.id)&&text(x.name)&&['planning','rehearsal'].includes(x.kind)&&amount(x.bytes)&&x.bytes<=2_000_000&&/^[a-f0-9]{64}$/.test(x.sha256)))return null;
  if(new Set(s.evidence.map(x=>x.sha256)).size!==s.evidence.length)return null;
  if(!s.audit.every(x=>text(x.action)&&['producer','owner'].includes(x.actor)&&!Number.isNaN(Date.parse(x.at))))return null;
  if(s.status!=='draft'&&submissionIssues(s).length)return null;
  if(['approved','rehearsing','closed-local'].includes(s.status)&&(!s.approval||s.approval.owner!=='Hemant Kumar Dixit (local preview)'||!text(s.approval.note)||Number.isNaN(Date.parse(s.approval.at))))return null;
  if(s.status==='closed-local'&&closeIssues(s).length)return null;
  return s;
 } catch {return null;}
}
