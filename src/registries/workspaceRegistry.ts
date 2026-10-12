/** Workspace archetype component that renders a workspace type. Every WORKSPACE_TYPES record names exactly one. */
export const WORKSPACE_ARCHETYPES = ["AIWorkspace","APIStudioWorkspace","AdminWorkspace","AnalyticsWorkspace","BookingWorkspace","BuilderWorkspace","CRMWorkspace","CommandCenterWorkspace","CommerceWorkspace","CommunicationWorkspace","CommunityWorkspace","ControlPlaneWorkspace","CreativeStudioWorkspace","DataWorkspace","DatabaseWorkspace","DesignSystemWorkspace","DeveloperWorkspace","DocumentWorkspace","EducationWorkspace","EventWorkspace","FinanceWorkspace","GovernanceWorkspace","InfrastructureWorkspace","InvestmentWorkspace","MarketingWorkspace","MarketplaceWorkspace","MediaStudioWorkspace","ObservabilityWorkspace","OrganisationWorkspace","PersonalWorkspace","PresentationWorkspace","ProductionWorkspace","ProductivityWorkspace","ProjectWorkspace","SecurityWorkspace","SpatialStudioWorkspace","SupportWorkspace","TeamWorkspace","TestingWorkspace"] as const;
export type WorkspaceArchetype = (typeof WORKSPACE_ARCHETYPES)[number];
/** `aliasOf` marks a second ID for the same concept; both IDs stay valid and resolve to the canonical record's archetype. */
export type WorkspaceTypeRecord = Readonly<{ ordinal: number; id: string; name: string; groupId: string; groupKey: string; groupLabel: string; archetype: WorkspaceArchetype; aliasOf?: string }>;

