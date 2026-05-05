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
import type { EvidenceReceipt, ProjectEvidence } from "../src/resources/projectEvidence";
import type { ProjectVisual } from "../src/resources/projectVisuals";

type ProjectDashboardWalkthroughProps = {
  evidence: ProjectEvidence;
  project: ProjectVisual;
};

type ProjectOnlyProps = Pick<ProjectDashboardWalkthroughProps, "project">;

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

function fillWidth(frame: number, start: number, fps: number, value: number) {
  return interpolate(frame, [start, start + seconds(0.8, fps)], [0, value], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function SceneShell({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <AbsoluteFill style={styles.stage}>
      <div style={{ ...styles.matrix, backgroundColor: accent }} />
      <div style={{ ...styles.glow, backgroundColor: accent }} />
      {children}
    </AbsoluteFill>
  );
}

function CoverTile({ project }: ProjectOnlyProps) {
  const coverSrc = staticFile(project.cover.replace(/^\//, ""));

  return (
    <div style={styles.coverTile}>
      <Img src={coverSrc} style={styles.coverImage} />
      <div style={{ ...styles.coverShade, backgroundColor: project.accent }} />
    </div>
  );
}

function ReceiptCard({ accent, receipt }: { accent: string; receipt: EvidenceReceipt }) {
  return (
    <div style={styles.kpiCard}>
      <div style={{ ...styles.kpiRail, backgroundColor: accent }} />
      <div style={styles.kpiLabel}>{receipt.label}</div>
      <div style={styles.kpiValue}>{receipt.value}</div>
      <div style={styles.kpiSource}>{receipt.source}</div>
    </div>
  );
}

function DashboardScene({ evidence, project }: ProjectDashboardWalkthroughProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const receipts = evidence.receipts.slice(0, 3);

  return (
    <SceneShell accent={project.accent}>
      <div style={{ ...styles.dashboardGrid, ...appear(frame, 0, fps, 18) }}>
        <div style={styles.heroPanel}>
          <div style={{ ...styles.eyebrow, color: project.accent }}>{project.eyebrow}</div>
          <div style={styles.title}>{project.title}</div>
          <div style={styles.summary}>{project.summary}</div>
          <div style={styles.kpiRow}>
            {receipts.map((receipt) => (
              <ReceiptCard
                key={`${receipt.label}-${receipt.value}`}
                accent={project.accent}
                receipt={receipt}
              />
            ))}
          </div>
        </div>
        <div style={styles.sidePanel}>
          <CoverTile project={project} />
          <div style={styles.gaugeWrap}>
            <div style={{ ...styles.gaugeRing, borderColor: project.accent }}>
              {evidence.confidence.score}%
            </div>
            <div style={styles.gaugeLabel}>{evidence.confidence.label}</div>
            <div style={styles.sourceLabel}>{evidence.snapshotLabel}</div>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

function WorkflowScene({ project }: ProjectOnlyProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell accent={project.accent}>
      <SceneHeader
        accent={project.accent}
        eyebrow="Workflow"
        title="From input to working system"
      />
      <div style={styles.workflowBoard}>
        {project.workflow.map((step, index) => (
          <div
            key={step}
            style={{
              ...styles.workflowCard,
              ...appear(frame, seconds(index * 0.22, fps), fps, 16),
            }}
          >
            <div style={{ ...styles.stepBadge, borderColor: project.accent }}>
              {String(index + 1).padStart(2, "0")}
            </div>
            <div style={styles.stepText}>{step}</div>
            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressFill,
                  backgroundColor: project.accent,
                  width: `${fillWidth(frame, seconds(0.25 + index * 0.18, fps), fps, 86)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </SceneShell>
  );
}

function SceneHeader({
  accent,
  eyebrow,
  title,
}: {
  accent: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div style={styles.sceneHeader}>
      <div style={{ ...styles.eyebrow, color: accent }}>{eyebrow}</div>
      <div style={styles.sceneTitle}>{title}</div>
    </div>
  );
}

function ArchitectureScene({ evidence, project }: ProjectDashboardWalkthroughProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell accent={project.accent}>
      <SceneHeader
        accent={project.accent}
        eyebrow="Architecture"
        title="Layers, signals, outcomes"
      />
      <div style={styles.architectureBoard}>
        <div style={styles.layerPanel}>
          {project.architecture.map((layer, index) => (
            <div
              key={layer}
              style={{
                ...styles.layerCard,
                ...appear(frame, seconds(index * 0.2, fps), fps, 14),
                borderColor: project.accent,
              }}
            >
              {layer}
            </div>
          ))}
        </div>
        <div style={styles.outcomePanel}>
          {project.outcomes.slice(0, 2).map((outcome, index) => (
            <div
              key={outcome}
              style={{
                ...styles.outcomeCard,
                ...appear(frame, seconds(0.7 + index * 0.2, fps), fps, 12),
              }}
            >
              <span style={{ ...styles.outcomeDot, backgroundColor: project.accent }} />
              {outcome}
            </div>
          ))}
          {evidence.proofNotes.slice(0, 2).map((note, index) => (
            <div
              key={note}
              style={{
                ...styles.proofCard,
                ...appear(frame, seconds(1.25 + index * 0.2, fps), fps, 12),
              }}
            >
              <span style={{ ...styles.outcomeDot, backgroundColor: project.accent }} />
              {note}
            </div>
          ))}
        </div>
      </div>
    </SceneShell>
  );
}

export function ProjectDashboardWalkthrough({
  evidence,
  project,
}: ProjectDashboardWalkthroughProps) {
  const { fps } = useVideoConfig();
  const sceneDuration = seconds(4, fps);

  return (
    <AbsoluteFill style={styles.stage}>
      <Sequence from={0} durationInFrames={sceneDuration}>
        <DashboardScene evidence={evidence} project={project} />
      </Sequence>
      <Sequence from={sceneDuration} durationInFrames={sceneDuration}>
        <WorkflowScene project={project} />
      </Sequence>
      <Sequence from={sceneDuration * 2} durationInFrames={sceneDuration}>
        <ArchitectureScene evidence={evidence} project={project} />
      </Sequence>
    </AbsoluteFill>
  );
}

const styles = {
  stage: {
    background: "linear-gradient(135deg, #080d12 0%, #101922 54%, #070a0f 100%)",
    color: "#f8fafc",
    fontFamily: "Inter, Arial, sans-serif",
    overflow: "hidden",
  },
  matrix: {
    position: "absolute",
    inset: 0,
    opacity: 0.1,
    maskImage: "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)",
    backgroundImage:
      "linear-gradient(90deg, currentColor 1px, transparent 1px), " +
      "linear-gradient(currentColor 1px, transparent 1px)",
    backgroundSize: "54px 54px",
  },
  glow: {
    position: "absolute",
    width: 520,
    height: 520,
    right: -120,
    top: -180,
    opacity: 0.24,
    filter: "blur(120px)",
    borderRadius: 999,
  },
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "1.35fr 0.8fr",
    gap: 34,
    height: "100%",
    padding: 78,
  },
  heroPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 42,
    borderRadius: 30,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.07)",
    boxShadow: "0 40px 110px rgba(0, 0, 0, 0.3)",
  },
  eyebrow: {
    fontSize: 25,
    fontWeight: 850,
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 70,
    fontWeight: 900,
    lineHeight: 0.96,
    letterSpacing: 0,
    maxWidth: 1000,
  },
  summary: {
    color: "rgba(248, 250, 252, 0.76)",
    fontSize: 28,
    lineHeight: 1.35,
    maxWidth: 930,
  },
  kpiRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
  },
  kpiCard: {
    position: "relative",
    overflow: "hidden",
    padding: 22,
    borderRadius: 22,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(255, 255, 255, 0.08)",
  },
  kpiRail: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  kpiLabel: {
    color: "rgba(248, 250, 252, 0.64)",
    fontSize: 19,
    fontWeight: 650,
  },
  kpiValue: {
    marginTop: 10,
    fontSize: 42,
    fontWeight: 900,
  },
  kpiSource: {
    marginTop: 8,
    color: "rgba(248, 250, 252, 0.58)",
    fontSize: 17,
    fontWeight: 650,
  },
  sidePanel: {
    display: "grid",
    gridTemplateRows: "1fr auto",
    gap: 22,
  },
  coverTile: {
    position: "relative",
    overflow: "hidden",
    minHeight: 560,
    borderRadius: 30,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    boxShadow: "0 40px 110px rgba(0, 0, 0, 0.36)",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  coverShade: {
    position: "absolute",
    inset: "auto 12% -16% 12%",
    height: 150,
    opacity: 0.5,
    filter: "blur(58px)",
  },
  gaugeWrap: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    padding: 26,
    borderRadius: 26,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.07)",
  },
  gaugeRing: {
    display: "grid",
    placeItems: "center",
    width: 142,
    height: 142,
    borderRadius: 999,
    border: "14px solid",
    fontSize: 32,
    fontWeight: 900,
  },
  gaugeLabel: {
    color: "rgba(248, 250, 252, 0.72)",
    fontSize: 24,
    fontWeight: 750,
  },
  sourceLabel: {
    color: "rgba(248, 250, 252, 0.52)",
    fontSize: 18,
    fontWeight: 650,
    maxWidth: 280,
  },
  sceneHeader: {
    padding: "76px 86px 0",
  },
  sceneTitle: {
    fontSize: 54,
    fontWeight: 900,
    letterSpacing: 0,
    marginTop: 8,
  },
  workflowBoard: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 18,
    padding: "76px 86px",
  },
  workflowCard: {
    minHeight: 520,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 24,
    borderRadius: 26,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.08)",
    boxShadow: "0 34px 90px rgba(0, 0, 0, 0.24)",
  },
  stepBadge: {
    display: "grid",
    placeItems: "center",
    width: 66,
    height: 66,
    borderRadius: 18,
    border: "2px solid",
    fontSize: 22,
    fontWeight: 900,
  },
  stepText: {
    fontSize: 30,
    lineHeight: 1.15,
    fontWeight: 850,
  },
  progressTrack: {
    height: 10,
    borderRadius: 99,
    background: "rgba(255, 255, 255, 0.12)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 99,
  },
  architectureBoard: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 34,
    padding: "70px 86px",
  },
  layerPanel: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 18,
  },
  layerCard: {
    minHeight: 180,
    display: "flex",
    alignItems: "center",
    padding: 26,
    borderRadius: 24,
    border: "2px solid",
    background: "rgba(255, 255, 255, 0.08)",
    color: "#f8fafc",
    fontSize: 30,
    fontWeight: 850,
  },
  outcomePanel: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  outcomeCard: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    padding: 26,
    borderRadius: 24,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.08)",
    color: "rgba(248, 250, 252, 0.86)",
    fontSize: 28,
    lineHeight: 1.2,
    fontWeight: 760,
  },
  proofCard: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    padding: 24,
    borderRadius: 24,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(255, 255, 255, 0.06)",
    color: "rgba(248, 250, 252, 0.72)",
    fontSize: 23,
    lineHeight: 1.25,
    fontWeight: 690,
  },
  outcomeDot: {
    width: 18,
    height: 18,
    flexShrink: 0,
    borderRadius: 999,
  },
} satisfies Record<string, React.CSSProperties>;
