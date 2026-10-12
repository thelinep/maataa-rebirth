import * as React from "react";
import {
  buildProductIdeaBrief,
  createEmptyProductIdeaDraft,
  getProductIdeaOpenQuestions,
  parseProductIdeaWizardSession,
  PRODUCT_IDEA_WIZARD_MAX_CHARS,
  PRODUCT_IDEA_WIZARD_STORAGE_KEY,
  PRODUCT_IDEA_WIZARD_STEPS,
  type ProductIdeaDraft,
  type ProductDomain,
} from "./productIdeaWizardModel";
import { readStoredText, writeStoredValue } from "@maataa/ui/compounds";

type FieldKey = Exclude<keyof ProductIdeaDraft, "domain">;
type FieldDefinition = {
  key: FieldKey;
  label: string;
  hint: string;
  rows?: number;
};

const STEP_COPY = [
  {
    title: "Start with the idea",
    description:
      "Name the product and describe the problem in your own words. This wizard will not fill gaps with invented domain facts.",
  },
  {
    title: "Who is it for?",
    description:
      "Describe the people using the product and the outcome they need. You can leave decisions open for review.",
  },
  {
    title: "Map the work",
    description:
      "Describe one useful journey from start to finish, then note where it can fail and how a person recovers.",
  },
  {
    title: "Describe the data",
    description:
      "Name data types and their source. Do not enter actual customer records or credentials.",
  },
  {
    title: "Set the boundaries",
    description:
      "Identify connected systems and which actions remain under the host application's authority.",
  },
  {
    title: "Choose the experience",
    description:
      "Capture device, language, direction and accessibility needs before a draft is generated.",
  },
  {
    title: "Plan a real pilot",
    description:
      "Name the owner role, participants and measurable outcome. These are planning fields, not acceptance evidence.",
  },
  {
    title: "Review before using models",
    description:
      "Inspect and edit the complete brief. Blank answers remain unknown; source notes are not independently verified.",
  },
] as const;

const STEP_FIELDS: Partial<Record<number, FieldDefinition[]>> = {
  0: [
    {
      key: "productName",
      label: "Working name",
      hint: "A temporary name is fine.",
    },
    {
      key: "idea",
      label: "What idea should the first product slice explore?",
      hint: "Describe the problem and the smallest useful first outcome.",
      rows: 5,
    },
  ],
  1: [
    {
      key: "audience",
      label: "Who will use it?",
      hint: "Use roles or groups; avoid personal details.",
      rows: 3,
    },
    {
      key: "outcome",
      label: "What should they be able to accomplish?",
      hint: "Describe an observable result, not a marketing claim.",
      rows: 3,
    },
  ],
  2: [
    {
      key: "workflow",
      label: "What are the main steps?",
      hint: "A short sequence such as start → review → handover is enough.",
      rows: 4,
    },
    {
      key: "edgeCases",
      label: "What can go wrong, and how should people recover?",
      hint: "Consider missing data, denied actions, network loss and corrections.",
      rows: 3,
    },
  ],
  3: [
    {
      key: "dataNeeded",
      label: "What types of data are needed?",
      hint: "Describe fields or records only. Use synthetic examples.",
      rows: 3,
    },
    {
      key: "dataSource",
      label: "Where does each type come from, and who owns it?",
      hint: "If the source is undecided, leave it blank and it will stay an open question.",
      rows: 3,
    },
  ],
  4: [
    {
      key: "integrations",
      label: "Which integrations might be needed?",
      hint: "Separate confirmed systems from ideas that still need validation.",
      rows: 3,
    },
    {
      key: "authorityBoundary",
      label: "Which actions need host approval or remain outside this UI?",
      hint: "For example, identity, permissions, booking, payment or sending messages.",
      rows: 4,
    },
  ],
  5: [
    {
      key: "platform",
      label: "Which devices and environments matter?",
      hint: "For example, desktop browser, phone, kiosk or low-bandwidth network.",
    },
    {
      key: "languages",
      label: "Which languages and writing directions are needed?",
      hint: "For example, English, Hindi, RTL, or not decided yet.",
    },
    {
      key: "accessibility",
      label: "What accessibility needs must be checked?",
      hint: "Keyboard, screen reader, zoom, contrast, reduced motion and touch are useful prompts.",
      rows: 3,
    },
  ],
  6: [
    {
      key: "pilotOwner",
      label: "Who owns the pilot decision?",
      hint: "Enter a role or team, not a private contact detail.",
    },
    {
      key: "participants",
      label: "Which participant roles should be involved?",
      hint: "Include the people doing the task and the people reviewing it.",
      rows: 2,
    },
    {
      key: "successMeasures",
      label: "How will the pilot measure success?",
      hint: "Choose observable measures and agree on targets with the owner.",
      rows: 3,
    },
    {
      key: "evidence",
      label: "What facts or source notes has the owner supplied?",
      hint: "Paste non-sensitive facts or public source titles/links. They remain unverified here.",
      rows: 3,
    },
    {
      key: "openQuestions",
      label: "What is still undecided?",
      hint: "Add questions you want the review to keep visible.",
      rows: 3,
    },
  ],
};

