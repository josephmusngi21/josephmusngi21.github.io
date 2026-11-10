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
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
            Coding
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Explore what I build.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            Mobile apps, web tools, and embedded experiments. Start with a
            featured project, peek at the code, or dig into the engineering
            decisions behind it.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#featured-projects" className="rounded-full border border-stone-200 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800">
            Explore featured projects
          </a>
          <Link href="/coding/technical" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-stone-300 hover:bg-white">
            Technical deep dives
          </Link>
          <Link href={githubProfileUrl} target="_blank" rel="noreferrer" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-stone-300 hover:bg-white">
            View GitHub
          </Link>
        </div>

        <nav aria-label="On this page" className="mt-10 flex flex-wrap items-center gap-2 border-y border-stone-200 py-4">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            Jump to
          </span>
          {[
            ["#featured-projects", "Featured projects"],
            ["#code-highlights", "Code highlights"],
            ["#more-projects", "More projects"],
            ["#github", "GitHub"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700">
              {label}
            </a>
          ))}
        </nav>

        <section id="featured-projects" aria-labelledby="featured-heading" className="mt-10 scroll-mt-28">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="featured-heading" className="text-2xl font-semibold tracking-tight text-slate-900">Featured projects</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                A starting point for exploring my work. Open a project for its overview, code, and architecture.
              </p>
            </div>
            <span className="text-sm text-stone-500">{featuredProjects.length} selected projects</span>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} hrefBase="/coding" />
            ))}
          </div>
        </section>

        <section id="code-highlights" aria-labelledby="code-highlights-heading" className="mt-16 scroll-mt-28">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
              From the source
            </p>
            <h2 id="code-highlights-heading" className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              Selected code highlights
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A few real excerpts from featured projects, chosen to show the
              practical logic behind the interfaces. Expand a highlight to view
              the code and its source.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {codeHighlights.map((highlight) => {
              const project = featuredProjects.find(
                (item) => item.slug === highlight.projectSlug,
              );

              if (!project) {
                return null;
              }

              return (
                <details
                  key={`${highlight.projectSlug}-${highlight.sourcePath}`}
                  className="group min-w-0 rounded-2xl border border-stone-200 bg-white/90 transition-colors open:border-stone-300"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-slate-900 transition-colors hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-700 sm:px-6 [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-stone-500">{project.title} / {highlight.language}</span>
                      <span className="mt-1 block text-base font-semibold">{highlight.title}</span>
                      <span className="mt-2 block text-xs font-medium text-slate-600 sm:hidden">
                        <span className="group-open:hidden">View code</span>
                        <span className="hidden group-open:inline">Hide code</span>
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3 text-xs font-medium text-slate-600">
                      <span className="hidden sm:inline">
                        <span className="group-open:hidden">View code</span>
                        <span className="hidden group-open:inline">Hide code</span>
                      </span>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 transition-transform group-open:rotate-180">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="border-t border-stone-200 p-3 sm:p-6">
                    <p className="mb-4 text-sm leading-6 text-slate-600">
                      {highlight.description}
                    </p>
                    <CodeBlock
                      title={highlight.title}
                      language={highlight.language}
                      code={highlight.code}
                    />
                    <p className="mt-3 break-all text-xs leading-6 text-slate-500">
                      Source:{" "}
                      <a
                        href={highlight.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center py-2 font-medium text-slate-700 underline decoration-stone-300 underline-offset-4 hover:text-slate-900"
                      >
                        {highlight.sourcePath}
                      </a>
                    </p>
                    <Link
                      href={`/coding/${project.slug}`}
                      className="mt-2 inline-flex min-h-11 items-center py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                    >
                      Project details
                    </Link>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        <section id="more-projects" aria-labelledby="more-projects-heading" className="mt-16 scroll-mt-28">
          <h2 id="more-projects-heading" className="text-2xl font-semibold tracking-tight text-slate-900">More projects</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            More tools, experiments, and learning projects across my repositories.
          </p>
          <details className="group mt-6 rounded-3xl border border-stone-200 bg-white/90">
            <summary className="cursor-pointer rounded-3xl p-6 font-medium text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-700">
              <span className="group-open:hidden">Browse {otherProjects.length} more projects</span>
              <span className="hidden group-open:inline">Hide additional projects</span>
            </summary>
            <div className="grid gap-4 border-t border-stone-200 p-3 sm:p-6 md:grid-cols-2 xl:grid-cols-3">
              {otherProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} hrefBase="/coding" />
              ))}
            </div>
          </details>
          <TechShowcaseCard projects={codingProjects} />
        </section>

        <div id="github" className="mt-16 scroll-mt-28">
          <CodingGitHubSection
            githubUsername={githubUsername}
            githubProfileUrl={githubProfileUrl}
            projects={codingProjects}
          />
        </div>
        <a href="#featured-projects" className="mt-8 inline-block rounded-lg py-3 text-sm font-medium text-slate-600 hover:text-slate-900">
          Back to featured projects
        </a>
      </section>
    </main>
  );
}