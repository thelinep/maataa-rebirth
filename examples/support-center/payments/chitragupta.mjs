// Public capabilities only. Chain RPC, wallet signatures and asset custody are not configured.
export const CHITRAGUPTA_CAPABILITIES = Object.freeze({
  service: 'Chitragupta eWallet', version: '0.1.0', status: 'not_configured',
  custody: 'not_selected', networks: [], supportedAssets: [],
  requestedAssets: ['cryptocurrencies', 'Bitcoin', 'NFTs'], internalCurrency: 'Saptdhatu',
  balance: null, canConnect: false, canSign: false, canTransfer: false, canMint: false,
  requirements: ['Choose supported chains and asset identifiers.', 'Choose external wallet connection and custody model.', 'Configure RPC/indexer providers and ownership verification.', 'Define Saptdhatu denomination and conversion policy.'],
});
export const CHITRAGUPTA_GATED_ROUTES = new Set([
  'POST /api/chitragupta/connections', 'GET /api/chitragupta/assets',
  'GET /api/chitragupta/nfts', 'POST /api/chitragupta/transfers',
]);
