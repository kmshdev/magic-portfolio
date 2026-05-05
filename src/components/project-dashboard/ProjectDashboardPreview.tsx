"use client";

import {
  Badge,
  Column,
  Grid,
  Heading,
  Icon,
  Media,
  RadialGauge,
  Row,
  Text,
} from "@once-ui-system/core";
import type React from "react";
import type {
  EvidenceConfidence,
  EvidenceReceipt,
  EvidenceSource,
  ProjectEvidence,
  ProjectVisual,
} from "@/resources";

type ProjectDashboardPreviewProps = {
  project: ProjectVisual;
  evidence: ProjectEvidence;
  cover?: string;
  priority?: boolean;
  summary?: string;
  title?: string;
};

const confidenceCopy: Record<EvidenceConfidence, string> = {
  high: "High",
  medium: "Medium",
  context: "Context",
};

const sourceTypeCopy: Record<EvidenceSource["type"], string> = {
  github: "GitHub",
  resume: "Resume",
  "case-study": "Case study",
  package: "Package",
  demo: "Demo",
};

const sourceTypeIcon: Record<EvidenceSource["type"], string> = {
  github: "github",
  resume: "document",
  "case-study": "book",
  package: "document",
  demo: "rocket",
};

function DashboardCard({
  children,
  fillHeight = false,
}: {
  children: React.ReactNode;
  fillHeight?: boolean;
}) {
  return (
    <Column
      fillWidth
      fillHeight={fillHeight}
      padding="16"
      radius="l"
      border="neutral-alpha-weak"
      background="page"
      style={{ alignSelf: fillHeight ? "stretch" : "start" }}
    >
      {children}
    </Column>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text variant="label-default-s" onBackground="neutral-weak">
      {children}
    </Text>
  );
}

function ConfidenceBadge({ confidence }: { confidence: EvidenceConfidence }) {
  return (
    <Badge background="neutral-alpha-weak" onBackground="neutral-strong" effect={false}>
      {confidenceCopy[confidence]}
    </Badge>
  );
}

function SourceBadge({ source }: { source: EvidenceSource }) {
  return (
    <Badge background="brand-alpha-weak" onBackground="brand-strong" effect={false} arrow={false}>
      <Row gap="4" vertical="center">
        <Icon name={sourceTypeIcon[source.type]} size="xs" />
        <Text variant="label-default-xs">{sourceTypeCopy[source.type]}</Text>
      </Row>
    </Badge>
  );
}

function SourcePill({ source }: { source: EvidenceSource }) {
  const content = (
    <Row gap="4" vertical="center" wrap>
      <Icon name={sourceTypeIcon[source.type]} size="xs" />
      <Text variant="label-default-xs" wrap="balance">
        {source.label}
      </Text>
    </Row>
  );

  if (source.href) {
    return (
      <Badge
        href={source.href}
        background="neutral-alpha-weak"
        onBackground="brand-strong"
        effect={false}
        arrow={false}
      >
        {content}
      </Badge>
    );
  }

  return (
    <Badge
      background="neutral-alpha-weak"
      onBackground="neutral-strong"
      effect={false}
      arrow={false}
    >
      {content}
    </Badge>
  );
}

function ReceiptValue({ receipt }: { receipt: EvidenceReceipt }) {
  if (receipt.href) {
    return (
      <Badge
        href={receipt.href}
        background="neutral-alpha-weak"
        onBackground="brand-strong"
        effect={false}
        arrow={false}
      >
        <Text variant="heading-strong-xs">{receipt.value}</Text>
      </Badge>
    );
  }

  return <Text variant="heading-strong-xs">{receipt.value}</Text>;
}

function EvidenceSnapshot({ evidence }: { evidence: ProjectEvidence }) {
  const primaryReceipt = evidence.receipts[0];

  return (
    <Column
      padding="12"
      radius="l"
      border="neutral-alpha-weak"
      background="page"
      style={{ flex: "0 0 18rem", maxWidth: "18rem" }}
      s={{ style: { flex: "1 1 auto", maxWidth: "none" } }}
    >
      <Column fillWidth gap="8">
        <Row fillWidth horizontal="between" vertical="center" gap="12">
          <SectionLabel>Snapshot</SectionLabel>
          <ConfidenceBadge confidence={evidence.primarySource.confidence} />
        </Row>
        <Text variant="heading-strong-xs" wrap="balance">
          {evidence.snapshotLabel}
        </Text>
        {primaryReceipt && (
          <Row fillWidth gap="8" vertical="center" horizontal="between" wrap>
            <Text variant="label-default-xs" onBackground="neutral-weak">
              {primaryReceipt.label}
            </Text>
            <ReceiptValue receipt={primaryReceipt} />
          </Row>
        )}
      </Column>
    </Column>
  );
}

