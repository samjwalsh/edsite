"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isOverHero, setIsOverHero] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("cms-hero-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOverHero(entry?.isIntersecting ?? false);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shellClass = hasScrolled
    ? `bg-[--color-cms-bg-elev] backdrop-blur supports-[backdrop-filter]:backdrop-blur border-b border-[--color-cms-border] ${isOverHero ? "text-white" : "text-[--color-cms-fg]"}`
    : "bg-transparent text-white";

  const linkClass =
    "text-sm font-medium tracking-tight opacity-95 transition hover:opacity-75 hover:border-b-2";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[var(--cms-nav-h)] transition-colors ${shellClass} `}
    >
      <div className="mx-auto flex h-full max-w-[var(--content-width)] items-center justify-between px-5">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <Image src="/Logo.svg" alt="CMS Logo" width={32} height={32} />
          Claim Management Services
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          <Link href="/services" className={linkClass}>
            Services
          </Link>
          <Link href="/about" className={linkClass}>
            About
          </Link>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
