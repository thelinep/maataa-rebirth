import {test,expect} from '@playwright/test';
test.use({viewport:{width:390,height:844}});
test('TLPS mobile shell keeps five destinations reachable',async({page})=>{
 await page.goto('/#/tlps');await expect(page.getByRole('heading',{name:'Your production desk',exact:true})).toBeVisible();
 const nav=page.getByRole('navigation',{name:'TLPS mobile navigation'});await expect(nav.getByRole('link')).toHaveCount(5);
 for(const [name,path]of [['Projects','/tlps/projects'],['Operate','/tlps/workplaces'],['My work','/tlps/my-work'],['More','/tlps/more'],['Home','/tlps']]){await nav.getByRole('link',{name,exact:true}).click();await expect(page).toHaveURL(new RegExp('#'+path.replaceAll('/','\\/')+'$'));await expect(nav.getByRole('link',{name,exact:true})).toHaveAttribute('aria-current','page');}
 await nav.getByRole('link',{name:'My work',exact:true}).click();await page.getByRole('link',{name:/My Applications & Auditions/}).click();await expect(page.getByRole('link',{name:'Back to section',exact:true})).toHaveAttribute('href','#/tlps/my-work');
 for(const width of [320,390,430]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
});
