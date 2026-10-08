export type FilmStageId =
  | "ideation"
  | "script"
  | "pre-production"
  | "production"
  | "post-production"
  | "release";

export interface FilmTopic {
  id: string;
  title: string;
  summary: string;
  tasks: string[];
  reviewRequired?: boolean;
}

export interface FilmStage {
  id: FilmStageId;
  label: string;
  description: string;
  topics: FilmTopic[];
}

export const filmStages: FilmStage[] = [
  {
    id: "ideation",
    label: "Ideation",
    description: "Find the story, audience, and reason to make this film.",
    topics: [
      {
        id: "audience",
        title: "Know your audience",
        summary: "Describe who the film is for and what they should take away.",
        tasks: [
          "Write an audience note",
          "Choose a format and genre",
          "Capture the intended tone",
        ],
      },
      {
        id: "research",
        title: "Research the subject",
        summary:
          "Gather context, perspectives, and source material before committing to a concept.",
        tasks: [
          "List source materials",
          "Record open questions",
          "Mark facts that need independent verification",
        ],
      },
      {
        id: "concept",
        title: "Shape the concept",
        summary: "Turn early ideas into a short, reviewable project concept.",
        tasks: [
          "Draft a one-line premise",
          "Write a short synopsis",
          "Review scope with collaborators",
        ],
      },
      {
        id: "storyboard",
        title: "Explore the visual story",
        summary:
          "Use reference frames or a storyboard to test how the story could unfold on screen.",
        tasks: [
          "Identify key visual moments",
          "Sketch a sequence",
          "Note unresolved creative choices",
        ],
      },
    ],
  },
  {
    id: "script",
    label: "Script",
    description:
      "Acquire or write the script, then develop it into a production-ready draft.",
    topics: [
      {
        id: "acquisition",
        title: "Acquire or commission a script",
        summary:
          "Record the source, author, version, and agreement status for the material.",
        tasks: [
          "Identify the script source",
          "Record author and version",
          "Route agreement terms for review",
        ],
      },
      {
        id: "rights",
        title: "Track rights and clearances",
        summary:
          "List rights, permissions, and third-party material that require qualified review.",
        tasks: [
          "List underlying works",
          "Identify music and image clearances",
          "Ask qualified counsel to review open items",
        ],
        reviewRequired: true,
      },
      {
        id: "draft",
        title: "Develop the screenplay",
        summary:
          "Build a coherent story structure, characters, scenes, and dialogue.",
        tasks: [
          "Outline story beats",
          "Develop character arcs",
          "Review scene sequence",
          "Record draft feedback",
        ],
      },
      {
        id: "format",
        title: "Prepare the working draft",
        summary:
          "Keep script versions legible and ready for production breakdown.",
        tasks: [
          "Choose a script format",
          "Label the current version",
          "Lock a draft for breakdown",
        ],
      },
    ],
  },
  {
    id: "pre-production",
    label: "Pre production",
    description:
      "Translate the approved draft into a people, place, time, and resource plan.",
    topics: [
      {
        id: "breakdown",
        title: "Break down the script",
        summary:
          "Identify cast, departments, props, locations, equipment, and scene needs.",
        tasks: [
          "List scenes and requirements",
          "Identify department owners",
          "Track unresolved dependencies",
        ],
      },
      {
        id: "casting",
        title: "Cast and crew",
        summary:
          "Plan roles and responsibilities; keep availability and agreements explicit.",
        tasks: [
          "List cast requirements",
          "Assign department leads",
          "Track crew responsibilities",
        ],
      },
      {
        id: "recce",
        title: "Location recce and logistics",
        summary:
          "Record candidate locations and the checks needed before any shoot is confirmed.",
        tasks: [
          "Record candidate locations",
          "List access and safety questions",
          "Plan transport and accommodation",
        ],
        reviewRequired: true,
      },
      {
        id: "schedule",
        title: "Prepare the schedule",
        summary:
          "Arrange scenes and resources into a reviewable production schedule.",
        tasks: [
          "Estimate shoot days",
          "Group scenes by practical constraints",
          "Review the schedule with department leads",
        ],
      },
      {
        id: "music",
        title: "Plan music and sound",
        summary:
          "Track composition, lyric, recording, and music-rights work as production dependencies.",
        tasks: [
          "Define music needs",
          "Assign composer or music lead",
          "Track rights review for existing music",
        ],
        reviewRequired: true,
      },
    ],
  },
  {
    id: "production",
    label: "Production",
    description:
      "Coordinate each shoot day and keep changes, safety, and progress visible.",
    topics: [
      {
        id: "call-sheet",
        title: "Call sheets",
        summary:
          "Share the day's scenes, times, contacts, and practical notes with the working team.",
        tasks: [
          "Confirm scene order",
          "Check cast and crew calls",
          "Review location and safety notes",
        ],
      },
      {
        id: "set-operations",
        title: "Set operations",
        summary:
          "Coordinate departments, equipment, catering, transport, and lodging against the plan.",
        tasks: [
          "Confirm equipment readiness",
          "Confirm transport and catering",
          "Review department dependencies",
        ],
      },
      {
        id: "safety",
        title: "Safety and security",
        summary:
          "Capture production-specific safety checks and escalation contacts.",
        tasks: [
          "Record safety briefing",
          "Confirm emergency contacts",
          "Log incidents and actions",
        ],
        reviewRequired: true,
      },
      {
        id: "daily-report",
        title: "Daily production report",
        summary:
          "Record progress, delays, changes, and the next day's dependencies.",
        tasks: [
          "Record scenes completed",
          "Log schedule or budget changes",
          "Prepare next-day notes",
        ],
      },
    ],
  },
  {
    id: "post-production",
    label: "Post production",
    description:
      "Shape picture and sound, then prepare and verify delivery masters.",
    topics: [
      {
        id: "edit",
        title: "Editing",
        summary:
          "Organize media, build the cut, review feedback, and lock picture.",
        tasks: [
          "Back up and organize footage",
          "Build an assembly",
          "Collect edit notes",
          "Lock picture when approved",
        ],
      },
      {
        id: "picture",
        title: "Color and visual effects",
        summary:
          "Track color finishing, visual effects, animation, and final picture checks.",
        tasks: [
          "Create a finishing list",
          "Review color and effects shots",
          "Check final picture export",
        ],
      },
      {
        id: "sound",
        title: "Sound and music",
        summary:
          "Complete dialogue, effects, music, and mix for the intended delivery formats.",
        tasks: [
          "Review dialogue edit",
          "Complete sound effects and music",
          "Check the final mix",
        ],
      },
      {
        id: "accessibility",
        title: "Captions and delivery checks",
        summary:
          "Prepare accessible versions and verify technical delivery requirements.",
        tasks: [
          "Prepare captions or subtitles",
          "Check audio and picture sync",
          "Verify delivery files",
        ],
      },
    ],
  },
  {
    id: "release",
    label: "Release",
    description:
      "Prepare clearances, release materials, distribution, and post-launch tracking.",
    topics: [
      {
        id: "clearance",
        title: "Release readiness",
        summary:
          "Collect the documents and reviews required by the chosen distribution plan.",
        tasks: [
          "Check rights and credits",
          "Confirm delivery specifications",
          "Route certification and legal questions to qualified reviewers",
        ],
        reviewRequired: true,
      },
      {
        id: "distribution",
        title: "Distribution plan",
        summary:
          "Compare intended channels and record rights, deliverables, and counterparties.",
        tasks: [
          "Choose target channels",
          "Track delivery requirements",
          "Record distribution discussions",
        ],
      },
      {
        id: "marketing",
        title: "Marketing materials",
        summary:
          "Prepare the trailer, poster, synopsis, stills, and press materials.",
        tasks: [
          "Write the synopsis",
          "Prepare key art and stills",
          "Plan release communications",
        ],
      },
      {
        id: "performance",
        title: "Release and performance",
        summary:
          "Track release dates, available reports, audience response, and follow-up work.",
        tasks: [
          "Record the release date",
          "Track source and date of performance data",
          "Archive final masters and release records",
        ],
      },
      {
        id: "policy-review",
        title: "Policy and funding claims",
        summary:
          "The source timeline contains policy, subsidy, tax, and revenue assertions that need current verification before use.",
        tasks: [
          "Do not rely on unverified amounts or eligibility claims",
          "Check current official sources and application terms",
          "Record reviewer, source, and verification date",
        ],
        reviewRequired: true,
      },
    ],
  },
];

