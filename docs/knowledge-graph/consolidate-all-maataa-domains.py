#!/usr/bin/env python3
"""Organize the audited project collection under Documents/all without overlaying codebases."""
from __future__ import annotations
import argparse, json, os, shutil
from pathlib import Path

BASE = Path('/Users/vesahe/Documents/all')
MAATAA = BASE / 'MAATAA_UI'

# (source absolute path, destination relative to Documents/all)
MOVES = [
    ('/Users/vesahe/Documents/all/MAATAA_UI_M2_0_4_1_CLOSEOUT', 'MAATAA_UI/snapshots/MAATAA_UI_M2_0_4_1_CLOSEOUT'),
    ('/Users/vesahe/Downloads/MAATAA_UI', 'MAATAA_UI/snapshots/MAATAA_UI_MUI_00_37_SCAFFOLD'),
    ('/Users/vesahe/Downloads/MAATAA_UI_INDEPENDENT_PRODUCT_SCAFFOLD', 'MAATAA_UI/snapshots/MAATAA_UI_INDEPENDENT_PRODUCT_SCAFFOLD'),
    ('/Users/vesahe/Downloads/MAATAA_UI_M2_0_4_0_BROWSER_REACT_CERTIFICATION', 'MAATAA_UI/snapshots/MAATAA_UI_M2_0_4_0_BROWSER_REACT_CERTIFICATION'),
    ('/Users/vesahe/Documents/MAATAA_UI_M4_0_5_0_RC3_MOCK_HARNESS_HARDENING', 'MAATAA_UI/snapshots/MAATAA_UI_M4_0_5_0_RC3_MOCK_HARNESS_HARDENING'),
    ('/Users/vesahe/Downloads/MAATAA_UI_M4_0_5_0_RC3_MOCK_HARNESS_HARDENING', 'MAATAA_UI/exact-copies/MAATAA_UI_M4_0_5_0_RC3_MOCK_HARNESS_HARDENING-downloads-copy'),
    ('/Users/vesahe/Downloads/MAATAA_UI_V3_1_FOUNDATION_CERTIFICATION_SCAFFOLD', 'MAATAA_UI/snapshots/MAATAA_UI_V3_1_FOUNDATION_CERTIFICATION_SCAFFOLD'),
    ('/Users/vesahe/Downloads/Maataa_UI_Full_Reference_Package_2026', 'MAATAA_UI/snapshots/Maataa_UI_Full_Reference_Package_2026'),
    ('/Users/vesahe/Downloads/maataa_m2_7_organisation_approval_bundle', 'MAATAA_UI/governance/maataa_m2_7_organisation_approval_bundle'),
    ('/Users/vesahe/Downloads/Projects/MAATAA', 'MAATAA_UI/legacy/Projects_MAATAA'),

    ('/Users/vesahe/Documents/all/NEVO_EOS_ALL_APPLICATION_ICONS', 'domains/nevo/assets/NEVO_EOS_ALL_APPLICATION_ICONS'),
    ('/Users/vesahe/Documents/all/NEVO_EOS_ICONS_LIGHT_DARK', 'domains/nevo/assets/NEVO_EOS_ICONS_LIGHT_DARK'),
    ('/Users/vesahe/Documents/all/NEVO_EOS_SEMANTIC_SVG_LIBRARY', 'domains/nevo/assets/NEVO_EOS_SEMANTIC_SVG_LIBRARY'),
    ('/Users/vesahe/Documents/all/NEVO_EVENTS_ICON_FULL_PLATFORM_SET', 'domains/nevo/assets/NEVO_EVENTS_ICON_FULL_PLATFORM_SET'),
    ('/Users/vesahe/Documents/all/NEVO_Luxury_Dimensional_238_Icons', 'domains/nevo/assets/NEVO_Luxury_Dimensional_238_Icons'),
    ('/Users/vesahe/Documents/all/NEVO_Master_116_Light_Theme_Text_Free_Hero_Banners', 'domains/nevo/assets/NEVO_Master_116_Light_Theme_Text_Free_Hero_Banners'),
    ('/Users/vesahe/Documents/all/nevo-event-os 3', 'domains/nevo/project-snapshots/nevo-event-os 3'),
    ('/Users/vesahe/Documents/all/nevoevents-in-release-prep-pack', 'domains/nevo/project-snapshots/nevoevents-in-release-prep-pack'),
    ('/Users/vesahe/Documents/all/tps-v2-p0-p7', 'domains/nevo/tps-v2/tps-v2-p0-p7'),
    ('/Users/vesahe/Documents/all/tps-v2-p0-p7-complete', 'domains/nevo/tps-v2/tps-v2-p0-p7-complete'),
    ('/Users/vesahe/Documents/all/tps-v2-p0-p7-complete 2', 'domains/nevo/tps-v2/tps-v2-p0-p7-complete 2'),
    ('/Users/vesahe/Documents/all/tps-v2-p10-production-command-center-final', 'domains/nevo/tps-v2/tps-v2-p10-production-command-center-final'),
    ('/Users/vesahe/Documents/all/tps-v2-p2-event-intelligence', 'domains/nevo/tps-v2/tps-v2-p2-event-intelligence'),
    ('/Users/vesahe/Documents/all/tps-v2-p3-production-scene-composer', 'domains/nevo/tps-v2/tps-v2-p3-production-scene-composer'),
    ('/Users/vesahe/Documents/all/tps-v2-p5-event-marketplace', 'domains/nevo/tps-v2/tps-v2-p5-event-marketplace'),
    ('/Users/vesahe/Documents/all/tps-v2-p5-real-components', 'domains/nevo/tps-v2/tps-v2-p5-real-components'),
    ('/Users/vesahe/Documents/all/tps-v2-p5-real-components 2', 'domains/nevo/tps-v2/tps-v2-p5-real-components 2'),
    ('/Users/vesahe/Documents/all/tps-v2-p6-pricing-final', 'domains/nevo/tps-v2/tps-v2-p6-pricing-final'),
    ('/Users/vesahe/Documents/all/tps-v2-p7-booking-contracting-final', 'domains/nevo/tps-v2/tps-v2-p7-booking-contracting-final'),

    ('/Users/vesahe/Documents/all/ferty9_tlps_route_with_BTL_coverage', 'domains/tlps/route-revisions/ferty9_tlps_route_with_BTL_coverage'),
    ('/Users/vesahe/Documents/all/ferty9_tlps_route_with_BTL_coverage (1)', 'domains/tlps/route-revisions/ferty9_tlps_route_with_BTL_coverage (1)'),
    ('/Users/vesahe/Documents/all/hemant-tlps-in-creative', 'domains/tlps/assets/hemant-tlps-in-creative'),
    ('/Users/vesahe/Documents/all/tlps', 'domains/tlps/reference/tlps'),
    ('/Users/vesahe/Documents/all/tlps_in_release_code_ready', 'domains/tlps/apps/tlps_in_release_code_ready'),
    ('/Users/vesahe/Documents/all/tlps_launch_scaffold', 'domains/tlps/apps/tlps_launch_scaffold'),
    ('/Users/vesahe/Documents/all/tlps_mobile_ui_html_assets', 'domains/tlps/assets/tlps_mobile_ui_html_assets'),

    ('/Users/vesahe/Documents/all/mom_release_bundle', 'domains/mom/release-bundles/mom_release_bundle'),
    ('/Users/vesahe/Documents/all/mom_release_bundle 2', 'domains/mom/release-bundles/mom_release_bundle 2'),

    ('/Users/vesahe/Documents/all/allb-28-cinematic-assets-final', 'domains/allb/brand-assets/allb-28-cinematic-assets-final'),
    ('/Users/vesahe/Documents/all/allb-28-generated-assets-complete', 'domains/allb/brand-assets/allb-28-generated-assets-complete'),
    ('/Users/vesahe/Documents/all/allb_brand_board_extracted', 'domains/allb/brand-assets/allb_brand_board_extracted'),
]

