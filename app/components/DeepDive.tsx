type DeepDiveSection = {
  title: string;
  body: string;
};

type LogEntry = {
  date: string;
  commit: string;
  problem: string;
  fix: string;
};

export function DeepDive({ sections }: { sections: DeepDiveSection[] }) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Technical deep dive</p>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {sections.map((section, index) => (
          <section key={section.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="flex items-baseline gap-3 text-base font-semibold text-slate-900">
              <span className="text-xs font-semibold tracking-[0.2em] text-stone-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export function EngineeringLog({ entries, repoUrl }: { entries: LogEntry[]; repoUrl: string }) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Engineering log</p>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Problems I ran into while building this, reconstructed from the commit history, and how each one was resolved.
      </p>
      <ol className="mt-6 space-y-4 border-l border-stone-200 pl-6">
        {entries.map((entry) => (
          <li key={`${entry.commit}-${entry.problem}`} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-slate-900" />
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
              <span className="font-medium">{entry.date}</span>
              <a
                href={`${repoUrl}/commit/${entry.commit}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-stone-100 px-2.5 py-0.5 font-mono text-slate-700 hover:bg-stone-200"
              >
                {entry.commit}
              </a>
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-800">
              <span className="font-semibold text-rose-700">Problem: </span>
              {entry.problem}
            </p>
            <p className="text-sm leading-7 text-slate-800">
              <span className="font-semibold text-emerald-700">Fix: </span>
              {entry.fix}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
