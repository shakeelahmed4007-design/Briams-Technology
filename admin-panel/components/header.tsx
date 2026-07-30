import { User, Bell, Search } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-briams-navy/80 backdrop-blur-md p-4 px-6 border-b border-card-border shadow-sm">
      <div className="flex-1 max-w-xl flex items-center gap-4">
        <div className="relative w-full max-w-md hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full bg-surface border border-card-border rounded-full py-2 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-briams-orange focus:ring-1 focus:ring-briams-orange/50 transition-all placeholder-text-muted"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors text-text-secondary hover:text-white">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 bg-briams-orange text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-briams-navy">3</span>
        </button>
        
        <div className="h-8 w-px bg-card-border mx-1"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-text-primary group-hover:text-briams-cyan transition-colors">Admin User</div>
            <div className="text-xs text-text-muted font-mono tracking-wide">Super Admin</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-briams-blue to-briams-cyan p-[2px]">
            <div className="w-full h-full rounded-full bg-briams-navy flex items-center justify-center text-white">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