export const filmStorageKey = "tlp.film.workspace.v1";

export interface FilmProjectState {
  projectName: string;
  createdByRole?: string;
  selectedOperatingSystem?: string;
  productionType?: string;
  projectIdea?: string;
  activeStage: FilmStageId;
  completedTasks: string[];
  completedStages: FilmStageId[];
  generationRevisions: Partial<Record<FilmStageId, number>>;
}

export const blankFilmProject: FilmProjectState = {
  projectName: "",
  activeStage: "ideation",
  completedTasks: [],
  completedStages: [],
  generationRevisions: {},
};

export const thirtyTrillionIndiaProject: FilmProjectState = {
  projectName: "30 Trillion India",
  activeStage: "ideation",
  completedTasks: [],
  completedStages: [],
  generationRevisions: {},
};

export function parseFilmProject(raw: string | null): FilmProjectState {
  if (!raw || raw.length > 50_000) return blankFilmProject;
  try {
    const value = JSON.parse(raw) as Partial<FilmProjectState>;
    const stageIds = filmStages.map((stage) => stage.id);
    return {
      projectName:
        typeof value.projectName === "string"
          ? value.projectName.slice(0, 120)
          : "",
      createdByRole: typeof value.createdByRole === "string" ? value.createdByRole.slice(0, 120) : undefined,
      selectedOperatingSystem: typeof value.selectedOperatingSystem === "string" ? value.selectedOperatingSystem.slice(0, 120) : undefined,
      productionType: typeof value.productionType === "string" ? value.productionType.slice(0, 120) : undefined,
      projectIdea: typeof value.projectIdea === "string" ? value.projectIdea.slice(0, 5_000) : undefined,
      activeStage: stageIds.includes(value.activeStage as FilmStageId)
        ? (value.activeStage as FilmStageId)
        : "ideation",
      completedTasks: Array.isArray(value.completedTasks)
        ? value.completedTasks
            .filter((item): item is string => typeof item === "string")
            .slice(0, 300)
        : [],
      completedStages: Array.isArray(value.completedStages)
        ? value.completedStages.filter((item): item is FilmStageId =>
            stageIds.includes(item as FilmStageId),
          )
        : [],
      generationRevisions:
        value.generationRevisions &&
        typeof value.generationRevisions === "object"
          ? Object.fromEntries(
              stageIds.flatMap((stage) => {
                const revision = value.generationRevisions?.[stage];
                return typeof revision === "number" &&
                  Number.isSafeInteger(revision)
                  ? [[stage, Math.min(999, Math.max(1, revision))]]
                  : [];
              }),
            )
          : {},
    };
  } catch {
    return blankFilmProject;
  }
}
