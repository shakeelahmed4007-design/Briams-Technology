import { prisma } from '../../../lib/prisma'
import Link from 'next/link'
import { Plus, Edit2 } from 'lucide-react'

async function getCaseStudies() {
  return prisma.caseStudy.findMany({ orderBy: { createdAt: 'desc' } })
}

export default async function CMSPage() {
  let cases = []
  try {
    cases = await getCaseStudies()
  } catch (e) {
    console.error("Prisma error, using mock data", e)
    cases = [
      { id: '1', title: 'Healthcare App Modernization', published: true },
      { id: '2', title: 'Fintech Dashboard Redesign', published: false },
    ]
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">CMS Content</h1>
          <p className="text-sm text-text-secondary">Manage case studies and articles.</p>
        </div>
        <Link 
          href="/admin/cms/new" 
          className="bg-briams-orange hover:bg-briams-gold text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-glow-orange"
        >
          <Plus size={18} /> New Case Study
        </Link>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-card-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-card-border">
                <th className="px-6 py-4 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {cases.map((c: any) => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {c.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      c.published 
                        ? 'bg-cure-green/10 text-cure-green border-cure-green/20' 
                        : 'bg-white/10 text-text-muted border-white/20'
                    }`}>
                      {c.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/cms/${c.id}/edit`} 
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-white/5 text-briams-cyan hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
              {cases.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-text-muted text-sm">
                    No case studies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
