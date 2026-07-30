import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (req.method !== 'POST') return res.status(405).end()
  const { status } = req.body
  try {
    await prisma.lead.update({ where: { id: String(id) }, data: { status } })
    return res.redirect('/admin/leads')
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Failed' })
  }
}
