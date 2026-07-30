import Link from 'next/link'
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react'

export default function NewCaseStudyPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/cms" className="p-2 rounded-lg bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors border border-white/10">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">New Case Study</h1>
          <p className="text-sm text-text-secondary">Create a new case study for the frontend.</p>
        </div>
      </div>

      <div className="glass rounded-xl p-6 md:p-8 border border-card-border">
        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Title</label>
              <input 
                type="text" 
                placeholder="e.g. Healthcare App Modernization" 
                className="input-glass w-full text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-briams-cyan"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Slug</label>
              <input 
                type="text" 
                placeholder="healthcare-app-modernization" 
                className="input-glass w-full text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-briams-cyan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Cover Image</label>
              <div className="border-2 border-dashed border-card-border rounded-xl p-8 flex flex-col items-center justify-center text-text-muted bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <ImageIcon size={32} className="mb-3 opacity-50 group-hover:opacity-100 group-hover:text-briams-cyan transition-all" />
                <span className="text-sm">Click to upload an image</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Content (Markdown)</label>
              <textarea 
                rows={10}
                placeholder="Write the case study content here..." 
                className="input-glass w-full text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-briams-cyan resize-y font-mono text-sm leading-relaxed"
              ></textarea>
            </div>
            
            <div className="flex items-center gap-3">
              <input type="checkbox" id="published" className="w-4 h-4 rounded border-card-border bg-bg accent-briams-cyan" />
              <label htmlFor="published" className="text-sm font-medium text-white select-none cursor-pointer">Publish immediately</label>
            </div>
          </div>

          <div className="pt-6 border-t border-card-border flex items-center gap-4">
            <Link href="/admin/cms" className="bg-briams-cyan hover:bg-briams-blue text-bg px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-glow-blue flex-1 sm:flex-none">
              <Save size={18} /> Save Case Study
            </Link>
            <Link href="/admin/cms" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-medium transition-colors border border-white/10 flex-1 sm:flex-none text-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
