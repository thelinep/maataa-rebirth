// Fingerprint of the source inputs that produce the four bundled desktop products.
// The small committed manifest lets the source check run without generated bundles.
// Desktop E2E still checks products/BUILD.json so it cannot run against stale bundles.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const BUILD_SCHEMA = "maataa.desktop-products-build/1";
export const SOURCE_FINGERPRINT_SCHEMA = "maataa.desktop-products-source-fingerprint/1";
export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const productsRoot = path.join(repoRoot, "apps/maataa-desktop-tauri/web/products");
export const buildStampPath = path.join(productsRoot, "BUILD.json");
export const sourceManifestPath = path.join(repoRoot, "manifests/DESKTOP_PRODUCTS_FINGERPRINT.json");
export const sourceManifestShaPath = path.join(repoRoot, "manifests/DESKTOP_PRODUCTS_FINGERPRINT.sha256");

/** Everything the four bundled products are built from. */
export const PRODUCT_SOURCES = [
  "src",
  "examples/redux-demo",
  "examples/support-center",
  "apps/tlps",
  "apps/tlp-film",
  "apps/shared",
  "scripts/build-tauri-desktop-products.mjs",
  "package.json",
  "pnpm-lock.yaml",
];

const git = (args) => execFileSync("git", args, { cwd: repoRoot, encoding: "buffer", maxBuffer: 256 * 1024 * 1024 });

/** Content fingerprint of tracked and non-ignored untracked source files on disk. */
export async function productSourceFingerprint() {
  const hash = createHash("sha256");
  const head = git(["rev-parse", "HEAD"]).toString().trim();
  hash.update("maataa.desktop-products-source-fingerprint/2\0");
  const tracked = git(["ls-files", "-z", "--", ...PRODUCT_SOURCES])
    .toString()
    .split("\0")
    .filter(Boolean);
  const untracked = git(["ls-files", "--others", "--exclude-standard", "-z", "--", ...PRODUCT_SOURCES])
    .toString()
    .split("\0")
    .filter(Boolean);
  const files = [...new Set([...tracked, ...untracked])].sort();
  const updateFrame = (value) => {
    const bytes = Buffer.isBuffer(value) ? value : Buffer.from(value);
    const length = Buffer.alloc(8);
    length.writeBigUInt64BE(BigInt(bytes.length));
    hash.update(length);
    hash.update(bytes);
  };
  for (const file of files) {
    updateFrame(file);
    try {
      updateFrame(await readFile(path.join(repoRoot, file)));
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
      updateFrame("<missing>");
    }
  }
  const dirty = git(["status", "--porcelain", "--", ...PRODUCT_SOURCES]).length > 0;
  return { sourceCommit: head, sourceTreeDirty: dirty, sourceDigest: `sha256:${hash.digest("hex")}` };
}

/** Compare current source inputs with the committed source fingerprint, without requiring build output. */
export async function assertDesktopProductSourcesCurrent() {
  let rawManifest;
  let manifest;
  let sidecar;
  try {
    rawManifest = await readFile(sourceManifestPath);
    manifest = JSON.parse(rawManifest.toString("utf8"));
    sidecar = (await readFile(sourceManifestShaPath, "utf8")).trim();
  } catch {
    throw new Error("Desktop source fingerprint manifest or SHA-256 sidecar is missing.");
  }
  const manifestDigest = createHash("sha256").update(rawManifest).digest("hex");
  const sidecarDigest = sidecar.match(/^([a-f0-9]{64})\s+\*?DESKTOP_PRODUCTS_FINGERPRINT\.json$/)?.[1];
  if (manifest?.schema !== SOURCE_FINGERPRINT_SCHEMA || !sidecarDigest || manifestDigest !== sidecarDigest) {
    throw new Error("Desktop source fingerprint manifest failed schema or SHA-256 validation.");
  }

  const current = await productSourceFingerprint();
  if (manifest.sourceDigest !== current.sourceDigest) {
    throw new Error(
      `Desktop source inputs differ from the committed fingerprint: expected ${manifest.sourceDigest ?? "unknown"}, found ${current.sourceDigest}${current.sourceTreeDirty ? " (source inputs have local changes)" : ""}.`,
    );
  }
  return { ...manifest, sourceCommit: current.sourceCommit, sourceTreeDirty: current.sourceTreeDirty };
}

/** Throws unless the source manifest and generated desktop bundles both match. */
export async function assertDesktopProductsFresh() {
  const source = await assertDesktopProductSourcesCurrent();
  let stamp;
  try {
    stamp = JSON.parse(await readFile(buildStampPath, "utf8"));
  } catch {
    throw new Error("Desktop products are not built (products/BUILD.json is missing). Run: pnpm maataa:tauri:products");
  }
  if (stamp?.schema !== BUILD_SCHEMA || stamp.sourceDigest !== source.sourceDigest) {
    throw new Error("Desktop product bundles are stale or missing their source stamp. Run: pnpm maataa:tauri:products");
  }
  return stamp;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const manifest = await assertDesktopProductSourcesCurrent();
    process.stdout.write(`Desktop source inputs match the committed fingerprint (${manifest.sourceDigest.slice(0, 19)}…).\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}
