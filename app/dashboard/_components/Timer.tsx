'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import FlipClock from './FlipClock'

interface Props {
  isCalendarConnected: boolean
}

interface TimerState {
  running: boolean
  startTime: string
  title: string
  url: string
  notes: string
}

const STORAGE_KEY = 'eventify_timer'
const CLOCK_MODE_KEY = 'eventify_clock_mode'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

function saveToStorage(state: TimerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY)
}

function loadFromStorage(): TimerState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as TimerState
  } catch {
    return null
  }
}

export default function Timer({ isCalendarConnected }: Props) {
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [hydrated, setHydrated] = useState(false)
  const [flipMode, setFlipMode] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  // On mount — restore from localStorage
  useEffect(() => {
    const saved = loadFromStorage()
    if (saved?.running && saved.startTime) {
      const start = new Date(saved.startTime)
      const secondsElapsed = Math.floor((Date.now() - start.getTime()) / 1000)
      setStartTime(start)
      setElapsed(secondsElapsed)
      setTitle(saved.title)
      setUrl(saved.url)
      setNotes(saved.notes)
      setRunning(true)
    } else if (saved && !saved.running && saved.startTime) {
      setTitle(saved.title)
      setUrl(saved.url)
      setNotes(saved.notes)
      const start = new Date(saved.startTime)
      setStartTime(start)
      setElapsed(Math.floor((Date.now() - start.getTime()) / 1000))
    }
    const savedMode = localStorage.getItem(CLOCK_MODE_KEY)
    if (savedMode === 'flip') setFlipMode(true)
    setHydrated(true)
  }, [])

  // Interval — always derived from real startTime, not prev+1
  useEffect(() => {
    if (!hydrated) return
    if (running && startTime) {
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000))
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, hydrated, startTime])

  const toggleClockMode = () => {
    const next = !flipMode
    setFlipMode(next)
    localStorage.setItem(CLOCK_MODE_KEY, next ? 'flip' : 'normal')
  }

  const handleStart = () => {
    if (!title.trim()) {
      setError('Please enter what you are working on.')
      return
    }
    setError('')
    setSuccess(false)
    const now = new Date()
    setStartTime(now)
    setElapsed(0)
    setRunning(true)
    saveToStorage({
      running: true,
      startTime: now.toISOString(),
      title: title.trim(),
      url: url.trim(),
      notes: notes.trim()
    })
  }

  const handleStop = async () => {
    setRunning(false)
    if (!startTime) return

    saveToStorage({
      running: false,
      startTime: startTime.toISOString(),
      title,
      url,
      notes
    })

    const endTime = new Date()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          url: url.trim() || null,
          notes: notes.trim() || null,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          durationSeconds: elapsed
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Failed to log event.')
      } else {
        clearStorage()
        setSuccess(true)
        setTitle('')
        setUrl('')
        setNotes('')
        setElapsed(0)
        setStartTime(null)
        router.refresh()
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    clearStorage()
    setRunning(false)
    setElapsed(0)
    setStartTime(null)
    setSuccess(false)
    setError('')
    setTitle('')
    setUrl('')
    setNotes('')
  }

  // Prevent hydration mismatch
  if (!hydrated) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-5">
        <div className="flex items-center justify-center py-8">
          <span className="font-mono text-5xl font-semibold tabular-nums tracking-tight text-zinc-700">
            00:00:00
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-5 space-y-4">

      {/* Restored session banner */}
      {running && elapsed > 5 && (
        <div className="rounded-lg border border-blue-900/50 bg-blue-950/30 px-3 py-2 text-xs text-blue-400">
          ⟳ Session restored — timer is still running
        </div>
      )}

      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">
          What are you working on? <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={e => {
            setTitle(e.target.value)
            if (running) saveToStorage({
              running: true,
              startTime: startTime!.toISOString(),
              title: e.target.value, url, notes
            })
          }}
          disabled={running}
          placeholder="e.g. Building the timer feature"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none disabled:opacity-50"
        />
      </div>

      {/* URL */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">URL (optional)</label>
        <input
          type="url"
          value={url}
          onChange={e => {
            setUrl(e.target.value)
            if (running) saveToStorage({
              running: true,
              startTime: startTime!.toISOString(),
              title, url: e.target.value, notes
            })
          }}
          disabled={running}
          placeholder="https://github.com/..."
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none disabled:opacity-50"
        />
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={e => {
            setNotes(e.target.value)
            if (running) saveToStorage({
              running: true,
              startTime: startTime!.toISOString(),
              title, url, notes: e.target.value
            })
          }}
          disabled={running}
          rows={2}
          placeholder="Any extra context..."
          className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none disabled:opacity-50"
        />
      </div>

      {/* Clock display + toggle */}
      <div className="relative">
        <button
          onClick={toggleClockMode}
          className="absolute right-0 top-0 z-10 rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
        >
          {flipMode ? '⌚ Simple' : '🎰 Flip'}
        </button>

        {flipMode ? (
          <FlipClock seconds={elapsed} running={running} />
        ) : (
          <div className="flex items-center justify-center py-4">
            <span className={`font-mono text-5xl font-semibold tabular-nums tracking-tight transition-colors ${
              running ? 'text-zinc-50' : elapsed > 0 ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              {formatTime(elapsed)}
            </span>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2 text-xs text-red-400">
          {error}
        </p>
      )}

      {/* Success */}
      {success && (
        <p className="rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-3 py-2 text-xs text-emerald-400">
          ✓ Session logged to Google Calendar!
        </p>
      )}

      {/* Calendar not connected warning */}
      {!isCalendarConnected && (
        <p className="rounded-lg border border-yellow-900/50 bg-yellow-950/30 px-3 py-2 text-xs text-yellow-400">
          ⚠ Connect Google Calendar above to log events automatically.
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-2">
        {!running ? (
          <button
            onClick={elapsed > 0 ? handleStop : handleStart}
            disabled={loading}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${
              elapsed > 0
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
            }`}
          >
            {loading
              ? 'Logging...'
              : elapsed > 0
                ? '⏹ Stop & Log to Calendar'
                : '▶ Start Session'}
          </button>
        ) : (
          <button
            onClick={handleStop}
            disabled={loading}
            className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Logging...' : '⏹ Stop & Log to Calendar'}
          </button>
        )}
        {elapsed > 0 && (
          <button
            onClick={handleReset}
            disabled={loading}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-700 disabled:opacity-50"
          >
            Reset
          </button>
        )}
      </div>

    </div>
  )
}
