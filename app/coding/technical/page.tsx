import Link from "next/link";
import CodeBlock from "@/app/components/CodeBlock";
import ArchitectureDiagram from "@/app/components/ArchitectureDiagram";
import { DeepDive, EngineeringLog } from "@/app/components/DeepDive";
import codingProjects from "@/app/data/coding-projects.json";

export const metadata = {
  title: "Technical breakdown | Coding",
  description: "Algorithms, data structures, and engineering techniques across my projects.",
};

export default function TechnicalBreakdownPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
          <Link href="/coding" className="font-medium text-slate-700 hover:text-slate-900">
            Coding
          </Link>
          <span>/</span>
          <span>Technical breakdown</span>
        </div>

        <div className="mt-6 max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Technical breakdown
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            The algorithms, data structures, and engineering decisions behind each project, with the real code that implements them.
          </p>
        </div>

        <nav aria-label="Projects" className="mt-8 flex flex-wrap gap-2">
          {codingProjects.map((project) => (
            <a
              key={project.slug}
              href={`#${project.slug}`}
              className="rounded-full border border-stone-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-stone-300 hover:bg-white"
            >
              {project.title}
            </a>
          ))}
        </nav>

        <div className="mt-12 grid gap-10">
          {codingProjects.map((project) => (
            <article
              key={project.slug}
              id={project.slug}
              className="scroll-mt-24 rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.18)] sm:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
                {project.category}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                {project.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{project.overview}</p>

              <ul className="mt-5 grid gap-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-slate-700"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <CodeBlock title={project.codeTitle} language={project.codeLanguage} code={project.codeExample} />
              </div>

              <div className="mt-6 grid gap-6">
                {project.architecture ? (
                  <ArchitectureDiagram title="Architecture" architecture={project.architecture} />
                ) : null}
                {project.deepDive?.length ? <DeepDive sections={project.deepDive} /> : null}
                {project.engineeringLog?.length ? (
                  <EngineeringLog entries={project.engineeringLog} repoUrl={project.repoUrl} />
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/coding/${project.slug}`}
                  className="rounded-full border border-stone-200 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                >
                  Open project page
                </Link>
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-stone-300 hover:bg-white"
                >
                  GitHub repo
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
