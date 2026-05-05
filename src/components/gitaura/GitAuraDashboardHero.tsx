"use client";

import {
  Animation,
  Badge,
  Button,
  Column,
  Grid,
  Heading,
  Icon,
  LinearGauge,
  MatrixFx,
  RadialGauge,
  RevealFx,
  Row,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import type React from "react";
import { githubAura } from "@/resources";

const formatCompact = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 1 : 2)}K`;
  }

  return value.toLocaleString("en-US");
};

function BentoPanel({
  children,
  fillHeight = false,
  padding = "20",
  radius = "l",
  border = "neutral-alpha-medium",
  background = "surface",
  shadow,
}: {
  children: React.ReactNode;
  fillHeight?: boolean;
  padding?: React.ComponentProps<typeof Column>["padding"];
  radius?: React.ComponentProps<typeof Column>["radius"];
  border?: React.ComponentProps<typeof Column>["border"];
  background?: React.ComponentProps<typeof Column>["background"];
  shadow?: React.ComponentProps<typeof Column>["shadow"];
}) {
  return (
    <Column
      fillWidth
      fillHeight={fillHeight}
      padding={padding}
      radius={radius}
      border={border}
      background={background}
      shadow={shadow}
      style={{ alignSelf: fillHeight ? "stretch" : "start" }}
    >
      {children}
    </Column>
  );
}

function MetricTile({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: string;
}) {
  return (
    <BentoPanel fillHeight>
      <Column gap="12">
        <Row fillWidth horizontal="between" vertical="center">
          <Text variant="label-default-s" onBackground="neutral-weak">
            {label}
          </Text>
          <Icon name={icon} size="s" onBackground="brand-medium" />
        </Row>
        <Heading as="p" variant="display-strong-xs">
          {value}
        </Heading>
        <Text variant="body-default-xs" onBackground="neutral-weak">
          {detail}
        </Text>
      </Column>
    </BentoPanel>
  );
}

function MonthPulse({
  month,
  contributions,
  activeDays,
  max,
}: (typeof githubAura.months)[number] & {
  max: number;
}) {
  const value = Math.max(6, Math.round((contributions / max) * 100));
  const status = contributions > 500 ? "high activity" : contributions > 100 ? "steady" : "quiet";

  return (
    <Column
      gap="8"
      padding="16"
      radius="m"
      border="neutral-alpha-medium"
      background="surface"
      overflow="hidden"
    >
      <Row fillWidth horizontal="between" vertical="center" gap="8">
        <Text variant="label-default-xs" onBackground="neutral-weak">
          {month}
        </Text>
        <Text variant="label-strong-xs">{activeDays}d</Text>
      </Row>
      <Heading as="p" variant="heading-strong-l">
        {contributions.toLocaleString("en-US")}
      </Heading>
      <Column fillWidth height="8" radius="full" background="neutral-alpha-weak" overflow="hidden">
        <Row height="8" radius="full" background="success-strong" style={{ width: `${value}%` }} />
      </Column>
      <Text variant="body-default-xs" onBackground="neutral-weak">
        {status}
      </Text>
    </Column>
  );
}

function AuraBookWidget() {
  return (
    <BentoPanel fillHeight padding="20" border="brand-alpha-medium">
      <Column fillWidth gap="16">
        <Row fillWidth horizontal="between" vertical="center">
          <Badge background="brand-alpha-weak" onBackground="brand-strong" effect={false}>
            GitAura field notes
          </Badge>
          <Icon name="book" onBackground="brand-medium" />
        </Row>
        <Column gap="8">
          <Heading as="h3" variant="heading-strong-m">
            From GitHub noise to readable engineering signal
          </Heading>
          <Text variant="body-default-xs" onBackground="neutral-weak">
            Public activity becomes a short evidence trail a visitor can scan without opening a
            dashboard.
          </Text>
        </Column>
        <Column gap="12">
          {githubAura.chapters.map((chapter, index) => (
            <Row key={chapter.title} gap="12" vertical="start" wrap>
              <Badge background="neutral-alpha-weak" onBackground="neutral-strong" effect={false}>
                {String(index + 1).padStart(2, "0")}
              </Badge>
              <Column fillWidth gap="4">
                <Text variant="heading-strong-xs">{chapter.title}</Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {chapter.detail}
                </Text>
              </Column>
            </Row>
          ))}
        </Column>
      </Column>
    </BentoPanel>
  );
}

function RepoStrip() {
  return (
    <Column gap="-1">
      {githubAura.repos.map((repo) => (
        <SmartLink key={repo.name} href={repo.url} style={{ margin: 0 }}>
          <Row
            fillWidth
            gap="12"
            padding="16"
            vertical="center"
            border="neutral-alpha-medium"
            background="surface"
          >
            <Column
              width="8"
              height="8"
              radius="full"
              background={repo.language === "Swift" ? "warning-strong" : "brand-strong"}
            />
            <Column fillWidth gap="4">
              <Row fillWidth horizontal="between" gap="12" vertical="center">
                <Text variant="label-strong-s">{repo.name}</Text>
                <Text variant="label-default-xs" onBackground="neutral-weak">
                  {repo.language}
                </Text>
              </Row>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {repo.description}
              </Text>
            </Column>
          </Row>
        </SmartLink>
      ))}
    </Column>
  );
}

function MonthlyBreakdownCard({ maxMonth }: { maxMonth: number }) {
  return (
    <BentoPanel padding="20">
      <Column gap="20">
        <Row
          fillWidth
          horizontal="between"
          gap="16"
          vertical="center"
          s={{ direction: "column", vertical: "start" }}
        >
          <Column gap="4">
            <Text variant="label-default-s" onBackground="neutral-weak">
              Monthly breakdown
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              The contribution graph, paced for scanning.
            </Heading>
          </Column>
          <Badge background="brand-alpha-weak" onBackground="brand-strong">
            Bento view
          </Badge>
        </Row>
        <Grid columns="4" gap="12" l={{ columns: "3" }} s={{ columns: "2" }}>
          {githubAura.months.map((month) => (
            <MonthPulse key={month.month} {...month} max={maxMonth} />
          ))}
        </Grid>
      </Column>
    </BentoPanel>
  );
}

function ConsistencyCard() {
  return (
    <BentoPanel>
      <Row fillWidth gap="16" vertical="center" horizontal="between" wrap>
        <Column gap="4">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Consistency
          </Text>
          <Heading as="h3" variant="heading-strong-m">
            {githubAura.totals.activeDays} active days
          </Heading>
          <Text variant="body-default-xs" onBackground="neutral-weak">
            Contribution cadence across the visible year.
          </Text>
        </Column>
        <RadialGauge
          width={132}
          height={132}
          value={githubAura.aura.consistency}
          unit="%"
          hue="success"
          angle={{ start: -130, sweep: 260 }}
          edgePad={4}
        />
      </Row>
    </BentoPanel>
  );
}

function ScoreEngineCard() {
  const rows: Array<{
    label: string;
    value: number;
    hue: "success" | "neutral" | [number, number];
  }> = [
    { label: "Commit signal", value: githubAura.aura.commitShare, hue: "success" },
    { label: "Collaboration", value: githubAura.aura.collaboration, hue: [190, 140] },
    { label: "Repo breadth", value: githubAura.aura.repositoryBreadth, hue: "neutral" },
  ];

  return (
    <BentoPanel>
      <Column gap="16">
        <Column gap="4">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Score engine
          </Text>
          <Heading as="h3" variant="heading-strong-m">
            Aura analysis
          </Heading>
        </Column>
        <Column gap="12">
          {rows.map(({ label, value, hue }) => (
            <Column key={label} gap="8">
              <Row horizontal="between">
                <Text variant="label-default-s">{label}</Text>
                <Text variant="label-strong-s">{value}%</Text>
              </Row>
              <LinearGauge
                width={192}
                height={32}
                line={{ count: 40, width: 3, length: 34 }}
                value={value}
                hue={hue}
                labels="none"
              />
            </Column>
          ))}
        </Column>
      </Column>
    </BentoPanel>
  );
}

function RecentReposCard() {
  return (
    <BentoPanel padding="20">
      <Column gap="20">
        <Column gap="4">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Recent public work
          </Text>
          <Heading as="h3" variant="heading-strong-l">
            Repositories feeding the profile surface.
          </Heading>
        </Column>
        <RepoStrip />
      </Column>
    </BentoPanel>
  );
}

export function GitAuraDashboardHero() {
  const maxMonth = Math.max(...githubAura.months.map((month) => month.contributions));

  return (
    <Column
      as="section"
      fillWidth
      gap="32"
      paddingY="40"
      overflow="hidden"
      style={{ isolation: "isolate" }}
      aria-labelledby="gitaura-dashboard-heading"
    >
      <MatrixFx
        fill
        position="absolute"
        pointerEvents="none"
        speed={0.35}
        size={3}
        spacing={5}
        colors={["brand-solid-medium", "success-solid-medium"]}
        trigger="mount"
        revealFrom="center"
        reducedMotion="auto"
        style={{ inset: 0, opacity: 0.12 }}
      />

      <RevealFx translateY="12" fillWidth>
        <Row
          fillWidth
          horizontal="between"
          vertical="end"
          gap="24"
          s={{ direction: "column", vertical: "start" }}
        >
          <Column maxWidth={42} gap="16">
            <Badge background="success-alpha-weak" onBackground="success-strong">
              GitAura live profile dashboard
            </Badge>
            <Heading id="gitaura-dashboard-heading" as="h2" variant="display-strong-m">
              A breathable audit of the engineering work behind my GitHub activity.
            </Heading>
            <Text variant="heading-default-m" onBackground="neutral-weak">
              GitAura turns the raw contribution graph into aura score, consistency, repo breadth,
              and a high-level view of where my work is moving.
            </Text>
          </Column>
          <Column gap="12" horizontal="end" s={{ horizontal: "start" }}>
            <Text variant="label-default-s" onBackground="neutral-weak">
              {githubAura.snapshotLabel}
            </Text>
            <Row gap="12" wrap>
              <Button
                href="/work/gitaura"
                size="m"
                variant="primary"
                weight="default"
                suffixIcon="arrowRight"
              >
                Read case study
              </Button>
              <Animation
                triggerType="hover"
                fade={0}
                scale={0.99}
                duration={140}
                placement="bottom-end"
                portal
                trigger={
                  <Button
                    href={githubAura.sourceUrl}
                    size="m"
                    variant="secondary"
                    weight="default"
                    suffixIcon="arrowUpRightFromSquare"
                  >
                    Source profile
                  </Button>
                }
              >
                <Column padding="16" radius="m" background="surface" border="neutral-alpha-medium">
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    Public GitHub profile data only. Private repository details are not surfaced.
                  </Text>
                </Column>
              </Animation>
            </Row>
          </Column>
        </Row>
      </RevealFx>

      <BentoPanel padding="24" radius="xl" shadow="l">
        <Column gap="24">
          <Row
            fillWidth
            horizontal="between"
            vertical="center"
            gap="24"
            s={{ direction: "column", vertical: "start" }}
          >
            <Row gap="16" vertical="center" s={{ direction: "column", vertical: "start" }}>
              <Column
                width="56"
                height="56"
                radius="l"
                center
                border="brand-alpha-medium"
                background="brand-alpha-weak"
              >
                <Icon name="github" size="l" onBackground="brand-strong" />
              </Column>
              <Column gap="4">
                <Heading as="h3" variant="heading-strong-xl">
                  {githubAura.profile.name}
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  @{githubAura.profile.login} - {githubAura.profile.bio}
                </Text>
              </Column>
            </Row>
            <Column
              padding="16"
              radius="l"
              border="neutral-alpha-medium"
              background="page"
              minWidth={14}
              s={{ style: { minWidth: 0 } }}
            >
              <Text variant="label-default-s" onBackground="neutral-weak">
                Aura rank
              </Text>
              <Heading as="p" variant="heading-strong-xl">
                {githubAura.aura.label}
              </Heading>
            </Column>
          </Row>

          <Grid columns="4" gap="16" l={{ columns: "2" }} s={{ columns: "1" }}>
            <MetricTile
              label="Total aura"
              value={formatCompact(githubAura.aura.score)}
              detail={`${formatCompact(githubAura.totals.contributions)} contributions`}
              icon="rocket"
            />
            <MetricTile
              label="Public repos"
              value={githubAura.profile.publicRepos.toString()}
              detail={`${githubAura.profile.followers} followers, ${githubAura.profile.following} following`}
              icon="grid"
            />
            <MetricTile
              label="Last 30 days"
              value={githubAura.totals.last30Days.toLocaleString("en-US")}
              detail="Recent contribution output"
              icon="calendar"
            />
            <MetricTile
              label="Peak day"
              value={githubAura.totals.peakDay.contributions.toString()}
              detail={githubAura.totals.peakDay.date}
              icon="arrowUpRight"
            />
          </Grid>
        </Column>
      </BentoPanel>

      <Row fillWidth gap="16" vertical="stretch" s={{ direction: "column" }}>
        <Column fillWidth flex="2" gap="16" minWidth={0}>
          <MonthlyBreakdownCard maxMonth={maxMonth} />
        </Column>

        <Column fillWidth fillHeight flex="1" gap="16" minWidth={18}>
          <AuraBookWidget />
        </Column>
      </Row>

      <Grid columns="3" gap="16" l={{ columns: "2" }} s={{ columns: "1" }}>
        <ConsistencyCard />
        <ScoreEngineCard />
        <Column fillWidth l={{ style: { gridColumn: "1 / -1" } }}>
          <RecentReposCard />
        </Column>
      </Grid>
    </Column>
  );
}
