-- Run this in your Supabase SQL editor to set up the database

-- Progress tracking table
create table if not exists public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  technique_id integer not null,
  status text check (status in ('none', 'aware', 'drilling', 'owned')) not null default 'none',
  updated_at timestamptz default now(),
  unique(user_id, technique_id)
);

-- Row level security — users can only see and edit their own progress
alter table public.progress enable row level security;

create policy "Users can view own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.progress for update
  using (auth.uid() = user_id);

create policy "Users can delete own progress"
  on public.progress for delete
  using (auth.uid() = user_id);
