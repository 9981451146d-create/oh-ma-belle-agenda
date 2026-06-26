const CLAVE = "oh-ma-belle-agenda-v1";
const SUPABASE_URL = "https://vgmyzhmbuteixvlvwxjc.supabase.co";
const SUPABASE_KEY = "sb_publishable_5b7OS0T91SbgnCog14YXEw_tr7lD3WT";
const SUPABASE_TABLA = "agenda_estado";
const SUPABASE_ID = "principal";
const usuariosBase = [
  { usuario: "maria", clave: "1234", rol: "soloVista", nombre: "Maestra Maria" },
  { usuario: "rosa", clave: "0000", rol: "editora", nombre: "Rosa Polet" }
];

const serviciosBase = [
  { nombre: "Pedicure", duracion: 60, precio: 350, color: "rosa" },
  { nombre: "Manicure", duracion: 45, precio: 280, color: "dorado" },
  { nombre: "Pestanas", duracion: 90, precio: 650, color: "uva" },
  { nombre: "Masajes", duracion: 60, precio: 500, color: "verde" },
  { nombre: "Cejas", duracion: 30, precio: 180, color: "rosa" },
  { nombre: "Peinados", duracion: 75, precio: 450, color: "dorado" },
  { nombre: "Tintes", duracion: 120, precio: 900, color: "uva" }
];

const imagenesServiciosBase = {
  Pedicure: "assets/services/pedicure.jpg",
  Manicure: "assets/services/manicure.jpg",
  Pestanas: "assets/services/pestanas.jpg",
  Masajes: "assets/services/masajes.jpg",
  Cejas: "assets/services/cejas.jpg",
  Peinados: "assets/services/peinados.jpg",
  Tintes: "assets/services/tintes.jpg"
};

let usuarios = cargar("usuarios") || usuariosBase.map(usuario => ({ ...usuario }));
let usuarioActual = null;
let servicios = cargar("servicios") || serviciosBase;
let citas = cargar("citas") || [];
let bloqueos = cargar("bloqueos") || [];
let personal = cargar("personal") || [];
let modoOscuro = cargar("modoOscuro") || false;
let remotoListo = false;
let guardandoRemoto = false;

normalizarDatos();

function cargar(nombre) {
  const datos = localStorage.getItem(`${CLAVE}-${nombre}`);
  return datos ? JSON.parse(datos) : null;
}

function guardar() {
  localStorage.setItem(`${CLAVE}-usuarios`, JSON.stringify(usuarios));
  localStorage.setItem(`${CLAVE}-servicios`, JSON.stringify(servicios));
  localStorage.setItem(`${CLAVE}-citas`, JSON.stringify(citas));
  localStorage.setItem(`${CLAVE}-bloqueos`, JSON.stringify(bloqueos));
  localStorage.setItem(`${CLAVE}-personal`, JSON.stringify(personal));
  localStorage.setItem(`${CLAVE}-modoOscuro`, JSON.stringify(modoOscuro));
  if (remotoListo) guardarRemoto();
}

function estadoActual() {
  return { usuarios, servicios, citas, bloqueos, personal, modoOscuro, actualizadoEn: new Date().toISOString() };
}

function aplicarEstado(datos) {
  if (!datos) return;
  usuarios = Array.isArray(datos.usuarios) ? datos.usuarios : usuarios;
  servicios = Array.isArray(datos.servicios) ? datos.servicios : servicios;
  citas = Array.isArray(datos.citas) ? datos.citas : citas;
  bloqueos = Array.isArray(datos.bloqueos) ? datos.bloqueos : bloqueos;
  personal = Array.isArray(datos.personal) ? datos.personal : personal;
  modoOscuro = typeof datos.modoOscuro === "boolean" ? datos.modoOscuro : modoOscuro;
  normalizarDatos();
  aplicarModoOscuro();
}

async function supabaseRest(ruta, opciones = {}) {
  const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/${ruta}`, {
    ...opciones,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(opciones.headers || {})
    }
  });
  if (!respuesta.ok) throw new Error(await respuesta.text());
  if (respuesta.status === 204) return null;
  return respuesta.json();
}

async function cargarRemoto() {
  try {
    const filas = await supabaseRest(`${SUPABASE_TABLA}?id=eq.${SUPABASE_ID}&select=datos`);
    if (filas?.[0]?.datos) aplicarEstado(filas[0].datos);
    remotoListo = true;
    await guardarRemoto();
    mostrarMensaje("Datos conectados", "La agenda ya esta sincronizada.", "ok");
    return true;
  } catch (error) {
    remotoListo = false;
    console.warn("Supabase aun no esta listo:", error);
    mostrarMensaje("Falta conectar base", "Crea la tabla en Supabase para guardar compartido.", "alerta");
    return false;
  }
}

async function guardarRemoto() {
  if (guardandoRemoto) return;
  guardandoRemoto = true;
  try {
    await supabaseRest(`${SUPABASE_TABLA}?on_conflict=id`, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify([{ id: SUPABASE_ID, datos: estadoActual() }])
    });
  } catch (error) {
    remotoListo = false;
    console.warn("No se pudo guardar en Supabase:", error);
  } finally {
    guardandoRemoto = false;
  }
}

function normalizarDatos() {
  usuarios = usuariosBase.map(base => {
    const guardado = usuarios.find(item => item.usuario === base.usuario);
    return { ...base, clave: guardado?.clave || base.clave };
  });
  servicios = servicios.map((servicio, indice) => ({
    nombre: servicio.nombre || "Servicio",
    descripcion: servicio.descripcion || "",
    confirmacion: servicio.confirmacion || "",
    imagen: servicio.imagen || imagenesServiciosBase[servicio.nombre] || "",
    duracion: Number(servicio.duracion || 30),
    precio: Number(servicio.precio || 0),
    capacidad: Number(servicio.capacidad || 1),
    anticipo: Number(servicio.anticipo || 0),
    pagoEfectivo: servicio.pagoEfectivo !== false,
    pagoTransferencia: !!servicio.pagoTransferencia,
    color: servicio.color || ["rosa", "dorado", "uva", "verde"][indice % 4],
    personalAsignado: Array.isArray(servicio.personalAsignado) ? servicio.personalAsignado : [],
    horarios: servicio.horarios || horariosBase()
  }));
  personal = personal.map(persona => ({
    id: persona.id || idNuevo(),
    nombre: persona.nombre || "Personal",
    descripcion: persona.descripcion || "",
    email: persona.email || "",
    foto: persona.foto || "",
    fraccion: Number(persona.fraccion || 30),
    activo: persona.activo !== false,
    horarios: persona.horarios || horariosBase()
  }));
  citas = citas.map(cita => ({
    ...cita,
    abonos: Array.isArray(cita.abonos) ? cita.abonos : [],
    liquidada: !!cita.liquidada || (Number(cita.anticipo || 0) >= Number(cita.precio || 0) && Number(cita.precio || 0) > 0)
  }));
  guardar();
}

function horariosBase() {
  return ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"].map(dia => ({
    dia,
    activo: !["Domingo"].includes(dia),
    inicio: "09:00",
    fin: "18:00"
  }));
}

function hoy() {
  const fecha = new Date();
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}-${String(fecha.getDate()).padStart(2, "0")}`;
}

