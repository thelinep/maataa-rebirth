export const UI_PATTERNS = ["crud","master-detail","list-detail-inspector","wizard","review-approval","search-filter-results","dashboard","command-center","studio","builder","inbox","timeline","calendar","kanban","data-explorer","settings","onboarding","checkout"] as const;
export type UIPattern = (typeof UI_PATTERNS)[number];
