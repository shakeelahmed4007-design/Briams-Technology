import { NextResponse } from 'next/server'
import { toggleCaseStudyPublished } from '../../../../lib/cms-store'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updated = await toggleCaseStudyPublished(id)
    return NextResponse.json({ success: true, caseStudy: updated })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update CMS item' }, { status: 500 })
  }
}
