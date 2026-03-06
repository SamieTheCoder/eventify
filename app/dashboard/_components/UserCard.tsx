'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Props {
  email: string
  name: string | null
  avatarUrl: string | null
}

export default function UserCard({ email, name, avatarUrl }: Props) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const initials = (name ?? email).slice(0, 2).toUpperCase()

  // Validate avatar URL before using it
  const validAvatar = avatarUrl && avatarUrl.startsWith('http') ? avatarUrl : null

  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
      <div className="flex items-center gap-3">
        {validAvatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={validAvatar}
            alt="avatar"
            referrerPolicy="no-referrer"       // ← important for Google avatars
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-700 text-sm font-semibold text-zinc-100">
            {initials}
          </div>
        )}
        <div>
          {name && <p className="text-sm font-medium text-zinc-100">{name}</p>}
          <p className="text-xs text-zinc-400">{email}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
      >
        Log out
      </button>
    </div>
  )
}
