import { Line, Row, Text } from "@once-ui-system/core";
import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Keshav",
  lastName: "Mishra",
  name: "Keshav Mishra",
  role: "Agent Platform Engineer",
  avatar: "/images/avatar.jpg",
  email: "me@kmsh.dev",
  location: "Asia/Kolkata",
  languages: ["English", "Hindi"],
};

const newsletter: Newsletter = {
  display: false,
  title: <></>,
  description: <></>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/kmshdev",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/keshav98",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as an ${person.role}`,
  headline: <>Agent platforms, codegen tools, and production LLM systems</>,
  actions: [
    {
      label: "View selected work",
      href: "#selected-work",
      variant: "primary",
      suffixIcon: "arrowRight",
    },
    {
      label: "Email me",
      href: `mailto:${person.email}`,
      variant: "secondary",
      prefixIcon: "email",
    },
  ],
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center" paddingX="4">
        <Text as="span" variant="label-strong-s">
          Genie Platform
        </Text>
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/genie-code-generation",
  },
  proofStats: [
    {
      value: "weeks -> minutes",
      label: "agent prototypes",
      detail: "Genie turns natural-language briefs into deployable agent/service scaffolds.",
      href: "/work/genie-code-generation",
    },
    {
      value: "119 -> 1,900",
      label: "active users",
      detail: "Valory prediction-market agent adoption scaled through AI tooling.",
      href: "/work/ai-prediction-market-trader",
    },
    {
      value: "500+ hrs/mo",
      label: "saved for teams",
      detail: "MLOps and internal AI systems reduced recurring manual operations work.",
      href: "/work/automl-platform",
    },
    {
      value: "96.5%",
      label: "failure accuracy",
      detail: "Industrial ML system for turbomachinery failure prediction.",
      href: "/work/turbomachinery-failure-prediction",
    },
  ],
  featuredProjectSlugs: [
    "genie-code-generation",
    "genie-cli",
    "agents-fun-eliza",
    "ai-prediction-market-trader",
    "plugin-memeooorr",
    "rag-chatbot-oil-gas",
    "text2sql-agent",
    "automl-platform",
    "text2sql2plot",
    "turbomachinery-failure-prediction",
    "gitaura",
  ],
  subline: (
    <>
      I'm Keshav, an engineer for{" "}
      <Text as="span" size="xl" weight="strong">
        agent platforms
      </Text>
      ,{" "}
      <Text as="span" size="xl" weight="strong">
        LLM code generation
      </Text>
      , and{" "}
      <Text as="span" size="xl" weight="strong">
        production retrieval systems
      </Text>
      . <br />I turn ambiguous operational workflows into reliable AI surfaces with evaluation,
      orchestration, and deployment discipline.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "What I'm strongest at",
    description: (
      <>
        I build production LLM systems, internal copilots, and agentic workflows for enterprise and
        industrial teams. My strongest work sits where model serving, agent tooling, observability,
        and reliability meet: codegen and migration agents, protected tool access, RAG/Text2SQL, and
        Kubernetes/Cloudflare-backed delivery.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Tractable AI",
        timeframe: "Sep 2025 - Mar 2026",
        role: "Machine Learning Engineer",
        achievements: [
          {
            id: "tractable-inference-costs",
            content: (
              <>
                Led model-inference migration work that reduced AWS spend by $127K per month and cut
                inference-layer costs by 60%.
              </>
            ),
          },
          {
            id: "tractable-tensorflow-triton-agents",
            content: (
              <>
                Built automated coding-agent workflows that analyzed and migrated 55 legacy
                TensorFlow computer-vision models for Triton deployment while preserving
                classification parity within 5e-5.
              </>
            ),
          },
          {
            id: "tractable-github-actions-migration",
            content: (
              <>
                Developed reusable migration agents that converted Harness-based CI/CD pipelines to
                GitHub Actions, saving $37K per month in infrastructure and workflow overhead.
              </>
            ),
          },
          {
            id: "tractable-cloudflare-model-serving",
            content: (
              <>
                Defined the migration framework for a Rust and Cloudflare Workers model-serving
                backend, including service boundaries, phased rollout, and production reliability
                constraints.
              </>
            ),
          },
          {
            id: "tractable-enterprise-modernization",
            content: (
              <>
                Created prompt-driven migration frameworks across Python, TypeScript, and Rust while
                partnering with enterprise ML systems teams to modernize deployment, release, and
                support workflows.
              </>
            ),
          },
        ],
        images: [],
      },
      {
        company: "Valory",
        timeframe: "Apr 2024 - Aug 2025",
        role: "Lead LLM Engineer, Autonomous Agent Platforms",
        achievements: [
          {
            id: "valory-genie-platform",
            content: (
              <>
                Led <strong>Genie</strong>, an LLM-driven platform that reduced the time to build
                production-ready Open Autonomy agents from 6 months to 2 weeks.
              </>
            ),
          },
          {
            id: "valory-trader-adoption",
            content: (
              <>
                Built internal and ecosystem-facing AI tooling that helped scale active users of the
                Trader agent service from 119 to 1,900.
              </>
            ),
          },
          {
            id: "valory-agents-fun-eliza",
            content: (
              <>
                Shipped <strong>agents-fun-eliza</strong>, contributing to growth from 0 to 170
                active users in 2 weeks.
              </>
            ),
          },
          {
            id: "valory-bedrock-inference",
            content: (
              <>
                Built Python and FastAPI services for LLM inference and agent orchestration,
                including AWS Bedrock integrations and production tool-calling flows.
              </>
            ),
          },
          {
            id: "valory-routing-evaluation-pipelines",
            content: (
              <>
                Designed routing, evaluation, and tool-calling pipelines for production agents with
                safety checks, secure defaults, and continuous response-quality improvements.
              </>
            ),
          },
          {
            id: "valory-protected-tool-access",
            content: (
              <>
                Implemented authorization-aware agent behavior and protected-tool access patterns
                for sensitive enterprise workflows.
              </>
            ),
          },
          {
            id: "valory-deployment-flows",
            content: (
              <>
                Shipped Docker, Kubernetes, and MLflow-backed deployment flows while partnering
                across engineering, research, product, and business teams.
              </>
            ),
          },
        ],
        images: [],
      },
      {
        company: "Mechademy Engineering Solutions",
        timeframe: "Feb 2020 - March 2024",
        role: "LLM and MLOps Engineer",
        achievements: [
          {
            id: "mech-text2sql2plot",
            content: (
              <>
                Built a <strong>Text2SQL2Plot LLM agent</strong> in Python for plant operators to
                query operational data and generate visualizations, reducing repair time by 20%.
              </>
            ),
          },
          {
            id: "mech-internal-ai-mlops-savings",
            content: (
              <>
                Built internal AI and MLOps systems that saved the ML team 500+ hours per month and
                helped scale delivery from 3 clients to 10 in one year.
              </>
            ),
          },
          {
            id: "mech-dagster-migration",
            content: (
              <>
                Migrated ETL pipelines from Airflow to Dagster for horizontally scalable, observable
                data workflows supporting ML and LLM systems, improving data processing time by 65%.
              </>
            ),
          },
          {
            id: "mech-enterprise-account",
            content: (
              <>
                Owned client onboarding, infrastructure, and production deployment for a major
                account generating $3M in annual revenue.
              </>
            ),
          },
          {
            id: "mech-production-ai-services",
            content: (
              <>
                Managed production AI services with observability-driven monitoring, configuration
                updates, and Kubernetes-based delivery for enterprise customers.
              </>
            ),
          },
          {
            id: "mech-anomaly-failure-prediction",
            content: (
              <>
                Productionized anomaly-detection and failure-prediction services with up to{" "}
                <strong>96.5% accuracy</strong> for industrial clients.
              </>
            ),
          },
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "GGSIPU",
        description: (
          <>
            B.E. Computer Science (2016 - 2020) • GPA: 8.1 • Winner at Smart India Hackathon 2018,
            AICTE
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "LLM & Agent Systems",
        description: (
          <>
            LLM applications, RAG, agentic workflows, internal AI tools, LangChain, PyTorch, and
            Triton Inference Server.
          </>
        ),
        tags: [
          { name: "LangChain", icon: "" },
          { name: "RAG", icon: "" },
          { name: "Agentic workflows", icon: "" },
          { name: "PyTorch", icon: "" },
          { name: "Triton", icon: "" },
        ],
        images: [],
      },
      {
        title: "Observability & Delivery",
        description: (
          <>
            Terraform, GitHub Actions, Grafana, OpenTelemetry, CI/CD automation, and configuration
            management.
          </>
        ),
        tags: [
          { name: "Terraform", icon: "" },
          { name: "GitHub Actions", icon: "github" },
          { name: "Grafana", icon: "" },
          { name: "OpenTelemetry", icon: "" },
          { name: "CI/CD", icon: "" },
        ],
        images: [],
      },
      {
        title: "Languages & Platforms",
        description: (
          <>TypeScript, Python, Rust, SQL, FastAPI, Docker, Kubernetes, and Cloudflare Workers.</>
        ),
        tags: [
          { name: "TypeScript", icon: "typescript" },
          { name: "Python", icon: "python" },
          { name: "Rust", icon: "" },
          { name: "FastAPI", icon: "" },
          { name: "Docker", icon: "" },
          { name: "Kubernetes", icon: "" },
          { name: "SQL", icon: "" },
          { name: "Cloudflare Workers", icon: "" },
        ],
        images: [],
      },
      {
        title: "Security & Reliability",
        description: (
          <>
            Authorization-aware tool access, protected-tool patterns, secure defaults, and
            production monitoring.
          </>
        ),
        tags: [
          { name: "Authorization-aware tools", icon: "" },
          { name: "Protected-tool patterns", icon: "" },
          { name: "Secure defaults", icon: "" },
          { name: "Production monitoring", icon: "" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Field notes on production agents and LLM systems",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Selected work – ${person.name}`,
  description: `Agent platforms, LLM codegen, RAG, Text2SQL, and MLOps systems by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Gallery",
  description: "Photo gallery",
  images: [],
};

export { about, blog, gallery, home, newsletter, person, social, work };
