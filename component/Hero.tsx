"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const GridScan = dynamic(() => import("@/component/GridScan").then(m => m.GridScan), { ssr: false });

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0 text-emerald-500 dark:text-emerald-400"
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

export default function Hero() {
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
          scanDuration={2.5}
          scanDelay={1.5}
          scanGlow={0.7}
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

      {/* Readability overlay — dark vignette so text stays legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/30 to-zinc-950/60" />

      {/* Wordmark */}
      <header className="relative z-10 px-6 pt-5 sm:px-8">
        <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
          Eventify
        </span>
      </header>

      {/* Hero content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-16 sm:px-8">
        <div className="w-full max-w-[720px] text-center">
          {/* Badge */}
          <span className="mb-5 inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-300 shadow-sm backdrop-blur-sm">
            Beta
          </span>

          {/* Headline */}
          <h1 className="mt-0 text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-4xl md:text-5xl md:leading-[1.15]">
            Track your work.
            <br />
            Log it to Google Calendar.
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
            Start a timer, do your thing, stop it — and your session is
            automatically saved as a calendar event.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-zinc-100 px-5 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-200 sm:w-auto"
            >
              Get started
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/80 px-5 text-sm font-medium text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:bg-zinc-800 sm:w-auto"
            >
              Connect Google Calendar
            </Link>
          </div>

          {/* Feature bullets */}
          <div className="mt-10 flex flex-col items-center justify-center gap-x-6 gap-y-2.5 text-sm text-zinc-400 sm:flex-row">
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon />
              Supabase login
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon />
              Google Calendar sync
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon />
              Stop timer &rarr; event created
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
