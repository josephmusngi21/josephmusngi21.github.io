type DemoProps = {
  title: string;
  description: string;
  bullets: string[];
};

export default function Demo({ title, description, bullets }: DemoProps) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
      <div className="mb-5 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-rose-300" />
        <span className="h-3 w-3 rounded-full bg-amber-300" />
        <span className="h-3 w-3 rounded-full bg-emerald-300" />
      </div>

      <div className="rounded-2xl border border-stone-200 bg-gradient-to-br from-stone-50 via-white to-amber-50/60 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
          Project Walkthrough
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
          {description}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {bullets.map((bullet) => (
            <div
              key={bullet}
              className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-sm"
            >
              {bullet}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-slate-900">
          <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-stone-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Interface snapshot</p>
              <div className="mt-4 space-y-3">
                <div className="h-3 w-3/4 rounded-full bg-stone-200" />
                <div className="h-3 w-1/2 rounded-full bg-stone-100" />
                <div className="h-24 rounded-2xl bg-gradient-to-br from-stone-100 to-amber-50" />
              </div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Outcome</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}