import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { formatImageUrl } from "./utils";

export { formatImageUrl };

export interface ProjectImageItem {
  url: string;
  caption?: string;
}

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
  images?: ProjectImageItem[];
  tags: string[];
  content: string;
}

const PROJECTS_DIRECTORY = path.join(process.cwd(), "content", "projects");

function cleanStr(str: string | undefined | null): string {
  if (!str) return "";
  return str
    .trim()
    .replace(/^[\s\x22\x27\xAB\xBB\u00A0\u202F\u201C\u201D]+|[\s\x22\x27\xAB\xBB\u00A0\u202F\u201C\u201D]+$/g, "")
    .trim();
}

function parseProjectFile(fileContent: string, fileName: string): ProjectData {
  const lines = fileContent.replace(/\r\n/g, "\n").split("\n");
  
  let delimiterIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t === "⸻" || t.startsWith("⸻ ") || (i > 0 && t === "---") || (i > 0 && t.startsWith("--- "))) {
      delimiterIdx = i;
      break;
    }
  }

  let fmLines: string[] = [];
  let bodyLines: string[] = [];

  if (delimiterIdx !== -1) {
    fmLines = lines.slice(0, delimiterIdx);
    bodyLines = lines.slice(delimiterIdx + 1);
  } else {
    // If no end delimiter found, attempt standard gray-matter parsing
    try {
      const parsed = matter(fileContent);
      const rawImgs = Array.isArray(parsed.data.images)
        ? parsed.data.images
        : Array.isArray(parsed.data.gallery)
        ? parsed.data.gallery
        : [];

      const formattedImages: ProjectImageItem[] = rawImgs.map((item: any) => {
        if (typeof item === "object" && item !== null && item.url) {
          return {
            url: formatImageUrl(item.url),
            caption: cleanStr(item.caption),
          };
        }
        return {
          url: formatImageUrl(String(item)),
          caption: "",
        };
      });

      return {
        slug: parsed.data.slug || fileName.replace(/^⸻slug\s*/, "").replace(/\.md$/, "").trim(),
        title: parsed.data.title || "Projet sans titre",
        domain: parsed.data.domain || "Product Management & Tech",
        role: parsed.data.role || "",
        context: parsed.data.context || "",
        year: parsed.data.year || "",
        summary: parsed.data.summary || "",
        impactMetric: parsed.data.impactMetric || "",
        coverImage: formatImageUrl(parsed.data.coverImage),
        images: formattedImages,
        tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
        content: parsed.content.split(/##\s*6\.\s*La Galerie/i)[0].trim(),
      };
    } catch (e) {
      bodyLines = lines;
    }
  }

  const data: Record<string, string> = {};
  const images: ProjectImageItem[] = [];
  const tags: string[] = [];

  let currentSection: "images" | "tags" | null = null;
  let currentImageObj: ProjectImageItem | null = null;

  for (let i = 0; i < fmLines.length; i++) {
    const line = fmLines[i].trim();
    if (!line) continue;

    const colonIdx = line.indexOf(":");

    // Check list item line
    if (line.startsWith("-")) {
      const itemContent = line.substring(1).trim();

      if (itemContent.startsWith("tags:") || itemContent === "tags:") {
        currentSection = "tags";
        continue;
      }

      if (currentSection === "images" || itemContent.includes("/assets/")) {
        currentSection = "images";
        const urlMatch = itemContent.match(/(\/assets\/[^\n\r"\xAB\xBB\x22\x27]+\.(webp|jpg|jpeg|png))/i);
        const rawUrl = urlMatch ? urlMatch[1] : itemContent;
        currentImageObj = { url: formatImageUrl(cleanStr(rawUrl)), caption: "" };
        images.push(currentImageObj);
        continue;
      }

      if (currentSection === "tags") {
        const cleanTag = cleanStr(itemContent);
        if (cleanTag) tags.push(cleanTag);
        continue;
      }
    }

    // Check caption line
    if (line.toLowerCase().includes("caption") && currentImageObj) {
      if (colonIdx !== -1) {
        currentImageObj.caption = cleanStr(line.substring(colonIdx + 1));
      }
      continue;
    }

    // Standard key-value pair line
    if (colonIdx !== -1) {
      const key = cleanStr(line.substring(0, colonIdx)).replace(/^⸻\s*/, "");
      const val = cleanStr(line.substring(colonIdx + 1));

      if (key === "images" || key === "gallery") {
        currentSection = "images";
        if (val.startsWith("[")) {
          try {
            // Try parsing JSON array of objects or strings
            const jsonStr = val.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
            const arr = JSON.parse(jsonStr);
            if (Array.isArray(arr)) {
              arr.forEach((item: any) => {
                if (typeof item === "object" && item !== null && item.url) {
                  images.push({
                    url: formatImageUrl(cleanStr(item.url)),
                    caption: cleanStr(item.caption),
                  });
                } else if (typeof item === "string") {
                  images.push({
                    url: formatImageUrl(cleanStr(item)),
                    caption: "",
                  });
                }
              });
            }
          } catch {
            // Fallback to regex matching if JSON parse fails
            const matches = val.matchAll(/\{\s*url\s*:\s*["']?([^"'}]+)["']?\s*(?:,\s*caption\s*:\s*["']?([^"'}]+)["']?)?\s*\}/gi);
            for (const match of matches) {
              if (match[1]) {
                images.push({
                  url: formatImageUrl(cleanStr(match[1])),
                  caption: cleanStr(match[2] || ""),
                });
              }
            }
          }
        }
      } else if (key === "tags") {
        currentSection = "tags";
      } else if (key === "slug" || key === "⸻slug") {
        data.slug = val;
      } else {
        data[key] = val;
      }
    }
  }

  const content = bodyLines.join("\n").split(/##\s*6\.\s*La Galerie/i)[0].trim();
  const cleanFilenameSlug = fileName
    .replace(/^⸻slug\s*/, "")
    .replace(/\.md$/, "")
    .trim();

  return {
    slug: data.slug || cleanFilenameSlug,
    title: data.title || "Projet sans titre",
    domain: data.domain || "Product Management & Tech",
    role: data.role || "",
    context: data.context || "",
    year: data.year || "",
    summary: data.summary || "",
    impactMetric: data.impactMetric || "",
    coverImage: formatImageUrl(cleanStr(data.coverImage)),
    images,
    tags,
    content,
  };
}

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
      return parseProjectFile(fileContents, file);
    });

  return projects;
}

export function getProjectBySlug(slug: string): ProjectData | null {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug) || null;
}


