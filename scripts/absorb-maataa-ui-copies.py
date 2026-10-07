#!/usr/bin/env python3
"""Vendor historical MAATAA UI package sources into this repository, read-only.

The active package remains the repository's top-level src/. Historical sources
are preserved under archives/maataa-ui-source-snapshots/ for migration and audit;
this script never edits or removes an input tree.
"""

from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
from pathlib import Path


REPO = Path(__file__).resolve().parents[1]
DEST = REPO / "archives" / "maataa-ui-source-snapshots"
EXCLUDED = {
    ".git",
    "node_modules",
    "dist",
    "coverage",
    ".next",
    ".turbo",
    "playwright-report",
    "test-results",
    ".pnpm-store",
}

# Each source is intentionally copied into its own namespace. Workspace
# snapshots include only manifests and package source trees, not app builds.
SOURCES = [
    {
        "id": "standalone-ui-lib-alpha0",
        "path": "/Users/vesahe/Documents/Repos/maataa-ui-lib",
        "kind": "repository",
        "description": "Standalone @maataa/maataa-ui alpha.0 library and its tests/docs.",
    },
    {
        "id": "fused-ui-alpha0",
        "path": "/Users/vesahe/Documents/GitHub/maataa-ui/fused-organism/packages/maataa-ui",
        "kind": "package",
        "description": "Fused-organism @maataa/ui alpha.0 package.",
    },
    {
        "id": "maataa-os-ui-alpha1",
        "path": "/Users/vesahe/revenue/live/maataa-os/packages/maataa-ui",
        "kind": "package",
        "description": "MAATAA OS @maataa/maataa-ui alpha.1 package.",
    },
    {
        "id": "mom-ui-stage1",
        "path": "/Users/vesahe/revenue/live/mom/packages/maataa-ui",
        "kind": "package",
        "description": "MOM @maataa/maataa-ui stage.1 package.",
    },
    {
        "id": "mom-investor-demo-stage1",
        "path": "/Users/vesahe/Downloads/mom-codex-shree-investor-live-demo/packages/maataa-ui",
        "kind": "package",
        "description": "Investor-demo snapshot of the MOM stage.1 package.",
    },
    {
        "id": "nevo-ui-0.1",
        "path": "/Users/vesahe/Documents/Repos/nevo-event-os-3/packages/maataa-ui",
        "kind": "package",
        "description": "NEVO-vendored @maataa/ui package and NEVO-specific adapters.",
    },
    {
        "id": "hybrid-runtime-ui-1.0",
        "path": "/Users/vesahe/Documents/Repos/maataa-hybrid-runtime/package/maataa-ui",
        "kind": "package",
        "description": "Hybrid-runtime UI package and hooks.",
    },
    {
        "id": "v3-foundation-0.3.1",
        "path": "/Users/vesahe/Documents/all/MAATAA_UI/snapshots/MAATAA_UI_V3_1_FOUNDATION_CERTIFICATION_SCAFFOLD",
        "kind": "workspace-packages",
        "description": "V3 foundation/certification package generation.",
    },
    {
        "id": "m2-browser-cert-0.4.0",
        "path": "/Users/vesahe/Documents/all/MAATAA_UI/snapshots/MAATAA_UI_M2_0_4_0_BROWSER_REACT_CERTIFICATION",
        "kind": "workspace-packages",
        "description": "M2 browser/React certification package generation.",
    },
    {
        "id": "m2-closeout-0.4.1",
        "path": "/Users/vesahe/Documents/all/MAATAA_UI/snapshots/MAATAA_UI_M2_0_4_1_CLOSEOUT",
        "kind": "workspace-packages",
        "description": "M2 closeout package generation and contracts.",
    },
    {
        "id": "m4-hardening-0.5.0-rc3",
        "path": "/Users/vesahe/Documents/all/MAATAA_UI/snapshots/MAATAA_UI_M4_0_5_0_RC3_MOCK_HARNESS_HARDENING",
        "kind": "workspace-packages",
        "description": "M4 hardening release-candidate packages.",
    },
    {
        "id": "independent-product-scaffold-0.1",
        "path": "/Users/vesahe/Documents/all/MAATAA_UI/snapshots/MAATAA_UI_INDEPENDENT_PRODUCT_SCAFFOLD",
        "kind": "workspace-packages",
        "description": "Independent scaffold packages and domain adapters.",
    },
    {
        "id": "reference-ui-0.1",
        "path": "/Users/vesahe/Documents/all/MAATAA_UI/snapshots/Maataa_UI_Full_Reference_Package_2026",
        "kind": "workspace-packages",
        "description": "Reference package generation.",
    },
    {
        "id": "legacy-ui-repository-0.1",
        "path": "/Users/vesahe/Documents/all/MAATAA_UI/legacy/Projects_MAATAA/releases/maataa-ui-repository-v0.1.0",
        "kind": "workspace-packages",
        "description": "Legacy MAATAA UI repository and package generation.",
    },
]

