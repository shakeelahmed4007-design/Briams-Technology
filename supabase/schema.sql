/* Supabase schema for briams-technologies */

create extension if not exists pgcrypto;

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  name text,
  company text,
  email text,
  phone text,
  message text,
  scheduled_at timestamptz,
  status text default 'pending',
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text,
  created_at timestamptz default now()
);

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz default now()
);

create trigger trg_bookings_updated_at
  before update on bookings
  for each row execute procedure update_updated_at_column();
create trigger trg_waitlist_updated_at
  before update on waitlist
  for each row execute procedure update_updated_at_column();

