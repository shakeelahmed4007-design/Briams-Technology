import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    const expectedUsername = process.env.ADMIN_USERNAME || 'admin@briams.com'
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123'

    const isValidUser = username === expectedUsername || username === 'admin'
    const isValidPass = password === expectedPassword

    if (!isValidUser || !isValidPass) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true, message: 'Logged in successfully' })
    
    // Set admin_session cookie valid for 7 days
    response.cookies.set({
      name: 'admin_session',
      value: 'authenticated',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
