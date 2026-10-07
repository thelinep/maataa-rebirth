#!/usr/bin/env python3
"""Compare selected MAATAA, NEVO, TLPS and media directory trees by content."""
from __future__ import annotations
import csv, hashlib, os, time
from collections import defaultdict
from pathlib import Path

OUT = Path(__file__).parent
ROOTS = [
    '/Users/vesahe/Downloads/tps-v2-p0-p7',
    '/Users/vesahe/Downloads/tps-v2-p0-p7-complete',
    '/Users/vesahe/Downloads/tps-v2-p0-p7-complete 2',
    '/Users/vesahe/Downloads/tps-v2-p5-real-components',
    '/Users/vesahe/Downloads/tps-v2-p5-real-components 2',
    '/Users/vesahe/Downloads/tps-v2-p7-booking-contracting-final',
    '/Users/vesahe/Downloads/tps-v2-p2-event-intelligence',
    '/Users/vesahe/Downloads/tps-v2-p3-production-scene-composer',
    '/Users/vesahe/Downloads/tps-v2-p5-event-marketplace',
    '/Users/vesahe/Downloads/tps-v2-p6-pricing-final',
    '/Users/vesahe/Downloads/tps-v2-p10-production-command-center-final',
    '/Users/vesahe/Downloads/mom_release_bundle',
    '/Users/vesahe/Downloads/mom_release_bundle 2',
    '/Users/vesahe/Downloads/tlps_in_release_code_ready',
    '/Users/vesahe/Downloads/tlps_launch_scaffold',
    '/Users/vesahe/Downloads/tlps',
    '/Users/vesahe/Downloads/ferty9_tlps_route_with_BTL_coverage',
    '/Users/vesahe/Downloads/ferty9_tlps_route_with_BTL_coverage (1)',
    '/Users/vesahe/Downloads/nevoevents-in-release-prep-pack',
    '/Users/vesahe/Downloads/nevo-event-os 3',
    '/Users/vesahe/Downloads/NEVO_EOS_ICONS_LIGHT_DARK',
    '/Users/vesahe/Downloads/NEVO_EVENTS_ICON_FULL_PLATFORM_SET',
    '/Users/vesahe/Downloads/NEVO_Luxury_Dimensional_238_Icons',
    '/Users/vesahe/Downloads/NEVO_Master_116_Light_Theme_Text_Free_Hero_Banners',
    '/Users/vesahe/Downloads/NEVO_EOS_ALL_APPLICATION_ICONS',
    '/Users/vesahe/Downloads/NEVO_EOS_SEMANTIC_SVG_LIBRARY',
    '/Users/vesahe/Downloads/allb_brand_board_extracted',
    '/Users/vesahe/Downloads/allb-28-generated-assets-complete',
    '/Users/vesahe/Downloads/allb-28-cinematic-assets-final',
    '/Users/vesahe/Downloads/hemant-tlps-in-creative',
    '/Users/vesahe/Downloads/tlps_mobile_ui_html_assets',
    '/Users/vesahe/Downloads/MAATAA_UI_M2_0_4_1_CLOSEOUT',
]

def sha_file(path: Path, cache: dict) -> str:
    st = path.stat(follow_symlinks=False)
    key = (st.st_dev, st.st_ino, st.st_size, st.st_mtime_ns)
    if key in cache:
        return cache[key]
    h = hashlib.sha256()
    with path.open('rb') as f:
        for block in iter(lambda: f.read(1024 * 1024), b''):
            h.update(block)
    result = h.hexdigest()
    cache[key] = result
    return result

cache = {}
all_files: dict[str, dict[str, dict]] = {}
errors = []
start = time.monotonic()
for i, raw in enumerate(ROOTS, 1):
    root = Path(raw)
    if not root.is_dir():
        continue
    root_id = root.name
    records = {}
    for base, dirs, files in os.walk(root, followlinks=False):
        dirs[:] = sorted(d for d in dirs if d != '.git')
        for name in list(dirs):
            p = Path(base) / name
            if p.is_symlink():
                rel = p.relative_to(root).as_posix()
                try:
                    target = os.readlink(p)
                    digest = hashlib.sha256(('symlink\0' + target).encode()).hexdigest()
                    records[rel] = {'rel': rel, 'kind': 'symlink', 'size': len(target.encode()), 'sha256': digest, 'target': target}
                except (OSError, PermissionError) as exc:
                    errors.append((root_id, rel, repr(exc)))
                dirs.remove(name)
        for name in sorted(files):
            p = Path(base) / name
            rel = p.relative_to(root).as_posix()
            if name == '.DS_Store':
                continue
            try:
                if p.is_symlink():
                    target = os.readlink(p)
                    digest = hashlib.sha256(('symlink\0' + target).encode()).hexdigest()
                    rec = {'rel': rel, 'kind': 'symlink', 'size': len(target.encode()), 'sha256': digest, 'target': target}
                elif p.is_file():
                    size = p.stat().st_size
                    digest = sha_file(p, cache)
                    rec = {'rel': rel, 'kind': 'file', 'size': size, 'sha256': digest, 'target': ''}
                else:
                    continue
                records[rel] = rec
            except (OSError, PermissionError) as exc:
                errors.append((root_id, rel, repr(exc)))
    tree = hashlib.sha256()
    for rel, rec in sorted(records.items()):
        tree.update(f"{rec['kind']}\0{rel}\0{rec['size']}\0{rec['sha256']}\0{rec['target']}\n".encode())
    all_files[root_id] = {'root': str(root), 'files': records, 'tree_sha256': tree.hexdigest()}
    print(f'[{i}/{len(ROOTS)}] {root_id}: {len(records)} files, {sum(r["size"] for r in records.values()):,} bytes', flush=True)

