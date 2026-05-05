// import a pre-defined template for config and content options
export {
  about,
  blog,
  gallery,
  home,
  newsletter,
  person,
  social,
  work,
} from "./content";
export type { GitAuraMonth, GitAuraRepo } from "./githubAura";
export { githubAura } from "./githubAura";
export {
  baseURL,
  dataStyle,
  display,
  effects,
  fonts,
  mailchimp,
  protectedRoutes,
  routes,
  sameAs,
  schema,
  socialSharing,
  style,
} from "./once-ui.config";
export type {
  EvidenceConfidence,
  EvidenceReceipt,
  EvidenceSource,
  EvidenceSourceType,
  ProjectEvidence,
} from "./projectEvidence";
export { getProjectEvidence } from "./projectEvidence";
export type { ProjectSlug, ProjectVisual } from "./projectVisuals";
export { getProjectVisual, projectVisuals } from "./projectVisuals";
