import { parseRegisterRecords, type RecordField, type RegisterRecord } from '@maataa/ui/compounds';
export const INVESTOR_HUB_STORE_KEY = 'tlps.investor-hub.v1';
export const INVESTOR_HUB_LIMITS = { billingEnabled: false, investmentCollectionEnabled: false, custodyEnabled: false, releaseEnabled: false } as const;
export type InvestorFlow = 'circles' | 'memberships' | 'interests' | 'escrows';
type FlowDefinition = { title: string; recordLabel: string; description: string; boundary: string; fields: readonly RecordField[]; statuses: readonly string[]; samples: readonly Record<string, string>[] };
export const INVESTOR_FLOWS: Record<InvestorFlow, FlowDefinition> = {
  circles: {
    title: 'Investor circles', recordLabel: 'Circle', description: 'Describe a private group, its purpose and membership rules.',
    boundary: 'A circle record does not verify investors, pool capital or establish an investment vehicle.',
    fields: [
      { key: 'circle', label: 'Circle name', kind: 'text', required: true },
      { key: 'purpose', label: 'Purpose', kind: 'text', required: true },
      { key: 'owner', label: 'Coordinator reference', kind: 'text' },
      { key: 'rules', label: 'Membership rules (draft)', kind: 'text' },
    ], statuses: ['Draft', 'Rules noted', 'Review requested (local)'],
    samples: [{ circle: 'Sample · Independent film circle', purpose: 'Discuss production proposals', owner: 'Sample coordinator', rules: 'Invitation and document review proposed' }],
  },
  memberships: {
    title: 'Membership subscriptions', recordLabel: 'Membership plan', description: 'Scope a platform-access fee and billing period separately from investment capital.',
    boundary: 'Plan notes do not create a recurring mandate, collect a fee or grant investor rights.',
    fields: [
      { key: 'plan', label: 'Plan name', kind: 'text', required: true },
      { key: 'circle', label: 'Circle reference', kind: 'text', required: true },
      { key: 'period', label: 'Billing period (proposed)', kind: 'select', options: ['Undecided', 'Monthly', 'Yearly'], required: true },
      { key: 'benefits', label: 'Platform benefits', kind: 'text', required: true },
    ], statuses: ['Draft', 'Benefits scoped', 'Billing setup needed'],
    samples: [{ plan: 'Sample · Circle member access', circle: 'Sample · Independent film circle', period: 'Undecided', benefits: 'Proposal reading and discussion access, subject to permissions' }],
  },
  interests: {
    title: 'Investment interests', recordLabel: 'Investment interest', description: 'Record non-binding capital interest in a named project, without collecting it.',
    boundary: 'This is a non-binding planning note. It creates no allocation, contract, security, return promise or payment obligation.',
    fields: [
      { key: 'project', label: 'Project reference', kind: 'text', required: true },
      { key: 'circle', label: 'Circle reference', kind: 'text', required: true },
      { key: 'party', label: 'Party reference', kind: 'text', required: true },
      { key: 'terms', label: 'Proposed terms / questions', kind: 'text' },
    ], statuses: ['Draft', 'Non-binding interest noted', 'Documents pending'],
    samples: [{ project: 'Sample · Independent feature', circle: 'Sample · Independent film circle', party: 'Sample participant', terms: 'Instrument, amount and conditions remain undecided' }],
  },
  escrows: {
    title: 'Escrow milestone reviews', recordLabel: 'Escrow review', description: 'Prepare custody-provider questions, release conditions, evidence and dispute handling.',
    boundary: 'No escrow account or held balance exists here. Local notes cannot deposit, freeze, release or refund funds.',
    fields: [
      { key: 'project', label: 'Project reference', kind: 'text', required: true },
      { key: 'milestone', label: 'Milestone', kind: 'text', required: true },
      { key: 'condition', label: 'Proposed release condition', kind: 'text', required: true },
      { key: 'evidence', label: 'Evidence reference', kind: 'text' },
      { key: 'reviewers', label: 'Proposed reviewers', kind: 'text' },
      { key: 'dispute', label: 'Dispute / refund terms (draft)', kind: 'text' },
    ], statuses: ['Draft', 'Conditions noted', 'Evidence noted', 'Provider review needed'],
    samples: [{ project: 'Sample · Independent feature', milestone: 'Sample · Pre-production handover', condition: 'Agreed documents reviewed by named parties', evidence: 'Sample checklist reference', reviewers: 'Sample producer and participant', dispute: 'Provider and signed terms required' }],
  },
};
export const INVESTOR_FLOW_IDS = Object.keys(INVESTOR_FLOWS) as InvestorFlow[];
export type InvestorHubStore = { schema: 'tlps.investor-hub/1'; flows: Record<InvestorFlow, RegisterRecord[]> };
export const emptyInvestorHub = (): InvestorHubStore => ({ schema: 'tlps.investor-hub/1', flows: { circles: [], memberships: [], interests: [], escrows: [] } });
export function parseInvestorHub(raw: string | null): InvestorHubStore {
  const result = emptyInvestorHub();
  try {
    const data = JSON.parse(raw || 'null');
    if (data?.schema !== result.schema || !data.flows || typeof data.flows !== 'object') return result;
    for (const id of INVESTOR_FLOW_IDS) result.flows[id] = parseRegisterRecords(data.flows[id], INVESTOR_FLOWS[id].fields, INVESTOR_FLOWS[id].statuses, 100) || [];
  } catch { /* Invalid or unavailable device data starts an empty local register. */ }
  return result;
}
export function investorHandover(store: InvestorHubStore) {
  return { ...parseInvestorHub(JSON.stringify(store)), capabilities: INVESTOR_HUB_LIMITS, kind: 'local-planning-handover', bindingCommitment: false, escrowBalance: null, priceMapping: null };
}
