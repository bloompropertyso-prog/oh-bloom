-- Bloom Admin contact form — leads table setup
--
-- HOW TO RUN THIS:
-- 1. Open the Supabase project used elsewhere in this workspace
--    (the one behind Reliable Flow Plumbing) -> SQL Editor -> New Query
-- 2. Paste this whole file in and click "Run"

create table public.bloom_admin_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  status text not null default 'New',
  notes text
);

alter table public.bloom_admin_leads enable row level security;

-- Lets the public contact form (using the anon/public key, never the
-- service_role key) insert new rows. No select/update/delete policy is
-- created, so existing leads stay unreadable and unmodifiable to anyone
-- browsing the site — only inserts are allowed.
create policy "Public can submit leads"
  on public.bloom_admin_leads
  for insert
  to anon
  with check (true);