function PreviewHeader({
  evidence,
  project,
  summary,
  title,
}: {
  evidence: ProjectEvidence;
  project: ProjectVisual;
  summary: string;
  title: string;
}) {
  return (
    <Row fillWidth gap="16" horizontal="between" vertical="stretch" s={{ direction: "column" }}>
      <Column fillWidth flex="2" gap="12">
        <Row gap="8" wrap>
          <Badge background="brand-alpha-weak" onBackground="brand-strong" effect={false}>
            {project.eyebrow}
          </Badge>
          <SourceBadge source={evidence.primarySource} />
        </Row>
        <Column gap="8">
          <Heading as="h3" wrap="balance" variant="heading-strong-l">
            {title}
          </Heading>
          <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
            {summary}
          </Text>
        </Column>
      </Column>
      <EvidenceSnapshot evidence={evidence} />
    </Row>
  );
}

function ProofNotes({ evidence }: { evidence: ProjectEvidence }) {
  return (
    <Grid columns="2" gap="8" fillWidth s={{ columns: 1 }}>
      {evidence.proofNotes.slice(0, 2).map((note) => (
        <Row
          key={note}
          fillWidth
          padding="12"
          gap="8"
          vertical="start"
          radius="m"
          border="neutral-alpha-weak"
          background="page"
          wrap
        >
          <Icon name="rocket" onBackground="success-strong" size="xs" />
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {note}
          </Text>
        </Row>
      ))}
    </Grid>
  );
}

function OutcomeStrip({
  evidence,
  project,
}: {
  evidence: ProjectEvidence;
  project: ProjectVisual;
}) {
  return (
    <Row fillWidth gap="8" wrap>
      {project.outcomes.map((outcome, index) => (
        <Column
          key={outcome}
          gap="8"
          padding="12"
          radius="m"
          border="neutral-alpha-weak"
          background="page"
          style={{ flex: "1 1 9rem" }}
        >
          <Row gap="4" vertical="center">
            <Icon name="rocket" onBackground="success-strong" size="xs" />
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {outcome}
            </Text>
          </Row>
          {evidence.receipts[index] && (
            <Text variant="label-default-xs" onBackground="neutral-weak">
              {evidence.receipts[index].source}
            </Text>
          )}
        </Column>
      ))}
    </Row>
  );
}

function ProofRail({ evidence }: { evidence: ProjectEvidence }) {
  const primaryReceipt = evidence.receipts[0];
  const sourceReferences = evidence.sources.filter((source) => source.reference);

  return (
    <DashboardCard>
      <Column fillWidth gap="16">
        <Row
          fillWidth
          vertical="center"
          horizontal="between"
          gap="16"
          s={{ direction: "column", horizontal: "center" }}
        >
          <Column width={8} height={8} minWidth={8} center>
            <RadialGauge
              width={132}
              height={132}
              value={evidence.confidence.score}
              unit="%"
              hue="success"
              angle={{ start: -130, sweep: 260 }}
              edgePad={4}
            />
          </Column>
          <Column fillWidth gap="4" s={{ horizontal: "center" }}>
            <SectionLabel>Evidence confidence</SectionLabel>
            <Heading as="p" variant="heading-strong-m">
              {evidence.confidence.label}
            </Heading>
            <Text align="center" variant="body-default-xs" onBackground="neutral-weak">
              {evidence.confidence.detail}
            </Text>
          </Column>
        </Row>

        {primaryReceipt && (
          <Column
            padding="12"
            radius="m"
            gap="8"
            background="surface"
            border="neutral-alpha-weak"
            fillWidth
          >
            <Row fillWidth gap="8" horizontal="between" vertical="center" wrap>
              <Text variant="label-default-s" onBackground="neutral-weak">
                Primary receipt
              </Text>
              <ConfidenceBadge confidence={primaryReceipt.confidence} />
            </Row>
            <ReceiptValue receipt={primaryReceipt} />
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {primaryReceipt.detail}
            </Text>
          </Column>
        )}

        <Column fillWidth gap="8">
          <SectionLabel>Sources</SectionLabel>
          <Row fillWidth gap="8" wrap>
            {evidence.sources.map((source) => (
              <SourcePill key={`${source.type}-${source.label}`} source={source} />
            ))}
          </Row>
          {sourceReferences.length > 0 && (
            <Row fillWidth gap="8" wrap>
              {sourceReferences.map((source) => (
                <Text
                  key={`${source.type}-${source.reference}`}
                  variant="label-default-xs"
                  onBackground="neutral-weak"
                >
                  {source.reference}
                </Text>
              ))}
            </Row>
          )}
        </Column>
      </Column>
    </DashboardCard>
  );
}

