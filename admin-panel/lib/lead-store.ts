import { promises as fs } from 'fs'
import path from 'path'

type LeadRecord = {
  id: string
  name: string
  email: string
  phone?: string | null
  message?: string | null
  status?: string
  source?: string | null
  createdAt: string
}

const storeFile = path.join(process.cwd(), 'data', 'leads.json')

async function ensureStoreFile() {
  await fs.mkdir(path.dirname(storeFile), { recursive: true })

  try {
    await fs.access(storeFile)
  } catch {
    await fs.writeFile(storeFile, '[]', 'utf8')
  }
}

export async function getStoredLeads(): Promise<LeadRecord[]> {
  await ensureStoreFile()

  const content = await fs.readFile(storeFile, 'utf8')

  try {
    return JSON.parse(content) as LeadRecord[]
  } catch {
    return []
  }
}

export async function saveStoredLead(input: Partial<LeadRecord> & { email: string; name?: string }): Promise<LeadRecord> {
  const leads = await getStoredLeads()

  const lead: LeadRecord = {
    id: input.id || `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: input.name || 'Anonymous',
    email: input.email,
    phone: input.phone ?? null,
    message: input.message ?? null,
    status: input.status || 'NEW',
    source: input.source ?? 'Website',
    createdAt: input.createdAt || new Date().toISOString(),
  }

  leads.unshift(lead)
  await fs.writeFile(storeFile, JSON.stringify(leads, null, 2), 'utf8')

  return lead
}

export async function updateStoredLeadStatus(id: string, status: string): Promise<LeadRecord | null> {
  const leads = await getStoredLeads()
  const index = leads.findIndex((lead) => lead.id === id)

  if (index === -1) {
    return null
  }

  leads[index] = { ...leads[index], status }
  await fs.writeFile(storeFile, JSON.stringify(leads, null, 2), 'utf8')

  return leads[index]
}
