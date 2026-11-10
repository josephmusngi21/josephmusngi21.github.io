"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

type PhotoViewerProps = {
  src: string;
  caption: string;
  children: ReactNode;
};

export default function PhotoViewer({ src, caption, children }: PhotoViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <a
        href={src}
        aria-label={`Open full image: ${caption}`}
        aria-haspopup="dialog"
        onClick={(event) => {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          setImageError(false);
          setOpen(true);
          dialogRef.current?.showModal();
        }}
        className="relative block cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-slate-900"
      >
        {children}
        <span className="absolute bottom-3 right-3 rounded-full bg-slate-900/80 px-3 py-2 text-xs font-medium text-white">
          View full image
        </span>
      </a>
      <dialog
        ref={dialogRef}
        aria-label={caption}
        onClose={() => setOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-slate-950 p-0 text-white backdrop:bg-slate-950/90"
      >
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/15 p-4 sm:px-6">
            <p className="max-w-2xl text-sm leading-6">{caption}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={src}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-4 py-2 text-sm hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Open original
              </a>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="min-h-11 rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 hover:bg-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Close
              </button>
            </div>
          </div>
          <div className="relative min-h-0 flex-1">
            {open && !imageError ? (
              <Image
                src={src}
                alt={caption}
                fill
                unoptimized
                sizes="100vw"
                className="object-contain"
                onError={() => setImageError(true)}
              />
            ) : null}
            {imageError ? (
              <p role="alert" className="p-6 text-center">
                The image could not be loaded. Try opening the original file above.
              </p>
            ) : null}
          </div>
          <p className="shrink-0 p-4 text-center text-xs leading-5 text-slate-300">
            Full frame, original file. Open original to zoom in your browser.
          </p>
        </div>
      </dialog>
    </>
  );
}
