create or replace function public.confirmar_cita(p_token text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  estado jsonb;
  citas_nuevas jsonb;
  encontrada boolean;
begin
  select datos into estado
  from public.agenda_estado
  where id = 'principal'
  for update;

  select coalesce(jsonb_agg(
    case
      when cita->>'confirmacionToken' = p_token then
        cita || jsonb_build_object('confirmadaCliente', true, 'confirmadaEn', now()::text)
      else cita
    end
  ), '[]'::jsonb),
  bool_or(cita->>'confirmacionToken' = p_token)
  into citas_nuevas, encontrada
  from jsonb_array_elements(coalesce(estado->'citas', '[]'::jsonb)) cita;

  if coalesce(encontrada, false) then
    update public.agenda_estado
    set datos = jsonb_set(estado, '{citas}', citas_nuevas, true), actualizado_en = now()
    where id = 'principal';
    return true;
  end if;
  return false;
end;
$$;

revoke all on function public.confirmar_cita(text) from public;
grant execute on function public.confirmar_cita(text) to anon, authenticated;
