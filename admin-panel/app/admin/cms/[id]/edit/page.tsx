import Link from 'next/link'
import { ArrowLeft, Save, Image as ImageIcon, Trash2 } from 'lucide-react'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

export default async function EditCaseStudyPage({ params }: { params: { id: string } }) {
  const id = params.id
  let caseStudy = null

  try {
    caseStudy = await prisma.caseStudy.findUnique({ where: { id } })
  } catch (e) {
    console.error("Prisma error, using mock data", e)
    // Mock data based on ID
    caseStudy = {
      id,
      title: id === '1' ? 'Healthcare App Modernization' : 'Fintech Dashboard Redesign',
      slug: id === '1' ? 'healthcare-app-modernization' : 'fintech-dashboard',
      published: id === '1',
      content: '## Overview\nThis is a great case study showing our capabilities.'
    }
  }

  if (!caseStudy) return notFound()

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/cms" className="p-2 rounded-lg bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors border border-white/10">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Edit Case Study</h1>
          <p className="text-sm text-text-secondary">Update the {caseStudy.title} details.</p>
        </div>
      </div>

      <div className="glass rounded-xl p-6 md:p-8 border border-card-border">
        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Title</label>
              <input 
                type="text" 
                defaultValue={caseStudy.title}
                className="input-glass w-full text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-briams-cyan"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Slug</label>
              <input 
                type="text" 
                defaultValue={caseStudy.slug || ''}
                className="input-glass w-full text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-briams-cyan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Cover Image</label>
              <div className="border border-card-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 bg-white/5">
                <div className="w-full sm:w-32 h-24 bg-bg rounded-lg border border-card-border flex items-center justify-center text-text-muted">
                  <ImageIcon size={24} />
                </div>
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="text-sm font-medium text-white">Current Image</div>
                  <div className="text-xs text-text-muted">Requires 1200x630px or similar ratio.</div>
                  <button type="button" className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                    Upload New Image
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Content (Markdown)</label>
              <textarea 
                rows={10}
                defaultValue={caseStudy.content || ''}
                className="input-glass w-full text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-briams-cyan resize-y font-mono text-sm leading-relaxed"
              ></textarea>
            </div>
            
            <div className="flex items-center gap-3">
              <input type="checkbox" id="published" defaultChecked={caseStudy.published} className="w-4 h-4 rounded border-card-border bg-bg accent-briams-cyan" />
              <label htmlFor="published" className="text-sm font-medium text-white select-none cursor-pointer">Published</label>
            </div>
          </div>

          <div className="pt-6 border-t border-card-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Link href="/admin/cms" className="w-full sm:w-auto bg-briams-cyan hover:bg-briams-blue text-bg px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-glow-blue">
                <Save size={18} /> Update Content
              </Link>
              <Link href="/admin/cms" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-medium transition-colors border border-white/10 text-center">
                Cancel
              </Link>
            </div>
            <button type="button" className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-400 font-medium transition-colors flex items-center justify-center gap-2">
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