LINKS = {
    'MAATAA_UI/current': '/Users/vesahe/Downloads/maataa-ui-full-alpha7',
    'MAATAA_UI/domains/nevo': '../../domains/nevo',
    'MAATAA_UI/domains/tlps': '../../domains/tlps',
    'MAATAA_UI/domains/mom': '../../domains/mom',
    'MAATAA_UI/domains/allb': '../../domains/allb',
    'MAATAA_UI/references/maataa-ui-v3-fused-organism': '/Users/vesahe/Documents/GitHub/maataa-ui/fused-organism',
    'MAATAA_UI/references/maataa-ui-lib': '/Users/vesahe/Documents/Repos/maataa-ui-lib',
    'MAATAA_UI/references/maataa-electron-repo': '/Users/vesahe/Documents/Repos/maataa-ui',
    'MAATAA_UI/references/maataa-os': '/Users/vesahe/revenue/live/maataa-os',
    'MAATAA_UI/references/maataa-desktop': '/Users/vesahe/Documents/Repos/maataa-desktop',
    'MAATAA_UI/references/maataa-hybrid-runtime': '/Users/vesahe/Documents/Repos/maataa-hybrid-runtime',
    'MAATAA_UI/references/nevo-vendored-maataa-ui': '/Users/vesahe/Documents/Repos/nevo-event-os-3/packages/maataa-ui',
    'domains/nevo/source-repos/nevo-event-os-3': '/Users/vesahe/Documents/Repos/nevo-event-os-3',
    'domains/nevo/source-repos/nevo-events-archive': '/Users/vesahe/Documents/Repos/nevo-events',
    'domains/tlps/source-repos/tlpbtl-project': '/Users/vesahe/Documents/Repos/tlpbtl/projects/tlps-bkt-location-kbm',
    'domains/mom/source-repo': '/Users/vesahe/revenue/live/mom',
    'domains/allb/source-repo': '/Users/vesahe/revenue/live/allb',
}

