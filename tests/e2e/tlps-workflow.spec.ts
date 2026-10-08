import {test,expect} from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import {checkA11y} from './tlpsWorkflowA11y';
const record=process.env.TLPS_RECORD_VIDEO==='1';
const artifact=process.env.TLPS_VIDEO_DIR;
test('full TLPS workflow: intake to governed local closeout and MAATAA export',async({page},testInfo)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 async function chapter(title:string){if(!record)return;console.log(title);await page.evaluate(title=>{let e=document.getElementById('tlps-video-caption');if(!e){e=document.createElement('div');e.id='tlps-video-caption';e.style.cssText='position:fixed;bottom:12px;left:50%;transform:translateX(-50%);z-index:9999;max-width:92%;background:#11161df2;color:#fff;padding:10px 18px;border:1px solid #d8b461;border-radius:8px;font:600 15px system-ui;pointer-events:none';document.body.append(e);}e.textContent=title;},title);await page.waitForTimeout(2200);}
 const selectStep=(name:string)=>page.getByRole('navigation',{name:'Workflow steps'}).getByRole('button',{name:new RegExp(name)}).click();
 await page.goto('/#/tlps-workflow');await expect(page.getByRole('heading',{name:'TLPS Production Workflow'})).toBeVisible();
 await expect(page.getByRole('button',{name:'Open Brahmini help and product assistant'})).toHaveCount(0);
 await chapter('TLPS × MAATAA · Complete production workflow');
 await page.getByLabel('Project title',{exact:true}).fill('TLPS · Himalayan Story');await page.getByLabel('Production city',{exact:true}).fill('Dehradun');await page.getByLabel('Shoot date',{exact:true}).fill('2026-11-12');await page.getByLabel('Budget ceiling (INR)',{exact:true}).fill('500000');
 if(record&&artifact)await page.screenshot({path:path.join(artifact,testInfo.project.name+'-intake.png'),fullPage:false});
 await page.getByRole('button',{name:'Save project and continue'}).click();await expect(page.getByRole('heading',{name:'2. Budget'})).toBeVisible();await chapter('Project intake saved · Browser-local persistence');
 for(const [name,qty,rate] of [['Camera package','2','50000'],['Crew & transport','1','150000'],['Art & location planning','1','50000']]){await page.getByLabel('Budget item',{exact:true}).fill(name);await page.getByLabel('Quantity',{exact:true}).fill(qty);await page.getByLabel('Rate (INR)',{exact:true}).fill(rate);await page.getByRole('button',{name:'Add budget line',exact:true}).click();}
 await expect(page.locator('.tlps-summary')).toContainText('3,00,000');await chapter('Budget plan · ₹3 lakh against a ₹5 lakh ceiling');
 await page.getByRole('button',{name:'Continue to crew and location'}).click();
 for(const [name,role] of [['Asha Mehra','Line producer'],['Rohan Singh','Camera lead']]){await page.getByLabel('Crew member',{exact:true}).fill(name);await page.getByLabel('Responsibility',{exact:true}).fill(role);await page.getByRole('button',{name:'Assign crew',exact:true}).click();}
 await page.getByLabel('Location name',{exact:true}).fill('Dehradun studio · planning candidate');await page.getByLabel('Location planning note',{exact:true}).fill('Scout reference recorded; permission and booking remain pending.');await page.getByRole('button',{name:'Add location note',exact:true}).click();await chapter('Crew assignments and location notes · No booking claim');
 await page.getByRole('button',{name:'Continue to call sheet'}).click();for(const [time,scene] of [['09:00','Setup and lighting rehearsal'],['11:00','Interview blocking and camera rehearsal']]){await page.getByLabel('Call time',{exact:true}).fill(time);await page.getByLabel('Scene / activity',{exact:true}).fill(scene);await page.getByRole('button',{name:'Add call-sheet scene',exact:true}).click();}
 const [callSheet]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download call sheet',exact:true}).click()]);if(record&&artifact)await callSheet.saveAs(path.join(artifact,'TLPS-call-sheet.json'));await chapter('Call sheet · Timed scenes, assigned crew and planning context');
 await page.getByRole('button',{name:'Continue to review'}).click();await page.getByRole('button',{name:'Submit for review',exact:true}).click();await expect(page.getByRole('status',{name:'Workflow stage'})).toHaveText('submitted');await expect(page.getByRole('button',{name:'Approve local plan',exact:true})).toBeDisabled();await chapter('Submitted plan · Producer cannot approve');
 await page.getByRole('combobox',{name:'Preview role',exact:true}).selectOption('owner');await page.getByLabel('Review note',{exact:true}).fill('Local pilot review: budget is within ceiling. External permissions remain pending.');await page.getByRole('button',{name:'Approve local plan',exact:true}).click();await expect(page.getByRole('status',{name:'Workflow stage'})).toHaveText('approved');await chapter('Hemant Kumar Dixit · Owner preview approval locks the plan');
 await page.getByRole('combobox',{name:'Preview role',exact:true}).selectOption('producer');await page.getByRole('button',{name:'Start local rehearsal',exact:true}).click();for(const label of ['Setup checked','Rehearsal checked','Wrap checked'])await page.getByLabel(label,{exact:true}).check();await chapter('Local rehearsal · Setup, rehearsal and wrap checks');
 await page.getByRole('button',{name:'Continue to evidence'}).click();await page.getByRole('combobox',{name:'Evidence category'}).selectOption('planning');await page.getByLabel('Evidence file',{exact:true}).setInputFiles({name:'planning-evidence.txt',mimeType:'text/plain',buffer:Buffer.from('TLPS local planning record. No booking or permission confirmation.')});await expect(page.locator('.tlps-main')).toContainText('planning-evidence.txt');await page.getByRole('combobox',{name:'Evidence category'}).selectOption('rehearsal');await page.getByLabel('Evidence file',{exact:true}).setInputFiles({name:'rehearsal-evidence.txt',mimeType:'text/plain',buffer:Buffer.from('TLPS browser-local rehearsal checklist. Not production completion.')});await expect(page.locator('.tlps-main')).toContainText('rehearsal-evidence.txt');await chapter('Evidence · Distinct local files with SHA-256 hashes');
 await page.getByRole('button',{name:'Continue to closeout'}).click();await page.getByRole('button',{name:'Complete local workflow',exact:true}).click();await expect(page.getByRole('status',{name:'Workflow stage'})).toHaveText('closed-local');
 const [handover]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Export handover pack',exact:true}).click()]);const file=await handover.path();const pack=JSON.parse(fs.readFileSync(file!,'utf8'));expect(pack.productionReady).toBe(false);expect(pack.workflow.evidence).toHaveLength(2);expect(pack.workflow.status).toBe('closed-local');expect(pack.composition.schemaVersion).toBe('1');if(record&&artifact)await handover.saveAs(path.join(artifact,'TLPS-handover-pack.json'));await page.getByText(/Workflow audit ·/).click();await chapter('Local closeout · Audit history and handover export');
 await page.reload();await expect(page.getByRole('status',{name:'Workflow stage'})).toHaveText('closed-local');await chapter('Reload · Completed local workflow is restored');
 await page.getByRole('button',{name:'Show MAATAA preview',exact:true}).click();await expect(page.locator('[data-layout-name="Studio"]')).toBeVisible();await chapter('MAATAA canonical Studio layout · Real package rendering');await page.getByRole('button',{name:'Phone preview',exact:true}).click();await chapter('Container-responsive phone preview');
 const [jsx]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Export safe JSX',exact:true}).click()]);if(record&&artifact)await jsx.saveAs(path.join(artifact,'TLPS-maataa-composition.tsx'));
 await page.getByRole('button',{name:'Hide MAATAA preview',exact:true}).click();await selectStep('Closeout');await checkA11y(page);expect(errors).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 if(record&&artifact){await page.screenshot({path:path.join(artifact,testInfo.project.name+'-complete.png'),fullPage:true});await chapter('Workflow complete · Local demo, no production or provider claims');}
});

