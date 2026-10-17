"""Extract a read-only, review-needed internal catalogue snapshot. No legacy code runs."""
import csv, json, hashlib, pathlib, sys
source = pathlib.Path(sys.argv[1])
rows = list(csv.DictReader(source.open(encoding='utf-8-sig')))
items=[]
for row in rows:
    label=(row['label'] or row['name']).strip()
    if not label: continue
    category=row['category'].strip()
    # Only explicit source taxonomy is mapped. Pricing is not a service definition.
    group={'designation':'Designations','features':'Features'}.get(category,'Other labels')
    items.append(dict(id=row['id'],label=label,group=group,category=category,type=row['type'].strip(),icon=row['icon'].strip() or None,image=row['image'].strip() or None,description=row['description'].strip() or None))
out={'source':'label_rows.csv','sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'status':'Unreviewed internal intake snapshot','sourceRows':len(rows),'items':items}
path=pathlib.Path('apps/tlps/src/selectors/shabdkosh.snapshot.json')
path.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(f'{len(items)} labels extracted; no image binaries found or imported')
