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
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl pb-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          <span className="text-gradient-cyan">Platform Settings</span> & Preferences
        </h1>
        <p className="text-sm text-slate-400 mt-1 font-medium">Configure system identity, admin credentials, and email notifications.</p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-bold flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 size={18} />
          <span>General platform settings updated successfully!</span>
        </div>
      )}

      {/* General Settings */}
      <div className="glass rounded-2xl p-6 md:p-8 border border-card-border space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-card-border">
          <div className="p-2.5 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
            <Globe size={22} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white">General Preferences</h2>
            <p className="text-xs text-slate-400">System identity and email parameters</p>
          </div>
        </div>

        <form onSubmit={handleSaveGeneral} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-2">
                Platform Name
              </label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-sky-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                Support Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="text-sm font-bold text-white">Maintenance Mode</div>
              <div className="text-xs text-slate-400">Temporarily pause public form submissions and discovery bookings</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl transition-all shadow-glow-blue flex items-center gap-2 text-sm hover:brightness-110"
            >
              <Save size={18} /> Save Settings
            </button>
          </div>
        </form>
      </div>

      {/* Security & Password */}
      <div className="glass rounded-2xl p-6 md:p-8 border border-card-border space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-card-border">
          <div className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <Shield size={22} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white">Security & Passwords</h2>
            <p className="text-xs text-slate-400">Update admin session credentials</p>
          </div>
        </div>

        {passwordError && (
          <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-bold">
            {passwordError}
          </div>
        )}

        {passwordSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-bold flex items-center gap-2">
            <CheckCircle2 size={18} /> Password updated successfully!
          </div>
        )}

        <form onSubmit={handleSavePassword} className="space-y-5">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl transition-all shadow-glow-orange flex items-center gap-2 text-sm hover:brightness-110"
            >
              <Key size={18} /> Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Notifications */}
      <div className="glass rounded-2xl p-6 md:p-8 border border-card-border space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-card-border">
          <div className="p-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Bell size={22} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white">Alert Preferences</h2>
            <p className="text-xs text-slate-400">Configure automated notification digests</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="text-sm font-bold text-white">Inbound Lead Alerts</div>
              <div className="text-xs text-slate-400">Receive email notification when a new contact or discovery call form is submitted</div>
            </div>
            <input
              type="checkbox"
              checked={emailLeads}
              onChange={(e) => setEmailLeads(e.target.checked)}
              className="w-5 h-5 rounded border-slate-700 bg-slate-900 accent-sky-400 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="text-sm font-bold text-white">Provider Verification Alerts</div>
              <div className="text-xs text-slate-400">Receive email notification when a CureVirtual provider submits credentials</div>
            </div>
            <input
              type="checkbox"
              checked={emailVerifications}
              onChange={(e) => setEmailVerifications(e.target.checked)}
              className="w-5 h-5 rounded border-slate-700 bg-slate-900 accent-sky-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
