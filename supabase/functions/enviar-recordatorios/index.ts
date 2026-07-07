import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const VAPID_PUBLIC_KEY = "BPkgnzBm9iqn5ZYXETtJ37oweVMi4EEuXu-uoWxewe5MG3W9bxeftqIr75NoU9-JgWF9EcPzm-MptOXP4abYmzM";
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;
const cronSecret = Deno.env.get("CRON_SECRET")!;

webpush.setVapidDetails("mailto:ohmabelle@local.agenda", VAPID_PUBLIC_KEY, vapidPrivateKey);
const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

function fechaCita(cita: Record<string, unknown>) {
  // Quintana Roo permanece en UTC-5 durante todo el año.
  return new Date(`${cita.fecha}T${cita.hora}:00-05:00`);
}

async function yaEnviado(citaId: string, minutos: number, endpoint: string) {
  const { data } = await supabase.from("push_envios").select("id").eq("cita_id", citaId).eq("minutos_antes", minutos).eq("endpoint", endpoint).maybeSingle();
  return !!data;
}

Deno.serve(async req => {
  if (req.headers.get("authorization") !== `Bearer ${cronSecret}`) return new Response("No autorizado", { status: 401 });
  if (!vapidPrivateKey) return new Response("Falta VAPID_PRIVATE_KEY", { status: 500 });

  const { data: fila, error: errorAgenda } = await supabase.from("agenda_estado").select("datos").eq("id", "principal").single();
  if (errorAgenda) return new Response(errorAgenda.message, { status: 500 });
  const { data: suscripciones, error: errorPush } = await supabase.from("push_suscripciones").select("*").eq("activa", true);
  if (errorPush) return new Response(errorPush.message, { status: 500 });

  const ahora = new Date();
  const citas = Array.isArray(fila?.datos?.citas) ? fila.datos.citas : [];
  let enviados = 0;

  for (const cita of citas) {
    if (!cita?.id || !cita?.fecha || !cita?.hora || ["Cancelada", "Atendida"].includes(cita.estado)) continue;
    const diferencia = (fechaCita(cita).getTime() - ahora.getTime()) / 60000;
    // 5 minutos es temporal para comprobar el recorrido completo de las notificaciones.
    const recordatorio = [60, 30, 5].find(minutos => diferencia > minutos - 3 && diferencia <= minutos + 3);
    if (!recordatorio) continue;

    for (const suscripcion of suscripciones || []) {
      const citaId = String(cita.id);
      if (await yaEnviado(citaId, recordatorio, suscripcion.endpoint)) continue;
      const payload = JSON.stringify({
        title: `Cita en ${recordatorio} minutos`,
        body: `${cita.cliente} · ${cita.servicio || "Servicio"} · ${cita.hora}`,
        tag: `cita-${citaId}-${recordatorio}`,
        url: "./"
      });
      try {
        await webpush.sendNotification({ endpoint: suscripcion.endpoint, keys: { p256dh: suscripcion.p256dh, auth: suscripcion.auth } }, payload);
        await supabase.from("push_envios").insert({ cita_id: citaId, minutos_antes: recordatorio, endpoint: suscripcion.endpoint });
        enviados += 1;
      } catch (error) {
        const pushError = error as { statusCode?: number };
        const status = Number(pushError.statusCode || 0);
        if (status === 404 || status === 410) await supabase.from("push_suscripciones").update({ activa: false }).eq("endpoint", suscripcion.endpoint);
        console.error("No se pudo enviar push", status, error);
      }
    }
  }

  return Response.json({ ok: true, enviados, revisadas: citas.length, fecha: ahora.toISOString() });
});
