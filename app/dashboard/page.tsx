import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import CalendarConnect from './_components/CalendarConnect'
import Timer from './_components/Timer'
import SessionsList from './_components/SessionsList'
import LogoutButton from './_components/LogoutButton'

function formatTotalTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return `${totalSeconds}s`
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: tokenRow } = await supabase
    .from('google_tokens').select('id')
    .eq('user_id', user.id).maybeSingle()

  const { data: sessions } = await supabase
    .from('sessions').select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const isConnected = !!tokenRow
  const name = user.user_metadata?.full_name ?? user.user_metadata?.name ?? null
  const avatarUrl = user.user_metadata?.avatar_url ?? null
  const initials = (name ?? user.email ?? 'U').slice(0, 2).toUpperCase()
  const validAvatar = avatarUrl?.startsWith('http') ? avatarUrl : null

  const totalSessions = sessions?.length ?? 0
  const totalSeconds = sessions?.reduce((acc, s) => acc + (s.duration_seconds ?? 0), 0) ?? 0

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="text-lg font-bold tracking-tight text-zinc-100 group-hover:text-zinc-300 transition-colors">
              Eventify
            </span>
            <span className="rounded-full border border-zinc-700 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
              Beta
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {/* Avatar */}
            {validAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={validAvatar} alt="avatar" referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-zinc-700" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-xs font-bold text-zinc-100">
                {initials}
              </div>
            )}
            {name && <span className="hidden text-sm font-medium text-zinc-300 sm:block">{name}</span>}
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">

        {/* Stats bar */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-600">Sessions</p>
            <p className="mt-1 text-3xl font-bold tabular-nums text-zinc-50">{totalSessions}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-600">Time tracked</p>
            <p className="mt-1 text-3xl font-bold tabular-nums text-zinc-50">
              {totalSeconds > 0 ? formatTotalTime(totalSeconds) : '—'}
            </p>
          </div>
        </div>

        {/* Google Calendar */}
        <Suspense fallback={null}>
          <CalendarConnect isConnected={isConnected} />
        </Suspense>

        {/* Timer */}
        <div>
          <h2 className="mb-3 px-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
            New Session
          </h2>
          <Timer isCalendarConnected={isConnected} />
        </div>

        {/* Past sessions */}
        <div>
          <SessionsList sessions={sessions ?? []} />
        </div>

      </div>
    </div>
  )
}
