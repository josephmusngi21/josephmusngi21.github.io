"use client";

import { useState } from "react";

type CodeBlockProps = {
  title: string;
  language?: string;
  code: string;
};

export default function CodeBlock({ title, language = "tsx", code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 text-slate-900 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.14)]">
      <div className="flex items-center justify-between gap-4 border-b border-stone-200 px-5 py-4">
        <div>
          <p className="text-sm font-medium text-slate-800">{title}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">{language}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-600 transition-colors hover:bg-stone-100"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-5 py-5 text-sm leading-7 text-slate-700">
        <code>{code}</code>
      </pre>
    </section>
  );
}