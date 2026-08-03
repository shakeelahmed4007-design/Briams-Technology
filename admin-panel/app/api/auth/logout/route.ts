import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' })
  
  response.cookies.delete('admin_session')
  response.cookies.set({
    name: 'admin_session',
    value: '',
    httpOnly: true,
    path: '/',
    expires: new Date(0),
    maxAge: 0,
  })

  return response
}

export async function GET() {
  return POST()
}
