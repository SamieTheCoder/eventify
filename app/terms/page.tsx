import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — Eventify',
  description: 'Terms of Service for Eventify.',
}

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            Last updated: <span className="text-zinc-400">March 6, 2026</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Please read these Terms of Service carefully before using{' '}
            <strong className="text-zinc-300">Eventify</strong> at{' '}
            <a href="https://eventify.samsite.in.net" className="text-zinc-300 underline underline-offset-4 hover:text-zinc-100">
              eventify.samsite.in.net
            </a>.
            By accessing or using Eventify, you agree to be bound by these terms.
          </p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed">

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">1. Acceptance of Terms</h2>
            <p className="text-zinc-400">
              By creating an account or using Eventify, you agree to these Terms of Service
              and our Privacy Policy. If you do not agree, please do not use the service.
              These terms apply to all users of the service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">2. Description of Service</h2>
            <p className="text-zinc-400">
              Eventify is a productivity tool that allows users to:
            </p>
            <ul className="mt-3 space-y-2 text-zinc-400">
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>Start and stop work session timers.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>Log sessions automatically as Google Calendar events.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>View and manage past sessions from a personal dashboard.</span>
              </li>
            </ul>
            <p className="mt-3 text-zinc-400">
              The service is currently in <strong className="text-zinc-300">Beta</strong> and
              provided free of charge. Features may change or be discontinued at any time.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">3. User Accounts</h2>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>You must provide accurate and complete information when creating an account.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>You are responsible for maintaining the confidentiality of your account credentials.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>You must be at least 13 years old to use Eventify.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-emerald-500">•</span>
                <span>You are responsible for all activity that occurs under your account.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">4. Google Calendar Integration</h2>
            <p className="text-zinc-400">
              When you connect Google Calendar, you authorize Eventify to create calendar events
              on your behalf. You can revoke this access at any time through your{' '}
              <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer"
                className="text-zinc-300 underline underline-offset-4 hover:text-zinc-100">
                Google Account permissions
              </a>.
              Eventify is not affiliated with or endorsed by Google LLC.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">5. Acceptable Use</h2>
            <p className="text-zinc-400">You agree not to:</p>
            <ul className="mt-3 space-y-2 text-zinc-400">
              <li className="flex gap-2">
                <span className="mt-0.5 text-red-500">•</span>
                <span>Use the service for any unlawful purpose or in violation of any regulations.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-red-500">•</span>
                <span>Attempt to gain unauthorized access to the service, servers, or databases.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-red-500">•</span>
                <span>Reverse engineer, decompile, or attempt to extract the source code of the service.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-red-500">•</span>
                <span>Use automated scripts or bots to abuse the service or its APIs.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-red-500">•</span>
                <span>Interfere with the proper functioning of the service or other users&apos; access.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">6. Intellectual Property</h2>
            <p className="text-zinc-400">
              Eventify and its original content, features, and functionality are owned by
              <strong className="text-zinc-300"> Md Samie Sohrab</strong> and are protected by
              applicable intellectual property laws. You may not copy, modify, distribute, or
              create derivative works based on the service without explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">7. Your Content</h2>
            <p className="text-zinc-400">
              You retain ownership of any content you submit to Eventify (session titles, notes, URLs).
              By submitting content, you grant us a limited license to store and display it
              solely for the purpose of providing the service to you. We do not claim ownership
              of your data.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">8. Disclaimers</h2>
            <p className="text-zinc-400">
              Eventify is provided <strong className="text-zinc-300">&quot;as is&quot;</strong> and{' '}
              <strong className="text-zinc-300">&quot;as available&quot;</strong> without warranties
              of any kind, either express or implied. We do not warrant that the service will be
              uninterrupted, error-free, or completely secure. Use the service at your own risk.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">9. Limitation of Liability</h2>
            <p className="text-zinc-400">
              To the maximum extent permitted by law, Eventify and its developer shall not be
              liable for any indirect, incidental, special, consequential, or punitive damages,
              including but not limited to loss of data, loss of profits, or business interruption,
              arising from your use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">10. Termination</h2>
            <p className="text-zinc-400">
              We reserve the right to suspend or terminate your account at any time for violation
              of these terms, without prior notice. You may also delete your account at any time
              by contacting us. Upon termination, your data will be deleted per our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">11. Changes to Terms</h2>
            <p className="text-zinc-400">
              We may modify these Terms of Service at any time. We will notify you by updating
              the date at the top of this page. Your continued use of Eventify after changes
              are posted constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">12. Governing Law</h2>
            <p className="text-zinc-400">
              These Terms shall be governed by and construed in accordance with the laws of
              <strong className="text-zinc-300"> India</strong>. Any disputes arising from
              these terms or your use of Eventify shall be subject to the exclusive jurisdiction
              of the courts of India.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-100">13. Contact</h2>
            <p className="text-zinc-400">
              For questions about these Terms, contact:
            </p>
            <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm">
              <p className="font-semibold text-zinc-300">Md Samie Sohrab</p>
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
          <Link href="/privacy" className="underline underline-offset-4 hover:text-zinc-400">Privacy Policy</Link>
        </p>
      </footer>

    </div>
  )
}
