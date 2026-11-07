import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-3xl px-6 py-24 text-center sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Page not found</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">That page doesn’t exist. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800">
            Home
          </Link>
          <Link href="/coding" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 hover:border-stone-300">
            Coding
          </Link>
        </div>
      </section>
    </main>
  );
}
