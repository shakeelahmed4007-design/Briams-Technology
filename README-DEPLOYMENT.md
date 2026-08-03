# Deployment Guide - Briams Technologies & Admin Control Center

This repository contains:
1. **Frontend**: Vite React SPA (`/`)
2. **Admin Panel**: Next.js 14 App Router (`/admin`, `/login`, `/api`)

---

## 🚀 Option 1: Vercel Deployment (Recommended - Zero Configuration)

This repository includes a pre-configured `vercel.json` file designed to build both the Vite Frontend and Next.js Admin Panel automatically in one Vercel deployment.

### Steps:
1. Push your code to GitHub / GitLab / Bitbucket.
2. Go to [Vercel Dashboard](https://vercel.com/new) and import the repository.
3. Keep default settings (Vercel will detect `vercel.json`).
4. Click **Deploy**.

Vercel will automatically route:
- `/` $\rightarrow$ Vite React Website
- `/admin` $\rightarrow$ Next.js Admin Panel
- `/login` $\rightarrow$ Admin Login Screen
- `/api/*` $\rightarrow$ Next.js API Routes (Leads, Verifications, CMS)

---

## 🌐 Option 2: Deploying to Separate Platforms (Vercel + Netlify / Render)

If you prefer to deploy the Frontend and Admin Panel separately:

### A. Deploy Next.js Admin Panel (Vercel / Render):
- Root Directory: `admin-panel`
- Build Command: `npm run build`
- Output Directory: `.next`
- Environment Variables:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
  DATABASE_URL=your-database-url
  ```

### B. Deploy Vite Frontend (Netlify / Vercel / Hostinger):
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variable:
  ```env
  VITE_API_URL=https://your-admin-panel-domain.vercel.app/api/leads
  ```

---

## 🛠️ Environment Variables Checklist

Make sure the following variables are added in your hosting dashboard:

| Variable Name | Value | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | `https://lqyvfemgvdzneoqwngtk.supabase.co` | Supabase Client URL |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1Ni...` | Supabase Public Key |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://lqyvfemgvdzneoqwngtk.supabase.co` | Admin Panel Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1Ni...` | Admin Panel Supabase Key |

---

## ⚡ Verified Local Production Builds
Both builds have been tested and verified:
- `Vite Client Build`: `dist/` created in 7s with 0 errors.
- `Next.js Admin Build`: 17/17 routes compiled cleanly with 0 errors.
