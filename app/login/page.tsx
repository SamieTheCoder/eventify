"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Mode = "magic" | "password";

// const siteUrl =
//   process.env.NEXT_PUBLIC_SITE_URL ??
//   (typeof window !== 'undefined' ? window.location.origin : '')

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("magic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [magicSent, setMagicSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const startCooldown = () => {
    const duration = resendCount === 0 ? 15 : 30;
    setResendCount((c) => c + 1);
    setCooldown(duration);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setMagicSent(false);
    setCooldown(0);
    setResendCount(0);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${siteUrl}/auth/callback` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setMagicSent(true);
    startCooldown();
    setLoading(false);
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${siteUrl}/auth/callback` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    startCooldown();
    setLoading(false);
  };

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/dashboard");
  };

  const handleGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${siteUrl}/auth/callback` },
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <header className="flex items-center justify-between px-6 pt-6 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[15px] font-semibold tracking-tight text-zinc-100 transition-colors hover:text-zinc-300"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Eventify
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-7">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
              Login
            </h1>
            <p className="mt-1.5 text-sm text-zinc-400">
              Welcome back to Eventify
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex rounded-xl border border-zinc-800 bg-zinc-900/60 p-1">
            {(["magic", "password"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium capitalize transition-colors ${
                  mode === m
                    ? "bg-zinc-800 text-zinc-100 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {m === "magic" ? "Magic link" : "Password"}
              </button>
            ))}
          </div>

          {/* Magic link — send */}
          {mode === "magic" && !magicSent && (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
                />
              </div>
              {error && (
                <p className="rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-400">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-zinc-100 py-3 text-sm font-bold text-zinc-900 transition-colors hover:bg-white disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send login link"}
              </button>
            </form>
          )}

          {/* Magic link — sent confirmation */}
          {mode === "magic" && magicSent && (
            <div className="space-y-4">
              <div className="rounded-xl border border-emerald-800/40 bg-emerald-950/30 px-4 py-4 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-400"
                  >
                    <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9" />
                    <polyline points="22 7 13.5 12.5 2 7" />
                    <path d="m16 19 2 2 4-4" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-emerald-300">
                  Check your inbox
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  Login link sent to{" "}
                  <span className="font-medium text-zinc-300">{email}</span>
                </p>
              </div>
              {error && (
                <p className="rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-400">
                  {error}
                </p>
              )}
              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || loading}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-700 disabled:opacity-50"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend login link"}
              </button>
              <p className="text-center text-xs text-zinc-600">
                {resendCount === 0
                  ? "Can resend after 15s"
                  : "Subsequent resends take 30s"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setMagicSent(false);
                  setError("");
                  setResendCount(0);
                  setCooldown(0);
                }}
                className="w-full text-sm text-zinc-500 hover:text-zinc-300"
              >
                ← Use a different email
              </button>
            </div>
          )}

          {/* Password login */}
          {mode === "password" && (
            <form onSubmit={handlePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
                />
              </div>
              {error && (
                <p className="rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-400">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-zinc-100 py-3 text-sm font-bold text-zinc-900 transition-colors hover:bg-white disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative flex items-center gap-3">
            <div className="flex-1 border-t border-zinc-800" />
            <span className="text-xs text-zinc-600">or continue with</span>
            <div className="flex-1 border-t border-zinc-800" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-zinc-700 bg-zinc-900 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:bg-zinc-800"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-zinc-100 underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
