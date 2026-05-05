import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { getPosts } from "@/utils/utils";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  order?: string[];
}

export function Projects({ range, exclude, order }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const orderedSlugs = new Set(order);
  const orderedProjects = order
    ? order
        .map((slug) => sortedProjects.find((project) => project.slug === slug))
        .filter((project) => project !== undefined)
    : [];
  const orderedProjectList = order
    ? [...orderedProjects, ...sortedProjects.filter((project) => !orderedSlugs.has(project.slug))]
    : sortedProjects;

  const displayedProjects = range
    ? orderedProjectList.slice(range[0] - 1, range[1] ?? orderedProjectList.length)
    : orderedProjectList;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          slug={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
