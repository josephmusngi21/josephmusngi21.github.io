import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import SiteNavLink from "./components/SiteNavLink";
import { resumeHref } from "./data/resume";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "Joseph Musngi is a software developer building React Native, Next.js, and Node apps. Browse architecture breakdowns, algorithms, and engineering logs for each project.";

export const metadata: Metadata = {
  metadataBase: new URL("https://josephmusngi21.github.io"),
  title: {
    default: "Joseph Musngi | Software Developer Portfolio",
    template: "%s | Joseph Musngi",
  },
  description: siteDescription,
  openGraph: {
    title: "Joseph Musngi | Software Developer Portfolio",
    description: siteDescription,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Musngi | Software Developer Portfolio",
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const currentYear = new Date().getFullYear();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-transparent text-slate-800">
        <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/75 backdrop-blur-xl">
          <div className="mx-auto           flex w-full max-w-6xl flex-col items-start gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-4 lg:px-10">
            <Link href="/" className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-900">
              Joseph Musngi
            </Link>
                      <nav aria-label="Main navigation" className="-ml-3 flex flex-wrap items-center gap-1 text-sm text-slate-600 sm:ml-0 sm:gap-2">
              <SiteNavLink href="/" label="Home" />
              <SiteNavLink href="/about" label="About" />
              <SiteNavLink href="/coding" label="Coding" />
              <SiteNavLink href="/photography" label="Photography" />
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-10 border-t border-slate-300 bg-slate-900 text-slate-200">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 sm:px-8 lg:grid-cols-3 lg:px-10">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">Joseph Musngi</p>
              <p className="text-sm text-slate-300">Software Developer Portfolio</p>
              <p className="text-xs text-slate-400">© {currentYear} All rights reserved.</p>
            </div>

            <nav aria-label="Footer navigation" className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">Navigation</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <Link href="/about" className="transition-colors hover:text-white">
                  About
                </Link>
                <Link href="/coding" className="transition-colors hover:text-white">
                  Coding
                </Link>
                <Link href="/photography" className="transition-colors hover:text-white">
                  Photography
                </Link>
              </div>
            </nav>

            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">Connect</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <a
                  href="https://github.com/josephmusngi21"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/joseph-musngi"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
                <a href="mailto:josephmusngi7@gmail.com" className="transition-colors hover:text-white">
                  Email
                </a>
                {resumeHref ? (
                  <a href={resumeHref} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                    Resume
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
