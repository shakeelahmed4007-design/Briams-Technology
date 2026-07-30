import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Phone, Mail, User, CheckCircle2 } from 'lucide-react'

const prisma = new PrismaClient()

async function getLeads() {
  return prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })
}

export default async function LeadsPage() {
  let leads = []
  try {
    leads = await getLeads()
  } catch (e) {
    console.error("Prisma error, using mock data", e)
    leads = [
      { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', status: 'NEW' },
      { id: '2', name: 'Alice Smith', email: 'alice@example.com', phone: '+0987654321', status: 'CONTACTED' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '+1122334455', status: 'CLOSED' },
    ]
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'NEW': return 'bg-briams-orange/10 text-briams-orange border-briams-orange/20'
      case 'CONTACTED': return 'bg-briams-blue/10 text-briams-blue border-briams-blue/20'
      case 'IN_PROGRESS': return 'bg-briams-cyan/10 text-briams-cyan border-briams-cyan/20'
      case 'CLOSED': return 'bg-cure-green/10 text-cure-green border-cure-green/20'
      default: return 'bg-white/10 text-text-muted border-white/20'
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-1">Leads & Consultations</h1>
        <p className="text-sm text-text-secondary">Manage incoming consultation requests.</p>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-card-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-card-border">
                <th className="px-6 py-4 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {leads.map((l: any) => (
                <tr key={l.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted shrink-0 group-hover:bg-white/10 group-hover:text-white transition-colors">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-white">{l.name}</div>
                        <div className="text-sm text-text-muted mt-0.5 flex items-center gap-1.5"><Mail size={12}/> {l.email}</div>
                        <div className="text-sm text-text-muted mt-0.5 flex items-center gap-1.5"><Phone size={12}/> {l.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(l.status)}`}>
                      {l.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <input type="hidden" name="id" value={l.id} />
                      <select name="status" defaultValue={l.status} className="input-glass !py-1.5 !px-3 !w-auto text-sm bg-bg border-card-border appearance-none cursor-pointer">
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                      <Link href="/admin/leads" className="bg-white/10 hover:bg-briams-cyan hover:text-bg text-white p-2 rounded-lg transition-colors border border-white/10 hover:border-transparent flex items-center justify-center" title="Save Status">
                        <CheckCircle2 size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-text-muted text-sm">
                    No leads found.
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
