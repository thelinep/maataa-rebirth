#!/usr/bin/env node
// Pre-publish privacy guard.
//
// Packs the package exactly as `pnpm pack` would, extracts the tarball and
// fails if any text file in it contains a local home-directory path
// (`/Users/`, `/home/`) or a literal `$HOME`.
//
// Runs as the last step of `prepack`. It packs with scripts disabled
// (`--config.ignore-scripts=true`) so it does not re-enter `prepack`.
// Matches are reported with the account segment redacted, so the guard's own
// output never repeats the leaked name.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const PATTERNS = ["/Users/", "/home/", "$HOME"];
const MAX_REPORTED = 50;
const root = process.cwd();

function run(cmd, args, cwd) {
  const result = spawnSync(cmd, args, { cwd, encoding: "utf8", shell: process.platform === "win32" });
  if (result.error || result.status !== 0) {
    const detail = result.error ? result.error.message : (result.stderr || result.stdout || "").trim().split("\n").slice(-5).join("\n");
    throw new Error(`${cmd} ${args.join(" ")} failed${detail ? `:\n${detail}` : ""}`);
  }
  return result.stdout;
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}

function isBinary(buffer) {
  return buffer.subarray(0, Math.min(buffer.length, 8192)).includes(0);
}

function redact(text) {
  return text.replace(/(\/Users\/|\/home\/)[^/\s"'`)\]<>]+/g, "$1<redacted>");
}

const work = fs.mkdtempSync(path.join(os.tmpdir(), "maataa-privacy-"));
let exitCode = 0;
try {
  run("pnpm", ["pack", "--config.ignore-scripts=true", "--pack-destination", work], root);
  const tarball = fs.readdirSync(work).find((name) => name.endsWith(".tgz"));
  if (!tarball) throw new Error("pnpm pack produced no tarball");
  const extracted = path.join(work, "extracted");
  fs.mkdirSync(extracted);
  run("tar", ["-xzf", path.join(work, tarball), "-C", extracted], root);

  const findings = [];
  let filesScanned = 0;
  const filesWithMatches = new Set();
  for (const file of walk(extracted)) {
    const buffer = fs.readFileSync(file);
    if (isBinary(buffer)) continue;
    filesScanned += 1;
    const relative = path.relative(path.join(extracted, "package"), file);
    const lines = buffer.toString("utf8").split("\n");
    lines.forEach((line, index) => {
      for (const pattern of PATTERNS) {
        if (!line.includes(pattern)) continue;
        filesWithMatches.add(relative);
        // Redact the whole line before cutting the excerpt, so a cut can never
        // separate a name from the prefix that marks it for redaction.
        const safe = redact(line);
        const at = Math.max(0, safe.indexOf(pattern));
        findings.push(`${relative}:${index + 1}  [${pattern}]  ${safe.slice(Math.max(0, at - 40), at + 80).trim()}`);
      }
    });
  }

  if (findings.length > 0) {
    console.error(`check-privacy: FAIL — ${findings.length} match(es) for ${PATTERNS.join(", ")} in ${filesWithMatches.size} file(s) of ${tarball}`);
    for (const finding of findings.slice(0, MAX_REPORTED)) console.error(`  ${finding}`);
    if (findings.length > MAX_REPORTED) console.error(`  … ${findings.length - MAX_REPORTED} more`);
    console.error("Remove the paths, or exclude the files from package.json \"files\", before packing.");
    exitCode = 1;
  } else {
    console.log(`check-privacy: PASS — ${filesScanned} text files in ${tarball} contain no ${PATTERNS.join(", ")}`);
  }
} catch (error) {
  console.error(`check-privacy: ERROR — ${error.message}`);
  exitCode = 2;
} finally {
  fs.rmSync(work, { recursive: true, force: true });
}
process.exit(exitCode);
