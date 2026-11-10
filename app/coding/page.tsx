import Link from "next/link";
import ProjectCard from "@/app/components/ProjectCard";
import TechShowcaseCard from "@/app/components/TechShowcaseCard";
import CodingGitHubSection from "@/app/components/CodingGitHubSection";
import CodeBlock from "@/app/components/CodeBlock";
import codingProjects from "@/app/data/coding-projects.json";
import { featuredSlugs } from "@/app/data/featured";
import { codeHighlights } from "@/app/data/code-highlights";

export const metadata = {
  title: "Coding",
  description:
    "Software projects by Joseph Musngi with architecture diagrams, algorithms, and engineering logs built from real commit history.",
};

const githubUsername = "josephmusngi21";
const githubProfileUrl = `https://github.com/${githubUsername}`;
const featuredProjects = featuredSlugs
  .map((slug) => codingProjects.find((project) => project.slug === slug))
  .filter((project) => project !== undefined);
const otherProjects = codingProjects.filter((project) => !featuredSlugs.includes(project.slug));

export default function CodingPortfolioPage() {

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
            Coding
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Code that reflects how I think and build.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            I enjoy building software that is clean, practical, and easy to use. The projects here show how I approach problem-solving, structure ideas, and turn concepts into polished results.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full border border-stone-200 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800">
            Back home
          </Link>
          <Link href={githubProfileUrl} target="_blank" rel="noreferrer" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-stone-300 hover:bg-white">
            View GitHub
          </Link>
        </div>

        <CodingGitHubSection
          githubUsername={githubUsername}
          githubProfileUrl={githubProfileUrl}
          projects={codingProjects}
        />

        <TechShowcaseCard projects={codingProjects} />

        <section className="mt-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
              From the source
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              Selected code highlights
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A few real excerpts from featured projects, chosen to show the
              practical logic behind the interfaces.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {codeHighlights.map((highlight) => {
              const project = featuredProjects.find(
                (item) => item.slug === highlight.projectSlug,
              );

              if (!project) {
                return null;
              }

              return (
                <article
                  key={`${highlight.projectSlug}-${highlight.sourcePath}`}
                  className="rounded-3xl border border-stone-200 bg-white/90 p-5 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)] sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {project.title}
                    </p>
                    <Link
                      href={`/coding/${project.slug}`}
                      className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                    >
                      Project details
                    </Link>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {highlight.description}
                  </p>
                  <div className="mt-4">
                    <CodeBlock
                      title={highlight.title}
                      language={highlight.language}
                      code={highlight.code}
                    />
                  </div>
                  <p className="mt-3 break-all text-xs text-slate-500">
                    Source:{" "}
                    <a
                      href={highlight.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-slate-700 underline decoration-stone-300 underline-offset-4 hover:text-slate-900"
                    >
                      {highlight.sourcePath}
                    </a>
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight text-slate-900">Featured projects</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} hrefBase="/coding" />
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-slate-900">More projects</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {otherProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} hrefBase="/coding" />
          ))}
        </div>
      </section>
    </main>
  );
}