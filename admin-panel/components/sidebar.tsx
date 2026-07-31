'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Home, Users, FileText, Settings, Zap, LogOut } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  
  const isActive = (path: string) => pathname === path

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (e) {
      console.error('Logout error', e)
    }
  }

  const NavLink = ({ href, icon: Icon, children }: any) => {
    const active = isActive(href)
    return (
      <Link 
        href={href} 
        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 font-medium text-sm
          ${active 
            ? 'bg-white/10 text-briams-cyan shadow-[0_0_20px_rgba(47,198,234,0.15)]' 
            : 'text-text-secondary hover:text-white hover:bg-white/5'
          }`}
      >
        <Icon size={18} className={active ? 'text-briams-cyan' : ''} />
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <aside className="w-72 bg-briams-navy border-r border-card-border min-h-screen flex flex-col relative z-20 shadow-glass-lg">
      <div className="p-6 pb-2 border-b border-card-border">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="p-1.5 rounded-xl bg-white/5 border border-white/10 flex-shrink-0 group-hover:bg-white/10 transition-colors">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
          </div>
          <span className="font-display font-semibold tracking-tight text-xl text-white group-hover:text-briams-orange transition-colors">
            Briams
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-briams-cyan bg-briams-cyan/10 border border-briams-cyan/20 rounded-full px-2 py-0.5 font-bold">
            Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-1.5">
          <NavLink href="/admin" icon={Home}>Dashboard</NavLink>
        </div>

        <div>
          <div className="px-3 text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">Briams Consultancy</div>
          <div className="space-y-1.5">
            <NavLink href="/admin/leads" icon={Users}>Leads</NavLink>
            <NavLink href="/admin/cms" icon={FileText}>CMS</NavLink>
          </div>
        </div>

        <div>
          <div className="px-3 text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">CureVirtual</div>
          <div className="space-y-1.5">
            <NavLink href="/admin/verifications" icon={Zap}>Verifications</NavLink>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-card-border space-y-1.5">
        <NavLink href="/admin/settings" icon={Settings}>Settings</NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 font-medium text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
