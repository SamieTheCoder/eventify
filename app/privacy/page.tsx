import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Eventify',
  description: 'Privacy Policy for Eventify - how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300">

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-[15px] font-bold tracking-tight text-zinc-100 transition-colors hover:text-zinc-300">
            Eventify
          </Link>
          <Link href="/" className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-300">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">

        {/* Title */}
        <div className="mb-10 border-b border-zinc-800 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            Last updated: <span className="text-zinc-400">March 6, 2026</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            This Privacy Policy describes how <strong className="text-zinc-300">Eventify</strong>{' '}
            (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares
            information about you when you use our service at{' '}
            <a href="https://eventify.samsite.in.net" className="text-zinc-300 underline underline-offset-4 hover:text-zinc-100">
              eventify.samsite.in.net
            </a>.
          </p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed">

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">1. Information We Collect</h2>
            <p className="text-zinc-400">We collect the following types of information:</p>
            <ul className="mt-3 space-y-2 text-zinc-400">
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span><strong className="text-zinc-300">Account information</strong> — your name and email address when you sign up via email/password or Google OAuth.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span><strong className="text-zinc-300">Google Calendar access</strong> — when you connect your Google Calendar, we request OAuth tokens to create calendar events on your behalf. We store these tokens securely to enable calendar event creation.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span><strong className="text-zinc-300">Session data</strong> — timer sessions you record, including title, URL, notes, start time, end time, and duration.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span><strong className="text-zinc-300">Usage data</strong> — basic usage logs to maintain and improve the service.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">2. How We Use Your Information</h2>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>To provide and operate the Eventify service.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>To create Google Calendar events on your behalf using your authorized OAuth tokens.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>To authenticate your identity and secure your account.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>To improve, maintain, and debug the service.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>We <strong className="text-zinc-300">never</strong> sell your data to third parties.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">3. Google API Services</h2>
            <p className="text-zinc-400">
              Eventify uses Google OAuth 2.0 to access Google Calendar. Our use and transfer of information
              received from Google APIs adheres to the{' '}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank" rel="noopener noreferrer"
                className="text-zinc-300 underline underline-offset-4 hover:text-zinc-100"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
            <ul className="mt-3 space-y-2 text-zinc-400">
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>We only request the <strong className="text-zinc-300">minimum required scopes</strong> — specifically the ability to create calendar events.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>We do <strong className="text-zinc-300">not</strong> read, modify, or delete existing calendar events you did not create through Eventify.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>Your Google tokens are stored securely and never shared with third parties.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>You can revoke access at any time via your{' '}
                  <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer"
                    className="text-zinc-300 underline underline-offset-4 hover:text-zinc-100">
                    Google Account permissions
                  </a>.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">4. Data Storage & Security</h2>
            <p className="text-zinc-400">
              Your data is stored securely using{' '}
              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer"
                className="text-zinc-300 underline underline-offset-4 hover:text-zinc-100">Supabase
              </a>
              , which provides PostgreSQL-based storage with row-level security. We use
              industry-standard encryption for data in transit (HTTPS/TLS) and at rest.
              Access to your data is restricted using Supabase Row Level Security (RLS)
              policies so only you can access your own sessions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">5. Data Retention & Deletion</h2>
            <p className="text-zinc-400">
              We retain your data for as long as your account is active. You may request deletion
              of your account and all associated data at any time by contacting us at the email
              below. Upon deletion, all your sessions, tokens, and account data will be permanently
              removed from our systems within 30 days.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">6. Third-Party Services</h2>
            <p className="text-zinc-400">We use the following third-party services:</p>
            <ul className="mt-3 space-y-2 text-zinc-400">
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span><strong className="text-zinc-300">Supabase</strong> — authentication and database hosting.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span><strong className="text-zinc-300">Google OAuth 2.0</strong> — calendar integration.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span><strong className="text-zinc-300">Vercel</strong> — application hosting and deployment.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">7. Cookies</h2>
            <p className="text-zinc-400">
              We use cookies and local storage only for authentication session management
              (via Supabase Auth) and user preferences (e.g., clock display mode). We do not
              use tracking or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">8. Children&apos;s Privacy</h2>
            <p className="text-zinc-400">
              Eventify is not directed at children under 13 years of age. We do not knowingly
              collect personal information from children under 13. If you believe we have
              inadvertently collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">9. Changes to This Policy</h2>
            <p className="text-zinc-400">
              We may update this Privacy Policy from time to time. We will notify you of
              significant changes by updating the date at the top of this page. Continued
              use of Eventify after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">10. Contact Us</h2>
            <p className="text-zinc-400">
              If you have questions about this Privacy Policy or want to request data deletion,
              please contact us at:
            </p>
            <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm">
              <p className="text-zinc-300 font-semibold">Md Samie Sohrab</p>
              <p className="mt-1 text-zinc-400">Developer, Eventify</p>
              <a
                href="mailto:samsite.in.net@gmail.com"
                className="mt-1 block text-zinc-300 underline underline-offset-4 hover:text-zinc-100"
              >
                samsite.in.net@gmail.com
              </a>
              <a
                href="https://github.com/SamieTheCoder"
                target="_blank" rel="noopener noreferrer"
                className="mt-1 block text-zinc-400 hover:text-zinc-200"
              >
                github.com/SamieTheCoder
              </a>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 px-6 py-6 text-center">
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Eventify · Built by Md Samie Sohrab ·{' '}
          <Link href="/terms" className="underline underline-offset-4 hover:text-zinc-400">Terms of Service</Link>
        </p>
      </footer>

    </div>
  )
}
