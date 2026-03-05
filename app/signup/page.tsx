"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

function CheckCircleIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className="text-emerald-500"
    >
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.2"
      />
      <path
        d="M16 24l5.333 5.333L32 18.667"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type AuthMode = "password" | "otp" | "magic-link";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");

export default function SignupPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function switchMode(next: AuthMode) {
    setMode(next);
    setError("");
    setOtpSent(false);
    setOtpToken("");
    setMagicLinkSent(false);
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: siteUrl + "/auth/callback",
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setOtpSent(true);
    setLoading(false);
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otpToken,
      type: "email",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  async function handleSendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: siteUrl + "/auth/callback",
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMagicLinkSent(true);
    setLoading(false);
  }

  async function handleGoogleSignup() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: siteUrl + "/auth/callback",
      },
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      {/* Wordmark */}
      <header className="px-6 pt-5 sm:px-8">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight text-zinc-100"
        >
          Eventify
        </Link>
      </header>

      {/* Centered card */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-sm border-zinc-800 bg-zinc-900 shadow-xl">
          {success ? (
            /* ── Success state (password signup only) ── */
            <CardContent className="py-10 text-center">
              <div className="flex justify-center">
                <CheckCircleIcon />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-zinc-50">
                Check your email
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                We sent a confirmation link to{" "}
                <span className="font-medium text-zinc-300">{email}</span>.
                <br />
                Click it to activate your account.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-block text-sm font-medium text-zinc-100 underline-offset-4 hover:underline"
              >
                Back to sign in
              </Link>
            </CardContent>
          ) : (
            /* ── Sign-up form ── */
            <>
              <CardHeader>
                <CardTitle className="text-xl text-zinc-50">
                  Create account
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Start tracking your work
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Mode toggle */}
                <div className="mb-4 flex rounded-lg border border-zinc-800 bg-zinc-950 p-1">
                  <button
                    type="button"
                    onClick={() => switchMode("password")}
                    className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      mode === "password"
                        ? "bg-zinc-800 text-zinc-100 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Password
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode("otp")}
                    className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      mode === "otp"
                        ? "bg-zinc-800 text-zinc-100 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Email code
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode("magic-link")}
                    className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      mode === "magic-link"
                        ? "bg-zinc-800 text-zinc-100 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Magic link
                  </button>
                </div>

                {mode === "password" ? (
                  /* ── Password form ── */
                  <form onSubmit={handlePasswordSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-zinc-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-zinc-700 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="password" className="text-zinc-300">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-zinc-700 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password" className="text-zinc-300">
                        Confirm password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border-zinc-700 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-400">{error}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-11 w-full rounded-lg bg-zinc-100 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-200 disabled:opacity-50"
                    >
                      {loading ? "Creating account…" : "Create account"}
                    </Button>
                  </form>
                ) : mode === "otp" ? (
                  !otpSent ? (
                  /* ── OTP step 1: enter email ── */
                  <form onSubmit={handleSendOtp} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="otp-email" className="text-zinc-300">
                        Email
                      </Label>
                      <Input
                        id="otp-email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-zinc-700 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-400">{error}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-11 w-full rounded-lg bg-zinc-100 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-200 disabled:opacity-50"
                    >
                      {loading ? "Sending code…" : "Send code"}
                    </Button>
                  </form>
                ) : (
                  /* ── OTP step 2: enter code ── */
                  <form onSubmit={handleVerifyOtp} className="grid gap-4">
                    <p className="text-sm text-zinc-400">
                      We sent a 6-digit code to{" "}
                      <span className="font-medium text-zinc-300">{email}</span>
                    </p>

                    <div className="grid gap-2">
                      <Label htmlFor="otp-token" className="text-zinc-300">
                        Verification code
                      </Label>
                      <Input
                        id="otp-token"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        placeholder="000000"
                        required
                        maxLength={6}
                        value={otpToken}
                        onChange={(e) =>
                          setOtpToken(e.target.value.replace(/\D/g, ""))
                        }
                        className="border-zinc-700 bg-zinc-900 text-center text-lg tracking-[0.3em] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-400">{error}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={loading || otpToken.length < 6}
                      className="h-11 w-full rounded-lg bg-zinc-100 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-200 disabled:opacity-50"
                    >
                      {loading ? "Verifying…" : "Verify & create account"}
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtpToken("");
                        setError("");
                      }}
                      className="text-sm text-zinc-500 hover:text-zinc-300"
                    >
                      Use a different email
                    </button>
                  </form>
                )
                ) : !magicLinkSent ? (
                  /* ── Magic link: enter email ── */
                  <form onSubmit={handleSendMagicLink} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="ml-email" className="text-zinc-300">
                        Email
                      </Label>
                      <Input
                        id="ml-email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-zinc-700 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-400">{error}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-11 w-full rounded-lg bg-zinc-100 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-200 disabled:opacity-50"
                    >
                      {loading ? "Sending link…" : "Send magic link"}
                    </Button>
                  </form>
                ) : (
                  /* ── Magic link: sent confirmation ── */
                  <div className="grid gap-3 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-emerald-500"
                      >
                        <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9" />
                        <polyline points="22 7 13.5 12.5 2 7" />
                        <path d="m16 19 2 2 4-4" />
                      </svg>
                    </div>
                    <p className="text-sm text-zinc-400">
                      We sent a sign-up link to{" "}
                      <span className="font-medium text-zinc-300">{email}</span>.
                      <br />
                      Click it to create your account — no password needed.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setMagicLinkSent(false);
                        setError("");
                      }}
                      className="text-sm text-zinc-500 hover:text-zinc-300"
                    >
                      Use a different email
                    </button>
                  </div>
                )}

                {/* Separator */}
                <div className="relative my-6 flex items-center">
                  <Separator className="flex-1 bg-zinc-800" />
                  <span className="mx-3 text-xs text-zinc-500">
                    or continue with
                  </span>
                  <Separator className="flex-1 bg-zinc-800" />
                </div>

                {/* Google OAuth */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignup}
                  className="h-11 w-full rounded-lg border-zinc-700 bg-zinc-800/80 text-sm font-medium text-zinc-300 shadow-sm backdrop-blur-sm hover:bg-zinc-800"
                >
                  <GoogleIcon />
                  Continue with Google
                </Button>
              </CardContent>

              <CardFooter className="justify-center">
                <p className="text-sm text-zinc-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-zinc-100 underline-offset-4 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </>
          )}
        </Card>
      </main>
    </div>
  );
}