function horaActual() {
  const fecha = new Date();
  return `${String(fecha.getHours()).padStart(2, "0")}:${String(fecha.getMinutes()).padStart(2, "0")}`;
}

function idNuevo() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function usuarioSeleccionado() {
  const usuario = document.getElementById("usuario").value;
  const campoClave = document.getElementById("campoClave");
  const clave = document.getElementById("clave");
  const mensaje = document.getElementById("mensaje");
  campoClave.style.display = usuario ? "block" : "none";
  clave.value = "";
  mensaje.textContent = "";
}

async function iniciarSesion() {
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value.trim();
  const existe = usuarios.find(item => item.usuario === usuario && item.clave === clave);
  if (!existe) {
    document.getElementById("mensaje").textContent = "Usuario o contrasena incorrectos";
    return;
  }

  usuarioActual = existe;
  document.body.classList.toggle("modo-solo-ver", !puedeEditar());
  document.getElementById("rolActual").textContent = puedeEditar() ? "Rosa Polet" : "Maestra Maria";
  document.getElementById("pantallaLogin").style.display = "none";
  document.getElementById("sistema").style.display = "flex";
  await cargarRemoto();
  mostrarInicio();
}

function cerrarSesion() {
  usuarioActual = null;
  document.body.classList.remove("modo-solo-ver");
  document.getElementById("pantallaLogin").style.display = "grid";
  document.getElementById("sistema").style.display = "none";
  document.getElementById("usuario").value = "";
  document.getElementById("clave").value = "";
  usuarioSeleccionado();
}

function puedeEditar() {
  return usuarioActual?.rol === "editora";
}

function exigirEdicion() {
  if (puedeEditar()) return true;
  mostrarMensaje("Solo lectura", "Este usuario solo puede ver la agenda.", "alerta");
  return false;
}

function mostrarMensaje(titulo, texto = "", tipo = "ok") {
  const modal = document.getElementById("mensajeGuardado");
  document.getElementById("tituloMensaje").textContent = titulo;
  document.getElementById("textoMensaje").textContent = texto;
  modal.className = `modal ${tipo}`;
  modal.style.display = "grid";
  setTimeout(() => modal.style.display = "none", 1700);
}

function activarMenu(seccion) {
  document.querySelectorAll(".sidebar button[data-seccion]").forEach(btn => {
    btn.classList.toggle("nav-activo", btn.dataset.seccion === seccion);
  });
}

function formatoFecha(fecha) {
  if (!fecha) return "-";
  const [y, m, d] = fecha.split("-");
  return `${d}/${m}/${y}`;
}

function dinero(valor) {
  return `$${Number(valor || 0).toFixed(0)}`;
}

function citasDeFecha(fecha) {
  return citas.filter(cita => cita.fecha === fecha).sort((a, b) => a.hora.localeCompare(b.hora));
}

function citasActivas(fecha = null) {
  return citas.filter(cita => cita.estado !== "Cancelada" && (!fecha || cita.fecha === fecha));
}

function citasCanceladas() {
  return citas.filter(cita => cita.estado === "Cancelada").sort((a, b) => String(b.canceladaEn || "").localeCompare(String(a.canceladaEn || "")));
}

function servicioPorNombre(nombre) {
  return servicios.find(servicio => servicio.nombre === nombre) || servicios[0];
}

function resumenDia() {
  const delDia = citasDeFecha(hoy());
  const activas = delDia.filter(cita => cita.estado !== "Cancelada");
  const canceladasHoy = citasCanceladas().filter(cita => cita.canceladaEn?.slice(0, 10) === hoy());
  const pendientes = citas.filter(cita => cita.estado === "Pendiente" && cita.fecha >= hoy());
  const ingresos = activas.reduce((suma, cita) => suma + Number(cita.precio || 0), 0);
  return { activas, canceladasHoy, pendientes, ingresos };
}

function kpi(titulo, valor, texto, icono, clase = "") {
  return `<article class="kpi ${clase}">
    <div><span>${titulo}</span><strong>${valor}</strong><p>${texto}</p></div>
    <i><img src="assets/icons/${icono}.png" alt=""></i>
  </article>`;
}

function mostrarInicio(fecha = hoy()) {
  activarMenu("inicio");
  const resumen = resumenDia();
  const canceladas = citasCanceladas().slice(0, 5);
  const citasDia = citasDeFecha(fecha);

  document.getElementById("contenido").innerHTML = `
    <div class="kpi-grid">
      ${kpi("Turnos de Hoy", resumen.activas.length, "Reservas para hoy", "turnos-hoy", "morado")}
      ${kpi("Cancelaciones Hoy", resumen.canceladasHoy.length, "Cancelaciones realizadas hoy", "cancelaciones-hoy", "dorado")}
      ${kpi("Turnos Pendientes", resumen.pendientes.length, "Total de proximos turnos", "turnos-pendientes", "morado")}
      ${kpi("Ingresos del Dia", dinero(resumen.ingresos), "Pagos estimados por revisar", "ingresos-dia", "verde")}
    </div>

    <section class="panel soft">
      <h2>Ultimas Cancelaciones</h2>
      <p>Listado de reservas canceladas recientemente. Puedes contactar rapidamente a las clientas para reprogramar.</p>
      <table>
        <thead><tr><th>Cliente</th><th>Contacto</th><th>Servicio</th><th>Personal</th><th>Fecha/Hora Original</th><th>Cancelado</th></tr></thead>
        <tbody>${canceladas.map(cita => `<tr><td>${cita.cliente}</td><td>${cita.telefono || "-"}</td><td>${cita.servicio}</td><td>${cita.personal || "Maestra"}</td><td>${formatoFecha(cita.fecha)} ${cita.hora}</td><td>${cita.canceladaEn || "-"}</td></tr>`).join("") || `<tr><td colspan="6" class="vacio">No hay cancelaciones recientes</td></tr>`}</tbody>
      </table>
    </section>

    <section class="agenda-grid">
      <article class="panel agenda-dia">
        <div class="section-head">
          <button type="button" onclick="cambiarDia('${fecha}', -1)">‹</button>
          <h2>${formatoFecha(fecha)}</h2>
          <button type="button" onclick="cambiarDia('${fecha}', 1)">›</button>
          <input type="date" value="${fecha}" onchange="mostrarInicio(this.value)">
        </div>
        ${formularioCita(fecha)}
        <div class="timeline">${pintarCitas(citasDia)}</div>
      </article>

      <article class="panel fotos-panel">
        <h2>Servicios destacados</h2>
        <div class="foto-grid">
          ${servicios.map(servicio => `<button type="button" class="foto-card ${servicio.color}" onclick="prepararServicio('${servicio.nombre}')"><span>${servicio.nombre}</span><small>${servicio.duracion} min · ${dinero(servicio.precio)}</small></button>`).join("")}
        </div>
      </article>
    </section>`;
}

