import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message, company, source } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
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

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Failed to create lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
