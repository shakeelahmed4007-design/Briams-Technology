import { NextResponse } from 'next/server'
import { getStoredCaseStudies, addCaseStudy } from '../../../lib/cms-store'

export async function GET() {
  const cases = await getStoredCaseStudies()
  return NextResponse.json(cases)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, category } = body
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }
    const created = await addCaseStudy(title, category || 'General Tech')
    return NextResponse.json({ success: true, caseStudy: created })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 })
  }
}