function formularioCita(fecha) {
  if (!puedeEditar()) return `<p class="solo-ver">Modo solo lectura: puedes revisar las citas, pero no modificarlas.</p>`;
  return `<form class="form-grid" onsubmit="guardarCita(event)">
    <input type="date" id="citaFecha" value="${fecha}">
    <input type="time" id="citaHora" value="${horaActual()}">
    <input id="citaCliente" placeholder="Cliente">
    <input id="citaTelefono" placeholder="Telefono">
    <select id="citaServicio" onchange="actualizarPrecioServicio()">${servicios.map(s => `<option>${s.nombre}</option>`).join("")}</select>
    <input id="citaPrecio" type="number" min="0" placeholder="Precio" value="${servicios[0]?.precio || 0}">
    <select id="citaEstado"><option>Pendiente</option><option>Confirmada</option><option>Atendida</option></select>
    <button type="submit">Agregar cita</button>
  </form>`;
}

function pintarCitas(lista) {
  return lista.map(cita => `<article class="cita ${cita.estado.toLowerCase()}">
    <time>${cita.hora}</time>
    <div>
      <strong>${cita.cliente}</strong>
      <span>${cita.servicio} · ${cita.telefono || "Sin telefono"}</span>
      <small>${cita.estado} · ${dinero(cita.precio)}</small>
    </div>
    <div class="acciones-cita">
      ${puedeEditar() && cita.estado !== "Cancelada" ? `<button type="button" onclick="marcarAtendida(${cita.id})">Atendida</button><button type="button" onclick="cancelarCita(${cita.id})">Cancelar</button><button type="button" onclick="eliminarCita(${cita.id})">Eliminar</button>` : ""}
    </div>
  </article>`).join("") || `<div class="vacio agenda-vacia">No hay citas para este dia.</div>`;
}

function cambiarDia(fecha, dias) {
  const base = new Date(`${fecha}T00:00:00`);
  base.setDate(base.getDate() + dias);
  mostrarInicio(`${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}-${String(base.getDate()).padStart(2, "0")}`);
}

function prepararServicio(nombre) {
  mostrarInicio();
  setTimeout(() => {
    const select = document.getElementById("citaServicio");
    if (!select) return;
    select.value = nombre;
    actualizarPrecioServicio();
    document.getElementById("citaCliente")?.focus();
  }, 20);
}

function actualizarPrecioServicio() {
  const servicio = servicioPorNombre(document.getElementById("citaServicio").value);
  document.getElementById("citaPrecio").value = servicio.precio || 0;
}

function guardarCita(event) {
  event.preventDefault();
  if (!exigirEdicion()) return;
  const cita = {
    id: idNuevo(),
    fecha: document.getElementById("citaFecha").value,
    hora: document.getElementById("citaHora").value,
    cliente: document.getElementById("citaCliente").value.trim(),
    telefono: document.getElementById("citaTelefono").value.trim(),
    servicio: document.getElementById("citaServicio").value,
    precio: Number(document.getElementById("citaPrecio").value || 0),
    estado: document.getElementById("citaEstado").value,
    personal: "Maestra"
  };
  if (!cita.fecha || !cita.hora || !cita.cliente) return mostrarMensaje("Faltan datos", "Agrega fecha, hora y cliente.", "alerta");
  if (bloqueos.some(b => b.fecha === cita.fecha && b.hora === cita.hora)) return mostrarMensaje("Horario bloqueado", "Ese horario no esta disponible.", "alerta");
  citas.push(cita);
  guardar();
  mostrarMensaje("Cita guardada", "La reserva quedo registrada.");
  mostrarInicio(cita.fecha);
}

function marcarAtendida(id) {
  if (!exigirEdicion()) return;
  const cita = citas.find(item => item.id === id);
  if (cita) cita.estado = "Atendida";
  guardar();
  mostrarInicio(cita?.fecha || hoy());
}

function cancelarCita(id) {
  if (!exigirEdicion()) return;
  const cita = citas.find(item => item.id === id);
  if (!cita) return;
  cita.estado = "Cancelada";
  cita.canceladaEn = `${hoy()} ${horaActual()}`;
  guardar();
  mostrarMensaje("Cita cancelada", "Quedo en el historial de cancelaciones.");
  mostrarInicio(cita.fecha);
}

function eliminarCita(id) {
  if (!exigirEdicion()) return;
  const cita = citas.find(item => item.id === id);
  citas = citas.filter(item => item.id !== id);
  guardar();
  mostrarInicio(cita?.fecha || hoy());
}

function mostrarEstadisticas(tipoPeriodo = "mes", valor = hoy().slice(0, 7)) {
  activarMenu("estadisticas");
  const activas = citasActivas().filter(cita => citaEnPeriodo(cita, tipoPeriodo, valor));
  const ingresos = activas.reduce((s, c) => s + Number(c.precio || 0), 0);
  const canceladasPeriodo = citasCanceladas().filter(cita => citaEnPeriodo(cita, tipoPeriodo, valor));
  const datosServicio = servicios.map(servicio => {
    const citasServicio = activas.filter(cita => cita.servicio === servicio.nombre);
    return {
      nombre: servicio.nombre,
      total: citasServicio.length,
      dinero: citasServicio.reduce((s, cita) => s + Number(cita.precio || 0), 0)
    };
  });
  const porServicio = datosServicio.map(servicio => `<tr><td>${servicio.nombre}</td><td>${servicio.total}</td><td>${dinero(servicio.dinero)}</td></tr>`).join("");
  document.getElementById("contenido").innerHTML = `
    <section class="panel stats-filter">
      <h2>Estadisticas por periodo</h2>
      <div class="stats-picker">
        <div><label>Periodo</label><select id="statsTipo" onchange="cambiarFiltroEstadisticas()"><option value="mes" ${tipoPeriodo === "mes" ? "selected" : ""}>Mes completo</option><option value="dia" ${tipoPeriodo === "dia" ? "selected" : ""}>Dia exacto</option></select></div>
        <div><label>${tipoPeriodo === "dia" ? "Dia" : "Mes"}</label><input id="statsFecha" type="${tipoPeriodo === "dia" ? "date" : "month"}" value="${valor}" onchange="cambiarFiltroEstadisticas()"></div>
      </div>
    </section>
    <div class="kpi-grid">
      ${kpi("Citas activas", activas.length, "Reservas no canceladas", "citas-activas")}
      ${kpi("Canceladas", canceladasPeriodo.length, "Historial del periodo", "canceladas", "dorado")}
      ${kpi("Ingresos estimados", dinero(ingresos), "Segun precio de citas", "ingresos-estimados", "verde")}
      ${kpi("Servicios", servicios.length, "Catalogo disponible", "servicios-card")}
    </div>
    <section class="stats-charts">
      ${graficaPastel3D("Servicios mas vendidos", datosServicio.map(item => ({ nombre: item.nombre, valor: item.total })), "citas")}
      ${graficaPastel3D("Servicios que generaron mas dinero", datosServicio.map(item => ({ nombre: item.nombre, valor: item.dinero })), "dinero")}
    </section>
    <section class="panel"><h2>Estadisticas por servicio</h2><table><thead><tr><th>Servicio</th><th>Citas</th><th>Estimado</th></tr></thead><tbody>${porServicio}</tbody></table></section>`;
}

