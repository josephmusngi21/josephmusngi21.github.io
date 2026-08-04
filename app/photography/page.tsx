import fs from "fs";
import path from "path";

import Image from "next/image";
import Link from "next/link";

const photographyDirectory = path.join(process.cwd(), "public/photography");
const aspectClasses = ["aspect-4/5", "aspect-square", "aspect-3/4", "aspect-5/4"];

function buildGalleryItems() {
  return fs
    .readdirSync(photographyDirectory)
    .filter((fileName) => /\.(jpe?g|png|webp|avif)$/i.test(fileName))
    .map((fileName) => ({
      fileName,
      modifiedTime: fs.statSync(path.join(photographyDirectory, fileName)).mtimeMs,
    }))
    .sort((left, right) => {
      if (right.modifiedTime !== left.modifiedTime) {
        return right.modifiedTime - left.modifiedTime;
      }

      return left.fileName.localeCompare(right.fileName, undefined, { numeric: true });
    })
    .map((item, index) => ({
      fileName: item.fileName,
      caption: item.fileName,
      aspectClass: aspectClasses[index % aspectClasses.length],
    }));
}

export default function PhotographyPortfolioPage() {
  const galleryItems = buildGalleryItems();
  const featuredItems = galleryItems.slice(0, 6);
  const remainingItems = galleryItems.slice(6);
  const featuredCount = Math.min(6, galleryItems.length);

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
              Photography Portfolio
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              A clean film gallery that updates from your folder automatically.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              This page maps whatever images are currently in your photography folder. Add a photo and refresh to see it instantly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="rounded-full border border-stone-200 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800">
                Back home
              </Link>
              <Link href="/about" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-stone-300 hover:bg-white">
                About me
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-stone-200 bg-white/80 p-5 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.18)] sm:grid-cols-3">
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Photos loaded</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{galleryItems.length}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Showing all image files from <span className="font-medium text-slate-900">public/photography</span>.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-linear-to-br from-stone-100 via-white to-amber-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Featured</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{featuredCount}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                A front row of highlights, followed by the full archive.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Featured frames</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Selected work</h2>
            </div>
            <p className="hidden max-w-md text-sm leading-6 text-slate-600 sm:block">
              The gallery uses a gentle editorial rhythm so the photos can breathe on desktop and mobile.
            </p>
          </div>

          {featuredItems.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredItems.map((item) => (
              <figure
                key={item.fileName}
                className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white/90 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.24)]"
              >
                <div className={`relative ${item.aspectClass} overflow-hidden bg-stone-100`}>
                  <Image
                    src={`/photography/${item.fileName}`}
                    alt={item.caption}
                    fill
                    quality={100}
                    sizes="(min-width: 1536px) 22vw, (min-width: 1280px) 24vw, (min-width: 768px) 48vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-3 border-t border-stone-200 px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.caption}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-stone-500">Featured</p>
                  </div>
                  <span className="text-xs text-slate-500">{item.fileName.toLowerCase().endsWith(".jpg") ? "JPG" : "Photo"}</span>
                </figcaption>
              </figure>
            ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-stone-200 bg-white/90 p-8 text-slate-700">
              No images found yet. Upload a photo into public/photography.
            </div>
          )}
        </div>

        {remainingItems.length > 0 ? (
          <div className="mt-12 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Archive</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Complete set</h2>
            </div>

            <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
              {remainingItems.map((item) => (
                <figure
                  key={item.fileName}
                  className="mb-5 break-inside-avoid overflow-hidden rounded-[2rem] border border-stone-200 bg-white/90 shadow-[0_18px_60px_-50px_rgba(15,23,42,0.2)]"
                >
                  <div className={`relative ${item.aspectClass} overflow-hidden bg-stone-100`}>
                    <Image
                      src={`/photography/${item.fileName}`}
                      alt={item.caption}
                      fill
                      quality={100}
                      sizes="(min-width: 1536px) 30vw, (min-width: 1280px) 32vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-stone-200 px-5 py-4">
                    <p className="text-sm font-medium text-slate-900">{item.caption}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-stone-500">Archive</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}