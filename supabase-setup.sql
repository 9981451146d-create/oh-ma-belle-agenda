create table if not exists public.agenda_estado (
  id text primary key,
  datos jsonb not null,
  actualizado_en timestamptz default now()
);

alter table public.agenda_estado enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on table public.agenda_estado to anon, authenticated;

drop policy if exists "agenda_estado_select" on public.agenda_estado;
drop policy if exists "agenda_estado_insert" on public.agenda_estado;
drop policy if exists "agenda_estado_update" on public.agenda_estado;

create policy "agenda_estado_select"
on public.agenda_estado
for select
to anon
using (true);

create policy "agenda_estado_insert"
on public.agenda_estado
for insert
to anon
with check (true);

create policy "agenda_estado_update"
on public.agenda_estado
for update
to anon
using (true)
with check (true);