export const WORKSPACE_TYPES = [
  {
    ordinal: 1,
    id: "WORKSPACE.PERSONAL_HOME.PERSONAL",
    name: "Personal Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 2,
    id: "WORKSPACE.PERSONAL_HOME.MY_WORK",
    name: "My Work Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 3,
    id: "WORKSPACE.PERSONAL_HOME.HOME",
    name: "Home Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 4,
    id: "WORKSPACE.PERSONAL_HOME.TODAY",
    name: "Today Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 5,
    id: "WORKSPACE.PERSONAL_HOME.MY_TASKS",
    name: "My Tasks Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 6,
    id: "WORKSPACE.PERSONAL_HOME.MY_CALENDAR",
    name: "My Calendar Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 7,
    id: "WORKSPACE.PERSONAL_HOME.MY_NOTES",
    name: "My Notes Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 8,
    id: "WORKSPACE.PERSONAL_HOME.MY_FILES",
    name: "My Files Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 9,
    id: "WORKSPACE.PERSONAL_HOME.MY_ACTIVITY",
    name: "My Activity Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 10,
    id: "WORKSPACE.PERSONAL_HOME.MY_NOTIFICATIONS",
    name: "My Notifications Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 11,
    id: "WORKSPACE.PERSONAL_HOME.MY_APPROVALS",
    name: "My Approvals Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 12,
    id: "WORKSPACE.PERSONAL_HOME.MY_DRAFTS",
    name: "My Drafts Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 13,
    id: "WORKSPACE.PERSONAL_HOME.FAVORITES",
    name: "Favorites Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 14,
    id: "WORKSPACE.PERSONAL_HOME.RECENT",
    name: "Recent Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 15,
    id: "WORKSPACE.PERSONAL_HOME.SAVED",
    name: "Saved Workspace",
    groupId: "W01",
    groupKey: "PERSONAL_HOME",
    groupLabel: "Personal & Home Workspaces",
    archetype: "PersonalWorkspace"
  },
  {
    ordinal: 16,
    id: "WORKSPACE.ORGANISATION.ORGANISATION",
    name: "Organisation Workspace",
    groupId: "W02",
    groupKey: "ORGANISATION",
    groupLabel: "Organisation Workspaces",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 17,
    id: "WORKSPACE.ORGANISATION.ORGANISATION_COMMAND_CENTER",
    name: "Organisation Command Center",
    groupId: "W02",
    groupKey: "ORGANISATION",
    groupLabel: "Organisation Workspaces",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 18,
    id: "WORKSPACE.ORGANISATION.ORGANISATION_OPERATIONS",
    name: "Organisation Operations Workspace",
    groupId: "W02",
    groupKey: "ORGANISATION",
    groupLabel: "Organisation Workspaces",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 19,
    id: "WORKSPACE.ORGANISATION.ORGANISATION_PEOPLE",
    name: "Organisation People Workspace",
    groupId: "W02",
    groupKey: "ORGANISATION",
    groupLabel: "Organisation Workspaces",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 20,
    id: "WORKSPACE.ORGANISATION.ORGANISATION_FINANCE",
    name: "Organisation Finance Workspace",
    groupId: "W02",
    groupKey: "ORGANISATION",
    groupLabel: "Organisation Workspaces",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 21,
    id: "WORKSPACE.ORGANISATION.ORGANISATION_PROJECTS",
    name: "Organisation Projects Workspace",
    groupId: "W02",
    groupKey: "ORGANISATION",
    groupLabel: "Organisation Workspaces",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 22,
    id: "WORKSPACE.ORGANISATION.ORGANISATION_DOCUMENTS",
    name: "Organisation Documents Workspace",
    groupId: "W02",
    groupKey: "ORGANISATION",
    groupLabel: "Organisation Workspaces",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 23,
    id: "WORKSPACE.ORGANISATION.ORGANISATION_ANALYTICS",
    name: "Organisation Analytics Workspace",
    groupId: "W02",
    groupKey: "ORGANISATION",
    groupLabel: "Organisation Workspaces",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 24,
    id: "WORKSPACE.ORGANISATION.ORGANISATION_SETTINGS",
    name: "Organisation Settings Workspace",
    groupId: "W02",
    groupKey: "ORGANISATION",
    groupLabel: "Organisation Workspaces",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 25,
    id: "WORKSPACE.ORGANISATION.ORGANISATION_GOVERNANCE",
    name: "Organisation Governance Workspace",
    groupId: "W02",
    groupKey: "ORGANISATION",
    groupLabel: "Organisation Workspaces",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 26,
    id: "WORKSPACE.ORGANISATION.MULTI_ORGANISATION",
    name: "Multi-Organisation Workspace",
    groupId: "W02",
    groupKey: "ORGANISATION",
    groupLabel: "Organisation Workspaces",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 27,
    id: "WORKSPACE.TEAM.TEAM",
    name: "Team Workspace",
    groupId: "W03",
    groupKey: "TEAM",
    groupLabel: "Team Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 28,
    id: "WORKSPACE.TEAM.DEPARTMENT",
    name: "Department Workspace",
    groupId: "W03",
    groupKey: "TEAM",
    groupLabel: "Team Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 29,
    id: "WORKSPACE.TEAM.FUNCTIONAL_TEAM",
    name: "Functional Team Workspace",
    groupId: "W03",
    groupKey: "TEAM",
    groupLabel: "Team Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 30,
    id: "WORKSPACE.TEAM.CROSS_FUNCTIONAL",
    name: "Cross-Functional Workspace",
    groupId: "W03",
    groupKey: "TEAM",
    groupLabel: "Team Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 31,
    id: "WORKSPACE.TEAM.SQUAD",
    name: "Squad Workspace",
    groupId: "W03",
    groupKey: "TEAM",
    groupLabel: "Team Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 32,
    id: "WORKSPACE.TEAM.POD",
    name: "Pod Workspace",
    groupId: "W03",
    groupKey: "TEAM",
    groupLabel: "Team Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 33,
    id: "WORKSPACE.TEAM.COMMITTEE",
    name: "Committee Workspace",
    groupId: "W03",
    groupKey: "TEAM",
    groupLabel: "Team Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 34,
    id: "WORKSPACE.TEAM.WORKING_GROUP",
    name: "Working Group Workspace",
    groupId: "W03",
    groupKey: "TEAM",
    groupLabel: "Team Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 35,
    id: "WORKSPACE.TEAM.LEADERSHIP",
    name: "Leadership Workspace",
    groupId: "W03",
    groupKey: "TEAM",
    groupLabel: "Team Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 36,
    id: "WORKSPACE.TEAM.EXECUTIVE",
    name: "Executive Workspace",
    groupId: "W03",
    groupKey: "TEAM",
    groupLabel: "Team Workspaces",
    archetype: "TeamWorkspace"
  },
  {
    ordinal: 37,
    id: "WORKSPACE.PROJECT_PROGRAM.PROJECT",
    name: "Project Workspace",
    groupId: "W04",
    groupKey: "PROJECT_PROGRAM",
    groupLabel: "Project & Program Workspaces",
    archetype: "ProjectWorkspace"
  },
  {
    ordinal: 38,
    id: "WORKSPACE.PROJECT_PROGRAM.PROGRAM",
    name: "Program Workspace",
    groupId: "W04",
    groupKey: "PROJECT_PROGRAM",
    groupLabel: "Project & Program Workspaces",
    archetype: "ProjectWorkspace"
  },
  {
    ordinal: 39,
    id: "WORKSPACE.PROJECT_PROGRAM.PORTFOLIO",
    name: "Project Portfolio Workspace",
    groupId: "W04",
    groupKey: "PROJECT_PROGRAM",
    groupLabel: "Project & Program Workspaces",
    archetype: "ProjectWorkspace"
  },
  {
    ordinal: 40,
    id: "WORKSPACE.PROJECT_PROGRAM.INITIATIVE",
    name: "Initiative Workspace",
    groupId: "W04",
    groupKey: "PROJECT_PROGRAM",
    groupLabel: "Project & Program Workspaces",
    archetype: "ProjectWorkspace"
  },
  {
    ordinal: 41,
    id: "WORKSPACE.PROJECT_PROGRAM.WORKSTREAM",
    name: "Workstream Workspace",
    groupId: "W04",
    groupKey: "PROJECT_PROGRAM",
    groupLabel: "Project & Program Workspaces",
    archetype: "ProjectWorkspace"
  },
  {
    ordinal: 42,
    id: "WORKSPACE.PROJECT_PROGRAM.MILESTONE",
    name: "Milestone Workspace",
    groupId: "W04",
    groupKey: "PROJECT_PROGRAM",
    groupLabel: "Project & Program Workspaces",
    archetype: "ProjectWorkspace"
  },
  {
    ordinal: 43,
    id: "WORKSPACE.PROJECT_PROGRAM.PROJECT_PLANNING",
    name: "Project Planning Workspace",
    groupId: "W04",
    groupKey: "PROJECT_PROGRAM",
    groupLabel: "Project & Program Workspaces",
    archetype: "ProjectWorkspace"
  },
  {
    ordinal: 44,
    id: "WORKSPACE.PROJECT_PROGRAM.PROJECT_EXECUTION",
    name: "Project Execution Workspace",
    groupId: "W04",
    groupKey: "PROJECT_PROGRAM",
    groupLabel: "Project & Program Workspaces",
    archetype: "ProjectWorkspace"
  },
  {
    ordinal: 45,
    id: "WORKSPACE.PROJECT_PROGRAM.PROJECT_REVIEW",
    name: "Project Review Workspace",
    groupId: "W04",
    groupKey: "PROJECT_PROGRAM",
    groupLabel: "Project & Program Workspaces",
    archetype: "ProjectWorkspace"
  },
  {
    ordinal: 46,
    id: "WORKSPACE.PROJECT_PROGRAM.PROJECT_CLOSURE",
    name: "Project Closure Workspace",
    groupId: "W04",
    groupKey: "PROJECT_PROGRAM",
    groupLabel: "Project & Program Workspaces",
    archetype: "ProjectWorkspace"
  },
  {
    ordinal: 47,
    id: "WORKSPACE.PROJECT_PROGRAM.PROJECT_EVIDENCE",
    name: "Project Evidence Workspace",
    groupId: "W04",
    groupKey: "PROJECT_PROGRAM",
    groupLabel: "Project & Program Workspaces",
    archetype: "ProjectWorkspace"
  },
  {
    ordinal: 48,
    id: "WORKSPACE.TASK_PRODUCTIVITY.TASK",
    name: "Task Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 49,
    id: "WORKSPACE.TASK_PRODUCTIVITY.KANBAN",
    name: "Kanban Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 50,
    id: "WORKSPACE.TASK_PRODUCTIVITY.SCRUM",
    name: "Scrum Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 51,
    id: "WORKSPACE.TASK_PRODUCTIVITY.SPRINT",
    name: "Sprint Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 52,
    id: "WORKSPACE.TASK_PRODUCTIVITY.BACKLOG",
    name: "Backlog Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 53,
    id: "WORKSPACE.TASK_PRODUCTIVITY.ROADMAP",
    name: "Roadmap Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 54,
    id: "WORKSPACE.TASK_PRODUCTIVITY.GANTT",
    name: "Gantt Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 55,
    id: "WORKSPACE.TASK_PRODUCTIVITY.TIMELINE",
    name: "Timeline Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 56,
    id: "WORKSPACE.TASK_PRODUCTIVITY.CALENDAR",
    name: "Calendar Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 57,
    id: "WORKSPACE.TASK_PRODUCTIVITY.SCHEDULER",
    name: "Scheduler Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 58,
    id: "WORKSPACE.TASK_PRODUCTIVITY.AGENDA",
    name: "Agenda Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 59,
    id: "WORKSPACE.TASK_PRODUCTIVITY.CHECKLIST",
    name: "Checklist Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 60,
    id: "WORKSPACE.TASK_PRODUCTIVITY.APPROVAL_QUEUE",
    name: "Approval Queue Workspace",
    groupId: "W05",
    groupKey: "TASK_PRODUCTIVITY",
    groupLabel: "Task & Productivity Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 61,
    id: "WORKSPACE.COMMUNICATION.INBOX",
    name: "Inbox Workspace",
    groupId: "W06",
    groupKey: "COMMUNICATION",
    groupLabel: "Communication Workspaces",
    archetype: "CommunicationWorkspace"
  },
  {
    ordinal: 62,
    id: "WORKSPACE.COMMUNICATION.MAIL",
    name: "Mail Workspace",
    groupId: "W06",
    groupKey: "COMMUNICATION",
    groupLabel: "Communication Workspaces",
    archetype: "CommunicationWorkspace"
  },
  {
    ordinal: 63,
    id: "WORKSPACE.COMMUNICATION.MESSENGER",
    name: "Messenger Workspace",
    groupId: "W06",
    groupKey: "COMMUNICATION",
    groupLabel: "Communication Workspaces",
    archetype: "CommunicationWorkspace"
  },
  {
    ordinal: 64,
    id: "WORKSPACE.COMMUNICATION.CHAT",
    name: "Chat Workspace",
    groupId: "W06",
    groupKey: "COMMUNICATION",
    groupLabel: "Communication Workspaces",
    archetype: "CommunicationWorkspace"
  },
  {
    ordinal: 65,
    id: "WORKSPACE.COMMUNICATION.COMMUNICATION_HUB",
    name: "Communication Hub",
    groupId: "W06",
    groupKey: "COMMUNICATION",
    groupLabel: "Communication Workspaces",
    archetype: "CommunicationWorkspace"
  },
  {
    ordinal: 66,
    id: "WORKSPACE.COMMUNICATION.THREAD",
    name: "Thread Workspace",
    groupId: "W06",
    groupKey: "COMMUNICATION",
    groupLabel: "Communication Workspaces",
    archetype: "CommunicationWorkspace"
  },
  {
    ordinal: 67,
    id: "WORKSPACE.COMMUNICATION.ANNOUNCEMENT",
    name: "Announcement Workspace",
    groupId: "W06",
    groupKey: "COMMUNICATION",
    groupLabel: "Communication Workspaces",
    archetype: "CommunicationWorkspace"
  },
  {
    ordinal: 68,
    id: "WORKSPACE.COMMUNICATION.NOTIFICATION_CENTER",
    name: "Notification Center Workspace",
    groupId: "W06",
    groupKey: "COMMUNICATION",
    groupLabel: "Communication Workspaces",
    archetype: "CommunicationWorkspace"
  },
  {
    ordinal: 69,
    id: "WORKSPACE.COMMUNICATION.CONTACT",
    name: "Contact Workspace",
    groupId: "W06",
    groupKey: "COMMUNICATION",
    groupLabel: "Communication Workspaces",
    archetype: "CRMWorkspace",
    aliasOf: "WORKSPACE.CRM_SALES.CONTACT"
  },
  {
    ordinal: 70,
    id: "WORKSPACE.COMMUNICATION.COMMUNICATION_CAMPAIGN",
    name: "Communication Campaign Workspace",
    groupId: "W06",
    groupKey: "COMMUNICATION",
    groupLabel: "Communication Workspaces",
    archetype: "CommunicationWorkspace"
  },
  {
    ordinal: 71,
    id: "WORKSPACE.COMMUNICATION.SUPPORT_CONVERSATION",
    name: "Support Conversation Workspace",
    groupId: "W06",
    groupKey: "COMMUNICATION",
    groupLabel: "Communication Workspaces",
    archetype: "CommunicationWorkspace"
  },
  {
    ordinal: 72,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.DOCUMENT",
    name: "Document Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 73,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.DOCUMENT_EDITOR",
    name: "Document Editor Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 74,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.SPREADSHEET",
    name: "Spreadsheet Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 75,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.PRESENTATION",
    name: "Presentation Authoring Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 76,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.NOTES",
    name: "Notes Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 77,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.NOTEBOOK",
    name: "Notebook Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 78,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.KNOWLEDGE",
    name: "Knowledge Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 79,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.KNOWLEDGE_BASE",
    name: "Knowledge Base Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 80,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.WIKI",
    name: "Wiki Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 81,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.DOCUMENTATION",
    name: "Documentation Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 82,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.RESEARCH",
    name: "Research Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 83,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.REFERENCE_LIBRARY",
    name: "Reference Library Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 84,
    id: "WORKSPACE.DOCUMENT_KNOWLEDGE.EVIDENCE_LIBRARY",
    name: "Evidence Library Workspace",
    groupId: "W07",
    groupKey: "DOCUMENT_KNOWLEDGE",
    groupLabel: "Documents & Knowledge Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 85,
    id: "WORKSPACE.FILE_ASSET.FILE_MANAGER",
    name: "File Manager Workspace",
    groupId: "W08",
    groupKey: "FILE_ASSET",
    groupLabel: "File & Asset Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 86,
    id: "WORKSPACE.FILE_ASSET.DOCUMENT_LIBRARY",
    name: "Document Library Workspace",
    groupId: "W08",
    groupKey: "FILE_ASSET",
    groupLabel: "File & Asset Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 87,
    id: "WORKSPACE.FILE_ASSET.ASSET_LIBRARY",
    name: "Asset Library Workspace",
    groupId: "W08",
    groupKey: "FILE_ASSET",
    groupLabel: "File & Asset Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 88,
    id: "WORKSPACE.FILE_ASSET.MEDIA_LIBRARY",
    name: "Media Library Workspace",
    groupId: "W08",
    groupKey: "FILE_ASSET",
    groupLabel: "File & Asset Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 89,
    id: "WORKSPACE.FILE_ASSET.IMAGE_LIBRARY",
    name: "Image Library Workspace",
    groupId: "W08",
    groupKey: "FILE_ASSET",
    groupLabel: "File & Asset Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 90,
    id: "WORKSPACE.FILE_ASSET.VIDEO_LIBRARY",
    name: "Video Library Workspace",
    groupId: "W08",
    groupKey: "FILE_ASSET",
    groupLabel: "File & Asset Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 91,
    id: "WORKSPACE.FILE_ASSET.AUDIO_LIBRARY",
    name: "Audio Library Workspace",
    groupId: "W08",
    groupKey: "FILE_ASSET",
    groupLabel: "File & Asset Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 92,
    id: "WORKSPACE.FILE_ASSET.BRAND_ASSET",
    name: "Brand Asset Workspace",
    groupId: "W08",
    groupKey: "FILE_ASSET",
    groupLabel: "File & Asset Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 93,
    id: "WORKSPACE.FILE_ASSET.TEMPLATE_LIBRARY",
    name: "Template Library Workspace",
    groupId: "W08",
    groupKey: "FILE_ASSET",
    groupLabel: "File & Asset Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 94,
    id: "WORKSPACE.FILE_ASSET.ARCHIVE",
    name: "Archive Workspace",
    groupId: "W08",
    groupKey: "FILE_ASSET",
    groupLabel: "File & Asset Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 95,
    id: "WORKSPACE.DATA.DATA",
    name: "Data Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 96,
    id: "WORKSPACE.DATA.DATA_EXPLORER",
    name: "Data Explorer Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 97,
    id: "WORKSPACE.DATA.DATA_BROWSER",
    name: "Data Browser Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 98,
    id: "WORKSPACE.DATA.DATA_TABLE",
    name: "Data Table Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 99,
    id: "WORKSPACE.DATA.DATA_STUDIO",
    name: "Data Studio Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 100,
    id: "WORKSPACE.DATA.DATASET",
    name: "Dataset Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 101,
    id: "WORKSPACE.DATA.SCHEMA",
    name: "Schema Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 102,
    id: "WORKSPACE.DATA.SCHEMA_EXPLORER",
    name: "Schema Explorer Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 103,
    id: "WORKSPACE.DATA.DOMAIN_REGISTRY",
    name: "Domain Registry Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 104,
    id: "WORKSPACE.DATA.CONTRACT_REGISTRY",
    name: "Contract Registry Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 105,
    id: "WORKSPACE.DATA.DATA_QUALITY",
    name: "Data Quality Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 106,
    id: "WORKSPACE.DATA.DATA_MAPPING",
    name: "Data Mapping Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 107,
    id: "WORKSPACE.DATA.DATA_IMPORT",
    name: "Data Import Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 108,
    id: "WORKSPACE.DATA.DATA_EXPORT",
    name: "Data Export Workspace",
    groupId: "W09",
    groupKey: "DATA",
    groupLabel: "Data Workspaces",
    archetype: "DataWorkspace"
  },
  {
    ordinal: 109,
    id: "WORKSPACE.API.API_STUDIO",
    name: "API Studio Workspace",
    groupId: "W10",
    groupKey: "API",
    groupLabel: "API Workspaces",
    archetype: "APIStudioWorkspace"
  },
  {
    ordinal: 110,
    id: "WORKSPACE.API.API_DESIGN",
    name: "API Design Workspace",
    groupId: "W10",
    groupKey: "API",
    groupLabel: "API Workspaces",
    archetype: "APIStudioWorkspace"
  },
  {
    ordinal: 111,
    id: "WORKSPACE.API.API_CONTRACT",
    name: "API Contract Workspace",
    groupId: "W10",
    groupKey: "API",
    groupLabel: "API Workspaces",
    archetype: "APIStudioWorkspace"
  },
  {
    ordinal: 112,
    id: "WORKSPACE.API.API_EXPLORER",
    name: "API Explorer Workspace",
    groupId: "W10",
    groupKey: "API",
    groupLabel: "API Workspaces",
    archetype: "APIStudioWorkspace"
  },
  {
    ordinal: 113,
    id: "WORKSPACE.API.API_TESTING",
    name: "API Testing Workspace",
    groupId: "W10",
    groupKey: "API",
    groupLabel: "API Workspaces",
    archetype: "APIStudioWorkspace"
  },
  {
    ordinal: 114,
    id: "WORKSPACE.API.API_REQUEST",
    name: "API Request Workspace",
    groupId: "W10",
    groupKey: "API",
    groupLabel: "API Workspaces",
    archetype: "APIStudioWorkspace"
  },
  {
    ordinal: 115,
    id: "WORKSPACE.API.API_MOCK",
    name: "API Mock Workspace",
    groupId: "W10",
    groupKey: "API",
    groupLabel: "API Workspaces",
    archetype: "APIStudioWorkspace"
  },
  {
    ordinal: 116,
    id: "WORKSPACE.API.API_CONFORMANCE",
    name: "API Conformance Workspace",
    groupId: "W10",
    groupKey: "API",
    groupLabel: "API Workspaces",
    archetype: "APIStudioWorkspace"
  },
  {
    ordinal: 117,
    id: "WORKSPACE.API.API_ENVIRONMENT",
    name: "API Environment Workspace",
    groupId: "W10",
    groupKey: "API",
    groupLabel: "API Workspaces",
    archetype: "APIStudioWorkspace"
  },
  {
    ordinal: 118,
    id: "WORKSPACE.API.API_KEY",
    name: "API Key Workspace",
    groupId: "W10",
    groupKey: "API",
    groupLabel: "API Workspaces",
    archetype: "APIStudioWorkspace"
  },
  {
    ordinal: 119,
    id: "WORKSPACE.API.WEBHOOK",
    name: "Webhook Workspace",
    groupId: "W10",
    groupKey: "API",
    groupLabel: "API Workspaces",
    archetype: "APIStudioWorkspace"
  },
  {
    ordinal: 120,
    id: "WORKSPACE.API.INTEGRATION_API",
    name: "Integration API Workspace",
    groupId: "W10",
    groupKey: "API",
    groupLabel: "API Workspaces",
    archetype: "APIStudioWorkspace"
  },
  {
    ordinal: 121,
    id: "WORKSPACE.DEVELOPER.DEVELOPER",
    name: "Developer Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 122,
    id: "WORKSPACE.DEVELOPER.CODE",
    name: "Code Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 123,
    id: "WORKSPACE.DEVELOPER.CODE_STUDIO",
    name: "Code Studio Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 124,
    id: "WORKSPACE.DEVELOPER.REPOSITORY",
    name: "Repository Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 125,
    id: "WORKSPACE.DEVELOPER.SOURCE_BROWSER",
    name: "Source Browser Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 126,
    id: "WORKSPACE.DEVELOPER.BRANCH",
    name: "Branch Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 127,
    id: "WORKSPACE.DEVELOPER.PULL_REQUEST",
    name: "Pull Request Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 128,
    id: "WORKSPACE.DEVELOPER.ISSUE",
    name: "Issue Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 129,
    id: "WORKSPACE.DEVELOPER.BUILD",
    name: "Build Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 130,
    id: "WORKSPACE.DEVELOPER.CI",
    name: "CI Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 131,
    id: "WORKSPACE.DEVELOPER.PIPELINE",
    name: "Pipeline Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 132,
    id: "WORKSPACE.DEVELOPER.RELEASE_ENGINEERING",
    name: "Release Engineering Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 133,
    id: "WORKSPACE.DEVELOPER.SDK",
    name: "SDK Workspace",
    groupId: "W11",
    groupKey: "DEVELOPER",
    groupLabel: "Developer Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 134,
    id: "WORKSPACE.APPLICATION_BUILDER.APP_BUILDER",
    name: "App Builder Workspace",
    groupId: "W12",
    groupKey: "APPLICATION_BUILDER",
    groupLabel: "Application Builder Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 135,
    id: "WORKSPACE.APPLICATION_BUILDER.WEB_APP_BUILDER",
    name: "Web App Builder Workspace",
    groupId: "W12",
    groupKey: "APPLICATION_BUILDER",
    groupLabel: "Application Builder Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 136,
    id: "WORKSPACE.APPLICATION_BUILDER.MOBILE_APP_BUILDER",
    name: "Mobile App Builder Workspace",
    groupId: "W12",
    groupKey: "APPLICATION_BUILDER",
    groupLabel: "Application Builder Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 137,
    id: "WORKSPACE.APPLICATION_BUILDER.DESKTOP_APP_BUILDER",
    name: "Desktop App Builder Workspace",
    groupId: "W12",
    groupKey: "APPLICATION_BUILDER",
    groupLabel: "Application Builder Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 138,
    id: "WORKSPACE.APPLICATION_BUILDER.PAGE_BUILDER",
    name: "Page Builder Workspace",
    groupId: "W12",
    groupKey: "APPLICATION_BUILDER",
    groupLabel: "Application Builder Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 139,
    id: "WORKSPACE.APPLICATION_BUILDER.FORM_BUILDER",
    name: "Form Builder Workspace",
    groupId: "W12",
    groupKey: "APPLICATION_BUILDER",
    groupLabel: "Application Builder Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 140,
    id: "WORKSPACE.APPLICATION_BUILDER.WORKFLOW_BUILDER",
    name: "Workflow Builder Workspace",
    groupId: "W12",
    groupKey: "APPLICATION_BUILDER",
    groupLabel: "Application Builder Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 141,
    id: "WORKSPACE.APPLICATION_BUILDER.AUTOMATION_BUILDER",
    name: "Automation Builder Workspace",
    groupId: "W12",
    groupKey: "APPLICATION_BUILDER",
    groupLabel: "Application Builder Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 142,
    id: "WORKSPACE.APPLICATION_BUILDER.RULE_BUILDER",
    name: "Rule Builder Workspace",
    groupId: "W12",
    groupKey: "APPLICATION_BUILDER",
    groupLabel: "Application Builder Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 143,
    id: "WORKSPACE.APPLICATION_BUILDER.TEMPLATE_BUILDER",
    name: "Template Builder Workspace",
    groupId: "W12",
    groupKey: "APPLICATION_BUILDER",
    groupLabel: "Application Builder Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 144,
    id: "WORKSPACE.APPLICATION_BUILDER.COMPONENT_BUILDER",
    name: "Component Builder Workspace",
    groupId: "W12",
    groupKey: "APPLICATION_BUILDER",
    groupLabel: "Application Builder Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 145,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.UI_STUDIO",
    name: "UI Studio Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 146,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.DESIGN_SYSTEM",
    name: "Design System Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 147,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.COMPONENT_STUDIO",
    name: "Component Studio Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 148,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.COMPONENT_GALLERY",
    name: "Component Gallery Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 149,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.ATOMIC_COMPONENT",
    name: "Atomic Component Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 150,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.LAYOUT_STUDIO",
    name: "Layout Studio Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 151,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.PAGE_STUDIO",
    name: "Page Studio Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 152,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.THEME_STUDIO",
    name: "Theme Studio Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 153,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.TOKEN_STUDIO",
    name: "Token Studio Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 154,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.TYPOGRAPHY",
    name: "Typography Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 155,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.ICON_STUDIO",
    name: "Icon Studio Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 156,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.MOTION",
    name: "Motion Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 157,
    id: "WORKSPACE.UI_DESIGN_SYSTEM.ACCESSIBILITY",
    name: "Accessibility Workspace",
    groupId: "W13",
    groupKey: "UI_DESIGN_SYSTEM",
    groupLabel: "UI & Design-System Workspaces",
    archetype: "DesignSystemWorkspace"
  },
  {
    ordinal: 158,
    id: "WORKSPACE.CREATIVE.CREATIVE_STUDIO",
    name: "Creative Studio Workspace",
    groupId: "W14",
    groupKey: "CREATIVE",
    groupLabel: "Creative Workspaces",
    archetype: "CreativeStudioWorkspace"
  },
  {
    ordinal: 159,
    id: "WORKSPACE.CREATIVE.DESIGN",
    name: "Design Workspace",
    groupId: "W14",
    groupKey: "CREATIVE",
    groupLabel: "Creative Workspaces",
    archetype: "CreativeStudioWorkspace"
  },
  {
    ordinal: 160,
    id: "WORKSPACE.CREATIVE.GRAPHIC_DESIGN",
    name: "Graphic Design Workspace",
    groupId: "W14",
    groupKey: "CREATIVE",
    groupLabel: "Creative Workspaces",
    archetype: "CreativeStudioWorkspace"
  },
  {
    ordinal: 161,
    id: "WORKSPACE.CREATIVE.BRAND_STUDIO",
    name: "Brand Studio Workspace",
    groupId: "W14",
    groupKey: "CREATIVE",
    groupLabel: "Creative Workspaces",
    archetype: "CreativeStudioWorkspace"
  },
  {
    ordinal: 162,
    id: "WORKSPACE.CREATIVE.CAMPAIGN_CREATIVE",
    name: "Campaign Creative Workspace",
    groupId: "W14",
    groupKey: "CREATIVE",
    groupLabel: "Creative Workspaces",
    archetype: "CreativeStudioWorkspace"
  },
  {
    ordinal: 163,
    id: "WORKSPACE.CREATIVE.CONTENT_STUDIO",
    name: "Content Studio Workspace",
    groupId: "W14",
    groupKey: "CREATIVE",
    groupLabel: "Creative Workspaces",
    archetype: "CreativeStudioWorkspace"
  },
  {
    ordinal: 164,
    id: "WORKSPACE.CREATIVE.COPY",
    name: "Copy Workspace",
    groupId: "W14",
    groupKey: "CREATIVE",
    groupLabel: "Creative Workspaces",
    archetype: "CreativeStudioWorkspace"
  },
  {
    ordinal: 165,
    id: "WORKSPACE.CREATIVE.STORY",
    name: "Story Workspace",
    groupId: "W14",
    groupKey: "CREATIVE",
    groupLabel: "Creative Workspaces",
    archetype: "CreativeStudioWorkspace"
  },
  {
    ordinal: 166,
    id: "WORKSPACE.CREATIVE.STORYBOARD",
    name: "Storyboard Workspace",
    groupId: "W14",
    groupKey: "CREATIVE",
    groupLabel: "Creative Workspaces",
    archetype: "CreativeStudioWorkspace"
  },
  {
    ordinal: 167,
    id: "WORKSPACE.CREATIVE.MOODBOARD",
    name: "Moodboard Workspace",
    groupId: "W14",
    groupKey: "CREATIVE",
    groupLabel: "Creative Workspaces",
    archetype: "CreativeStudioWorkspace"
  },
  {
    ordinal: 168,
    id: "WORKSPACE.CREATIVE.WHITEBOARD",
    name: "Whiteboard Workspace",
    groupId: "W14",
    groupKey: "CREATIVE",
    groupLabel: "Creative Workspaces",
    archetype: "CreativeStudioWorkspace"
  },
  {
    ordinal: 169,
    id: "WORKSPACE.CREATIVE.IDEATION",
    name: "Ideation Workspace",
    groupId: "W14",
    groupKey: "CREATIVE",
    groupLabel: "Creative Workspaces",
    archetype: "CreativeStudioWorkspace"
  },
  {
    ordinal: 170,
    id: "WORKSPACE.MEDIA_PRODUCTION.MEDIA_STUDIO",
    name: "Media Studio Workspace",
    groupId: "W15",
    groupKey: "MEDIA_PRODUCTION",
    groupLabel: "Media Production Workspaces",
    archetype: "MediaStudioWorkspace"
  },
  {
    ordinal: 171,
    id: "WORKSPACE.MEDIA_PRODUCTION.IMAGE_EDITING",
    name: "Image Editing Workspace",
    groupId: "W15",
    groupKey: "MEDIA_PRODUCTION",
    groupLabel: "Media Production Workspaces",
    archetype: "MediaStudioWorkspace"
  },
  {
    ordinal: 172,
    id: "WORKSPACE.MEDIA_PRODUCTION.VIDEO_EDITING",
    name: "Video Editing Workspace",
    groupId: "W15",
    groupKey: "MEDIA_PRODUCTION",
    groupLabel: "Media Production Workspaces",
    archetype: "MediaStudioWorkspace"
  },
  {
    ordinal: 173,
    id: "WORKSPACE.MEDIA_PRODUCTION.AUDIO_EDITING",
    name: "Audio Editing Workspace",
    groupId: "W15",
    groupKey: "MEDIA_PRODUCTION",
    groupLabel: "Media Production Workspaces",
    archetype: "MediaStudioWorkspace"
  },
  {
    ordinal: 174,
    id: "WORKSPACE.MEDIA_PRODUCTION.PHOTO",
    name: "Photo Workspace",
    groupId: "W15",
    groupKey: "MEDIA_PRODUCTION",
    groupLabel: "Media Production Workspaces",
    archetype: "MediaStudioWorkspace"
  },
  {
    ordinal: 175,
    id: "WORKSPACE.MEDIA_PRODUCTION.VIDEO",
    name: "Video Workspace",
    groupId: "W15",
    groupKey: "MEDIA_PRODUCTION",
    groupLabel: "Media Production Workspaces",
    archetype: "MediaStudioWorkspace"
  },
  {
    ordinal: 176,
    id: "WORKSPACE.MEDIA_PRODUCTION.AUDIO",
    name: "Audio Workspace",
    groupId: "W15",
    groupKey: "MEDIA_PRODUCTION",
    groupLabel: "Media Production Workspaces",
    archetype: "MediaStudioWorkspace"
  },
  {
    ordinal: 177,
    id: "WORKSPACE.MEDIA_PRODUCTION.MOTION_GRAPHICS",
    name: "Motion Graphics Workspace",
    groupId: "W15",
    groupKey: "MEDIA_PRODUCTION",
    groupLabel: "Media Production Workspaces",
    archetype: "MediaStudioWorkspace"
  },
  {
    ordinal: 178,
    id: "WORKSPACE.MEDIA_PRODUCTION.POST_PRODUCTION",
    name: "Post-Production Workspace",
    groupId: "W15",
    groupKey: "MEDIA_PRODUCTION",
    groupLabel: "Media Production Workspaces",
    archetype: "MediaStudioWorkspace"
  },
  {
    ordinal: 179,
    id: "WORKSPACE.MEDIA_PRODUCTION.REVIEW_AND_APPROVAL",
    name: "Review & Approval Workspace",
    groupId: "W15",
    groupKey: "MEDIA_PRODUCTION",
    groupLabel: "Media Production Workspaces",
    archetype: "MediaStudioWorkspace"
  },
  {
    ordinal: 180,
    id: "WORKSPACE.MEDIA_PRODUCTION.MEDIA_DELIVERY",
    name: "Media Delivery Workspace",
    groupId: "W15",
    groupKey: "MEDIA_PRODUCTION",
    groupLabel: "Media Production Workspaces",
    archetype: "MediaStudioWorkspace"
  },
  {
    ordinal: 181,
    id: "WORKSPACE.SPATIAL_3D.SPATIAL",
    name: "Spatial Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 182,
    id: "WORKSPACE.SPATIAL_3D.SPATIAL_STUDIO",
    name: "Spatial Studio Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 183,
    id: "WORKSPACE.SPATIAL_3D.CAD",
    name: "CAD Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 184,
    id: "WORKSPACE.SPATIAL_3D.TWO_D_PLAN",
    name: "2D Plan Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 185,
    id: "WORKSPACE.SPATIAL_3D.THREE_D",
    name: "3D Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 186,
    id: "WORKSPACE.SPATIAL_3D.THREE_D_PREVIEW",
    name: "3D Preview Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 187,
    id: "WORKSPACE.SPATIAL_3D.FLOOR_PLAN",
    name: "Floor Plan Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 188,
    id: "WORKSPACE.SPATIAL_3D.VENUE_PLAN",
    name: "Venue Plan Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 189,
    id: "WORKSPACE.SPATIAL_3D.SCENE",
    name: "Scene Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 190,
    id: "WORKSPACE.SPATIAL_3D.DIGITAL_TWIN",
    name: "Digital Twin Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 191,
    id: "WORKSPACE.SPATIAL_3D.SIMULATION",
    name: "Simulation Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 192,
    id: "WORKSPACE.SPATIAL_3D.MAPPING",
    name: "Mapping Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 193,
    id: "WORKSPACE.SPATIAL_3D.GIS",
    name: "GIS Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 194,
    id: "WORKSPACE.SPATIAL_3D.ROUTE_PLANNING",
    name: "Route Planning Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 195,
    id: "WORKSPACE.SPATIAL_3D.LOCATION",
    name: "Spatial Location Workspace",
    groupId: "W16",
    groupKey: "SPATIAL_3D",
    groupLabel: "Spatial & 3D Workspaces",
    archetype: "SpatialStudioWorkspace"
  },
  {
    ordinal: 196,
    id: "WORKSPACE.AI.AI",
    name: "AI Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 197,
    id: "WORKSPACE.AI.AI_ASSISTANT",
    name: "AI Assistant Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 198,
    id: "WORKSPACE.AI.AGENT",
    name: "Agent Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 199,
    id: "WORKSPACE.AI.AGENT_BUILDER",
    name: "Agent Builder Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 200,
    id: "WORKSPACE.AI.MULTI_AGENT",
    name: "Multi-Agent Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 201,
    id: "WORKSPACE.AI.PROMPT",
    name: "Prompt Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 202,
    id: "WORKSPACE.AI.PROMPT_STUDIO",
    name: "Prompt Studio Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 203,
    id: "WORKSPACE.AI.MODEL",
    name: "Model Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 204,
    id: "WORKSPACE.AI.MODEL_PLAYGROUND",
    name: "Model Playground Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 205,
    id: "WORKSPACE.AI.AI_EVALUATION",
    name: "AI Evaluation Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 206,
    id: "WORKSPACE.AI.AI_OBSERVABILITY",
    name: "AI Observability Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 207,
    id: "WORKSPACE.AI.AI_KNOWLEDGE",
    name: "AI Knowledge Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 208,
    id: "WORKSPACE.AI.RAG",
    name: "RAG Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 209,
    id: "WORKSPACE.AI.EMBEDDING",
    name: "Embedding Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 210,
    id: "WORKSPACE.AI.AI_WORKFLOW",
    name: "AI Workflow Workspace",
    groupId: "W17",
    groupKey: "AI",
    groupLabel: "AI Workspaces",
    archetype: "AIWorkspace"
  },
  {
    ordinal: 211,
    id: "WORKSPACE.ANALYTICS.ANALYTICS",
    name: "Analytics Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "AnalyticsWorkspace"
  },
  {
    ordinal: 212,
    id: "WORKSPACE.ANALYTICS.BI",
    name: "BI Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "AnalyticsWorkspace"
  },
  {
    ordinal: 213,
    id: "WORKSPACE.ANALYTICS.DASHBOARD",
    name: "Dashboard Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "AnalyticsWorkspace"
  },
  {
    ordinal: 214,
    id: "WORKSPACE.ANALYTICS.EXECUTIVE_ANALYTICS",
    name: "Executive Analytics Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "AnalyticsWorkspace"
  },
  {
    ordinal: 215,
    id: "WORKSPACE.ANALYTICS.OPERATIONAL_ANALYTICS",
    name: "Operational Analytics Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "AnalyticsWorkspace"
  },
  {
    ordinal: 216,
    id: "WORKSPACE.ANALYTICS.PRODUCT_ANALYTICS",
    name: "Product Analytics Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "AnalyticsWorkspace"
  },
  {
    ordinal: 217,
    id: "WORKSPACE.ANALYTICS.USER_ANALYTICS",
    name: "User Analytics Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "AnalyticsWorkspace"
  },
  {
    ordinal: 218,
    id: "WORKSPACE.ANALYTICS.MARKETING_ANALYTICS",
    name: "Marketing Analytics Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "MarketingWorkspace",
    aliasOf: "WORKSPACE.MARKETING.MARKETING_ANALYTICS"
  },
  {
    ordinal: 219,
    id: "WORKSPACE.ANALYTICS.REVENUE_ANALYTICS",
    name: "Revenue Analytics Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "AnalyticsWorkspace"
  },
  {
    ordinal: 220,
    id: "WORKSPACE.ANALYTICS.FINANCE_ANALYTICS",
    name: "Finance Analytics Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "AnalyticsWorkspace"
  },
  {
    ordinal: 221,
    id: "WORKSPACE.ANALYTICS.FUNNEL",
    name: "Funnel Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "AnalyticsWorkspace"
  },
  {
    ordinal: 222,
    id: "WORKSPACE.ANALYTICS.COHORT",
    name: "Cohort Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "AnalyticsWorkspace"
  },
  {
    ordinal: 223,
    id: "WORKSPACE.ANALYTICS.REPORT_BUILDER",
    name: "Report Builder Workspace",
    groupId: "W18",
    groupKey: "ANALYTICS",
    groupLabel: "Analytics Workspaces",
    archetype: "AnalyticsWorkspace"
  },
  {
    ordinal: 224,
    id: "WORKSPACE.COMMAND_OPERATIONS.COMMAND_CENTER",
    name: "Command Center Workspace",
    groupId: "W19",
    groupKey: "COMMAND_OPERATIONS",
    groupLabel: "Command & Operations Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 225,
    id: "WORKSPACE.COMMAND_OPERATIONS.OPERATIONS_CENTER",
    name: "Operations Center Workspace",
    groupId: "W19",
    groupKey: "COMMAND_OPERATIONS",
    groupLabel: "Command & Operations Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 226,
    id: "WORKSPACE.COMMAND_OPERATIONS.CONTROL_ROOM",
    name: "Control Room Workspace",
    groupId: "W19",
    groupKey: "COMMAND_OPERATIONS",
    groupLabel: "Command & Operations Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 227,
    id: "WORKSPACE.COMMAND_OPERATIONS.MISSION_CONTROL",
    name: "Mission Control Workspace",
    groupId: "W19",
    groupKey: "COMMAND_OPERATIONS",
    groupLabel: "Command & Operations Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 228,
    id: "WORKSPACE.COMMAND_OPERATIONS.COCKPIT",
    name: "Cockpit Workspace",
    groupId: "W19",
    groupKey: "COMMAND_OPERATIONS",
    groupLabel: "Command & Operations Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 229,
    id: "WORKSPACE.COMMAND_OPERATIONS.OPERATIONS_WALLBOARD",
    name: "Operations Wallboard Workspace",
    groupId: "W19",
    groupKey: "COMMAND_OPERATIONS",
    groupLabel: "Command & Operations Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 230,
    id: "WORKSPACE.COMMAND_OPERATIONS.MONITORING",
    name: "Monitoring Workspace",
    groupId: "W19",
    groupKey: "COMMAND_OPERATIONS",
    groupLabel: "Command & Operations Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 231,
    id: "WORKSPACE.COMMAND_OPERATIONS.SITUATION_ROOM",
    name: "Situation Room Workspace",
    groupId: "W19",
    groupKey: "COMMAND_OPERATIONS",
    groupLabel: "Command & Operations Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 232,
    id: "WORKSPACE.COMMAND_OPERATIONS.INCIDENT_COMMAND",
    name: "Incident Command Workspace",
    groupId: "W19",
    groupKey: "COMMAND_OPERATIONS",
    groupLabel: "Command & Operations Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 233,
    id: "WORKSPACE.COMMAND_OPERATIONS.REAL_TIME_OPERATIONS",
    name: "Real-Time Operations Workspace",
    groupId: "W19",
    groupKey: "COMMAND_OPERATIONS",
    groupLabel: "Command & Operations Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 234,
    id: "WORKSPACE.INFRASTRUCTURE.INFRASTRUCTURE",
    name: "Infrastructure Workspace",
    groupId: "W20",
    groupKey: "INFRASTRUCTURE",
    groupLabel: "Infrastructure Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 235,
    id: "WORKSPACE.INFRASTRUCTURE.INFRASTRUCTURE_STUDIO",
    name: "Infrastructure Studio Workspace",
    groupId: "W20",
    groupKey: "INFRASTRUCTURE",
    groupLabel: "Infrastructure Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 236,
    id: "WORKSPACE.INFRASTRUCTURE.CLOUD",
    name: "Cloud Workspace",
    groupId: "W20",
    groupKey: "INFRASTRUCTURE",
    groupLabel: "Infrastructure Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 237,
    id: "WORKSPACE.INFRASTRUCTURE.SERVER",
    name: "Server Workspace",
    groupId: "W20",
    groupKey: "INFRASTRUCTURE",
    groupLabel: "Infrastructure Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 238,
    id: "WORKSPACE.INFRASTRUCTURE.SERVICE",
    name: "Service Workspace",
    groupId: "W20",
    groupKey: "INFRASTRUCTURE",
    groupLabel: "Infrastructure Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 239,
    id: "WORKSPACE.INFRASTRUCTURE.RUNTIME",
    name: "Runtime Workspace",
    groupId: "W20",
    groupKey: "INFRASTRUCTURE",
    groupLabel: "Infrastructure Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 240,
    id: "WORKSPACE.INFRASTRUCTURE.NETWORK",
    name: "Network Workspace",
    groupId: "W20",
    groupKey: "INFRASTRUCTURE",
    groupLabel: "Infrastructure Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 241,
    id: "WORKSPACE.INFRASTRUCTURE.STORAGE",
    name: "Storage Workspace",
    groupId: "W20",
    groupKey: "INFRASTRUCTURE",
    groupLabel: "Infrastructure Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 242,
    id: "WORKSPACE.INFRASTRUCTURE.QUEUE",
    name: "Queue Workspace",
    groupId: "W20",
    groupKey: "INFRASTRUCTURE",
    groupLabel: "Infrastructure Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 243,
    id: "WORKSPACE.INFRASTRUCTURE.COMPUTE",
    name: "Compute Workspace",
    groupId: "W20",
    groupKey: "INFRASTRUCTURE",
    groupLabel: "Infrastructure Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 244,
    id: "WORKSPACE.INFRASTRUCTURE.RESOURCE_INVENTORY",
    name: "Resource Inventory Workspace",
    groupId: "W20",
    groupKey: "INFRASTRUCTURE",
    groupLabel: "Infrastructure Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 245,
    id: "WORKSPACE.INFRASTRUCTURE.INFRASTRUCTURE_TOPOLOGY",
    name: "Infrastructure Topology Workspace",
    groupId: "W20",
    groupKey: "INFRASTRUCTURE",
    groupLabel: "Infrastructure Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 246,
    id: "WORKSPACE.CONTROL_PLANE.MAATAA_CONTROL_PLANE",
    name: "MAATAA Control Plane Workspace",
    groupId: "W21",
    groupKey: "CONTROL_PLANE",
    groupLabel: "Control Plane Workspaces",
    archetype: "ControlPlaneWorkspace"
  },
  {
    ordinal: 247,
    id: "WORKSPACE.CONTROL_PLANE.APPLICATION_REGISTRY",
    name: "Application Registry Workspace",
    groupId: "W21",
    groupKey: "CONTROL_PLANE",
    groupLabel: "Control Plane Workspaces",
    archetype: "ControlPlaneWorkspace"
  },
  {
    ordinal: 248,
    id: "WORKSPACE.CONTROL_PLANE.ENVIRONMENT_REGISTRY",
    name: "Environment Registry Workspace",
    groupId: "W21",
    groupKey: "CONTROL_PLANE",
    groupLabel: "Control Plane Workspaces",
    archetype: "ControlPlaneWorkspace"
  },
  {
    ordinal: 249,
    id: "WORKSPACE.CONTROL_PLANE.RUNTIME_REGISTRY",
    name: "Runtime Registry Workspace",
    groupId: "W21",
    groupKey: "CONTROL_PLANE",
    groupLabel: "Control Plane Workspaces",
    archetype: "ControlPlaneWorkspace"
  },
  {
    ordinal: 250,
    id: "WORKSPACE.CONTROL_PLANE.DATABASE_TARGET",
    name: "Database Target Workspace",
    groupId: "W21",
    groupKey: "CONTROL_PLANE",
    groupLabel: "Control Plane Workspaces",
    archetype: "DatabaseWorkspace",
    aliasOf: "WORKSPACE.DATABASE.DATABASE_TARGET"
  },
  {
    ordinal: 251,
    id: "WORKSPACE.CONTROL_PLANE.INFRASTRUCTURE_REGISTRY",
    name: "Infrastructure Registry Workspace",
    groupId: "W21",
    groupKey: "CONTROL_PLANE",
    groupLabel: "Control Plane Workspaces",
    archetype: "ControlPlaneWorkspace"
  },
  {
    ordinal: 252,
    id: "WORKSPACE.CONTROL_PLANE.DESIRED_STATE",
    name: "Desired State Workspace",
    groupId: "W21",
    groupKey: "CONTROL_PLANE",
    groupLabel: "Control Plane Workspaces",
    archetype: "ControlPlaneWorkspace"
  },
  {
    ordinal: 253,
    id: "WORKSPACE.CONTROL_PLANE.OBSERVED_STATE",
    name: "Observed State Workspace",
    groupId: "W21",
    groupKey: "CONTROL_PLANE",
    groupLabel: "Control Plane Workspaces",
    archetype: "ControlPlaneWorkspace"
  },
  {
    ordinal: 254,
    id: "WORKSPACE.CONTROL_PLANE.RECONCILIATION",
    name: "State Reconciliation Workspace",
    groupId: "W21",
    groupKey: "CONTROL_PLANE",
    groupLabel: "Control Plane Workspaces",
    archetype: "ControlPlaneWorkspace"
  },
  {
    ordinal: 255,
    id: "WORKSPACE.CONTROL_PLANE.DEPLOYMENT_CONTROL",
    name: "Deployment Control Workspace",
    groupId: "W21",
    groupKey: "CONTROL_PLANE",
    groupLabel: "Control Plane Workspaces",
    archetype: "ControlPlaneWorkspace"
  },
  {
    ordinal: 256,
    id: "WORKSPACE.ENVIRONMENT_RELEASE.DEVELOPMENT_ENVIRONMENT",
    name: "Development Environment Workspace",
    groupId: "W22",
    groupKey: "ENVIRONMENT_RELEASE",
    groupLabel: "Environment & Release Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 257,
    id: "WORKSPACE.ENVIRONMENT_RELEASE.PREVIEW_ENVIRONMENT",
    name: "Preview Environment Workspace",
    groupId: "W22",
    groupKey: "ENVIRONMENT_RELEASE",
    groupLabel: "Environment & Release Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 258,
    id: "WORKSPACE.ENVIRONMENT_RELEASE.TEST_ENVIRONMENT",
    name: "Test Environment Workspace",
    groupId: "W22",
    groupKey: "ENVIRONMENT_RELEASE",
    groupLabel: "Environment & Release Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 259,
    id: "WORKSPACE.ENVIRONMENT_RELEASE.QA",
    name: "QA Workspace",
    groupId: "W22",
    groupKey: "ENVIRONMENT_RELEASE",
    groupLabel: "Environment & Release Workspaces",
    archetype: "TestingWorkspace",
    aliasOf: "WORKSPACE.TESTING.QA"
  },
  {
    ordinal: 260,
    id: "WORKSPACE.ENVIRONMENT_RELEASE.STAGING",
    name: "Staging Workspace",
    groupId: "W22",
    groupKey: "ENVIRONMENT_RELEASE",
    groupLabel: "Environment & Release Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 261,
    id: "WORKSPACE.ENVIRONMENT_RELEASE.PILOT",
    name: "Pilot Workspace",
    groupId: "W22",
    groupKey: "ENVIRONMENT_RELEASE",
    groupLabel: "Environment & Release Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 262,
    id: "WORKSPACE.ENVIRONMENT_RELEASE.PRODUCTION",
    name: "Production Workspace",
    groupId: "W22",
    groupKey: "ENVIRONMENT_RELEASE",
    groupLabel: "Environment & Release Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 263,
    id: "WORKSPACE.ENVIRONMENT_RELEASE.RELEASE",
    name: "Release Workspace",
    groupId: "W22",
    groupKey: "ENVIRONMENT_RELEASE",
    groupLabel: "Environment & Release Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 264,
    id: "WORKSPACE.ENVIRONMENT_RELEASE.RELEASE_READINESS",
    name: "Release Readiness Workspace",
    groupId: "W22",
    groupKey: "ENVIRONMENT_RELEASE",
    groupLabel: "Environment & Release Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 265,
    id: "WORKSPACE.ENVIRONMENT_RELEASE.DEPLOYMENT",
    name: "Deployment Workspace",
    groupId: "W22",
    groupKey: "ENVIRONMENT_RELEASE",
    groupLabel: "Environment & Release Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 266,
    id: "WORKSPACE.ENVIRONMENT_RELEASE.ROLLBACK",
    name: "Rollback Workspace",
    groupId: "W22",
    groupKey: "ENVIRONMENT_RELEASE",
    groupLabel: "Environment & Release Workspaces",
    archetype: "InfrastructureWorkspace"
  },
  {
    ordinal: 267,
    id: "WORKSPACE.DATABASE.DATABASE",
    name: "Database Workspace",
    groupId: "W23",
    groupKey: "DATABASE",
    groupLabel: "Database Workspaces",
    archetype: "DatabaseWorkspace"
  },
  {
    ordinal: 268,
    id: "WORKSPACE.DATABASE.DATABASE_STUDIO",
    name: "Database Studio Workspace",
    groupId: "W23",
    groupKey: "DATABASE",
    groupLabel: "Database Workspaces",
    archetype: "DatabaseWorkspace"
  },
  {
    ordinal: 269,
    id: "WORKSPACE.DATABASE.SQL",
    name: "SQL Workspace",
    groupId: "W23",
    groupKey: "DATABASE",
    groupLabel: "Database Workspaces",
    archetype: "DatabaseWorkspace"
  },
  {
    ordinal: 270,
    id: "WORKSPACE.DATABASE.POSTGRESQL",
    name: "PostgreSQL Workspace",
    groupId: "W23",
    groupKey: "DATABASE",
    groupLabel: "Database Workspaces",
    archetype: "DatabaseWorkspace"
  },
  {
    ordinal: 271,
    id: "WORKSPACE.DATABASE.SQLITE",
    name: "SQLite Workspace",
    groupId: "W23",
    groupKey: "DATABASE",
    groupLabel: "Database Workspaces",
    archetype: "DatabaseWorkspace"
  },
  {
    ordinal: 272,
    id: "WORKSPACE.DATABASE.LIBSQL",
    name: "libSQL Workspace",
    groupId: "W23",
    groupKey: "DATABASE",
    groupLabel: "Database Workspaces",
    archetype: "DatabaseWorkspace"
  },
  {
    ordinal: 273,
    id: "WORKSPACE.DATABASE.DATABASE_TARGET",
    name: "Database Target Workspace",
    groupId: "W23",
    groupKey: "DATABASE",
    groupLabel: "Database Workspaces",
    archetype: "DatabaseWorkspace"
  },
  {
    ordinal: 274,
    id: "WORKSPACE.DATABASE.SCHEMA_MIGRATION",
    name: "Schema Migration Workspace",
    groupId: "W23",
    groupKey: "DATABASE",
    groupLabel: "Database Workspaces",
    archetype: "DatabaseWorkspace"
  },
  {
    ordinal: 275,
    id: "WORKSPACE.DATABASE.MIGRATION_PLANNING",
    name: "Migration Planning Workspace",
    groupId: "W23",
    groupKey: "DATABASE",
    groupLabel: "Database Workspaces",
    archetype: "DatabaseWorkspace"
  },
  {
    ordinal: 276,
    id: "WORKSPACE.DATABASE.MIGRATION_REVIEW",
    name: "Migration Review Workspace",
    groupId: "W23",
    groupKey: "DATABASE",
    groupLabel: "Database Workspaces",
    archetype: "DatabaseWorkspace"
  },
  {
    ordinal: 277,
    id: "WORKSPACE.DATABASE.MIGRATION_EXECUTION",
    name: "Migration Execution Workspace",
    groupId: "W23",
    groupKey: "DATABASE",
    groupLabel: "Database Workspaces",
    archetype: "DatabaseWorkspace"
  },
  {
    ordinal: 278,
    id: "WORKSPACE.DATABASE.DATABASE_RECOVERY",
    name: "Database Recovery Workspace",
    groupId: "W23",
    groupKey: "DATABASE",
    groupLabel: "Database Workspaces",
    archetype: "DatabaseWorkspace"
  },
  {
    ordinal: 279,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.OBSERVABILITY",
    name: "Observability Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 280,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.METRICS",
    name: "Metrics Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 281,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.LOGS",
    name: "Logs Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 282,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.TRACES",
    name: "Traces Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 283,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.HEALTH",
    name: "Health Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 284,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.STATUS",
    name: "Status Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 285,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.ALERTS",
    name: "Alerts Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 286,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.INCIDENT",
    name: "Incident Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 287,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.RELIABILITY",
    name: "Reliability Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 288,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.SRE",
    name: "SRE Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 289,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.BACKUP",
    name: "Backup Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 290,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.RESTORE",
    name: "Restore Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 291,
    id: "WORKSPACE.RELIABILITY_OBSERVABILITY.DISASTER_RECOVERY",
    name: "Disaster Recovery Workspace",
    groupId: "W24",
    groupKey: "RELIABILITY_OBSERVABILITY",
    groupLabel: "Reliability & Observability Workspaces",
    archetype: "ObservabilityWorkspace"
  },
  {
    ordinal: 292,
    id: "WORKSPACE.SECURITY_IDENTITY.IDENTITY",
    name: "Identity Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "SecurityWorkspace"
  },
  {
    ordinal: 293,
    id: "WORKSPACE.SECURITY_IDENTITY.AUTHENTICATION",
    name: "Authentication Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "SecurityWorkspace"
  },
  {
    ordinal: 294,
    id: "WORKSPACE.SECURITY_IDENTITY.SESSION",
    name: "Session Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "SecurityWorkspace"
  },
  {
    ordinal: 295,
    id: "WORKSPACE.SECURITY_IDENTITY.USER_ACCESS",
    name: "User Access Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "SecurityWorkspace"
  },
  {
    ordinal: 296,
    id: "WORKSPACE.SECURITY_IDENTITY.ROLE",
    name: "Role Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "SecurityWorkspace"
  },
  {
    ordinal: 297,
    id: "WORKSPACE.SECURITY_IDENTITY.PERMISSION",
    name: "Permission Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "SecurityWorkspace"
  },
  {
    ordinal: 298,
    id: "WORKSPACE.SECURITY_IDENTITY.POLICY",
    name: "Policy Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "GovernanceWorkspace",
    aliasOf: "WORKSPACE.GOVERNANCE_EVIDENCE.POLICY"
  },
  {
    ordinal: 299,
    id: "WORKSPACE.SECURITY_IDENTITY.RBAC",
    name: "RBAC Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "SecurityWorkspace"
  },
  {
    ordinal: 300,
    id: "WORKSPACE.SECURITY_IDENTITY.MFA",
    name: "MFA Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "SecurityWorkspace"
  },
  {
    ordinal: 301,
    id: "WORKSPACE.SECURITY_IDENTITY.SECURITY_OPERATIONS",
    name: "Security Operations Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "SecurityWorkspace"
  },
  {
    ordinal: 302,
    id: "WORKSPACE.SECURITY_IDENTITY.SECURITY_REVIEW",
    name: "Security Review Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "SecurityWorkspace"
  },
  {
    ordinal: 303,
    id: "WORKSPACE.SECURITY_IDENTITY.SECRET_REFERENCE",
    name: "Secret Reference Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "SecurityWorkspace"
  },
  {
    ordinal: 304,
    id: "WORKSPACE.SECURITY_IDENTITY.DEVICE_SECURITY",
    name: "Device Security Workspace",
    groupId: "W25",
    groupKey: "SECURITY_IDENTITY",
    groupLabel: "Security & Identity Workspaces",
    archetype: "SecurityWorkspace"
  },
  {
    ordinal: 305,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.GOVERNANCE",
    name: "Governance Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 306,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.EVIDENCE",
    name: "Evidence Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 307,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.EVIDENCE_GATE",
    name: "Evidence Gate Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 308,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.AUDIT",
    name: "Audit Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 309,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.AUDIT_TRAIL",
    name: "Audit Trail Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 310,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.COMPLIANCE",
    name: "Compliance Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 311,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.POLICY",
    name: "Policy Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 312,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.RISK",
    name: "Risk Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 313,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.CONTROL",
    name: "Control Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 314,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.REVIEW",
    name: "Review Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace",
    aliasOf: "WORKSPACE.REVIEW_DECISION.REVIEW"
  },
  {
    ordinal: 315,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.CERTIFICATION",
    name: "Certification Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 316,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.APPROVAL",
    name: "Approval Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace",
    aliasOf: "WORKSPACE.REVIEW_DECISION.APPROVAL"
  },
  {
    ordinal: 317,
    id: "WORKSPACE.GOVERNANCE_EVIDENCE.PROVENANCE",
    name: "Provenance Workspace",
    groupId: "W26",
    groupKey: "GOVERNANCE_EVIDENCE",
    groupLabel: "Governance & Evidence Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 318,
    id: "WORKSPACE.FINANCE.FINANCE",
    name: "Finance Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 319,
    id: "WORKSPACE.FINANCE.FINANCE_COMMAND_CENTER",
    name: "Finance Command Center",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 320,
    id: "WORKSPACE.FINANCE.ACCOUNTING",
    name: "Accounting Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 321,
    id: "WORKSPACE.FINANCE.LEDGER",
    name: "Ledger Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 322,
    id: "WORKSPACE.FINANCE.BUDGET",
    name: "Budget Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 323,
    id: "WORKSPACE.FINANCE.EXPENSE",
    name: "Expense Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 324,
    id: "WORKSPACE.FINANCE.REVENUE",
    name: "Revenue Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 325,
    id: "WORKSPACE.FINANCE.CASH_FLOW",
    name: "Cash Flow Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 326,
    id: "WORKSPACE.FINANCE.FORECAST",
    name: "Forecast Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 327,
    id: "WORKSPACE.FINANCE.RECONCILIATION",
    name: "Financial Reconciliation Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 328,
    id: "WORKSPACE.FINANCE.INVOICE",
    name: "Invoice Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 329,
    id: "WORKSPACE.FINANCE.PAYMENT",
    name: "Payment Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 330,
    id: "WORKSPACE.FINANCE.PAYOUT",
    name: "Payout Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 331,
    id: "WORKSPACE.FINANCE.TAX",
    name: "Tax Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 332,
    id: "WORKSPACE.FINANCE.TREASURY",
    name: "Treasury Workspace",
    groupId: "W27",
    groupKey: "FINANCE",
    groupLabel: "Finance Workspaces",
    archetype: "FinanceWorkspace"
  },
  {
    ordinal: 333,
    id: "WORKSPACE.INVESTMENT.INVESTOR",
    name: "Investor Workspace",
    groupId: "W28",
    groupKey: "INVESTMENT",
    groupLabel: "Investment Workspaces",
    archetype: "InvestmentWorkspace"
  },
  {
    ordinal: 334,
    id: "WORKSPACE.INVESTMENT.INVESTOR_RELATIONS",
    name: "Investor Relations Workspace",
    groupId: "W28",
    groupKey: "INVESTMENT",
    groupLabel: "Investment Workspaces",
    archetype: "InvestmentWorkspace"
  },
  {
    ordinal: 335,
    id: "WORKSPACE.INVESTMENT.INVESTMENT",
    name: "Investment Workspace",
    groupId: "W28",
    groupKey: "INVESTMENT",
    groupLabel: "Investment Workspaces",
    archetype: "InvestmentWorkspace"
  },
  {
    ordinal: 336,
    id: "WORKSPACE.INVESTMENT.INVESTMENT_COMMITTEE",
    name: "Investment Committee Workspace",
    groupId: "W28",
    groupKey: "INVESTMENT",
    groupLabel: "Investment Workspaces",
    archetype: "InvestmentWorkspace"
  },
  {
    ordinal: 337,
    id: "WORKSPACE.INVESTMENT.PORTFOLIO",
    name: "Investment Portfolio Workspace",
    groupId: "W28",
    groupKey: "INVESTMENT",
    groupLabel: "Investment Workspaces",
    archetype: "InvestmentWorkspace"
  },
  {
    ordinal: 338,
    id: "WORKSPACE.INVESTMENT.FUND",
    name: "Fund Workspace",
    groupId: "W28",
    groupKey: "INVESTMENT",
    groupLabel: "Investment Workspaces",
    archetype: "InvestmentWorkspace"
  },
  {
    ordinal: 339,
    id: "WORKSPACE.INVESTMENT.FUNDRAISING",
    name: "Fundraising Workspace",
    groupId: "W28",
    groupKey: "INVESTMENT",
    groupLabel: "Investment Workspaces",
    archetype: "InvestmentWorkspace"
  },
  {
    ordinal: 340,
    id: "WORKSPACE.INVESTMENT.DEAL",
    name: "Investment Deal Workspace",
    groupId: "W28",
    groupKey: "INVESTMENT",
    groupLabel: "Investment Workspaces",
    archetype: "InvestmentWorkspace"
  },
  {
    ordinal: 341,
    id: "WORKSPACE.INVESTMENT.DUE_DILIGENCE",
    name: "Due Diligence Workspace",
    groupId: "W28",
    groupKey: "INVESTMENT",
    groupLabel: "Investment Workspaces",
    archetype: "InvestmentWorkspace"
  },
  {
    ordinal: 342,
    id: "WORKSPACE.INVESTMENT.CAP_TABLE",
    name: "Cap Table Workspace",
    groupId: "W28",
    groupKey: "INVESTMENT",
    groupLabel: "Investment Workspaces",
    archetype: "InvestmentWorkspace"
  },
  {
    ordinal: 343,
    id: "WORKSPACE.INVESTMENT.INVESTMENT_ANALYSIS",
    name: "Investment Analysis Workspace",
    groupId: "W28",
    groupKey: "INVESTMENT",
    groupLabel: "Investment Workspaces",
    archetype: "InvestmentWorkspace"
  },
  {
    ordinal: 344,
    id: "WORKSPACE.INVESTMENT.INVESTMENT_EVIDENCE",
    name: "Investment Evidence Workspace",
    groupId: "W28",
    groupKey: "INVESTMENT",
    groupLabel: "Investment Workspaces",
    archetype: "InvestmentWorkspace"
  },
  {
    ordinal: 345,
    id: "WORKSPACE.CRM_SALES.CRM",
    name: "CRM Workspace",
    groupId: "W29",
    groupKey: "CRM_SALES",
    groupLabel: "CRM & Sales Workspaces",
    archetype: "CRMWorkspace"
  },
  {
    ordinal: 346,
    id: "WORKSPACE.CRM_SALES.SALES",
    name: "Sales Workspace",
    groupId: "W29",
    groupKey: "CRM_SALES",
    groupLabel: "CRM & Sales Workspaces",
    archetype: "CRMWorkspace"
  },
  {
    ordinal: 347,
    id: "WORKSPACE.CRM_SALES.SALES_PIPELINE",
    name: "Sales Pipeline Workspace",
    groupId: "W29",
    groupKey: "CRM_SALES",
    groupLabel: "CRM & Sales Workspaces",
    archetype: "CRMWorkspace"
  },
  {
    ordinal: 348,
    id: "WORKSPACE.CRM_SALES.LEAD",
    name: "Lead Workspace",
    groupId: "W29",
    groupKey: "CRM_SALES",
    groupLabel: "CRM & Sales Workspaces",
    archetype: "CRMWorkspace"
  },
  {
    ordinal: 349,
    id: "WORKSPACE.CRM_SALES.ACCOUNT",
    name: "Account Workspace",
    groupId: "W29",
    groupKey: "CRM_SALES",
    groupLabel: "CRM & Sales Workspaces",
    archetype: "CRMWorkspace"
  },
  {
    ordinal: 350,
    id: "WORKSPACE.CRM_SALES.OPPORTUNITY",
    name: "Opportunity Workspace",
    groupId: "W29",
    groupKey: "CRM_SALES",
    groupLabel: "CRM & Sales Workspaces",
    archetype: "CRMWorkspace"
  },
  {
    ordinal: 351,
    id: "WORKSPACE.CRM_SALES.DEAL",
    name: "Sales Deal Workspace",
    groupId: "W29",
    groupKey: "CRM_SALES",
    groupLabel: "CRM & Sales Workspaces",
    archetype: "CRMWorkspace"
  },
  {
    ordinal: 352,
    id: "WORKSPACE.CRM_SALES.CUSTOMER",
    name: "Customer Workspace",
    groupId: "W29",
    groupKey: "CRM_SALES",
    groupLabel: "CRM & Sales Workspaces",
    archetype: "CRMWorkspace"
  },
  {
    ordinal: 353,
    id: "WORKSPACE.CRM_SALES.CONTACT",
    name: "Contact Workspace",
    groupId: "W29",
    groupKey: "CRM_SALES",
    groupLabel: "CRM & Sales Workspaces",
    archetype: "CRMWorkspace"
  },
  {
    ordinal: 354,
    id: "WORKSPACE.CRM_SALES.SALES_FORECAST",
    name: "Sales Forecast Workspace",
    groupId: "W29",
    groupKey: "CRM_SALES",
    groupLabel: "CRM & Sales Workspaces",
    archetype: "CRMWorkspace"
  },
  {
    ordinal: 355,
    id: "WORKSPACE.CRM_SALES.SALES_OPERATIONS",
    name: "Sales Operations Workspace",
    groupId: "W29",
    groupKey: "CRM_SALES",
    groupLabel: "CRM & Sales Workspaces",
    archetype: "CRMWorkspace"
  },
  {
    ordinal: 356,
    id: "WORKSPACE.CRM_SALES.CUSTOMER_SUCCESS",
    name: "Customer Success Workspace",
    groupId: "W29",
    groupKey: "CRM_SALES",
    groupLabel: "CRM & Sales Workspaces",
    archetype: "CRMWorkspace"
  },
  {
    ordinal: 357,
    id: "WORKSPACE.MARKETING.MARKETING",
    name: "Marketing Workspace",
    groupId: "W30",
    groupKey: "MARKETING",
    groupLabel: "Marketing Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 358,
    id: "WORKSPACE.MARKETING.CAMPAIGN",
    name: "Campaign Workspace",
    groupId: "W30",
    groupKey: "MARKETING",
    groupLabel: "Marketing Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 359,
    id: "WORKSPACE.MARKETING.CAMPAIGN_PLANNING",
    name: "Campaign Planning Workspace",
    groupId: "W30",
    groupKey: "MARKETING",
    groupLabel: "Marketing Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 360,
    id: "WORKSPACE.MARKETING.CAMPAIGN_EXECUTION",
    name: "Campaign Execution Workspace",
    groupId: "W30",
    groupKey: "MARKETING",
    groupLabel: "Marketing Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 361,
    id: "WORKSPACE.MARKETING.BRAND",
    name: "Brand Workspace",
    groupId: "W30",
    groupKey: "MARKETING",
    groupLabel: "Marketing Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 362,
    id: "WORKSPACE.MARKETING.CONTENT_MARKETING",
    name: "Content Marketing Workspace",
    groupId: "W30",
    groupKey: "MARKETING",
    groupLabel: "Marketing Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 363,
    id: "WORKSPACE.MARKETING.SOCIAL_MEDIA",
    name: "Social Media Workspace",
    groupId: "W30",
    groupKey: "MARKETING",
    groupLabel: "Marketing Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 364,
    id: "WORKSPACE.MARKETING.ADVERTISING",
    name: "Advertising Workspace",
    groupId: "W30",
    groupKey: "MARKETING",
    groupLabel: "Marketing Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 365,
    id: "WORKSPACE.MARKETING.SEO",
    name: "SEO Workspace",
    groupId: "W30",
    groupKey: "MARKETING",
    groupLabel: "Marketing Workspaces",
    archetype: "DocumentWorkspace",
    aliasOf: "WORKSPACE.CMS_PUBLISHING.SEO"
  },
  {
    ordinal: 366,
    id: "WORKSPACE.MARKETING.MARKETING_AUTOMATION",
    name: "Marketing Automation Workspace",
    groupId: "W30",
    groupKey: "MARKETING",
    groupLabel: "Marketing Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 367,
    id: "WORKSPACE.MARKETING.MARKETING_ANALYTICS",
    name: "Marketing Analytics Workspace",
    groupId: "W30",
    groupKey: "MARKETING",
    groupLabel: "Marketing Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 368,
    id: "WORKSPACE.MARKETING.AUDIENCE",
    name: "Audience Workspace",
    groupId: "W30",
    groupKey: "MARKETING",
    groupLabel: "Marketing Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 369,
    id: "WORKSPACE.COMMERCE.COMMERCE",
    name: "Commerce Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 370,
    id: "WORKSPACE.COMMERCE.STORE",
    name: "Store Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 371,
    id: "WORKSPACE.COMMERCE.CATALOG",
    name: "Catalog Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 372,
    id: "WORKSPACE.COMMERCE.PRODUCT",
    name: "Product Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 373,
    id: "WORKSPACE.COMMERCE.SKU",
    name: "SKU Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 374,
    id: "WORKSPACE.COMMERCE.CART_OPERATIONS",
    name: "Cart Operations Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 375,
    id: "WORKSPACE.COMMERCE.ORDER",
    name: "Order Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 376,
    id: "WORKSPACE.COMMERCE.CHECKOUT",
    name: "Checkout Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 377,
    id: "WORKSPACE.COMMERCE.FULFILMENT",
    name: "Fulfilment Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 378,
    id: "WORKSPACE.COMMERCE.RETURNS",
    name: "Returns Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 379,
    id: "WORKSPACE.COMMERCE.PRICING",
    name: "Pricing Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 380,
    id: "WORKSPACE.COMMERCE.PROMOTION",
    name: "Promotion Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 381,
    id: "WORKSPACE.COMMERCE.INVENTORY",
    name: "Product Inventory Workspace",
    groupId: "W31",
    groupKey: "COMMERCE",
    groupLabel: "Commerce Workspaces",
    archetype: "CommerceWorkspace"
  },
  {
    ordinal: 382,
    id: "WORKSPACE.MARKETPLACE.MARKETPLACE",
    name: "Marketplace Workspace",
    groupId: "W32",
    groupKey: "MARKETPLACE",
    groupLabel: "Marketplace Workspaces",
    archetype: "MarketplaceWorkspace"
  },
  {
    ordinal: 383,
    id: "WORKSPACE.MARKETPLACE.VENDOR_MARKETPLACE",
    name: "Vendor Marketplace Workspace",
    groupId: "W32",
    groupKey: "MARKETPLACE",
    groupLabel: "Marketplace Workspaces",
    archetype: "MarketplaceWorkspace"
  },
  {
    ordinal: 384,
    id: "WORKSPACE.MARKETPLACE.VENDOR_DIRECTORY",
    name: "Vendor Directory Workspace",
    groupId: "W32",
    groupKey: "MARKETPLACE",
    groupLabel: "Marketplace Workspaces",
    archetype: "MarketplaceWorkspace"
  },
  {
    ordinal: 385,
    id: "WORKSPACE.MARKETPLACE.SERVICE_MARKETPLACE",
    name: "Service Marketplace Workspace",
    groupId: "W32",
    groupKey: "MARKETPLACE",
    groupLabel: "Marketplace Workspaces",
    archetype: "MarketplaceWorkspace"
  },
  {
    ordinal: 386,
    id: "WORKSPACE.MARKETPLACE.PRODUCT_MARKETPLACE",
    name: "Product Marketplace Workspace",
    groupId: "W32",
    groupKey: "MARKETPLACE",
    groupLabel: "Marketplace Workspaces",
    archetype: "MarketplaceWorkspace"
  },
  {
    ordinal: 387,
    id: "WORKSPACE.MARKETPLACE.VENDOR",
    name: "Vendor Workspace",
    groupId: "W32",
    groupKey: "MARKETPLACE",
    groupLabel: "Marketplace Workspaces",
    archetype: "MarketplaceWorkspace"
  },
  {
    ordinal: 388,
    id: "WORKSPACE.MARKETPLACE.VENDOR_ONBOARDING",
    name: "Vendor Onboarding Workspace",
    groupId: "W32",
    groupKey: "MARKETPLACE",
    groupLabel: "Marketplace Workspaces",
    archetype: "MarketplaceWorkspace"
  },
  {
    ordinal: 389,
    id: "WORKSPACE.MARKETPLACE.VENDOR_OPERATIONS",
    name: "Vendor Operations Workspace",
    groupId: "W32",
    groupKey: "MARKETPLACE",
    groupLabel: "Marketplace Workspaces",
    archetype: "MarketplaceWorkspace"
  },
  {
    ordinal: 390,
    id: "WORKSPACE.MARKETPLACE.SERVICE_CATALOG",
    name: "Service Catalog Workspace",
    groupId: "W32",
    groupKey: "MARKETPLACE",
    groupLabel: "Marketplace Workspaces",
    archetype: "MarketplaceWorkspace"
  },
  {
    ordinal: 391,
    id: "WORKSPACE.MARKETPLACE.CAPABILITY",
    name: "Capability Workspace",
    groupId: "W32",
    groupKey: "MARKETPLACE",
    groupLabel: "Marketplace Workspaces",
    archetype: "MarketplaceWorkspace"
  },
  {
    ordinal: 392,
    id: "WORKSPACE.MARKETPLACE.RATE",
    name: "Rate Workspace",
    groupId: "W32",
    groupKey: "MARKETPLACE",
    groupLabel: "Marketplace Workspaces",
    archetype: "MarketplaceWorkspace"
  },
  {
    ordinal: 393,
    id: "WORKSPACE.MARKETPLACE.COMPARISON",
    name: "Comparison Workspace",
    groupId: "W32",
    groupKey: "MARKETPLACE",
    groupLabel: "Marketplace Workspaces",
    archetype: "GovernanceWorkspace",
    aliasOf: "WORKSPACE.REVIEW_DECISION.COMPARISON"
  },
  {
    ordinal: 394,
    id: "WORKSPACE.BOOKING.BOOKING",
    name: "Booking Workspace",
    groupId: "W33",
    groupKey: "BOOKING",
    groupLabel: "Booking Workspaces",
    archetype: "BookingWorkspace"
  },
  {
    ordinal: 395,
    id: "WORKSPACE.BOOKING.BOOKING_BUILDER",
    name: "Booking Builder Workspace",
    groupId: "W33",
    groupKey: "BOOKING",
    groupLabel: "Booking Workspaces",
    archetype: "BookingWorkspace"
  },
  {
    ordinal: 396,
    id: "WORKSPACE.BOOKING.BOOKING_OPERATIONS",
    name: "Booking Operations Workspace",
    groupId: "W33",
    groupKey: "BOOKING",
    groupLabel: "Booking Workspaces",
    archetype: "BookingWorkspace"
  },
  {
    ordinal: 397,
    id: "WORKSPACE.BOOKING.AVAILABILITY",
    name: "Availability Workspace",
    groupId: "W33",
    groupKey: "BOOKING",
    groupLabel: "Booking Workspaces",
    archetype: "BookingWorkspace"
  },
  {
    ordinal: 398,
    id: "WORKSPACE.BOOKING.RESERVATION",
    name: "Reservation Workspace",
    groupId: "W33",
    groupKey: "BOOKING",
    groupLabel: "Booking Workspaces",
    archetype: "BookingWorkspace"
  },
  {
    ordinal: 399,
    id: "WORKSPACE.BOOKING.QUOTE",
    name: "Quote Workspace",
    groupId: "W33",
    groupKey: "BOOKING",
    groupLabel: "Booking Workspaces",
    archetype: "BookingWorkspace"
  },
  {
    ordinal: 400,
    id: "WORKSPACE.BOOKING.PROPOSAL",
    name: "Proposal Workspace",
    groupId: "W33",
    groupKey: "BOOKING",
    groupLabel: "Booking Workspaces",
    archetype: "BookingWorkspace"
  },
  {
    ordinal: 401,
    id: "WORKSPACE.BOOKING.RATE_REVIEW",
    name: "Rate Review Workspace",
    groupId: "W33",
    groupKey: "BOOKING",
    groupLabel: "Booking Workspaces",
    archetype: "BookingWorkspace"
  },
  {
    ordinal: 402,
    id: "WORKSPACE.BOOKING.CONFIRMATION",
    name: "Confirmation Workspace",
    groupId: "W33",
    groupKey: "BOOKING",
    groupLabel: "Booking Workspaces",
    archetype: "BookingWorkspace"
  },
  {
    ordinal: 403,
    id: "WORKSPACE.BOOKING.BOOKING_FULFILMENT",
    name: "Booking Fulfilment Workspace",
    groupId: "W33",
    groupKey: "BOOKING",
    groupLabel: "Booking Workspaces",
    archetype: "BookingWorkspace"
  },
  {
    ordinal: 404,
    id: "WORKSPACE.BOOKING.BOOKING_SETTLEMENT",
    name: "Booking Settlement Workspace",
    groupId: "W33",
    groupKey: "BOOKING",
    groupLabel: "Booking Workspaces",
    archetype: "BookingWorkspace"
  },
  {
    ordinal: 405,
    id: "WORKSPACE.EVENT.EVENT",
    name: "Event Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 406,
    id: "WORKSPACE.EVENT.EVENT_BUILDER",
    name: "Event Builder Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 407,
    id: "WORKSPACE.EVENT.EVENT_COMMAND_CENTER",
    name: "Event Command Center",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 408,
    id: "WORKSPACE.EVENT.EVENT_PLANNING",
    name: "Event Planning Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 409,
    id: "WORKSPACE.EVENT.EVENT_PRODUCTION",
    name: "Event Production Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 410,
    id: "WORKSPACE.EVENT.EVENT_SCHEDULE",
    name: "Event Schedule Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 411,
    id: "WORKSPACE.EVENT.EVENT_GUEST",
    name: "Event Guest Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 412,
    id: "WORKSPACE.EVENT.EVENT_VENDOR",
    name: "Event Vendor Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 413,
    id: "WORKSPACE.EVENT.EVENT_SERVICE",
    name: "Event Service Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 414,
    id: "WORKSPACE.EVENT.EVENT_VENUE",
    name: "Event Venue Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 415,
    id: "WORKSPACE.EVENT.EVENT_SPATIAL",
    name: "Event Spatial Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 416,
    id: "WORKSPACE.EVENT.EVENT_SPONSORSHIP",
    name: "Event Sponsorship Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 417,
    id: "WORKSPACE.EVENT.EVENT_ROI",
    name: "Event ROI Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 418,
    id: "WORKSPACE.EVENT.EVENT_SETTLEMENT",
    name: "Event Settlement Workspace",
    groupId: "W34",
    groupKey: "EVENT",
    groupLabel: "Event Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 419,
    id: "WORKSPACE.LOCATION_VENUE.LOCATION",
    name: "Venue Location Workspace",
    groupId: "W38",
    groupKey: "LOCATION_VENUE",
    groupLabel: "Location & Venue Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 420,
    id: "WORKSPACE.LOCATION_VENUE.LOCATION_SCOUT",
    name: "Location Scout Workspace",
    groupId: "W38",
    groupKey: "LOCATION_VENUE",
    groupLabel: "Location & Venue Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 421,
    id: "WORKSPACE.LOCATION_VENUE.LOCATION_LIBRARY",
    name: "Location Library Workspace",
    groupId: "W38",
    groupKey: "LOCATION_VENUE",
    groupLabel: "Location & Venue Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 422,
    id: "WORKSPACE.LOCATION_VENUE.VENUE",
    name: "Venue Workspace",
    groupId: "W38",
    groupKey: "LOCATION_VENUE",
    groupLabel: "Location & Venue Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 423,
    id: "WORKSPACE.LOCATION_VENUE.VENUE_SEARCH",
    name: "Venue Search Workspace",
    groupId: "W38",
    groupKey: "LOCATION_VENUE",
    groupLabel: "Location & Venue Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 424,
    id: "WORKSPACE.LOCATION_VENUE.VENUE_COMPARISON",
    name: "Venue Comparison Workspace",
    groupId: "W38",
    groupKey: "LOCATION_VENUE",
    groupLabel: "Location & Venue Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 425,
    id: "WORKSPACE.LOCATION_VENUE.VENUE_PLANNING",
    name: "Venue Planning Workspace",
    groupId: "W38",
    groupKey: "LOCATION_VENUE",
    groupLabel: "Location & Venue Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 426,
    id: "WORKSPACE.LOCATION_VENUE.VENUE_FLOOR_PLAN",
    name: "Venue Floor Plan Workspace",
    groupId: "W38",
    groupKey: "LOCATION_VENUE",
    groupLabel: "Location & Venue Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 427,
    id: "WORKSPACE.LOCATION_VENUE.LOCATION_APPROVAL",
    name: "Location Approval Workspace",
    groupId: "W38",
    groupKey: "LOCATION_VENUE",
    groupLabel: "Location & Venue Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 428,
    id: "WORKSPACE.LOCATION_VENUE.PERMIT",
    name: "Permit Workspace",
    groupId: "W38",
    groupKey: "LOCATION_VENUE",
    groupLabel: "Location & Venue Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 429,
    id: "WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS",
    name: "Logistics Workspace",
    groupId: "W39",
    groupKey: "EQUIPMENT_LOGISTICS",
    groupLabel: "Equipment & Logistics Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 430,
    id: "WORKSPACE.EQUIPMENT_LOGISTICS.LOGISTICS_COMMAND_CENTER",
    name: "Logistics Command Center",
    groupId: "W39",
    groupKey: "EQUIPMENT_LOGISTICS",
    groupLabel: "Equipment & Logistics Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 431,
    id: "WORKSPACE.EQUIPMENT_LOGISTICS.EQUIPMENT",
    name: "Equipment Workspace",
    groupId: "W39",
    groupKey: "EQUIPMENT_LOGISTICS",
    groupLabel: "Equipment & Logistics Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 432,
    id: "WORKSPACE.EQUIPMENT_LOGISTICS.INVENTORY",
    name: "Equipment Inventory Workspace",
    groupId: "W39",
    groupKey: "EQUIPMENT_LOGISTICS",
    groupLabel: "Equipment & Logistics Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 433,
    id: "WORKSPACE.EQUIPMENT_LOGISTICS.EQUIPMENT_ASSIGNMENT",
    name: "Equipment Assignment Workspace",
    groupId: "W39",
    groupKey: "EQUIPMENT_LOGISTICS",
    groupLabel: "Equipment & Logistics Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 434,
    id: "WORKSPACE.EQUIPMENT_LOGISTICS.TRANSPORT",
    name: "Transport Workspace",
    groupId: "W39",
    groupKey: "EQUIPMENT_LOGISTICS",
    groupLabel: "Equipment & Logistics Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 435,
    id: "WORKSPACE.EQUIPMENT_LOGISTICS.TRAVEL",
    name: "Travel Workspace",
    groupId: "W39",
    groupKey: "EQUIPMENT_LOGISTICS",
    groupLabel: "Equipment & Logistics Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 436,
    id: "WORKSPACE.EQUIPMENT_LOGISTICS.ACCOMMODATION",
    name: "Accommodation Workspace",
    groupId: "W39",
    groupKey: "EQUIPMENT_LOGISTICS",
    groupLabel: "Equipment & Logistics Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 437,
    id: "WORKSPACE.EQUIPMENT_LOGISTICS.ROUTE",
    name: "Route Workspace",
    groupId: "W39",
    groupKey: "EQUIPMENT_LOGISTICS",
    groupLabel: "Equipment & Logistics Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 438,
    id: "WORKSPACE.EQUIPMENT_LOGISTICS.SHIPMENT",
    name: "Shipment Workspace",
    groupId: "W39",
    groupKey: "EQUIPMENT_LOGISTICS",
    groupLabel: "Equipment & Logistics Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 439,
    id: "WORKSPACE.EQUIPMENT_LOGISTICS.PERMIT",
    name: "Permit Workspace",
    groupId: "W39",
    groupKey: "EQUIPMENT_LOGISTICS",
    groupLabel: "Equipment & Logistics Workspaces",
    archetype: "ProductionWorkspace",
    aliasOf: "WORKSPACE.LOCATION_VENUE.PERMIT"
  },
  {
    ordinal: 440,
    id: "WORKSPACE.EQUIPMENT_LOGISTICS.INSURANCE",
    name: "Insurance Workspace",
    groupId: "W39",
    groupKey: "EQUIPMENT_LOGISTICS",
    groupLabel: "Equipment & Logistics Workspaces",
    archetype: "ProductionWorkspace"
  },
  {
    ordinal: 441,
    id: "WORKSPACE.EVENT_GUEST.GUEST",
    name: "Guest Workspace",
    groupId: "W40",
    groupKey: "EVENT_GUEST",
    groupLabel: "Event Guest Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 442,
    id: "WORKSPACE.EVENT_GUEST.GUEST_DIRECTORY",
    name: "Guest Directory Workspace",
    groupId: "W40",
    groupKey: "EVENT_GUEST",
    groupLabel: "Event Guest Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 443,
    id: "WORKSPACE.EVENT_GUEST.INVITATION",
    name: "Invitation Workspace",
    groupId: "W40",
    groupKey: "EVENT_GUEST",
    groupLabel: "Event Guest Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 444,
    id: "WORKSPACE.EVENT_GUEST.RSVP",
    name: "RSVP Workspace",
    groupId: "W40",
    groupKey: "EVENT_GUEST",
    groupLabel: "Event Guest Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 445,
    id: "WORKSPACE.EVENT_GUEST.GUEST_JOURNEY",
    name: "Guest Journey Workspace",
    groupId: "W40",
    groupKey: "EVENT_GUEST",
    groupLabel: "Event Guest Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 446,
    id: "WORKSPACE.EVENT_GUEST.CHECK_IN",
    name: "Check-In Workspace",
    groupId: "W40",
    groupKey: "EVENT_GUEST",
    groupLabel: "Event Guest Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 447,
    id: "WORKSPACE.EVENT_GUEST.ACCESS",
    name: "Access Workspace",
    groupId: "W40",
    groupKey: "EVENT_GUEST",
    groupLabel: "Event Guest Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 448,
    id: "WORKSPACE.EVENT_GUEST.SEATING",
    name: "Seating Workspace",
    groupId: "W40",
    groupKey: "EVENT_GUEST",
    groupLabel: "Event Guest Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 449,
    id: "WORKSPACE.EVENT_GUEST.HOSPITALITY",
    name: "Hospitality Workspace",
    groupId: "W40",
    groupKey: "EVENT_GUEST",
    groupLabel: "Event Guest Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 450,
    id: "WORKSPACE.EVENT_GUEST.VIP",
    name: "VIP Workspace",
    groupId: "W40",
    groupKey: "EVENT_GUEST",
    groupLabel: "Event Guest Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 451,
    id: "WORKSPACE.SPONSORSHIP.SPONSORSHIP",
    name: "Sponsorship Workspace",
    groupId: "W41",
    groupKey: "SPONSORSHIP",
    groupLabel: "Sponsorship Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 452,
    id: "WORKSPACE.SPONSORSHIP.SPONSOR",
    name: "Sponsor Workspace",
    groupId: "W41",
    groupKey: "SPONSORSHIP",
    groupLabel: "Sponsorship Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 453,
    id: "WORKSPACE.SPONSORSHIP.SPONSOR_PIPELINE",
    name: "Sponsor Pipeline Workspace",
    groupId: "W41",
    groupKey: "SPONSORSHIP",
    groupLabel: "Sponsorship Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 454,
    id: "WORKSPACE.SPONSORSHIP.SPONSOR_PACKAGE",
    name: "Sponsor Package Workspace",
    groupId: "W41",
    groupKey: "SPONSORSHIP",
    groupLabel: "Sponsorship Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 455,
    id: "WORKSPACE.SPONSORSHIP.SPONSOR_ACTIVATION",
    name: "Sponsor Activation Workspace",
    groupId: "W41",
    groupKey: "SPONSORSHIP",
    groupLabel: "Sponsorship Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 456,
    id: "WORKSPACE.SPONSORSHIP.DELIVERABLES",
    name: "Deliverables Workspace",
    groupId: "W41",
    groupKey: "SPONSORSHIP",
    groupLabel: "Sponsorship Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 457,
    id: "WORKSPACE.SPONSORSHIP.BRAND_PLACEMENT",
    name: "Brand Placement Workspace",
    groupId: "W41",
    groupKey: "SPONSORSHIP",
    groupLabel: "Sponsorship Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 458,
    id: "WORKSPACE.SPONSORSHIP.SPONSORSHIP_ROI",
    name: "Sponsorship ROI Workspace",
    groupId: "W41",
    groupKey: "SPONSORSHIP",
    groupLabel: "Sponsorship Workspaces",
    archetype: "EventWorkspace"
  },
  {
    ordinal: 459,
    id: "WORKSPACE.EDUCATION.LEARNING",
    name: "Learning Workspace",
    groupId: "W42",
    groupKey: "EDUCATION",
    groupLabel: "Education Workspaces",
    archetype: "EducationWorkspace"
  },
  {
    ordinal: 460,
    id: "WORKSPACE.EDUCATION.COURSE",
    name: "Course Workspace",
    groupId: "W42",
    groupKey: "EDUCATION",
    groupLabel: "Education Workspaces",
    archetype: "EducationWorkspace"
  },
  {
    ordinal: 461,
    id: "WORKSPACE.EDUCATION.CLASSROOM",
    name: "Classroom Workspace",
    groupId: "W42",
    groupKey: "EDUCATION",
    groupLabel: "Education Workspaces",
    archetype: "EducationWorkspace"
  },
  {
    ordinal: 462,
    id: "WORKSPACE.EDUCATION.LESSON",
    name: "Lesson Workspace",
    groupId: "W42",
    groupKey: "EDUCATION",
    groupLabel: "Education Workspaces",
    archetype: "EducationWorkspace"
  },
  {
    ordinal: 463,
    id: "WORKSPACE.EDUCATION.ASSIGNMENT",
    name: "Assignment Workspace",
    groupId: "W42",
    groupKey: "EDUCATION",
    groupLabel: "Education Workspaces",
    archetype: "EducationWorkspace"
  },
  {
    ordinal: 464,
    id: "WORKSPACE.EDUCATION.QUIZ",
    name: "Quiz Workspace",
    groupId: "W42",
    groupKey: "EDUCATION",
    groupLabel: "Education Workspaces",
    archetype: "EducationWorkspace"
  },
  {
    ordinal: 465,
    id: "WORKSPACE.EDUCATION.EXAM",
    name: "Exam Workspace",
    groupId: "W42",
    groupKey: "EDUCATION",
    groupLabel: "Education Workspaces",
    archetype: "EducationWorkspace"
  },
  {
    ordinal: 466,
    id: "WORKSPACE.EDUCATION.STUDENT",
    name: "Student Workspace",
    groupId: "W42",
    groupKey: "EDUCATION",
    groupLabel: "Education Workspaces",
    archetype: "EducationWorkspace"
  },
  {
    ordinal: 467,
    id: "WORKSPACE.EDUCATION.TEACHER",
    name: "Teacher Workspace",
    groupId: "W42",
    groupKey: "EDUCATION",
    groupLabel: "Education Workspaces",
    archetype: "EducationWorkspace"
  },
  {
    ordinal: 468,
    id: "WORKSPACE.EDUCATION.PROGRESS",
    name: "Progress Workspace",
    groupId: "W42",
    groupKey: "EDUCATION",
    groupLabel: "Education Workspaces",
    archetype: "EducationWorkspace"
  },
  {
    ordinal: 469,
    id: "WORKSPACE.EDUCATION.CERTIFICATE",
    name: "Certificate Workspace",
    groupId: "W42",
    groupKey: "EDUCATION",
    groupLabel: "Education Workspaces",
    archetype: "EducationWorkspace"
  },
  {
    ordinal: 470,
    id: "WORKSPACE.EDUCATION.CURRICULUM",
    name: "Curriculum Workspace",
    groupId: "W42",
    groupKey: "EDUCATION",
    groupLabel: "Education Workspaces",
    archetype: "EducationWorkspace"
  },
  {
    ordinal: 471,
    id: "WORKSPACE.COMMUNITY.COMMUNITY",
    name: "Community Workspace",
    groupId: "W43",
    groupKey: "COMMUNITY",
    groupLabel: "Community Workspaces",
    archetype: "CommunityWorkspace"
  },
  {
    ordinal: 472,
    id: "WORKSPACE.COMMUNITY.MEMBER",
    name: "Member Workspace",
    groupId: "W43",
    groupKey: "COMMUNITY",
    groupLabel: "Community Workspaces",
    archetype: "CommunityWorkspace"
  },
  {
    ordinal: 473,
    id: "WORKSPACE.COMMUNITY.FORUM",
    name: "Forum Workspace",
    groupId: "W43",
    groupKey: "COMMUNITY",
    groupLabel: "Community Workspaces",
    archetype: "CommunityWorkspace"
  },
  {
    ordinal: 474,
    id: "WORKSPACE.COMMUNITY.DISCUSSION",
    name: "Discussion Workspace",
    groupId: "W43",
    groupKey: "COMMUNITY",
    groupLabel: "Community Workspaces",
    archetype: "CommunityWorkspace"
  },
  {
    ordinal: 475,
    id: "WORKSPACE.COMMUNITY.FEED",
    name: "Feed Workspace",
    groupId: "W43",
    groupKey: "COMMUNITY",
    groupLabel: "Community Workspaces",
    archetype: "CommunityWorkspace"
  },
  {
    ordinal: 476,
    id: "WORKSPACE.COMMUNITY.GROUP",
    name: "Group Workspace",
    groupId: "W43",
    groupKey: "COMMUNITY",
    groupLabel: "Community Workspaces",
    archetype: "CommunityWorkspace"
  },
  {
    ordinal: 477,
    id: "WORKSPACE.COMMUNITY.COMMUNITY_MODERATION",
    name: "Community Moderation Workspace",
    groupId: "W43",
    groupKey: "COMMUNITY",
    groupLabel: "Community Workspaces",
    archetype: "CommunityWorkspace"
  },
  {
    ordinal: 478,
    id: "WORKSPACE.COMMUNITY.COMMUNITY_EVENTS",
    name: "Community Events Workspace",
    groupId: "W43",
    groupKey: "COMMUNITY",
    groupLabel: "Community Workspaces",
    archetype: "CommunityWorkspace"
  },
  {
    ordinal: 479,
    id: "WORKSPACE.SUPPORT.SUPPORT",
    name: "Support Workspace",
    groupId: "W44",
    groupKey: "SUPPORT",
    groupLabel: "Support Workspaces",
    archetype: "SupportWorkspace"
  },
  {
    ordinal: 480,
    id: "WORKSPACE.SUPPORT.HELP_DESK",
    name: "Help Desk Workspace",
    groupId: "W44",
    groupKey: "SUPPORT",
    groupLabel: "Support Workspaces",
    archetype: "SupportWorkspace"
  },
  {
    ordinal: 481,
    id: "WORKSPACE.SUPPORT.TICKET",
    name: "Ticket Workspace",
    groupId: "W44",
    groupKey: "SUPPORT",
    groupLabel: "Support Workspaces",
    archetype: "SupportWorkspace"
  },
  {
    ordinal: 482,
    id: "WORKSPACE.SUPPORT.SERVICE_DESK",
    name: "Service Desk Workspace",
    groupId: "W44",
    groupKey: "SUPPORT",
    groupLabel: "Support Workspaces",
    archetype: "SupportWorkspace"
  },
  {
    ordinal: 483,
    id: "WORKSPACE.SUPPORT.CUSTOMER_SUPPORT",
    name: "Customer Support Workspace",
    groupId: "W44",
    groupKey: "SUPPORT",
    groupLabel: "Support Workspaces",
    archetype: "SupportWorkspace"
  },
  {
    ordinal: 484,
    id: "WORKSPACE.SUPPORT.KNOWLEDGE_SUPPORT",
    name: "Knowledge Support Workspace",
    groupId: "W44",
    groupKey: "SUPPORT",
    groupLabel: "Support Workspaces",
    archetype: "SupportWorkspace"
  },
  {
    ordinal: 485,
    id: "WORKSPACE.SUPPORT.INCIDENT_SUPPORT",
    name: "Incident Support Workspace",
    groupId: "W44",
    groupKey: "SUPPORT",
    groupLabel: "Support Workspaces",
    archetype: "SupportWorkspace"
  },
  {
    ordinal: 486,
    id: "WORKSPACE.SUPPORT.SLA",
    name: "SLA Workspace",
    groupId: "W44",
    groupKey: "SUPPORT",
    groupLabel: "Support Workspaces",
    archetype: "SupportWorkspace"
  },
  {
    ordinal: 487,
    id: "WORKSPACE.SUPPORT.ESCALATION",
    name: "Escalation Workspace",
    groupId: "W44",
    groupKey: "SUPPORT",
    groupLabel: "Support Workspaces",
    archetype: "SupportWorkspace"
  },
  {
    ordinal: 488,
    id: "WORKSPACE.CMS_PUBLISHING.CMS",
    name: "CMS Workspace",
    groupId: "W45",
    groupKey: "CMS_PUBLISHING",
    groupLabel: "CMS & Publishing Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 489,
    id: "WORKSPACE.CMS_PUBLISHING.CONTENT_COLLECTION",
    name: "Content Collection Workspace",
    groupId: "W45",
    groupKey: "CMS_PUBLISHING",
    groupLabel: "CMS & Publishing Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 490,
    id: "WORKSPACE.CMS_PUBLISHING.CONTENT_ENTRY",
    name: "Content Entry Workspace",
    groupId: "W45",
    groupKey: "CMS_PUBLISHING",
    groupLabel: "CMS & Publishing Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 491,
    id: "WORKSPACE.CMS_PUBLISHING.EDITORIAL",
    name: "Editorial Workspace",
    groupId: "W45",
    groupKey: "CMS_PUBLISHING",
    groupLabel: "CMS & Publishing Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 492,
    id: "WORKSPACE.CMS_PUBLISHING.PUBLISHING",
    name: "Publishing Workspace",
    groupId: "W45",
    groupKey: "CMS_PUBLISHING",
    groupLabel: "CMS & Publishing Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 493,
    id: "WORKSPACE.CMS_PUBLISHING.SEO",
    name: "SEO Workspace",
    groupId: "W45",
    groupKey: "CMS_PUBLISHING",
    groupLabel: "CMS & Publishing Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 494,
    id: "WORKSPACE.CMS_PUBLISHING.LOCALIZATION",
    name: "Localization Workspace",
    groupId: "W45",
    groupKey: "CMS_PUBLISHING",
    groupLabel: "CMS & Publishing Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 495,
    id: "WORKSPACE.CMS_PUBLISHING.TRANSLATION",
    name: "Translation Workspace",
    groupId: "W45",
    groupKey: "CMS_PUBLISHING",
    groupLabel: "CMS & Publishing Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 496,
    id: "WORKSPACE.CMS_PUBLISHING.REDIRECT",
    name: "Redirect Workspace",
    groupId: "W45",
    groupKey: "CMS_PUBLISHING",
    groupLabel: "CMS & Publishing Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 497,
    id: "WORKSPACE.CMS_PUBLISHING.CONTENT_APPROVAL",
    name: "Content Approval Workspace",
    groupId: "W45",
    groupKey: "CMS_PUBLISHING",
    groupLabel: "CMS & Publishing Workspaces",
    archetype: "DocumentWorkspace"
  },
  {
    ordinal: 498,
    id: "WORKSPACE.PUBLIC_SITE.WEBSITE",
    name: "Website Workspace",
    groupId: "W46",
    groupKey: "PUBLIC_SITE",
    groupLabel: "Public-Site Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 499,
    id: "WORKSPACE.PUBLIC_SITE.LANDING_PAGE",
    name: "Landing Page Workspace",
    groupId: "W46",
    groupKey: "PUBLIC_SITE",
    groupLabel: "Public-Site Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 500,
    id: "WORKSPACE.PUBLIC_SITE.MARKETING_SITE",
    name: "Marketing Site Workspace",
    groupId: "W46",
    groupKey: "PUBLIC_SITE",
    groupLabel: "Public-Site Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 501,
    id: "WORKSPACE.PUBLIC_SITE.DOCUMENTATION_SITE",
    name: "Documentation Site Workspace",
    groupId: "W46",
    groupKey: "PUBLIC_SITE",
    groupLabel: "Public-Site Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 502,
    id: "WORKSPACE.PUBLIC_SITE.NEWS_SITE",
    name: "News Site Workspace",
    groupId: "W46",
    groupKey: "PUBLIC_SITE",
    groupLabel: "Public-Site Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 503,
    id: "WORKSPACE.PUBLIC_SITE.BLOG",
    name: "Blog Workspace",
    groupId: "W46",
    groupKey: "PUBLIC_SITE",
    groupLabel: "Public-Site Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 504,
    id: "WORKSPACE.PUBLIC_SITE.PORTFOLIO_SITE",
    name: "Portfolio Site Workspace",
    groupId: "W46",
    groupKey: "PUBLIC_SITE",
    groupLabel: "Public-Site Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 505,
    id: "WORKSPACE.PUBLIC_SITE.CAREERS_SITE",
    name: "Careers Site Workspace",
    groupId: "W46",
    groupKey: "PUBLIC_SITE",
    groupLabel: "Public-Site Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 506,
    id: "WORKSPACE.PUBLIC_SITE.INVESTOR_SITE",
    name: "Investor Site Workspace",
    groupId: "W46",
    groupKey: "PUBLIC_SITE",
    groupLabel: "Public-Site Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 507,
    id: "WORKSPACE.PUBLIC_SITE.TRUST_CENTER",
    name: "Trust Center Workspace",
    groupId: "W46",
    groupKey: "PUBLIC_SITE",
    groupLabel: "Public-Site Workspaces",
    archetype: "MarketingWorkspace"
  },
  {
    ordinal: 508,
    id: "WORKSPACE.MOBILE.MOBILE_APP",
    name: "Mobile App Workspace",
    groupId: "W47",
    groupKey: "MOBILE",
    groupLabel: "Mobile Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 509,
    id: "WORKSPACE.MOBILE.MOBILE_BUILDER",
    name: "Mobile Builder Workspace",
    groupId: "W47",
    groupKey: "MOBILE",
    groupLabel: "Mobile Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 510,
    id: "WORKSPACE.MOBILE.MOBILE_PREVIEW",
    name: "Mobile Preview Workspace",
    groupId: "W47",
    groupKey: "MOBILE",
    groupLabel: "Mobile Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 511,
    id: "WORKSPACE.MOBILE.DEVICE_PREVIEW",
    name: "Device Preview Workspace",
    groupId: "W47",
    groupKey: "MOBILE",
    groupLabel: "Mobile Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 512,
    id: "WORKSPACE.MOBILE.OFFLINE",
    name: "Offline Workspace",
    groupId: "W47",
    groupKey: "MOBILE",
    groupLabel: "Mobile Workspaces",
    archetype: "CommandCenterWorkspace",
    aliasOf: "WORKSPACE.EMERGENCY_STATE.OFFLINE"
  },
  {
    ordinal: 513,
    id: "WORKSPACE.MOBILE.SYNC",
    name: "Sync Workspace",
    groupId: "W47",
    groupKey: "MOBILE",
    groupLabel: "Mobile Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 514,
    id: "WORKSPACE.MOBILE.MOBILE_NAVIGATION",
    name: "Mobile Navigation Workspace",
    groupId: "W47",
    groupKey: "MOBILE",
    groupLabel: "Mobile Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 515,
    id: "WORKSPACE.MOBILE.MOBILE_FORMS",
    name: "Mobile Forms Workspace",
    groupId: "W47",
    groupKey: "MOBILE",
    groupLabel: "Mobile Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 516,
    id: "WORKSPACE.DESKTOP.DESKTOP_APP",
    name: "Desktop App Workspace",
    groupId: "W48",
    groupKey: "DESKTOP",
    groupLabel: "Desktop Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 517,
    id: "WORKSPACE.DESKTOP.DESKTOP_BUILDER",
    name: "Desktop Builder Workspace",
    groupId: "W48",
    groupKey: "DESKTOP",
    groupLabel: "Desktop Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 518,
    id: "WORKSPACE.DESKTOP.MULTI_WINDOW",
    name: "Multi-Window Workspace",
    groupId: "W48",
    groupKey: "DESKTOP",
    groupLabel: "Desktop Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 519,
    id: "WORKSPACE.DESKTOP.DESKTOP_COMMAND_CENTER",
    name: "Desktop Command Center",
    groupId: "W48",
    groupKey: "DESKTOP",
    groupLabel: "Desktop Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 520,
    id: "WORKSPACE.DESKTOP.LOCAL_FILES",
    name: "Local Files Workspace",
    groupId: "W48",
    groupKey: "DESKTOP",
    groupLabel: "Desktop Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 521,
    id: "WORKSPACE.DESKTOP.NATIVE_INTEGRATION",
    name: "Native Integration Workspace",
    groupId: "W48",
    groupKey: "DESKTOP",
    groupLabel: "Desktop Workspaces",
    archetype: "ProductivityWorkspace"
  },
  {
    ordinal: 522,
    id: "WORKSPACE.REVIEW_DECISION.REVIEW",
    name: "Review Workspace",
    groupId: "W49",
    groupKey: "REVIEW_DECISION",
    groupLabel: "Review & Decision Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 523,
    id: "WORKSPACE.REVIEW_DECISION.APPROVAL",
    name: "Approval Workspace",
    groupId: "W49",
    groupKey: "REVIEW_DECISION",
    groupLabel: "Review & Decision Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 524,
    id: "WORKSPACE.REVIEW_DECISION.DECISION",
    name: "Decision Workspace",
    groupId: "W49",
    groupKey: "REVIEW_DECISION",
    groupLabel: "Review & Decision Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 525,
    id: "WORKSPACE.REVIEW_DECISION.COMPARISON",
    name: "Comparison Workspace",
    groupId: "W49",
    groupKey: "REVIEW_DECISION",
    groupLabel: "Review & Decision Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 526,
    id: "WORKSPACE.REVIEW_DECISION.DIFF",
    name: "Diff Workspace",
    groupId: "W49",
    groupKey: "REVIEW_DECISION",
    groupLabel: "Review & Decision Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 527,
    id: "WORKSPACE.REVIEW_DECISION.EVIDENCE_REVIEW",
    name: "Evidence Review Workspace",
    groupId: "W49",
    groupKey: "REVIEW_DECISION",
    groupLabel: "Review & Decision Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 528,
    id: "WORKSPACE.REVIEW_DECISION.QUALITY_REVIEW",
    name: "Quality Review Workspace",
    groupId: "W49",
    groupKey: "REVIEW_DECISION",
    groupLabel: "Review & Decision Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 529,
    id: "WORKSPACE.REVIEW_DECISION.LEGAL_REVIEW",
    name: "Legal Review Workspace",
    groupId: "W49",
    groupKey: "REVIEW_DECISION",
    groupLabel: "Review & Decision Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 530,
    id: "WORKSPACE.REVIEW_DECISION.FINANCE_REVIEW",
    name: "Finance Review Workspace",
    groupId: "W49",
    groupKey: "REVIEW_DECISION",
    groupLabel: "Review & Decision Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 531,
    id: "WORKSPACE.REVIEW_DECISION.RELEASE_REVIEW",
    name: "Release Review Workspace",
    groupId: "W49",
    groupKey: "REVIEW_DECISION",
    groupLabel: "Review & Decision Workspaces",
    archetype: "GovernanceWorkspace"
  },
  {
    ordinal: 532,
    id: "WORKSPACE.SYSTEM_ADMINISTRATION.ADMIN",
    name: "Admin Workspace",
    groupId: "W50",
    groupKey: "SYSTEM_ADMINISTRATION",
    groupLabel: "System Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 533,
    id: "WORKSPACE.SYSTEM_ADMINISTRATION.SUPER_ADMIN",
    name: "Super Admin Workspace",
    groupId: "W50",
    groupKey: "SYSTEM_ADMINISTRATION",
    groupLabel: "System Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 534,
    id: "WORKSPACE.SYSTEM_ADMINISTRATION.USER_ADMINISTRATION",
    name: "User Administration Workspace",
    groupId: "W50",
    groupKey: "SYSTEM_ADMINISTRATION",
    groupLabel: "System Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 535,
    id: "WORKSPACE.SYSTEM_ADMINISTRATION.ORGANISATION_ADMINISTRATION",
    name: "Organisation Administration Workspace",
    groupId: "W50",
    groupKey: "SYSTEM_ADMINISTRATION",
    groupLabel: "System Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 536,
    id: "WORKSPACE.SYSTEM_ADMINISTRATION.WORKSPACE_ADMINISTRATION",
    name: "Workspace Administration Workspace",
    groupId: "W50",
    groupKey: "SYSTEM_ADMINISTRATION",
    groupLabel: "System Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 537,
    id: "WORKSPACE.SYSTEM_ADMINISTRATION.ROLES_AND_PERMISSIONS",
    name: "Roles & Permissions Workspace",
    groupId: "W50",
    groupKey: "SYSTEM_ADMINISTRATION",
    groupLabel: "System Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 538,
    id: "WORKSPACE.SYSTEM_ADMINISTRATION.SYSTEM_CONFIGURATION",
    name: "System Configuration Workspace",
    groupId: "W50",
    groupKey: "SYSTEM_ADMINISTRATION",
    groupLabel: "System Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 539,
    id: "WORKSPACE.SYSTEM_ADMINISTRATION.FEATURE_FLAG",
    name: "Feature Flag Workspace",
    groupId: "W50",
    groupKey: "SYSTEM_ADMINISTRATION",
    groupLabel: "System Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 540,
    id: "WORKSPACE.SYSTEM_ADMINISTRATION.INTEGRATION_ADMINISTRATION",
    name: "Integration Administration Workspace",
    groupId: "W50",
    groupKey: "SYSTEM_ADMINISTRATION",
    groupLabel: "System Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 541,
    id: "WORKSPACE.OPERATIONS_ADMINISTRATION.QUEUE_ADMINISTRATION",
    name: "Queue Administration Workspace",
    groupId: "W51",
    groupKey: "OPERATIONS_ADMINISTRATION",
    groupLabel: "Operations Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 542,
    id: "WORKSPACE.OPERATIONS_ADMINISTRATION.JOB_ADMINISTRATION",
    name: "Job Administration Workspace",
    groupId: "W51",
    groupKey: "OPERATIONS_ADMINISTRATION",
    groupLabel: "Operations Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 543,
    id: "WORKSPACE.OPERATIONS_ADMINISTRATION.NOTIFICATION_ADMINISTRATION",
    name: "Notification Administration Workspace",
    groupId: "W51",
    groupKey: "OPERATIONS_ADMINISTRATION",
    groupLabel: "Operations Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 544,
    id: "WORKSPACE.OPERATIONS_ADMINISTRATION.WEBHOOK_ADMINISTRATION",
    name: "Webhook Administration Workspace",
    groupId: "W51",
    groupKey: "OPERATIONS_ADMINISTRATION",
    groupLabel: "Operations Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 545,
    id: "WORKSPACE.OPERATIONS_ADMINISTRATION.RUNTIME_ADMINISTRATION",
    name: "Runtime Administration Workspace",
    groupId: "W51",
    groupKey: "OPERATIONS_ADMINISTRATION",
    groupLabel: "Operations Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 546,
    id: "WORKSPACE.OPERATIONS_ADMINISTRATION.DEPLOYMENT_ADMINISTRATION",
    name: "Deployment Administration Workspace",
    groupId: "W51",
    groupKey: "OPERATIONS_ADMINISTRATION",
    groupLabel: "Operations Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 547,
    id: "WORKSPACE.OPERATIONS_ADMINISTRATION.AUDIT_ADMINISTRATION",
    name: "Audit Administration Workspace",
    groupId: "W51",
    groupKey: "OPERATIONS_ADMINISTRATION",
    groupLabel: "Operations Administration Workspaces",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 548,
    id: "WORKSPACE.TESTING.TEST",
    name: "Test Workspace",
    groupId: "W52",
    groupKey: "TESTING",
    groupLabel: "Testing Workspaces",
    archetype: "TestingWorkspace"
  },
  {
    ordinal: 549,
    id: "WORKSPACE.TESTING.QA",
    name: "QA Workspace",
    groupId: "W52",
    groupKey: "TESTING",
    groupLabel: "Testing Workspaces",
    archetype: "TestingWorkspace"
  },
  {
    ordinal: 550,
    id: "WORKSPACE.TESTING.BROWSER_TEST",
    name: "Browser Test Workspace",
    groupId: "W52",
    groupKey: "TESTING",
    groupLabel: "Testing Workspaces",
    archetype: "TestingWorkspace"
  },
  {
    ordinal: 551,
    id: "WORKSPACE.TESTING.COMPONENT_TEST",
    name: "Component Test Workspace",
    groupId: "W52",
    groupKey: "TESTING",
    groupLabel: "Testing Workspaces",
    archetype: "TestingWorkspace"
  },
  {
    ordinal: 552,
    id: "WORKSPACE.TESTING.INTEGRATION_TEST",
    name: "Integration Test Workspace",
    groupId: "W52",
    groupKey: "TESTING",
    groupLabel: "Testing Workspaces",
    archetype: "TestingWorkspace"
  },
  {
    ordinal: 553,
    id: "WORKSPACE.TESTING.E2E",
    name: "E2E Workspace",
    groupId: "W52",
    groupKey: "TESTING",
    groupLabel: "Testing Workspaces",
    archetype: "TestingWorkspace"
  },
  {
    ordinal: 554,
    id: "WORKSPACE.TESTING.ACCESSIBILITY_TEST",
    name: "Accessibility Test Workspace",
    groupId: "W52",
    groupKey: "TESTING",
    groupLabel: "Testing Workspaces",
    archetype: "TestingWorkspace"
  },
  {
    ordinal: 555,
    id: "WORKSPACE.TESTING.PERFORMANCE_TEST",
    name: "Performance Test Workspace",
    groupId: "W52",
    groupKey: "TESTING",
    groupLabel: "Testing Workspaces",
    archetype: "TestingWorkspace"
  },
  {
    ordinal: 556,
    id: "WORKSPACE.TESTING.CONFORMANCE",
    name: "Conformance Workspace",
    groupId: "W52",
    groupKey: "TESTING",
    groupLabel: "Testing Workspaces",
    archetype: "TestingWorkspace"
  },
  {
    ordinal: 557,
    id: "WORKSPACE.TESTING.REGRESSION",
    name: "Regression Workspace",
    groupId: "W52",
    groupKey: "TESTING",
    groupLabel: "Testing Workspaces",
    archetype: "TestingWorkspace"
  },
  {
    ordinal: 558,
    id: "WORKSPACE.DEMO_EXPERIMENTAL.DEMO",
    name: "Demo Workspace",
    groupId: "W53",
    groupKey: "DEMO_EXPERIMENTAL",
    groupLabel: "Demo & Experimental Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 559,
    id: "WORKSPACE.DEMO_EXPERIMENTAL.SANDBOX",
    name: "Sandbox Workspace",
    groupId: "W53",
    groupKey: "DEMO_EXPERIMENTAL",
    groupLabel: "Demo & Experimental Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 560,
    id: "WORKSPACE.DEMO_EXPERIMENTAL.PLAYGROUND",
    name: "Playground Workspace",
    groupId: "W53",
    groupKey: "DEMO_EXPERIMENTAL",
    groupLabel: "Demo & Experimental Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 561,
    id: "WORKSPACE.DEMO_EXPERIMENTAL.PROTOTYPE",
    name: "Prototype Workspace",
    groupId: "W53",
    groupKey: "DEMO_EXPERIMENTAL",
    groupLabel: "Demo & Experimental Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 562,
    id: "WORKSPACE.DEMO_EXPERIMENTAL.LABS",
    name: "Labs Workspace",
    groupId: "W53",
    groupKey: "DEMO_EXPERIMENTAL",
    groupLabel: "Demo & Experimental Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 563,
    id: "WORKSPACE.DEMO_EXPERIMENTAL.EXPERIMENTAL",
    name: "Experimental Workspace",
    groupId: "W53",
    groupKey: "DEMO_EXPERIMENTAL",
    groupLabel: "Demo & Experimental Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 564,
    id: "WORKSPACE.DEMO_EXPERIMENTAL.PREVIEW",
    name: "Preview Workspace",
    groupId: "W53",
    groupKey: "DEMO_EXPERIMENTAL",
    groupLabel: "Demo & Experimental Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 565,
    id: "WORKSPACE.DEMO_EXPERIMENTAL.SHOWCASE",
    name: "Showcase Workspace",
    groupId: "W53",
    groupKey: "DEMO_EXPERIMENTAL",
    groupLabel: "Demo & Experimental Workspaces",
    archetype: "DeveloperWorkspace"
  },
  {
    ordinal: 566,
    id: "WORKSPACE.PRESENTATION_DISPLAY.PRESENTATION",
    name: "Presentation Display Workspace",
    groupId: "W54",
    groupKey: "PRESENTATION_DISPLAY",
    groupLabel: "Presentation & Display Workspaces",
    archetype: "PresentationWorkspace"
  },
  {
    ordinal: 567,
    id: "WORKSPACE.PRESENTATION_DISPLAY.FULLSCREEN",
    name: "Fullscreen Workspace",
    groupId: "W54",
    groupKey: "PRESENTATION_DISPLAY",
    groupLabel: "Presentation & Display Workspaces",
    archetype: "PresentationWorkspace"
  },
  {
    ordinal: 568,
    id: "WORKSPACE.PRESENTATION_DISPLAY.KIOSK",
    name: "Kiosk Workspace",
    groupId: "W54",
    groupKey: "PRESENTATION_DISPLAY",
    groupLabel: "Presentation & Display Workspaces",
    archetype: "PresentationWorkspace"
  },
  {
    ordinal: 569,
    id: "WORKSPACE.PRESENTATION_DISPLAY.TV",
    name: "TV Workspace",
    groupId: "W54",
    groupKey: "PRESENTATION_DISPLAY",
    groupLabel: "Presentation & Display Workspaces",
    archetype: "PresentationWorkspace"
  },
  {
    ordinal: 570,
    id: "WORKSPACE.PRESENTATION_DISPLAY.WALLBOARD",
    name: "Wallboard Workspace",
    groupId: "W54",
    groupKey: "PRESENTATION_DISPLAY",
    groupLabel: "Presentation & Display Workspaces",
    archetype: "PresentationWorkspace"
  },
  {
    ordinal: 571,
    id: "WORKSPACE.PRESENTATION_DISPLAY.PUBLIC_DISPLAY",
    name: "Public Display Workspace",
    groupId: "W54",
    groupKey: "PRESENTATION_DISPLAY",
    groupLabel: "Presentation & Display Workspaces",
    archetype: "PresentationWorkspace"
  },
  {
    ordinal: 572,
    id: "WORKSPACE.PRESENTATION_DISPLAY.EMBEDDED",
    name: "Embedded Workspace",
    groupId: "W54",
    groupKey: "PRESENTATION_DISPLAY",
    groupLabel: "Presentation & Display Workspaces",
    archetype: "PresentationWorkspace"
  },
  {
    ordinal: 573,
    id: "WORKSPACE.PRESENTATION_DISPLAY.SHARE",
    name: "Share Workspace",
    groupId: "W54",
    groupKey: "PRESENTATION_DISPLAY",
    groupLabel: "Presentation & Display Workspaces",
    archetype: "PresentationWorkspace"
  },
  {
    ordinal: 574,
    id: "WORKSPACE.PRESENTATION_DISPLAY.PRINT",
    name: "Print Workspace",
    groupId: "W54",
    groupKey: "PRESENTATION_DISPLAY",
    groupLabel: "Presentation & Display Workspaces",
    archetype: "PresentationWorkspace"
  },
  {
    ordinal: 575,
    id: "WORKSPACE.EMERGENCY_STATE.MAINTENANCE",
    name: "Maintenance Workspace",
    groupId: "W55",
    groupKey: "EMERGENCY_STATE",
    groupLabel: "Emergency & State Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 576,
    id: "WORKSPACE.EMERGENCY_STATE.RECOVERY",
    name: "Recovery Workspace",
    groupId: "W55",
    groupKey: "EMERGENCY_STATE",
    groupLabel: "Emergency & State Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 577,
    id: "WORKSPACE.EMERGENCY_STATE.OFFLINE",
    name: "Offline Workspace",
    groupId: "W55",
    groupKey: "EMERGENCY_STATE",
    groupLabel: "Emergency & State Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 578,
    id: "WORKSPACE.EMERGENCY_STATE.INCIDENT",
    name: "Incident Workspace",
    groupId: "W55",
    groupKey: "EMERGENCY_STATE",
    groupLabel: "Emergency & State Workspaces",
    archetype: "ObservabilityWorkspace",
    aliasOf: "WORKSPACE.RELIABILITY_OBSERVABILITY.INCIDENT"
  },
  {
    ordinal: 579,
    id: "WORKSPACE.EMERGENCY_STATE.DEGRADED_SERVICE",
    name: "Degraded Service Workspace",
    groupId: "W55",
    groupKey: "EMERGENCY_STATE",
    groupLabel: "Emergency & State Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 580,
    id: "WORKSPACE.EMERGENCY_STATE.EMERGENCY_OPERATIONS",
    name: "Emergency Operations Workspace",
    groupId: "W55",
    groupKey: "EMERGENCY_STATE",
    groupLabel: "Emergency & State Workspaces",
    archetype: "CommandCenterWorkspace"
  },
  {
    ordinal: 581,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_UI_STUDIO",
    name: "MAATAA UI Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 582,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_DOMAIN_STUDIO",
    name: "MAATAA Domain Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 583,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_DATA_STUDIO",
    name: "MAATAA Data Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 584,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_API_STUDIO",
    name: "MAATAA API Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 585,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_CODE_STUDIO",
    name: "MAATAA Code Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 586,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_WORKFLOW_STUDIO",
    name: "MAATAA Workflow Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 587,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_FORM_STUDIO",
    name: "MAATAA Form Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 588,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_PAGE_STUDIO",
    name: "MAATAA Page Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 589,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_APP_STUDIO",
    name: "MAATAA App Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 590,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_MOBILE_STUDIO",
    name: "MAATAA Mobile Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 591,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_THEME_STUDIO",
    name: "MAATAA Theme Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 592,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_AGENT_STUDIO",
    name: "MAATAA Agent Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 593,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_KNOWLEDGE_STUDIO",
    name: "MAATAA Knowledge Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 594,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_INFRASTRUCTURE_STUDIO",
    name: "MAATAA Infrastructure Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 595,
    id: "WORKSPACE.MAATAA_CORE_STUDIO.MAATAA_CONTROL_PLANE_STUDIO",
    name: "MAATAA Control Plane Studio",
    groupId: "W56",
    groupKey: "MAATAA_CORE_STUDIO",
    groupLabel: "MAATAA Core Studio Workspaces",
    archetype: "BuilderWorkspace"
  },
  {
    ordinal: 596,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_SELECTOR",
    name: "Workspace Selector",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 597,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_SWITCHER",
    name: "Workspace Switcher",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 598,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_DIRECTORY",
    name: "Workspace Directory",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 599,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_CREATOR",
    name: "Workspace Creator",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 600,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_TEMPLATE_GALLERY",
    name: "Workspace Template Gallery",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 601,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_SETTINGS",
    name: "Workspace Settings",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 602,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_MEMBERS",
    name: "Workspace Members",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 603,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_ROLES",
    name: "Workspace Roles",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 604,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_PERMISSIONS",
    name: "Workspace Permissions",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 605,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_INTEGRATIONS",
    name: "Workspace Integrations",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 606,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_ACTIVITY",
    name: "Workspace Activity",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 607,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_AUDIT",
    name: "Workspace Audit",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 608,
    id: "WORKSPACE.WORKSPACE_META.WORKSPACE_ARCHIVE",
    name: "Workspace Archive",
    groupId: "W57",
    groupKey: "WORKSPACE_META",
    groupLabel: "Workspace Meta/Management",
    archetype: "AdminWorkspace"
  },
  {
    ordinal: 609,
    id: "WORKSPACE.MULTI_WORKSPACE.WORKSPACE_HUB",
    name: "Workspace Hub",
    groupId: "W58",
    groupKey: "MULTI_WORKSPACE",
    groupLabel: "Multi-Workspace Systems",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 610,
    id: "WORKSPACE.MULTI_WORKSPACE.WORKSPACE_FEDERATION",
    name: "Workspace Federation",
    groupId: "W58",
    groupKey: "MULTI_WORKSPACE",
    groupLabel: "Multi-Workspace Systems",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 611,
    id: "WORKSPACE.MULTI_WORKSPACE.WORKSPACE_PORTFOLIO",
    name: "Workspace Portfolio",
    groupId: "W58",
    groupKey: "MULTI_WORKSPACE",
    groupLabel: "Multi-Workspace Systems",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 612,
    id: "WORKSPACE.MULTI_WORKSPACE.MULTI_TENANT_HUB",
    name: "Multi-Tenant Workspace Hub",
    groupId: "W58",
    groupKey: "MULTI_WORKSPACE",
    groupLabel: "Multi-Workspace Systems",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 613,
    id: "WORKSPACE.MULTI_WORKSPACE.CROSS_WORKSPACE_SEARCH",
    name: "Cross-Workspace Search",
    groupId: "W58",
    groupKey: "MULTI_WORKSPACE",
    groupLabel: "Multi-Workspace Systems",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 614,
    id: "WORKSPACE.MULTI_WORKSPACE.CROSS_WORKSPACE_ACTIVITY",
    name: "Cross-Workspace Activity",
    groupId: "W58",
    groupKey: "MULTI_WORKSPACE",
    groupLabel: "Multi-Workspace Systems",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 615,
    id: "WORKSPACE.MULTI_WORKSPACE.CROSS_WORKSPACE_ANALYTICS",
    name: "Cross-Workspace Analytics",
    groupId: "W58",
    groupKey: "MULTI_WORKSPACE",
    groupLabel: "Multi-Workspace Systems",
    archetype: "OrganisationWorkspace"
  },
  {
    ordinal: 616,
    id: "WORKSPACE.MULTI_WORKSPACE.CROSS_WORKSPACE_COMMAND_CENTER",
    name: "Cross-Workspace Command Center",
    groupId: "W58",
    groupKey: "MULTI_WORKSPACE",
    groupLabel: "Multi-Workspace Systems",
    archetype: "OrganisationWorkspace"
  }
] as const satisfies readonly WorkspaceTypeRecord[];

export const WORKSPACE_TYPE_BY_ID = new Map(WORKSPACE_TYPES.map((workspace) => [workspace.id, workspace] as const));
