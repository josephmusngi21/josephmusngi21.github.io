"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type CodingProject = {
  title: string;
  repoUrl: string;
  description: string;
  techStack: string[];
};

type GitHubProfile = {
  followers: number;
  public_repos: number;
  html_url: string;
};

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

type GitHubSummary = {
  profile: GitHubProfile;
  repos: GitHubRepo[];
};

function buildFallbackSummary(
  projects: CodingProject[],
  githubProfileUrl: string,
): GitHubSummary {
  return {
    profile: {
      followers: 0,
      public_repos: projects.length,
      html_url: githubProfileUrl,
    },
    repos: projects.slice(0, 6).map((project, index) => ({
      id: index + 1,
      name: project.title,
      html_url: project.repoUrl,
      description: project.description,
      stargazers_count: 0,
      language: project.techStack[0] ?? null,
      updated_at: new Date().toISOString(),
    })),
  };
}

type CodingGitHubSectionProps = {
  githubUsername: string;
  githubProfileUrl: string;
  projects: CodingProject[];
};

export default function CodingGitHubSection({
  githubUsername,
  githubProfileUrl,
  projects,
}: CodingGitHubSectionProps) {
  const fallbackSummary = useMemo(
    () => buildFallbackSummary(projects, githubProfileUrl),
    [projects, githubProfileUrl],
  );

  const [githubSummary, setGitHubSummary] =
    useState<GitHubSummary>(fallbackSummary);
  const [isFallbackSummary, setIsFallbackSummary] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadGitHubSummary() {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`, {
            cache: "no-store",
          }),
          fetch(
            `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6&type=owner`,
            {
              cache: "no-store",
            },
          ),
        ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          return;
        }

        const profile = (await profileResponse.json()) as GitHubProfile;
        const repos = (await reposResponse.json()) as GitHubRepo[];

        if (!isMounted) {
          return;
        }

        setGitHubSummary({ profile, repos });
        setIsFallbackSummary(false);
      } catch {
        // Keep fallback content when network requests fail.
      }
    }

    loadGitHubSummary();

    return () => {
      isMounted = false;
    };
  }, [githubUsername]);

  return (
    <section className="mt-10 rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
      <div className="border-b border-slate-200 bg-slate-900 px-6 py-5 text-white">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">GitHub Profile</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">How I code, in practice</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-200">
              My GitHub activity adds context to this portfolio and highlights the consistency behind how I write, refine, and ship code.
            </p>
          </div>
          <Link
            href={githubProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-slate-400 hover:bg-slate-800"
          >
            Visit GitHub Profile
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1">Problem-solving mindset</span>
          <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1">Consistent practice</span>
          <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1">Public work and growth</span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">Auto-updates from GitHub</span>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-900">github.com/{githubUsername}</p>
            <p className="mt-1 text-sm leading-7 text-slate-600">
              A quick look at the projects and activity that support the work showcased on this page.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Public repos</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{githubSummary.profile.public_repos}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Followers</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{githubSummary.profile.followers}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Recent repos shown</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{githubSummary.repos.length}</p>
          </div>
        </div>

        {isFallbackSummary ? (
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Live GitHub data is temporarily unavailable, so this section is showing a portfolio-based snapshot.
          </p>
        ) : null}

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {githubSummary.repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-stone-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300"
            >
              <p className="text-sm font-semibold text-slate-900">{repo.name}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                {repo.description || "No description provided yet."}
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-stone-500">
                <span>{repo.language || "Language N/A"}</span>
                <span>•</span>
                <span>{repo.stargazers_count} stars</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
