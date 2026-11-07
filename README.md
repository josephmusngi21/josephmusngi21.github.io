# Joseph Musngi — Portfolio

Live site: https://josephmusngi21.github.io

A static portfolio built with Next.js (App Router, `output: "export"`), TypeScript, and Tailwind CSS.

## What's on the site

- **Coding**: 17 projects with overviews, highlights, and code samples.
- **Technical breakdown** (`/coding/technical`): expandable per-project write-ups with SVG architecture diagrams, deep dives into the algorithms, and an engineering log reconstructed from commit history.
- **About** and **Photography**: background, skills, and an Arizona film gallery.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export to ./out
```

## Structure

- `app/data/coding-projects.json`: single source of truth for every project (overview, deep dive, architecture nodes/edges, engineering log).
- `app/data/featured.ts`: slugs shown as featured on the home and coding pages.
- `app/components/ArchitectureDiagram.tsx`: renders the layered SVG diagram from the project's nodes and edges.
- `public/resume.pdf`: optional; when present, a Resume link appears on the home page and footer.

## Notes

Photos in `public/` are pre-resized (max 1800px, JPEG) because the static export uses unoptimized images.
