import {test,expect} from '@playwright/test';
test('workplace uses focused action and step bars without bypassing checks',async({page})=>{
 await page.goto('/#/tlps/workplaces/production-os%3AWORKSPACE.TLPS_PRODUCTION.PRODUCTION_COMMAND_CENTER');
 await expect(page.getByRole('heading',{name:'Prepare your plan',exact:true})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Check your plan',exact:true})).toBeHidden();
 const actions=page.getByRole('group',{name:'Workplace actions'});const steps=page.getByRole('navigation',{name:'Workplace workflow steps'});
 await expect(actions.getByRole('button')).toHaveCount(6);await expect(steps.getByRole('button')).toHaveCount(4);
 await expect(steps.getByRole('button',{name:/^Review:/})).toBeDisabled();
 await actions.getByRole('button',{name:'Load samples',exact:true}).click();
 await page.getByRole('button',{name:'Continue to review',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Prepare your plan',exact:true})).toBeHidden();
 await page.getByLabel('Plan owner',{exact:true}).fill('Plan owner');
 for(let i=0;i<4;i++){await page.getByLabel('Review note',{exact:true}).fill('Walkthrough checked with the team.');await page.getByRole('button',{name:'Check this step locally',exact:true}).click();}
 await expect(page.getByRole('heading',{name:'Your handover',exact:true})).toBeVisible();
 await expect(page.getByText('Your local walkthrough is complete.',{exact:false})).toBeVisible();
 await steps.getByRole('button',{name:/^Review:/}).click();await expect(page.locator('.tlps-demo-steps li:visible').getByText('Walkthrough checked with the team.',{exact:true})).toBeVisible();await expect(page.locator('.tlps-demo-steps li:visible')).toHaveCount(1);await expect(page.locator('.tlps-demo-steps li:visible')).toBeFocused();await page.screenshot({path:'.local/tlps-api/captures/guided-workplace-review.png',fullPage:true});
 await actions.getByRole('button',{name:'New record',exact:true}).click();await expect(page.getByRole('heading',{name:'Prepare your plan',exact:true})).toBeVisible();
 for(const width of [1440,390]){await page.setViewportSize({width,height:1000});await page.evaluate(()=>scrollTo(0,0));expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`.local/tlps-api/captures/guided-workplace-${width}.png`,fullPage:true});}
});
