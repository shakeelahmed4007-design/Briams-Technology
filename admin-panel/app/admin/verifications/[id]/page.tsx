import { prisma } from '../../../../lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, XCircle, FileIcon } from 'lucide-react'

export default async function VerificationDetail({ params }: { params: { id: string } }) {
  const id = params.id
  let req = null

  try {
    req = await prisma.verificationRequest.findUnique({ where: { id } })
  } catch (e) {
    console.error("Prisma error, using mock data", e)
    req = {
      id,
      providerName: 'Sunrise Pharmacy',
      providerEmail: 'contact@sunrisepharmacy.com',
      providerType: 'MEDICAL_FACILITY',
      status: 'PENDING',
      documents: JSON.stringify([
        { url: 'https://via.placeholder.com/400x300/175FC4/FFFFFF?text=Medical+License', type: 'Medical License' },
        { url: 'https://via.placeholder.com/400x300/2E9E5B/FFFFFF?text=Facility+Registration', type: 'Facility Registration' }
      ])
    }
  }

  if (!req) return notFound()

  let docs = []
  try {
    docs = typeof req.documents === 'string' ? JSON.parse(req.documents) : (req.documents || [])
  } catch(e) {
    docs = []
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link href="/admin/verifications" className="p-2 rounded-lg bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors border border-white/10">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Verification - {req.providerName}</h1>
          <p className="text-sm text-text-secondary">{req.providerEmail} • {req.providerType}</p>
        </div>
      </div>

      <div className="glass rounded-xl p-6 md:p-8 border border-card-border">
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-card-border pb-2">Submitted Documents</h3>
          {docs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {docs.map((d: any, i: number) => (
                <div key={i} className="bg-surface border border-card-border rounded-xl overflow-hidden group">
                  <div className="h-48 bg-bg relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={d.url} 
                      alt={d.type} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                    />
                  </div>
                  <div className="p-4 border-t border-card-border flex items-center justify-between">
                    <span className="font-medium text-sm text-white">{d.type}</span>
                    <a href={d.url} target="_blank" rel="noreferrer" className="text-xs text-briams-cyan hover:underline">View Full</a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-text-muted py-8 text-center bg-white/5 rounded-xl border border-dashed border-card-border">
              No documents provided with this request.
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-card-border">
          <div className="flex-1 sm:flex-none">
            <Link href="/admin/verifications" className="w-full sm:w-auto bg-cure-green hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(46,158,91,0.3)]">
              <CheckCircle2 size={18} /> Approve Request
            </Link>
          </div>
          <div className="flex-1 sm:flex-none">
            <Link href="/admin/verifications" className="w-full sm:w-auto bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 px-6 py-2.5 rounded-xl font-medium transition-colors border border-white/10 hover:border-red-500/30 flex items-center justify-center gap-2">
              <XCircle size={18} /> Reject
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
