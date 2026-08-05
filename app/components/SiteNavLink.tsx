"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SiteNavLinkProps = {
  href: string;
  label: string;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/coding") {
    return pathname.startsWith("/coding") || pathname.startsWith("/projects");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteNavLink({ href, label }: SiteNavLinkProps) {
  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={
        isActive
          ? "rounded-full bg-slate-900 px-4 py-2 text-white"
          : "rounded-full px-4 py-2 transition-colors hover:text-slate-900"
      }
    >
      {label}
    </Link>
  );
}