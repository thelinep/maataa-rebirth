import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const electronRelativePath = "examples/support-center/electron";
const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
]);

function resolveRequest(appRoot, requestUrl) {
  const url = new URL(requestUrl, "http://127.0.0.1");
  let root;
  let relative;
  if (url.pathname === "/" || url.pathname === "/desktop-shell.html") {
    root = path.join(appRoot, electronRelativePath);
    relative = "desktop-shell.html";
  } else if (url.pathname === "/desktop-shell.css" || url.pathname === "/desktop-shell.mjs") {
    root = path.join(appRoot, electronRelativePath);
    relative = url.pathname.slice(1);
  } else if (url.pathname.startsWith("/maataa/")) {
    root = path.join(appRoot, "demo-dist");
    relative = url.pathname.slice("/maataa/".length);
  } else if (url.pathname.startsWith("/support/")) {
    root = path.join(appRoot, "support-center-dist");
    relative = url.pathname.slice("/support/".length);
  } else if (url.pathname.startsWith("/tlp/")) {
    root = path.join(appRoot, "apps/tlp-film/dist");
    relative = url.pathname.slice("/tlp/".length);
  } else if (url.pathname.startsWith("/tlps/")) {
    root = path.join(appRoot, "apps/tlps/dist");
    relative = url.pathname.slice("/tlps/".length);
  } else {
    return null;
  }

  const decoded = decodeURIComponent(relative);
  const resolvedRoot = path.resolve(root);
  const resolvedFile = path.resolve(resolvedRoot, decoded || "index.html");
  if (resolvedFile !== resolvedRoot && !resolvedFile.startsWith(`${resolvedRoot}${path.sep}`)) return null;
  return resolvedFile;
}

export function createDesktopServer(appRoot) {
  return createServer(async (request, response) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }

    let filePath;
    try {
      filePath = resolveRequest(appRoot, request.url ?? "/");
      if (!filePath) {
        response.writeHead(404).end("Not found");
        return;
      }
      const fileInfo = await stat(filePath);
      if (fileInfo.isDirectory()) filePath = path.join(filePath, "index.html");
      const body = await readFile(filePath);
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Length": body.length,
        "Content-Type": mimeTypes.get(path.extname(filePath)) ?? "application/octet-stream",
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
      });
      if (request.method === "HEAD") response.end();
      else response.end(body);
    } catch (error) {
      response.writeHead(error?.code === "ENOENT" ? 404 : 500).end("Unable to load the local app resource");
    }
  });
}
