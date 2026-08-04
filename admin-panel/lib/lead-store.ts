import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'

export type LeadRecord = {
  id: string
  name: string
  email: string
  phone?: string | null
  message?: string | null
  company?: string | null
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED'
  source: string
  createdAt: string
}

const dataDir = process.env.VERCEL ? path.join(os.tmpdir(), 'data') : path.join(process.cwd(), 'data')
const storeFile = path.join(dataDir, 'leads.json')

let memoryLeads: LeadRecord[] | null = null

const initialSeedLeads: LeadRecord[] = [
  {
    id: 'lead-101',
    name: 'Sara Ahmed',
    email: 'sara.ahmed@example.com',
    phone: '+92 300 1234567',
    company: 'Apex Health Systems',
    message: 'We want to integrate CureVirtual into our regional hospital network. Need a 30-min discovery call.',
    status: 'NEW',
    source: 'Discovery Call',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'lead-102',
    name: 'Ali Raza',
    email: 'ali.raza@logistics.pk',
    phone: '+92 321 9876543',
    company: 'LogiSpeed PK',
    message: 'Inquiring about custom ERP software development for fleet management.',
    status: 'CONTACTED',
    source: 'Contact Form',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'lead-103',
    name: 'Dr. Usman Malik',
    email: 'usman.malik@clinic.org',
    phone: '+92 333 5554433',
    company: 'Malik Medical Center',
    message: 'Joined early waitlist for CureVirtual clinic module launch.',
    status: 'NEW',
    source: 'CureVirtual Waitlist',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
  }
]

async function ensureStoreFile() {
  try {
    await fs.mkdir(dataDir, { recursive: true })
    try {
      await fs.access(storeFile)
      const content = await fs.readFile(storeFile, 'utf8')
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryLeads = parsed
        return
      }
    } catch {
      // File missing or corrupt
    }
    await fs.writeFile(storeFile, JSON.stringify(initialSeedLeads, null, 2), 'utf8')
    memoryLeads = [...initialSeedLeads]
  } catch (err) {
    console.warn('File storage fallback to memory:', err)
    if (!memoryLeads) memoryLeads = [...initialSeedLeads]
  }
}

export async function getStoredLeads(): Promise<LeadRecord[]> {
  if (memoryLeads) return memoryLeads
  await ensureStoreFile()
  return memoryLeads ?? [...initialSeedLeads]
}

export async function saveStoredLead(input: Partial<LeadRecord> & { email: string; name?: string }): Promise<LeadRecord> {
  const leads = await getStoredLeads()

  const lead: LeadRecord = {
    id: input.id || `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: input.name || 'Anonymous',
    email: input.email,
    phone: input.phone ?? null,
    company: input.company ?? null,
    message: input.message ?? null,
    status: (input.status as any) || 'NEW',
    source: input.source || 'Website',
    createdAt: input.createdAt || new Date().toISOString(),
  }

  leads.unshift(lead)
  memoryLeads = leads
  try {
    await fs.writeFile(storeFile, JSON.stringify(leads, null, 2), 'utf8')
  } catch (e) {
    console.warn('Could not persist to disk, saved in memory:', e)
  }
  return lead
}

export async function updateStoredLeadStatus(id: string, status: string): Promise<LeadRecord | null> {
  const leads = await getStoredLeads()
  const index = leads.findIndex((lead) => lead.id === id)

  if (index === -1) {
    return null
  }

  leads[index] = { ...leads[index], status: status as any }
  memoryLeads = leads
  try {
    await fs.writeFile(storeFile, JSON.stringify(leads, null, 2), 'utf8')
  } catch (e) {
    console.warn('Could not persist update to disk:', e)
  }
  return leads[index]
}

export async function deleteStoredLead(id: string): Promise<boolean> {
  const leads = await getStoredLeads()
  const filtered = leads.filter((l) => l.id !== id)
  if (filtered.length === leads.length) return false
  memoryLeads = filtered
  try {
    await fs.writeFile(storeFile, JSON.stringify(filtered, null, 2), 'utf8')
  } catch (e) {
    console.warn('Could not persist delete to disk:', e)
  }
  return true
}
