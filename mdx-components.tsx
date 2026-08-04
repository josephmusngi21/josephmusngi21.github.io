import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="text-base leading-8 text-zinc-600 dark:text-zinc-300">{children}</p>,
  ul: ({ children }) => <ul className="list-disc space-y-3 pl-5 text-zinc-600 dark:text-zinc-300">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-3 pl-5 text-zinc-600 dark:text-zinc-300">{children}</ol>,
  li: ({ children }) => <li className="leading-7">{children}</li>,
  a: ({ children, href }) => (
    <a href={href} className="font-medium text-zinc-950 underline decoration-zinc-400 underline-offset-4 dark:text-zinc-50">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-zinc-300 pl-5 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-zinc-200 dark:border-zinc-800" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}