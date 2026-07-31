'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Lock, Mail, Eye, EyeOff, LogIn, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }

      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 relative overflow-hidden font-body text-text-primary">
      {/* Dynamic Background Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-briams-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-briams-orange/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-card-border mb-4 shadow-glow-blue">
            <Image src="/logo.png" alt="Briams Logo" width={48} height={48} className="object-contain" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">
            Briams <span className="text-briams-cyan">Admin</span>
          </h1>
          <p className="text-sm text-text-secondary mt-1">Sign in to access the control panel</p>
        </div>

        {/* Login Card */}
        <div className="glass rounded-2xl p-6 sm:p-8 border border-card-border shadow-glass-lg backdrop-blur-xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3 animate-in fade-in duration-200">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                Username or Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@briams.com"
                  className="w-full bg-surface border border-card-border rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-briams-cyan focus:ring-1 focus:ring-briams-cyan transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface border border-card-border rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder-white/20 focus:outline-none focus:border-briams-cyan focus:ring-1 focus:ring-briams-cyan transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-briams-cyan to-briams-blue hover:opacity-90 text-bg py-3.5 rounded-xl font-display font-semibold transition-all shadow-glow-blue flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-6 pt-6 border-t border-card-border/60 text-center">
            <p className="text-xs text-text-muted">
              Default Credentials: <span className="text-white font-mono font-medium">admin@briams.com</span> / <span className="text-white font-mono font-medium">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
