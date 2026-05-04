import { Composition, Folder } from "remotion";
import { projectVisuals } from "../src/resources/projectVisuals";
import { GitAuraHero } from "./GitAuraHero";
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
    </>
  );
}