# This historical package is byte-for-byte the fused alpha.0 package above;
# record its provenance without storing a second copy.
ALIASES = [
    {
        "id": "m2-closeout-fused-ui-alpha0",
        "path": "/Users/vesahe/Documents/all/MAATAA_UI/snapshots/MAATAA_UI_M2_0_4_1_CLOSEOUT/maataa-ui-m3-scope/fused-organism/packages/maataa-ui",
        "canonical_archive_id": "fused-ui-alpha0",
        "relationship": "exact duplicate package tree at absorption time",
    },
    {
        "id": "m4-downloads-exact-copy",
        "path": "/Users/vesahe/Documents/all/MAATAA_UI/exact-copies/MAATAA_UI_M4_0_5_0_RC3_MOCK_HARNESS_HARDENING-downloads-copy",
        "canonical_archive_id": "m4-hardening-0.5.0-rc3",
        "relationship": "exact duplicate workspace tree already retained in the source archive",
    },
]


def digest(path: Path) -> str:
    hasher = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            hasher.update(block)
    return hasher.hexdigest()


def included_files(root: Path, kind: str) -> list[Path]:
    if kind in {"package", "repository"}:
        paths = [root]
    else:
        paths = [root / name for name in ("package.json", "pnpm-workspace.yaml", "README.md", "packages") if (root / name).exists()]
    files: list[Path] = []
    for path in paths:
        if path.is_file():
            files.append(path)
        elif path.is_dir():
            for item in path.rglob("*"):
                if not item.is_file() or any(part in EXCLUDED for part in item.parts):
                    continue
                files.append(item)
    return sorted(set(files))


def repo_state(path: Path) -> dict[str, str | bool | None]:
    try:
        repo = subprocess.run(
            ["git", "-C", str(path), "rev-parse", "--show-toplevel"],
            check=True,
            text=True,
            capture_output=True,
        ).stdout.strip()
        commit = subprocess.run(
            ["git", "-C", repo, "rev-parse", "HEAD"],
            check=True,
            text=True,
            capture_output=True,
        ).stdout.strip()
        dirty = subprocess.run(
            ["git", "-C", repo, "status", "--porcelain"],
            check=True,
            text=True,
            capture_output=True,
        ).stdout.strip()
        return {"git_root": repo, "git_head": commit, "git_dirty_at_absorption": bool(dirty)}
    except (subprocess.CalledProcessError, FileNotFoundError):
        return {"git_root": None, "git_head": None, "git_dirty_at_absorption": False}


def main() -> None:
    if DEST.exists():
        raise SystemExit(f"Refusing to overwrite existing archive: {DEST}")
    DEST.mkdir(parents=True)
    entries = []

    for source in SOURCES:
        root = Path(source["path"])
        if not root.is_dir():
            entries.append({**source, "status": "source missing; retained as unresolved provenance"})
            continue
        files = included_files(root, source["kind"])
        target = DEST / source["id"]
        target.mkdir()
        for original in files:
            relative = original.relative_to(root)
            output = target / relative
            output.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(original, output)
        entries.append(
            {
                **source,
                "status": "absorbed source snapshot",
                "file_count": len(files),
                "bytes": sum(path.stat().st_size for path in files),
                "sha256_by_path": {
                    path.relative_to(root).as_posix(): digest(path) for path in files
                },
                **repo_state(root),
            }
        )

    alias_entries = []
    for alias in ALIASES:
        path = Path(alias["path"])
        hashes = {p.relative_to(path).as_posix(): digest(p) for p in included_files(path, "package")} if path.is_dir() else {}
        alias_entries.append(
            {
                **alias,
                "status": "verified exact duplicate" if hashes else "source missing",
                "file_count": len(hashes),
                "sha256_by_path": hashes,
                **repo_state(path),
            }
        )

    manifest = {
        "schema_version": 1,
        "purpose": "One-repository archival absorption of MAATAA UI package generations.",
        "canonical_package": {
            "name": "@maataa/ui",
            "version": json.loads((REPO / "package.json").read_text())["version"],
            "source": "../../src",
            "policy": "The active top-level package remains canonical; archived generations are migration inputs, not runtime imports.",
        },
        "excluded_generated_content": sorted(EXCLUDED),
        "sources": entries,
        "aliases": alias_entries,
    }
    (DEST / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    readme = """# Absorbed MAATAA UI source generations

This directory brings the independently developed MAATAA UI package sources
into one repository while preserving each generation in a separate namespace.
The active canonical package remains the top-level `@maataa/ui` source at
`src/`; archived copies are migration evidence and are not automatically
published, compiled, or imported at runtime.

`manifest.json` records each original source, source Git state, file hashes,
and duplicate aliases. The absorption only copied package/workspace source;
it did not edit or remove the original checkouts. Generated output, installed
dependencies, and build caches were excluded.

## Convergence rule

Promote a capability into the canonical package only after its API and runtime
dependencies are mapped, its consumer is identified, and tests pass against
the canonical package. Domain-branded adapters stay behind explicit integration
subpaths. Historical workspace architectures stay archived until a deliberate
port replaces them; overlapping files are never overlaid by filename.
"""
    (DEST / "README.md").write_text(readme)
    print(f"Absorbed {sum(e.get('file_count', 0) for e in entries)} files from {len(entries)} source entries into {DEST}")
    print(f"Recorded {len(alias_entries)} duplicate/provenance entries in manifest.json")


if __name__ == "__main__":
    main()
