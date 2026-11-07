"use client";

import { useEffect, useState, type ReactNode } from "react";

type ExpandableProjectProps = {
  id: string;
  title: string;
  category: string;
  summary: string;
  techStack: string[];
  highlightCount: number;
  children: ReactNode;
};

export default function ExpandableProject({
  id,
  title,
  category,
  summary,
  techStack,
  highlightCount,
  children,
}: ExpandableProjectProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openIfTargeted = () => {
      if (window.location.hash === `#${id}`) {
        setOpen(true);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    openIfTargeted();
    window.addEventListener("hashchange", openIfTargeted);
    return () => window.removeEventListener("hashchange", openIfTargeted);
  }, [id]);

  const panelId = `${id}-panel`;

  useEffect(() => {
    const onToggleAll = (event: Event) => setOpen((event as CustomEvent<boolean>).detail);
    window.addEventListener("technical:toggle-all", onToggleAll);
    return () => window.removeEventListener("technical:toggle-all", onToggleAll);
  }, []);

  return (
    <article
      id={id}
      className="scroll-mt-24 rounded-3xl border border-stone-200 bg-white/90 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.18)] transition-shadow duration-300 hover:shadow-[0_24px_70px_-42px_rgba(15,23,42,0.22)]"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start justify-between gap-4 rounded-3xl p-6 text-left sm:p-8"
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">{category}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {techStack.slice(0, 6).map((tech) => (
              <span key={tech} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-slate-700">
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm font-medium text-slate-900">
            {open ? "Hide technical details" : `Show technical details (${highlightCount} highlights, diagram, deep dive, log)`}
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
        id={panelId}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        inert={!open}
      >
        <div className="overflow-hidden">
          <div className="border-t border-stone-200 p-6 sm:p-8">{children}</div>
        </div>
      </div>
    </article>
  );
}
