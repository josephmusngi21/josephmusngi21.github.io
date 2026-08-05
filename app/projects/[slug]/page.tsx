import { redirect } from "next/navigation";
import codingProjects from "@/app/data/coding-projects.json";

export function generateStaticParams() {
  return codingProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectsDetailRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/coding/${slug}`);
}