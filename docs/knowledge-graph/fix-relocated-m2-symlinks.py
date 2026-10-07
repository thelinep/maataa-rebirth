#!/usr/bin/env python3
"""Rebase absolute workspace links after moving the M2.4.1 snapshot."""
from pathlib import Path
import argparse, os
OLD = Path('/Users/vesahe/Downloads/MAATAA_UI_M2_0_4_1_CLOSEOUT')
NEW = Path('/Users/vesahe/Documents/all/MAATAA_UI/snapshots/MAATAA_UI_M2_0_4_1_CLOSEOUT')
PREFIX = str(OLD) + '/'

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--apply',action='store_true'); a=ap.parse_args()
    if not NEW.is_dir(): raise SystemExit(f'STOP: relocated snapshot missing: {NEW}')
    if OLD.exists(): raise SystemExit(f'STOP: old snapshot path reappeared: {OLD}')
    repairs=[]
    for p in NEW.rglob('*'):
        if p.is_symlink() and str(p.readlink()).startswith(PREFIX):
            old_target=str(p.readlink())
            new_target=Path(str(NEW) + '/' + old_target[len(PREFIX):])
            if not new_target.exists(): raise SystemExit(f'STOP: new link target missing: {new_target}')
            repairs.append((p,old_target,str(new_target)))
    if len(repairs)!=15: raise SystemExit(f'STOP: expected 15 moved-workspace links, found {len(repairs)}')
    if not a.apply:
        for p,old,new in repairs: print(f'{p}: {old} -> {new}')
        print('PREFLIGHT PASS: 15 targets resolve; no changes made.')
        return
    done=[]
    try:
        for p,old,new in repairs:
            p.unlink(); p.symlink_to(new); done.append((p,old))
    except Exception:
        for p,old in reversed(done):
            try:p.unlink();p.symlink_to(old)
            except OSError:pass
        raise
    print(f'REPAIRED {len(done)} absolute M2 workspace links under {NEW}')

if __name__=='__main__': main()
