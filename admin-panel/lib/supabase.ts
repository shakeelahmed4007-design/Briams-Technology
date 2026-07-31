import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://lqyvfemgvdzneoqwngtk.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeXZmZW1ndmR6bmVvcXduZ3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDg2MjIsImV4cCI6MjEwMDgyNDYyMn0.x-Nhs4Ce00Ychj-0BG2o--4oLzHnt4l2QH9uQ-rrtH0'

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchSupabaseLeads() {
  if (!isSupabaseConfigured) return []

  // 1. Try querying 'leads' table
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data && data.length > 0) {
      return data
    }
  } catch (err) {
    // Fall through to table aggregation fallback
  }

  // 2. Fallback: Aggregate from 'bookings', 'messages', and 'waitlist' tables
  try {
    const [bookingsRes, messagesRes, waitlistRes] = await Promise.all([
      supabase.from('bookings').select('*').order('created_at', { ascending: false }),
      supabase.from('messages').select('*').order('created_at', { ascending: false }),
      supabase.from('waitlist').select('*').order('created_at', { ascending: false }),
    ])

    const combined: any[] = []

    if (bookingsRes.data && Array.isArray(bookingsRes.data)) {
      bookingsRes.data.forEach((b: any) => {
        combined.push({
          id: b.id,
          name: b.name || 'Anonymous',
          email: b.email,
          phone: b.phone || null,
          company: b.company || null,
          message: b.message || null,
          source: 'Discovery Call',
          status: b.status || 'NEW',
          createdAt: b.created_at || new Date().toISOString(),
        })
      })
    }

    if (messagesRes.data && Array.isArray(messagesRes.data)) {
      messagesRes.data.forEach((m: any) => {
        combined.push({
          id: m.id,
          name: m.name || 'Anonymous',
          email: m.email,
          message: m.message || null,
          source: 'Contact Form',
          status: m.status || 'NEW',
          createdAt: m.created_at || new Date().toISOString(),
        })
      })
    }

    if (waitlistRes.data && Array.isArray(waitlistRes.data)) {
      waitlistRes.data.forEach((w: any) => {
        combined.push({
          id: w.id,
          name: 'Waitlist User',
          email: w.email,
          source: 'CureVirtual Waitlist',
          status: w.status || 'NEW',
          createdAt: w.created_at || new Date().toISOString(),
        })
      })
    }

    combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return combined
  } catch (fallbackErr) {
    return []
  }
}

export async function saveSupabaseLead(lead: {
  name?: string
  email: string
  phone?: string | null
  message?: string | null
  company?: string | null
  source?: string | null
  status?: string
}) {
  if (!isSupabaseConfigured) return null
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        name: lead.name || 'Anonymous',
        email: lead.email,
        phone: lead.phone || null,
        company: lead.company || null,
        message: lead.message || null,
        source: lead.source || 'Admin Panel',
        status: lead.status || 'NEW',
      }])
      .select()

    if (error) {
      return null
    }
    return data ? data[0] : null
  } catch (err) {
    return null
  }
}

export async function updateSupabaseLeadStatus(id: string, status: string) {
  if (!isSupabaseConfigured) return null
  try {
    const { data, error } = await supabase
      .from('leads')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()

    if (error) {
      return null
    }
    return data ? data[0] : null
  } catch (err) {
    return null
  }
}
