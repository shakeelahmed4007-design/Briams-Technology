'use client'

import { useState, useRef, useEffect } from 'react'
import { User, Bell, Search, LogOut, CheckCheck, Zap, Users, Calendar, ArrowRight, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface NotificationItem {
  id: string
  title: string
  desc: string
  time: string
  read: boolean
  type: 'lead' | 'verification' | 'booking'
  link: string
}

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'New Lead Submitted',
    desc: 'Sara Ahmed submitted a contact inquiry form.',
    time: '5 min ago',
    read: false,
    type: 'lead',
    link: '/admin/leads'
  },
  {
    id: '2',
    title: 'New Verification Request',
    desc: 'Dr. Usman uploaded credentials for CureVirtual.',
    time: '45 min ago',
    read: false,
    type: 'verification',
    link: '/admin/verifications'
  },
  {
    id: '3',
    title: 'Consultation Booked',
    desc: 'Ali Raza booked a 30-min strategy call.',
    time: '2 hours ago',
    read: false,
    type: 'booking',
    link: '/admin/leads'
  }
]

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)
  const popoverRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (e) {
      console.error('Logout error', e)
    } finally {
      window.location.href = '/login'
    }
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: string, link: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    setShowNotifications(false)
    router.push(link)
  }

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'lead':
        return <Users size={18} className="text-sky-400" />
      case 'verification':
        return <Zap size={18} className="text-emerald-400" />
      case 'booking':
        return <Calendar size={18} className="text-amber-400" />
      default:
        return <Bell size={18} className="text-slate-400" />
    }
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-slate-950/90 backdrop-blur-xl p-4 px-6 border-b border-card-border shadow-sm">
      {/* Mobile Menu & Logo */}
      <div className="flex lg:hidden items-center gap-3">
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-slate-800"
          >
            <Menu size={24} />
          </button>
        )}
        <Link href="/admin" className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-gradient-to-tr from-briams-blue/40 to-briams-cyan/30 border border-briams-cyan/40 shadow-glow-blue">
            <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" style={{ width: 'auto', height: 'auto' }} />
          </div>
        </Link>
      </div>

      {/* Search Input */}
      <div className="flex-1 max-w-xl flex items-center gap-4 ml-4 lg:ml-0">
        <div className="relative w-full max-w-lg hidden md:block">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" />
          <input 
            type="text" 
            placeholder="Search leads, verifications, CMS..." 
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-full py-2.5 pl-12 pr-4 text-base text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 transition-all font-medium"
          />
        </div>
      </div>
      
      {/* Header Actions */}
      <div className="flex items-center gap-5">
        {/* Notification Bell Dropdown */}
        <div className="relative" ref={popoverRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            className={`relative p-3 rounded-2xl border transition-all duration-200 ${
              showNotifications 
                ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_20px_rgba(47,198,234,0.3)]' 
                : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:text-white hover:border-sky-400/50 hover:bg-slate-800'
            }`}
          >
            <Bell size={22} className="text-sky-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-950 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-88 sm:w-104 glass rounded-2xl border border-card-border shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-4 border-b border-card-border flex items-center justify-between bg-slate-900/90">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display font-extrabold text-white text-base">Notifications Center</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs font-black font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1 font-bold transition-colors"
                  >
                    <CheckCheck size={16} />
                    <span>Mark read</span>
                  </button>
                )}
              </div>

              <div className="max-h-88 overflow-y-auto divide-y divide-card-border/60">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm font-medium">
                    No new notifications right now.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => markAsRead(item.id, item.link)}
                      className={`p-4 cursor-pointer transition-colors flex items-start gap-3.5 hover:bg-white/5 ${
                        !item.read ? 'bg-sky-500/10' : ''
                      }`}
                    >
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 flex-shrink-0 mt-0.5">
                        {getNotificationIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className={`text-sm font-bold truncate ${!item.read ? 'text-white' : 'text-slate-300'}`}>
                            {item.title}
                          </p>
                          <span className="text-xs text-slate-400 flex-shrink-0 font-mono">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                      {!item.read && (
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="p-3.5 border-t border-card-border bg-slate-900/80 text-center">
                <Link 
                  href="/admin/leads" 
                  onClick={() => setShowNotifications(false)}
                  className="text-sm font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>View all incoming leads</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-8 w-px bg-card-border/60 mx-1"></div>
        
        {/* Profile Avatar & Logout */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <div className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">Admin User</div>
              <div className="text-xs text-gradient-cta font-mono font-extrabold tracking-wide">Super Admin</div>
            </div>
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-amber-500 p-[2px] shadow-glow-blue">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white">
                <User size={20} className="text-sky-300" />
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2.5 px-3 rounded-2xl bg-red-500/15 border border-red-500/30 hover:bg-red-500/25 text-red-400 transition-colors ml-1 flex items-center gap-2 text-sm font-extrabold"
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
