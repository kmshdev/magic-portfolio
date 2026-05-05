import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { githubAura } from "../src/resources/githubAura";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const maxMonth = Math.max(...githubAura.months.map((month) => month.contributions));

function seconds(value: number, fps: number) {
  return Math.round(value * fps);
}

function compact(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 1 : 2)}K`;
  }

  return value.toLocaleString("en-US");
}

function appear(frame: number, start: number, fps: number, distance = 34): React.CSSProperties {
  const progress = interpolate(frame, [start, start + seconds(0.75, fps)], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return {
    opacity: progress,
    transform: `translateY(${(1 - progress) * distance}px)`,
  };
}

function grow(frame: number, start: number, fps: number, target: number) {
  return interpolate(frame, [start, start + seconds(0.9, fps)], [0, target], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function SceneShell({ children }: { children: React.ReactNode }) {
  return (
    <AbsoluteFill style={styles.stage}>
      <div style={styles.matrix} />
      <div style={styles.halo} />
      {children}
    </AbsoluteFill>
  );
}

function MetricCard({
  label,
  value,
  detail,
  delay,
}: {
  label: string;
  value: string;
  detail: string;
  delay: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ ...styles.metricCard, ...appear(frame, seconds(delay, fps), fps, 18) }}>
      <div style={styles.metricLabel}>{label}</div>
      <div style={styles.metricValue}>{value}</div>
      <div style={styles.metricDetail}>{detail}</div>
    </div>
  );
}

function Gauge({ label, value, delay }: { label: string; value: number; delay: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const width = grow(frame, seconds(delay, fps), fps, value);

  return (
    <div style={styles.gaugeGroup}>
      <div style={styles.gaugeHeader}>
        <span>{label}</span>
        <strong>{Math.round(width)}%</strong>
      </div>
      <div style={styles.gaugeTrack}>
        <div style={{ ...styles.gaugeFill, width: `${width}%` }} />
      </div>
    </div>
  );
}

function HeroScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = interpolate(frame, [0, seconds(2, fps)], [0.97, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell>
      <div style={{ ...styles.browser, transform: `scale(${scale})` }}>
        <div style={styles.browserBar}>
          <div style={styles.windowDots}>
            <span style={styles.dot} />
            <span style={styles.dot} />
            <span style={styles.dot} />
          </div>
          <div style={styles.address}>github.com/{githubAura.profile.login}</div>
          <div style={styles.syncButton}>Sync</div>
        </div>

        <div style={styles.heroGrid}>
          <div style={{ ...styles.heroCopy, ...appear(frame, 0, fps, 22) }}>
            <div style={styles.eyebrow}>GitAura analysis</div>
            <div style={styles.title}>Contribution signal, scored and explained.</div>
            <div style={styles.summary}>
              GitAura turns {compact(githubAura.totals.contributions)} contributions into an aura
              score, consistency profile, and repo-level work overview.
            </div>
          </div>

          <div style={{ ...styles.rankPanel, ...appear(frame, seconds(0.25, fps), fps, 18) }}>
            <div style={styles.rankLabel}>Overall standing</div>
            <div style={styles.rankValue}>{githubAura.aura.label}</div>
            <div style={styles.rankScore}>{compact(githubAura.aura.score)} aura</div>
          </div>
        </div>

        <div style={styles.metricGrid}>
          <MetricCard
            label="Public repos"
            value={githubAura.profile.publicRepos.toString()}
            detail="Profile breadth"
            delay={0.45}
          />
          <MetricCard
            label="Active days"
            value={githubAura.totals.activeDays.toString()}
            detail="Contribution year"
            delay={0.6}
          />
          <MetricCard
            label="Last 30 days"
            value={githubAura.totals.last30Days.toString()}
            detail="Recent output"
            delay={0.75}
          />
          <MetricCard
            label="Pull requests"
            value={githubAura.totals.pullRequests.toString()}
            detail="Collaboration trail"
            delay={0.9}
          />
        </div>
      </div>
    </SceneShell>
  );
}

function ScoreScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const radial = grow(frame, seconds(0.35, fps), fps, githubAura.aura.consistency);
  const radius = 118;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - radial / 100);

  return (
    <SceneShell>
      <div style={styles.sceneHeader}>
        <div style={styles.eyebrow}>Aura model</div>
        <div style={styles.sceneTitle}>Readable metrics without flattening the work.</div>
      </div>
      <div style={styles.scoreLayout}>
        <div style={{ ...styles.radialPanel, ...appear(frame, 0, fps, 20) }}>
          <svg width="320" height="320" viewBox="0 0 320 320" role="img">
            <title>GitAura consistency gauge</title>
            <circle cx="160" cy="160" r={radius} stroke="#203025" strokeWidth="22" fill="none" />
            <circle
              cx="160"
              cy="160"
              r={radius}
              stroke="#36d472"
              strokeWidth="22"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 160 160)"
            />
          </svg>
          <div style={styles.radialCenter}>
            <div style={styles.radialValue}>{Math.round(radial)}%</div>
            <div style={styles.radialLabel}>Consistency</div>
          </div>
        </div>

        <div style={{ ...styles.gaugePanel, ...appear(frame, seconds(0.2, fps), fps, 22) }}>
          <Gauge label="Commit signal" value={githubAura.aura.commitShare} delay={0.5} />
          <Gauge label="Collaboration" value={githubAura.aura.collaboration} delay={0.75} />
          <Gauge label="Repo breadth" value={githubAura.aura.repositoryBreadth} delay={1} />
          <div style={styles.scoreFootnote}>
            Peak day: {githubAura.totals.peakDay.contributions} contributions on{" "}
            {githubAura.totals.peakDay.date}
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

function TimelineScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell>
      <div style={styles.sceneHeader}>
        <div style={styles.eyebrow}>Bento overview</div>
        <div style={styles.sceneTitle}>The static heatmap becomes a paced monthly readout.</div>
      </div>
      <div style={styles.monthGrid}>
        {githubAura.months.map((month, index) => {
          const height = grow(
            frame,
            seconds(0.18 + index * 0.05, fps),
            fps,
            Math.max(14, (month.contributions / maxMonth) * 100),
          );

          return (
            <div
              key={month.month}
              style={{ ...styles.monthCard, ...appear(frame, seconds(index * 0.04, fps), fps, 14) }}
            >
              <div style={styles.monthLabel}>{month.month}</div>
              <div style={styles.monthValue}>{month.contributions}</div>
              <div style={styles.monthBarTrack}>
                <div style={{ ...styles.monthBar, height: `${height}%` }} />
              </div>
              <div style={styles.monthMeta}>{month.activeDays} active days</div>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
}

function ArchitectureScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell>
      <div style={styles.sceneHeader}>
        <div style={styles.eyebrow}>System walkthrough</div>
        <div style={styles.sceneTitle}>
          How GitAura turns profile activity into a portfolio surface.
        </div>
      </div>
      <div style={styles.architectureRow}>
        {githubAura.architecture.map((layer, index) => (
          <div
            key={layer}
            style={{
              ...styles.architectureNode,
              ...appear(frame, seconds(index * 0.22, fps), fps, 20),
            }}
          >
            <div style={styles.nodeIndex}>{String(index + 1).padStart(2, "0")}</div>
            <div style={styles.nodeText}>{layer}</div>
            {index < githubAura.architecture.length - 1 && <div style={styles.nodeConnector} />}
          </div>
        ))}
      </div>
      <div style={{ ...styles.repoPanel, ...appear(frame, seconds(1.05, fps), fps, 18) }}>
        {githubAura.repos.map((repo) => (
          <div key={repo.name} style={styles.repoRow}>
            <div style={styles.repoDot} />
            <div style={styles.repoCopy}>
              <strong>{repo.name}</strong>
              <span>{repo.language}</span>
            </div>
            <div style={styles.repoDate}>{repo.updatedAt}</div>
          </div>
        ))}
      </div>
    </SceneShell>
  );
}

export function GitAuraHero() {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={styles.stage}>
      <Sequence from={0} durationInFrames={seconds(3.5, fps)}>
        <HeroScene />
      </Sequence>
      <Sequence from={seconds(3.5, fps)} durationInFrames={seconds(3.5, fps)}>
        <ScoreScene />
      </Sequence>
      <Sequence from={seconds(7, fps)} durationInFrames={seconds(3.5, fps)}>
        <TimelineScene />
      </Sequence>
      <Sequence from={seconds(10.5, fps)} durationInFrames={seconds(3.5, fps)}>
        <ArchitectureScene />
      </Sequence>
    </AbsoluteFill>
  );
}

const styles = {
  stage: {
    background: "linear-gradient(135deg, #050806 0%, #07120c 45%, #020403 100%)",
    color: "#f8fafc",
    fontFamily: "Inter, Arial, sans-serif",
    overflow: "hidden",
  },
  matrix: {
    position: "absolute",
    inset: 0,
    opacity: 0.1,
    backgroundImage:
      "linear-gradient(90deg, rgba(54, 212, 114, 0.18) 1px, transparent 1px), " +
      "linear-gradient(rgba(54, 212, 114, 0.14) 1px, transparent 1px)",
    backgroundSize: "42px 42px",
    maskImage: "radial-gradient(circle at 50% 35%, black, transparent 72%)",
  },
  halo: {
    position: "absolute",
    inset: "8% 14% auto",
    height: 280,
    borderRadius: 999,
    background: "radial-gradient(circle, rgba(54, 212, 114, 0.26), transparent 68%)",
    filter: "blur(40px)",
  },
  browser: {
    position: "absolute",
    inset: 72,
    borderRadius: 34,
    border: "1px solid rgba(255, 255, 255, 0.16)",
    background: "rgba(4, 7, 5, 0.86)",
    boxShadow: "0 44px 140px rgba(0, 0, 0, 0.55)",
    overflow: "hidden",
  },
  browserBar: {
    height: 82,
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
    display: "grid",
    gridTemplateColumns: "170px 1fr 170px",
    alignItems: "center",
    padding: "0 34px",
  },
  windowDots: {
    display: "flex",
    gap: 12,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 99,
    background: "rgba(255, 255, 255, 0.35)",
  },
  address: {
    height: 46,
    borderRadius: 99,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    color: "rgba(248, 250, 252, 0.58)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 26,
  },
  syncButton: {
    justifySelf: "end",
    borderRadius: 999,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    padding: "12px 24px",
    color: "rgba(248, 250, 252, 0.78)",
    fontSize: 22,
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1.25fr 0.75fr",
    gap: 36,
    padding: "72px 74px 0",
  },
  heroCopy: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  eyebrow: {
    color: "#36d472",
    fontSize: 24,
    fontWeight: 850,
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  title: {
    maxWidth: 980,
    fontSize: 72,
    lineHeight: 0.96,
    fontWeight: 900,
    letterSpacing: 0,
  },
  summary: {
    maxWidth: 820,
    color: "rgba(248, 250, 252, 0.7)",
    fontSize: 28,
    lineHeight: 1.35,
  },
  rankPanel: {
    borderRadius: 26,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.06)",
    padding: 34,
    alignSelf: "start",
  },
  rankLabel: {
    color: "rgba(248, 250, 252, 0.52)",
    fontSize: 22,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 4,
  },
  rankValue: {
    color: "#facc15",
    fontSize: 44,
    fontWeight: 900,
    marginTop: 32,
  },
  rankScore: {
    color: "rgba(248, 250, 252, 0.68)",
    fontSize: 28,
    marginTop: 12,
  },
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 20,
    padding: "48px 74px",
  },
  metricCard: {
    borderRadius: 24,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.07)",
    padding: 28,
  },
  metricLabel: {
    color: "rgba(248, 250, 252, 0.56)",
    fontSize: 20,
    fontWeight: 760,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  metricValue: {
    fontSize: 48,
    fontWeight: 900,
    marginTop: 24,
  },
  metricDetail: {
    color: "rgba(248, 250, 252, 0.6)",
    fontSize: 22,
    marginTop: 10,
  },
  sceneHeader: {
    padding: "78px 88px 0",
  },
  sceneTitle: {
    maxWidth: 1040,
    marginTop: 12,
    fontSize: 58,
    lineHeight: 1.02,
    fontWeight: 900,
  },
  scoreLayout: {
    display: "grid",
    gridTemplateColumns: "0.85fr 1fr",
    gap: 54,
    padding: "62px 88px 0",
  },
  radialPanel: {
    minHeight: 520,
    borderRadius: 30,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.06)",
    display: "grid",
    placeItems: "center",
    position: "relative",
  },
  radialCenter: {
    position: "absolute",
    textAlign: "center",
  },
  radialValue: {
    fontSize: 72,
    fontWeight: 900,
  },
  radialLabel: {
    color: "rgba(248, 250, 252, 0.56)",
    fontSize: 24,
    marginTop: 4,
  },
  gaugePanel: {
    minHeight: 520,
    borderRadius: 30,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.06)",
    padding: 44,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 42,
  },
  gaugeGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  gaugeHeader: {
    display: "flex",
    justifyContent: "space-between",
    color: "rgba(248, 250, 252, 0.8)",
    fontSize: 26,
  },
  gaugeTrack: {
    height: 18,
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },
  gaugeFill: {
    height: "100%",
    borderRadius: 999,
    background: "linear-gradient(90deg, #36d472, #8cf5b1)",
  },
  scoreFootnote: {
    color: "rgba(248, 250, 252, 0.58)",
    fontSize: 24,
  },
  monthGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 18,
    padding: "54px 88px 0",
  },
  monthCard: {
    minHeight: 260,
    borderRadius: 24,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.07)",
    padding: 22,
    display: "grid",
    gridTemplateRows: "auto auto 1fr auto",
    gap: 12,
  },
  monthLabel: {
    color: "rgba(248, 250, 252, 0.62)",
    fontSize: 22,
  },
  monthValue: {
    fontSize: 42,
    fontWeight: 900,
  },
  monthBarTrack: {
    alignSelf: "stretch",
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.08)",
    position: "relative",
    overflow: "hidden",
  },
  monthBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 999,
    background: "linear-gradient(180deg, #8cf5b1, #1fae57)",
  },
  monthMeta: {
    color: "rgba(248, 250, 252, 0.55)",
    fontSize: 19,
  },
  architectureRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 24,
    padding: "72px 88px 0",
  },
  architectureNode: {
    position: "relative",
    minHeight: 280,
    borderRadius: 28,
    border: "1px solid rgba(54, 212, 114, 0.36)",
    background: "rgba(255, 255, 255, 0.07)",
    padding: 30,
  },
  nodeIndex: {
    width: 68,
    height: 68,
    borderRadius: 20,
    border: "1px solid rgba(54, 212, 114, 0.5)",
    display: "grid",
    placeItems: "center",
    color: "#8cf5b1",
    fontSize: 24,
    fontWeight: 900,
  },
  nodeText: {
    marginTop: 78,
    fontSize: 30,
    lineHeight: 1.15,
    fontWeight: 850,
  },
  nodeConnector: {
    position: "absolute",
    top: 64,
    right: -25,
    width: 26,
    height: 3,
    background: "#36d472",
  },
  repoPanel: {
    margin: "54px 88px 0",
    borderRadius: 26,
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.07)",
    overflow: "hidden",
  },
  repoRow: {
    display: "grid",
    gridTemplateColumns: "24px 1fr auto",
    alignItems: "center",
    gap: 18,
    padding: "18px 26px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  repoDot: {
    width: 14,
    height: 14,
    borderRadius: 99,
    background: "#36d472",
  },
  repoCopy: {
    display: "flex",
    gap: 18,
    alignItems: "baseline",
    fontSize: 24,
  },
  repoDate: {
    color: "rgba(248, 250, 252, 0.56)",
    fontSize: 21,
  },
} satisfies Record<string, React.CSSProperties>;
