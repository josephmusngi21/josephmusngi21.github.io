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
  title: "Joseph Musngi | Developer Portfolio",
  description: "Joseph Musngi's portfolio with projects, skills, and about information.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
              <Link href="/projects" className="transition-colors hover:text-slate-900">
                Projects
              </Link>
              <Link href="/coding" className="transition-colors hover:text-slate-900">
                Coding
              </Link>
              <Link href="/photography" className="transition-colors hover:text-slate-900">
                Photography
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