function ReceiptLedger({ evidence }: { evidence: ProjectEvidence }) {
  return (
    <DashboardCard>
      <Column fillWidth gap="12">
        <SectionLabel>Receipts</SectionLabel>
        {evidence.receipts.slice(0, 2).map((receipt) => (
          <Column
            key={`${receipt.label}-${receipt.value}`}
            gap="8"
            padding="12"
            radius="m"
            border="neutral-alpha-weak"
            background="surface"
          >
            <Row fillWidth horizontal="between" vertical="center" gap="8" wrap>
              <Text variant="label-default-xs" onBackground="neutral-weak">
                {receipt.label}
              </Text>
              <ConfidenceBadge confidence={receipt.confidence} />
            </Row>
            <ReceiptValue receipt={receipt} />
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {receipt.detail}
            </Text>
            <Text variant="label-default-xs" onBackground="brand-medium">
              {receipt.source}
            </Text>
          </Column>
        ))}
        <Text variant="label-default-xs" onBackground="neutral-weak">
          {evidence.receipts.length} receipts / {evidence.sources.length} sources
        </Text>
      </Column>
    </DashboardCard>
  );
}

function WorkflowStack({ project }: { project: ProjectVisual }) {
  return (
    <DashboardCard>
      <Column fillWidth gap="12">
        <SectionLabel>Workflow</SectionLabel>
        <Column fillWidth gap="-1">
          {project.workflow.slice(0, 4).map((step, index) => (
            <Row
              key={step}
              fillWidth
              padding="8"
              gap="8"
              vertical="center"
              border="neutral-alpha-weak"
              background="surface"
              wrap
            >
              <Badge background="neutral-alpha-weak" onBackground="neutral-strong" effect={false}>
                {String(index + 1).padStart(2, "0")}
              </Badge>
              <Text variant="body-default-xs">{step}</Text>
            </Row>
          ))}
        </Column>
      </Column>
    </DashboardCard>
  );
}

function ArchitectureStack({ project }: { project: ProjectVisual }) {
  return (
    <DashboardCard>
      <Column fillWidth gap="12">
        <SectionLabel>Architecture</SectionLabel>
        <Grid columns="2" gap="8" fillWidth s={{ columns: 1 }}>
          {project.architecture.map((layer) => (
            <Column
              key={layer}
              gap="8"
              padding="12"
              radius="m"
              border="brand-alpha-weak"
              background="surface"
            >
              <Icon name="document" onBackground="brand-strong" size="s" />
              <Text variant="body-default-xs">{layer}</Text>
            </Column>
          ))}
        </Grid>
      </Column>
    </DashboardCard>
  );
}

export function ProjectDashboardPreview({
  cover,
  evidence,
  priority = false,
  project,
  summary,
  title,
}: ProjectDashboardPreviewProps) {
  const displayCover = cover ?? project.cover;
  const displaySummary = summary?.trim() || project.summary;
  const displayTitle = title?.trim() || project.title;

  return (
    <Column
      fillWidth
      radius="xl"
      border="neutral-alpha-medium"
      background="surface"
      overflow="hidden"
      shadow="m"
    >
      <Column fillWidth padding="20" gap="20">
        <PreviewHeader
          evidence={evidence}
          project={project}
          summary={displaySummary}
          title={displayTitle}
        />

        <Row fillWidth gap="16" vertical="stretch" s={{ direction: "column" }}>
          <Column fillWidth flex="2" gap="12" minWidth={0}>
            <Media
              alt={`${displayTitle} dashboard preview`}
              aspectRatio="16 / 9"
              border="neutral-alpha-medium"
              fillWidth
              objectFit="cover"
              priority={priority}
              radius="l"
              sizes="(max-width: 960px) 100vw, 640px"
              src={displayCover}
            />
            <ProofNotes evidence={evidence} />
            <OutcomeStrip evidence={evidence} project={project} />
          </Column>
          <Column fillWidth flex="1" minWidth={17}>
            <ProofRail evidence={evidence} />
          </Column>
        </Row>

        <Grid columns="3" s={{ columns: 1 }} gap="12" fillWidth>
          <ReceiptLedger evidence={evidence} />
          <WorkflowStack project={project} />
          <ArchitectureStack project={project} />
        </Grid>
      </Column>
    </Column>
  );
}
