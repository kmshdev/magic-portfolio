"use client";

import {
  Badge,
  Card,
  Column,
  Grid,
  Heading,
  HoloFx,
  Icon,
  LinearGauge,
  MasonryGrid,
  MatrixFx,
  RadialGauge,
  Row,
  Text,
  TiltFx,
} from "@once-ui-system/core";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { githubAura } from "@/resources";

const MotionColumn = motion.create(Column);

const ease = [0.16, 1, 0.3, 1] as const;

const itemVariants: Variants = {
  hidden: ({ reduceMotion }: { reduceMotion: boolean }) => ({
    opacity: 0,
    y: reduceMotion ? 0 : 14,
  }),
  visible: ({ delay, reduceMotion }: { delay: number; reduceMotion: boolean }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: reduceMotion ? 0 : delay,
      duration: reduceMotion ? 0.01 : 0.42,
      ease,
    },
  }),
};

const compact = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 1 : 2)}K`;
  }

  return value.toLocaleString("en-US");
};

const maxMonth = Math.max(...githubAura.months.map((month) => month.contributions));

const heatmapCells = githubAura.months.flatMap((month, monthIndex) => {
  const level = Math.max(1, Math.ceil((month.contributions / maxMonth) * 4));

  return Array.from({ length: 7 }, (_, dayIndex) => ({
    key: `${month.month}-${dayIndex}`,
    level: (level + monthIndex + dayIndex) % 5,
  }));
});

function PreviewCard({
  children,
  delay,
  flex,
}: {
  children: React.ReactNode;
  delay: number;
  flex?: "1" | "2";
}) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <MotionColumn
      fillWidth
      fitHeight
      flex={flex}
      custom={{ delay, reduceMotion: shouldReduceMotion }}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <Card fillWidth padding="16" radius="l" border="neutral-alpha-medium" background="surface">
        {children}
      </Card>
    </MotionColumn>
  );
}

function ContributionHeatmap() {
  return (
    <Column fillWidth gap="12">
      <Row fillWidth horizontal="between" vertical="center">
        <Text variant="label-default-xs" onBackground="neutral-weak">
          Contribution graph
        </Text>
        <Badge background="success-alpha-weak" onBackground="success-strong">
          {compact(githubAura.totals.contributions)}
        </Badge>
      </Row>
      <Grid columns="12" gap="4" fillWidth minHeight={14}>
        {heatmapCells.map((cell) => (
          <Column
            key={cell.key}
            aspectRatio="1 / 1"
            radius="s"
            background={cell.level > 2 ? "success-strong" : "neutral-alpha-weak"}
            opacity={cell.level === 0 ? 30 : cell.level === 1 ? 50 : cell.level === 2 ? 70 : 100}
          />
        ))}
      </Grid>
      <Row fillWidth horizontal="between">
        <Text variant="body-default-xs" onBackground="neutral-weak">
          Less
        </Text>
        <Text variant="body-default-xs" onBackground="neutral-weak">
          More
        </Text>
      </Row>
    </Column>
  );
}

function AnalyticalPanel() {
  const metrics = [
    ["Active days", githubAura.totals.activeDays],
    ["Peak day", githubAura.totals.peakDay.contributions],
    ["30 day signal", githubAura.totals.last30Days],
  ] as const;

  return (
    <Column fillWidth gap="16">
      <ContributionHeatmap />
      <Grid columns="3" gap="8" fillWidth s={{ columns: "1" }}>
        {metrics.map(([label, value]) => (
          <Column
            key={label}
            gap="2"
            padding="12"
            radius="m"
            border="neutral-alpha-weak"
            background="page"
          >
            <Text variant="label-default-xs" onBackground="neutral-weak">
              {label}
            </Text>
            <Text variant="heading-strong-xs">{compact(value)}</Text>
          </Column>
        ))}
      </Grid>
    </Column>
  );
}

function IngestStack() {
  const items = [
    ["Commits", githubAura.totals.commits],
    ["Pull requests", githubAura.totals.pullRequests],
    ["Issues", githubAura.totals.issues],
    ["Reviews", githubAura.totals.reviews],
    ["Repositories", githubAura.profile.publicRepos],
  ] as const;

  return (
    <Column fillWidth gap="8">
      <Text variant="label-default-xs" onBackground="success-strong">
        Data ingestion
      </Text>
      {items.map(([label, value]) => (
        <Row
          key={label}
          fillWidth
          padding="8"
          gap="8"
          vertical="center"
          radius="m"
          border="neutral-alpha-weak"
          background="page"
        >
          <Icon name={label === "Repositories" ? "grid" : "github"} size="xs" />
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {label}
          </Text>
          <Text style={{ marginLeft: "auto" }} variant="label-strong-xs">
            {compact(value)}
          </Text>
        </Row>
      ))}
    </Column>
  );
}

function AchievementGrid() {
  const achievements = [
    ["Consistency", "calendar"],
    ["Builder", "rocket"],
    ["Collaborator", "person"],
    ["Quality code", "document"],
  ] as const;

  return (
    <Grid columns="2" gap="8">
      {achievements.map(([label, icon]) => (
        <Column
          key={label}
          center
          gap="8"
          padding="12"
          radius="m"
          border="success-alpha-weak"
          background="page"
        >
          <Icon name={icon} onBackground="success-strong" />
          <Text variant="body-default-xs" align="center" onBackground="neutral-weak">
            {label}
          </Text>
        </Column>
      ))}
    </Grid>
  );
}

function AuraGaugePanel() {
  return (
    <Column fillWidth center gap="8" minHeight={14}>
      <RadialGauge
        width={172}
        height={172}
        value={githubAura.aura.consistency}
        unit="%"
        hue="success"
        angle={{ start: -130, sweep: 260 }}
        edgePad={4}
      />
      <Heading as="p" variant="heading-strong-s">
        {compact(githubAura.aura.score)} aura
      </Heading>
      <Text variant="body-default-xs" onBackground="neutral-weak">
        {githubAura.aura.label}
      </Text>
    </Column>
  );
}

function AuraBreakdown() {
  return (
    <Column fillWidth gap="12">
      <Text variant="label-default-xs" onBackground="success-strong">
        Aura breakdown
      </Text>
      <Column gap="8">
        <Column gap="4">
          <Row horizontal="between">
            <Text variant="body-default-xs">Commit signal</Text>
            <Text variant="label-strong-xs">{githubAura.aura.commitShare}%</Text>
          </Row>
          <LinearGauge
            width={180}
            height={24}
            line={{ count: 36, width: 3, length: 28 }}
            value={githubAura.aura.commitShare}
            hue="success"
          />
        </Column>
        <Column gap="4">
          <Row horizontal="between">
            <Text variant="body-default-xs">Collaboration</Text>
            <Text variant="label-strong-xs">{githubAura.aura.collaboration}%</Text>
          </Row>
          <LinearGauge
            width={180}
            height={24}
            line={{ count: 36, width: 3, length: 28 }}
            value={githubAura.aura.collaboration}
            hue={[190, 140]}
          />
        </Column>
        <Column gap="4">
          <Row horizontal="between">
            <Text variant="body-default-xs">Repo breadth</Text>
            <Text variant="label-strong-xs">{githubAura.aura.repositoryBreadth}%</Text>
          </Row>
          <LinearGauge
            width={180}
            height={24}
            line={{ count: 36, width: 3, length: 28 }}
            value={githubAura.aura.repositoryBreadth}
            hue="neutral"
          />
        </Column>
      </Column>
    </Column>
  );
}

function ActiveWork() {
  return (
    <Column fillWidth gap="12">
      <Text variant="label-default-xs" onBackground="success-strong">
        Active work
      </Text>
      {githubAura.repos.slice(0, 3).map((repo) => (
        <Row key={repo.name} fillWidth gap="8" vertical="center">
          <Column width={0.375} height={0.375} radius="full" background="success-strong" />
          <Text
            variant="body-default-xs"
            style={{
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {repo.name}
          </Text>
          <Text
            style={{ marginLeft: "auto" }}
            variant="label-default-xs"
            onBackground="neutral-weak"
          >
            {repo.language}
          </Text>
        </Row>
      ))}
    </Column>
  );
}

export function GitAuraProjectPreview() {
  return (
    <TiltFx reducedMotion="auto" intensity={0.35}>
      <HoloFx
        fillWidth
        radius="xl"
        border="neutral-alpha-medium"
        background="page"
        overflow="hidden"
        shine={{ opacity: 14, blending: "screen" }}
        burn={{ opacity: 10, blending: "screen" }}
        texture={{ opacity: 5 }}
        reducedMotion="auto"
        minHeight={42}
        shadow="l"
      >
        <Column fillWidth position="relative" padding="24" gap="16">
          <MatrixFx
            fill
            position="absolute"
            pointerEvents="none"
            speed={0.3}
            size={3}
            spacing={5}
            colors={["success-solid-medium", "brand-solid-medium"]}
            trigger="mount"
            revealFrom="center"
            reducedMotion="auto"
            style={{ inset: 0, opacity: 0.1 }}
          />
          <Row fillWidth horizontal="between" vertical="center" gap="16" wrap>
            <Column gap="4">
              <Heading as="h3" variant="display-strong-s">
                GitAura
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                GitHub profile intelligence for @{githubAura.profile.login}
              </Text>
            </Column>
            <Badge background="success-alpha-weak" onBackground="success-strong">
              {githubAura.snapshotLabel}
            </Badge>
          </Row>

          <Row fillWidth gap="12" m={{ direction: "column" }} s={{ direction: "column" }}>
            <PreviewCard delay={0.02} flex="2">
              <AnalyticalPanel />
            </PreviewCard>
            <PreviewCard delay={0.08} flex="1">
              <AuraGaugePanel />
            </PreviewCard>
          </Row>

          <MasonryGrid columns={4} m={{ columns: 2 }} s={{ columns: 1 }} gap="12" fillWidth>
            <PreviewCard delay={0.12}>
              <IngestStack />
            </PreviewCard>
            <PreviewCard delay={0.16}>
              <AuraBreakdown />
            </PreviewCard>
            <PreviewCard delay={0.2}>
              <AchievementGrid />
            </PreviewCard>
            <PreviewCard delay={0.24}>
              <ActiveWork />
            </PreviewCard>
          </MasonryGrid>
        </Column>
      </HoloFx>
    </TiltFx>
  );
}
