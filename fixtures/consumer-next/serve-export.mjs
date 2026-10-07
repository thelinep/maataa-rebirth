import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(".certification/consumer-next/out");
const contentTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".woff2": "font/woff2" };

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
  const routeFile = pathname === "/" ? "index.html" : pathname === "/workflow" || pathname === "/workflow/" ? "workflow.html" : pathname.slice(1);
  const target = path.resolve(root, routeFile);
  if (!target.startsWith(`${root}${path.sep}`) && target !== path.join(root, "index.html")) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": contentTypes[path.extname(target)] ?? "application/octet-stream" });
  fs.createReadStream(target).pipe(response);
}).listen(4179, "127.0.0.1");
