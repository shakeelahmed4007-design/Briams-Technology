'use client'

import { useState, useEffect } from 'react'
import { Eye, CheckCircle, Clock, XCircle, ShieldCheck, Zap, RefreshCw } from 'lucide-react'

type Verification = {
  id: string
  providerName: string
  providerEmail: string
  providerType: 'MEDICAL' | 'TECHNICAL' | 'SERVICE'
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

export default function VerificationsPage() {
  const [requests, setRequests] = useState<Verification[]>([])
  const [loading, setLoading] = useState(true)

  const fetchVerifications = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/verifications')
      if (res.ok) {
        const data = await res.json()
        setRequests(data)
      }
    } catch (e) {
      console.error('Failed to load verifications:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVerifications()
  }, [])

  const handleStatusUpdate = async (id: string, newStatus: 'PENDING' | 'APPROVED' | 'REJECTED') => {
    try {
      const res = await fetch(`/api/verifications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r))
      }
    } catch (e) {
      console.error('Failed to update status:', e)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-500/15 text-amber-400 border-amber-500/30'
      case 'APPROVED': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
      case 'REJECTED': return 'bg-red-500/15 text-red-400 border-red-500/30'
      default: return 'bg-slate-800 text-slate-400 border-slate-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock size={12} />
      case 'APPROVED': return <CheckCircle size={12} />
      case 'REJECTED': return <XCircle size={12} />
      default: return null
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            <span className="text-gradient-emerald">CureVirtual Verifications</span> Queue
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">Review and verify medical, technical & service provider credentials.</p>
        </div>
        <button
          onClick={fetchVerifications}
          className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-400/40 transition-colors flex items-center gap-2 text-sm font-semibold self-start sm:self-auto"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin text-emerald-400' : 'text-emerald-400'} />
          <span>Refresh Queue</span>
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden border border-card-border shadow-glass-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-card-border">
                <th className="px-6 py-4 text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">Provider Info</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border/60">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-400 text-sm font-mono">
                    Loading verifications queue...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-400 text-sm">
                    No verification requests found.
                  </td>
                </tr>
              ) : (
                requests.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-sm">{r.providerName}</div>
                      <div className="text-xs text-sky-300 font-mono mt-0.5">{r.providerEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-purple-300 font-mono bg-purple-500/15 px-3 py-1 rounded-full border border-purple-500/30 font-bold">
                        {r.providerType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${getStatusColor(r.status)}`}>
                        {getStatusIcon(r.status)} {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        {r.status !== 'APPROVED' && (
                          <button
                            onClick={() => handleStatusUpdate(r.id, 'APPROVED')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all text-xs font-extrabold border border-emerald-500/30"
                          >
                            Approve
                          </button>
                        )}
                        {r.status !== 'REJECTED' && (
                          <button
                            onClick={() => handleStatusUpdate(r.id, 'REJECTED')}
                            className="px-3 py-1.5 rounded-xl bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-extrabold border border-red-500/30"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
