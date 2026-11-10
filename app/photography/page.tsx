import fs from "fs";
import path from "path";

import Image from "next/image";
import Link from "next/link";
import PhotoViewer from "@/app/components/PhotoViewer";

export const metadata = {
  title: "Photography",
  description: "Arizona film photography shot on a Canon AE-1 Program by Joseph Musngi.",
};

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
      caption: `Arizona film photograph, Canon AE-1 Program, frame ${item.fileName.match(/\d+/)?.[0] ?? index + 1}`,
      aspectClass: aspectClasses[index % aspectClasses.length],
    }));
}

export default function PhotographyPortfolioPage() {
  const galleryItems = buildGalleryItems();
  const featuredItems = galleryItems.slice(0, 6);
  const remainingItems = galleryItems.slice(6);

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
        <div className="max-w-3xl">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
              Photography Portfolio
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Arizona moments captured on film.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              A collection of Arizona scenes shot on a Canon AE-1 Program.
              Select a photo or its “View full image” link to see the uncropped
              frame. The viewer also links to the original file for a closer look.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#selected-work" className="inline-flex min-h-11 items-center rounded-full border border-stone-200 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800">
                Explore the gallery
              </a>
              <Link href="/about" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-stone-300 hover:bg-white">
                About me
              </Link>
            </div>
          </div>

        </div>

        <nav aria-label="Gallery sections" className="mt-8 flex flex-wrap items-center gap-3 border-y border-stone-200 py-3">
          <span className="mr-auto text-sm text-stone-500">{galleryItems.length} photographs</span>
          <a href="#selected-work" className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-stone-100">Selected work</a>
          {remainingItems.length > 0 ? (
            <a href="#archive" className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-stone-100">More photographs</a>
          ) : null}
        </nav>

        <section id="selected-work" aria-labelledby="selected-work-heading" className="mt-10 scroll-mt-28 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Featured frames</p>
              <h2 id="selected-work-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Selected work</h2>
            </div>
          </div>

          {featuredItems.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredItems.map((item) => (
              <figure
                key={item.fileName}
                className="group overflow-hidden rounded-4xl border border-stone-200 bg-white/90 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.24)]"
              >
                <PhotoViewer src={`/photography/${encodeURIComponent(item.fileName)}`} caption={item.caption}>
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
                </PhotoViewer>
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
        </section>

        {remainingItems.length > 0 ? (
          <section id="archive" aria-labelledby="archive-heading" className="mt-12 scroll-mt-28 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Archive</p>
              <h2 id="archive-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">More photographs</h2>
            </div>

            <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
              {remainingItems.map((item) => (
                <figure
                  key={item.fileName}
                  className="mb-5 break-inside-avoid overflow-hidden rounded-4xl border border-stone-200 bg-white/90 shadow-[0_18px_60px_-50px_rgba(15,23,42,0.2)]"
                >
                  <PhotoViewer src={`/photography/${encodeURIComponent(item.fileName)}`} caption={item.caption}>
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
                  </PhotoViewer>
                  <figcaption className="border-t border-stone-200 px-5 py-4">
                    <p className="text-sm font-medium text-slate-900">{item.caption}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-stone-500">Archive</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}
        <a href="#selected-work" className="mt-8 inline-flex min-h-11 items-center py-2 text-sm font-medium text-slate-700 hover:text-slate-900">
          Back to selected work
        </a>
      </section>
    </main>
  );
}