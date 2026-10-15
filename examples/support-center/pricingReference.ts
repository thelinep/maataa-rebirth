// Viewing reference only; never imported by the order service or used for checkout.
export const PRICING_REFERENCE = {
  sourceCurrency: 'USD', targetCurrency: 'INR', rate: '95.0317', rateDate: '2026-10-14',
  source: 'https://www.msei.in/markets/currency/historical-data/rbireferenceratearchives',
  interpretation: 'USD assumed from $; awaiting merchant confirmation.',
  note: 'Indicative comparison only. Excludes fees and taxes; not a settlement quote or approved product price.',
  tiers: [90, 900, 9900, 49900, 499900, 4999900, 49999900, 499999900].map((usdCents, index) => ({
    id: `tier-${index + 1}`, usdCents,
    // Integer arithmetic with enough headroom for every supplied tier; round half up to paise.
    inrPaise: Math.floor((usdCents * 950317 + 5000) / 10000),
  })),
};
