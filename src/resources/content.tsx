import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { InlineCode, Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Keshav",
  lastName: "Mishra",
  name: `Keshav Mishra`,
  role: "Autonomous Agent Engineer",
  avatar: "/images/avatar.jpg",
  email: "me@kmsh.dev",
  location: "Asia/Kolkata",
  languages: ["English", "Hindi"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Technical insights on LLM engineering, autonomous agents, and MLOps</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/keshav1998",
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
  title: `${person.name} (kmsh) – ${person.role}`,
  description: `Portfolio of Keshav Mishra (kmsh), an Autonomous Agent Engineer specializing in production-grade LLM systems with 5+ years of experience delivering measurable impact across retail, finance, oil & gas, and healthcare industries.`,
  headline: <>Autonomous Agent Engineer</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">genie-cli</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured project
        </Text>
      </Row>
    ),
    href: "https://github.com/propel-genie/genie-cli",
  },
  subline: (
    <>
      I'm Keshav (kmsh), an{" "}
      <Text as="span" size="xl" weight="strong">
        Autonomous Agent Engineer
      </Text>{" "}
      specializing in production-grade LLM systems. <br />
      Building tools that deliver{" "}
      <InlineCode>20%+</InlineCode> efficiency improvements.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name} (kmsh), ${person.role} with 5+ years of experience in LLM engineering, autonomous agents, and MLOps`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Keshav Mishra (kmsh) is an LLM and ML Engineer with 5+ years of experience building
        autonomous agents and production-grade ML systems. Currently working at Valory on
        next-generation autonomous agent platforms. His work spans multiple industries including
        retail, finance, oil & gas, and healthcare, delivering measurable impact through innovative
        LLM solutions.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Valory",
        timeframe: "2024 - Present",
        role: "LLM Engineer",
        achievements: [
          <>
            Built autonomous agent frameworks for the Olas ecosystem, enabling rapid prototyping and
            deployment of production-grade agents.
          </>,
          <>
            Developed <strong>genie-cli</strong>, an LLM-powered agent scaffolding platform published
            on PyPI, streamlining agent development workflows.
          </>,
          <>
            Contributed to <strong>agents-fun-eliza</strong> and <strong>trader</strong> projects,
            advancing autonomous conversational agents and AI prediction market systems.
          </>,
        ],
        images: [],
      },
      {
        company: "Mechatomy Engineering Solutions / Vimele / Zurich",
        timeframe: "2020 - 2024",
        role: "LLM and MLOPS Engineer",
        achievements: [
          <>
            Delivered <strong>Text2SQL2Plot LLM Agent</strong> for turbomachinery analytics,
            achieving a <strong>20% reduction in repair time</strong> through natural language
            analytics.
          </>,
          <>
            Built RAG-powered retrieval agents for on-field maintenance, improving operational
            efficiency across oil & gas operations.
          </>,
          <>
            Implemented end-to-end MLOps pipelines across retail, finance, and healthcare sectors,
            ensuring production-grade reliability and scalability.
          </>,
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
        name: "Guru Gobind Singh Indraprastha University",
        description: <>B.E. Computer Science, GPA 8.1</>,
      },
      {
        name: "Udacity",
        description: <>Deep Learning Nanodegree</>,
      },
      {
        name: "Coursera",
        description: <>Introduction to TensorFlow for AI, ML, and Deep Learning</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Languages & Core",
        description: (
          <>
            Proficient in <strong>Python</strong>, <strong>TypeScript</strong>, <strong>Rust</strong>
            , and <strong>SQL</strong> for building production systems.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "TypeScript", icon: "typescript" },
          { name: "Rust", icon: "rust" },
        ],
        images: [],
      },
      {
        title: "LLM & AI Frameworks",
        description: (
          <>
            Expert in <strong>LangChain</strong>, <strong>DSPy</strong>, <strong>MLflow</strong>,{" "}
            <strong>HuggingFace</strong>, <strong>llama.cpp</strong>, <strong>Haystack</strong>, and{" "}
            <strong>Weaviate</strong> for building autonomous agent systems.
          </>
        ),
        tags: [
          { name: "LangChain", icon: "langchain" },
          { name: "HuggingFace", icon: "huggingface" },
        ],
        images: [],
      },
      {
        title: "MLOps & Infrastructure",
        description: (
          <>
            Experienced with <strong>AWS</strong>, <strong>Docker</strong>,{" "}
            <strong>Kubernetes</strong>, <strong>FastAPI</strong>, <strong>Ray</strong>,{" "}
            <strong>MongoDB</strong>, and <strong>Redis</strong> for scalable ML deployments.
          </>
        ),
        tags: [
          { name: "AWS", icon: "aws" },
          { name: "Docker", icon: "docker" },
          { name: "Kubernetes", icon: "kubernetes" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Technical Blog",
  description: `Insights on LLM engineering, autonomous agents, and MLOps from ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Autonomous agents, developer tools, and enterprise ML solutions by ${person.name} (kmsh)`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Case Studies – ${person.name}`,
  description: `Detailed case studies of projects delivering measurable impact`,
  images: [],
};

export { about, blog, gallery, home, newsletter, person, social, work };
