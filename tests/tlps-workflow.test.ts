import { expect, it } from 'vitest';
import { budgetTotal, newWorkflow, restoreWorkflow, transition, type WorkflowAction } from '../examples/redux-demo/tlpsWorkflowModel';
const at='2026-10-05T10:00:00Z';
function plan(){let s=newWorkflow();const actions:WorkflowAction[]=[{type:'project',project:{title:'Pilot',city:'Delhi',type:'Film',date:'2026-11-12',ceiling:500000}},{type:'budget',line:{id:'b1',name:'Camera',quantity:2,rate:50000}},{type:'crew',person:{id:'c1',name:'Asha',role:'Line producer'}},{type:'location',location:{id:'l1',name:'Studio',note:'Permission pending'}},{type:'schedule',slot:{id:'s1',time:'09:00',scene:'Interview'}}];for(const a of actions)s=transition(s,a,'producer',at);return s;}
function approved(){return transition(transition(plan(),{type:'submit'},'producer',at),{type:'approve',note:'Local review'},'owner',at);}
it('rejects incomplete plans, over-budget submission and ownerless approval',()=>{
 expect(()=>transition(newWorkflow(),{type:'submit'},'producer',at)).toThrow('project title');
 const s=plan();expect(budgetTotal(s)).toBe(100000);s.project.ceiling=50000;expect(()=>transition(s,{type:'submit'},'producer',at)).toThrow('exceeds');
 expect(()=>transition(plan(),{type:'approve',note:'yes'},'owner',at)).toThrow('submitted');
});
it('requires the owner preview for review, locks submitted plans and supports return for changes',()=>{
 const s=transition(plan(),{type:'submit'},'producer',at);expect(()=>transition(s,{type:'approve',note:'yes'},'producer',at)).toThrow('owner');
 expect(()=>transition(s,{type:'budget',line:{id:'x',name:'Lighting',quantity:1,rate:10}},'producer',at)).toThrow('draft');
 const returned=transition(s,{type:'return',note:'Revise costs'},'owner',at);expect(returned.status).toBe('draft');expect(returned.audit.at(-1)?.action).toContain('Revise costs');
});
it('blocks bad amounts, dates, times and unknown task checks',()=>{
 expect(()=>transition(plan(),{type:'budget',line:{id:'bad',name:'Bad',quantity:1,rate:NaN}},'producer',at)).toThrow('integer');
 expect(()=>transition(plan(),{type:'project',project:{...plan().project,date:'2026-02-31'}},'producer',at)).toThrow('Complete');
 expect(()=>transition(plan(),{type:'schedule',slot:{id:'bad',time:'25:00',scene:'Bad'}},'producer',at)).toThrow('valid call');
 const s=transition(approved(),{type:'start'},'producer',at);expect(()=>transition(s,{type:'task',task:'unknown',done:true} as never,'producer',at)).toThrow('Unknown');
});
it('completes a governed local rehearsal only with checks and distinct hashed evidence',()=>{
 let s=transition(approved(),{type:'start'},'producer',at);expect(()=>transition(s,{type:'close'},'producer',at)).toThrow('Complete setup');
 for(const task of ['setup','rehearsal','wrap'] as const)s=transition(s,{type:'task',task,done:true},'producer',at);
 expect(()=>transition(s,{type:'close'},'producer',at)).toThrow('planning evidence');
 const a={id:'e1',name:'plan.txt',kind:'planning' as const,bytes:12,sha256:'a'.repeat(64)};s=transition(s,{type:'evidence',file:a},'producer',at);
 expect(()=>transition(s,{type:'evidence',file:{...a,id:'e2',kind:'rehearsal'}},'producer',at)).toThrow('already');
 s=transition(s,{type:'evidence',file:{id:'e2',name:'run.txt',kind:'rehearsal',bytes:14,sha256:'b'.repeat(64)}},'producer',at);
 s=transition(s,{type:'close'},'producer',at);expect(s.status).toBe('closed-local');expect(restoreWorkflow(JSON.stringify(s))).toEqual(s);
 expect(()=>transition(s,{type:'task',task:'wrap',done:false},'producer',at)).toThrow('during');
});
it('refuses corrupt, forged, duplicate and oversized saved drafts',()=>{
 expect(restoreWorkflow('{bad')).toBeNull();expect(restoreWorkflow(JSON.stringify({...newWorkflow(),status:'closed-local'}))).toBeNull();
 const s=plan();s.budget.push({...s.budget[0]});expect(restoreWorkflow(JSON.stringify(s))).toBeNull();
 expect(restoreWorkflow('x'.repeat(1_000_001))).toBeNull();expect(restoreWorkflow(JSON.stringify(newWorkflow()))).toEqual(newWorkflow());
});
it('does not mutate the original planning state and removes draft rows',()=>{
 const s=plan();const n=transition(s,{type:'remove',collection:'budget',id:'b1'},'producer',at);expect(n.budget).toHaveLength(0);expect(s.budget).toHaveLength(1);
});
