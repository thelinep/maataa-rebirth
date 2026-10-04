export const UI_ACTIONS = ["create","open","view","edit","save","save-draft","submit","approve","reject","archive","restore","delete","duplicate","compare","filter","sort","search","refresh","retry","export","import","print","share","download","upload","next","previous","cancel","close"] as const;
export type UIAction = (typeof UI_ACTIONS)[number];
