import { NextResponse } from 'next/server'
import { getStoredVerifications } from '../../../lib/verification-store'

export async function GET() {
  const verifications = await getStoredVerifications()
  return NextResponse.json(verifications)
}
