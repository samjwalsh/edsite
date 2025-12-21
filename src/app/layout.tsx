import "@/styles/globals.css";

import { type Metadata } from "next";
import { Manrope } from "next/font/google";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const font = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Claim Management Services",
  description: "Loss Assessors",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={font.variable}>
      <body className="min-h-dvh bg-[--color-cms-bg] font-sans text-[--color-cms-fg] antialiased">
        <Navbar />
        <main className="mx-auto max-w-[var(--content-width)] pt-[var(--cms-nav-h)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
