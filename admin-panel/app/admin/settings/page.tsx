'use client'

import { useState } from 'react'
import { Save, Shield, Key, Bell, Database, Globe, CheckCircle2, Lock } from 'lucide-react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

  // General Settings
  const [platformName, setPlatformName] = useState('Briams Technologies')
  const [supportEmail, setSupportEmail] = useState('support@briams.com')
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  // Security Settings
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // Notifications
  const [emailLeads, setEmailLeads] = useState(true)
  const [emailVerifications, setEmailVerifications] = useState(true)

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess(false)

    if (newPassword && newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }

    if (newPassword && newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      return
    }

    setPasswordSuccess(true)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setPasswordSuccess(false), 3000)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-1">Admin Settings</h1>
        <p className="text-sm text-text-secondary">Configure platform preferences, security, and integration settings.</p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-cure-green/10 border border-cure-green/20 text-cure-green text-sm flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 size={18} />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* General Settings */}
      <div className="glass rounded-2xl p-6 md:p-8 border border-card-border space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-card-border">
          <div className="p-2 rounded-xl bg-briams-cyan/10 text-briams-cyan">
            <Globe size={22} />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-white">General Preferences</h2>
            <p className="text-xs text-text-muted">Basic identity and operational configurations</p>
          </div>
        </div>

        <form onSubmit={handleSaveGeneral} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                Platform Name
              </label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full bg-surface border border-card-border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-briams-cyan focus:ring-1 focus:ring-briams-cyan transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                Support Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full bg-surface border border-card-border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-briams-cyan focus:ring-1 focus:ring-briams-cyan transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-card-border">
            <div>
              <div className="text-sm font-semibold text-white">Maintenance Mode</div>
              <div className="text-xs text-text-muted">Temporarily disable public signups and consultations</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-briams-orange"></div>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-briams-cyan hover:bg-briams-blue text-bg px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 text-sm shadow-glow-blue"
            >
              <Save size={18} /> Save General Settings
            </button>
          </div>
        </form>
      </div>

      {/* Security & Password */}
      <div className="glass rounded-2xl p-6 md:p-8 border border-card-border space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-card-border">
          <div className="p-2 rounded-xl bg-briams-orange/10 text-briams-orange">
            <Shield size={22} />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-white">Security & Password</h2>
            <p className="text-xs text-text-muted">Update your admin login password and authentication options</p>
          </div>
        </div>

        {passwordError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {passwordError}
          </div>
        )}

        {passwordSuccess && (
          <div className="p-4 rounded-xl bg-cure-green/10 border border-cure-green/20 text-cure-green text-sm flex items-center gap-2">
            <CheckCircle2 size={18} /> Password updated successfully!
          </div>
        )}

        <form onSubmit={handleSavePassword} className="space-y-5">
          <div>
            <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full max-w-md bg-surface border border-card-border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-briams-cyan focus:ring-1 focus:ring-briams-cyan transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface border border-card-border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-briams-cyan focus:ring-1 focus:ring-briams-cyan transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface border border-card-border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-briams-cyan focus:ring-1 focus:ring-briams-cyan transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-briams-orange hover:bg-briams-gold text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 text-sm shadow-glow-orange"
            >
              <Key size={18} /> Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Notifications */}
      <div className="glass rounded-2xl p-6 md:p-8 border border-card-border space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-card-border">
          <div className="p-2 rounded-xl bg-cure-green/10 text-cure-green">
            <Bell size={22} />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-white">Notifications</h2>
            <p className="text-xs text-text-muted">Manage system alert notifications</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-card-border">
            <div>
              <div className="text-sm font-semibold text-white">New Lead Notifications</div>
              <div className="text-xs text-text-muted">Receive email when a contact form is submitted</div>
            </div>
            <input
              type="checkbox"
              checked={emailLeads}
              onChange={(e) => setEmailLeads(e.target.checked)}
              className="w-5 h-5 rounded border-card-border bg-bg accent-briams-cyan cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-card-border">
            <div>
              <div className="text-sm font-semibold text-white">Provider Verification Alerts</div>
              <div className="text-xs text-text-muted">Receive email when a new CureVirtual provider requests verification</div>
            </div>
            <input
              type="checkbox"
              checked={emailVerifications}
              onChange={(e) => setEmailVerifications(e.target.checked)}
              className="w-5 h-5 rounded border-card-border bg-bg accent-briams-cyan cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
