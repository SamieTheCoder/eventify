import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

function getRedirectUri() {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/google/callback'
    : process.env.GOOGLE_REDIRECT_URI!
}

function getAppUrl() {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_APP_URL!
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/dashboard?error=no_code', getAppUrl()))
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    getRedirectUri()
  )

  try {
    const { tokens } = await oauth2Client.getToken(code)
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/login', getAppUrl()))
    }

    await supabase.from('google_tokens').upsert({
      user_id: user.id,
      access_token: tokens.access_token!,
      refresh_token: tokens.refresh_token ?? null,
      expires_at: tokens.expiry_date
        ? new Date(tokens.expiry_date).toISOString()
        : null
    }, { onConflict: 'user_id' })

    return NextResponse.redirect(new URL('/dashboard?connected=true', getAppUrl()))
  } catch (err) {
    console.error('Google callback error:', err)
    return NextResponse.redirect(new URL('/dashboard?error=oauth_failed', getAppUrl()))
  }
}
