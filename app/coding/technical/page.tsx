import Link from "next/link";
import CodeBlock from "@/app/components/CodeBlock";
import ExpandableProject from "@/app/components/ExpandableProject";
import ExpandAllControls from "@/app/components/ExpandAllControls";
import ArchitectureDiagram from "@/app/components/ArchitectureDiagram";
import { DeepDive, EngineeringLog } from "@/app/components/DeepDive";
import codingProjects from "@/app/data/coding-projects.json";
import { featuredSlugs } from "@/app/data/featured";

const orderedProjects = [
  ...featuredSlugs.map((slug) => codingProjects.find((project) => project.slug === slug)),
  ...codingProjects.filter((project) => !featuredSlugs.includes(project.slug)),
].filter((project) => project !== undefined);

export const metadata = {
  title: "Technical breakdown",
  description: "Algorithms, data structures, and engineering techniques across my projects.",
};

export default function TechnicalBreakdownPage() {
  return (
    <main id="top" className="flex-1">
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

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Projects" className="flex flex-wrap gap-2">
            {orderedProjects.map((project) => (
              <a
                key={project.slug}
                href={`#${project.slug}`}
                className="rounded-full border border-stone-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-stone-300 hover:bg-white"
              >
                {project.title}
              </a>
            ))}
          </nav>
          <ExpandAllControls />
        </div>

        <div className="mt-12 grid gap-10">
          {orderedProjects.map((project) => (
            <ExpandableProject
              key={project.slug}
              id={project.slug}
              title={project.title}
              category={project.category}
              summary={project.description}
              techStack={project.techStack}
              highlightCount={project.highlights.length}
            >
              <p className="text-sm leading-7 text-slate-600">{project.overview}</p>

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
            </ExpandableProject>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#top" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            ↑ Back to top
          </a>
        </div>
      </section>
    </main>
  );
}
