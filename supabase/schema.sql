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
  first_name text,
  last_name text,
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
create trigger trg_messages_updated_at
  before update on messages
  for each row execute procedure update_updated_at_column();
create trigger trg_waitlist_updated_at
  before update on waitlist
  for each row execute procedure update_updated_at_column();

alter table bookings enable row level security;
create policy "allow_public_insert_bookings" on bookings
  for insert with check (true);
create policy "allow_public_select_bookings" on bookings
  for select using (true);

alter table messages enable row level security;
create policy "allow_public_insert_messages" on messages
  for insert with check (true);
create policy "allow_public_select_messages" on messages
  for select using (true);

alter table waitlist enable row level security;
create policy "allow_public_insert_waitlist" on waitlist
  for insert with check (true);
create policy "allow_public_select_waitlist" on waitlist
  for select using (true);
