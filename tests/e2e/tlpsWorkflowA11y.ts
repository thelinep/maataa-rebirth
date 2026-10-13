import { AxeBuilder } from '@axe-core/playwright';
import {expect,type Page} from '@playwright/test';
export async function checkA11y(page:Page){const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations).toEqual([]);}
