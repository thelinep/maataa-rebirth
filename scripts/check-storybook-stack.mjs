import fs from "node:fs";
import path from "node:path";
const pkg=JSON.parse(fs.readFileSync(path.resolve("package.json"),"utf8"));
const expected="8.6.18";
const names=["storybook","@storybook/react","@storybook/react-vite","@storybook/addon-a11y","@storybook/addon-essentials"];
let ok=true;
for(const name of names){const declared=pkg.devDependencies?.[name];if(declared!==expected){console.error(`[storybook-check] ${name}: expected ${expected}, declared ${declared ?? "MISSING"}`);ok=false;}else console.log(`[storybook-check] ${name}: ${declared}`);}
if(!ok) process.exit(1);
console.log("[storybook-check] Storybook stack aligned.");
