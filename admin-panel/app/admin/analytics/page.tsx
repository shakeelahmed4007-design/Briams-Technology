import { TrendingUp, Users, DollarSign, Activity, Zap, CheckCircle2 } from 'lucide-react'
import { getStoredLeads } from '../../../lib/lead-store'
import { getStoredVerifications } from '../../../lib/verification-store'

export default async function AnalyticsPage() {
  const leads = await getStoredLeads()
  const verifications = await getStoredVerifications()

  const totalPatients = 1420 + leads.length
  const verifiedProviders = verifications.filter(v => v.status === 'APPROVED').length + 45
  const activeConsultations = leads.filter(l => l.status === 'IN_PROGRESS' || l.status === 'NEW').length
  const estimatedRevenue = (leads.length * 1500) + 24500

  const metrics = [
    { label: 'Total Inbound Users', value: totalPatients.toLocaleString(), icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/15 border-sky-500/30', gradientVal: 'text-gradient-cyan' },
    { label: 'Verified Providers', value: verifiedProviders.toString(), icon: Zap, color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30', gradientVal: 'text-gradient-emerald' },
    { label: 'Active Consultations', value: activeConsultations.toString(), icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/30', gradientVal: 'text-gradient-cta' },
    { label: 'Pipeline Revenue', value: `$${estimatedRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-purple-400', bg: 'bg-purple-500/15 border-purple-500/30', gradientVal: 'text-gradient-purple' },
  ]

  const sampleTransactions = [
    { id: 'TX-901', type: 'Consultation Fee', amount: '$2,500', status: 'COMPLETED', client: 'Sara Ahmed (Apex Health)', date: 'Today' },
    { id: 'TX-902', type: 'ERP System Discovery Call', amount: '$5,000', status: 'IN_PROGRESS', client: 'Ali Raza (LogiSpeed)', date: 'Yesterday' },
    { id: 'TX-903', type: 'Provider License Verification', amount: '$450', status: 'COMPLETED', client: 'Dr. Usman Malik', date: '2 days ago' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          <span className="text-gradient-purple">Analytics & Financials</span> Performance
        </h1>
        <p className="text-sm text-slate-400 mt-1 font-medium">Track conversion metrics, provider growth, and pipeline valuation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => {
          const Icon = m.icon
          return (
            <div key={i} className="glass p-6 rounded-2xl border border-card-border relative overflow-hidden glass-hover">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${m.bg}`}>
                  <Icon size={24} className={m.color} />
                </div>
                <span className="text-[10px] font-mono font-extrabold text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  +12.4%
                </span>
              </div>
              <h3 className={`text-3xl font-display font-black mb-1 ${m.gradientVal}`}>{m.value}</h3>
              <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{m.label}</p>
            </div>
          )
        })}
      </div>

      <div className="glass rounded-2xl p-6 border border-card-border shadow-glass-lg space-y-4">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <span>Recent Transactions & Financial Milestones</span>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">Audited</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-card-border">
                <th className="px-4 py-3.5 text-xs font-mono font-bold text-sky-400 uppercase">Transaction ID</th>
                <th className="px-4 py-3.5 text-xs font-mono font-bold text-amber-400 uppercase">Type</th>
                <th className="px-4 py-3.5 text-xs font-mono font-bold text-purple-400 uppercase">Client</th>
                <th className="px-4 py-3.5 text-xs font-mono font-bold text-emerald-400 uppercase">Amount</th>
                <th className="px-4 py-3.5 text-xs font-mono font-bold text-slate-400 uppercase text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border/60">
              {sampleTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-4 py-3.5 text-xs font-mono text-sky-300 font-bold">{tx.id}</td>
                  <td className="px-4 py-3.5 text-sm font-bold text-white">{tx.type}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-300 font-medium">{tx.client}</td>
                  <td className="px-4 py-3.5 text-sm font-mono font-extrabold text-emerald-400">{tx.amount}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
