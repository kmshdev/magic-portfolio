import type React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { ProjectVisual } from "../src/resources/projectVisuals";

type ProjectWalkthroughProps = {
  project: ProjectVisual;
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

function seconds(value: number, fps: number) {
  return Math.round(value * fps);
}

function appear(frame: number, start: number, fps: number, distance = 28): React.CSSProperties {
  const progress = interpolate(frame, [start, start + seconds(0.7, fps)], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return {
    opacity: progress,
    transform: `translateY(${(1 - progress) * distance}px)`,
  };
}

function SceneShell({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <AbsoluteFill style={styles.stage}>
      <div style={{ ...styles.grid, backgroundColor: accent }} />
      {children}
    </AbsoluteFill>
  );
}

function CoverPanel({ project }: ProjectWalkthroughProps) {
  const coverSrc = staticFile(project.cover.replace(/^\//, ""));

  return (
    <div style={styles.coverPanel}>
      <Img src={coverSrc} style={styles.coverImage} />
      <div style={{ ...styles.coverGlow, backgroundColor: project.accent }} />
    </div>
  );
}

function IntroScene({ project }: ProjectWalkthroughProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell accent={project.accent}>
      <div style={{ ...styles.introLayout, ...appear(frame, 0, fps, 18) }}>
        <CoverPanel project={project} />
        <div style={styles.copyStack}>
          <div style={{ ...styles.eyebrow, color: project.accent }}>{project.eyebrow}</div>
          <div style={styles.title}>{project.title}</div>
          <div style={styles.summary}>{project.summary}</div>
        </div>
      </div>
    </SceneShell>
  );
}

function WorkflowScene({ project }: ProjectWalkthroughProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell accent={project.accent}>
      <div style={styles.sceneHeader}>
        <div style={{ ...styles.eyebrow, color: project.accent }}>Workflow</div>
        <div style={styles.sceneTitle}>How the system moves from input to outcome</div>
      </div>
      <div style={styles.workflow}>
        {project.workflow.map((step, index) => (
          <WorkflowNode
            key={step}
            accent={project.accent}
            index={index}
            label={step}
            progressStyle={appear(frame, seconds(index * 0.28, fps), fps, 18)}
          />
        ))}
      </div>
    </SceneShell>
  );
}

function WorkflowNode({
  accent,
  index,
  label,
  progressStyle,
}: {
  accent: string;
  index: number;
  label: string;
  progressStyle: React.CSSProperties;
}) {
  return (
    <div style={{ ...styles.workflowNode, ...progressStyle }}>
      <div style={{ ...styles.nodeIndex, borderColor: accent }}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <div style={styles.nodeLabel}>{label}</div>
      {index < 4 && <div style={{ ...styles.connector, backgroundColor: accent }} />}
    </div>
  );
}

function ArchitectureScene({ project }: ProjectWalkthroughProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell accent={project.accent}>
      <div style={styles.sceneHeader}>
        <div style={{ ...styles.eyebrow, color: project.accent }}>Architecture</div>
        <div style={styles.sceneTitle}>Core layers and proof points</div>
      </div>
      <div style={styles.architectureGrid}>
        <div style={styles.layerStack}>
          {project.architecture.map((layer, index) => (
            <div
              key={layer}
              style={{
                ...styles.architectureLayer,
                ...appear(frame, seconds(index * 0.22, fps), fps, 14),
                borderColor: project.accent,
              }}
            >
              {layer}
            </div>
          ))}
        </div>
        <div style={styles.outcomeStack}>
          {project.outcomes.map((outcome, index) => (
            <div
              key={outcome}
              style={{
                ...styles.outcomeBadge,
                ...appear(frame, seconds(0.9 + index * 0.2, fps), fps, 12),
              }}
            >
              <span style={{ ...styles.outcomeDot, backgroundColor: project.accent }} />
              {outcome}
            </div>
          ))}
        </div>
      </div>
    </SceneShell>
  );
}

export function ProjectWalkthrough({ project }: ProjectWalkthroughProps) {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={styles.stage}>
      <Sequence from={0} durationInFrames={seconds(4, fps)}>
        <IntroScene project={project} />
      </Sequence>
      <Sequence from={seconds(4, fps)} durationInFrames={seconds(4, fps)}>
        <WorkflowScene project={project} />
      </Sequence>
      <Sequence from={seconds(8, fps)} durationInFrames={seconds(4, fps)}>
        <ArchitectureScene project={project} />
      </Sequence>
    </AbsoluteFill>
  );
}

