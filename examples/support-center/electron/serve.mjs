import path from "node:path";
import { fileURLToPath } from "node:url";
import { createDesktopServer } from "./static-server.mjs";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const server = createDesktopServer(appRoot);
server.listen(4179, "127.0.0.1", () => console.log("MAATAA Desktop test server listening at http://127.0.0.1:4179"));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close(() => process.exit(0)));
