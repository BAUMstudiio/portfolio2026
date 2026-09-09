import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { formatImageUrl } from "./utils";

export { formatImageUrl };

export interface ProjectData {
  slug: string;
  title: string;
  domain: string;
  role: string;
  context: string;
  year: string;
  summary: string;
  impactMetric?: string;
  coverImage?: string;
  images?: string[];
  tags: string[];
  content: string;
}

const PROJECTS_DIRECTORY = path.join(process.cwd(), "content", "projects");

export function getAllProjects(): ProjectData[] {
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    return [];
  }

  const filenames = fs.readdirSync(PROJECTS_DIRECTORY);

  const projects = filenames
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(PROJECTS_DIRECTORY, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      // Strip any embedded trailing Section 6 heading from body content so gallery only renders ONCE
      const cleanContent = content.split(/##\s*6\.\s*La Galerie/i)[0].trim();

      const rawImages = Array.isArray(data.images)
        ? data.images
        : Array.isArray(data.gallery)
        ? data.gallery
        : [];

      return {
        slug: data.slug || file.replace(/\.md$/, ""),
        title: data.title || "Projet sans titre",
        domain: data.domain || "Product Management & Tech",
        role: data.role || "",
        context: data.context || "",
        year: data.year || "",
        summary: data.summary || "",
        impactMetric: data.impactMetric || "",
        coverImage: formatImageUrl(data.coverImage),
        images: rawImages.map((img: string) => formatImageUrl(img)),
        tags: Array.isArray(data.tags) ? data.tags : [],
        content: cleanContent,
      } as ProjectData;
    });

  return projects;
}

export function getProjectBySlug(slug: string): ProjectData | null {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug) || null;
}

