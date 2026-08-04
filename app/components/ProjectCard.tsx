import Link from "next/link";

type ProjectCardProps = {
  project: {
    slug: string;
    title: string;
    description: string;
    techStack: string[];
  };
  hrefBase?: string;
};

export default function ProjectCard({ project, hrefBase = "/projects" }: ProjectCardProps) {
  return (
    <Link
      href={`${hrefBase}/${project.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_24px_70px_-42px_rgba(15,23,42,0.22)]"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">
          {project.title}
        </h3>
        <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          View
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition-transform duration-200 group-hover:translate-x-1">
        Explore project
        <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}