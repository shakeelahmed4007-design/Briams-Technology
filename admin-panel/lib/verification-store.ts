import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'

export type VerificationRecord = {
  id: string
  providerName: string
  providerEmail: string
  providerType: 'MEDICAL' | 'TECHNICAL' | 'SERVICE'
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

const dataDir = process.env.VERCEL ? path.join(os.tmpdir(), 'data') : path.join(process.cwd(), 'data')
const storeFile = path.join(dataDir, 'verifications.json')

let memoryVerifications: VerificationRecord[] | null = null

const initialSeed: VerificationRecord[] = [
  { id: '1', providerName: 'Dr. Jane Smith', providerEmail: 'jane.smith@curevirtual.com', providerType: 'MEDICAL', status: 'PENDING', createdAt: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: '2', providerName: 'TechCorp Healthcare Solutions', providerEmail: 'support@techcorp.com', providerType: 'TECHNICAL', status: 'APPROVED', createdAt: new Date(Date.now() - 3600000 * 24).toISOString() },
  { id: '3', providerName: 'FastFix Medical Logistics', providerEmail: 'info@fastfix.com', providerType: 'SERVICE', status: 'REJECTED', createdAt: new Date(Date.now() - 3600000 * 48).toISOString() },
]

async function ensureStoreFile() {
  try {
    await fs.mkdir(dataDir, { recursive: true })
    try {
      await fs.access(storeFile)
      const content = await fs.readFile(storeFile, 'utf8')
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryVerifications = parsed
        return
      }
    } catch {}
    await fs.writeFile(storeFile, JSON.stringify(initialSeed, null, 2), 'utf8')
    memoryVerifications = [...initialSeed]
  } catch (err) {
    if (!memoryVerifications) memoryVerifications = [...initialSeed]
  }
}

export async function getStoredVerifications(): Promise<VerificationRecord[]> {
  if (memoryVerifications) return memoryVerifications
  await ensureStoreFile()
  return memoryVerifications ?? [...initialSeed]
}

export async function updateVerificationStatus(id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED'): Promise<VerificationRecord | null> {
  const records = await getStoredVerifications()
  const index = records.findIndex((r) => r.id === id)
  if (index === -1) return null

  records[index] = { ...records[index], status }
  memoryVerifications = records
  try {
    await fs.writeFile(storeFile, JSON.stringify(records, null, 2), 'utf8')
  } catch (e) {
    console.warn('Could not persist verification update to disk:', e)
  }
  return records[index]
}
