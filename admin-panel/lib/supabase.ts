import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://lqyvfemgvdzneoqwngtk.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeXZmZW1ndmR6bmVvcXduZ3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDg2MjIsImV4cCI6MjEwMDgyNDYyMn0.x-Nhs4Ce00Ychj-0BG2o--4oLzHnt4l2QH9uQ-rrtH0'

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchSupabaseLeads() {
  if (!isSupabaseConfigured) return []
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[Admin Supabase] Error fetching leads:', error)
      return []
    }
    return data || []
  } catch (err) {
    console.error('[Admin Supabase] Exception fetching leads:', err)
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
      console.error('[Admin Supabase] Error saving lead:', error)
      return null
    }
    return data ? data[0] : null
  } catch (err) {
    console.error('[Admin Supabase] Exception saving lead:', err)
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
      console.error('[Admin Supabase] Error updating lead status:', error)
      return null
    }
    return data ? data[0] : null
  } catch (err) {
    console.error('[Admin Supabase] Exception updating lead status:', err)
    return null
  }
}
