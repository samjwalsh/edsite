import Link from "next/link";

export function Hero() {
  return (
    <section className="relative right-1/2 left-1/2 isolate -mx-[50vw] -mt-[var(--cms-nav-h)] min-h-[30svh] w-screen py-16 text-white">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,var(--color-cms-peach-1),var(--color-cms-peach-2))] opacity-60" />

      <div className="mx-auto flex max-w-[var(--content-width)] flex-col justify-center px-5 pt-[var(--cms-nav-h)]">
        <p className="text-sm font-medium tracking-wide opacity-90">
          Professional loss assessors
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Claim Management Services
        </h1>
        <p className="mt-4 max-w-2xl text-base/7 text-pretty opacity-90 sm:text-lg/8">
          Clear advice. Accurate assessment. Confident negotiation.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center border border-white/30 px-5 text-sm font-medium tracking-tight transition hover:border-white/50"
          >
            Contact
          </Link>
          <Link
            href="/services"
            className="inline-flex h-11 items-center justify-center border border-white/30 px-5 text-sm font-medium tracking-tight transition hover:border-white/50"
          >
            Services
          </Link>
        </div>
      </div>

      <div
        id="cms-hero-sentinel"
        className="absolute bottom-0 left-0 h-px w-px"
        aria-hidden
      />
    </section>
  );
}
