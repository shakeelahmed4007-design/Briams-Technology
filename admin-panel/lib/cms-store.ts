import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'

export type CaseStudyRecord = {
  id: string
  title: string
  category: string
  published: boolean
  createdAt: string
}

const dataDir = process.env.VERCEL ? path.join(os.tmpdir(), 'data') : path.join(process.cwd(), 'data')
const storeFile = path.join(dataDir, 'cms.json')

let memoryCaseStudies: CaseStudyRecord[] | null = null

const initialSeed: CaseStudyRecord[] = [
  { id: '1', title: 'CureVirtual Telehealth Platform Scaling', category: 'Healthcare Tech', published: true, createdAt: new Date(Date.now() - 3600000 * 48).toISOString() },
  { id: '2', title: 'Enterprise Banking Core System Migration', category: 'Fintech', published: true, createdAt: new Date(Date.now() - 3600000 * 96).toISOString() },
  { id: '3', title: 'AI-Powered Logistics Dispatch Engine', category: 'Logistics & AI', published: false, createdAt: new Date(Date.now() - 3600000 * 120).toISOString() },
]

async function ensureStoreFile() {
  try {
    await fs.mkdir(dataDir, { recursive: true })
    try {
      await fs.access(storeFile)
      const content = await fs.readFile(storeFile, 'utf8')
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCaseStudies = parsed
        return
      }
    } catch {}
    await fs.writeFile(storeFile, JSON.stringify(initialSeed, null, 2), 'utf8')
    memoryCaseStudies = [...initialSeed]
  } catch (err) {
    if (!memoryCaseStudies) memoryCaseStudies = [...initialSeed]
  }
}

export async function getStoredCaseStudies(): Promise<CaseStudyRecord[]> {
  if (memoryCaseStudies) return memoryCaseStudies
  await ensureStoreFile()
  return memoryCaseStudies ?? [...initialSeed]
}

export async function toggleCaseStudyPublished(id: string): Promise<CaseStudyRecord | null> {
  const records = await getStoredCaseStudies()
  const index = records.findIndex((r) => r.id === id)
  if (index === -1) return null

  records[index] = { ...records[index], published: !records[index].published }
  memoryCaseStudies = records
  try {
    await fs.writeFile(storeFile, JSON.stringify(records, null, 2), 'utf8')
  } catch (e) {
    console.warn('Could not persist CMS update to disk:', e)
  }
  return records[index]
}

export async function addCaseStudy(title: string, category: string): Promise<CaseStudyRecord> {
  const records = await getStoredCaseStudies()
  const newRecord: CaseStudyRecord = {
    id: `cs-${Date.now()}`,
    title,
    category,
    published: false,
    createdAt: new Date().toISOString(),
  }
  records.unshift(newRecord)
  memoryCaseStudies = records
  try {
    await fs.writeFile(storeFile, JSON.stringify(records, null, 2), 'utf8')
  } catch (e) {
    console.warn('Could not persist new case study to disk:', e)
  }
  return newRecord
}
