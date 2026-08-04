import ProjectCard from "@/app/components/ProjectCard";
import projectsData from "@/app/data/projects.json";

export default function ProjectsPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
            Projects
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Selected work and experiments.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            These projects highlight my approach to front-end design, component architecture, and building polished experiences with modern web tools.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projectsData.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}