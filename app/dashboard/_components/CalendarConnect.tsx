'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  isConnected: boolean
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

export default function CalendarConnect({ isConnected: initial }: Props) {
  const [connected, setConnected] = useState(initial)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('connected') === 'true') {
      setConnected(true)
      router.replace('/dashboard')
    }
  }, [searchParams, router])

  const handleConnect = () => {
    setLoading(true)
    window.location.href = '/api/google/auth'
  }

  const handleDisconnect = async () => {
    setLoading(true)
    await fetch('/api/google/disconnect', { method: 'POST' })
    setConnected(false)
    setLoading(false)
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-full ${connected ? 'bg-emerald-500/15 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
            <CalendarIcon />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-100">Google Calendar</p>
            <p className={`text-xs ${connected ? 'text-emerald-400' : 'text-zinc-500'}`}>
              {connected ? '✓ Connected' : 'Not connected'}
            </p>
          </div>
        </div>

        {connected ? (
          <button
            onClick={handleDisconnect}
            disabled={loading}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-red-800 hover:bg-red-950/40 hover:text-red-400 disabled:opacity-50"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={handleConnect}
            disabled={loading}
            className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? 'Connecting...' : 'Connect'}
          </button>
        )}
      </div>
    </div>
  )
}
