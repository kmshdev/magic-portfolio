import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

export type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

export type PostMetadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

export type MdxPost = {
  metadata: PostMetadata;
  slug: string;
  content: string;
};

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: PostMetadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string): MdxPost[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

function resolvePostsDir(customPath: string[]) {
  const normalizedPath = customPath.join("/");
  const resolveExistingDir = (...segments: string[]) => {
    const candidates = [path.join(process.cwd(), ...segments), path.join(...segments)];
    const existingDir = candidates.find((candidate) => fs.existsSync(candidate));

    if (!existingDir) {
      notFound();
    }

    return existingDir;
  };

  if (normalizedPath === "src/app/blog/posts") {
    return resolveExistingDir("src", "app", "blog", "posts");
  }

  if (normalizedPath === "src/app/work/projects") {
    return resolveExistingDir("src", "app", "work", "projects");
  }

  notFound();
}

export function getPosts(customPath = ["src", "app", "blog", "posts"]) {
  const postsDir = resolvePostsDir(customPath);
  return getMDXData(postsDir);
}
