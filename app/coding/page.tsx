import Link from "next/link";
import ProjectCard from "@/app/components/ProjectCard";
import CodingGitHubSection from "@/app/components/CodingGitHubSection";
import codingProjects from "@/app/data/coding-projects.json";

const githubUsername = "josephmusngi21";
const githubProfileUrl = `https://github.com/${githubUsername}`;
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

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {codingProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} hrefBase="/coding" />
          ))}
        </div>
      </section>
    </main>
  );
}