import Link from "next/link";
import ProfileImage from "@/app/components/ProfileImage";
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
              I’m a Software Engineering graduate who enjoys building clean, modern apps that feel intuitive to use and solid under the hood. I like front-end development because it blends problem solving with design, and I keep growing my back-end skills so I can build complete products from end to end.
            </p>
            <p className="mx-auto max-w-3xl text-base leading-8 text-slate-600">
              Outside of coding, I spend time hiking, climbing, playing tennis and bowling, and getting behind the camera for photography. Those hobbies keep me creative, active, and curious, which carries back into how I approach software and new projects.
            </p>
          </div>

          <div className="mx-auto w-full max-w-xs">
            <ProfileImage src={meImage} alt="Joseph Musngi portrait" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/about" className="rounded-full border border-stone-200 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800">
              About
            </Link>
            <Link href="/coding" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-stone-300 hover:bg-white">
              Projects
            </Link>
            <Link href="/photography" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-stone-300 hover:bg-white">
              Photography
            </Link>
          </div>

          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
            <span className="rounded-full border border-stone-200 bg-white/90 px-4 py-2">Front-end development</span>
            <span className="rounded-full border border-stone-200 bg-white/90 px-4 py-2">Hiking</span>
            <span className="rounded-full border border-stone-200 bg-white/90 px-4 py-2">Climbing</span>
            <span className="rounded-full border border-stone-200 bg-white/90 px-4 py-2">Tennis</span>
            <span className="rounded-full border border-stone-200 bg-white/90 px-4 py-2">Bowling</span>
            <span className="rounded-full border border-stone-200 bg-white/90 px-4 py-2">Photography</span>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/about" className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)] transition-transform hover:-translate-y-1">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">About</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">Who I am</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">A quick intro, skills, interests, and contact links.</p>
            </Link>
            <Link href="/coding" className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)] transition-transform hover:-translate-y-1">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">Projects</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">Portfolio deep dives</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">Detailed breakdowns, repo snapshots, and public project work in one place.</p>
            </Link>
            <Link href="/photography" className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)] transition-transform hover:-translate-y-1">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">Photography</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">Visual work</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">A simple gallery space for photos and future uploads.</p>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
