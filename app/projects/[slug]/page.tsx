import { redirect } from "next/navigation";

export default async function ProjectsDetailRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/coding/${slug}`);
}