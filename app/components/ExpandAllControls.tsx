"use client";

const buttonClass =
  "rounded-full border border-stone-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-stone-300 hover:bg-white";

function toggleAll(open: boolean) {
  window.dispatchEvent(new CustomEvent("technical:toggle-all", { detail: open }));
}

export default function ExpandAllControls() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={() => toggleAll(true)} className={buttonClass}>
        Expand all
      </button>
      <button type="button" onClick={() => toggleAll(false)} className={buttonClass}>
        Collapse all
      </button>
    </div>
  );
}
