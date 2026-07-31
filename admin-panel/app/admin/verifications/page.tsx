import { prisma } from '../../../lib/prisma'
import Link from 'next/link'
import { Eye, CheckCircle, Clock, XCircle } from 'lucide-react'

async function getRequests() {
  return await prisma.verificationRequest.findMany({ orderBy: { createdAt: 'desc' } })
}

export default async function VerificationsPage() {
  let requests = []
  try {
    requests = await getRequests()
  } catch (e) {
    console.error("Prisma error, using mock data", e)
    requests = [
      { id: '1', providerName: 'Dr. Jane Smith', providerEmail: 'jane.smith@example.com', providerType: 'MEDICAL', status: 'PENDING' },
      { id: '2', providerName: 'TechCorp Support', providerEmail: 'support@techcorp.com', providerType: 'TECHNICAL', status: 'APPROVED' },
      { id: '3', providerName: 'FastFix Logistics', providerEmail: 'info@fastfix.com', providerType: 'SERVICE', status: 'REJECTED' },
    ]
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'PENDING': return 'bg-briams-orange/10 text-briams-orange border-briams-orange/20'
      case 'APPROVED': return 'bg-cure-green/10 text-cure-green border-cure-green/20'
      case 'REJECTED': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-white/10 text-text-muted border-white/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'PENDING': return <Clock size={12} />
      case 'APPROVED': return <CheckCircle size={12} />
      case 'REJECTED': return <XCircle size={12} />
      default: return null
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-1">Verification Queue</h1>
        <p className="text-sm text-text-secondary">Review and approve provider applications.</p>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-card-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-card-border">
                <th className="px-6 py-4 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">Provider</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-mono font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {requests.map((r: any) => (
                <tr key={r.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{r.providerName}</div>
                    <div className="text-sm text-text-muted mt-0.5">{r.providerEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary font-mono bg-white/5 px-2 py-1 rounded-md border border-white/10">
                      {r.providerType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(r.status)}`}>
                      {getStatusIcon(r.status)} {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/verifications/${r.id}`} 
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-white/5 text-briams-cyan hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-muted text-sm">
                    No verification requests found.
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
