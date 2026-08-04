import Link from "next/link";
import { notFound } from "next/navigation";
import CodeBlock from "@/app/components/CodeBlock";
import Demo from "@/app/components/Demo";
import Diagram from "@/app/components/Diagram";
import codingProjects from "@/app/data/coding-projects.json";

type CodingProject = (typeof codingProjects)[number];

function getProject(slug: string): CodingProject | undefined {
  return codingProjects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return codingProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Coding Project",
    };
  }

  return {
    title: `${project.title} | Coding`,
    description: project.description,
  };
}

export default async function CodingProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
          <Link href="/coding" className="font-medium text-slate-700 hover:text-slate-900">
            Coding Portfolio
          </Link>
          <span>/</span>
          <span>{project.title}</span>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
              {project.category}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm font-medium text-slate-700">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={project.repoUrl} target="_blank" rel="noreferrer" className="rounded-full border border-stone-200 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800">
                GitHub Repo
              </Link>
              {project.demoUrl ? (
                <Link href={project.demoUrl} target="_blank" rel="noreferrer" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-stone-300 hover:bg-white">
                  Live Demo
                </Link>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
              Overview
            </p>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              {project.overview}
            </p>
            <div className="mt-6 grid gap-3">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-slate-700">
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6">
          <Demo title={project.demoTitle} description={project.demoDescription} bullets={project.demoBullets} />
          <CodeBlock title={project.codeTitle} language={project.codeLanguage} code={project.codeExample} />
          <Diagram title={project.diagramTitle} steps={project.diagramSteps} />
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              System design
            </h2>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              {project.systemDesign}
            </p>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-gradient-to-br from-sky-50 via-white to-amber-50 p-6 text-slate-900 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
            <h2 className="text-2xl font-semibold tracking-tight">What I learned</h2>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              {project.learned}
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}