test('TLPS submission gate refuses incomplete plans',async({page})=>{await page.goto('/#/tlps-workflow');await page.getByRole('navigation',{name:'Workflow steps'}).getByRole('button',{name:/Review & approval/}).click();await page.getByRole('button',{name:'Submit for review',exact:true}).click();await expect(page.getByRole('alert')).toContainText('Enter a project title');await expect(page.getByRole('status',{name:'Workflow stage'})).toHaveText('draft');});

test('synthetic starter scenario is editable and persists locally',async({page})=>{
 await page.goto('/#/tlps-workflow');
 await page.getByRole('button',{name:'Load synthetic sample'}).click();
 await expect(page.locator('.tlps-message')).toContainText('Synthetic sample loaded');
 await expect(page.getByLabel('Project title',{exact:true})).toHaveValue('Sample production · Mountain Light');
 if(process.env.TLPS_CAPTURE_REVIEW==='1')await page.screenshot({path:`.impeccable/review/tlps-${test.info().project.name.includes('mobile')?'mobile':'desktop'}.png`,fullPage:true});
 await page.getByRole('navigation',{name:'Workflow steps'}).getByRole('button',{name:/Budget/}).click();
 await expect(page.locator('.tlps-table')).toContainText('Camera package · estimate');
 await page.reload();
 await page.getByRole('navigation',{name:'Workflow steps'}).getByRole('button',{name:/Budget/}).click();
 await expect(page.locator('.tlps-table')).toContainText('Art and location planning · estimate');
 await expect(page.locator('.tlps-summary')).toContainText('3,00,000');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('TLPS product catalogue search and detail pages distinguish scope from demo behavior',async({page})=>{
 await page.goto('/#/tlps/catalog');
 await expect(page.getByRole('heading',{name:'TLPS product catalogue'})).toBeVisible();
 await expect(page.getByRole('button',{name:'Open Brahmini help and product assistant'})).toHaveCount(0);
 if(process.env.TLPS_CAPTURE_REVIEW==='1')await page.screenshot({path:`.impeccable/review/tlps-catalog-${test.info().project.name.includes('mobile')?'mobile':'desktop'}.png`,fullPage:true});
 await expect(page.getByRole('navigation',{name:'TLPS site'})).toContainText('Product catalogue');
 const search=page.getByRole('searchbox',{name:'Search product areas'});
 await search.fill('finance');
 await expect(page.getByRole('button',{name:'View Evidence & Finance'})).toBeVisible();
 await expect(page.getByRole('button',{name:'View Campaign & Event'})).toHaveCount(0);
 await page.getByRole('button',{name:'View Evidence & Finance'}).click();
 await expect(page.getByRole('heading',{name:'Evidence & Finance'})).toBeVisible();
 await expect(page.getByText(/does not process payments/)).toBeVisible();
 await page.getByRole('navigation',{name:'TLPS site'}).getByRole('button',{name:'Product catalogue'}).click();
 await search.fill('no such category');
 await expect(page.getByRole('status')).toContainText('No product families match');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
