'use client'

import { useState, useEffect } from 'react'
import { 
  Users, Mail, Phone, Calendar, Download, Search, Filter, 
  Trash2, Eye, CheckCircle2, RefreshCw, X, MessageSquare, Briefcase, Zap, UserCheck
} from 'lucide-react'

type Lead = {
  id: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  message?: string | null
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED'
  source: string
  createdAt: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [sourceFilter, setSourceFilter] = useState<string>('ALL')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/leads')
      if (res.ok) {
        const data = await res.json()
        setLeads(data)
      }
    } catch (e) {
      console.error('Failed to fetch leads:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus as any } : l))
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus as any } : null)
        }
      }
    } catch (e) {
      console.error('Failed to update lead status:', e)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== id))
        if (selectedLead?.id === id) setSelectedLead(null)
      }
    } catch (e) {
      console.error('Failed to delete lead:', e)
    }
  }

  const exportToCSV = () => {
    if (leads.length === 0) return
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Source', 'Status', 'Message', 'Created At']
    const rows = filteredLeads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone || ''}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${l.source || ''}"`,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      new Date(l.createdAt).toLocaleString()
    ])
    
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `briams_leads_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredLeads = leads.filter(l => {
    const name = l.name || ''
    const email = l.email || ''
    const company = l.company || ''
    const message = l.message || ''
    const source = l.source || 'Website'
    const status = l.status || 'NEW'

    const matchesSearch = 
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || status === statusFilter
    const matchesSource = sourceFilter === 'ALL' || source === sourceFilter

    return matchesSearch && matchesStatus && matchesSource
  })

  // Metrics
  const totalLeads = leads.length
  const newLeadsCount = leads.filter(l => l.status === 'NEW').length
  const inProgressCount = leads.filter(l => l.status === 'IN_PROGRESS' || l.status === 'CONTACTED').length
  const closedCount = leads.filter(l => l.status === 'CLOSED').length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30'
      case 'CONTACTED':
        return 'bg-sky-500/15 text-sky-400 border-sky-500/30'
      case 'IN_PROGRESS':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
      case 'CLOSED':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700'
    }
  }

  const getSourceBadge = (source?: string | null) => {
    const src = source || 'Website'
    if (src.includes('Waitlist')) {
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    }
    if (src.includes('Discovery')) {
      return 'bg-sky-500/15 text-sky-300 border-sky-500/30'
    }
    if (src.includes('Contact')) {
      return 'bg-amber-500/15 text-amber-400 border-amber-500/30'
    }
    return 'bg-purple-500/15 text-purple-300 border-purple-500/30'
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            <span className="text-gradient-cyan">Leads & Consultations</span> Workspace
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">Real-time incoming submissions with instant status management.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-300 hover:text-white hover:border-sky-400/40 transition-all flex items-center gap-2 text-sm"
            title="Refresh Leads"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin text-sky-400' : 'text-sky-400'} />
            <span className="hidden sm:inline font-semibold">Refresh</span>
          </button>
          <button
            onClick={exportToCSV}
            disabled={filteredLeads.length === 0}
            className="bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-glow-blue flex items-center gap-2 text-sm disabled:opacity-50 hover:brightness-110"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass p-5 rounded-2xl flex items-center justify-between border border-card-border glass-hover">
          <div>
            <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">Total Submissions</p>
            <h3 className="text-3xl font-display font-black text-gradient-cyan">{totalLeads}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Users size={22} />
          </div>
        </div>
        <div className="glass p-5 rounded-2xl flex items-center justify-between border border-card-border glass-hover">
          <div>
            <p className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">New Leads</p>
            <h3 className="text-3xl font-display font-black text-gradient-cta">{newLeadsCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Zap size={22} />
          </div>
        </div>
        <div className="glass p-5 rounded-2xl flex items-center justify-between border border-card-border glass-hover">
          <div>
            <p className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider mb-1">Active Discussions</p>
            <h3 className="text-3xl font-display font-black text-gradient-purple">{inProgressCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <MessageSquare size={22} />
          </div>
        </div>
        <div className="glass p-5 rounded-2xl flex items-center justify-between border border-card-border glass-hover">
          <div>
            <p className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">Closed Deals</p>
            <h3 className="text-3xl font-display font-black text-gradient-emerald">{closedCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <UserCheck size={22} />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass p-4 rounded-2xl border border-card-border flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, email, company, message..."
            className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-medium"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Tabs */}
          <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-700 text-xs">
            {['ALL', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  statusFilter === st 
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st === 'ALL' ? 'All' : st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Source Dropdown */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-sky-300 focus:outline-none focus:border-sky-400 cursor-pointer"
          >
            <option value="ALL">All Sources</option>
            <option value="Contact Form">Contact Form</option>
            <option value="Discovery Call">Discovery Call</option>
            <option value="CureVirtual Waitlist">CureVirtual Waitlist</option>
            <option value="Website">Website</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="glass rounded-2xl overflow-hidden border border-card-border shadow-glass-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-card-border">
                <th className="px-6 py-4 text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">Lead Info</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-mono text-sky-300">Loading incoming leads...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm font-medium">
                    No leads found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-900/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0 font-bold group-hover:scale-105 transition-transform">
                          <Users size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-sm flex items-center gap-2">
                            <span>{l.name || 'Anonymous'}</span>
                            {l.company && (
                              <span className="text-[11px] font-mono text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30 font-semibold">
                                {l.company}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 font-medium">
                            <span className="flex items-center gap-1 text-sky-300"><Mail size={12} className="text-sky-400" /> {l.email || 'N/A'}</span>
                            {l.phone && <span className="flex items-center gap-1 text-slate-300"><Phone size={12} className="text-emerald-400" /> {l.phone}</span>}
                          </div>
                          {l.message && (
                            <p className="text-xs text-slate-300 mt-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 line-clamp-2 max-w-lg italic font-normal">
                              "{l.message}"
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-mono px-3 py-1 rounded-full border font-bold ${getSourceBadge(l.source)}`}>
                        {l.source || 'Website'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block">
                        <select
                          value={l.status}
                          disabled={updatingId === l.id}
                          onChange={(e) => handleStatusChange(l.id, e.target.value)}
                          className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border appearance-none cursor-pointer pr-7 focus:outline-none transition-all ${getStatusBadge(l.status)}`}
                        >
                          <option value="NEW" className="bg-slate-950 text-amber-400 font-bold">NEW</option>
                          <option value="CONTACTED" className="bg-slate-950 text-sky-400 font-bold">CONTACTED</option>
                          <option value="IN_PROGRESS" className="bg-slate-950 text-indigo-300 font-bold">IN PROGRESS</option>
                          <option value="CLOSED" className="bg-slate-950 text-emerald-400 font-bold">CLOSED</option>
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-70">
                          ▼
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-400 font-semibold whitespace-nowrap">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setSelectedLead(l)}
                          className="p-2 rounded-xl bg-sky-500/15 text-sky-300 hover:bg-sky-400 hover:text-slate-950 transition-colors border border-sky-500/30 font-semibold"
                          title="View Full Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(l.id)}
                          className="p-2 rounded-xl bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white transition-colors border border-red-500/30"
                          title="Delete Lead"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="glass max-w-lg w-full rounded-2xl border border-card-border p-6 shadow-2xl relative space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-card-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 font-bold">
                  <Users size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-display font-extrabold text-white">{selectedLead.name}</h3>
                  <p className="text-xs font-mono font-bold text-sky-400">{selectedLead.source}</p>
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 text-slate-400 hover:text-white rounded-lg">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-sky-400 block mb-0.5">Email Address</label>
                  <p className="text-white font-semibold break-all">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-emerald-400 block mb-0.5">Phone Number</label>
                  <p className="text-white font-semibold">{selectedLead.phone || 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-amber-400 block mb-0.5">Company</label>
                  <p className="text-white font-semibold">{selectedLead.company || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-purple-400 block mb-0.5">Submitted On</label>
                  <p className="text-slate-300 font-mono text-xs">{new Date(selectedLead.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1.5">Manage Status</label>
                <div className="flex flex-wrap items-center gap-2">
                  {['NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED'].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedLead.id, s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                        selectedLead.status === s 
                          ? getStatusBadge(s)
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">Message Body</label>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 leading-relaxed text-xs max-h-48 overflow-y-auto whitespace-pre-wrap font-medium">
                  {selectedLead.message || 'No additional text message submitted.'}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-card-border flex justify-end gap-3">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors"
              >
                Close
              </button>
              <a
                href={`mailto:${selectedLead.email}?subject=Re: Inquiry via ${selectedLead.source}`}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-display font-extrabold text-xs transition-all shadow-glow-blue flex items-center gap-1.5 hover:brightness-110"
              >
                <Mail size={16} />
                <span>Send Direct Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
