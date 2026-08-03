import { NextResponse } from 'next/server'
import { updateVerificationStatus } from '../../../../lib/verification-store'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await req.json()
    const { status } = body
    const updated = await updateVerificationStatus(id, status)
    return NextResponse.json({ success: true, verification: updated })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update verification status' }, { status: 500 })
  }
}
