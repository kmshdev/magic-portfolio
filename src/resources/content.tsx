import { Line, Row, Text } from "@once-ui-system/core";
import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Keshav",
  lastName: "Mishra",
  name: "Keshav Mishra",
  role: "LLM and ML Engineer",
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
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building autonomous agents and LLM-powered systems</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Genie Platform</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/genie-code-generation",
  },
  subline: (
    <>
      I'm Keshav, an LLM and ML Engineer specializing in{" "}
      <Text as="span" size="xl" weight="strong">
        autonomous agents
      </Text>
      ,{" "}
      <Text as="span" size="xl" weight="strong">
        prompt engineering
      </Text>
      , and{" "}
      <Text as="span" size="xl" weight="strong">
        open-source AI tooling
      </Text>
      . <br />I architect production-grade LLM applications that transform complex workflows into
      intelligent automation.
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
    title: "Introduction",
    description: (
      <>
        Innovative LLM and ML Engineer with 5+ years of experience across retail, finance, oil &
        gas, and health/insurance NLP. Specialized in building autonomous agents, large language
        model applications, and open-source AI tooling. Seeking full-time roles focused on
        generative AI, LLM product engineering, and next-generation NLP systems in dynamic,
        impact-driven teams.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Valory",
        timeframe: "April 2024 - July 2025",
        role: "Lead LLM Engineer, Autonomous Agent Platforms",
        achievements: [
          <>
            Conceived, architected, and implemented <strong>Genie</strong>, Valory's flagship
            LLM-driven code generation and agent scaffolding platform—an industry-first system
            enabling autonomous agent and service creation from natural language.
          </>,
          <>
            Directly reduced agent/service prototyping time from weeks to minutes, democratizing
            autonomous agent development for both technical and non-technical users.
          </>,
          <>
            Architected and developed <strong>agents-fun-eliza</strong>, an autonomous agent for the
            Agents.fun ecosystem, leveraging the Eliza framework to deliver fully open-sourced,
            interactive, and extensible conversational agents.
          </>,
          <>
            Published and maintained <strong>plugin-memeooorr</strong>—a TypeScript-based
            open-source package, released on npm, enabling meme-centric agent extensions and
            community creativity.
          </>,
          <>
            Engineered robust LLM prompt engineering pipelines, enabling semantic-to-formal
            translation for agent behaviors and FSMs, with feedback loops and error handling for
            high-reliability code generation.
          </>,
          <>
            Enhanced agent orchestration and deployment pipelines using containerization
            (Docker/Kubernetes), CI/CD, MLflow, and best MLOps practices—delivering reproducible,
            secure, and scalable agent workflows.
          </>,
        ],
        images: [],
      },
      {
        company: "Mechademy Engineering Solutions",
        timeframe: "Feb 2020 - March 2024",
        role: "LLM and MLOps Engineer",
        achievements: [
          <>
            Developed a <strong>RAG Agent</strong> for on-field agents to access and retrieve
            maintenance logs, servicing records, and critical equipment data on-demand.
          </>,
          <>
            Developed a <strong>Text2SQL2Plot LLM agent</strong> for field workers in turbomachinery
            plants using Vanna.ai and GPT-4o-mini, reducing repair time by 20%.
          </>,
          <>
            Fabricated end-to-end <strong>AutoML</strong> that auto tracks, hypertunes, deploys
            models saving 100+ hrs monthly work.
          </>,
          <>
            Built a <strong>LLM Role Assistant</strong> tool based on internal alerts data with
            LangChain & GPT-4 saving 200+ man hours monthly, which performs work equal to 4 team
            members of alert management team.
          </>,
          <>
            Pioneered a <strong>RAG based LLM chatbot</strong> using GPT-4 and LlamaIndex, that
            allows user to interact with bot that has access to latest developments in Energy, Oil
            and Gas fields, that is directly client facing for big Oil and Gas Clients.
          </>,
          <>
            Built an in-house <strong>MLOps platform</strong> utilizing drift detection, MLflow,
            automated model training, that reduced modeling related workload by 70%.
          </>,
          <>
            Trained <strong>Mistral 7B model</strong> using on-premise data of alerts utilizing a
            distributed framework that can scale to large datasets.
          </>,
          <>
            Led a team of data scientists in developing a ML model that predicted the failure of
            turbomachinery with <strong>96.5% accuracy</strong>.
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
        title: "LLM Engineering",
        description: (
          <>
            Expert in prompt engineering, RAG (Retrieval-Augmented Generation), agent orchestration,
            and semantic-to-formal translation for autonomous systems.
          </>
        ),
        tags: [
          { name: "LangChain", icon: "" },
          { name: "DSPy", icon: "" },
          { name: "LlamaIndex", icon: "" },
          { name: "Langflow", icon: "" },
          { name: "HuggingFace", icon: "" },
        ],
        images: [],
      },
      {
        title: "MLOps & Infrastructure",
        description: (
          <>
            Building production-grade ML systems with CI/CD, drift detection, AutoML, and
            containerized deployment at scale.
          </>
        ),
        tags: [
          { name: "MLflow", icon: "" },
          { name: "Docker", icon: "" },
          { name: "Kubernetes", icon: "" },
          { name: "DevOps", icon: "" },
        ],
        images: [],
      },
      {
        title: "Programming & Cloud",
        description: (
          <>
            Full-stack AI development in Python, TypeScript, and Rust, with expertise in AWS, SQL,
            MongoDB, and Redis.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "TypeScript", icon: "typescript" },
          { name: "Rust", icon: "" },
          { name: "AWS", icon: "" },
          { name: "SQL", icon: "" },
        ],
        images: [],
      },
      {
        title: "Data Science & ML",
        description: (
          <>
            Advanced expertise in NLP, time series analysis, statistics, and machine learning
            frameworks like XGBoost and scikit-learn.
          </>
        ),
        tags: [
          { name: "NLP", icon: "" },
          { name: "XGBoost", icon: "" },
          { name: "Statistics", icon: "" },
          { name: "Time Series", icon: "" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about AI and engineering...",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `LLM and ML projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Gallery",
  description: "Photo gallery",
  images: [],
};

export { person, social, home, about, blog, work, gallery, newsletter };
