import * as React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { InvestorHub } from '../apps/tlps/src/investor/InvestorHub';
import { INVESTOR_FLOWS, INVESTOR_HUB_STORE_KEY, emptyInvestorHub, investorHandover, parseInvestorHub } from '../apps/tlps/src/investor/investorHubModel';

afterEach(() => { cleanup(); localStorage.clear(); });
describe('Investor Hub separated local flows', () => {
  it('keeps membership, capital interests and custody unavailable in exports regardless of injected flags', () => {
    const store = emptyInvestorHub();
    const output = investorHandover(Object.assign(store, { capabilities: { releaseEnabled: true }, escrowBalance: 10000 }));
    expect(output.capabilities).toEqual({ billingEnabled: false, investmentCollectionEnabled: false, custodyEnabled: false, releaseEnabled: false });
    expect(output.escrowBalance).toBeNull(); expect(output.bindingCommitment).toBe(false);
    expect(output.priceMapping).toBeNull();
  });
  it('rejects forged funding/release statuses and malformed local storage', () => {
    const store = emptyInvestorHub();
    store.flows.escrows.push({ id: 'escrow1', status: 'Funds released', values: { project: 'A', milestone: 'B', condition: 'C' } });
    expect(parseInvestorHub(JSON.stringify(store)).flows.escrows).toEqual([]);
    expect(parseInvestorHub('{invalid')).toEqual(emptyInvestorHub());
    expect(INVESTOR_FLOWS.memberships.statuses).not.toContain('Active');
    expect(INVESTOR_FLOWS.interests.statuses).not.toContain('Funded');
  });
  it('saves sample records separately across flows and restores them after remount', () => {
    const view = render(<InvestorHub />);
    fireEvent.click(screen.getByRole('button', { name: 'Add sample records' }));
    expect(screen.getByText('Sample · Independent film circle')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Membership subscriptions' }));
    expect(screen.queryByText('Sample · Circle member access')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Add sample records' }));
    fireEvent.click(screen.getByRole('button', { name: 'Investment interests' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add sample records' }));
    fireEvent.click(screen.getByRole('button', { name: 'Escrow milestone reviews' }));
    expect(screen.queryByText('Sample · Pre-production handover')).toBeNull();
    const saved = parseInvestorHub(localStorage.getItem(INVESTOR_HUB_STORE_KEY));
    expect(saved.flows.circles).toHaveLength(1); expect(saved.flows.memberships).toHaveLength(1);
    expect(saved.flows.interests).toHaveLength(1); expect(saved.flows.escrows).toHaveLength(0);
    view.unmount(); render(<InvestorHub />);
    expect(screen.getByText('Sample · Independent film circle')).toBeTruthy();
  });
});
