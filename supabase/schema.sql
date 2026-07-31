-- ==============================================================================
-- Supabase Database Schema for Briams Technologies
-- Run this script in your Supabase SQL Editor (Dashboard > SQL Editor)
-- to create tables and disable RLS restrictions.
-- ==============================================================================

create extension if not exists pgcrypto;

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 1. Bookings Table (Discovery / Consultation Calls)
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  name text,
  company text,
  email text not null,
  phone text,
  message text,
  scheduled_at timestamptz,
  status text default 'pending',
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Messages Table (Contact Form Submissions)
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  message text not null,
  status text default 'unread',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Waitlist Table (CureVirtual Product Signups)
create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  status text default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Leads Table (Unified view for Admin Panel)
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text default 'Anonymous',
  email text not null,
  phone text,
  company text,
  message text,
  source text default 'Website',
  status text default 'NEW',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ------------------------------------------------------------------------------
-- DISABLE Row Level Security (RLS) on all tables so inserts/selects are NEVER blocked
-- ------------------------------------------------------------------------------
alter table bookings disable row level security;
alter table messages disable row level security;
alter table waitlist disable row level security;
alter table leads disable row level security;