function citaEnPeriodo(cita, tipoPeriodo, valor) {
  if (!cita?.fecha) return false;
  return tipoPeriodo === "mes" ? cita.fecha.slice(0, 7) === valor : cita.fecha === valor;
}

function cambiarFiltroEstadisticas() {
  const tipo = document.getElementById("statsTipo").value;
  const valor = document.getElementById("statsFecha").value || (tipo === "mes" ? hoy().slice(0, 7) : hoy());
  mostrarEstadisticas(tipo, valor);
}

function graficaPastel3D(titulo, datos, tipo = "citas") {
  const colores = ["#6d63ef", "#d68c2f", "#2fbf93", "#cf4f78", "#8a63d2", "#4aa3df", "#b46a56"];
  const utiles = datos.filter(item => Number(item.valor || 0) > 0);
  const total = utiles.reduce((s, item) => s + Number(item.valor || 0), 0);
  if (!total) {
    return `<section class="panel chart-card"><h2>${titulo}</h2><div class="chart-empty">Aun no hay datos para este periodo.</div></section>`;
  }
  let acumulado = 0;
  const segmentos = utiles.map((item, indice) => {
    const inicio = acumulado;
    const fin = inicio + (Number(item.valor) / total) * 100;
    acumulado = fin;
    return `${colores[indice % colores.length]} ${inicio}% ${fin}%`;
  }).join(", ");
  const lista = utiles.map((item, indice) => `<li><span style="background:${colores[indice % colores.length]}"></span><strong>${item.nombre}</strong><em>${tipo === "dinero" ? dinero(item.valor) : `${item.valor} cita(s)`}</em></li>`).join("");
  return `<section class="panel chart-card"><h2>${titulo}</h2><div class="pie-layout"><div class="pie-3d" style="background: conic-gradient(${segmentos});"></div><ul class="pie-legend">${lista}</ul></div></section>`;
}

function mostrarServicios() {
  activarMenu("servicios");
  document.getElementById("contenido").innerHTML = `
    <section class="panel">
      <div class="section-head"><h2>Servicios</h2></div>
      ${puedeEditar() ? `<form class="form-grid" onsubmit="guardarServicio(event)">
        <input id="servicioNombre" placeholder="Servicio">
        <input id="servicioDuracion" type="number" min="1" placeholder="Minutos">
        <input id="servicioPrecio" type="number" min="0" placeholder="Precio">
        <select id="servicioColor"><option value="rosa">Rosa</option><option value="dorado">Dorado</option><option value="uva">Uva</option><option value="verde">Verde</option></select>
        <button type="submit">Agregar servicio</button>
      </form>` : `<p class="solo-ver">Modo solo lectura.</p>`}
      <div class="servicios-lista">${servicios.map((servicio, i) => `<article class="servicio-item ${servicio.color}"><strong>${servicio.nombre}</strong><span>${servicio.duracion} min</span><span>${dinero(servicio.precio)}</span>${puedeEditar() ? `<button type="button" onclick="eliminarServicio(${i})">Eliminar</button>` : ""}</article>`).join("")}</div>
    </section>`;
}

function guardarServicio(event) {
  event.preventDefault();
  if (!exigirEdicion()) return;
  const nombre = document.getElementById("servicioNombre").value.trim();
  const duracion = Number(document.getElementById("servicioDuracion").value || 0);
  const precio = Number(document.getElementById("servicioPrecio").value || 0);
  const color = document.getElementById("servicioColor").value;
  if (!nombre || duracion <= 0) return mostrarMensaje("Faltan datos", "Agrega nombre y duracion.", "alerta");
  servicios.push({ nombre, duracion, precio, color });
  guardar();
  mostrarServicios();
}

function eliminarServicio(indice) {
  if (!exigirEdicion()) return;
  const servicio = servicios[indice];
  if (!confirm(`Eliminar el servicio "${servicio?.nombre || "seleccionado"}"?`)) return;
  servicios.splice(indice, 1);
  guardar();
  mostrarServicios("servicios");
}

function mostrarBloquearHorario() {
  activarMenu("bloquear");
  document.getElementById("contenido").innerHTML = `
    <section class="panel">
      <h2>Bloquear horario</h2>
      ${puedeEditar() ? `<form class="form-grid" onsubmit="guardarBloqueo(event)">
        <input type="date" id="bloqueoFecha" value="${hoy()}">
        <input type="time" id="bloqueoHora" value="${horaActual()}">
        <input id="bloqueoMotivo" placeholder="Motivo">
        <button type="submit">Bloquear</button>
      </form>` : `<p class="solo-ver">Modo solo lectura.</p>`}
      <table><thead><tr><th>Fecha</th><th>Hora</th><th>Motivo</th><th>Accion</th></tr></thead><tbody>${bloqueos.map(b => `<tr><td>${formatoFecha(b.fecha)}</td><td>${b.hora}</td><td>${b.motivo || "-"}</td><td>${puedeEditar() ? `<button type="button" onclick="eliminarBloqueo(${b.id})">Eliminar</button>` : "-"}</td></tr>`).join("") || `<tr><td colspan="4" class="vacio">No hay horarios bloqueados.</td></tr>`}</tbody></table>
    </section>`;
}

function guardarBloqueo(event) {
  event.preventDefault();
  if (!exigirEdicion()) return;
  bloqueos.push({ id: idNuevo(), fecha: document.getElementById("bloqueoFecha").value, hora: document.getElementById("bloqueoHora").value, motivo: document.getElementById("bloqueoMotivo").value.trim() });
  guardar();
  mostrarBloquearHorario();
}

