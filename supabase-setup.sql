create table if not exists public.agenda_estado (
  id text primary key,
  datos jsonb not null,
  actualizado_en timestamptz default now()
);

alter table public.agenda_estado enable row level security;

drop policy if exists "agenda_estado_select" on public.agenda_estado;
drop policy if exists "agenda_estado_insert" on public.agenda_estado;
drop policy if exists "agenda_estado_update" on public.agenda_estado;
revoke all on table public.agenda_estado from anon, authenticated;
