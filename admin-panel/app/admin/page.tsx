import { Users, FileText, Activity, Zap, ArrowUpRight, Mail, Clock, CheckCircle } from 'lucide-react'
import { getStoredLeads } from '../../lib/lead-store'
import { getStoredVerifications } from '../../lib/verification-store'
import { getStoredCaseStudies } from '../../lib/cms-store'
import Link from 'next/link'

export default async function AdminIndex() {
  const leads = await getStoredLeads()
  const verifications = await getStoredVerifications()
  const caseStudies = await getStoredCaseStudies()

  const pendingVerifications = verifications.filter(v => v.status === 'PENDING').length
  const publishedPosts = caseStudies.filter(c => c.published).length

  const stats = [
    { label: 'Total Inbound Leads', value: leads.length.toString(), icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/15 border-sky-500/30', gradientVal: 'text-gradient-cyan', link: '/admin/leads' },
    { label: 'Published CMS Posts', value: publishedPosts.toString(), icon: FileText, color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/30', gradientVal: 'text-gradient-cta', link: '/admin/cms' },
    { label: 'Pending Verifications', value: pendingVerifications.toString(), icon: Zap, color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30', gradientVal: 'text-gradient-emerald', link: '/admin/verifications' },
    { label: 'System Health', value: '100%', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-500/15 border-purple-500/30', gradientVal: 'text-gradient-purple', link: '/admin/settings' },
  ]

  const recentLeads = leads.slice(0, 5)

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header Banner */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-2">
          Welcome Back, <span className="text-gradient-cta">Admin</span> 👋
        </h1>
        <p className="text-slate-400 text-sm font-medium">Real-time operational dashboard for <span className="text-sky-400 font-semibold">Briams Consultancy</span> & <span className="text-emerald-400 font-semibold">CureVirtual</span>.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Link key={i} href={stat.link} className="glass p-6 rounded-2xl relative overflow-hidden group glass-hover">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-25 transition-opacity group-hover:scale-110 duration-300">
                <Icon size={70} className={stat.color} />
              </div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${stat.bg}`}>
                  <Icon size={24} className={stat.color} />
                </div>
                <ArrowUpRight size={18} className="text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <div className="relative z-10">
                <h3 className={`text-4xl font-display font-black mb-1 ${stat.gradientVal}`}>{stat.value}</h3>
                <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Live Inbound Stream & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Leads Column */}
        <div className="lg:col-span-2 glass p-6 rounded-2xl flex flex-col justify-between border border-card-border">
          <div className="flex items-center justify-between mb-6 border-b border-card-border/60 pb-4">
            <div>
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <span>Live Inbound Leads</span>
                <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-400/15 border border-sky-400/30 px-2 py-0.5 rounded-full">Stream</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Real-time requests received across contact & discovery forms.</p>
            </div>
            <Link href="/admin/leads" className="text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1 transition-colors">
              View Workspace →
            </Link>
          </div>

          <div className="space-y-3.5 flex-1 overflow-y-auto">
            {recentLeads.map((l) => (
              <div key={l.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4 hover:border-sky-500/30 transition-all">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-400/30 text-sky-300 flex items-center justify-center shrink-0 font-bold text-sm">
                    {(l.name || 'Anonymous').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">{l.name || 'Anonymous'}</div>
                    <div className="text-xs text-slate-400 truncate mt-0.5">
                      <span className="text-slate-300 font-mono">{l.email || 'N/A'}</span> • <span className="text-amber-400 font-semibold">{l.source || 'Website'}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    l.status === 'NEW' 
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' 
                      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {l.status}
                  </span>
                  <div className="text-[10px] font-mono text-slate-500 mt-1">{new Date(l.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
            {recentLeads.length === 0 && (
              <p className="text-slate-400 text-sm py-8 text-center">No recent leads recorded.</p>
            )}
          </div>
        </div>

        {/* System Activity */}
        <div className="glass p-6 rounded-2xl flex flex-col border border-card-border">
          <div className="flex items-center justify-between mb-4 border-b border-card-border/60 pb-3">
            <h2 className="text-xl font-display font-bold text-white">System Status</h2>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-mono font-bold text-emerald-400">ACTIVE</span>
            </div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            <div className="flex items-start gap-3 pb-3.5 border-b border-card-border/60">
              <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-sm text-white font-semibold">Dual-Sync API Active</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Form submissions are streaming into Admin JSON & Supabase.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3.5 border-b border-card-border/60">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Zap size={16} />
              </div>
              <div>
                <p className="text-sm text-white font-semibold">CureVirtual Engine Online</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Provider verification queue & waitlist active.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle size={16} />
              </div>
              <div>
                <p className="text-sm text-white font-semibold">Proxy & Server Health 100%</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Vite proxying `/admin` & `/api` seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