function eliminarBloqueo(id) {
  if (!exigirEdicion()) return;
  bloqueos = bloqueos.filter(item => item.id !== id);
  guardar();
  mostrarBloquearHorario();
}

function mostrarExtras() {
  activarMenu("extras");
  document.getElementById("contenido").innerHTML = `<section class="panel"><h2>Extras</h2><div class="extra-grid"><article>Recordatorios por WhatsApp</article><article>Notas de clientas</article><article>Promociones por temporada</article></div></section>`;
}

function mostrarTransferencias() {
  activarMenu("transferencias");
  const pagos = citasActivas().filter(c => Number(c.precio || 0) > 0);
  document.getElementById("contenido").innerHTML = `<section class="panel"><h2>Transferencias</h2><table><thead><tr><th>Cliente</th><th>Servicio</th><th>Fecha</th><th>Monto</th></tr></thead><tbody>${pagos.map(c => `<tr><td>${c.cliente}</td><td>${c.servicio}</td><td>${formatoFecha(c.fecha)}</td><td>${dinero(c.precio)}</td></tr>`).join("") || `<tr><td colspan="4" class="vacio">No hay pagos pendientes.</td></tr>`}</tbody></table></section>`;
}

function mostrarSuscripcion() {
  activarMenu("suscripcion");
  document.getElementById("contenido").innerHTML = `<section class="panel suscripcion"><h2>Mi suscripcion</h2><strong>Premium</strong><p>Agenda activa para Oh, ma belle Belleza y Spa.</p></section>`;
}

function mostrarConfiguracion() {
  activarMenu("configuracion");
  document.getElementById("contenido").innerHTML = `
    <section class="config-grid">
      <article class="panel config-card">
        <h2>Configuracion</h2>
        <p>Usuario actual: <strong>${usuarioActual?.nombre || "-"}</strong></p>
        <p>Permiso: <strong>${puedeEditar() ? "Puede ver y editar" : "Solo puede ver"}</strong></p>
      </article>

      <article class="panel config-card">
        <h2>Cambiar contrasena</h2>
        <form class="config-form" onsubmit="cambiarContrasena(event)">
          <label>Contrasena anterior</label>
          <input type="password" id="claveAnterior" autocomplete="current-password" placeholder="Escribe la contrasena anterior">
          <label>Nueva contrasena</label>
          <input type="password" id="claveNueva" autocomplete="new-password" placeholder="Escribe la nueva contrasena">
          <button class="primary-action" type="submit">Guardar</button>
        </form>
      </article>

      <article class="panel config-card">
        <h2>Apariencia</h2>
        <p>Activa o desactiva el modo oscuro para trabajar mas comodo.</p>
        <label class="switch-line"><input type="checkbox" id="toggleOscuro" ${modoOscuro ? "checked" : ""} onchange="cambiarModoOscuro(this.checked)"> Modo oscuro</label>
      </article>
    </section>`;
}

function cambiarContrasena(event) {
  event.preventDefault();
  const anterior = document.getElementById("claveAnterior").value.trim();
  const nueva = document.getElementById("claveNueva").value.trim();
  if (!anterior || !nueva) return mostrarMensaje("Faltan datos", "Escribe la contrasena anterior y la nueva.", "alerta");
  if (nueva.length < 3) return mostrarMensaje("Contrasena corta", "Usa al menos 3 caracteres.", "alerta");
  const usuario = usuarios.find(item => item.usuario === usuarioActual?.usuario);
  if (!usuario || usuario.clave !== anterior) return mostrarMensaje("Contrasena incorrecta", "La contrasena anterior no coincide.", "error");
  usuario.clave = nueva;
  usuarioActual = usuario;
  guardar();
  document.getElementById("claveAnterior").value = "";
  document.getElementById("claveNueva").value = "";
  mostrarMensaje("Contrasena actualizada", "La nueva contrasena quedo guardada.");
}

function aplicarModoOscuro() {
  document.body.classList.toggle("modo-oscuro", !!modoOscuro);
}

function cambiarModoOscuro(valor) {
  modoOscuro = !!valor;
  guardar();
  aplicarModoOscuro();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sistema").style.display = "none";
  aplicarModoOscuro();
  usuarioSeleccionado();
});

function cerrarModalFormulario() {
  document.getElementById("modalFormulario").style.display = "none";
  document.getElementById("modalContenido").innerHTML = "";
}

function abrirModal(titulo, contenido) {
  document.getElementById("modalContenido").innerHTML = `<h2>${titulo}</h2>${contenido}`;
  document.getElementById("modalFormulario").style.display = "grid";
}

function leerArchivo(input, callback) {
  const archivo = input.files?.[0];
  if (!archivo) {
    callback("");
    return;
  }
  const lector = new FileReader();
  lector.onload = () => callback(lector.result);
  lector.readAsDataURL(archivo);
}

function nombreMes(fecha) {
  const base = new Date(`${fecha.slice(0, 7)}-01T00:00:00`);
  return base.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
}

function cambiarMes(fecha, cantidad) {
  const base = new Date(`${fecha.slice(0, 7)}-01T00:00:00`);
  base.setMonth(base.getMonth() + cantidad);
  mostrarInicio(`${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}-01`);
}

