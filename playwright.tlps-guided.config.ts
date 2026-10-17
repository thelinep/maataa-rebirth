import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests/e2e',testMatch:'tlps-workplace-guided.spec.ts',workers:1,use:{baseURL:'http://127.0.0.1:4184',browserName:'chromium',headless:true},outputDir:'.local/tlps-api/guided-results'});
