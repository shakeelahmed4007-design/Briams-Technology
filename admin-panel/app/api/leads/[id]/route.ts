import { NextResponse } from 'next/server'
import { updateStoredLeadStatus, deleteStoredLead } from '../../../../lib/lead-store'
import { prisma } from '../../../../lib/prisma'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await req.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400, headers: corsHeaders })
    }

    try {
      await prisma.lead.update({
        where: { id },
        data: { status }
      })
    } catch (e) {
      // Prisma error fallback
    }

    const updated = await updateStoredLeadStatus(id, status)
    return NextResponse.json({ success: true, lead: updated }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500, headers: corsHeaders })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    try {
      await prisma.lead.delete({ where: { id } })
    } catch (e) {
      // ignore
    }
    const success = await deleteStoredLead(id)
    return NextResponse.json({ success }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500, headers: corsHeaders })
  }
}
