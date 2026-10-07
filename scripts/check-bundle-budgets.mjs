import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(root, "beta/bundle-budgets.json"), "utf8"));

function collect(dir, ext) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) throw new Error(`Missing build output: ${dir}. Run the relevant production build first.`);
  return fs.readdirSync(full, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(full, entry.name);
    if (entry.isDirectory()) return [];
    if (!entry.name.endsWith(ext)) return [];
    return [{ file: path.relative(root, p), bytes: fs.statSync(p).size }];
  }).sort((a,b)=>b.bytes-a.bytes);
}

function inspect(name, cfg) {
  const js = collect(cfg.assetsDir, ".js");
  const css = collect(cfg.assetsDir, ".css");
  const largestJs = js[0] ?? {file:null,bytes:0};
  const largestCss = css[0] ?? {file:null,bytes:0};
  const pass = largestJs.bytes <= cfg.maxJsChunkBytes && largestCss.bytes <= cfg.maxCssChunkBytes;
  return { name, pass, limits:{maxJsChunkBytes:cfg.maxJsChunkBytes,maxCssChunkBytes:cfg.maxCssChunkBytes}, largestJs, largestCss, jsChunks:js.length, cssChunks:css.length, totalJsBytes:js.reduce((n,x)=>n+x.bytes,0), totalCssBytes:css.reduce((n,x)=>n+x.bytes,0) };
}

const results=[inspect("demo",config.demo),inspect("storybook",config.storybook)];
const report={schemaVersion:1,status:results.every(x=>x.pass)?"PASS":"FAIL",results};
const canonical=JSON.stringify(report,null,2)+"\n";
fs.mkdirSync(path.join(root,"manifests"),{recursive:true});
fs.writeFileSync(path.join(root,"manifests/BUNDLE_REPORT.json"),canonical);
fs.writeFileSync(path.join(root,"manifests/BUNDLE_REPORT.sha256"),crypto.createHash("sha256").update(canonical).digest("hex")+"  BUNDLE_REPORT.json\n");
console.log(canonical.trim());
if(report.status!=="PASS") process.exit(1);
