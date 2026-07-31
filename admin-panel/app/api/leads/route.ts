import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { saveStoredLead } from '../../../lib/lead-store'
import { saveSupabaseLead } from '../../../lib/supabase'

const prisma = new PrismaClient()

// CORS Headers for cross-origin requests from Vite frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
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
      message: message ? (company ? `Company: ${company}\n\n${message}` : message) : message || null,
      company: company || null,
      source: source || 'Website',
      status: 'NEW',
    }

    // 1. Try saving to Supabase
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
          message: leadPayload.message,
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
