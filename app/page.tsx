import Link from "next/link";
import ProfileImage from "@/app/components/ProfileImage";
import ProjectCard from "@/app/components/ProjectCard";
import codingProjects from "@/app/data/coding-projects.json";
import { featuredSlugs } from "@/app/data/featured";
import meImage from "@/app/about/me (1).jpg";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="space-y-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/85 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-stone-500 shadow-sm">
            Joseph Musngi Portfolio
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Hi, I’m Joseph Musngi.
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
              I’m a software developer who builds mobile and full-stack apps with React Native, Next.js, and Node. Every project here comes with its architecture diagram, the algorithms behind it, and an engineering log of the real bugs I hit and how I fixed them.
            </p>
            <p className="mx-auto max-w-3xl text-base leading-8 text-slate-600">
              Outside of coding, I hike, climb, play tennis and bowl, and shoot film photography around Arizona.
            </p>
          </div>

          <div className="mx-auto w-full max-w-xs">
            <ProfileImage src={meImage} alt="Joseph Musngi portrait" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/about" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-stone-300 hover:bg-white">
              About
            </Link>
            <Link href="/coding" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-stone-300 hover:bg-white">
              Coding
            </Link>
            <Link href="/photography" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-stone-300 hover:bg-white">
              Photography
            </Link>
          </div>

          <div className="mx-auto max-w-3xl space-y-4 text-left">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900">Featured work</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {featuredSlugs.map((slug) => {
                const project = codingProjects.find((item) => item.slug === slug);
                return project ? <ProjectCard key={slug} project={project} hrefBase="/coding" /> : null;
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:josephmusngi21@gmail.com" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800">
              Get in touch
            </a>
            <Link href="/coding/technical" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-stone-300 hover:bg-white">
              Technical breakdowns
            </Link>
          </div>

          <div className="mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-white/70 px-5 py-4 text-left shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Interests And Focus</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-600">
              <span className="rounded-full bg-stone-100 px-3 py-2">Front End</span>
              <span className="rounded-full bg-stone-100 px-3 py-2">Back End</span>
              <span className="rounded-full bg-amber-50 px-3 py-2 text-amber-900">Hiking</span>
              <span className="rounded-full bg-amber-50 px-3 py-2 text-amber-900">Climbing</span>
              <span className="rounded-full bg-amber-50 px-3 py-2 text-amber-900">Tennis</span>
              <span className="rounded-full bg-amber-50 px-3 py-2 text-amber-900">Bowling</span>
              <span className="rounded-full bg-amber-50 px-3 py-2 text-amber-900">Photography</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
