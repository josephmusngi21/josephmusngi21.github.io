"use client";

import { useParams } from "next/navigation";
import projects from "@/app/data/projects.json";
import CodeBlock from "@/app/components/CodeBlock";
import Demo from "@/app/components/Demo";
import Diagram from "@/app/components/Diagram";

export default function ProjectDetailContent() {
  const params = useParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const project = projects.find((item) => item.slug === slug) ?? projects[0];

  return (
    <div className="mt-12 space-y-10">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
            {project.slug}
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            {project.title}
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-900 bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
            >
              View Repository
            </a>
          </div>
        </div>

        <Demo title={project.demoTitle} description={project.demoDescription} bullets={project.demoBullets} />
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Technical highlights</h3>
        <div className="mt-5 grid gap-3">
          {project.highlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 text-sm leading-7 text-slate-700"
            >
              {highlight}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Architecture breakdown</h3>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {project.architecture.map((part) => (
            <article
              key={part.title}
              className="rounded-2xl border border-stone-200 bg-stone-50 p-5"
            >
              <h4 className="text-base font-semibold text-slate-900">{part.title}</h4>
              <p className="mt-3 text-sm leading-7 text-slate-600">{part.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <CodeBlock title={project.codeTitle} language={project.codeLanguage} code={project.codeExample} />

      <Diagram title={project.systemDesignTitle} steps={project.diagramSteps} />

      <section className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Challenges and solutions</h3>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {project.challenges.map((challenge) => (
            <article
              key={challenge.title}
              className="rounded-2xl border border-stone-200 bg-stone-50 p-5"
            >
              <h4 className="text-base font-semibold text-slate-900">{challenge.title}</h4>
              <p className="mt-3 text-sm leading-7 text-slate-600">{challenge.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
            System design explanation
          </h3>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            {project.systemDesign}
          </p>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-linear-to-br from-sky-50 via-white to-amber-50 p-6 text-slate-900 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
          <h3 className="text-2xl font-semibold tracking-tight">What I learned</h3>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            {project.learned}
          </p>
        </div>
      </section>
    </div>
  );
}