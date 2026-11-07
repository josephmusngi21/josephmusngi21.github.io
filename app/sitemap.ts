import type { MetadataRoute } from "next";
import codingProjects from "@/app/data/coding-projects.json";

export const dynamic = "force-static";

const base = "https://josephmusngi21.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about/", "/coding/", "/coding/technical/", "/photography/"];

  return [
    ...pages.map((path) => ({ url: `${base}${path}` })),
    ...codingProjects.map((project) => ({ url: `${base}/coding/${project.slug}/` })),
  ];
}