function loadSession() {
  if (typeof window === "undefined")
    return {
      draft: createEmptyProductIdeaDraft(),
      currentStep: 0,
      reviewedBrief: null as string | null,
    };
  try {
    const session = parseProductIdeaWizardSession(
      readStoredText(PRODUCT_IDEA_WIZARD_STORAGE_KEY),
    );
    return (
      session ?? {
        draft: createEmptyProductIdeaDraft(),
        currentStep: 0,
        reviewedBrief: null,
      }
    );
  } catch {
    return {
      draft: createEmptyProductIdeaDraft(),
      currentStep: 0,
      reviewedBrief: null,
    };
  }
}

export function ProductIdeaWizard({
  onBriefApproved,
  onBriefInvalidated,
}: {
  onBriefApproved: (brief: string) => void;
  onBriefInvalidated: () => void;
}) {
  const initial = React.useRef(loadSession()).current;
  const [draft, setDraft] = React.useState(initial.draft);
  const [currentStep, setCurrentStep] = React.useState(initial.currentStep);
  const [reviewedBrief, setReviewedBrief] = React.useState<string | null>(
    initial.reviewedBrief,
  );
  const [approved, setApproved] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState("Saving in this browser…");
  const [stepError, setStepError] = React.useState("");
  const [announcement, setAnnouncement] = React.useState("");

  React.useEffect(() => {
    setSaveStatus(writeStoredValue(PRODUCT_IDEA_WIZARD_STORAGE_KEY, { version: 1, draft, currentStep, reviewedBrief }) ? "Saved in this browser" : "This browser could not save the draft");
  }, [draft, currentStep, reviewedBrief]);

  const setField = (key: FieldKey, value: string) => {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setReviewedBrief(null);
    if (approved) {
      setApproved(false);
      onBriefInvalidated();
    }
    setStepError("");
  };

  const setDomain = (domain: ProductDomain) => {
    setDraft((previous) => ({ ...previous, domain }));
    setReviewedBrief(null);
    if (approved) {
      setApproved(false);
      onBriefInvalidated();
    }
  };

  const visitStep = (step: number) => {
    setCurrentStep(step);
    setStepError("");
    setAnnouncement(`Step ${step + 1} of ${PRODUCT_IDEA_WIZARD_STEPS.length}: ${PRODUCT_IDEA_WIZARD_STEPS[step]}`);
  };

  const continueStep = () => {
    if (
      currentStep === 0 &&
      (!draft.productName.trim() || !draft.idea.trim())
    ) {
      setStepError("Add a working name and a short idea before continuing.");
      return;
    }
    if (currentStep < PRODUCT_IDEA_WIZARD_STEPS.length - 1)
      visitStep(currentStep + 1);
  };

  const brief = reviewedBrief ?? buildProductIdeaBrief(draft);
  const openQuestions = getProductIdeaOpenQuestions(draft);
  const requiredReady = Boolean(draft.productName.trim() && draft.idea.trim());
  const withinLimit = brief.length <= PRODUCT_IDEA_WIZARD_MAX_CHARS;

  return (
    <section className="product-intake" aria-labelledby="product-intake-title">
      <header className="product-intake-header">
        <div>
          <h3 id="product-intake-title">Guided product intake</h3>
          <p>
            Turn an idea into a source-aware brief. Nothing is sent to a model
            until you review and apply it below.
          </p>
        </div>
        <span className="product-intake-save" role="status">
          {saveStatus}
        </span>
      </header>

      <nav className="product-intake-steps" aria-label="Product intake steps">
        <div className="product-intake-step-scroll">
          <ol>
            {PRODUCT_IDEA_WIZARD_STEPS.map((step, index) => (
              <li key={step}>
                <button
                  type="button"
                  aria-current={index === currentStep ? "step" : undefined}
                  aria-label={`Step ${index + 1}: ${step}${index === currentStep ? ", current step" : ""}`}
                  onClick={() => visitStep(index)}
                >
                  <span aria-hidden="true">{index + 1}</span>
                  <span>{step}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <p className="product-intake-step-hint">Scroll the steps to see the full sequence.</p>
      </nav>

      <div className="product-intake-body">
        <div className="product-intake-form">
          <div className="product-intake-step-heading">
            <p>Step {currentStep + 1} of {PRODUCT_IDEA_WIZARD_STEPS.length}</p>
            <h4>{STEP_COPY[currentStep].title}</h4>
            <span>{STEP_COPY[currentStep].description}</span>
          </div>

          {currentStep === 0 && (
            <label className="product-intake-field">
              <span>Which context best describes this request?</span>
              <select
                aria-label="Product context"
                value={draft.domain}
                onChange={(event) =>
                  setDomain(event.target.value as ProductDomain)
                }
              >
                <option value="new">New domain</option>
                <option value="tlps">TLPS</option>
                <option value="nevo">NEVO</option>
                <option value="other">Other</option>
              </select>
              <small>
                This only labels the brief. It does not load or confirm domain
                facts.
              </small>
            </label>
          )}

          {currentStep !== PRODUCT_IDEA_WIZARD_STEPS.length - 1 &&
            (STEP_FIELDS[currentStep] ?? []).map((field) => (
              <label className="product-intake-field" key={field.key}>
                <span>{field.label}</span>
                {field.rows ? (
                  <textarea
                    aria-label={field.label}
                    rows={field.rows}
                    maxLength={2_000}
                    value={draft[field.key]}
                    onChange={(event) => setField(field.key, event.target.value)}
                  />
                ) : (
                  <input
                    aria-label={field.label}
                    maxLength={2_000}
                    value={draft[field.key]}
                    onChange={(event) => setField(field.key, event.target.value)}
                  />
                )}
                <small>{field.hint}</small>
              </label>
            ))}

          {currentStep === PRODUCT_IDEA_WIZARD_STEPS.length - 1 && (
            <>
              <div className="product-intake-review-summary">
                <div>
                  <strong>{requiredReady ? "Ready for your review" : "Two details needed"}</strong>
                  <span>
                    {requiredReady
                      ? "The name and idea are present. Every other blank answer stays marked as unknown."
                      : "Return to Concept and add a working name and short idea before using the brief."}
                  </span>
                </div>
                <div>
                  <strong>{openQuestions.length} open prompts</strong>
                  <span>Blank planning fields are questions, not facts.</span>
                </div>
              </div>
              {openQuestions.length > 0 && (
                <details className="product-intake-open-questions" open>
                  <summary>Questions to resolve with an owner</summary>
                  <ul>
                    {openQuestions.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                    {draft.openQuestions.trim() && <li>{draft.openQuestions}</li>}
                  </ul>
                </details>
              )}
              <label className="product-intake-field">
                <span>Review and edit the brief that will be sent</span>
                <textarea
                  id="product-intake-brief"
                  rows={16}
                  maxLength={PRODUCT_IDEA_WIZARD_MAX_CHARS + 1}
                  value={brief}
                  onChange={(event) => {
                    setReviewedBrief(event.target.value);
                    if (approved) {
                      setApproved(false);
                      onBriefInvalidated();
                    }
                  }}
                />
                <small>
                  {brief.length.toLocaleString()} / {PRODUCT_IDEA_WIZARD_MAX_CHARS.toLocaleString()} characters · user-supplied answers are not independently verified
                </small>
              </label>
              {!withinLimit && (
                <p className="product-intake-error" role="alert">
                  Shorten this brief to 4,000 characters before sending it to a
                  provider. Nothing will be silently truncated.
                </p>
              )}
              {approved && (
                <p className="product-intake-confirmation" role="status">
                  Brief applied. Review it once more before choosing an agent run
                  or schema extraction.
                </p>
              )}
              <button
                className="gold-button product-intake-approve"
                type="button"
                disabled={!requiredReady || !withinLimit}
                onClick={() => {
                  onBriefApproved(brief);
                  setApproved(true);
                  setAnnouncement("Reviewed brief applied to Product Forge.");
                }}
              >
                Use reviewed brief in Product Forge
              </button>
            </>
          )}

          {stepError && (
            <p className="product-intake-error" role="alert">
              {stepError}
            </p>
          )}
          <p className="sr-only" aria-live="polite">
            {announcement}
          </p>
          <div className="product-intake-actions">
            <button
              type="button"
              className="ghost-button"
              disabled={currentStep === 0}
              onClick={() => visitStep(currentStep - 1)}
            >
              Back
            </button>
            {currentStep < PRODUCT_IDEA_WIZARD_STEPS.length - 1 && (
              <button
                type="button"
                className="gold-button"
                onClick={continueStep}
              >
                Continue
              </button>
            )}
          </div>
        </div>

        <aside className="product-intake-side" aria-label="Intake safeguards">
          <h4>Keep the draft honest</h4>
          <ul>
            <li>Unanswered items remain unknown.</li>
            <li>Source notes are not verified by this wizard.</li>
            <li>Use synthetic data; keep secrets and personal records out.</li>
            <li>Provider calls start only after you apply the reviewed brief.</li>
          </ul>
          <p>
            This local draft is saved in this browser. It does not create an
            account, contact an application owner, or run a pilot.
          </p>
        </aside>
      </div>
    </section>
  );
}
