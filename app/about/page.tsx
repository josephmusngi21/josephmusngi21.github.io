import Image from "next/image";
import Link from "next/link";
import ProfileImage from "../components/ProfileImage";
import meImage from "./me (1).jpg";

const skillGroups = [
  {
    title: "Frontend Development",
    description: "I enjoy building interfaces that feel clean, responsive, and easy to use, with attention to layout, interaction, and polish.",
    skills: ["React", "Next.js", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "Backend and Data",
    description: "I am continuing to grow the server-side part of my skill set so I can build complete products instead of only the UI layer.",
    skills: ["Node.js", "Express", "REST APIs", "SQL", "MongoDB", "AWS"],
  },
  {
    title: "Programming Foundations",
    description: "My coursework and project work gave me a solid base in problem solving, data structures, and writing code across different languages and environments.",
    skills: ["Python", "C#", "Java", "C", "C++", "Data Structures", "Algorithms"],
  },
  {
    title: "Workflow and Engineering",
    description: "I value maintainable project structure, debugging discipline, and practical iteration when turning ideas into working software.",
    skills: ["Git", "Debugging", "Testing", "Component Architecture", "Project Iteration"],
  },
];

const interests = [
  "Climbing",
  "Hiking",
  "Tennis",
  "Bowling",
  "Photography",
  "Guitar",
  "Outdoor adventures",
  "UI/UX design",
  "Full-stack projects",
  "Problem solving",
];

const contactLinks = [
  { label: "GitHub", href: "https://github.com/josephmusngi21" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/joseph-musngi" },
  { label: "Email", href: "mailto:josephmusngi7@gmail.com" },
];

const lifestylePhotos = [
  {
    src: "/about/img-1870.jpg",
    width: 4032,
    height: 3024,
    alt: "Joseph Musngi hiking outdoors",
    title: "Hiking trips",
    description: "I like getting outdoors, exploring new places, and spending time with friends on the trail.",
  },
  {
    src: "/about/img-3337.jpeg",
    width: 4032,
    height: 3024,
    alt: "Joseph Musngi hiking with friends in a red rock landscape",
    title: "More hiking",
    description: "A lot of my favorite time away from the computer is spent hiking, traveling, and finding places with great views.",
  },
  {
    src: "/about/fullsizerender.jpeg",
    width: 1366,
    height: 1860,
    alt: "Joseph Musngi playing tennis",
    title: "Tennis",
    description: "Tennis keeps me competitive, active, and focused on steady improvement.",
  },
  {
    src: "/about/img-2263.jpeg",
    width: 4284,
    height: 5712,
    alt: "Joseph Musngi at a football game",
    title: "Game days",
    description: "I enjoy being around sports, team energy, and the atmosphere of big events.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="space-y-6 rounded-4xl border border-stone-200 bg-white/90 p-8 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)] lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
              About Me
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              About me and my work.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600">
              Hi, I’m Joseph Musngi — a Software Engineering graduate from the University of Arizona with a strong passion for front-end development and a growing interest in back-end engineering. I love building clean, interactive, and user-focused applications, and I’m always looking for ways to improve my skills and expand my knowledge across the full stack.
            </p>
            <p className="max-w-3xl text-base leading-8 text-slate-600">
              I’ve completed coursework in Data Structures, Algorithms, and Full Stack Development, and I’ve built projects that reflect my interest in both design and engineering. I have solid experience with Python, JavaScript, HTML, CSS, and C#, along with foundational knowledge in Java, SQL, C, and C++. I’m comfortable working with core data structures such as Linked Lists, Trees, Arrays, Stacks, Queues, Hash Tables, and Sets, and I enjoy applying these concepts to real projects.
            </p>
            <p className="max-w-3xl text-base leading-8 text-slate-600">
              Outside of coding, I enjoy climbing, hiking, tennis, bowling, and photography. Those parts of my life keep me active, creative, and curious, which carries over into how I approach software and long-term growth.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-stone-200 bg-stone-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Focus</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">Frontend development, full-stack growth, and polished user experiences.</p>
              </div>
              <div className="rounded-3xl border border-stone-200 bg-stone-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Based In</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">Arizona, with a lot of time spent outdoors, on courts, and around creative projects.</p>
              </div>
              <div className="rounded-3xl border border-stone-200 bg-stone-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Looking Ahead</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">I want to keep growing into strong full-stack engineering roles and build products people enjoy using.</p>
              </div>
            </div>

            <div className="inline-flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="rounded-full border border-stone-200 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Back to Home
              </Link>
              <a
                href="mailto:josephmusngi7@gmail.com"
                className="rounded-full border border-stone-200 px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-stone-300 hover:bg-stone-100"
              >
                Contact Me
              </a>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-4xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
              <ProfileImage src={meImage} alt="Joseph Musngi profile photo" />
            </div>

            <div className="rounded-4xl border border-stone-200 bg-linear-to-br from-stone-50 via-white to-amber-50 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
                Outside of Coding
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                The interests that keep me balanced
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Hiking, tennis, game days, and photography all give me a different kind of energy than coding. They help me reset, stay social, and bring a wider perspective back into my work.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-4xl border border-stone-200 bg-white/90 p-7 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)] lg:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
              Photo Journal
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              A few snapshots from life outside the screen
            </h2>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {lifestylePhotos.map((photo) => (
              <figure
                key={photo.title}
                className="group mx-auto w-full max-w-90 overflow-hidden rounded-4xl border border-stone-200 bg-white/90 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.2)]"
              >
                <div className="overflow-hidden bg-stone-100 px-3 pt-3">
                  <div
                    className="relative mx-auto w-full max-w-62.5 overflow-hidden rounded-2xl"
                    style={{ aspectRatio: photo.width > photo.height ? "4 / 3" : "3 / 4" }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  </div>
                </div>
                <figcaption className="space-y-2 border-t border-stone-200 px-4 py-3">
                  <h3 className="text-base font-semibold text-slate-900">{photo.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{photo.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="grid gap-6">
          <section className="rounded-3xl border border-stone-200 bg-white/90 p-7 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold text-slate-900">Skills</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                My strengths are strongest where product thinking, interface design, and practical engineering overlap. I like shipping work that looks polished, feels intuitive, and is supported by solid technical decisions underneath.
              </p>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              {skillGroups.map((group) => (
                <article
                  key={group.title}
                  className="rounded-3xl border border-stone-200 bg-stone-50 p-5"
                >
                  <h3 className="text-base font-semibold text-slate-900">{group.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{group.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-linear-to-br from-sky-50 via-white to-amber-50 p-7 text-slate-900 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
            <h2 className="text-xl font-semibold">Fun Fact</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              I like staying active outside of coding, whether that means climbing, hiking, or playing a quick match of tennis.
            </p>
          </section>
          </div>

          <div className="grid gap-6">
            <section className="rounded-3xl border border-stone-200 bg-white/90 p-7 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
              <h2 className="text-xl font-semibold text-slate-900">Interests</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-linear-to-r from-amber-100 to-rose-100 px-4 py-2 text-sm text-slate-700"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-stone-200 bg-white/90 p-7 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
              <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
              <div className="mt-5 grid gap-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label === "Email" ? undefined : "_blank"}
                    rel={link.label === "Email" ? undefined : "noreferrer"}
                    className="group rounded-2xl border border-stone-200 bg-stone-50 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-stone-300 hover:bg-white"
                  >
                    <p className="text-sm font-medium text-stone-500">{link.label}</p>
                    <p className="mt-2 break-all text-sm text-slate-900 transition-colors group-hover:text-slate-700">
                      {link.href.replace("mailto:", "")}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}