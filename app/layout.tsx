import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://josephmusngi21.github.io"),
  title: "Joseph Musngi | Developer Portfolio",
  description: "Joseph Musngi's portfolio with projects, skills, and about information.",
  openGraph: {
    title: "Joseph Musngi | Developer Portfolio",
    description: "Joseph Musngi's portfolio with projects, skills, and about information.",
    images: ["/boy.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Musngi | Developer Portfolio",
    description: "Joseph Musngi's portfolio with projects, skills, and about information.",
    images: ["/boy.jpg"],
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
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
            <Link href="/" className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-900">
              Joseph Musngi
            </Link>
            <nav aria-label="Main navigation" className="flex items-center gap-6 text-sm text-slate-600">
              <Link href="/" className="transition-colors hover:text-slate-900">
                Home
              </Link>
              <Link href="/about" className="transition-colors hover:text-slate-900">
                About
              </Link>
              <Link href="/coding" className="transition-colors hover:text-slate-900">
                Projects
              </Link>
              <Link href="/photography" className="transition-colors hover:text-slate-900">
                Photography
              </Link>
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
                  Projects
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
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
                <a href="mailto:josephmusngi21@gmail.com" className="transition-colors hover:text-white">
                  Email
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
