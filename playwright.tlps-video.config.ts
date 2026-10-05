import {defineConfig} from '@playwright/test';
import base from './playwright.config';
export default defineConfig({...base,
 testMatch:'tlps-workflow.spec.ts',
 grep:/full TLPS workflow/,
 timeout:180_000,
 fullyParallel:false,
 workers:1,
 reporter:[['list']],
 outputDir:process.env.TLPS_VIDEO_DIR ? `${process.env.TLPS_VIDEO_DIR}/raw` : 'test-results/tlps-video',
 use:{...base.use,video:{mode:'on',size:{width:1440,height:900}},launchOptions:{slowMo:120}},
 projects:[
  {name:'tlps-desktop',use:{browserName:'chromium',viewport:{width:1440,height:900}}},
  {name:'tlps-mobile',use:{browserName:'chromium',viewport:{width:390,height:844},isMobile:true,hasTouch:true,video:{mode:'on',size:{width:390,height:844}}}}
 ]
});
