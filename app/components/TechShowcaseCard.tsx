"use client";

import Link from "next/link";
import { useState } from "react";

type ShowcaseProject = {
  slug: string;
  title: string;
  codeTitle: string;
  highlights: string[];
};

type TechShowcaseCardProps = {
  projects: ShowcaseProject[];
  hrefBase?: string;
  detailsHref?: string;
};

export default function TechShowcaseCard({
  projects,
  hrefBase = "/coding",
  detailsHref = "/coding/technical",
}: TechShowcaseCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-10 rounded-3xl border border-stone-200 bg-white/90 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.18)]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="tech-showcase-panel"
        className="flex w-full items-center justify-between gap-4 rounded-3xl p-6 text-left sm:p-8"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
            Technical showcase
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
            Algorithms and techniques across my projects
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {open ? "Hide the highlights" : `Expand to preview ${projects.length} projects`}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-slate-700 transition-transform duration-500 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      <div
        id="tech-showcase-panel"
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-stone-200 px-6 pb-6 pt-4 sm:px-8 sm:pb-8">
            <ul className="grid gap-x-8 gap-y-1 md:grid-cols-2">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`${hrefBase}/${project.slug}`}
                    tabIndex={open ? 0 : -1}
                    className="group block rounded-2xl px-4 py-3 transition-colors hover:bg-stone-50"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-slate-900">{project.title}</span>
                      <span aria-hidden="true" className="text-slate-400 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-slate-700">{project.codeTitle}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={detailsHref}
              tabIndex={open ? 0 : -1}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              See the full technical breakdown
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
