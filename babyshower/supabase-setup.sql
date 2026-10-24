-- ================================================================
-- Boss Baby 2 Baby Shower — Supabase setup
-- Run in: Supabase Dashboard > SQL Editor > New query > Run
-- Safe to re-run: drops + recreates everything it owns.
-- ================================================================

drop view if exists public.public_roster;
drop function if exists public.get_rsvp_by_email(text);
drop table if exists public.rsvps cascade;
drop table if exists public.site_config cascade;

-- ============ RSVPs ============
create table public.rsvps (
  email       text primary key,
  name        text not null,
  attending   text not null check (attending in ('yes','maybe','no')),
  adults      int  not null default 1 check (adults between 0 and 15),
  kids        int  not null default 0 check (kids between 0 and 15),
  note        text,
  updated_at  timestamptz not null default now()
);

alter table public.rsvps enable row level security;

-- guests can file + update RSVPs (upsert by email), but NOT read the table
create policy "public can insert rsvps" on public.rsvps
  for insert to anon with check (true);
create policy "public can update rsvps" on public.rsvps
  for update to anon using (true) with check (true);

-- admin (logged in) can do everything
create policy "authenticated full access" on public.rsvps
  for all to authenticated using (true) with check (true);

-- ============ public roster view (names + counts ONLY) ============
create view public.public_roster
  with (security_invoker = off) as
  select name, attending, adults, kids
  from public.rsvps
  where attending in ('yes','maybe')
  order by attending, name;

grant select on public.public_roster to anon, authenticated;

-- ============ email lookup for the "Already RSVP'd? Update it" flow ======
-- Returns a single RSVP only when the exact email is known.
-- No way to list or browse; emails are never enumerable from the browser.
create function public.get_rsvp_by_email(p_email text)
returns table (email text, name text, attending text, adults int, kids int, note text)
language sql
security definer
set search_path = public
as $$
  select email, name, attending, adults, kids, note
  from public.rsvps
  where lower(email) = lower(trim(p_email))
$$;

grant execute on function public.get_rsvp_by_email(text) to anon, authenticated;

-- ============ site config (visibility toggles, time, venue, registry) ====
create table public.site_config (
  id     int primary key default 1 check (id = 1),
  config jsonb not null default '{}'::jsonb
);

alter table public.site_config enable row level security;

create policy "public can read config" on public.site_config
  for select to anon, authenticated using (true);
create policy "admin writes config" on public.site_config
  for insert to authenticated with check (true);
create policy "admin updates config" on public.site_config
  for update to authenticated using (true) with check (true);

insert into public.site_config (id, config) values (1, '{}');
