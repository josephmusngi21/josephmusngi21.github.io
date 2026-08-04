import Link from "next/link";
import ProjectCard from "@/app/components/ProjectCard";
import codingProjects from "@/app/data/coding-projects.json";

const githubUsername = "josephmusngi21";
const githubProfileUrl = `https://github.com/${githubUsername}`;

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

async function getGitHubSummary() {
  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${githubUsername}`, {
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6&type=owner`,
        {
          next: { revalidate: 3600 },
        },
      ),
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      return null;
    }

    const profile = (await profileResponse.json()) as GitHubProfile;
    const repos = (await reposResponse.json()) as GitHubRepo[];

    return {
      profile,
      repos,
    };
  } catch {
    return null;
  }
}

export default async function CodingPortfolioPage() {
  const githubSummary = await getGitHubSummary();

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
            Coding Portfolio
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Selected apps, prototypes, and embedded projects.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            These are the projects you shared, grouped into a clean coding section with dedicated detail pages so each one can stand on its own.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full border border-stone-200 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800">
            Back home
          </Link>
          <Link href={githubProfileUrl} target="_blank" rel="noreferrer" className="rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-stone-300 hover:bg-white">
            View GitHub
          </Link>
        </div>

        <section className="mt-10 rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">GitHub</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Live profile snapshot</h2>
            </div>
            <Link href={githubProfileUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline">
              github.com/{githubUsername}
            </Link>
          </div>

          {githubSummary ? (
            <>
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
            </>
          ) : (
            <p className="mt-6 text-sm leading-7 text-slate-600">
              GitHub data is temporarily unavailable right now, but the profile link above still works.
            </p>
          )}
        </section>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {codingProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} hrefBase="/coding" />
          ))}
        </div>
      </section>
    </main>
  );
}