function calendarioGrande(fecha) {
  const [anio, mes] = fecha.split("-").map(Number);
  const primero = new Date(anio, mes - 1, 1);
  const diasMes = new Date(anio, mes, 0).getDate();
  const inicio = (primero.getDay() + 6) % 7;
  const celdas = [];
  for (let i = 0; i < inicio; i++) celdas.push(`<div class="cal-cell cal-empty"></div>`);
  for (let dia = 1; dia <= diasMes; dia++) {
    const fechaDia = `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    const citasDia = citasDeFecha(fechaDia).filter(cita => cita.estado !== "Cancelada");
    celdas.push(`<div class="cal-cell ${fechaDia === hoy() ? "hoy" : ""}">
      <div class="cal-day"><strong>${dia}</strong>${puedeEditar() ? `<button type="button" onclick="abrirModalCita('${fechaDia}')">+</button>` : ""}</div>
      <div class="cal-citas">${citasDia.map(cita => `<button type="button" class="cal-cita" onclick="abrirDetalleCita(${cita.id})"><span>${cita.hora}</span>${cita.cliente}<small>${cita.servicio}</small></button>`).join("")}</div>
    </div>`);
  }
  return `<div class="calendar-weekdays"><span>Lunes</span><span>Martes</span><span>Miercoles</span><span>Jueves</span><span>Viernes</span><span>Sabado</span><span>Domingo</span></div><div class="calendar-grid">${celdas.join("")}</div>`;
}

mostrarInicio = function (fecha = hoy()) {
  activarMenu("inicio");
  const resumen = resumenDia();
  const canceladas = citasCanceladas().slice(0, 5);
  const pendientesPago = citasPorLiquidar(fecha);
  document.getElementById("contenido").innerHTML = `
    <div class="kpi-grid">
      ${kpi("Turnos de Hoy", resumen.activas.length, "Reservas para hoy", "turnos-hoy", "morado")}
      ${kpi("Cancelaciones Hoy", resumen.canceladasHoy.length, "Cancelaciones realizadas hoy", "cancelaciones-hoy", "dorado")}
      ${kpi("Turnos Pendientes", resumen.pendientes.length, "Total de proximos turnos", "turnos-pendientes", "morado")}
      ${kpi("Ingresos del Dia", dinero(resumen.ingresos), "Pagos estimados por revisar", "ingresos-dia", "verde")}
    </div>

    <section class="panel soft">
      <h2>Ultimas Cancelaciones</h2>
      <p>Listado de reservas canceladas recientemente. Puedes contactar rapidamente a las clientas para reprogramar.</p>
      <table>
        <thead><tr><th>Cliente</th><th>Contacto</th><th>Servicio</th><th>Personal</th><th>Fecha/Hora Original</th><th>Cancelado</th></tr></thead>
        <tbody>${canceladas.map(cita => `<tr><td>${cita.cliente}</td><td>${cita.telefono || "-"}</td><td>${cita.servicio}</td><td>${cita.personal || "Rosa Polet"}</td><td>${formatoFecha(cita.fecha)} ${cita.hora}</td><td>${cita.canceladaEn || "-"}</td></tr>`).join("") || `<tr><td colspan="6" class="vacio">No hay cancelaciones recientes</td></tr>`}</tbody>
      </table>
    </section>

    <section class="panel calendario-panel">
      <div class="section-head calendario-head">
        <button type="button" onclick="cambiarMes('${fecha}', -1)">‹</button>
        <h2>${nombreMes(fecha)}</h2>
        <button type="button" onclick="cambiarMes('${fecha}', 1)">›</button>
        <input type="month" value="${fecha.slice(0, 7)}" onchange="mostrarInicio(this.value + '-01')">
        ${puedeEditar() ? `<button class="primary-action" type="button" onclick="abrirModalCita('${fecha}')">Agregar cita</button>` : ""}
      </div>
      ${calendarioGrande(fecha)}
    </section>

    <section class="panel pagos-panel">
      <div class="section-head"><h2>Citas pendientes por liquidar</h2></div>
      ${vistaPagosPendientes(pendientesPago)}
    </section>`;
};

function abrirModalCita(fecha = hoy()) {
  if (!exigirEdicion()) return;
  abrirModal("Agregar cita", `<form class="modal-stack" novalidate onsubmit="guardarCitaModal(event)">
    <label>Fecha</label><input type="date" id="modalCitaFecha" value="${fecha}" required>
    <label>Hora</label><input type="time" id="modalCitaHora" value="${horaActual()}" required>
    <label>Cliente</label><input id="modalCitaCliente" placeholder="Nombre de la clienta" required>
    <label>Telefono</label><input id="modalCitaTelefono" type="tel" inputmode="numeric" maxlength="10" placeholder="10 digitos" oninput="this.value=this.value.replace(/\\D/g, '').slice(0, 10)" required>
    <label>Servicio</label><select id="modalCitaServicio" onchange="actualizarPrecioServicioModal()" required>${servicios.map(s => `<option>${s.nombre}</option>`).join("")}</select>
    <label>Personal</label><select id="modalCitaPersonal" required><option>Rosa Polet</option>${personal.map(p => `<option>${p.nombre}</option>`).join("")}</select>
    <label>Precio</label><input id="modalCitaPrecio" type="number" min="1" value="${servicios[0]?.precio || 0}" required>
    <h3>Metodo de pago</h3>
    <select id="modalCitaPago" required><option value="">Seleccionar metodo</option><option>Pago Presencial/Efectivo</option><option>Transferencia Bancaria</option><option>Tarjeta</option></select>
    <label>Anticipo de pago (Opcional)</label><div class="input-addon"><span>$</span><input id="modalCitaAnticipo" type="number" min="0" value="0" placeholder="Monto de sena"></div>
    <div class="modal-actions"><button type="button" onclick="cerrarModalFormulario()">Cancelar</button><button class="primary-action" type="submit">Guardar cita</button></div>
  </form>`);
}

function actualizarPrecioServicioModal() {
  const servicio = servicioPorNombre(document.getElementById("modalCitaServicio").value);
  document.getElementById("modalCitaPrecio").value = servicio.precio || 0;
}

function guardarCitaModal(event) {
  event.preventDefault();
  if (!exigirEdicion()) return;
  const telefono = document.getElementById("modalCitaTelefono").value.trim();
  const cita = {
    id: idNuevo(),
    fecha: document.getElementById("modalCitaFecha").value,
    hora: document.getElementById("modalCitaHora").value,
    cliente: document.getElementById("modalCitaCliente").value.trim(),
    telefono,
    servicio: document.getElementById("modalCitaServicio").value,
    precio: Number(document.getElementById("modalCitaPrecio").value || 0),
    metodoPago: document.getElementById("modalCitaPago").value,
    anticipo: Number(document.getElementById("modalCitaAnticipo").value || 0),
    abonos: [],
    liquidada: false,
    estado: "Pendiente",
    personal: document.getElementById("modalCitaPersonal").value
  };
  if (!cita.fecha || !cita.hora || !cita.cliente || !cita.telefono || !cita.servicio || !cita.personal || !cita.metodoPago || cita.precio <= 0) {
    return mostrarMensaje("Completa los datos", "Revisa que todos los campos obligatorios esten llenos.", "alerta");
  }
  if (!/^\d{10}$/.test(cita.telefono)) return mostrarMensaje("Telefono invalido", "El telefono debe tener exactamente 10 numeros.", "alerta");
  if (cita.anticipo >= cita.precio) cita.liquidada = true;
  citas.push(cita);
  guardar();
  cerrarModalFormulario();
  mostrarMensaje("Cita guardada", "La cita aparecera en el calendario.", "ok");
  mostrarInicio(cita.fecha);
}

function abrirDetalleCita(id) {
  const cita = citas.find(item => item.id === id);
  if (!cita) return;
  abrirModal("Detalle de cita", `<div class="detalle-cita">
    <p><strong>Cliente:</strong> ${cita.cliente}</p>
    <p><strong>Servicio:</strong> ${cita.servicio}</p>
    <p><strong>Fecha:</strong> ${formatoFecha(cita.fecha)} ${cita.hora}</p>
    <p><strong>Personal:</strong> ${cita.personal || "Rosa Polet"}</p>
    <p><strong>Precio:</strong> ${dinero(cita.precio)}</p>
    <p><strong>Metodo de pago:</strong> ${cita.metodoPago || "-"}</p>
    <p><strong>Anticipo:</strong> ${dinero(cita.anticipo || 0)}</p>
    <p><strong>Saldo:</strong> ${dinero(saldoCita(cita))}</p>
    <div class="modal-actions">
      <button type="button" onclick="cerrarModalFormulario()">Cerrar</button>
      ${puedeEditar() ? `${saldoCita(cita) > 0 ? `<button type="button" onclick="registrarAbono(${cita.id}); cerrarModalFormulario()">Abonar</button><button class="primary-action" type="button" onclick="liquidarCita(${cita.id}); cerrarModalFormulario()">Ya liquidaron</button>` : ""}<button type="button" onclick="cancelarCita(${cita.id}); cerrarModalFormulario()">Cancelar cita</button><button class="danger-action" type="button" onclick="eliminarCita(${cita.id}); cerrarModalFormulario()">Eliminar</button>` : ""}
    </div>
  </div>`);
}

function totalAbonos(cita) {
  return (cita.abonos || []).reduce((s, abono) => s + Number(abono.monto || 0), 0);
}

function saldoCita(cita) {
  if (cita.liquidada) return 0;
  return Math.max(0, Number(cita.precio || 0) - Number(cita.anticipo || 0) - totalAbonos(cita));
}

function citasPorLiquidar(fechaMes = hoy()) {
  const mes = fechaMes.slice(0, 7);
  return citasActivas()
    .filter(cita => cita.fecha?.slice(0, 7) === mes && Number(cita.anticipo || 0) > 0 && saldoCita(cita) > 0)
    .sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`));
}

