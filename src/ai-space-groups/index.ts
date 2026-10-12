export const AI_SPACE_GROUPS = [
  {
    "id": "S01_AI_CODING",
    "label": "AI Coding Spaces",
    "items": [
      "AI Code Studio",
      "AI Repository Workspace",
      "AI Coding Assistant",
      "AI Refactor Workspace",
      "AI Debug Workspace",
      "AI Test Workspace",
      "AI Review Workspace",
      "AI Architecture Workspace",
      "AI Documentation Workspace",
      "AI Migration Workspace",
      "AI Dependency Workspace",
      "AI Security Review Workspace",
      "AI Performance Workspace"
    ]
  },
  {
    "id": "S02_AI_CREATIVE",
    "label": "AI Creative Spaces",
    "items": [
      "AI Creative Studio",
      "AI Image Studio",
      "AI Video Studio",
      "AI Audio Studio",
      "AI Music Studio",
      "AI Story Studio",
      "AI Script Studio",
      "AI Storyboard Studio",
      "AI Moodboard Studio",
      "AI Brand Studio",
      "AI Campaign Studio",
      "AI Advertising Studio",
      "AI Presentation Studio",
      "AI Design Studio",
      "AI Motion Studio"
    ]
  },
  {
    "id": "S03_AI_BUSINESS",
    "label": "AI Business Spaces",
    "items": [
      "AI Business Studio",
      "AI Strategy Workspace",
      "AI Research Workspace",
      "AI Market Intelligence",
      "AI Sales Workspace",
      "AI CRM Workspace",
      "AI Marketing Workspace",
      "AI Customer Support Workspace",
      "AI Finance Workspace",
      "AI Investment Workspace",
      "AI Legal Workspace",
      "AI HR Workspace",
      "AI Operations Workspace",
      "AI Procurement Workspace"
    ]
  },
  {
    "id": "S04_MAATAA_AI",
    "label": "MAATAA AI Spaces",
    "items": [
      "MAATAA AI Home",
      "MAATAA AI Studio",
      "MAATAA Agent Studio",
      "MAATAA Prompt Studio",
      "MAATAA Model Studio",
      "MAATAA Knowledge Studio",
      "MAATAA RAG Studio",
      "MAATAA Evaluation Studio",
      "MAATAA Safety Studio",
      "MAATAA Tool Studio",
      "MAATAA Connector Studio",
      "MAATAA Workflow AI Studio",
      "MAATAA Context Studio",
      "MAATAA Memory Studio",
      "MAATAA Dataset Studio",
      "MAATAA Multimodal Studio",
      "MAATAA AI Observability",
      "MAATAA AI Governance",
      "MAATAA AI Evidence Studio",
      "MAATAA AI Playground",
      "MAATAA AI Command Center"
    ]
  },
  {
    "id": "S05_PRODUCT_AI",
    "label": "Specialized Product AI Spaces",
    "items": [
      "NEVO Event AI",
      "NEVO Vendor AI",
      "NEVO Booking AI",
      "NEVO Spatial AI",
      "NEVO Guest AI",
      "NEVO Sponsorship AI",
      "NEVO ROI AI",
      "Shree Finance AI",
      "Shree Accounting AI",
      "Shree Forecasting AI",
      "Shree Risk AI",
      "Shree Investor AI",
      "Siddham Semiconductor AI",
      "Siddham Architecture AI",
      "Siddham Edge AI Studio",
      "Siddham Developer AI",
      "Siddham Evidence AI"
    ]
  },
  {
    "id": "S06_RESEARCH_INTELLIGENCE",
    "label": "Research / Intelligence Spaces",
    "items": [
      "Research Workspace",
      "Deep Research Workspace",
      "Competitive Intelligence Workspace",
      "Market Intelligence Workspace",
      "Industry Intelligence Workspace",
      "Technology Intelligence Workspace",
      "Patent Intelligence Workspace",
      "Policy Intelligence Workspace",
      "Standards Intelligence Workspace",
      "News Intelligence Workspace",
      "Evidence Research Workspace",
      "Source Verification Workspace",
      "Fact-Checking Workspace"
    ]
  },
  {
    "id": "S07_AI_COMMAND_CENTER",
    "label": "AI Command-Center Spaces",
    "items": [
      "AI Command Center",
      "Agent Command Center",
      "Model Command Center",
      "Tool Command Center",
      "Knowledge Command Center",
      "Evaluation Command Center",
      "Safety Command Center",
      "AI Operations Center",
      "AI Control Room",
      "AI Mission Control",
      "AI Wallboard",
      "AI Incident Room"
    ]
  }
] as const;
export type AISpaceGroup = (typeof AI_SPACE_GROUPS)[number];
