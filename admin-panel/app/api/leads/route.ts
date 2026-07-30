import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// CORS Headers for cross-origin requests from Vite frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allows all domains, or specify frontend domain
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS(request: Request) {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message, company, source } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400, headers: corsHeaders })
    }

    const lead = await prisma.lead.create({
      data: {
        name: name || 'Anonymous',
        email,
        phone,
        message: message ? (company ? `Company: ${company}\n\n${message}` : message) : null,
        source: source || 'Website',
      }
    })

    return NextResponse.json({ success: true, lead }, { headers: corsHeaders })
  } catch (error) {
    console.error('Failed to create lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders })
  }
}
