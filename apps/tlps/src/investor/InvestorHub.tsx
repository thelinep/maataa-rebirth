import * as React from 'react';
import { Button } from '@maataa/ui/actions/Button';
import { RecordRegister, readStoredText, writeStoredValue, type RegisterRecord } from '@maataa/ui/compounds';
import { INVESTOR_FLOW_IDS, INVESTOR_FLOWS, INVESTOR_HUB_STORE_KEY, investorHandover, parseInvestorHub, type InvestorFlow } from './investorHubModel';
import './investor-hub.css';

export function InvestorHub({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? "h2" : "h1";
  const SectionHeading = embedded ? "h3" : "h2";
  const [flow, setFlow] = React.useState<InvestorFlow>('circles');
  const [store, setStore] = React.useState(() => parseInvestorHub(readStoredText(INVESTOR_HUB_STORE_KEY)));
  const [notice, setNotice] = React.useState('');
  const def = INVESTOR_FLOWS[flow];
  const save = (records: RegisterRecord[]) => {
    const next = { ...store, flows: { ...store.flows, [flow]: records } };
    setStore(next);
    setNotice(writeStoredValue(INVESTOR_HUB_STORE_KEY, next) ? 'Saved on this device.' : 'Device storage unavailable. Keep this page open and export the handover.');
  };
  function download() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(investorHandover(store), null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = 'tlps-investor-hub-handover.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000); setNotice('Local planning handover exported. No instructions were sent to a payment provider.');
  }
  return <section className="tlps-investor-hub">
    <header><Heading>Investor Hub</Heading><p>Organise circles, scope membership fees, note investment interests and prepare escrow reviews in separate registers.</p><p>Browser-local planning. Membership payments, investment collection and fund custody are not connected.</p></header>
    <nav aria-label="Investor Hub registers">{INVESTOR_FLOW_IDS.map((id) => <Button key={id} variant={flow === id ? 'primary' : 'secondary'} aria-pressed={flow === id} onClick={() => { setFlow(id); setNotice(''); }}>{INVESTOR_FLOWS[id].title}</Button>)}</nav>
    <section className="tlps-investor-register" aria-labelledby="investor-register-title"><SectionHeading id="investor-register-title">{def.title}</SectionHeading><p>{def.description}</p><p>{def.boundary}</p>
      <RecordRegister key={flow} recordLabel={def.recordLabel} fields={def.fields} statuses={def.statuses} samples={def.samples} records={store.flows[flow]} onRecordsChange={save} maxRecords={100} createId={() => `${flow}-${crypto.randomUUID()}`} />
    </section>
    <section className="tlps-investor-handover"><SectionHeading>Review and hand over</SectionHeading><p>References and review statuses are local notes. They do not verify identities, enforce access, grant membership or authorise release of funds. No prices or currency conversion are assigned.</p><Button variant="secondary" onClick={download}>Export Investor Hub handover</Button><p role="status">{notice}</p></section>
  </section>;
}
