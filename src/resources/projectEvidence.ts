import type { ProjectVisual } from "./projectVisuals";

type ProjectSlug = ProjectVisual["slug"];

export type EvidenceSourceType = "github" | "resume" | "case-study" | "package" | "demo";

export type EvidenceConfidence = "high" | "medium" | "context";

export type EvidenceSource = {
  type: EvidenceSourceType;
  label: string;
  href?: string;
  reference?: string;
  confidence: EvidenceConfidence;
};

export type EvidenceReceipt = {
  label: string;
  value: string;
  detail: string;
  source: string;
  href?: string;
  confidence: EvidenceConfidence;
};

export type ProjectEvidence = {
  slug: ProjectSlug;
  snapshotLabel: string;
  confidence: {
    score: number;
    label: string;
    detail: string;
  };
  primarySource: EvidenceSource;
  sources: readonly EvidenceSource[];
  receipts: readonly EvidenceReceipt[];
  proofNotes: readonly string[];
};

const githubSnapshot = "GitHub snapshot: May 5, 2026";
const resumeSnapshot = "Resume source: KMSH.pdf";
const caseStudySnapshot = "Portfolio case study";

export const projectEvidence = [
  {
    slug: "agents-fun-eliza",
    snapshotLabel: githubSnapshot,
    confidence: {
      score: 88,
      label: "GitHub + resume",
      detail: "Public repository plus resume adoption signal.",
    },
    primarySource: {
      type: "github",
      label: "valory-xyz/agents-fun-eliza",
      href: "https://github.com/valory-xyz/agents-fun-eliza",
      confidence: "high",
    },
    sources: [
      {
        type: "github",
        label: "valory-xyz/agents-fun-eliza",
        href: "https://github.com/valory-xyz/agents-fun-eliza",
        confidence: "high",
      },
      {
        type: "resume",
        label: resumeSnapshot,
        reference: "Valory open source contributions",
        confidence: "high",
      },
    ],
    receipts: [
      {
        label: "Repository",
        value: "TypeScript",
        detail: "Public Eliza-based autonomous agent repository.",
        source: "GitHub",
        href: "https://github.com/valory-xyz/agents-fun-eliza",
        confidence: "high",
      },
      {
        label: "Repo signal",
        value: "3 stars / 1 fork",
        detail: "Public repository activity visible through GitHub.",
        source: githubSnapshot,
        href: "https://github.com/valory-xyz/agents-fun-eliza",
        confidence: "high",
      },
      {
        label: "Adoption",
        value: "0 to 170 users",
        detail: "Active users in 2 weeks for agents-fun-eliza.",
        source: resumeSnapshot,
        confidence: "high",
      },
    ],
    proofNotes: [
      "Eliza framework integration is backed by the public repo topic and case study.",
      "Resume source ties the project to ecosystem adoption rather than only code presence.",
    ],
  },
  {
    slug: "ai-prediction-market-trader",
    snapshotLabel: githubSnapshot,
    confidence: {
      score: 92,
      label: "Public repo",
      detail: "Public repository with current activity and resume usage signal.",
    },
    primarySource: {
      type: "github",
      label: "valory-xyz/trader",
      href: "https://github.com/valory-xyz/trader",
      confidence: "high",
    },
    sources: [
      {
        type: "github",
        label: "valory-xyz/trader",
        href: "https://github.com/valory-xyz/trader",
        confidence: "high",
      },
      {
        type: "resume",
        label: resumeSnapshot,
        reference: "Valory Trader service adoption",
        confidence: "high",
      },
    ],
    receipts: [
      {
        label: "Repository",
        value: "Python",
        detail: "AI agent for prediction markets on Omen and Polymarket.",
        source: "GitHub",
        href: "https://github.com/valory-xyz/trader",
        confidence: "high",
      },
      {
        label: "Repo signal",
        value: "68 stars / 31 forks",
        detail: "Public GitHub repository snapshot.",
        source: githubSnapshot,
        href: "https://github.com/valory-xyz/trader",
        confidence: "high",
      },
      {
        label: "Service adoption",
        value: "119 to 1,900 users",
        detail: "Active users scaled through internal and ecosystem AI tooling.",
        source: resumeSnapshot,
        confidence: "high",
      },
    ],
    proofNotes: [
      "Repository activity is public and current as of May 2026.",
      "Resume source ties the work to service adoption rather than paper trading claims.",
    ],
  },
  {
    slug: "automl-platform",
    snapshotLabel: resumeSnapshot,
    confidence: {
      score: 78,
      label: "Resume + case study",
      detail: "Employer project evidence, no public repository expected.",
    },
    primarySource: {
      type: "resume",
      label: resumeSnapshot,
      reference: "Mechademy Engineering Solutions",
      confidence: "high",
    },
    sources: [
      {
        type: "resume",
        label: resumeSnapshot,
        reference: "Mechademy ML and MLOps systems",
        confidence: "high",
      },
      {
        type: "case-study",
        label: caseStudySnapshot,
        reference: "automl-platform.mdx",
        confidence: "medium",
      },
    ],
    receipts: [
      {
        label: "Team leverage",
        value: "500+ hours / month",
        detail: "Internal AI and MLOps systems saved ML team time.",
        source: resumeSnapshot,
        confidence: "high",
      },
      {
        label: "Delivery scale",
        value: "3 to 10 clients",
        detail: "Delivery scaled in one year through internal systems.",
        source: resumeSnapshot,
        confidence: "high",
      },
      {
        label: "Case-study claim",
        value: "70% workload cut",
        detail: "AutoML platform reduced modeling workload.",
        source: caseStudySnapshot,
        confidence: "medium",
      },
    ],
    proofNotes: [
      "Resume supports the operational MLOps impact.",
      "Case study carries the AutoML-specific platform framing.",
    ],
  },
  {
    slug: "genie-cli",
    snapshotLabel: resumeSnapshot,
    confidence: {
      score: 72,
      label: "Resume + package claim",
      detail: "Public package link is claimed, repo lookup was unavailable.",
    },
    primarySource: {
      type: "resume",
      label: resumeSnapshot,
      reference: "Valory Genie platform",
      confidence: "high",
    },
    sources: [
      {
        type: "resume",
        label: resumeSnapshot,
        reference: "Valory Lead LLM Engineer role",
        confidence: "high",
      },
      {
        type: "case-study",
        label: caseStudySnapshot,
        reference: "genie-cli.mdx",
        confidence: "medium",
      },
      {
        type: "package",
        label: "PyPI package",
        href: "https://pypi.org/project/genie-cli/",
        confidence: "context",
      },
    ],
    receipts: [
      {
        label: "Developer velocity",
        value: "6 months to 2 weeks",
        detail: "Production Open Autonomy agent build time reduction.",
        source: resumeSnapshot,
        confidence: "high",
      },
      {
        label: "Interface",
        value: "CLI scaffold",
        detail: "Natural language to agent/service project structure.",
        source: caseStudySnapshot,
        confidence: "medium",
      },
      {
        label: "Distribution",
        value: "PyPI",
        detail: "Case study links to the published package surface.",
        source: "PyPI package",
        href: "https://pypi.org/project/genie-cli/",
        confidence: "context",
      },
    ],
    proofNotes: [
      "GitHub repository lookup failed, so the project is not presented as repo-backed.",
      "The strongest receipt is the resume platform impact metric.",
    ],
  },
  {
    slug: "genie-code-generation",
    snapshotLabel: resumeSnapshot,
    confidence: {
      score: 82,
      label: "Resume-backed",
      detail: "Strong role and impact signal, no public repo dependency.",
    },
    primarySource: {
      type: "resume",
      label: resumeSnapshot,
      reference: "Valory Lead LLM Engineer role",
      confidence: "high",
    },
    sources: [
      {
        type: "resume",
        label: resumeSnapshot,
        reference: "Valory Genie platform",
        confidence: "high",
      },
      {
        type: "case-study",
        label: caseStudySnapshot,
        reference: "genie-code-generation.mdx",
        confidence: "medium",
      },
    ],
    receipts: [
      {
        label: "Build-time reduction",
        value: "6 months to 2 weeks",
        detail: "Open Autonomy agent delivery accelerated through Genie.",
        source: resumeSnapshot,
        confidence: "high",
      },
      {
        label: "System role",
        value: "Lead LLM Engineer",
        detail: "Owned LLM-driven platform and agent scaffolding work.",
        source: resumeSnapshot,
        confidence: "high",
      },
      {
        label: "Delivery surface",
        value: "Agent codegen",
        detail: "Natural language into production-ready agent structure.",
        source: caseStudySnapshot,
        confidence: "medium",
      },
    ],
    proofNotes: [
      "Resume supports the role, time reduction, and platform ownership.",
      "Case study supplies the code generation architecture narrative.",
    ],
  },
  {
    slug: "gitaura",
    snapshotLabel: caseStudySnapshot,
    confidence: {
      score: 62,
      label: "Case study only",
      detail: "Repo links in the case study are not resolvable through gh.",
    },
    primarySource: {
      type: "case-study",
      label: caseStudySnapshot,
      reference: "gitaura.mdx",
      confidence: "medium",
    },
    sources: [
      {
        type: "case-study",
        label: caseStudySnapshot,
        reference: "gitaura.mdx",
        confidence: "medium",
      },
      {
        type: "demo",
        label: "Live demo",
        href: "https://gitaura.vercel.app",
        confidence: "context",
      },
    ],
    receipts: [
      {
        label: "Product surface",
        value: "GitHub analytics",
        detail: "Contribution graphs, aura points, badges, and leaderboards.",
        source: caseStudySnapshot,
        confidence: "medium",
      },
      {
        label: "Demo",
        value: "gitaura.vercel.app",
        detail: "Case study links to the deployed project.",
        source: "Live demo",
        href: "https://gitaura.vercel.app",
        confidence: "context",
      },
      {
        label: "Repo status",
        value: "Unresolved",
        detail: "The referenced GitHub repo was not resolvable via gh.",
        source: githubSnapshot,
        confidence: "context",
      },
    ],
    proofNotes: [
      "Dashboard should not pretend GitAura has a verified repo snapshot.",
      "Evidence is still useful as a product case study and live demo reference.",
    ],
  },
  {
    slug: "plugin-memeooorr",
    snapshotLabel: githubSnapshot,
    confidence: {
      score: 82,
      label: "Public repo",
      detail: "Public Valory repo plus package/case-study context.",
    },
    primarySource: {
      type: "github",
      label: "valory-xyz/plugin-memeooorr",
      href: "https://github.com/valory-xyz/plugin-memeooorr",
      confidence: "high",
    },
    sources: [
      {
        type: "github",
        label: "valory-xyz/plugin-memeooorr",
        href: "https://github.com/valory-xyz/plugin-memeooorr",
        confidence: "high",
      },
      {
        type: "package",
        label: "npm package",
        href: "https://www.npmjs.com/package/@valory-xyz/plugin-memeooorr",
        confidence: "context",
      },
    ],
    receipts: [
      {
        label: "Repository",
        value: "TypeScript",
        detail: "Public plugin repository for meme-aware agents.",
        source: "GitHub",
        href: "https://github.com/valory-xyz/plugin-memeooorr",
        confidence: "high",
      },
      {
        label: "Repo signal",
        value: "0 stars / 0 forks",
        detail: "Small public repo, still source-visible.",
        source: githubSnapshot,
        href: "https://github.com/valory-xyz/plugin-memeooorr",
        confidence: "high",
      },
      {
        label: "Distribution",
        value: "npm",
        detail: "Case study links to package distribution.",
        source: "npm package",
        href: "https://www.npmjs.com/package/@valory-xyz/plugin-memeooorr",
        confidence: "context",
      },
    ],
    proofNotes: [
      "Repo is public and language-backed.",
      "Package link is contextual because package metadata was not fetched in this pass.",
    ],
  },
  {
    slug: "rag-chatbot-oil-gas",
    snapshotLabel: caseStudySnapshot,
    confidence: {
      score: 68,
      label: "Case study",
      detail: "Private industrial project with architecture and source-citation claims.",
    },
    primarySource: {
      type: "case-study",
      label: caseStudySnapshot,
      reference: "rag-chatbot-oil-gas.mdx",
      confidence: "medium",
    },
    sources: [
      {
        type: "case-study",
        label: caseStudySnapshot,
        reference: "rag-chatbot-oil-gas.mdx",
        confidence: "medium",
      },
      {
        type: "resume",
        label: resumeSnapshot,
        reference: "Mechademy LLM and MLOps role",
        confidence: "high",
      },
    ],
    receipts: [
      {
        label: "Domain",
        value: "Oil and Gas RAG",
        detail: "Technical documents become cited conversational answers.",
        source: caseStudySnapshot,
        confidence: "medium",
      },
      {
        label: "Architecture",
        value: "GPT-4 + LlamaIndex",
        detail: "RAG stack described in the project case study.",
        source: caseStudySnapshot,
        confidence: "medium",
      },
      {
        label: "Role context",
        value: "Production AI services",
        detail: "Resume states enterprise AI services with Kubernetes delivery.",
        source: resumeSnapshot,
        confidence: "high",
      },
    ],
    proofNotes: [
      "This is employer/client work, so evidence is intentionally source-labeled.",
      "Source-citation behavior is central to the project proof story.",
    ],
  },
  {
    slug: "text2sql-agent",
    snapshotLabel: resumeSnapshot,
    confidence: {
      score: 82,
      label: "Resume-backed",
      detail: "Resume and case study both support the repair-time outcome.",
    },
    primarySource: {
      type: "resume",
      label: resumeSnapshot,
      reference: "Mechademy Text2SQL2Plot work",
      confidence: "high",
    },
    sources: [
      {
        type: "resume",
        label: resumeSnapshot,
        reference: "Mechademy LLM and MLOps role",
        confidence: "high",
      },
      {
        type: "case-study",
        label: caseStudySnapshot,
        reference: "text2sql-agent.mdx",
        confidence: "medium",
      },
    ],
    receipts: [
      {
        label: "Operational impact",
        value: "20% repair-time cut",
        detail: "Plant operators used NL-to-SQL and visualizations.",
        source: resumeSnapshot,
        confidence: "high",
      },
      {
        label: "Interface",
        value: "FastAPI-style services",
        detail: "Resume states service exposure for plant operators.",
        source: resumeSnapshot,
        confidence: "high",
      },
      {
        label: "Model stack",
        value: "Vanna + GPT-4o-mini",
        detail: "Case study describes Text-to-SQL model stack.",
        source: caseStudySnapshot,
        confidence: "medium",
      },
    ],
    proofNotes: [
      "Resume validates the user outcome and production service role.",
      "Case study provides implementation framing for the LLM analytics agent.",
    ],
  },
  {
    slug: "text2sql2plot",
    snapshotLabel: resumeSnapshot,
    confidence: {
      score: 84,
      label: "Resume + case study",
      detail: "Operational impact and case-study accuracy metrics align.",
    },
    primarySource: {
      type: "resume",
      label: resumeSnapshot,
      reference: "Mechademy Text2SQL2Plot work",
      confidence: "high",
    },
    sources: [
      {
        type: "resume",
        label: resumeSnapshot,
        reference: "Mechademy LLM and MLOps role",
        confidence: "high",
      },
      {
        type: "case-study",
        label: caseStudySnapshot,
        reference: "text2sql2plot.mdx",
        confidence: "medium",
      },
    ],
    receipts: [
      {
        label: "Repair time",
        value: "20% reduction",
        detail: "Natural language analytics reduced repair time.",
        source: resumeSnapshot,
        confidence: "high",
      },
      {
        label: "Query quality",
        value: "85% accuracy",
        detail: "Complex analytical question accuracy from case study.",
        source: caseStudySnapshot,
        confidence: "medium",
      },
      {
        label: "Deployment breadth",
        value: "15 facilities",
        detail: "Industrial rollout described in case-study impact.",
        source: caseStudySnapshot,
        confidence: "medium",
      },
    ],
    proofNotes: [
      "Resume supports the repair-time outcome.",
      "Case study carries facility and accuracy details.",
    ],
  },
  {
    slug: "turbomachinery-failure-prediction",
    snapshotLabel: resumeSnapshot,
    confidence: {
      score: 82,
      label: "Resume-backed",
      detail: "Industrial ML outcome supported by resume and case study.",
    },
    primarySource: {
      type: "resume",
      label: resumeSnapshot,
      reference: "Mechademy anomaly and failure prediction",
      confidence: "high",
    },
    sources: [
      {
        type: "resume",
        label: resumeSnapshot,
        reference: "Mechademy production AI services",
        confidence: "high",
      },
      {
        type: "case-study",
        label: caseStudySnapshot,
        reference: "turbomachinery-failure-prediction.mdx",
        confidence: "medium",
      },
    ],
    receipts: [
      {
        label: "Prediction quality",
        value: "96.5% accuracy",
        detail: "Failure-prediction services for industrial clients.",
        source: resumeSnapshot,
        confidence: "high",
      },
      {
        label: "Warning window",
        value: "7-30 days",
        detail: "Case study describes proactive maintenance window.",
        source: caseStudySnapshot,
        confidence: "medium",
      },
      {
        label: "Model evidence",
        value: "Explainable signals",
        detail: "Case study references SHAP-driven prediction explanations.",
        source: caseStudySnapshot,
        confidence: "medium",
      },
    ],
    proofNotes: [
      "Resume validates the top-line accuracy claim.",
      "Case study provides feature and alerting detail for evaluators.",
    ],
  },
] as const satisfies readonly ProjectEvidence[];

const fallbackEvidence = {
  snapshotLabel: caseStudySnapshot,
  confidence: {
    score: 50,
    label: "Case study",
    detail: "Source metadata unavailable; falling back to portfolio content.",
  },
  primarySource: {
    type: "case-study",
    label: caseStudySnapshot,
    confidence: "context",
  },
  sources: [
    {
      type: "case-study",
      label: caseStudySnapshot,
      confidence: "context",
    },
  ],
  receipts: [
    {
      label: "Portfolio source",
      value: "Case study",
      detail: "Project content is available in the portfolio case study.",
      source: caseStudySnapshot,
      confidence: "context",
    },
  ],
  proofNotes: ["Evidence fallback used because no project-specific receipt was found."],
} as const;

export function getProjectEvidence(slug: ProjectSlug): ProjectEvidence {
  const evidence = projectEvidence.find((project) => project.slug === slug);

  if (evidence) {
    return evidence;
  }

  return {
    slug,
    ...fallbackEvidence,
  };
}
