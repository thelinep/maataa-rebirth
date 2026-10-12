// Fingerprint of the sources that go into apps/maataa-desktop-tauri/web/products.
// build-tauri-desktop-products.mjs writes it to products/BUILD.json; the desktop
// e2e suite (playwright.desktop-tauri-trial.config.ts) refuses to run when the
// bundled products no longer match the source content, so tests never pass on an
// old bundle. Run `pnpm maataa:tauri:products` to rebuild.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const BUILD_SCHEMA = "maataa.desktop-products-build/1";
export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const productsRoot = path.join(repoRoot, "apps/maataa-desktop-tauri/web/products");
export const buildStampPath = path.join(productsRoot, "BUILD.json");

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

/**
 * Content of the sources as they are on disk: the index's blob IDs, unstaged
 * changes and untracked files. It does not depend on HEAD, so committing the
 * same content does not make a fresh build stale.
 */
export async function productSourceFingerprint() {
  const hash = createHash("sha256");
  const head = git(["rev-parse", "HEAD"]).toString().trim();
  hash.update(git(["ls-files", "-s", "--", ...PRODUCT_SOURCES]));
  hash.update(git(["diff", "--binary", "--", ...PRODUCT_SOURCES]));
  const untracked = git(["ls-files", "--others", "--exclude-standard", "-z", "--", ...PRODUCT_SOURCES])
    .toString()
    .split("\0")
    .filter(Boolean)
    .sort();
  for (const file of untracked) {
    hash.update(`untracked:${file}\n`);
    hash.update(await readFile(path.join(repoRoot, file)));
  }
  const dirty = git(["status", "--porcelain", "--", ...PRODUCT_SOURCES]).length > 0;
  return { sourceCommit: head, sourceTreeDirty: dirty, sourceDigest: `sha256:${hash.digest("hex")}` };
}

/** Throws with a rebuild instruction when the bundled products are missing or stale. */
export async function assertDesktopProductsFresh() {
  let stamp;
  try {
    stamp = JSON.parse(await readFile(buildStampPath, "utf8"));
  } catch {
    throw new Error("Desktop products are not built (products/BUILD.json is missing). Run: pnpm maataa:tauri:products");
  }
  const current = await productSourceFingerprint();
  if (stamp?.schema !== BUILD_SCHEMA || stamp.sourceDigest !== current.sourceDigest) {
    throw new Error(
      `Desktop products are stale: built from ${stamp?.sourceCommit?.slice(0, 8) ?? "unknown"}${stamp?.sourceTreeDirty ? " (with uncommitted changes)" : ""}, sources are now at ${current.sourceCommit.slice(0, 8)}${current.sourceTreeDirty ? " with uncommitted changes" : ""}. Run: pnpm maataa:tauri:products`,
    );
  }
  return stamp;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const stamp = await assertDesktopProductsFresh();
    process.stdout.write(`Desktop products match the sources (${stamp.sourceDigest.slice(0, 19)}…).\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}
