import { Composition, Folder } from "remotion";
import { getProjectEvidence } from "../src/resources/projectEvidence";
import { projectVisuals } from "../src/resources/projectVisuals";
import { GitAuraHero } from "./GitAuraHero";
import { ProjectDashboardWalkthrough } from "./ProjectDashboardWalkthrough";
import { ProjectWalkthrough } from "./ProjectWalkthrough";

const fps = 30;
const durationInFrames = 12 * fps;
const width = 1920;
const height = 1080;

export function PortfolioWalkthroughRoot() {
  return (
    <>
      <Composition
        id="GitAura-dashboard-hero"
        component={GitAuraHero}
        durationInFrames={14 * fps}
        fps={fps}
        width={width}
        height={height}
      />
      <Folder name="Project-Walkthroughs">
        {projectVisuals.map((project) => (
          <Composition
            key={project.slug}
            id={project.compositionId}
            component={ProjectWalkthrough}
            durationInFrames={durationInFrames}
            fps={fps}
            width={width}
            height={height}
            defaultProps={{ project }}
          />
        ))}
      </Folder>
      <Folder name="Project-Dashboard-Walkthroughs">
        {projectVisuals.map((project) => (
          <Composition
            key={`${project.slug}-dashboard`}
            id={`${project.compositionId}-dashboard`}
            component={ProjectDashboardWalkthrough}
            durationInFrames={durationInFrames}
            fps={fps}
            width={width}
            height={height}
            defaultProps={{ evidence: getProjectEvidence(project.slug), project }}
          />
        ))}
      </Folder>
    </>
  );
}