function vistaPagosPendientes(lista) {
  if (!lista.length) return `<p class="vacio">No hay citas con anticipo pendientes por liquidar este mes.</p>`;
  return `<div class="pagos-lista">${lista.map(cita => `<article class="pago-item">
    <div><strong>${cita.cliente}</strong><span>${formatoFecha(cita.fecha)} ${cita.hora} · ${cita.servicio}</span></div>
    <div><small>Anticipo</small><b>${dinero(cita.anticipo)}</b></div>
    <div><small>Saldo</small><b>${dinero(saldoCita(cita))}</b></div>
    ${puedeEditar() ? `<div class="pago-actions"><button type="button" onclick="registrarAbono(${cita.id})">Abonar</button><button class="primary-action" type="button" onclick="liquidarCita(${cita.id})">Ya liquidaron</button></div>` : ""}
  </article>`).join("")}</div>`;
}

function registrarAbono(id) {
  if (!exigirEdicion()) return;
  const cita = citas.find(item => item.id === id);
  if (!cita) return;
  const cantidad = Number(prompt("Cuanto van a abonar?") || 0);
  if (!cantidad || cantidad <= 0) return mostrarMensaje("Completa los datos", "Escribe una cantidad valida para el abono.", "alerta");
  cita.abonos = cita.abonos || [];
  cita.abonos.push({ monto: cantidad, fecha: hoy() });
  if (saldoCita(cita) <= 0) cita.liquidada = true;
  guardar();
  mostrarMensaje("Abono guardado", "Se actualizo el saldo de la cita.", "ok");
  mostrarInicio(cita.fecha);
}

function liquidarCita(id) {
  if (!exigirEdicion()) return;
  const cita = citas.find(item => item.id === id);
  if (!cita) return;
  const saldo = saldoCita(cita);
  cita.abonos = cita.abonos || [];
  if (saldo > 0) cita.abonos.push({ monto: saldo, fecha: hoy() });
  cita.liquidada = true;
  guardar();
  mostrarMensaje("Pago liquidado", "La cita ya quedo pagada completo.", "ok");
  mostrarInicio(cita.fecha);
}

let vistaServiciosActual = "servicios";

mostrarServicios = function (vista = vistaServiciosActual) {
  activarMenu("servicios");
  vistaServiciosActual = vista;
  const esServicios = vista === "servicios";
  document.getElementById("contenido").innerHTML = `
    <section class="servicios-page">
      <div class="servicios-toolbar">
        <div class="tabs-app">
          <button class="${esServicios ? "activo" : ""}" type="button" onclick="mostrarServicios('servicios')"><span class="services-icon nav-icon"></span>Servicios</button>
          <button class="${!esServicios ? "activo" : ""}" type="button" onclick="mostrarServicios('personal')"><span class="stats-icon nav-icon"></span>Personal</button>
        </div>
        ${puedeEditar() ? `<button class="primary-action" type="button" onclick="${esServicios ? "abrirNuevoServicio()" : "abrirNuevoPersonal()"}">+ Nuevo ${esServicios ? "Servicio" : "Personal"}</button>` : ""}
      </div>
      ${esServicios ? vistaServicios() : vistaPersonal()}
    </section>`;
};

function vistaServicios() {
  if (!servicios.length) return `<div class="empty-state"><span class="empty-icon services-icon nav-icon"></span><h2>No hay servicios registrados</h2><p>Comienza agregando servicios con el boton "Nuevo Servicio"</p></div>`;
  return `<div class="cards-grid">${servicios.map((servicio, indice) => `<article class="service-card">
    <div class="service-image ${servicio.color}" ${servicio.imagen ? `style="background-image:url('${servicio.imagen}')"` : ""}></div>
    <div class="service-body">
      <h3>${servicio.nombre}</h3>
      <p class="service-time">${servicio.duracion} minutos</p>
      <div class="service-foot">
        <strong>${dinero(servicio.precio)}</strong>
        ${puedeEditar() ? `<span class="service-actions"><button class="edit-service" type="button" onclick="abrirEditarServicio(${indice})">Editar</button><button class="trash" type="button" onclick="eliminarServicio(${indice})">Eliminar</button></span>` : ""}
      </div>
    </div>
  </article>`).join("")}</div>`;
}

function vistaPersonal() {
  if (!personal.length) return `<div class="empty-state"><span class="empty-icon user-group-icon"></span><h2>No hay personal registrado</h2><p>Comienza agregando personal con el boton "Nuevo Personal"</p></div>`;
  return `<div class="cards-grid">${personal.map((persona, indice) => `<article class="person-card">
    <div class="person-photo" ${persona.foto ? `style="background-image:url('${persona.foto}')"` : ""}></div>
    <div class="service-body">
      <h3>${persona.nombre}</h3>
      <p>${persona.descripcion || "Especialista del spa."}</p>
      <div class="service-foot"><strong class="activo-dot">Activo</strong>${puedeEditar() ? `<span><button type="button" onclick="abrirEditarPersonal(${indice})">Editar</button><button class="trash" type="button" onclick="eliminarPersonal(${indice})">Eliminar</button></span>` : ""}</div>
    </div>
  </article>`).join("")}</div>`;
}

