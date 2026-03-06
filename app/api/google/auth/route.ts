import { google } from 'googleapis'
import { NextResponse } from 'next/server'

function getRedirectUri() {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/google/callback'
    : process.env.GOOGLE_REDIRECT_URI!
}

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    getRedirectUri()
  )

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/calendar.events',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })

  return NextResponse.redirect(url)
}
