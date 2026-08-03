import { prisma } from '../../../lib/prisma'
import { NextResponse } from 'next/server'
import { getStoredLeads, saveStoredLead } from '../../../lib/lead-store'
import { fetchSupabaseLeads, saveSupabaseLead, isSupabaseConfigured } from '../../../lib/supabase'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET() {
  if (isSupabaseConfigured) {
    try {
      const supaLeads = await fetchSupabaseLeads()
      if (supaLeads && supaLeads.length > 0) {
        return NextResponse.json(supaLeads, { headers: corsHeaders })
      }
    } catch (e) {
      console.warn('Supabase fetch error, using local database:', e)
    }
  }

  try {
    const dbLeads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })
    if (dbLeads && dbLeads.length > 0) {
      return NextResponse.json(dbLeads, { headers: corsHeaders })
    }
  } catch (e) {
    // ignore
  }

  const stored = await getStoredLeads()
  return NextResponse.json(stored, { headers: corsHeaders })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message, company, source } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400, headers: corsHeaders })
    }

    const leadPayload = {
      name: name || 'Anonymous',
      email,
      phone: phone || null,
      message: message || null,
      company: company || null,
      source: source || 'Website',
      status: 'NEW' as const,
    }

    // 1. Save to Supabase
    try {
      await saveSupabaseLead(leadPayload)
    } catch (supaErr) {
      console.warn('Supabase lead save warning:', supaErr)
    }

    // 2. Save to local storage / Prisma
    let lead = null
    try {
      lead = await prisma.lead.create({
        data: {
          name: leadPayload.name,
          email: leadPayload.email,
          phone: leadPayload.phone,
          message: leadPayload.company ? `Company: ${leadPayload.company}\n\n${leadPayload.message || ''}` : leadPayload.message,
          source: leadPayload.source,
        }
      })
    } catch (dbError) {
      lead = await saveStoredLead(leadPayload)
    }

    return NextResponse.json({ success: true, lead }, { headers: corsHeaders })
  } catch (error) {
    console.error('Failed to process lead request:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500, headers: corsHeaders })
  }
}