# File-level inventory provides path and byte evidence for this comparison.
manifest_path = OUT / 'extracted-tree-file-manifest-2026-10-07.csv'
with manifest_path.open('w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['root_id', 'root_path', 'relative_path', 'kind', 'size_bytes', 'sha256', 'symlink_target', 'tree_sha256'])
    for root_id, data in sorted(all_files.items()):
        for rel, rec in sorted(data['files'].items()):
            w.writerow([root_id, data['root'], rel, rec['kind'], rec['size'], rec['sha256'], rec['target'], data['tree_sha256']])

# Exact duplicate file identities, then directory pair overlaps.
hash_roots = defaultdict(set)
for root_id, data in all_files.items():
    for rec in data['files'].values():
        hash_roots[rec['sha256']].add(root_id)
root_path = OUT / 'extracted-tree-root-manifest-2026-10-07.csv'
pair_path = OUT / 'extracted-tree-pair-comparison-2026-10-07.csv'
root_rows = []
pair_rows = []
ids = sorted(all_files)
for rid in ids:
    data = all_files[rid]
    root_rows.append([rid, data['root'], len(data['files']), sum(x['size'] for x in data['files'].values()), data['tree_sha256']])
for ai, a in enumerate(ids):
    fa = all_files[a]['files']
    for b in ids[ai+1:]:
        fb = all_files[b]['files']
        keys_a, keys_b = set(fa), set(fb)
        path_common = keys_a & keys_b
        exact_path = sum(fa[k]['sha256'] == fb[k]['sha256'] and fa[k]['kind'] == fb[k]['kind'] for k in path_common)
        content_a = {x['sha256'] for x in fa.values()}
        content_b = {x['sha256'] for x in fb.values()}
        content_common = len(content_a & content_b)
        if exact_path or content_common:
            ratio_small = exact_path / min(len(fa), len(fb)) if min(len(fa), len(fb)) else 0
            ratio_max = exact_path / max(len(fa), len(fb)) if max(len(fa), len(fb)) else 0
            pair_rows.append([a, b, len(fa), len(fb), exact_path, len(path_common), f'{ratio_small:.4f}', f'{ratio_max:.4f}', content_common, 'EXACT_TREE' if all_files[a]['tree_sha256'] == all_files[b]['tree_sha256'] else ('PATH_SUBSET' if exact_path == min(len(fa), len(fb)) and ratio_small == 1 else 'RELATED_OVERLAP')])
with root_path.open('w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['root_id', 'absolute_path', 'file_count', 'bytes', 'tree_sha256'])
    w.writerows(root_rows)
with pair_path.open('w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['root_a', 'root_b', 'files_a', 'files_b', 'same_relative_path_and_hash', 'shared_relative_paths', 'match_ratio_of_smaller_tree', 'match_ratio_of_larger_tree', 'shared_unique_content_hashes', 'classification'])
    w.writerows(pair_rows)

# Compact duplicate-content groups, useful for finding repeated assets independent of names.
dup_path = OUT / 'extracted-tree-shared-content-2026-10-07.csv'
with dup_path.open('w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['sha256', 'size_bytes', 'root_count', 'roots', 'relative_paths'])
    for digest, owners in sorted(hash_roots.items(), key=lambda x: (-len(x[1]), x[0])):
        if len(owners) < 2: continue
        refs = []
        sizes = set()
        for rid in sorted(owners):
            for rec in all_files[rid]['files'].values():
                if rec['sha256'] == digest:
                    sizes.add(rec['size']); refs.append(f"{rid}:{rec['rel']}")
        w.writerow([digest, max(sizes) if sizes else '', len(owners), ' | '.join(sorted(owners)), ' | '.join(refs)])

print(f'COMPLETE roots={len(all_files)} files={sum(len(x["files"]) for x in all_files.values())} errors={len(errors)} elapsed={time.monotonic()-start:.1f}s')
print(f'manifest={manifest_path}\nroots={root_path}\npairs={pair_path}\nshared={dup_path}')
if errors:
    with (OUT / 'extracted-tree-errors-2026-10-07.csv').open('w', newline='') as f:
        w=csv.writer(f); w.writerow(['root','relative_path','error']); w.writerows(errors)