README = '''# MAATAA UI and connected domain sources\n\n## Canonical package\n\n`current` links to the active MAATAA UI checkout at `/Users/vesahe/Downloads/maataa-ui-full-alpha7` (`@maataa/ui` 1.0.0-alpha.8.4, observed HEAD `eef053ff`). That checkout had 153 changed paths when cataloged; keep its working tree intact and recheck before treating it as a release source. No historical package was overlaid onto it.\n\nVersioned and planning trees are under `snapshots/`; M2.7 approved contracts are in `governance/`; exact duplicate copies are retained under `exact-copies/`. Independent repositories and vendored packages remain reachable under `references/`.\n\n## Connected domains\n\n`domains/` contains links into the organized sibling `/Users/vesahe/Documents/all/domains/` tree. NEVO includes the TPS-V2 production workflow snapshots; TLPS includes route, app, creative and mobile material; MOM includes release bundles; ALLB includes brand assets. `ecosystem.json` records the source paths and the integration boundary for each domain.\n\nThis is a filesystem and source registry connection. It does not claim that every domain app has migrated to the canonical `@maataa/ui` package. The TLPS application in the 0.4.1 M2 snapshot consumes that snapshot's own `@maataa/ui` workspace; NEVO has a separate vendored UI package. Both need consumer-level compatibility checks before changing package dependencies.\n'''

