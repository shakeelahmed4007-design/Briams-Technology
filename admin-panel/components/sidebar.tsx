'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Home, Users, FileText, Settings, Zap, LogOut, BarChart3 } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (e) {
      console.error('Logout error', e)
    } finally {
      window.location.href = '/login'
    }
  }

  const NavLink = ({ href, icon: Icon, children, colorClass }: any) => {
    const active = isActive(href)
    return (
      <Link 
        href={href} 
        className={`flex items-center gap-3.5 p-3.5 rounded-2xl transition-all duration-300 font-semibold text-base relative group ${
          active 
            ? 'bg-gradient-to-r from-briams-cyan/25 to-briams-blue/15 text-white border-l-4 border-briams-cyan shadow-[0_0_25px_rgba(47,198,234,0.2)] font-extrabold' 
            : 'text-slate-200 hover:text-white hover:bg-white/10'
        }`}
      >
        <Icon size={22} className={active ? 'text-briams-cyan' : colorClass || 'text-slate-400 group-hover:text-briams-cyan'} />
        <span className={active ? 'text-gradient-cyan font-bold tracking-wide' : 'tracking-wide'}>{children}</span>
      </Link>
    )
  }

  return (
    <aside className="w-80 bg-slate-950/85 backdrop-blur-xl border-r border-card-border min-h-screen flex flex-col relative z-20 shadow-glass-lg shrink-0">
      {/* Brand Header */}
      <div className="p-6 pb-5 border-b border-card-border/60">
        <Link href="/admin" className="flex items-center gap-3.5 group">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-briams-blue/40 to-briams-cyan/30 border border-briams-cyan/40 flex-shrink-0 group-hover:border-briams-cyan shadow-glow-blue transition-all duration-300">
            <Image src="/logo.png" alt="Logo" width={36} height={36} className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black tracking-tight text-2xl text-gradient-cta">
              Briams
            </span>
            <span className="text-xs font-mono font-extrabold tracking-widest text-briams-cyan uppercase mt-0.5">
              Admin Control Center
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto p-5 space-y-7">
        <div className="space-y-2">
          <NavLink href="/admin" icon={Home} colorClass="text-briams-cyan">
            Dashboard Overview
          </NavLink>
        </div>

        <div>
          <div className="px-3.5 text-xs font-mono font-extrabold text-gradient-orange uppercase tracking-widest mb-3">
            Consultancy Core
          </div>
          <div className="space-y-2">
            <NavLink href="/admin/leads" icon={Users} colorClass="text-sky-400">
              Leads & Consultations
            </NavLink>
            <NavLink href="/admin/cms" icon={FileText} colorClass="text-amber-400">
              CMS Case Studies
            </NavLink>
          </div>
        </div>

        <div>
          <div className="px-3.5 text-xs font-mono font-extrabold text-gradient-emerald uppercase tracking-widest mb-3">
            Healthcare Engine
          </div>
          <div className="space-y-2">
            <NavLink href="/admin/verifications" icon={Zap} colorClass="text-emerald-400">
              CureVirtual Verifications
            </NavLink>
            <NavLink href="/admin/analytics" icon={BarChart3} colorClass="text-purple-400">
              Analytics & Financials
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Footer / Settings & Logout */}
      <div className="p-5 border-t border-card-border/60 space-y-2 bg-slate-900/50">
        <NavLink href="/admin/settings" icon={Settings} colorClass="text-slate-300">
          Platform Settings
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl transition-all duration-300 font-extrabold text-base text-red-400 hover:text-red-300 hover:bg-red-500/20 border border-transparent hover:border-red-500/30"
        >
          <LogOut size={22} className="text-red-400" />
          <span>Logout Session</span>
        </button>
      </div>
    </aside>
  )
}
