#!/usr/bin/env python3
"""Read-only source audit; all SQL executes in disposable in-memory SQLite."""
import argparse,json,sqlite3
p=argparse.ArgumentParser();p.add_argument('snapshot');p.add_argument('--output');a=p.parse_args();x=json.load(open(a.snapshot));c=sqlite3.connect(':memory:');c.execute('PRAGMA foreign_keys=ON');tables=[t for g in x['groups'] for t in g['tables']]
for t in tables:c.execute(t['create_sql'])
for v in x['indexes']+x['triggers']:c.execute(v['sql'])
def add(table,**values):
 keys=list(values);c.execute(f'INSERT INTO {table} ({",".join(keys)}) VALUES ({",".join("?" for _ in keys)})',[values[k] for k in keys])
t='2026-10-17T00:00:00Z';add('accounts',id='a',email='synthetic@example.invalid',created_at=t,updated_at=t)
add('workspaces',id='w',owner_account_id='a',name='Synthetic workspace',workspace_type='studio',created_at=t,updated_at=t)
for id in ['p1','p2']:add('projects',id=id,workspace_id='w',created_by_account_id='a',title=id,project_kind='film',created_at=t,updated_at=t)
for id,pid in [('f1','p1'),('f2','p2')]:
 add('files',id=id,workspace_id='w',project_id=pid,file_name='Synthetic.txt',mime_type='text/plain',byte_size=0,storage_key=id,created_at=t,updated_at=t)
 add('file_versions',id='v'+id,file_id=id,version_number=1,storage_key='v'+id,byte_size=0,created_at=t)
add('deal_rooms',id='room1',project_id='p1',room_type='investment',title='Synthetic room',created_at=t,updated_at=t)
results=[]
def probe(name,fn):
 c.execute('SAVEPOINT probe')
 try:fn();results.append({'case':name,'result':'ACCEPTED'})
 except sqlite3.IntegrityError as e:results.append({'case':name,'result':'REJECTED','reason':str(e)})
 finally:c.execute('ROLLBACK TO probe');c.execute('RELEASE probe')
probe('OS mismatching project kind',lambda:add('project_os_settings',id='os',project_id='p1',os_type='wedding',created_at=t,updated_at=t))
probe('Membership without canonical role',lambda:add('project_members',id='m',project_id='p1',account_id='a',role_key='owner',created_at=t))
probe('Approval referencing missing version',lambda:add('approvals',id='approval',project_id='p1',resource_type='file',resource_id='f1',status='approved',requested_at=t,version_type='file',version_id='missing'))
probe('Approval referencing other-project file version',lambda:add('approvals',id='approval',project_id='p1',resource_type='file',resource_id='f1',status='approved',requested_at=t,version_type='file',version_id='vf2'))
probe('Deal-room document referencing other-project file',lambda:add('deal_room_documents',id='doc',deal_room_id='room1',file_id='f2',file_version_id='vf2',document_category='pitch',created_at=t))
probe('Evidence points at other-project file',lambda:add('evidence_items',id='ev',project_id='p1',file_id='f2',evidence_type='document',created_at=t))
add('evidence_items',id='ev1',project_id='p1',file_id='f1',evidence_type='document',created_at=t)
probe('Evidence link project differs from evidence',lambda:add('evidence_links',evidence_id='ev1',project_id='p2',resource_type='file',resource_id='f2',created_at=t))
probe('Immutable file version UPDATE',lambda:c.execute("UPDATE file_versions SET storage_key='changed' WHERE id='vf1'"))
probe('Immutable file version DELETE when unpinned',lambda:c.execute("DELETE FROM file_versions WHERE id='vf1'"))
add('approvals',id='pinned',project_id='p1',resource_type='file',resource_id='f1',status='approved',requested_at=t,version_type='file',version_id='vf1')
probe('Approved version DELETE leaves dangling approval',lambda:c.execute("DELETE FROM file_versions WHERE id='vf1'"))
probe('Approved decision rewritten to pending',lambda:c.execute("UPDATE approvals SET status='pending',decision_note='rewritten' WHERE id='pinned'"))
add('audit_log',id='audit',action_key='created',resource_type='project',resource_id='p1',occurred_at=t)
probe('Audit UPDATE',lambda:c.execute("UPDATE audit_log SET action_key='changed' WHERE id='audit'"))
probe('Audit DELETE',lambda:c.execute("DELETE FROM audit_log WHERE id='audit'"))
def duplicates():
 for id in ['payment1','payment2']:add('external_payment_records',id=id,amount_minor=1,external_reference='same',status='reported',reported_at=t)
probe('Duplicate payment reference with NULL provider',duplicates)
# Count individual FK child columns and leading-index coverage under the audit's stated heuristic.
missing=[];total=0
for table in tables:
 name=table['name'];leading={r[2] for idx in c.execute(f'PRAGMA index_list("{name}")').fetchall() for r in c.execute(f'PRAGMA index_info("{idx[1]}")').fetchall() if r[0]==0}
 pk=[r[1] for r in c.execute(f'PRAGMA table_info("{name}")') if r[5]>0]
 if len(pk)==1:leading.add(pk[0])
 for fk in c.execute(f'PRAGMA foreign_key_list("{name}")'):
  total+=1
  if fk[3] not in leading:missing.append(name+'.'+fk[3])
report={'scope':'disposable synthetic SQLite; source and actual project database unchanged','tableCount':len(tables),'explicitIndexes':len(x['indexes']),'triggers':len(x['triggers']),'foreignKeyCheck':c.execute('pragma foreign_key_check').fetchall(),'foreignKeyChildColumns':total,'withoutLeadingIndex':len(missing),'unindexedColumns':missing,'tests':results,'seedCountsDeclared':x.get('seed_row_counts'),'seedRowsActuallyInstalled':{n:c.execute(f'SELECT COUNT(*) FROM {n}').fetchone()[0] for n in x.get('seed_row_counts',{})}}
text=json.dumps(report,indent=2);print(text)
if a.output:open(a.output,'w').write(text+'\n')
