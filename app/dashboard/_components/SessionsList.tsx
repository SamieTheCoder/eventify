'use client'

interface Session {
  id: string
  title: string
  url: string | null
  notes: string | null
  start_time: string
  end_time: string | null
  duration_seconds: number | null
  calendar_event_id: string | null
  calendar_event_url: string | null   // ← add this
  created_at: string
}

interface Props {
  sessions: Session[]
}

function formatDuration(seconds: number | null) {
  if (!seconds) return '—'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  })
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

export default function SessionsList({ sessions }: Props) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-800 px-4 py-8 text-center">
        <p className="text-sm text-zinc-600">No sessions yet. Start your first timer!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h2 className="px-1 text-xs font-medium uppercase tracking-widest text-zinc-500">
        Past Sessions
      </h2>
      <div className="space-y-2">
        {sessions.map(session => (
          <div key={session.id} className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-zinc-100 leading-snug">{session.title}</p>
              <span className="shrink-0 rounded-full bg-zinc-800 px-2 py-0.5 font-mono text-[11px] text-zinc-400">
                {formatDuration(session.duration_seconds)}
              </span>
            </div>
            <p className="text-[11px] text-zinc-600">{formatDate(session.start_time)}</p>
            <div className="flex items-center gap-3">
              {session.url && (() => {
                try {
                  return (
                    <a href={session.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-zinc-500 transition-colors hover:text-zinc-300 truncate max-w-[200px]">
                      <LinkIcon />
                      {new URL(session.url).hostname}
                    </a>
                  )
                } catch { return null }
              })()}

              {/* ✅ Use stored htmlLink directly */}
              {session.calendar_event_url && (
                <a href={session.calendar_event_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-600 transition-colors hover:text-emerald-400">
                  <CalendarIcon />
                  View in Calendar
                </a>
              )}
            </div>
            {session.notes && (
              <p className="text-[11px] text-zinc-500 italic leading-relaxed">{session.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
