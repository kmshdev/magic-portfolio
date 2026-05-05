export type GitAuraMonth = {
  month: string;
  contributions: number;
  activeDays: number;
};

export type GitAuraRepo = {
  name: string;
  description: string;
  url: string;
  language: string;
  updatedAt: string;
  isFork: boolean;
  stars: number;
  forks: number;
};

export const githubAura = {
  sourceUrl: "https://github.com/kmshdev",
  snapshotLabel: "GitHub snapshot: May 4, 2026",
  profile: {
    login: "kmshdev",
    name: "Keshav",
    bio: "LLM and ML engineer shipping agentic systems, MLOps, and native tooling.",
    followers: 22,
    following: 11,
    publicRepos: 59,
  },
  totals: {
    contributions: 5414,
    commits: 5044,
    issues: 43,
    pullRequests: 200,
    reviews: 23,
    activeDays: 210,
    peakDay: {
      date: "2026-03-30",
      contributions: 220,
    },
    last30Days: 538,
  },
  aura: {
    score: 54140,
    label: "Code Deity",
    monthlyScore: 780,
    consistency: 57,
    commitShare: 93,
    collaboration: 89,
    repositoryBreadth: 74,
  },
  months: [
    { month: "Jun 2025", contributions: 57, activeDays: 16 },
    { month: "Jul 2025", contributions: 580, activeDays: 22 },
    { month: "Aug 2025", contributions: 212, activeDays: 15 },
    { month: "Sep 2025", contributions: 580, activeDays: 24 },
    { month: "Oct 2025", contributions: 22, activeDays: 5 },
    { month: "Nov 2025", contributions: 33, activeDays: 8 },
    { month: "Dec 2025", contributions: 347, activeDays: 17 },
    { month: "Jan 2026", contributions: 316, activeDays: 16 },
    { month: "Feb 2026", contributions: 861, activeDays: 24 },
    { month: "Mar 2026", contributions: 1721, activeDays: 26 },
    { month: "Apr 2026", contributions: 463, activeDays: 18 },
    { month: "May 2026", contributions: 78, activeDays: 2 },
  ] satisfies readonly GitAuraMonth[],
  repos: [
    {
      name: "magic-portfolio",
      description: "Once UI portfolio with generated project walkthrough media.",
      url: "https://github.com/kmshdev/magic-portfolio",
      language: "TypeScript",
      updatedAt: "2026-05-03",
      isFork: true,
      stars: 0,
      forks: 0,
    },
    {
      name: "SwiftAgent",
      description: "Native Swift SDK for autonomous AI agents.",
      url: "https://github.com/kmshdev/SwiftAgent",
      language: "Swift",
      updatedAt: "2026-05-01",
      isFork: true,
      stars: 0,
      forks: 0,
    },
    {
      name: "claude-swift-toolkit",
      description: "Swift and macOS toolkit for agent-assisted development.",
      url: "https://github.com/kmshdev/claude-swift-toolkit",
      language: "Swift",
      updatedAt: "2026-04-11",
      isFork: false,
      stars: 1,
      forks: 0,
    },
    {
      name: "klic-kust",
      description: "Custom keyboard and macOS input workflow experiments.",
      url: "https://github.com/kmshdev/klic-kust",
      language: "Swift",
      updatedAt: "2026-03-01",
      isFork: false,
      stars: 0,
      forks: 0,
    },
  ] satisfies readonly GitAuraRepo[],
  architecture: [
    "GitHub API profile ingest",
    "Contribution calendar scoring",
    "Aura rank and trend engine",
    "Embeddable dashboard widgets",
  ],
  chapters: [
    {
      title: "Signal ingest",
      detail: "Public repos, followers, contributions, PRs, reviews, and issues.",
    },
    {
      title: "Aura model",
      detail: "Weighted activity becomes a readable score, rank, and consistency gauge.",
    },
    {
      title: "Portfolio surface",
      detail: "A dashboard section turns GitAura analytics into proof of real work.",
    },
  ],
} as const;
