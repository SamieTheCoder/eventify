import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { google } from 'googleapis'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, url, notes, startTime, endTime, durationSeconds } = body

  // Get stored Google token
  const { data: tokenRow } = await supabase
    .from('google_tokens')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!tokenRow) {
    return NextResponse.json({ error: 'Google Calendar not connected' }, { status: 400 })
  }

  // Setup OAuth client
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
  )

  oauth2Client.setCredentials({
    access_token: tokenRow.access_token,
    refresh_token: tokenRow.refresh_token,
  })

  // Auto-refresh token if expired
  oauth2Client.on('tokens', async (tokens) => {
    if (tokens.access_token) {
      await supabase.from('google_tokens').update({
        access_token: tokens.access_token,
        expires_at: tokens.expiry_date
          ? new Date(tokens.expiry_date).toISOString()
          : null
      }).eq('user_id', user.id)
    }
  })

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

  // Build description
  const descParts = []
  if (url) descParts.push(`🔗 ${url}`)
  if (notes) descParts.push(`📝 ${notes}`)
  const mins = Math.floor(durationSeconds / 60)
  const secs = durationSeconds % 60
  descParts.push(`⏱ Duration: ${mins}m ${secs}s`)
  descParts.push(`\nLogged by Eventify`)

  // Create calendar event
  const { data: event } = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: {
      summary: title,
      description: descParts.join('\n'),
      start: { dateTime: startTime },
      end: { dateTime: endTime },
      colorId: '7', // teal/cyan
    }
  })

// ✅ Save htmlLink — the direct Google Calendar event URL
  const { data: session } = await supabase.from('sessions').insert({
    user_id: user.id,
    title,
    url: url || null,
    notes: notes || null,
    start_time: startTime,
    end_time: endTime,
    duration_seconds: durationSeconds,
    calendar_event_id: event.id,
    calendar_event_url: event.htmlLink ?? null   // ← this is the real link
  }).select().single()


  return NextResponse.json({ success: true, eventId: event.id, session })
}
