'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, CheckCircle2, Globe, FileText, X } from 'lucide-react'

type CaseStudy = {
  id: string
  title: string
  category: string
  published: boolean
  createdAt: string
}

export default function CMSPage() {
  const [cases, setCases] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Healthcare Tech')

  const fetchCases = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cms')
      if (res.ok) {
        const data = await res.json()
        setCases(data)
      }
    } catch (e) {
      console.error('Failed to load case studies:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCases()
  }, [])

  const handleTogglePublished = async (id: string) => {
    try {
      const res = await fetch(`/api/cms/${id}`, { method: 'PATCH' })
      if (res.ok) {
        setCases(prev => prev.map(c => c.id === id ? { ...c, published: !c.published } : c))
      }
    } catch (e) {
      console.error('Failed to toggle published:', e)
    }
  }

  const handleCreateCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return
    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category }),
      })
      if (res.ok) {
        const data = await res.json()
        setCases(prev => [data.caseStudy, ...prev])
        setTitle('')
        setShowModal(false)
      }
    } catch (e) {
      console.error('Failed to create case study:', e)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            <span className="text-gradient-cta">CMS & Case Studies</span> Manager
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">Publish and manage engineering case studies & articles.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-5 py-2.5 rounded-xl font-display font-extrabold transition-all shadow-glow-orange flex items-center gap-2 text-sm hover:brightness-110"
        >
          <Plus size={18} /> New Case Study
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden border border-card-border shadow-glass-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-card-border">
                <th className="px-6 py-4 text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">Title & Category</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider text-right">Toggle Publish</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border/60">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-400 text-sm font-mono">
                    Loading content items...
                  </td>
                </tr>
              ) : cases.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-400 text-sm">
                    No case studies created yet.
                  </td>
                </tr>
              ) : (
                cases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-white">{c.title}</div>
                      <div className="text-xs text-amber-400 font-mono font-semibold mt-0.5">{c.category}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${
                        c.published 
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        <Globe size={12} /> {c.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleTogglePublished(c.id)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                          c.published 
                            ? 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                            : 'bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500 hover:text-slate-950'
                        }`}
                      >
                        {c.published ? 'Unpublish' : 'Publish Live'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Case Study Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass max-w-md w-full rounded-2xl border border-card-border p-6 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-card-border pb-3">
              <h3 className="text-lg font-display font-extrabold text-white">Create New Case Study</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateCaseStudy} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-sky-400 uppercase mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Telehealth Mobile App Architecture"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-amber-400 uppercase mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                >
                  <option value="Healthcare Tech">Healthcare Tech</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Logistics & AI">Logistics & AI</option>
                  <option value="Enterprise ERP">Enterprise ERP</option>
                </select>
              </div>
              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-display font-extrabold text-xs hover:brightness-110 transition-all shadow-glow-orange"
                >
                  Create Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
