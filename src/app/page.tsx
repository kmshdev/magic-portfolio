import {
  Badge,
  Button,
  Column,
  Grid,
  Heading,
  Meta,
  RevealFx,
  Row,
  Schema,
  Text,
} from "@once-ui-system/core";
import { GitAuraDashboardHero, Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, home, person, routes } from "@/resources";
import { ogImage } from "@/utils/og";

const homeOgImage = ogImage({
  title: "Agent platforms, codegen tools, and production LLM systems",
  description: home.description,
  label: person.role,
});

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: homeOgImage,
  });
}

export default function Home() {
  return (
    <Column fillWidth gap="40" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={homeOgImage}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column
        as="section"
        fillWidth
        maxWidth="l"
        horizontal="center"
        gap="24"
        paddingTop="24"
        paddingX="l"
      >
        <Column maxWidth={48} horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="12">
            <Heading wrap="balance" variant="display-strong-m">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="24">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="8" delay={0.4} fillWidth horizontal="center">
            <Row gap="12" vertical="center" horizontal="center" wrap>
              {home.actions.map((action) => (
                <Button
                  key={action.label}
                  href={action.href}
                  variant={action.variant}
                  size="m"
                  weight="default"
                  prefixIcon={action.prefixIcon}
                  suffixIcon={action.suffixIcon}
                >
                  {action.label}
                </Button>
              ))}
            </Row>
          </RevealFx>
        </Column>
      </Column>

      <RevealFx translateY="12" delay={0.55} fillWidth horizontal="center">
        <Column as="section" fillWidth maxWidth="l" paddingX="l">
          <Grid columns="4" gap="12" fillWidth l={{ columns: "2" }} s={{ columns: "1" }}>
            {home.proofStats.map((stat) => (
              <Column
                key={stat.label}
                fillWidth
                gap="8"
                padding="16"
                radius="l"
                background="surface"
                border="neutral-alpha-weak"
              >
                <Text variant="heading-strong-m">{stat.value}</Text>
                <Text variant="label-default-s" onBackground="brand-medium">
                  {stat.label}
                </Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {stat.detail}
                </Text>
              </Column>
            ))}
          </Grid>
        </Column>
      </RevealFx>

      <Column
        id="selected-work"
        as="section"
        fillWidth
        maxWidth="l"
        style={{ scrollMarginTop: "6rem" }}
      >
        <Row
          fillWidth
          horizontal="between"
          vertical="end"
          gap="16"
          paddingX="l"
          s={{ direction: "column", vertical: "start" }}
        >
          <Column maxWidth={34} gap="8">
            <Text variant="label-default-s" onBackground="neutral-weak">
              Selected work
            </Text>
            <Heading as="h2" variant="heading-strong-xl" wrap="balance">
              Agent systems with proof behind the claims
            </Heading>
          </Column>
          <Button
            href="/work"
            size="m"
            variant="secondary"
            weight="default"
            suffixIcon="arrowRight"
          >
            View work index
          </Button>
        </Row>
        <Projects order={home.featuredProjectSlugs} range={[1, 3]} />
      </Column>

      <Column fillWidth maxWidth="l" paddingX="l">
        <GitAuraDashboardHero />
      </Column>

      {routes["/blog"] && (
        <Column as="section" fillWidth maxWidth="l" gap="20" paddingX="l" marginBottom="24">
          <Row
            fillWidth
            horizontal="between"
            vertical="end"
            gap="16"
            s={{ direction: "column", vertical: "start" }}
          >
            <Column maxWidth={28} gap="8">
              <Text variant="label-default-s" onBackground="neutral-weak">
                Writing
              </Text>
              <Heading as="h2" variant="heading-strong-xl" wrap="balance">
                Latest from the blog
              </Heading>
            </Column>
            <Button
              href="/blog"
              size="m"
              variant="secondary"
              weight="default"
              suffixIcon="arrowRight"
            >
              View all posts
            </Button>
          </Row>
          <Posts range={[1, 2]} columns="2" marginBottom="0" thumbnail direction="column" />
        </Column>
      )}
      <Column fillWidth maxWidth="l">
        <Projects order={home.featuredProjectSlugs} range={[4]} />
      </Column>
      <Mailchimp />
    </Column>
  );
}
