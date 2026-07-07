begin;

update public.agenda_estado
set datos = jsonb_set(
  jsonb_set(
    jsonb_set(datos, '{citas}', '[]'::jsonb, true),
    '{clientas}', '[]'::jsonb, true
  ),
  '{bloqueos}', '[]'::jsonb, true
),
actualizado_en = now()
where id = 'principal';

-- Elimina solamente el historial de recordatorios de las citas de prueba.
-- Conserva los celulares registrados para futuras notificaciones.
delete from public.push_envios;

commit;