const styles = {
  stage: {
    background: "linear-gradient(135deg, #090d12 0%, #111923 55%, #0a0f14 100%)",
    color: "#f8fafc",
    fontFamily: "Inter, Arial, sans-serif",
    overflow: "hidden",
  },
  grid: {
    position: "absolute",
    inset: 0,
    opacity: 0.1,
    maskImage: "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)",
    backgroundImage:
      "linear-gradient(90deg, currentColor 1px, transparent 1px), " +
      "linear-gradient(currentColor 1px, transparent 1px)",
    backgroundSize: "52px 52px",
  },
  introLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 0.9fr",
    gap: 64,
    height: "100%",
    alignItems: "center",
    padding: 88,
  },
  coverPanel: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 28,
    border: "1px solid rgba(255, 255, 255, 0.16)",
    boxShadow: "0 42px 120px rgba(0, 0, 0, 0.42)",
  },
  coverImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  coverGlow: {
    position: "absolute",
    inset: "auto 18% -18% 18%",
    height: 140,
    filter: "blur(54px)",
    opacity: 0.5,
  },
  copyStack: {
    display: "flex",
    flexDirection: "column",
    gap: 22,
  },
  eyebrow: {
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 74,
    fontWeight: 900,
    lineHeight: 0.95,
    letterSpacing: 0,
  },
  summary: {
    color: "rgba(248, 250, 252, 0.76)",
    fontSize: 28,
    lineHeight: 1.35,
    maxWidth: 720,
  },
  sceneHeader: {
    padding: "82px 88px 0",
  },
  sceneTitle: {
    fontSize: 54,
    fontWeight: 850,
    letterSpacing: 0,
    marginTop: 10,
  },
  workflow: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 24,
    padding: "100px 72px 0",
  },
  workflowNode: {
    position: "relative",
    minHeight: 250,
    borderRadius: 24,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.065)",
    boxShadow: "0 28px 80px rgba(0, 0, 0, 0.24)",
    padding: 28,
  },
  nodeIndex: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    borderRadius: 18,
    border: "2px solid",
    color: "#ffffff",
    fontSize: 22,
    fontWeight: 850,
  },
  nodeLabel: {
    marginTop: 54,
    fontSize: 30,
    fontWeight: 800,
    lineHeight: 1.1,
  },
  connector: {
    position: "absolute",
    top: 94,
    right: -25,
    width: 26,
    height: 3,
    opacity: 0.85,
  },
  architectureGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 0.9fr",
    gap: 56,
    padding: "72px 88px 0",
  },
  layerStack: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  architectureLayer: {
    minHeight: 96,
    borderRadius: 22,
    border: "1px solid",
    background: "rgba(255, 255, 255, 0.07)",
    display: "flex",
    alignItems: "center",
    padding: "0 32px",
    fontSize: 32,
    fontWeight: 850,
    boxShadow: "0 26px 70px rgba(0, 0, 0, 0.22)",
  },
  outcomeStack: {
    display: "flex",
    flexDirection: "column",
    gap: 22,
    justifyContent: "center",
  },
  outcomeBadge: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    minHeight: 86,
    borderRadius: 22,
    background: "rgba(255, 255, 255, 0.1)",
    color: "rgba(248, 250, 252, 0.92)",
    padding: "0 26px",
    fontSize: 28,
    fontWeight: 760,
  },
  outcomeDot: {
    width: 16,
    height: 16,
    borderRadius: 99,
    flex: "0 0 auto",
  },
} satisfies Record<string, React.CSSProperties>;