function camposHorarios(prefix, datos = horariosBase()) {
  return `<div class="horarios-box">${datos.map((item, indice) => `<div class="horario-row">
    <label><input type="checkbox" id="${prefix}Dia${indice}" ${item.activo ? "checked" : ""}> ${item.dia}</label>
    <div><input type="time" id="${prefix}Inicio${indice}" value="${item.inicio || "09:00"}"><span>a</span><input type="time" id="${prefix}Fin${indice}" value="${item.fin || "18:00"}"><button type="button">−</button></div>
    <a href="#">+ Agregar horario</a>
  </div>`).join("")}</div>`;
}

function leerHorarios(prefix) {
  return horariosBase().map((item, indice) => ({
    dia: item.dia,
    activo: document.getElementById(`${prefix}Dia${indice}`).checked,
    inicio: document.getElementById(`${prefix}Inicio${indice}`).value,
    fin: document.getElementById(`${prefix}Fin${indice}`).value
  }));
}

function abrirNuevoPersonal(indice = null) {
  if (!exigirEdicion()) return;
  const persona = indice !== null ? personal[indice] : { horarios: horariosBase(), fraccion: 30 };
  abrirModal(indice !== null ? "Editar Personal" : "Nuevo Personal", `<form class="modal-stack" novalidate onsubmit="guardarPersonalModal(event, ${indice === null ? "null" : indice})">
    <label>Nombre Completo</label><input id="personalNombre" value="${persona.nombre || ""}" placeholder="Sebastian Perez" required>
    <label>Foto</label><input id="personalFoto" type="file" accept="image/*">
    <label>Email para Notificaciones (Opcional)</label><input id="personalEmail" type="email" value="${persona.email || ""}" placeholder="ejemplo@email.com">
    <h3>Horario de Trabajo</h3>${camposHorarios("personal", persona.horarios || horariosBase())}
    <div class="modal-actions"><button type="button" onclick="cerrarModalFormulario()">Cancelar</button><button class="primary-action" type="submit">Guardar Personal</button></div>
  </form>`);
}

function abrirEditarPersonal(indice) {
  abrirNuevoPersonal(indice);
}

function guardarPersonalModal(event, indice) {
  event.preventDefault();
  if (!exigirEdicion()) return;
  const inputFoto = document.getElementById("personalFoto");
  leerArchivo(inputFoto, fotoNueva => {
    const actual = indice !== null ? personal[indice] : {};
    const persona = {
      id: actual.id || idNuevo(),
      nombre: document.getElementById("personalNombre").value.trim(),
      descripcion: actual.descripcion || "",
      email: document.getElementById("personalEmail").value.trim(),
      fraccion: actual.fraccion || 30,
      foto: fotoNueva || actual.foto || "",
      activo: true,
      horarios: leerHorarios("personal")
    };
    if (!persona.nombre) return mostrarMensaje("Completa los datos", "Agrega el nombre del personal.", "alerta");
    if (indice !== null) personal[indice] = persona;
    else personal.push(persona);
    guardar();
    cerrarModalFormulario();
    mostrarServicios("personal");
  });
}

function eliminarPersonal(indice) {
  if (!exigirEdicion()) return;
  personal.splice(indice, 1);
  guardar();
  mostrarServicios("personal");
}

function abrirNuevoServicio(indice = null) {
  if (!exigirEdicion()) return;
  const servicio = indice !== null ? servicios[indice] : { horarios: horariosBase(), capacidad: 1, duracion: 30, precio: 0, anticipo: 0, pagoEfectivo: true };
  abrirModal(indice !== null ? "Editar Servicio" : "Nuevo Servicio", `<form class="modal-stack" novalidate onsubmit="guardarServicioModal(event, ${indice === null ? "null" : indice})">
    <label>Nombre del Servicio</label><input id="servicioNombreModal" value="${servicio.nombre || ""}" required>
    <label>Imagen del Servicio</label><input id="servicioImagenModal" type="file" accept="image/*">
    <label>Precio</label><div class="input-addon"><span>$</span><input id="servicioPrecioModal" type="number" min="1" value="${servicio.precio || 0}" required></div>
    <label>Duracion (minutos)</label><input id="servicioDuracionModal" type="number" min="1" value="${servicio.duracion || 30}" required>
    <h3>Personal Asignado</h3>
    <div class="check-grid">${personal.map(p => `<label class="check-line"><input class="servicioPersonalModal" type="checkbox" value="${p.nombre}" ${(servicio.personalAsignado || []).includes(p.nombre) ? "checked" : ""}> ${p.nombre}</label>`).join("") || `<p class="texto-suave">No hay personal agregado todavia.</p>`}</div>
    <h3>Horarios</h3>${camposHorarios("servicio", servicio.horarios || horariosBase())}
    <label>Anticipacion minima para reservar</label><select id="servicioAnticipacionModal"><option>Sin anticipacion</option><option>1 hora antes</option><option>24 horas antes</option></select>
    <div class="modal-actions"><button type="button" onclick="cerrarModalFormulario()">Cancelar</button><button class="primary-action" type="submit">Guardar Servicio</button></div>
  </form>`);
}

function abrirEditarServicio(indice) {
  abrirNuevoServicio(indice);
}

function guardarServicioModal(event, indice) {
  event.preventDefault();
  if (!exigirEdicion()) return;
  leerArchivo(document.getElementById("servicioImagenModal"), imagenNueva => {
    const actual = indice !== null ? servicios[indice] : {};
    const servicio = {
      nombre: document.getElementById("servicioNombreModal").value.trim(),
      descripcion: actual.descripcion || "",
      confirmacion: actual.confirmacion || "",
      imagen: imagenNueva || actual.imagen || "",
      precio: Number(document.getElementById("servicioPrecioModal").value || 0),
      capacidad: actual.capacidad || 1,
      anticipo: actual.anticipo || 0,
      duracion: Number(document.getElementById("servicioDuracionModal").value || 30),
      pagoEfectivo: actual.pagoEfectivo !== false,
      pagoTransferencia: !!actual.pagoTransferencia,
      personalAsignado: [...document.querySelectorAll(".servicioPersonalModal:checked")].map(item => item.value),
      horarios: leerHorarios("servicio"),
      color: actual.color || ["rosa", "dorado", "uva", "verde"][servicios.length % 4]
    };
    if (!servicio.nombre || servicio.precio <= 0 || servicio.duracion <= 0) return mostrarMensaje("Completa los datos", "Agrega nombre, precio y duracion del servicio.", "alerta");
    if (indice !== null) servicios[indice] = servicio;
    else servicios.push(servicio);
    guardar();
    cerrarModalFormulario();
    mostrarServicios("servicios");
  });
}
