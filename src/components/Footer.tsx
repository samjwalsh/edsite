import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[--color-cms-border] bg-[--color-cms-bg-elev]">
      <div className="mx-auto max-w-[var(--content-width)] px-5 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/Logo.svg" alt="CMS Logo" width={32} height={32} />
              <span className="text-sm font-semibold tracking-tight">
                Claim Management Services
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-[--color-cms-muted]">
              Professional loss assessors providing clear advice, accurate
              assessment, and confident negotiation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-tight">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-sm text-[--color-cms-muted] transition hover:text-[--color-cms-fg]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[--color-cms-muted] transition hover:text-[--color-cms-fg]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[--color-cms-muted] transition hover:text-[--color-cms-fg]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-tight">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-[--color-cms-muted]">
              <li>Email: info@cms.ie</li>
              <li>Phone: +353 1 234 5678</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[--color-cms-border] pt-8 text-center text-sm text-[--color-cms-muted]">
          <p>
            &copy; {new Date().getFullYear()} Claim Management Services. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