ECOSYSTEM = {
  'schemaVersion': 1,
  'canonicalPackage': {
    'name': '@maataa/ui', 'versionAtCatalog': '1.0.0-alpha.8.4',
    'path': 'current', 'resolvedPath': '/Users/vesahe/Downloads/maataa-ui-full-alpha7',
    'gitHeadAtCatalog': 'eef053ff', 'workingTreeAtCatalog': 'dirty: 153 changed paths',
    'status': 'canonical working checkout; release status must be requalified'
  },
  'historyPolicy': 'Keep earlier incompatible generations as separately named snapshots; do not overlay files or combine Git histories.',
  'domains': [
    {'id':'nevo','path':'domains/nevo','sourceRepositories':['source-repos/nevo-event-os-3','source-repos/nevo-events-archive'],'assets':'assets/','workflowSnapshots':'tps-v2/','integrationStatus':'registered; NEVO repo contains vendored @maataa/ui 0.1.0; migration and consumer tests pending'},
    {'id':'tlps','path':'domains/tlps','sourceRepositories':['source-repos/tlpbtl-project'],'applications':'apps/','integrationStatus':'registered; M2 0.4.1 TLPS app uses its own workspace @maataa/ui; canonical-package migration pending'},
    {'id':'mom','path':'domains/mom','sourceRepositories':['source-repo'],'integrationStatus':'registered source reference and release bundles; canonical-package consumer not verified'},
    {'id':'allb','path':'domains/allb','sourceRepositories':['source-repo'],'integrationStatus':'registered brand/creative assets; app consumer not verified'}
  ],
  'snapshots': [
    {'path':'snapshots/MAATAA_UI_M2_0_4_1_CLOSEOUT','version':'0.4.1','role':'M2 closeout + historical fused-organism consumer'},
    {'path':'snapshots/MAATAA_UI_M2_0_4_0_BROWSER_REACT_CERTIFICATION','version':'0.4.0','role':'M2 certification snapshot'},
    {'path':'snapshots/MAATAA_UI_V3_1_FOUNDATION_CERTIFICATION_SCAFFOLD','version':'0.3.1','role':'V3 foundation snapshot'},
    {'path':'snapshots/MAATAA_UI_M4_0_5_0_RC3_MOCK_HARNESS_HARDENING','version':'0.5.0-rc.3','role':'M4 RC snapshot; exact duplicate retained separately'}
  ]
}

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--apply',action='store_true'); args=ap.parse_args()
    if not BASE.is_dir(): raise SystemExit(f'STOP: base folder missing: {BASE}')
    # Require every source, destination and symlink target to be unambiguous before mutation.
    moves=[]
    for raw,dest_rel in MOVES:
        src=Path(raw); dst=BASE/dest_rel
        if not src.exists(): raise SystemExit(f'STOP: source missing: {src}')
        if not src.is_dir(): raise SystemExit(f'STOP: source is not a directory: {src}')
        if dst.exists() or dst.is_symlink(): raise SystemExit(f'STOP: destination exists: {dst}')
        moves.append((src,dst))
    for rel,target_raw in LINKS.items():
        link=BASE/rel; target=Path(target_raw)
        if link.exists() or link.is_symlink(): raise SystemExit(f'STOP: link path exists: {link}')
        resolved = target if target.is_absolute() else (link.parent / target).resolve()
        if target.is_absolute() and not resolved.exists():
            raise SystemExit(f'STOP: link target missing: {resolved}')
        if not target.is_absolute() and not any(dst == resolved or resolved in dst.parents for _,dst in moves):
            raise SystemExit(f'STOP: relative link target is not part of the planned collection: {resolved}')
    if not args.apply:
        print(f'PREFLIGHT PASS: {len(moves)} folder moves and {len(LINKS)} links')
        for src,dst in moves: print(f'MOVE {src} -> {dst}')
        for rel,target in LINKS.items(): print(f'LINK {BASE/rel} -> {target}')
        print('No changes made. Run with --apply to perform the authorized consolidation.')
        return
    created_dirs=[]; moved=[]; created_links=[]; created_files=[]
    try:
        for _,dst in moves:
            missing=[]; p=dst.parent
            while not p.exists(): missing.append(p); p=p.parent
            for d in reversed(missing): d.mkdir(); created_dirs.append(d)
        for src,dst in moves:
            os.rename(src,dst); moved.append((dst,src))
        for rel,target in LINKS.items():
            link=BASE/rel
            link.parent.mkdir(parents=True,exist_ok=True)
            link.symlink_to(target)
            created_links.append(link)
        readme=MAATAA/'README.md'; readme.write_text(README); created_files.append(readme)
        ecosystem=MAATAA/'ecosystem.json'; ecosystem.write_text(json.dumps(ECOSYSTEM,indent=2)+'\n'); created_files.append(ecosystem)
    except Exception:
        for p in reversed(created_files):
            try:p.unlink()
            except OSError:pass
        for p in reversed(created_links):
            try:p.unlink()
            except OSError:pass
        for dst,src in reversed(moved):
            try:
                src.parent.mkdir(parents=True,exist_ok=True); os.rename(dst,src)
            except OSError:pass
        for d in reversed(created_dirs):
            try:d.rmdir()
            except OSError:pass
        raise
    print(f'CONSOLIDATED {len(moved)} folders; created {len(created_links)} symbolic connections.')
    print(f'Hub: {MAATAA}; domain roots: {BASE/"domains"}; catalog: {MAATAA/"ecosystem.json"}')

if __name__=='__main__': main()
