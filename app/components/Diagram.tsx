type DiagramProps = {
  title: string;
  steps: {
    title: string;
    detail: string;
  }[];
};

export default function Diagram({ title, steps }: DiagramProps) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
        System Design
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
        {title}
      </h3>

      <div className="mt-6 grid gap-4 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative rounded-3xl border border-stone-200 bg-stone-50 p-5"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h4 className="text-base font-semibold text-slate-900">{step.title}</h4>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{step.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}