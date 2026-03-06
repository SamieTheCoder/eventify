"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import TextType from "@/component/TextType";

const GridScan = dynamic(
  () => import("@/component/GridScan").then((m) => m.GridScan),
  { ssr: false },
);

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0 text-emerald-500"
    >
      <path
        d="M13.333 4L6 11.333 2.667 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/SamieTheCoder",
    icon: <GithubIcon />,
    title: "SamieTheCoder",
    isImage: false,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/scientific_samie/",
    icon: <InstagramIcon />,
    title: "@scientific_samie",
    isImage: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-samie-sohrab",
    icon: <LinkedInIcon />,
    title: "Md Samie Sohrab",
    isImage: false,
  },
  {
    label: "Buy Me a Coffee",
    href: "https://www.buymeacoffee.com/SamieTheCoder",
    icon: null,
    title: "Buy me a coffee",
    isImage: true,
  },
];

interface HeroProps {
  isLoggedIn?: boolean;
}

export default function Hero({ isLoggedIn = false }: HeroProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950">
      {/* GridScan background */}
      <div className="pointer-events-none absolute inset-0">
        <GridScan
          linesColor="#ffffff"
          scanColor="#8dffff"
          scanOpacity={0.7}
          gridScale={0.12}
          lineThickness={1.2}
          lineStyle="solid"
          lineJitter={0.08}
          scanDirection="pingpong"
          scanDuration={5}
          scanDelay={1.5}
          scanGlow={0.6}
          scanSoftness={2.5}
          scanPhaseTaper={0.85}
          enablePost
          bloomIntensity={0.5}
          bloomThreshold={0.1}
          bloomSmoothing={0.4}
          chromaticAberration={0.0015}
          noiseIntensity={0.012}
          sensitivity={0.45}
        />
      </div>

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/20 to-zinc-950/80" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-5 sm:px-10">
        <span className="text-[15px] font-bold tracking-tight text-zinc-100">
          Eventify
        </span>
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-zinc-400 transition-colors hover:text-zinc-100"
            >
              Dashboard →
            </Link>
          )}
        </div>
      </header>

      {/* Hero content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-16 sm:px-8">
        <div className="w-full max-w-[760px] text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/70 px-3.5 py-1.5 text-xs font-medium text-zinc-400 shadow-sm backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            Now in Beta
          </div>

          {/* Headline — static part */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-5xl md:text-6xl md:leading-[1.1]">
            Stop forgetting
            <br />
            <span className="text-zinc-400">what you worked on.</span>
          </h1>

          {/* TextType animated subheadline */}
          <div className="mt-5 flex items-center justify-center">
            <TextType
              text={[
                "Start a timer. Do your thing.",
                "Stop it. Event created automatically.",
                "Your work, logged to Google Calendar.",
                "No more forgotten sessions.",
              ]}
              typingSpeed={55}
              deletingSpeed={30}
              pauseDuration={2000}
              loop={true}
              showCursor={true}
              cursorCharacter="_"
              cursorClassName="text-emerald-400"
              className="text-base font-medium text-zinc-400 sm:text-lg"
            />
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-zinc-100 px-7 text-sm font-bold text-zinc-900 shadow-sm transition-all hover:bg-white hover:shadow-lg sm:w-auto"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-7 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-all hover:bg-zinc-800 sm:w-auto"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Connect Calendar
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-zinc-100 px-7 text-sm font-bold text-zinc-900 shadow-sm transition-all hover:bg-white hover:shadow-lg sm:w-auto"
                >
                  Get started free
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/80 px-7 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-all hover:bg-zinc-800 sm:w-auto"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Feature bullets */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-zinc-500">
            {[
              "Supabase auth",
              "Google Calendar sync",
              "Stop timer → event created",
            ].map((feat) => (
              <span key={feat} className="inline-flex items-center gap-1.5">
                <CheckIcon />
                {feat}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Footer — socials */}
      <footer className="relative z-10 px-6 pb-6 sm:px-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Made by */}
          <p className="text-xs text-zinc-600">
            Built by{" "}
            <a
              href="https://github.com/SamieTheCoder"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-400 transition-colors hover:text-zinc-200"
            >
              Md Samie Sohrab
            </a>
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-1">
            {socials.map((s) =>
              s.isImage ? (
                // Official Buy Me a Coffee button
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.title}
                  className="transition-opacity hover:opacity-80"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=SamieTheCoder&button_colour=52525c&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00"
                    alt="Buy Me A Coffee"
                    style={{ height: "32px", borderRadius: "6px" }}
                  />
                </a>
              ) : (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.title}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-800/60 hover:text-zinc-300"
                >
                  {s.icon}
                </a>
              ),
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
