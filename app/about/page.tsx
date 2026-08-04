import Link from "next/link";
import ProfileImage from "../components/ProfileImage";
import meImage from "./me (1).jpg";

const skills = [
  "Python",
  "JavaScript",
  "HTML",
  "CSS",
  "C#",
  "Java",
  "SQL",
  "C",
  "C++",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Responsive Design",
  "Node.js",
  "Express",
  "REST APIs",
  "Git",
  "Debugging",
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

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-10 lg:py-24">
        <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
            <ProfileImage src={meImage} alt="Joseph Musngi profile photo" />
          </div>

          <div className="max-w-xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
              About Me
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Joseph Musngi
            </h1>
            <p className="text-base leading-8 text-slate-600">
              Hi, I’m Joseph Musngi — a Computer Science graduate from the University of Arizona with a strong passion for front-end development and a growing interest in back-end engineering. I love building clean, interactive, and user-focused applications, and I’m always looking for ways to improve my skills and expand my knowledge across the full stack. I’ve completed coursework in Data Structures, Algorithms, and Full Stack Development, and I’ve built projects that reflect my interest in both design and engineering. I have solid experience with Python, JavaScript, HTML, CSS, and C#, along with foundational knowledge in Java, SQL, C, and C++. I’m comfortable working with core data structures such as Linked Lists, Trees, Arrays, Stacks, Queues, Hash Tables, and Sets, and I enjoy applying these concepts to real projects. In the future, I hope to work as a Full Stack Developer or Data Scientist, where I can combine problem-solving, creativity, and technical depth. Outside of coding, I enjoy climbing, hiking, tennis, and bowling with friends — anything that gets me moving and lets me explore new experiences.
            </p>
            <div className="inline-flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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
        </div>

        <div className="grid gap-6">
          <section className="rounded-3xl border border-stone-200 bg-white/90 p-7 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
            <h2 className="text-xl font-semibold text-slate-900">Skills</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white/90 p-7 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
            <h2 className="text-xl font-semibold text-slate-900">Interests</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full bg-gradient-to-r from-amber-100 to-rose-100 px-4 py-2 text-sm text-slate-700"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white/90 p-7 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
            <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
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

          <section className="rounded-3xl border border-stone-200 bg-gradient-to-br from-sky-50 via-white to-amber-50 p-7 text-slate-900 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)]">
            <h2 className="text-xl font-semibold">Fun Fact</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              I like staying active outside of coding, whether that means climbing, hiking, or playing a quick match of tennis.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}