import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (req.method !== 'POST') return res.status(405).end()
  try {
    await prisma.verificationRequest.update({ where: { id: String(id) }, data: { status: 'APPROVED' } })
    return res.redirect('/admin/verifications')
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Failed' })
  }
}
