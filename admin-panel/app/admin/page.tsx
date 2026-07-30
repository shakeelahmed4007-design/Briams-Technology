import { Users, FileText, Activity, Zap } from 'lucide-react'

export default function AdminIndex() {
  const stats = [
    { label: 'Total Leads', value: '1,248', icon: Users, color: 'text-briams-cyan', bg: 'bg-briams-cyan/10' },
    { label: 'Published Posts', value: '34', icon: FileText, color: 'text-briams-orange', bg: 'bg-briams-orange/10' },
    { label: 'Pending Verifications', value: '12', icon: Zap, color: 'text-cure-green', bg: 'bg-cure-green/10' },
    { label: 'System Health', value: '98%', icon: Activity, color: 'text-briams-blue', bg: 'bg-briams-blue/10' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome Back!</h1>
        <p className="text-text-secondary">Here's what's happening with Briams Technologies today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="glass p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-300">
                <Icon size={64} className={stat.color} />
              </div>
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-4xl font-display font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-text-muted uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-6 h-96 flex flex-col">
          <h2 className="text-xl font-display font-semibold text-white mb-4">Traffic Overview</h2>
          <div className="flex-1 border-2 border-dashed border-card-border rounded-xl flex items-center justify-center text-text-muted">
            Chart Placeholder
          </div>
        </div>
        <div className="glass p-6 h-96 flex flex-col">
          <h2 className="text-xl font-display font-semibold text-white mb-4">Recent Activity</h2>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-card-border last:border-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-briams-orange flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-white font-medium">New lead submitted form</p>
                  <p className="text-xs text-text-muted mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
