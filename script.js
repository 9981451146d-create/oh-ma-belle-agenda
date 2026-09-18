const CLAVE = "oh-ma-belle-agenda-v1";
const SUPABASE_URL = "https://vgmyzhmbuteixvlvwxjc.supabase.co";
const SUPABASE_KEY = "sb_publishable_5b7OS0T91SbgnCog14YXEw_tr7lD3WT";
const CODIGO_ADMINISTRACION = "2009";
const VAPID_PUBLIC_KEY = "BPkgnzBm9iqn5ZYXETtJ37oweVMi4EEuXu-uoWxewe5MG3W9bxeftqIr75NoU9-JgWF9EcPzm-MptOXP4abYmzM";
const NOMBRE_NEGOCIO = "Beloved Body";
const SUBTITULO_NEGOCIO = "Salón Spa";
const LOGO_PREDETERMINADO = "assets/logo-beloved-body.png";
const MIGRACION_DATOS_ACTUAL = "20260918-catalogo-jerarquico-domingo";
const opcionServicio = (nombre, precio, duracion, nota = "") => ({ nombre, precio, duracion, nota });
const opcionConVariantes = (nombre, subgrupo, subopciones) => ({ nombre, precio: 0, duracion: 0, subgrupo, subopciones });
const detallesManicureBase = [
  {
    grupo: "Elige el servicio",
    seleccion: "una",
    opciones: [
      opcionConVariantes("Soft Gel", "Cantidad de colores", [
        opcionServicio("1 a 5 colores", 390, 90)
      ]),
      opcionServicio("Rubber", 430, 75),
      opcionServicio("Builder", 450, 90),
      opcionConVariantes("Acrílico", "Largo", [
        opcionServicio("1 y 2 · Cortas", 400, 120),
        opcionServicio("3 y 4 · Medianas", 500, 120),
        opcionServicio("5 y 6 · Largas", 650, 135),
        opcionServicio("7 y 8 · Extralargas", 750, 150)
      ]),
      opcionConVariantes("Mani Spa", "Nivel y acabado", [
        opcionServicio("Básico", 350, 45),
        opcionServicio("Gel", 150, 30),
        opcionServicio("Básico + Gel", 500, 60),
        opcionServicio("Deluxe", 450, 60),
        opcionServicio("Deluxe + Gel", 600, 75),
        opcionServicio("Premium", 550, 75),
        opcionServicio("Premium + Gel", 700, 90)
      ]),
      opcionConVariantes("Pedi Spa", "Nivel y acabado", [
        opcionServicio("Básico", 450, 60),
        opcionServicio("Gel", 200, 30),
        opcionServicio("Básico + Gel", 600, 75),
        opcionServicio("Deluxe", 550, 75),
        opcionServicio("Deluxe + Gel", 750, 90),
        opcionServicio("Premium", 650, 90),
        opcionServicio("Premium + Gel", 850, 105)
      ])
    ]
  },
  {
    grupo: "Efectos adicionales",
    seleccion: "varias",
    opciones: [
      opcionServicio("Efecto espejo", 12, 5, "cada uña"),
      opcionServicio("Efecto mate", 8, 5, "cada uña"),
      opcionServicio("Relieves", 14, 10, "cada uña"),
      opcionServicio("Piedra tornasol", 10, 5, "4 a 10 por piedra"),
      opcionServicio("Nail Art · francés, líneas o rayas", 13, 10, "cada uña"),
      opcionServicio("Dijes", 12, 5, "4 a 12 por pieza"),
      opcionServicio("Efecto ojo de gato", 11, 5, "cada uña")
    ]
  },
  { grupo: "Observaciones", seleccion: "texto", opciones: [] }
];
const configuracionBase = {
  logo: LOGO_PREDETERMINADO,
  moneda: "MXN",
  tipoCambio: 17.6087,
  tipoCambioFecha: "",
  tipoCambioConsultadoEn: ""
};
const usuariosBase = [
  { usuario: "maria", rol: "editora", nombre: "Maestra Maria" },
  { usuario: "rosa", rol: "editora", nombre: "Rosa Polet" }
];

const serviciosBase = [
  { nombre: "Manicure y Spa", duracion: 30, precio: 150, color: "dorado", detalles: detallesManicureBase },
  { nombre: "Masajes", duracion: 30, precio: 450, color: "verde", detalles: [{ grupo: "Elige el masaje", seleccion: "una", opciones: [
    opcionServicio("Descontracturante de tejido profundo", 950, 90),
    opcionServicio("Reductivo · 1 sesión", 600, 45),
    opcionServicio("Medias piernas · circulación", 490, 30),
    opcionServicio("Piedras calientes", 1100, 60),
    opcionServicio("Relajante", 700, 60),
    opcionServicio("Croncel, cera y cráneo", 450, 40)
  ] }] },
  { nombre: "Cejas", duracion: 50, precio: 300, color: "rosa", detalles: [{ grupo: "Elige el servicio", seleccion: "una", opciones: [
    opcionServicio("Laminado de cejas", 300, 50)
  ] }] },
  { nombre: "Pestañas", duracion: 45, precio: 400, color: "uva", detalles: [{ grupo: "Elige el servicio", seleccion: "una", opciones: [
    opcionServicio("Full Set Clásicas", 750, 90),
    opcionServicio("Full Set Hawaiano", 850, 90),
    opcionServicio("Full Set Volumen 5D", 950, 90),
    opcionServicio("Full Set 3D", 700, 90),
    opcionServicio("Full Set Efecto Anime", 899, 90),
    opcionServicio("Lash Lifting", 400, 60),
    opcionServicio("Pestañas inferiores", 400, 45)
  ] }] }
];

const imagenesServiciosBase = {};
const personalRetirado = ["rosa polet", "elizabet", "elizabeth"];

let usuarios = cargar("usuarios") || usuariosBase.map(usuario => ({ ...usuario }));
let usuarioActual = null;
let servicios = cargar("servicios") || serviciosBase;
let citas = cargar("citas") || [];
let bloqueos = cargar("bloqueos") || [];
let personal = cargar("personal") || [];
let clientas = cargar("clientas") || [];
let modoOscuro = cargar("modoOscuro") || false;
let sonidosActivos = cargar("sonidosActivos") !== false;
let configuracion = cargar("configuracion") || { ...configuracionBase };
let remotoListo = false;
let guardandoRemoto = false;
let guardadoRemotoPendiente = false;
let datosMigrados = false;
let mensajesWhatsApp = [];
let chatWhatsAppActivo = "";
let reintentoRemoto = null;
let eventoInstalacion = null;
let tokenSesion = localStorage.getItem(`${CLAVE}-token`) || sessionStorage.getItem(`${CLAVE}-token`) || "";
let versionRemota = null;

normalizarDatos();

function mostrarIntroAplicacion() {
  const instalada = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const intro = document.getElementById("introAplicacion");
  if (!instalada || !intro) return;
  const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const inicioSalida = movimientoReducido ? 650 : 2700;
  const finIntro = movimientoReducido ? 850 : 3400;
  intro.hidden = false;
  document.body.classList.add("intro-activa");
  reproducirSonido("intro", 0.75);
  window.setTimeout(() => intro.classList.add("intro-saliendo"), inicioSalida);
  window.setTimeout(() => {
    intro.hidden = true;
    intro.classList.remove("intro-saliendo");
    document.body.classList.remove("intro-activa");
  }, finIntro);
}

mostrarIntroAplicacion();

function reproducirSonido(tipo, volumen = 0.14) {
  if (!sonidosActivos) return;
  const rutas = { intro: "assets/sounds/intro.wav", tap: "assets/sounds/tap.wav", success: "assets/sounds/success.wav", danger: "assets/sounds/danger.wav" };
  if (!rutas[tipo]) return;
  const audio = new Audio(rutas[tipo]);
  audio.volume = volumen;
  audio.play().catch(() => {});
}

document.addEventListener("click", event => {
  const boton = event.target.closest("button");
  if (boton && !boton.disabled) reproducirSonido("tap", 0.55);
}, true);

if ("serviceWorker" in navigator) {
  let recargandoPorActualizacion = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (recargandoPorActualizacion) return;
    recargandoPorActualizacion = true;
    window.location.reload();
  });
  window.addEventListener("load", async () => {
    try {
      const registro = await navigator.serviceWorker.register("service-worker.js", { updateViaCache: "none" });
      await registro.update();
    } catch (error) {
      console.warn("No se pudo activar el modo instalable:", error);
    }
  });
}

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  eventoInstalacion = event;
  const boton = document.getElementById("botonInstalar");
  if (boton) boton.hidden = false;
});

function actualizarBotonInstalacion() {
  const boton = document.getElementById("botonInstalar");
  if (!boton) return;
  const instalada = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const esIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  boton.hidden = instalada || (!eventoInstalacion && !esIOS);
}

document.addEventListener("DOMContentLoaded", actualizarBotonInstalacion);
window.addEventListener("pageshow", actualizarBotonInstalacion);

window.addEventListener("appinstalled", () => {
  eventoInstalacion = null;
  const boton = document.getElementById("botonInstalar");
  if (boton) boton.hidden = true;
  mostrarMensaje("Aplicación instalada", `${NOMBRE_NEGOCIO} ya está disponible en tu pantalla de inicio.`, "ok");
});

async function instalarAplicacion() {
  if (!eventoInstalacion) {
    const esIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    return mostrarMensaje("Instalar aplicación", esIOS ? "Abre esta página en Safari, toca Compartir y después Agregar a pantalla de inicio." : "Abre el menú del navegador y selecciona Instalar aplicación o Agregar a pantalla de inicio.", "ok");
  }
  eventoInstalacion.prompt();
  const resultado = await eventoInstalacion.userChoice;
  if (resultado.outcome === "accepted") eventoInstalacion = null;
  actualizarBotonInstalacion();
}

function cargar(nombre) {
  const datos = localStorage.getItem(`${CLAVE}-${nombre}`);
  return datos ? JSON.parse(datos) : null;
}

function guardar() {
  guardarLocal();
  if (remotoListo && puedeEditar()) guardarRemoto();
}

function guardarLocal() {
  localStorage.setItem(`${CLAVE}-usuarios`, JSON.stringify(usuarios.map(({ usuario, nombre, rol }) => ({ usuario, nombre, rol }))));
  localStorage.setItem(`${CLAVE}-servicios`, JSON.stringify(servicios));
  localStorage.setItem(`${CLAVE}-citas`, JSON.stringify(citas));
  localStorage.setItem(`${CLAVE}-bloqueos`, JSON.stringify(bloqueos));
  localStorage.setItem(`${CLAVE}-personal`, JSON.stringify(personal));
  localStorage.setItem(`${CLAVE}-clientas`, JSON.stringify(clientas));
  localStorage.setItem(`${CLAVE}-modoOscuro`, JSON.stringify(modoOscuro));
  localStorage.setItem(`${CLAVE}-sonidosActivos`, JSON.stringify(sonidosActivos));
  localStorage.setItem(`${CLAVE}-configuracion`, JSON.stringify(configuracion));
  if (datosMigrados) localStorage.setItem(`${CLAVE}-migracion-datos`, MIGRACION_DATOS_ACTUAL);
}

function estadoActual() {
  return { servicios, citas, bloqueos, personal, clientas, modoOscuro, configuracion, actualizadoEn: new Date().toISOString() };
}

function aplicarEstado(datos) {
  if (!datos) return;
  servicios = Array.isArray(datos.servicios) ? datos.servicios : servicios;
  citas = Array.isArray(datos.citas) ? datos.citas : citas;
  bloqueos = Array.isArray(datos.bloqueos) ? datos.bloqueos : bloqueos;
  personal = Array.isArray(datos.personal) ? datos.personal : personal;
  clientas = Array.isArray(datos.clientas) ? datos.clientas : clientas;
  modoOscuro = typeof datos.modoOscuro === "boolean" ? datos.modoOscuro : modoOscuro;
  configuracion = datos.configuracion && typeof datos.configuracion === "object" ? datos.configuracion : configuracion;
  normalizarDatos();
  aplicarModoOscuro();
  aplicarConfiguracion();
  actualizarSelectorUsuarios();
}

async function supabaseRpc(nombre, parametros = {}) {
  const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${nombre}`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(parametros)
  });
  const texto = await respuesta.text();
  if (!respuesta.ok) {
    const error = new Error(texto || respuesta.statusText);
    error.status = respuesta.status;
    throw error;
  }
  return texto ? JSON.parse(texto) : null;
}

async function llamarFuncionSupabase(nombre, datos = {}) {
  const respuesta = await fetch(`${SUPABASE_URL}/functions/v1/${nombre}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  });
  const texto = await respuesta.text();
  let cuerpo = null;
  try { cuerpo = texto ? JSON.parse(texto) : null; } catch { cuerpo = { error: texto }; }
  if (!respuesta.ok) {
    const error = new Error(cuerpo?.error || texto || `Error ${respuesta.status}`);
    error.status = respuesta.status;
    throw error;
  }
  return cuerpo;
}

async function cargarUsuariosPublicos() {
  try {
    const lista = await supabaseRpc("agenda_listar_usuarios");
    if (Array.isArray(lista) && lista.length) {
      usuarios = lista.map(item => ({ usuario: item.usuario, nombre: item.nombre, rol: item.rol === "editora" ? "editora" : "soloVista" }));
      guardarLocal();
      actualizarSelectorUsuarios();
    }
    return true;
  } catch (error) {
    console.warn("No se pudo cargar la lista segura de usuarios:", error);
    return false;
  }
}

async function cargarRemoto(silencioso = false) {
  if (!tokenSesion) return false;
  try {
    const resultado = await supabaseRpc("agenda_obtener_estado", { p_token: tokenSesion });
    remotoListo = true;
    versionRemota = resultado?.version || null;
    if (resultado?.usuario) {
      usuarioActual = { ...resultado.usuario };
      const indice = usuarios.findIndex(item => item.usuario === usuarioActual.usuario);
      if (indice >= 0) usuarios[indice] = { ...usuarioActual };
    }
    if (resultado?.datos) aplicarEstado(resultado.datos);
    guardarLocal();
    if (datosMigrados && puedeEditar()) setTimeout(() => guardarRemoto(), 250);
    return true;
  } catch (error) {
    remotoListo = false;
    console.warn("Supabase aún no está listo:", error);
    if (error?.status === 401 || /SESION_INVALIDA|28000/i.test(error?.message || "")) {
      tokenSesion = "";
      localStorage.removeItem(`${CLAVE}-token`);
      sessionStorage.removeItem(`${CLAVE}-token`);
      if (!silencioso) mostrarMensaje("Sesión vencida", "Vuelve a iniciar sesión.", "alerta");
    } else if (!silencioso) mostrarMensaje("Sin conexión a la agenda", "No se pudo leer Supabase. Revisa la conexión.", "alerta");
    return false;
  }
}

async function guardarRemoto() {
  if (!remotoListo || !tokenSesion || !versionRemota) return false;
  if (guardandoRemoto) {
    guardadoRemotoPendiente = true;
    return false;
  }
  guardandoRemoto = true;
  let guardadoExitoso = false;
  try {
    const resultado = await supabaseRpc("agenda_guardar_estado", {
      p_token: tokenSesion,
      p_datos: estadoActual(),
      p_version: versionRemota
    });
    if (resultado?.conflicto) {
      versionRemota = resultado.version;
      aplicarEstado(resultado.datos);
      guardarLocal();
      guardadoRemotoPendiente = false;
      mostrarMensaje("La agenda cambió en otro dispositivo", "Se cargó la versión más reciente para evitar sobrescribir información. Repite tu último cambio.", "alerta");
      return false;
    }
    if (!resultado?.ok || !resultado?.version) throw new Error("Supabase no confirmó el guardado.");
    versionRemota = resultado.version;
    guardadoExitoso = true;
    clearTimeout(reintentoRemoto);
    return true;
  } catch (error) {
    console.warn("No se pudo guardar en Supabase:", error);
    if (error?.status === 401 || error?.status === 403 || /SESION_INVALIDA|SOLO_LECTURA|28000|42501/i.test(error?.message || "")) {
      guardadoRemotoPendiente = false;
      mostrarMensaje("No se pudo guardar", "La sesión venció o este perfil no tiene permiso para editar.", "alerta");
      return false;
    }
    guardadoRemotoPendiente = true;
    mostrarMensaje("No se guardó en internet", "Reintentaremos automáticamente en unos segundos.", "alerta");
    clearTimeout(reintentoRemoto);
    reintentoRemoto = setTimeout(() => {
      if (remotoListo) guardarRemoto();
    }, 5000);
    return false;
  } finally {
    guardandoRemoto = false;
    if (guardadoExitoso && guardadoRemotoPendiente && remotoListo) {
      guardadoRemotoPendiente = false;
      guardarRemoto();
    }
  }
}

function normalizarDatos() {
  const usuariosGuardados = Array.isArray(usuarios) ? usuarios : [];
  if (!usuariosGuardados.length) usuariosGuardados.push(...usuariosBase.map(base => ({ ...base })));
  usuarios = usuariosGuardados
    .filter((item, indice, lista) => item?.usuario && lista.findIndex(otro => otro.usuario === item.usuario) === indice)
    .map(item => ({
      usuario: String(item.usuario).trim().toLowerCase(),
      rol: String(item.usuario).trim().toLowerCase() === "maria" || item.rol === "editora" ? "editora" : "soloVista",
      nombre: String(item.nombre || item.usuario).trim()
    }));
  configuracion = {
    ...configuracionBase,
    ...(configuracion && typeof configuracion === "object" ? configuracion : {}),
    tipoCambio: Number(configuracion?.tipoCambio || configuracionBase.tipoCambio)
  };
  const migracionPendiente = configuracion.migracionDatos !== MIGRACION_DATOS_ACTUAL;
  if (migracionPendiente || !configuracion.logo || configuracion.logo.includes("logo-oh-ma-belle")) {
    configuracion.logo = LOGO_PREDETERMINADO;
    configuracion.migracionDatos = MIGRACION_DATOS_ACTUAL;
    datosMigrados = true;
  }
  if (migracionPendiente) servicios = serviciosBase.map(servicio => clonarServicioBase(servicio));
  servicios = servicios.map((servicio, indice) => ({
    nombre: servicio.nombre === "Pestanas" ? "Pestañas" : (servicio.nombre || "Servicio"),
    descripcion: servicio.descripcion || "",
    confirmacion: servicio.confirmacion || "",
    imagen: "",
    duracion: Number(servicio.duracion || 30),
    precio: Number(servicio.precio || 0),
    capacidad: Number(servicio.capacidad || 1),
    anticipo: Number(servicio.anticipo || 0),
    pagoEfectivo: servicio.pagoEfectivo !== false,
    pagoTransferencia: !!servicio.pagoTransferencia,
    color: servicio.color || ["rosa", "dorado", "uva", "verde"][indice % 4],
    personalAsignado: Array.isArray(servicio.personalAsignado) ? servicio.personalAsignado : [],
    detalles: normalizarDetallesServicio(servicio),
    horarios: normalizarHorarios(servicio.horarios)
  }));
  if (servicios.some(servicio => servicio.imagen)) datosMigrados = true;
  if (servicios.some(servicio => nombreComparable(servicio.nombre) === "manicure" && JSON.stringify(servicio.detalles) !== JSON.stringify(detallesManicureBase))) datosMigrados = true;
  personal = personal.filter(persona => !personalRetirado.includes(nombreComparable(persona?.nombre))).map(persona => ({
    id: persona.id || idNuevo(),
    nombre: persona.nombre || "Personal",
    descripcion: persona.descripcion || "",
    email: persona.email || "",
    foto: persona.foto || "",
    fraccion: Number(persona.fraccion || 30),
    activo: persona.activo !== false,
    horarios: normalizarHorarios(persona.horarios)
  }));
  if (migracionPendiente) {
    [...servicios, ...personal].forEach(item => {
      const domingo = item.horarios?.find(horario => horario.dia === "Domingo");
      if (domingo) Object.assign(domingo, { activo: true, inicio: "09:00", fin: "18:00" });
    });
  }
  clientas = (Array.isArray(clientas) ? clientas : []).map(clienta => ({
    id: clienta.id || idNuevo(),
    nombre: String(clienta.nombre || "Clienta").trim(),
    telefono: String(clienta.telefono || "").replace(/\D/g, "").slice(0, 10),
    notas: String(clienta.notas || ""),
    creadaEn: clienta.creadaEn || new Date().toISOString()
  })).filter((clienta, indice, lista) => clienta.telefono && lista.findIndex(item => item.telefono === clienta.telefono) === indice);
  citas = citas.map(cita => ({
    ...cita,
    servicio: cita.servicio === "Pestanas" ? "Pestañas" : cita.servicio,
    serviciosDetalle: Array.isArray(cita.serviciosDetalle) && cita.serviciosDetalle.length ? cita.serviciosDetalle : [{
      nombre: cita.servicio === "Pestanas" ? "Pestañas" : (cita.servicio || "Servicio"),
      detalle: cita.detalleServicio || "",
      duracion: Number(servicioPorNombre(cita.servicio)?.duracion || cita.duracion || 30),
      precio: Number(cita.precio || 0)
    }],
    personal: personalRetirado.includes(nombreComparable(cita.personal)) ? "" : cita.personal,
    metodoPago: cita.metodoPago === "Tarjeta" ? "" : cita.metodoPago,
    abonos: Array.isArray(cita.abonos) ? cita.abonos : [],
    confirmacionToken: cita.confirmacionToken || tokenConfirmacionNuevo(),
    confirmadaCliente: !!cita.confirmadaCliente,
    confirmadaEn: cita.confirmadaEn || null,
    liquidada: !!cita.liquidada || (Number(cita.anticipo || 0) >= Number(cita.precio || 0) && Number(cita.precio || 0) > 0)
  }));
  citas.forEach(cita => {
    let clienta = clientas.find(item => item.telefono === cita.telefono);
    if (!clienta && /^\d{10}$/.test(cita.telefono || "")) {
      clienta = { id: idNuevo(), nombre: cita.cliente || "Clienta", telefono: cita.telefono, notas: "", creadaEn: new Date().toISOString() };
      clientas.push(clienta);
    }
    if (clienta) cita.clienteId = clienta.id;
  });
  guardarLocal();
}

function horariosBase() {
  return ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map(dia => ({
    dia,
    activo: true,
    inicio: "09:00",
    fin: "18:00"
  }));
}

function normalizarHorarios(horarios) {
  const lista = Array.isArray(horarios) ? horarios : horariosBase();
  const normalizados = lista.map(item => ({
    ...item,
    dia: item.dia === "Miercoles" ? "Miércoles" : item.dia === "Sabado" ? "Sábado" : item.dia
  }));
  return horariosBase().map(base => {
    const guardado = normalizados.find(item => item.dia === base.dia);
    return guardado ? { ...base, ...guardado } : base;
  });
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

function tokenConfirmacionNuevo() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
}

function actualizarSelectorUsuarios() {
  const selector = document.getElementById("usuario");
  if (!selector) return;
  const seleccionado = selector.value;
  selector.innerHTML = `<option value="">Selecciona un usuario</option>${usuarios.map(item => `<option value="${item.usuario}">${item.nombre}</option>`).join("")}`;
  if (usuarios.some(item => item.usuario === seleccionado)) selector.value = seleccionado;
}

function aplicarConfiguracion() {
  const logo = configuracion.logo || LOGO_PREDETERMINADO;
  document.querySelectorAll(".login-logo, .brand img").forEach(imagen => imagen.src = logo);
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
  if (!usuario || !clave) {
    document.getElementById("mensaje").textContent = "Selecciona el usuario y escribe la contraseña";
    return;
  }
  try {
    const sesion = await supabaseRpc("agenda_iniciar_sesion", { p_usuario: usuario, p_clave: clave });
    tokenSesion = sesion.token;
    usuarioActual = { usuario: sesion.usuario, nombre: sesion.nombre, rol: sesion.rol };
  } catch (error) {
    console.warn("Inicio de sesión rechazado:", error);
    document.getElementById("mensaje").textContent = "Usuario o contraseña incorrectos";
    return;
  }
  const recordar = !!document.getElementById("recordarme")?.checked;
  localStorage.removeItem(`${CLAVE}-sesion`);
  if (recordar) {
    localStorage.setItem(`${CLAVE}-token`, tokenSesion);
    sessionStorage.removeItem(`${CLAVE}-token`);
  } else {
    sessionStorage.setItem(`${CLAVE}-token`, tokenSesion);
    localStorage.removeItem(`${CLAVE}-token`);
  }
  remotoListo = true;
  if (!await cargarRemoto()) return;
  mostrarSistemaDesdeSesion(recordar);
}

function mostrarSistemaDesdeSesion(recordada = false) {
  document.body.classList.toggle("modo-solo-ver", !puedeEditar());
  document.getElementById("rolActual").textContent = usuarioActual.nombre;
  document.getElementById("pantallaLogin").style.display = "none";
  document.getElementById("sistema").style.display = "flex";
  document.getElementById("recordarme").checked = recordada;
  if (screen.orientation?.lock) screen.orientation.lock("portrait").catch(() => {});
  mostrarInicio();
}

function cerrarSesion() {
  if (tokenSesion) supabaseRpc("agenda_cerrar_sesion", { p_token: tokenSesion }).catch(() => {});
  usuarioActual = null;
  tokenSesion = "";
  versionRemota = null;
  remotoListo = false;
  localStorage.removeItem(`${CLAVE}-sesion`);
  localStorage.removeItem(`${CLAVE}-token`);
  sessionStorage.removeItem(`${CLAVE}-token`);
  document.body.classList.remove("modo-solo-ver");
  document.getElementById("pantallaLogin").style.display = "grid";
  document.getElementById("sistema").style.display = "none";
  document.getElementById("usuario").value = "";
  document.getElementById("clave").value = "";
  document.getElementById("recordarme").checked = false;
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
  reproducirSonido(tipo === "ok" ? "success" : "danger", tipo === "ok" ? 0.5 : 0.45);
  setTimeout(() => modal.style.display = "none", tipo === "ok" ? 2200 : 4200);
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
  const montoPesos = Number(valor || 0);
  return `$${montoPesos.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} MXN`;
}

function valorParaEntrada(valorEnPesos) {
  return Number(valorEnPesos || 0);
}

function valorDesdeEntrada(valorMostrado) {
  return Number(valorMostrado || 0);
}

function simboloMoneda() {
  return "$";
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

function kpi(titulo, valor, texto, icono, clase = "", accion = "") {
  return `<article class="kpi ${clase} ${accion ? "kpi-action" : ""}" ${accion ? `role="button" tabindex="0" onclick="${accion}" onkeydown="if(event.key==='Enter')${accion}"` : ""}>
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
      ${kpi("Turnos pendientes", resumen.pendientes.length, "Total de próximos turnos", "turnos-pendientes", "morado")}
      ${kpi("Ingresos del día", dinero(resumen.ingresos), "Pagos estimados por revisar", "ingresos-dia", "verde")}
    </div>

    <section class="panel soft">
      <h2>Últimas cancelaciones</h2>
      <p>Listado de reservas canceladas recientemente. Puedes contactar rápidamente a las clientas para reprogramar.</p>
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
    <input id="citaTelefono" placeholder="Teléfono">
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
      <span>${cita.servicio} · ${cita.telefono || "Sin teléfono"}</span>
      <small>${cita.estado} · ${dinero(cita.precio)}</small>
    </div>
    <div class="acciones-cita">
      ${puedeEditar() && cita.estado !== "Cancelada" ? `<button type="button" onclick="marcarAtendida(${cita.id})">Atendida</button><button type="button" onclick="cancelarCita(${cita.id})">Cancelar</button><button type="button" onclick="eliminarCita(${cita.id})">Eliminar</button>` : ""}
    </div>
  </article>`).join("") || `<div class="vacio agenda-vacia">No hay citas para este día.</div>`;
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
  if (bloqueos.some(b => b.fecha === cita.fecha && b.hora === cita.hora)) return mostrarMensaje("Horario bloqueado", "Ese horario no está disponible.", "alerta");
  citas.push(cita);
  guardar();
  mostrarMensaje("Cita guardada", "La reserva quedó registrada.");
  mostrarInicio(cita.fecha);
}

function marcarAtendida(id) {
  if (!exigirEdicion()) return;
  const cita = citas.find(item => item.id === id);
  if (!cita) return;
  cita.estado = "Atendida";
  cita.servicioRealizadoEn = new Date().toISOString();
  guardar();
  mostrarInicio(cita.fecha || hoy());
  if (saldoCita(cita) <= 0) mostrarTicketPago(cita.id);
  else mostrarMensaje("Servicio realizado", "La cita seguirá en rojo hasta completar el pago.", "alerta");
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
  const datos = calcularEstadisticas(tipoPeriodo, valor);
  const porServicio = datos.porServicio.map(item => `<tr><td>${item.nombre}</td><td>${item.total}</td><td>${dinero(item.dinero)}</td></tr>`).join("");
  const porPersonal = datos.porPersonal.map(item => `<tr><td>${item.nombre}</td><td>${item.total}</td><td>${dinero(item.dinero)}</td></tr>`).join("");
  document.getElementById("contenido").innerHTML = `
    <section class="panel stats-filter">
      <div class="stats-title-row"><div><h2>Estadísticas por periodo</h2><p>Consulta el trabajo realizado y los ingresos estimados.</p></div><div class="stats-actions"><button type="button" onclick="exportarEstadisticasExcel()">Exportar a Excel</button><button class="primary-action" type="button" onclick="imprimirEstadisticas()">Imprimir reporte</button></div></div>
      <div class="stats-picker">
        <div><label>Periodo</label><select id="statsTipo" onchange="cambiarFiltroEstadisticas()"><option value="mes" ${tipoPeriodo === "mes" ? "selected" : ""}>Mes completo</option><option value="dia" ${tipoPeriodo === "dia" ? "selected" : ""}>Día exacto</option></select></div>
        <div><label>${tipoPeriodo === "dia" ? "Día" : "Mes"}</label><input id="statsFecha" type="${tipoPeriodo === "dia" ? "date" : "month"}" value="${valor}" onchange="cambiarFiltroEstadisticas()"></div>
      </div>
    </section>
    <div class="kpi-grid">
      ${kpi("Citas activas", datos.activas.length, "Reservas no canceladas", "citas-activas")}
      ${kpi("Canceladas", datos.canceladas.length, "Historial del periodo", "canceladas", "dorado")}
      ${kpi("Ingresos estimados", dinero(datos.ingresos), "Según el precio de las citas", "ingresos-estimados", "verde")}
      ${kpi("Personal activo", datos.porPersonal.filter(item => item.total > 0).length, "Con trabajo en el periodo", "personal")}
    </div>
    <section class="stats-charts">
      ${graficaPastel3D("Servicios más vendidos", datos.porServicio.map(item => ({ nombre: item.nombre, valor: item.total })), "citas")}
      ${graficaPastel3D("Servicios que generaron más ingresos", datos.porServicio.map(item => ({ nombre: item.nombre, valor: item.dinero })), "dinero")}
    </section>
    <section class="stats-charts">
      ${graficaPastel3D("Personal con más citas", datos.porPersonal.map(item => ({ nombre: item.nombre, valor: item.total })), "citas")}
      ${graficaPastel3D("Personal que generó más ingresos", datos.porPersonal.map(item => ({ nombre: item.nombre, valor: item.dinero })), "dinero")}
    </section>
    <section class="stats-tables">
      <article class="panel"><h2>Estadísticas por servicio</h2><table><thead><tr><th>Servicio</th><th>Citas</th><th>Ingresos</th></tr></thead><tbody>${porServicio || `<tr><td colspan="3" class="vacio">No hay datos en este periodo.</td></tr>`}</tbody></table></article>
      <article class="panel"><h2>Estadísticas por personal</h2><table><thead><tr><th>Personal</th><th>Citas realizadas</th><th>Ingresos generados</th></tr></thead><tbody>${porPersonal || `<tr><td colspan="3" class="vacio">No hay datos en este periodo.</td></tr>`}</tbody></table></article>
    </section>`;
}

function calcularEstadisticas(tipoPeriodo, valor) {
  const activas = citasActivas().filter(cita => citaEnPeriodo(cita, tipoPeriodo, valor));
  const canceladas = citasCanceladas().filter(cita => citaEnPeriodo(cita, tipoPeriodo, valor));
  const ingresos = activas.reduce((suma, cita) => suma + Number(cita.precio || 0), 0);
  const nombresServicios = [...new Set([...servicios.map(item => item.nombre), ...activas.flatMap(cita => detallesServiciosCita(cita).map(item => item.nombre))])];
  const nombresPersonal = [...new Set([...personal.map(item => item.nombre), ...activas.map(item => item.personal || "Sin asignar")])];
  const resumir = (nombres, propiedad) => nombres.map(nombre => {
    if (propiedad === "servicio") {
      const lista = activas.filter(cita => detallesServiciosCita(cita).some(item => item.nombre === nombre));
      const dineroServicio = lista.reduce((suma, cita) => {
        const detalles = detallesServiciosCita(cita);
        const subtotal = detalles.reduce((total, item) => total + Number(item.precio || 0), 0) || 1;
        const precioServicio = detalles.filter(item => item.nombre === nombre).reduce((total, item) => total + Number(item.precio || 0), 0);
        return suma + Number(cita.precio || 0) * (precioServicio / subtotal);
      }, 0);
      return { nombre, total: lista.length, dinero: dineroServicio };
    }
    const lista = activas.filter(cita => (cita[propiedad] || "Sin asignar") === nombre);
    return { nombre, total: lista.length, dinero: lista.reduce((suma, cita) => suma + Number(cita.precio || 0), 0) };
  }).sort((a, b) => b.total - a.total || b.dinero - a.dinero);
  return {
    activas,
    canceladas,
    ingresos,
    porServicio: resumir(nombresServicios, "servicio"),
    porPersonal: resumir(nombresPersonal, "personal")
  };
}

function periodoEstadisticasActual() {
  const tipo = document.getElementById("statsTipo")?.value || "mes";
  const valor = document.getElementById("statsFecha")?.value || (tipo === "mes" ? hoy().slice(0, 7) : hoy());
  return { tipo, valor, datos: calcularEstadisticas(tipo, valor) };
}

function etiquetaPeriodo(tipo, valor) {
  return tipo === "mes" ? nombreMes(`${valor}-01`) : formatoFecha(valor);
}

function exportarEstadisticasExcel() {
  const { tipo, valor, datos } = periodoEstadisticasActual();
  const filas = [
    ["OH, MA BELLE - REPORTE DE ESTADÍSTICAS"],
    ["Periodo", etiquetaPeriodo(tipo, valor)],
    ["Citas activas", datos.activas.length],
    ["Canceladas", datos.canceladas.length],
    ["Ingresos", dinero(datos.ingresos)],
    [],
    ["ESTADÍSTICAS POR PERSONAL"],
    ["Personal", "Citas realizadas", "Ingresos generados"],
    ...datos.porPersonal.map(item => [item.nombre, item.total, dinero(item.dinero)]),
    [],
    ["ESTADÍSTICAS POR SERVICIO"],
    ["Servicio", "Citas", "Ingresos"],
    ...datos.porServicio.map(item => [item.nombre, item.total, dinero(item.dinero)])
  ];
  const csv = `\uFEFF${filas.map(fila => fila.map(valorCelda => `"${String(valorCelda ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n")}`;
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  enlace.download = `estadisticas-oh-ma-belle-${valor}.csv`;
  enlace.click();
  URL.revokeObjectURL(enlace.href);
  mostrarMensaje("Reporte preparado", "El archivo puede abrirse directamente en Excel.", "ok");
}

function imprimirEstadisticas() {
  const { tipo, valor, datos } = periodoEstadisticasActual();
  const logoReporte = configuracion.logo || new URL(LOGO_PREDETERMINADO, window.location.href).href;
  const filas = lista => lista.map(item => `<tr><td>${item.nombre}</td><td>${item.total}</td><td>${dinero(item.dinero)}</td></tr>`).join("");
  const grafica = (titulo, lista, propiedad, tipoValor) => {
    const colores = ["#6d63ef", "#d68c2f", "#2fbf93", "#cf4f78", "#8a63d2", "#4aa3df", "#b46a56"];
    const utiles = lista.map(item => ({ nombre: item.nombre, valor: Number(item[propiedad] || 0) })).filter(item => item.valor > 0);
    const total = utiles.reduce((suma, item) => suma + item.valor, 0);
    if (!total) return `<article class="grafica"><h3>${titulo}</h3><p class="sin-datos">Sin datos en este periodo.</p></article>`;
    let acumulado = 0;
    const segmentos = utiles.map((item, indice) => {
      const inicio = acumulado;
      acumulado += item.valor / total * 100;
      return `${colores[indice % colores.length]} ${inicio}% ${acumulado}%`;
    }).join(",");
    const leyenda = utiles.map((item, indice) => `<li><i style="background:${colores[indice % colores.length]}"></i><span>${item.nombre}</span><b>${tipoValor === "dinero" ? dinero(item.valor) : `${item.valor} cita(s)`}</b></li>`).join("");
    return `<article class="grafica"><h3>${titulo}</h3><div class="grafica-contenido"><div class="pastel" style="background:conic-gradient(${segmentos})"></div><ul>${leyenda}</ul></div></article>`;
  };
  const graficas = [
    grafica("Servicios más vendidos", datos.porServicio, "total", "citas"),
    grafica("Ingresos por servicio", datos.porServicio, "dinero", "dinero"),
    grafica("Personal con más citas", datos.porPersonal, "total", "citas"),
    grafica("Ingresos por personal", datos.porPersonal, "dinero", "dinero")
  ].join("");
  const ventana = window.open("", "_blank", "width=960,height=720");
  if (!ventana) return mostrarMensaje("No se pudo abrir", "Permite las ventanas emergentes para imprimir el reporte.", "alerta");
  ventana.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Reporte ${NOMBRE_NEGOCIO}</title><style>*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#28233b;margin:36px}header{display:flex;align-items:center;gap:18px;border-bottom:3px solid #6d63ef;padding-bottom:18px}header img{width:120px;height:70px;object-fit:contain}h1{margin:0;font-size:28px}h2{margin-top:30px;color:#513c75}h3{margin:0 0 14px;color:#513c75;font-size:16px}.resumen{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:24px 0}.dato{padding:16px;border:1px solid #ddd5e8;border-radius:8px}.dato strong{display:block;font-size:22px;margin-top:8px}.graficas{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:18px 0}.grafica{padding:16px;border:1px solid #ddd5e8;border-radius:8px;break-inside:avoid}.grafica-contenido{display:grid;grid-template-columns:110px 1fr;align-items:center;gap:14px}.pastel{width:106px;height:106px;border-radius:50%;box-shadow:inset -8px -10px 0 rgba(40,35,59,.14),0 7px 0 #d9d3e3}.grafica ul{list-style:none;padding:0;margin:0}.grafica li{display:grid;grid-template-columns:10px 1fr auto;gap:6px;align-items:center;padding:3px 0;font-size:10px}.grafica li i{width:9px;height:9px;border-radius:2px}.grafica li b{text-align:right}.sin-datos{color:#777}table{width:100%;border-collapse:collapse;margin-top:12px}th,td{padding:11px;border-bottom:1px solid #e8e3ee;text-align:left}th{background:#f4f0fb}@media print{body{margin:10mm}.graficas{page-break-after:always}.grafica{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body><header><img src="${logoReporte}" alt="Logo"><div><h1>${NOMBRE_NEGOCIO}</h1><p>Reporte de estadísticas · ${etiquetaPeriodo(tipo, valor)}</p></div></header><section class="resumen"><div class="dato">Citas activas<strong>${datos.activas.length}</strong></div><div class="dato">Canceladas<strong>${datos.canceladas.length}</strong></div><div class="dato">Ingresos<strong>${dinero(datos.ingresos)}</strong></div></section><h2>Gráficas del periodo</h2><section class="graficas">${graficas}</section><h2>Resultados por personal</h2><table><thead><tr><th>Personal</th><th>Citas</th><th>Ingresos</th></tr></thead><tbody>${filas(datos.porPersonal)}</tbody></table><h2>Resultados por servicio</h2><table><thead><tr><th>Servicio</th><th>Citas</th><th>Ingresos</th></tr></thead><tbody>${filas(datos.porServicio)}</tbody></table></body></html>`);
  ventana.document.close();
  setTimeout(() => ventana.print(), 300);
}

function citaEnPeriodo(cita, tipoPeriodo, valor) {
  if (!cita?.fecha) return false;
  return tipoPeriodo === "mes" ? cita.fecha.slice(0, 7) === valor : cita.fecha === valor;
}

function cambiarFiltroEstadisticas() {
  const tipo = document.getElementById("statsTipo").value;
  const campo = document.getElementById("statsFecha");
  let valor = campo.value;
  if (tipo === "dia" && campo.type === "month") valor = valor === hoy().slice(0, 7) ? hoy() : `${valor}-01`;
  if (tipo === "mes" && campo.type === "date") valor = valor.slice(0, 7);
  if (!valor) valor = tipo === "mes" ? hoy().slice(0, 7) : hoy();
  mostrarEstadisticas(tipo, valor);
}

function graficaPastel3D(titulo, datos, tipo = "citas") {
  const colores = ["#6d63ef", "#d68c2f", "#2fbf93", "#cf4f78", "#8a63d2", "#4aa3df", "#b46a56"];
  const utiles = datos.filter(item => Number(item.valor || 0) > 0);
  const total = utiles.reduce((s, item) => s + Number(item.valor || 0), 0);
  if (!total) {
    return `<section class="panel chart-card"><h2>${titulo}</h2><div class="chart-empty">Aún no hay datos para este periodo.</div></section>`;
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
  if (!nombre || duracion <= 0) return mostrarMensaje("Faltan datos", "Agrega nombre y duración.", "alerta");
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
      <table><thead><tr><th>Fecha</th><th>Hora</th><th>Motivo</th><th>Acción</th></tr></thead><tbody>${bloqueos.map(b => `<tr><td>${formatoFecha(b.fecha)}</td><td>${b.hora}</td><td>${b.motivo || "-"}</td><td>${puedeEditar() ? `<button type="button" onclick="eliminarBloqueo(${b.id})">Eliminar</button>` : "-"}</td></tr>`).join("") || `<tr><td colspan="4" class="vacio">No hay horarios bloqueados.</td></tr>`}</tbody></table>
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
  document.getElementById("contenido").innerHTML = `<section class="panel"><h2>Extras</h2><div class="extra-grid"><article>Recordatorios por WhatsApp</article><article>Notas de clientas</article></div></section>`;
}

function mostrarTransferencias() {
  activarMenu("transferencias");
  const pagos = citasActivas().filter(c => Number(c.precio || 0) > 0);
  document.getElementById("contenido").innerHTML = `<section class="panel"><h2>Transferencias</h2><table><thead><tr><th>Cliente</th><th>Servicio</th><th>Fecha</th><th>Monto</th></tr></thead><tbody>${pagos.map(c => `<tr><td>${c.cliente}</td><td>${c.servicio}</td><td>${formatoFecha(c.fecha)}</td><td>${dinero(c.precio)}</td></tr>`).join("") || `<tr><td colspan="4" class="vacio">No hay pagos pendientes.</td></tr>`}</tbody></table></section>`;
}

function mostrarSuscripcion() {
  activarMenu("suscripcion");
  document.getElementById("contenido").innerHTML = `<section class="panel suscripcion"><h2>Mi suscripción</h2><strong>Premium</strong><p>Agenda activa para ${NOMBRE_NEGOCIO} ${SUBTITULO_NEGOCIO}.</p></section>`;
}

function historialDeClienta(clienta) {
  return citas.filter(cita => cita.clienteId === clienta.id || cita.telefono === clienta.telefono)
    .sort((a, b) => `${b.fecha} ${b.hora}`.localeCompare(`${a.fecha} ${a.hora}`));
}

function mostrarClientas(busqueda = "") {
  activarMenu("clientas");
  document.getElementById("contenido").innerHTML = `
    <section class="panel clientas-head">
      <div><h2>Clientas</h2><p>Consulta sus visitas y servicios anteriores.</p></div>
      <div class="client-search"><input id="buscarClienta" value="${escaparAtributo(busqueda)}" placeholder="Buscar por nombre o teléfono" oninput="filtrarClientasEnVivo(this.value)"><span id="conteoClientas"></span></div>
    </section>
    <section id="resultadosClientas" class="clientas-grid"></section>`;
  filtrarClientasEnVivo(busqueda);
}

function tarjetaClienta(clienta) {
      const historial = historialDeClienta(clienta);
      const ultima = historial[0];
      return `<article class="client-card"><div class="client-avatar">${clienta.nombre.charAt(0).toUpperCase()}</div><div><h3>${clienta.nombre}</h3><a href="tel:${clienta.telefono}">${clienta.telefono}</a><p>${historial.length} visita(s)${ultima ? ` · Última: ${formatoFecha(ultima.fecha)}` : ""}</p></div><div class="client-actions"><button type="button" onclick="verHistorialClienta(${clienta.id})">Ver historial</button>${puedeEditar() ? `<button type="button" onclick="abrirClientaModal(${clienta.id})">Editar</button>` : ""}</div></article>`;
}

function distanciaTexto(a, b) {
  const anterior = Array.from({ length: b.length + 1 }, (_, indice) => indice);
  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = anterior[0];
    anterior[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const arriba = anterior[j];
      anterior[j] = Math.min(anterior[j] + 1, anterior[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1));
      diagonal = arriba;
    }
  }
  return anterior[b.length];
}

function filtrarClientasEnVivo(busqueda = "") {
  const contenedor = document.getElementById("resultadosClientas");
  if (!contenedor) return;
  const termino = nombreComparable(busqueda);
  const digitos = String(busqueda).replace(/\D/g, "");
  let lista = clientas.map(clienta => {
    const nombre = nombreComparable(clienta.nombre);
    const telefono = String(clienta.telefono || "");
    let puntaje = 0;
    if (termino || digitos) {
      if (digitos && telefono.includes(digitos)) puntaje = telefono.startsWith(digitos) ? 0 : 1;
      else if (digitos) puntaje = 10 + distanciaTexto(digitos, telefono);
      else if (nombre === termino) puntaje = 0;
      else if (nombre.startsWith(termino) || nombre.split(" ").some(parte => parte.startsWith(termino))) puntaje = 1;
      else if (nombre.includes(termino)) puntaje = 2 + nombre.indexOf(termino) / 100;
      else puntaje = 10 + Math.min(distanciaTexto(termino, nombre), ...nombre.split(" ").map(parte => distanciaTexto(termino, parte)));
    }
    return { clienta, puntaje };
  }).sort((a, b) => a.puntaje - b.puntaje || a.clienta.nombre.localeCompare(b.clienta.nombre, "es"));
  if (termino || digitos) {
    const coincidencias = lista.filter(item => item.puntaje < 10);
    lista = coincidencias.length ? coincidencias : lista.slice(0, 3);
  }
  contenedor.innerHTML = lista.map(item => tarjetaClienta(item.clienta)).join("") || `<div class="panel empty-state"><h2>No encontramos clientas</h2><p>Prueba con otro nombre o teléfono.</p></div>`;
  const conteo = document.getElementById("conteoClientas");
  if (conteo) conteo.textContent = `${lista.length} resultado${lista.length === 1 ? "" : "s"}`;
}

function abrirClientaModal(id = null) {
  if (!exigirEdicion()) return;
  const clienta = id === null ? null : clientas.find(item => item.id === id);
  abrirModal(clienta ? "Editar clienta" : "Nueva clienta", `<form class="modal-stack" novalidate onsubmit="guardarClientaModal(event, ${clienta?.id ?? "null"})"><label>Nombre completo</label><input id="clientaNombre" value="${escaparAtributo(clienta?.nombre)}" required><label>Teléfono</label><input id="clientaTelefono" type="tel" inputmode="numeric" maxlength="10" value="${escaparAtributo(clienta?.telefono)}" oninput="this.value=this.value.replace(/\\D/g,'').slice(0,10)" required><label>Notas</label><textarea id="clientaNotas" rows="4" placeholder="Preferencias, alergias o información importante">${clienta?.notas || ""}</textarea><div class="modal-actions"><button type="button" onclick="cerrarModalFormulario()">Cancelar</button><button class="primary-action" type="submit">Guardar clienta</button></div></form>`);
}

function guardarClientaModal(event, id = null) {
  event.preventDefault();
  const nombre = document.getElementById("clientaNombre").value.trim();
  const telefono = document.getElementById("clientaTelefono").value.trim();
  if (!nombre) return mostrarMensaje("Faltan datos", "Escribe el nombre de la clienta.", "alerta");
  if (!/^\d{10}$/.test(telefono)) return mostrarMensaje("Teléfono incorrecto", "El teléfono debe tener exactamente 10 números.", "alerta");
  if (clientas.some(item => item.telefono === telefono && item.id !== id)) return mostrarMensaje("Clienta existente", "Ese teléfono ya pertenece a otra clienta.", "alerta");
  const anterior = clientas.find(item => item.id === id);
  const clienta = { id: anterior?.id || idNuevo(), nombre, telefono, notas: document.getElementById("clientaNotas").value.trim(), creadaEn: anterior?.creadaEn || new Date().toISOString() };
  if (anterior) clientas[clientas.indexOf(anterior)] = clienta; else clientas.push(clienta);
  citas.forEach(cita => { if (cita.clienteId === clienta.id || cita.telefono === anterior?.telefono) { cita.clienteId = clienta.id; cita.cliente = clienta.nombre; cita.telefono = clienta.telefono; } });
  guardar(); cerrarModalFormulario(); mostrarClientas(); mostrarMensaje("Clienta guardada", "Su historial quedó actualizado.", "ok");
}

function verHistorialClienta(id) {
  const clienta = clientas.find(item => item.id === id); if (!clienta) return;
  const historial = historialDeClienta(clienta);
  const completadas = historial.filter(cita => cita.estado === "Atendida");
  const totalGastado = completadas.reduce((total, cita) => total + Number(cita.precio || 0), 0);
  const conteoServicios = {};
  completadas.forEach(cita => detallesServiciosCita(cita).forEach(servicio => {
    conteoServicios[servicio.nombre] = (conteoServicios[servicio.nombre] || 0) + 1;
  }));
  const favorito = Object.entries(conteoServicios).sort((a, b) => b[1] - a[1])[0]?.[0] || "Aún sin datos";
  const ultimaVisita = completadas[0];
  const movimientos = historial.map(cita => {
    const visual = estadoVisualCita(cita);
    return `<article class="history-entry history-${visual.color}">
      <div class="history-date"><strong>${cita.fecha?.slice(8, 10) || "--"}</strong><span>${formatoFecha(cita.fecha)}</span><small>${cita.hora || ""}</small></div>
      <div class="history-info"><h3>${nombresServiciosCita(cita)}</h3><p>${duracionTotalCita(cita)} min · ${cita.personal || "Sin asignar"}</p><span class="history-status">${visual.texto}</span></div>
      <strong class="history-amount">${dinero(cita.precio)}</strong>
    </article>`;
  }).join("");
  abrirModal(`Historial de ${clienta.nombre}`, `<div class="client-history">
    <header class="history-profile"><div class="client-avatar">${clienta.nombre.charAt(0).toUpperCase()}</div><div><h2>${clienta.nombre}</h2><a href="tel:${clienta.telefono}">${clienta.telefono}</a><p>Clienta desde ${formatoFecha((clienta.creadaEn || "").slice(0, 10))}</p></div></header>
    <div class="history-stats"><article><span>Visitas realizadas</span><strong>${completadas.length}</strong></article><article><span>Total en servicios</span><strong>${dinero(totalGastado)}</strong></article><article><span>Servicio frecuente</span><strong>${favorito}</strong></article><article><span>Última visita</span><strong>${ultimaVisita ? formatoFecha(ultimaVisita.fecha) : "Sin visitas"}</strong></article></div>
    ${clienta.notas ? `<div class="client-notes"><strong>Notas importantes</strong><p>${clienta.notas}</p></div>` : ""}
    <div class="history-section-title"><h3>Actividad de la clienta</h3><span>${historial.length} registro(s)</span></div>
    <div class="history-timeline">${movimientos || `<div class="history-empty"><strong>Aún no tiene visitas registradas</strong><p>Sus próximas citas aparecerán aquí automáticamente.</p></div>`}</div>
  </div>`);
}

function telefonoLocalWhatsApp(telefono = "") {
  const digitos = String(telefono || "").replace(/\D/g, "");
  if (digitos.length === 12 && digitos.startsWith("52")) return digitos.slice(2);
  if (digitos.length === 11 && digitos.startsWith("1")) return digitos.slice(1);
  return digitos.slice(-10);
}

function fechaHoraMensaje(fecha) {
  const valor = new Date(fecha || "");
  if (Number.isNaN(valor.getTime())) return "";
  return valor.toLocaleString("es-MX", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function conversacionesWhatsApp() {
  const mapa = new Map();
  mensajesWhatsApp.forEach(mensaje => {
    const telefono = mensaje.telefono || mensaje.wa_id || "";
    if (!telefono) return;
    const actual = mapa.get(telefono) || { telefono, nombre: mensaje.nombre || "", mensajes: [], ultimo: null, sinLeer: 0 };
    actual.nombre = mensaje.nombre || actual.nombre || clientas.find(item => item.telefono === telefonoLocalWhatsApp(telefono))?.nombre || telefono;
    actual.mensajes.push(mensaje);
    if (!actual.ultimo || String(mensaje.creado_en || "").localeCompare(String(actual.ultimo.creado_en || "")) > 0) actual.ultimo = mensaje;
    if (mensaje.direccion === "entrante" && !mensaje.leido) actual.sinLeer += 1;
    mapa.set(telefono, actual);
  });
  return [...mapa.values()].sort((a, b) => String(b.ultimo?.creado_en || "").localeCompare(String(a.ultimo?.creado_en || "")));
}

async function cargarMensajesWhatsApp(telefono = chatWhatsAppActivo) {
  try {
    const resultado = await llamarFuncionSupabase("whatsapp-inbox", { accion: "listar", token: tokenSesion, telefono });
    mensajesWhatsApp = Array.isArray(resultado?.mensajes) ? resultado.mensajes : [];
    if (telefono) chatWhatsAppActivo = telefono;
    return true;
  } catch (error) {
    console.warn("No se pudo cargar WhatsApp:", error);
    const texto = /404|Function not found/i.test(error.message || "") ? "Sube la función whatsapp-inbox a Supabase y ejecuta el SQL de la bandeja." : "Revisa la sesión, la función de Supabase y la conexión.";
    document.getElementById("contenido").innerHTML = `<section class="panel empty-state"><h2>Bandeja no disponible</h2><p>${texto}</p></section>`;
    return false;
  }
}

async function mostrarMensajesWhatsApp(telefono = chatWhatsAppActivo) {
  activarMenu("mensajes");
  document.getElementById("contenido").innerHTML = `<section class="panel empty-state"><h2>Cargando mensajes...</h2><p>Estamos consultando WhatsApp.</p></section>`;
  const ok = await cargarMensajesWhatsApp(telefono);
  if (ok) pintarMensajesWhatsApp();
}

function pintarMensajesWhatsApp() {
  const conversaciones = conversacionesWhatsApp();
  if (!chatWhatsAppActivo && conversaciones[0]) chatWhatsAppActivo = conversaciones[0].telefono;
  const activa = conversaciones.find(item => item.telefono === chatWhatsAppActivo);
  const mensajes = (activa?.mensajes || []).sort((a, b) => String(a.creado_en || "").localeCompare(String(b.creado_en || "")));
  document.getElementById("contenido").innerHTML = `
    <section class="whatsapp-inbox">
      <aside class="panel whatsapp-conversations">
        <div class="section-head"><div><h2>Mensajes</h2><p>Responde manualmente desde el número del negocio.</p></div><button type="button" onclick="mostrarMensajesWhatsApp()">Actualizar</button></div>
        <div class="whatsapp-search"><input id="telefonoChatNuevo" inputmode="numeric" maxlength="12" placeholder="Abrir teléfono"><button type="button" onclick="abrirChatWhatsApp(document.getElementById('telefonoChatNuevo').value)">Abrir</button></div>
        <div class="conversation-list">${conversaciones.map(item => `
          <button class="${item.telefono === chatWhatsAppActivo ? "activo" : ""}" type="button" onclick="abrirChatWhatsApp('${item.telefono}')">
            <strong>${escaparTexto(item.nombre || item.telefono)}</strong>
            <span>${escaparTexto(item.ultimo?.texto || item.ultimo?.tipo || "Mensaje")}</span>
            ${item.sinLeer ? `<b>${item.sinLeer}</b>` : ""}
          </button>`).join("") || `<p class="vacio">Aún no hay mensajes recibidos.</p>`}</div>
      </aside>
      <article class="panel whatsapp-chat">
        ${activa ? `
          <header><div><h2>${escaparTexto(activa.nombre || activa.telefono)}</h2><p>+${escaparTexto(activa.telefono)}</p></div><button type="button" onclick="vincularChatConClienta('${activa.telefono}')">Vincular clienta</button></header>
          <div class="message-list">${mensajes.map(mensaje => `
            <div class="message-bubble ${mensaje.direccion === "saliente" ? "saliente" : "entrante"}">
              <p>${escaparTexto(mensaje.texto || `[${mensaje.tipo || "mensaje"}]`)}</p>
              <span>${fechaHoraMensaje(mensaje.creado_en)}${mensaje.estado ? ` · ${escaparTexto(mensaje.estado)}` : ""}</span>
            </div>`).join("") || `<div class="history-empty"><strong>Sin mensajes todavía</strong><p>Cuando la clienta escriba, aparecerá aquí.</p></div>`}</div>
          ${puedeEditar() ? `<form class="reply-box" onsubmit="enviarMensajeWhatsApp(event)"><textarea id="respuestaWhatsApp" rows="3" placeholder="Escribe tu respuesta como persona..."></textarea><button class="primary-action" type="submit">Enviar</button></form>` : `<p class="solo-ver">Modo solo lectura: puedes ver los mensajes, pero no responder.</p>`}
        ` : `<div class="history-empty"><strong>Selecciona una conversación</strong><p>También puedes abrir un teléfono nuevo para responder dentro de la ventana de 24 horas.</p></div>`}
      </article>
    </section>`;
  requestAnimationFrame(() => {
    const lista = document.querySelector(".message-list");
    if (lista) lista.scrollTop = lista.scrollHeight;
  });
}

function abrirChatWhatsApp(telefono) {
  const limpio = String(telefono || "").replace(/\D/g, "");
  if (!limpio) return mostrarMensaje("Falta teléfono", "Escribe o selecciona un número.", "alerta");
  chatWhatsAppActivo = limpio.length === 10 ? `52${limpio}` : limpio;
  mostrarMensajesWhatsApp(chatWhatsAppActivo);
}

async function enviarMensajeWhatsApp(event) {
  event.preventDefault();
  if (!exigirEdicion()) return;
  const texto = document.getElementById("respuestaWhatsApp")?.value.trim();
  if (!chatWhatsAppActivo || !texto) return mostrarMensaje("Falta mensaje", "Escribe una respuesta antes de enviar.", "alerta");
  try {
    await llamarFuncionSupabase("whatsapp-inbox", { accion: "enviar", token: tokenSesion, telefono: chatWhatsAppActivo, texto });
    document.getElementById("respuestaWhatsApp").value = "";
    await cargarMensajesWhatsApp(chatWhatsAppActivo);
    pintarMensajesWhatsApp();
    mostrarMensaje("Mensaje enviado", "Se envió desde WhatsApp Business API.", "ok");
  } catch (error) {
    console.warn("No se pudo enviar WhatsApp:", error);
    const fueraVentana = /24|outside|window|131047|template/i.test(error.message || "");
    mostrarMensaje("No se pudo enviar", fueraVentana ? "Si la clienta no ha escrito en las últimas 24 horas, WhatsApp exige una plantilla aprobada." : "Revisa el token, el número de WhatsApp y la función en Supabase.", "alerta");
  }
}

function vincularChatConClienta(telefono) {
  const local = telefonoLocalWhatsApp(telefono);
  const clienta = clientas.find(item => item.telefono === local);
  if (clienta) return verHistorialClienta(clienta.id);
  abrirClientaModal(null);
  setTimeout(() => {
    const input = document.getElementById("clientaTelefono");
    if (input) input.value = local;
  }, 50);
}

function mostrarConfiguracion() {
  activarMenu("configuracion");
  const filasUsuarios = usuarios.map((usuario, indice) => `<tr><td>${usuario.nombre}</td><td>${usuario.usuario}</td><td>${usuario.rol === "editora" ? "Puede ver y editar" : "Solo puede ver"}</td><td>${puedeEditar() ? `<div class="table-actions"><button type="button" onclick="abrirUsuarioModal(${indice})">Editar</button><button class="danger-action" type="button" onclick="eliminarUsuario(${indice})">Eliminar</button></div>` : "-"}</td></tr>`).join("");
  document.getElementById("contenido").innerHTML = `
    <section class="config-grid">
      <article class="panel config-card">
        <h2>Configuración</h2>
        <p>Usuario actual: <strong>${usuarioActual?.nombre || "-"}</strong></p>
        <p>Permiso: <strong>${puedeEditar() ? "Puede ver y editar" : "Solo puede ver"}</strong></p>
      </article>

      <article class="panel config-card">
        <h2>Cambiar contraseña</h2>
        <form class="config-form" onsubmit="cambiarContrasena(event)">
          <label>Contraseña anterior</label>
          <input type="password" id="claveAnterior" autocomplete="current-password" placeholder="Escribe la contraseña anterior">
          <label>Nueva contraseña</label>
          <input type="password" id="claveNueva" autocomplete="new-password" placeholder="Escribe la nueva contraseña">
          <button class="primary-action" type="submit">Guardar</button>
        </form>
      </article>

      <article class="panel config-card notification-settings">
        <div class="notification-heading"><div><h2>Notificaciones al personal</h2><p>Recibe avisos 1 hora y 30 minutos antes de cada cita.</p></div><span id="estadoNotificaciones" class="notification-badge">Comprobando...</span></div>
        <div class="notification-actions"><button class="primary-action" type="button" onclick="activarNotificaciones()">Activar notificaciones</button><button type="button" onclick="probarNotificacion()">Enviar prueba</button></div>
        <p class="texto-suave">Actívalas en cada celular donde quieras recibir recordatorios.</p>
      </article>

      <article class="panel config-card">
        <h2>Apariencia</h2>
        <p>Activa o desactiva el modo oscuro para trabajar más cómodo.</p>
        <label class="switch-line"><input type="checkbox" id="toggleOscuro" ${modoOscuro ? "checked" : ""} onchange="cambiarModoOscuro(this.checked)"> Modo oscuro</label>
        <label class="switch-line"><input type="checkbox" ${sonidosActivos ? "checked" : ""} onchange="cambiarSonidos(this.checked)"> Sonidos de la aplicación</label>
      </article>

      <article class="panel config-card config-company">
        <h2>Logo de la empresa</h2>
        <div class="logo-config-preview"><img src="${configuracion.logo || LOGO_PREDETERMINADO}" alt="Logo actual"></div>
        ${puedeEditar() ? `<form class="config-form" onsubmit="guardarConfiguracionEmpresa(event)">
          <label>Seleccionar imagen</label><input id="configLogo" type="file" accept="image/*">
          <div class="config-buttons"><button class="primary-action" type="submit">Guardar logo</button></div>
        </form>` : ""}
      </article>
    </section>

    <section class="panel users-panel">
      <div class="section-head"><div><h2>Perfiles de usuario</h2><p>Administra quién puede consultar o editar la agenda.</p></div>${puedeEditar() ? `<button class="primary-action add-user-button" type="button" onclick="abrirUsuarioModal(null)">+ Agregar usuario</button>` : ""}</div>
      <table><thead><tr><th>Nombre</th><th>Usuario</th><th>Permiso</th><th>Acciones</th></tr></thead><tbody>${filasUsuarios}</tbody></table>
    </section>`;
  actualizarEstadoNotificaciones();
}

function convertirClavePush(clave) {
  const relleno = "=".repeat((4 - clave.length % 4) % 4);
  const base64 = (clave + relleno).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(base64), caracter => caracter.charCodeAt(0));
}

async function actualizarEstadoNotificaciones() {
  const etiqueta = document.getElementById("estadoNotificaciones");
  if (!etiqueta) return;
  if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
    etiqueta.textContent = "No compatible";
    etiqueta.className = "notification-badge notification-off";
    return;
  }
  try {
    const registro = await obtenerRegistroNotificaciones();
    const suscripcion = await registro.pushManager.getSubscription();
    const activa = Notification.permission === "granted" && !!suscripcion;
    etiqueta.textContent = activa ? "Activadas" : Notification.permission === "denied" ? "Bloqueadas" : "Desactivadas";
    etiqueta.className = `notification-badge ${activa ? "notification-on" : "notification-off"}`;
  } catch {
    etiqueta.textContent = "Reabre la app";
    etiqueta.className = "notification-badge notification-off";
  }
}

async function obtenerRegistroNotificaciones() {
  const existente = await navigator.serviceWorker.getRegistration();
  if (existente?.active) return existente;
  return Promise.race([
    navigator.serviceWorker.ready,
    new Promise((_, rechazar) => setTimeout(() => rechazar(new Error("Service Worker no disponible")), 6000))
  ]);
}

async function activarNotificaciones() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return mostrarMensaje("No compatible", "Este navegador no permite notificaciones push. Abre la aplicación instalada con Chrome o Safari.", "alerta");
  try {
    const permiso = await Notification.requestPermission();
    if (permiso !== "granted") return mostrarMensaje("Permiso necesario", "Debes permitir las notificaciones desde la configuración del celular.", "alerta");
    const registro = await obtenerRegistroNotificaciones();
    let suscripcion = await registro.pushManager.getSubscription();
    if (!suscripcion) suscripcion = await registro.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: convertirClavePush(VAPID_PUBLIC_KEY) });
    const datos = suscripcion.toJSON();
    const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/rpc/registrar_push`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        p_token: tokenSesion,
        p_endpoint: datos.endpoint,
        p_p256dh: datos.keys?.p256dh,
        p_auth: datos.keys?.auth,
        p_usuario: usuarioActual?.usuario || "sin-sesion",
        p_nombre: usuarioActual?.nombre || "Personal"
      })
    });
    if (!respuesta.ok) {
      const detalle = await respuesta.text();
      const error = new Error(detalle || `Error ${respuesta.status}`);
      error.status = respuesta.status;
      throw error;
    }
    await actualizarEstadoNotificaciones();
    mostrarMensaje("Notificaciones activadas", "Este celular quedó registrado para recibir los recordatorios.", "ok");
  } catch (error) {
    console.warn("No se pudieron activar las notificaciones:", error);
    if (error?.status === 404 || /registrar_push|does not exist|schema cache|PGRST202|PGRST205|42P01/i.test(error?.message || "")) {
      mostrarMensaje("Falta configurar la seguridad", "Ejecuta supabase-seguridad.sql en el Editor SQL.", "alerta");
    } else if (error?.status === 401 || error?.status === 403 || /row-level security|permission/i.test(error?.message || "")) {
      mostrarMensaje("Falta actualizar permisos", "Ejecuta supabase-seguridad.sql en el Editor SQL.", "alerta");
    } else {
      mostrarMensaje("No se pudieron activar", "Revisa el permiso de notificaciones del celular, la conexión y vuelve a intentarlo.", "alerta");
    }
  }
}

async function probarNotificacion() {
  if (Notification.permission !== "granted") return activarNotificaciones();
  const registro = await obtenerRegistroNotificaciones();
  await registro.showNotification(`Prueba de ${NOMBRE_NEGOCIO}`, {
    body: "Las notificaciones están funcionando en este celular.",
    icon: "assets/beloved-body-icon-192.png",
    badge: "assets/beloved-body-icon-192.png",
    tag: "prueba-notificaciones"
  });
}

function leerImagenOptimizada(input, callback) {
  const archivo = input?.files?.[0];
  if (!archivo) return callback("");
  if (!archivo.type.startsWith("image/")) return mostrarMensaje("Archivo incorrecto", "Selecciona una imagen para el logo.", "alerta");
  const lector = new FileReader();
  lector.onload = () => {
    const imagen = new Image();
    imagen.onload = () => {
      const escala = Math.min(1, 700 / imagen.width, 350 / imagen.height);
      const lienzo = document.createElement("canvas");
      lienzo.width = Math.max(1, Math.round(imagen.width * escala));
      lienzo.height = Math.max(1, Math.round(imagen.height * escala));
      lienzo.getContext("2d").drawImage(imagen, 0, 0, lienzo.width, lienzo.height);
      callback(lienzo.toDataURL("image/png"));
    };
    imagen.src = lector.result;
  };
  lector.readAsDataURL(archivo);
}

function guardarConfiguracionEmpresa(event) {
  event.preventDefault();
  if (!exigirEdicion()) return;
  leerImagenOptimizada(document.getElementById("configLogo"), logoNuevo => {
    if (logoNuevo) configuracion.logo = logoNuevo;
    guardar();
    aplicarConfiguracion();
    mostrarConfiguracion();
    mostrarMensaje("Logo guardado", "La imagen de la empresa quedó actualizada.", "ok");
  });
}

function abrirUsuarioModal(indice = null) {
  if (!exigirEdicion()) return;
  const usuario = indice === null ? {} : usuarios[indice];
  abrirModal(indice === null ? "Agregar usuario" : "Editar usuario", `<form class="modal-stack" novalidate onsubmit="guardarUsuarioModal(event, ${indice === null ? "null" : indice})">
    <label>Nombre completo</label><input id="perfilNombre" value="${escaparAtributo(usuario.nombre)}" required>
    <label>Nombre de usuario</label><input id="perfilUsuario" value="${escaparAtributo(usuario.usuario)}" placeholder="Ejemplo: rosa" required>
    <label>${indice === null ? "Contraseña" : "Nueva contraseña (opcional)"}</label><input id="perfilClave" type="password" autocomplete="new-password" ${indice === null ? "required" : ""}>
    <label>Permiso</label><select id="perfilRol"><option value="soloVista" ${usuario.rol !== "editora" ? "selected" : ""}>Solo puede ver</option><option value="editora" ${usuario.rol === "editora" ? "selected" : ""}>Puede ver y editar</option></select>
    ${indice === null ? `<label>Código para crear el perfil</label><input id="perfilCodigo" type="password" inputmode="numeric" placeholder="Código de autorización" required>` : ""}
    <div class="modal-actions"><button type="button" onclick="cerrarModalFormulario()">Cancelar</button><button class="primary-action" type="submit">Guardar perfil</button></div>
  </form>`);
}

async function guardarUsuarioModal(event, indice) {
  event.preventDefault();
  if (!exigirEdicion()) return;
  const nombre = document.getElementById("perfilNombre").value.trim();
  const nombreUsuario = document.getElementById("perfilUsuario").value.trim().toLowerCase();
  const clave = document.getElementById("perfilClave").value.trim();
  const rol = document.getElementById("perfilRol").value === "editora" ? "editora" : "soloVista";
  if (!nombre || !nombreUsuario || (indice === null && !clave)) return mostrarMensaje("Faltan datos por completar", "Escribe el nombre, usuario y contraseña.", "alerta");
  if (!/^[a-z0-9._-]{3,24}$/.test(nombreUsuario)) return mostrarMensaje("Datos incorrectos", "El usuario debe tener de 3 a 24 letras, números, puntos, guiones o guion bajo.", "alerta");
  if (clave && clave.length < 4) return mostrarMensaje("Datos incorrectos", "La contraseña debe tener al menos 4 caracteres.", "alerta");
  if (usuarios.some((item, posicion) => item.usuario === nombreUsuario && posicion !== indice)) return mostrarMensaje("Usuario existente", "Ese nombre de usuario ya está registrado.", "alerta");
  if (indice === null && document.getElementById("perfilCodigo").value.trim() !== CODIGO_ADMINISTRACION) return mostrarMensaje("Código incorrecto", "No fue posible crear el perfil.", "alerta");
  if (indice !== null && usuarios[indice].rol === "editora" && rol !== "editora" && usuarios.filter(item => item.rol === "editora").length <= 1) return mostrarMensaje("Se necesita una editora", "Debe quedar al menos un perfil con permiso para editar.", "alerta");
  const anterior = indice === null ? null : usuarios[indice];
  try {
    await supabaseRpc("agenda_guardar_usuario", {
      p_token: tokenSesion,
      p_original: anterior?.usuario || null,
      p_usuario: nombreUsuario,
      p_nombre: nombre,
      p_clave: clave || null,
      p_rol: rol,
      p_codigo: indice === null ? document.getElementById("perfilCodigo").value.trim() : null
    });
  } catch (error) {
    console.warn("No se pudo guardar el perfil:", error);
    return mostrarMensaje("No se guardó el perfil", "Revisa los datos, el código y que el usuario no esté repetido.", "alerta");
  }
  await cargarUsuariosPublicos();
  if (anterior?.usuario === usuarioActual?.usuario) await cargarRemoto(true);
  actualizarSelectorUsuarios();
  cerrarModalFormulario();
  mostrarConfiguracion();
  mostrarMensaje("Perfil guardado", "Los permisos del usuario quedaron actualizados.", "ok");
}

async function eliminarUsuario(indice) {
  if (!exigirEdicion()) return;
  const usuario = usuarios[indice];
  if (!usuario) return;
  if (usuario.usuario === usuarioActual?.usuario) return mostrarMensaje("No se puede eliminar", "No puedes eliminar el perfil que tiene la sesión abierta.", "alerta");
  if (usuario.rol === "editora" && usuarios.filter(item => item.rol === "editora").length <= 1) return mostrarMensaje("Se necesita una editora", "Debe quedar al menos un perfil con permiso para editar.", "alerta");
  if (!confirm(`¿Eliminar el perfil de ${usuario.nombre}?`)) return;
  try {
    await supabaseRpc("agenda_eliminar_usuario", { p_token: tokenSesion, p_usuario: usuario.usuario });
  } catch (error) {
    console.warn("No se pudo eliminar el perfil:", error);
    return mostrarMensaje("No se pudo eliminar", "Debe quedar al menos una editora y no puedes eliminar tu propia sesión.", "alerta");
  }
  await cargarUsuariosPublicos();
  actualizarSelectorUsuarios();
  mostrarConfiguracion();
}

async function cambiarContrasena(event) {
  event.preventDefault();
  const anterior = document.getElementById("claveAnterior").value.trim();
  const nueva = document.getElementById("claveNueva").value.trim();
  if (!anterior || !nueva) return mostrarMensaje("Faltan datos", "Escribe la contraseña anterior y la nueva.", "alerta");
  if (nueva.length < 4) return mostrarMensaje("Contraseña corta", "Usa al menos 4 caracteres.", "alerta");
  try {
    await supabaseRpc("agenda_cambiar_clave", { p_token: tokenSesion, p_anterior: anterior, p_nueva: nueva });
  } catch (error) {
    console.warn("No se pudo cambiar la contraseña:", error);
    return mostrarMensaje("Contraseña incorrecta", "La contraseña anterior no coincide.", "error");
  }
  document.getElementById("claveAnterior").value = "";
  document.getElementById("claveNueva").value = "";
  mostrarMensaje("Contraseña actualizada", "La nueva contraseña quedó guardada.");
}

function aplicarModoOscuro() {
  document.body.classList.toggle("modo-oscuro", !!modoOscuro);
}

function cambiarModoOscuro(valor) {
  modoOscuro = !!valor;
  guardar();
  aplicarModoOscuro();
}

function cambiarSonidos(valor) {
  sonidosActivos = !!valor;
  localStorage.setItem(`${CLAVE}-sonidosActivos`, JSON.stringify(sonidosActivos));
  if (sonidosActivos) reproducirSonido("success", 0.5);
}

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("sistema").style.display = "none";
  aplicarModoOscuro();
  aplicarConfiguracion();
  await cargarUsuariosPublicos();
  actualizarSelectorUsuarios();
  usuarioSeleccionado();
  if (tokenSesion && await cargarRemoto(true)) {
    mostrarSistemaDesdeSesion(!!localStorage.getItem(`${CLAVE}-token`));
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && usuarioActual && remotoListo && !guardandoRemoto) cargarRemoto(true);
});

setInterval(() => {
  if (document.visibilityState === "visible" && usuarioActual && remotoListo && !guardandoRemoto) cargarRemoto(true);
}, 30000);

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
      <div class="cal-citas">${citasDia.map(cita => {
        const visual = estadoVisualCita(cita);
        return `<button type="button" class="cal-cita cita-${visual.color}" onclick="abrirDetalleCita(${cita.id})"><span>${cita.hora}</span>${cita.cliente}<small>${nombresServiciosCita(cita)} · ${duracionTotalCita(cita)} min</small><em>${visual.texto}</em></button>`;
      }).join("")}</div>
    </div>`);
  }
  return `<div class="calendar-weekdays"><span>Lunes</span><span>Martes</span><span>Miércoles</span><span>Jueves</span><span>Viernes</span><span>Sábado</span><span>Domingo</span></div><div class="calendar-grid">${celdas.join("")}</div>`;
}

function abrirResumenInicio(tipo) {
  const resumen = resumenDia();
  const esTurnos = tipo === "turnos";
  const lista = esTurnos ? resumen.activas : resumen.canceladasHoy;
  const titulo = esTurnos ? "Turnos de hoy" : "Cancelaciones de hoy";
  const contenido = lista.map(cita => `<button class="today-item" type="button" onclick="cerrarModalFormulario(); abrirDetalleCita(${cita.id})">
    <time>${cita.hora || "--:--"}</time>
    <span><strong>${cita.cliente}</strong><small>${nombresServiciosCita(cita)} · ${cita.personal || "Sin asignar"}</small></span>
    <b>${dinero(cita.precio || 0)}</b>
  </button>`).join("") || `<div class="empty-summary"><strong>No hay ${esTurnos ? "turnos" : "cancelaciones"} hoy</strong><span>La información aparecerá aquí cuando exista.</span></div>`;
  abrirModal(titulo, `<div class="today-list">${contenido}</div><div class="modal-actions"><button type="button" onclick="cerrarModalFormulario()">Cerrar</button></div>`);
}

function contactarCancelacion(id) {
  const cita = citas.find(item => item.id === id);
  if (!cita) return mostrarMensaje("Cita no encontrada", "Actualiza la agenda e inténtalo otra vez.", "alerta");
  const telefono = String(cita.telefono || "").replace(/\D/g, "");
  if (!/^\d{10}$/.test(telefono)) return mostrarMensaje("Teléfono incorrecto", "Se necesita un teléfono de 10 dígitos para contactar a la clienta.", "alerta");
  const mensaje = `Hola ${cita.cliente}, somos de ${NOMBRE_NEGOCIO} ${SUBTITULO_NEGOCIO}. Lamentamos la cancelación de tu cita de ${nombresServiciosCita(cita)}. Si deseas, con gusto podemos ayudarte a reprogramarla para otra fecha y horario.`;
  location.href = `https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`;
}

mostrarInicio = function (fecha = hoy()) {
  activarMenu("inicio");
  const resumen = resumenDia();
  const canceladas = citasCanceladas().slice(0, 5);
  const pendientesPago = citasPorLiquidar(fecha);
  document.getElementById("contenido").innerHTML = `
    <div class="kpi-grid">
      ${kpi("Turnos de Hoy", resumen.activas.length, "Reservas para hoy", "turnos-hoy", "morado", "abrirResumenInicio('turnos')")}
      ${kpi("Cancelaciones Hoy", resumen.canceladasHoy.length, "Cancelaciones realizadas hoy", "cancelaciones-hoy", "dorado", "abrirResumenInicio('cancelaciones')")}
      ${kpi("Turnos pendientes", resumen.pendientes.length, "Total de próximos turnos", "turnos-pendientes", "morado")}
      ${kpi("Ingresos del día", dinero(resumen.ingresos), "Pagos estimados por revisar", "ingresos-dia", "verde")}
    </div>

    <section class="panel soft recent-cancellations">
      <div class="section-head"><div><h2>Últimas cancelaciones</h2><p>Contacta a la clienta para ofrecerle una nueva fecha.</p></div></div>
      <div class="cancellation-list">${canceladas.map(cita => `<article class="cancellation-item">
        <div><strong>${cita.cliente}</strong><span>${nombresServiciosCita(cita)}</span></div>
        <div><small>Fecha original</small><b>${formatoFecha(cita.fecha)} · ${cita.hora}</b></div>
        <div><small>Personal</small><b>${cita.personal || "Sin asignar"}</b></div>
        <button class="whatsapp-action" type="button" onclick="contactarCancelacion(${cita.id})">Contactar</button>
      </article>`).join("") || `<div class="empty-summary"><strong>No hay cancelaciones recientes</strong><span>Las cancelaciones aparecerán aquí.</span></div>`}</div>
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

function escaparAtributo(valor) {
  return String(valor ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escaparTexto(valor) {
  return String(valor ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function detallesServiciosCita(cita) {
  return Array.isArray(cita?.serviciosDetalle) && cita.serviciosDetalle.length ? cita.serviciosDetalle : [{ nombre: cita?.servicio || "Servicio", duracion: duracionDeCita(cita || {}), precio: Number(cita?.precio || 0) }];
}

function nombresServiciosCita(cita) {
  return detallesServiciosCita(cita).map(nombreDetalleServicio).join(" + ");
}

function nombreDetalleServicio(item) {
  return item?.detalle ? `${item.nombre} (${item.detalle})` : item?.nombre || "Servicio";
}

function duracionTotalCita(cita) {
  return detallesServiciosCita(cita).reduce((suma, item) => suma + Number(item.duracion || 0), 0);
}

function abrirModalCita(fecha = hoy(), citaId = null) {
  if (!exigirEdicion()) return;
  const cita = citaId === null ? null : citas.find(item => item.id === citaId);
  if (citaId !== null && !cita) return mostrarMensaje("Cita no encontrada", "Actualiza la página e inténtalo nuevamente.", "alerta");
  const nombresPersonal = [...new Set([cita?.personal, ...personal.filter(item => item.activo !== false).map(item => item.nombre)].filter(Boolean))];
  const seleccionados = new Set(detallesServiciosCita(cita).map(item => item.nombre));
  const detallesSeleccionados = detallesServiciosCita(cita).reduce((mapa, item) => {
    if (item.detalle) mapa[item.nombre] = new Set(String(item.detalle).split(" · ").map(detalle => detalle.trim()).filter(Boolean));
    return mapa;
  }, {});
  const metodosPago = ["Pago presencial/efectivo", "Transferencia bancaria"];
  const metodoActual = cita?.metodoPago || "";
  if (metodoActual && metodoActual !== "Tarjeta" && !metodosPago.includes(metodoActual)) metodosPago.unshift(metodoActual);
  abrirModal(cita ? "Editar cita" : "Agregar cita", `<form class="modal-stack" novalidate onsubmit="guardarCitaModal(event, ${cita ? cita.id : "null"})">
    <label>Fecha</label><input type="date" id="modalCitaFecha" value="${cita?.fecha || fecha}" required>
    <label>Hora</label><input type="time" id="modalCitaHora" value="${cita?.hora || horaActual()}" required>
    <label>Cliente</label><input id="modalCitaCliente" value="${escaparAtributo(cita?.cliente)}" placeholder="Nombre de la clienta" required>
    <label>Teléfono</label><input id="modalCitaTelefono" type="tel" inputmode="numeric" maxlength="10" value="${escaparAtributo(cita?.telefono)}" placeholder="10 dígitos" oninput="this.value=this.value.replace(/\\D/g, '').slice(0, 10); actualizarClientaCita()" required>
    <div id="estadoClientaCita" class="client-match"></div>
    <label>Servicios</label><div class="appointment-services">${servicios.map((servicio, indice) => {
      const detalles = normalizarDetallesServicio(servicio);
      const detalleActual = detallesSeleccionados[servicio.nombre] || new Set();
      return `<div class="appointment-service-option">
        <label><input class="cita-servicio-check" type="checkbox" value="${indice}" ${seleccionados.has(servicio.nombre) ? "checked" : ""} onchange="actualizarResumenServiciosCita()"><span><strong>${servicio.nombre}</strong><small>Desde ${dinero(servicio.precio)} · elige una opción</small></span></label>
        ${detalles.length ? `<div class="service-suboptions">${detalles.map((grupo, grupoIndice) => `<div class="service-subgroup"><strong>${grupo.grupo}</strong>${renderOpcionesServicio(grupo, indice, grupoIndice, detalleActual)}</div>`).join("")}</div>` : ""}
      </div>`;
    }).join("")}</div>
    <div id="resumenServiciosCita" class="appointment-summary"></div>
    <label>Personal</label><select id="modalCitaPersonal" required><option value="">Selecciona al personal</option>${nombresPersonal.map(nombre => `<option ${nombre === cita?.personal ? "selected" : ""}>${nombre}</option>`).join("")}</select>
    <label>Total (MXN)</label><input id="modalCitaPrecio" type="number" min="0.01" step="0.01" value="${valorParaEntrada(cita?.precio ?? 0)}" required>
    <h3>Método de pago</h3>
    <select id="modalCitaPago" required><option value="">Selecciona un método</option>${metodosPago.map(metodo => `<option ${metodo === metodoActual ? "selected" : ""}>${metodo}</option>`).join("")}</select>
    <label>Anticipo de pago (opcional)</label><div class="input-addon"><span>${simboloMoneda()}</span><input id="modalCitaAnticipo" type="number" min="0" step="0.01" value="${valorParaEntrada(cita?.anticipo || 0)}" placeholder="Monto del anticipo"></div>
    <div class="modal-actions"><button type="button" onclick="cerrarModalFormulario()">Cancelar</button><button class="primary-action" type="submit">${cita ? "Guardar cambios" : "Guardar cita"}</button></div>
  </form>`);
  actualizarClientaCita();
  actualizarResumenServiciosCita(false);
}

function actualizarPrecioServicioModal() {
  actualizarResumenServiciosCita();
}

function actualizarClientaCita() {
  const telefono = document.getElementById("modalCitaTelefono")?.value || "";
  const clienta = clientas.find(item => item.telefono === telefono);
  const estado = document.getElementById("estadoClientaCita");
  const nombre = document.getElementById("modalCitaCliente");
  if (!estado) return;
  if (clienta) {
    nombre.value = clienta.nombre;
    nombre.readOnly = true;
    estado.innerHTML = `<strong>Clienta registrada: ${clienta.nombre}</strong><span>Este teléfono ya tiene historial. Para cambiar el nombre, edita su perfil en Clientas.</span>`;
  } else {
    nombre.readOnly = false;
    estado.innerHTML = telefono.length === 10 ? `<strong>Nueva clienta</strong><span>Se creará su historial al guardar.</span>` : "";
  }
}

function nombreComparable(valor) {
  return String(valor || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}

function clonarDetalles(detalles) {
  return detalles.map(item => ({
    grupo: item.grupo,
    seleccion: item.seleccion || "varias",
    opciones: (item.opciones || []).map(opcion => typeof opcion === "object" ? {
      ...opcion,
      subopciones: Array.isArray(opcion.subopciones) ? opcion.subopciones.map(subopcion => ({ ...subopcion })) : []
    } : opcion)
  }));
}

function clonarServicioBase(servicio) {
  return {
    ...servicio,
    detalles: clonarDetalles(servicio.detalles || []),
    horarios: horariosBase()
  };
}

function datoOpcion(opcion) {
  return typeof opcion === "object" ? {
    nombre: String(opcion.nombre || "Opción").trim(),
    precio: Number(opcion.precio || 0),
    duracion: Number(opcion.duracion || 0),
    nota: String(opcion.nota || "").trim(),
    subgrupo: String(opcion.subgrupo || "Elige una variante").trim(),
    subopciones: Array.isArray(opcion.subopciones) ? opcion.subopciones.map(datoOpcion).filter(item => item.nombre) : []
  } : { nombre: String(opcion || "").trim(), precio: 0, duracion: 0, nota: "", subgrupo: "", subopciones: [] };
}

function normalizarDetallesServicio(servicio = {}) {
  const nombre = nombreComparable(servicio.nombre);
  if (nombre === "manicure" || nombre === "manicure y spa") return clonarDetalles(servicio.detalles?.length ? servicio.detalles : detallesManicureBase);
  if (!Array.isArray(servicio.detalles)) return [];
  if (servicio.detalles.some(item => item && typeof item === "object")) {
    return servicio.detalles.map(item => ({
      grupo: String(item.grupo || "Detalles").trim(),
      seleccion: ["una", "varias", "texto"].includes(item.seleccion) ? item.seleccion : "varias",
      opciones: Array.isArray(item.opciones) ? item.opciones.map(datoOpcion).filter(opcion => opcion.nombre) : []
    })).filter(item => item.grupo);
  }
  const opciones = servicio.detalles.map(item => String(item).trim()).filter(Boolean);
  return opciones.length ? [{ grupo: "Detalles", seleccion: "varias", opciones: opciones.map(datoOpcion) }] : [];
}

function textoDetallesServicio(detalles = []) {
  return normalizarDetallesServicio({ detalles }).map(item => item.opciones.length ? `${item.grupo}: ${item.opciones.map(opcion => opcion.nombre).join(", ")}` : `${item.grupo}:`).join("\n");
}

function leerDetallesServicioTexto(texto) {
  return String(texto || "").split("\n").map(linea => linea.trim()).filter(Boolean).map(linea => {
    const partes = linea.split(":");
    if (partes.length === 1) return { grupo: "Detalles", seleccion: "varias", opciones: [datoOpcion(linea)] };
    const grupo = partes.shift().trim();
    const opciones = partes.join(":").split(",").map(item => datoOpcion(item)).filter(item => item.nombre);
    return { grupo, seleccion: "varias", opciones };
  }).filter(item => item.grupo);
}

function detalleSeleccionadoValor(grupo, opcion = "") {
  const limpio = datoOpcion(opcion).nombre;
  return limpio ? `${grupo}: ${limpio}` : "";
}

function renderOpcionesServicio(grupo, indiceServicio, indiceGrupo, detalleActual) {
  if (!grupo.opciones.length) {
    return `<input class="cita-detalle-text" data-service-index="${indiceServicio}" data-group="${escaparAtributo(grupo.grupo)}" value="${escaparAtributo([...detalleActual].find(item => item.startsWith(`${grupo.grupo}: `))?.replace(`${grupo.grupo}: `, "") || "")}" placeholder="Notas u observaciones" oninput="actualizarResumenServiciosCita()">`;
  }
  return grupo.opciones.map((opcionOriginal, indiceOpcion) => {
    const opcion = datoOpcion(opcionOriginal);
    const valor = detalleSeleccionadoValor(grupo.grupo, opcion);
    const tipo = grupo.seleccion === "una" ? "radio" : "checkbox";
    const tieneVariantes = opcion.subopciones.length > 0;
    const principal = `<label class="service-choice ${tieneVariantes ? "has-children" : ""}"><input class="cita-detalle-check" data-service-index="${indiceServicio}" data-level="parent" data-has-children="${tieneVariantes}" data-price="${opcion.precio}" data-duration="${opcion.duracion}" data-additive="${grupo.seleccion === "varias"}" name="servicio-${indiceServicio}-grupo-${indiceGrupo}" type="${tipo}" value="${escaparAtributo(valor)}" ${detalleActual.has(valor) ? "checked" : ""} onchange="actualizarResumenServiciosCita()"><span>${opcion.nombre}${tieneVariantes ? `<small>Selecciona ${opcion.subgrupo.toLowerCase()}</small>` : `<small>${dinero(opcion.precio)} · ${opcion.duracion} min${opcion.nota ? ` · ${opcion.nota}` : ""}</small>`}</span></label>`;
    if (!tieneVariantes) return principal;
    const hijas = opcion.subopciones.map((subopcionOriginal, indiceHija) => {
      const subopcion = datoOpcion(subopcionOriginal);
      const valorHija = detalleSeleccionadoValor(opcion.subgrupo, subopcion);
      return `<label><input class="cita-detalle-check cita-subdetalle-check" data-service-index="${indiceServicio}" data-level="child" data-parent-value="${escaparAtributo(valor)}" data-price="${subopcion.precio}" data-duration="${subopcion.duracion}" data-additive="false" name="servicio-${indiceServicio}-grupo-${indiceGrupo}-opcion-${indiceOpcion}" type="radio" value="${escaparAtributo(valorHija)}" ${detalleActual.has(valorHija) ? "checked" : ""} onchange="actualizarResumenServiciosCita()"><span>${subopcion.nombre}<small>${dinero(subopcion.precio)} · ${subopcion.duracion} min${subopcion.nota ? ` · ${subopcion.nota}` : ""}</small></span></label>`;
    }).join("");
    return `${principal}<div class="service-dependent-options" data-parent-value="${escaparAtributo(valor)}"><strong>${opcion.subgrupo}</strong>${hijas}</div>`;
  }).join("");
}

function serviciosSeleccionadosFormulario() {
  return [...document.querySelectorAll(".cita-servicio-check:checked")].map(input => {
    const servicio = servicios[Number(input.value)];
    const controles = [...document.querySelectorAll(`.cita-detalle-check[data-service-index="${input.value}"]:checked:not(:disabled)`)];
    const detallesChecks = controles.map(item => item.value);
    const detallesTexto = [...document.querySelectorAll(`.cita-detalle-text[data-service-index="${input.value}"]`)].map(item => detalleSeleccionadoValor(item.dataset.group || "Otros", item.value)).filter(Boolean);
    const detalles = [...detallesChecks, ...detallesTexto];
    const principal = controles.find(item => item.dataset.level === "child") || controles.find(item => item.dataset.additive !== "true");
    const extras = controles.filter(item => item.dataset.additive === "true");
    const precioBase = principal ? Number(principal.dataset.price || 0) : Number(servicio.precio);
    const duracionBase = principal ? Number(principal.dataset.duration || 0) : Number(servicio.duracion);
    return {
      nombre: servicio.nombre,
      detalle: detalles.join(" · "),
      duracion: duracionBase + extras.reduce((total, item) => total + Number(item.dataset.duration || 0), 0),
      precio: precioBase + extras.reduce((total, item) => total + Number(item.dataset.price || 0), 0)
    };
  });
}

function actualizarResumenServiciosCita(actualizarPrecio = true) {
  document.querySelectorAll(".appointment-service-option").forEach((contenedor, indice) => {
    const activo = document.querySelector(`.cita-servicio-check[value="${indice}"]`)?.checked;
    if (activo) {
      contenedor.querySelectorAll('.service-subgroup').forEach(grupo => {
        const principales = [...grupo.querySelectorAll(':scope > label input[data-level="parent"][type="radio"]')];
        if (principales.length && !principales.some(input => input.checked)) principales[0].checked = true;
      });
    }
    contenedor.querySelectorAll('.service-dependent-options').forEach(subgrupo => {
      const valorPadre = subgrupo.dataset.parentValue || "";
      const padreActivo = [...contenedor.querySelectorAll('input[data-level="parent"]')].some(input => input.checked && input.value === valorPadre);
      subgrupo.hidden = !activo || !padreActivo;
      const hijas = [...subgrupo.querySelectorAll('.cita-subdetalle-check')];
      hijas.forEach(input => input.disabled = !activo || !padreActivo);
      if (!padreActivo) hijas.forEach(input => input.checked = false);
      else if (hijas.length && !hijas.some(input => input.checked)) hijas[0].checked = true;
    });
  });
  const seleccion = serviciosSeleccionadosFormulario();
  const duracion = seleccion.reduce((suma, item) => suma + item.duracion, 0);
  const subtotal = seleccion.reduce((suma, item) => suma + item.precio, 0);
  const total = subtotal;
  if (actualizarPrecio && document.getElementById("modalCitaPrecio")) document.getElementById("modalCitaPrecio").value = valorParaEntrada(total);
  const resumen = document.getElementById("resumenServiciosCita");
  document.querySelectorAll(".appointment-service-option").forEach((contenedor, indice) => {
    const activo = document.querySelector(`.cita-servicio-check[value="${indice}"]`)?.checked;
    contenedor.classList.toggle("servicio-elegido", !!activo);
    contenedor.querySelectorAll(".cita-detalle-check:not(.cita-subdetalle-check)").forEach(input => input.disabled = !activo);
    contenedor.querySelectorAll(".cita-detalle-text").forEach(input => input.disabled = !activo);
  });
  if (resumen) {
    const nombres = seleccion.map(nombreDetalleServicio).join(" + ");
    resumen.innerHTML = `<strong>${seleccion.length} servicio(s) · ${duracion} minutos</strong><span>${dinero(total)}</span>${nombres ? `<small>${nombres}</small>` : ""}`;
  }
}

function horaAMinutos(hora) {
  const [horas, minutos] = String(hora || "0:0").split(":").map(Number);
  return horas * 60 + minutos;
}

function duracionDeCita(cita) {
  if (Array.isArray(cita?.serviciosDetalle) && cita.serviciosDetalle.length) return cita.serviciosDetalle.reduce((suma, item) => suma + Number(item.duracion || 0), 0);
  return Number(servicioPorNombre(cita?.servicio)?.duracion || cita?.duracion || 30);
}

function hayConflictoDeHorario(nuevaCita, ignorarId = null) {
  const inicioNuevo = horaAMinutos(nuevaCita.hora);
  const finNuevo = inicioNuevo + duracionDeCita(nuevaCita);
  return citas.some(cita => {
    if (cita.id === ignorarId || cita.estado === "Cancelada") return false;
    if (cita.fecha !== nuevaCita.fecha || cita.personal !== nuevaCita.personal) return false;
    const inicioExistente = horaAMinutos(cita.hora);
    const finExistente = inicioExistente + duracionDeCita(cita);
    return inicioNuevo < finExistente && finNuevo > inicioExistente;
  });
}

function mostrarErrorCita(titulo, texto, campos = []) {
  document.querySelectorAll("#modalFormulario .campo-error").forEach(campo => campo.classList.remove("campo-error"));
  campos.forEach(id => document.getElementById(id)?.classList.add("campo-error"));
  const primerCampo = document.getElementById(campos[0]);
  if (primerCampo) {
    primerCampo.focus();
    primerCampo.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  mostrarMensaje(titulo, texto, "alerta");
}

function guardarCitaModal(event, citaId = null) {
  event.preventDefault();
  if (!exigirEdicion()) return;
  document.querySelectorAll("#modalFormulario .campo-error").forEach(campo => campo.classList.remove("campo-error"));
  const citaAnterior = citaId === null ? null : citas.find(item => item.id === citaId);
  const telefono = document.getElementById("modalCitaTelefono").value.trim();
  const serviciosDetalle = serviciosSeleccionadosFormulario();
  const cita = {
    id: citaAnterior?.id || idNuevo(),
    fecha: document.getElementById("modalCitaFecha").value,
    hora: document.getElementById("modalCitaHora").value,
    cliente: document.getElementById("modalCitaCliente").value.trim(),
    telefono,
    servicio: serviciosDetalle.map(nombreDetalleServicio).join(" + "),
    serviciosDetalle,
    duracion: serviciosDetalle.reduce((suma, item) => suma + item.duracion, 0),
    precio: valorDesdeEntrada(document.getElementById("modalCitaPrecio").value),
    metodoPago: document.getElementById("modalCitaPago").value,
    anticipo: valorDesdeEntrada(document.getElementById("modalCitaAnticipo").value),
    abonos: citaAnterior?.abonos || [],
    liquidada: false,
    estado: citaAnterior?.estado || "Pendiente",
    canceladaEn: citaAnterior?.canceladaEn,
    confirmacionToken: citaAnterior?.confirmacionToken || tokenConfirmacionNuevo(),
    confirmadaCliente: !!citaAnterior?.confirmadaCliente,
    confirmadaEn: citaAnterior?.confirmadaEn || null,
    personal: document.getElementById("modalCitaPersonal").value
  };
  const faltantes = [
    [cita.fecha, "fecha", "modalCitaFecha"],
    [cita.hora, "hora", "modalCitaHora"],
    [cita.cliente, "nombre de la clienta", "modalCitaCliente"],
    [cita.telefono, "teléfono", "modalCitaTelefono"],
    [cita.serviciosDetalle.length, "servicio", "resumenServiciosCita"],
    [cita.personal, "personal", "modalCitaPersonal"],
    [cita.metodoPago, "método de pago", "modalCitaPago"]
  ].filter(([valor]) => !valor);
  if (faltantes.length) {
    return mostrarErrorCita("Faltan datos por completar", `Revisa: ${faltantes.map(([, nombre]) => nombre).join(", ")}.`, faltantes.map(([, , id]) => id));
  }
  if (cita.cliente.length < 2) return mostrarErrorCita("Datos incorrectos", "Escribe un nombre válido para la clienta.", ["modalCitaCliente"]);
  if (!/^\d{10}$/.test(cita.telefono)) return mostrarErrorCita("Datos incorrectos", "El teléfono debe tener exactamente 10 números.", ["modalCitaTelefono"]);
  const clientaDelTelefono = clientas.find(item => item.telefono === cita.telefono);
  if (clientaDelTelefono && nombreComparable(clientaDelTelefono.nombre) !== nombreComparable(cita.cliente)) {
    return mostrarErrorCita("Teléfono ya registrado", `Este número pertenece a ${clientaDelTelefono.nombre}. Usa ese nombre o edita su perfil en Clientas.`, ["modalCitaTelefono", "modalCitaCliente"]);
  }
  if (!Number.isFinite(cita.precio) || cita.precio <= 0) return mostrarErrorCita("Datos incorrectos", "El precio debe ser mayor que cero.", ["modalCitaPrecio"]);
  if (!Number.isFinite(cita.anticipo) || cita.anticipo < 0 || cita.anticipo > cita.precio) return mostrarErrorCita("Datos incorrectos", "El anticipo no puede ser negativo ni mayor que el precio.", ["modalCitaAnticipo"]);
  let clienta = clientas.find(item => item.telefono === cita.telefono);
  const cambioHorario = !citaAnterior || citaAnterior.fecha !== cita.fecha || citaAnterior.hora !== cita.hora;
  if (cambioHorario && bloqueos.some(item => item.fecha === cita.fecha && item.hora === cita.hora)) return mostrarErrorCita("Horario bloqueado", "Ese horario no está disponible.", ["modalCitaFecha", "modalCitaHora"]);
  if (hayConflictoDeHorario(cita, citaAnterior?.id ?? null)) return mostrarErrorCita("Horario ocupado", `${cita.personal} ya tiene una cita que coincide con ese horario.`, ["modalCitaFecha", "modalCitaHora", "modalCitaPersonal"]);
  cita.liquidada = cita.anticipo + totalAbonos(cita) >= cita.precio;
  if (!clienta) {
    clienta = { id: idNuevo(), nombre: cita.cliente, telefono: cita.telefono, notas: "", creadaEn: new Date().toISOString() };
    clientas.push(clienta);
  } else {
    clienta.nombre = cita.cliente;
  }
  cita.clienteId = clienta.id;
  if (citaAnterior) citas[citas.findIndex(item => item.id === citaAnterior.id)] = cita;
  else citas.push(cita);
  guardar();
  cerrarModalFormulario();
  mostrarMensaje(citaAnterior ? "Cita actualizada" : "Cita guardada", citaAnterior ? "Los cambios quedaron guardados." : "La cita aparecerá en el calendario.", "ok");
  mostrarInicio(cita.fecha);
}

function abrirDetalleCita(id) {
  const cita = citas.find(item => item.id === id);
  if (!cita) return;
  const visual = estadoVisualCita(cita);
  abrirModal("Detalle de cita", `<div class="detalle-cita">
    <div class="cita-status status-${visual.color}">${visual.texto}</div>
    <p><strong>Cliente:</strong> ${cita.cliente}</p>
    <div class="detail-services"><strong>Servicios:</strong>${detallesServiciosCita(cita).map(item => `<div><span>${item.nombre}</span><b>${item.duracion} min · ${dinero(item.precio)}</b></div>`).join("")}</div>
    <p><strong>Duración total:</strong> ${duracionTotalCita(cita)} minutos</p>
    <p><strong>Fecha:</strong> ${formatoFecha(cita.fecha)} ${cita.hora}</p>
    <p><strong>Personal:</strong> ${cita.personal || "Sin asignar"}</p>
    <p><strong>Precio:</strong> ${dinero(cita.precio)}</p>
    <p><strong>Método de pago:</strong> ${cita.metodoPago || "-"}</p>
    <p><strong>Anticipo:</strong> ${dinero(cita.anticipo || 0)}</p>
    <p><strong>Saldo:</strong> ${dinero(saldoCita(cita))}</p>
    <div class="client-confirmation ${cita.confirmadaCliente ? "confirmation-ok" : "confirmation-waiting"}">
      <strong>${cita.confirmadaCliente ? "Confirmada por la clienta" : "Confirmación pendiente"}</strong>
      <span>${cita.confirmadaCliente && cita.confirmadaEn ? `Confirmó el ${new Date(cita.confirmadaEn).toLocaleString("es-MX")}` : "Todavía no ha confirmado desde su enlace."}</span>
    </div>
    <div class="modal-actions">
      <button type="button" onclick="cerrarModalFormulario()">Cerrar</button>
      <button class="whatsapp-action" type="button" onclick="avisarClientaWhatsApp(${cita.id})">Avisar a la clienta</button>
      ${puedeEditar() ? `<button type="button" onclick="cerrarModalFormulario(); abrirModalCita('${cita.fecha}', ${cita.id})">Editar cita</button>${cita.estado !== "Atendida" ? `<button type="button" onclick="cerrarModalFormulario(); marcarAtendida(${cita.id})">Servicio realizado</button>` : ""}${saldoCita(cita) > 0 ? `<button type="button" onclick="registrarAbono(${cita.id}); cerrarModalFormulario()">Abonar</button><button class="primary-action" type="button" onclick="cerrarModalFormulario(); liquidarCita(${cita.id})">Ya liquidaron</button>` : visual.color === "verde" ? `<button type="button" onclick="cerrarModalFormulario(); mostrarTicketPago(${cita.id})">Ver ticket</button>` : ""}<button type="button" onclick="cancelarCita(${cita.id}); cerrarModalFormulario()">Cancelar cita</button><button class="danger-action" type="button" onclick="eliminarCita(${cita.id}); cerrarModalFormulario()">Eliminar</button>` : ""}
    </div>
  </div>`);
}

async function avisarClientaWhatsApp(id) {
  const cita = citas.find(item => item.id === id);
  if (!cita) return mostrarMensaje("Cita no encontrada", "Actualiza la agenda e inténtalo nuevamente.", "alerta");
  const telefono = String(cita.telefono || "").replace(/\D/g, "");
  if (!/^\d{10}$/.test(telefono)) return mostrarMensaje("Teléfono incorrecto", "La clienta debe tener un teléfono de 10 dígitos para abrir WhatsApp.", "alerta");

  if (!cita.confirmacionToken) cita.confirmacionToken = tokenConfirmacionNuevo();
  guardarLocal();
  mostrarMensaje("Preparando confirmación", "Estamos guardando el enlace antes de abrir WhatsApp.", "ok");
  const guardadaEnInternet = await guardarRemoto();
  if (!guardadaEnInternet) {
    return mostrarMensaje("No se pudo crear el enlace", "Revisa la conexión a internet e inténtalo nuevamente.", "alerta");
  }
  const confirmacionesActivas = await verificarServicioConfirmacion();
  if (!confirmacionesActivas) {
    return mostrarMensaje("Falta activar las confirmaciones", "Ejecuta el archivo supabase-confirmaciones.sql en el Editor SQL de Supabase antes de enviar el aviso.", "alerta");
  }
  const enlaceConfirmacion = `${location.origin}${location.pathname.replace(/[^/]*$/, "")}confirmar.html?token=${encodeURIComponent(cita.confirmacionToken)}`;

  const mensaje = [
    `Hola ${cita.cliente}, te escribimos de ${NOMBRE_NEGOCIO} ${SUBTITULO_NEGOCIO}.`,
    "",
    "Te recordamos los datos de tu cita:",
    `Fecha: ${formatoFecha(cita.fecha)}`,
    `Hora: ${cita.hora}`,
    `Servicio${detallesServiciosCita(cita).length > 1 ? "s" : ""}: ${nombresServiciosCita(cita)}`,
    `Duración aproximada: ${duracionTotalCita(cita)} minutos`,
    `Te atenderá: ${cita.personal || "nuestro personal"}`,
    "",
    "Por favor responde CONFIRMO para indicarnos que asistirás. ¡Te esperamos!"
  ].slice(0, -1).concat([
    "Confirma tu asistencia abriendo este enlace y tocando el botón:",
    enlaceConfirmacion,
    "",
    "¡Te esperamos!"
  ]).join("\n");
  location.href = `https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`;
}

async function verificarServicioConfirmacion() {
  try {
    const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/rpc/confirmar_cita`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ p_token: `comprobacion-${Date.now()}` })
    });
    return respuesta.ok;
  } catch {
    return false;
  }
}

function totalAbonos(cita) {
  return (cita.abonos || []).reduce((s, abono) => s + Number(abono.monto || 0), 0);
}

function saldoCita(cita) {
  if (cita.liquidada) return 0;
  return Math.max(0, Number(cita.precio || 0) - Number(cita.anticipo || 0) - totalAbonos(cita));
}

function estadoVisualCita(cita) {
  const atendida = cita.estado === "Atendida";
  const pagada = saldoCita(cita) <= 0;
  const tieneAbono = Number(cita.anticipo || 0) + totalAbonos(cita) > 0;
  if (atendida && pagada) return { color: "verde", texto: "Pagada y servicio realizado" };
  if (!atendida && pagada) return { color: "amarillo", texto: "Pagada · servicio pendiente" };
  if (!atendida && tieneAbono) return { color: "amarillo", texto: "Con anticipo · servicio pendiente" };
  if (atendida) return { color: "rojo", texto: "Servicio realizado · pago pendiente" };
  return { color: "rojo", texto: "Sin abono · servicio pendiente" };
}

function citasPorLiquidar(fechaMes = hoy()) {
  const mes = fechaMes.slice(0, 7);
  return citasActivas()
    .filter(cita => {
      if (cita.fecha?.slice(0, 7) !== mes || saldoCita(cita) <= 0) return false;
      return Number(cita.anticipo || 0) > 0 || cita.fecha <= hoy();
    })
    .sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`));
}

function vistaPagosPendientes(lista) {
  if (!lista.length) return `<p class="vacio">No hay citas pendientes por liquidar en este periodo.</p>`;
  return `<div class="pagos-lista">${lista.map(cita => {
    const visual = estadoVisualCita(cita);
    return `<article class="pago-item pago-${visual.color}">
    <div><strong>${cita.cliente}</strong><span>${formatoFecha(cita.fecha)} ${cita.hora} · ${nombresServiciosCita(cita)}</span></div>
    <div><small>Estado</small><b class="pago-estado status-${visual.color}">${visual.texto}</b></div>
    <div><small>Anticipo</small><b>${dinero(cita.anticipo)}</b></div>
    <div><small>Saldo</small><b>${dinero(saldoCita(cita))}</b></div>
    ${puedeEditar() ? `<div class="pago-actions"><button type="button" onclick="registrarAbono(${cita.id})">Abonar</button><button class="primary-action" type="button" onclick="liquidarCita(${cita.id})">Ya liquidaron</button></div>` : ""}
  </article>`;
  }).join("")}</div>`;
}

function registrarAbono(id) {
  if (!exigirEdicion()) return;
  const cita = citas.find(item => item.id === id);
  if (!cita) return;
  const cantidadMostrada = Number(prompt("¿Cuánto van a abonar en MXN?") || 0);
  const cantidad = valorDesdeEntrada(cantidadMostrada);
  if (!cantidadMostrada || cantidadMostrada <= 0) return mostrarMensaje("Completa los datos", "Escribe una cantidad válida para el abono.", "alerta");
  cita.abonos = cita.abonos || [];
  cita.abonos.push({ monto: cantidad, fecha: hoy() });
  if (saldoCita(cita) <= 0) cita.liquidada = true;
  guardar();
  mostrarInicio(cita.fecha);
  if (estadoVisualCita(cita).color === "verde") mostrarTicketPago(cita.id);
  else mostrarMensaje("Abono guardado", "Se actualizó el saldo de la cita.", "ok");
}

function liquidarCita(id) {
  if (!exigirEdicion()) return;
  const cita = citas.find(item => item.id === id);
  if (!cita) return;
  const saldo = saldoCita(cita);
  cita.abonos = cita.abonos || [];
  if (saldo > 0) cita.abonos.push({ monto: saldo, fecha: hoy() });
  cita.liquidada = true;
  cita.liquidadaEn = new Date().toISOString();
  guardar();
  mostrarInicio(cita.fecha);
  if (cita.estado === "Atendida") mostrarTicketPago(cita.id);
  else mostrarMensaje("Pago completado", "La cita está en amarillo. El ticket aparecerá al marcar el servicio como realizado.", "ok");
}

function mostrarTicketPago(id) {
  const cita = citas.find(item => item.id === id);
  if (!cita) return mostrarMensaje("Cita no encontrada", "No fue posible generar el ticket.", "alerta");
  if (estadoVisualCita(cita).color !== "verde") return mostrarMensaje("Ticket aún no disponible", "Completa el pago y marca el servicio como realizado.", "alerta");
  const folio = String(cita.id).slice(-8).padStart(8, "0");
  abrirModal("Ticket de pago", `<article class="ticket-pago">
    <div class="ticket-brand"><img src="${configuracion.logo || LOGO_PREDETERMINADO}" alt="${NOMBRE_NEGOCIO}"><strong>${NOMBRE_NEGOCIO}</strong><span>${SUBTITULO_NEGOCIO}</span></div>
    <div class="ticket-status">PAGADO</div>
    <div class="ticket-line"><span>Folio</span><b>#${folio}</b></div>
    <div class="ticket-line"><span>Fecha de pago</span><b>${formatoFecha((cita.liquidadaEn || hoy()).slice(0, 10))}</b></div>
    <div class="ticket-divider"></div>
    <div class="ticket-line"><span>Clienta</span><b>${cita.cliente}</b></div>
    <div class="ticket-divider"></div>
    <div class="ticket-services">${detallesServiciosCita(cita).map(item => `<div><span>${item.nombre}<small>${item.duracion} min</small></span><b>${dinero(item.precio)}</b></div>`).join("")}</div>
    <div class="ticket-line"><span>Duración total</span><b>${duracionTotalCita(cita)} min</b></div>
    <div class="ticket-line"><span>Cita</span><b>${formatoFecha(cita.fecha)} · ${cita.hora}</b></div>
    <div class="ticket-line"><span>Personal</span><b>${cita.personal || "Sin asignar"}</b></div>
    <div class="ticket-line"><span>Método</span><b>${cita.metodoPago || "No especificado"}</b></div>
    <div class="ticket-divider"></div>
    <div class="ticket-total"><span>Total pagado</span><strong>${dinero(cita.precio)}</strong></div>
    <p>Gracias por tu visita</p>
  </article>
  <div class="modal-actions ticket-actions"><button type="button" onclick="cerrarModalFormulario()">Cerrar</button><button type="button" onclick="imprimirTicket(${cita.id})">Imprimir ticket</button><button class="primary-action" type="button" onclick="enviarTicketCliente(${cita.id})">Enviar a la clienta</button></div>`);
}

function imprimirTicket(id) {
  const cita = citas.find(item => item.id === id);
  if (!cita) return;
  const folio = String(cita.id).slice(-8).padStart(8, "0");
  const logo = configuracion.logo || new URL(LOGO_PREDETERMINADO, window.location.href).href;
  const ventana = window.open("", "_blank", "width=420,height=700");
  if (!ventana) return mostrarMensaje("No se pudo imprimir", "Permite las ventanas emergentes para abrir el ticket.", "alerta");
  const serviciosTicket = detallesServiciosCita(cita).map(item => `<div class="linea"><span>${item.nombre}<small> · ${item.duracion} min</small></span><b>${dinero(item.precio)}</b></div>`).join("");
  ventana.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Ticket #${folio}</title><style>@page{size:80mm auto;margin:5mm}*{box-sizing:border-box}body{width:70mm;margin:0 auto;font-family:Arial,sans-serif;color:#272238}.marca{text-align:center}.marca img{width:52mm;height:24mm;object-fit:contain}.marca h1{font-size:20px;margin:2px}.marca p{margin:0;color:#746d7f}.pagado{width:max-content;margin:14px auto;padding:5px 12px;border:1px solid #2ca77a;color:#167854;border-radius:20px;font-weight:800}.linea,.total{display:flex;justify-content:space-between;gap:12px;padding:6px 0}.linea b{text-align:right}.linea small{display:block;color:#777}.separador{border-top:1px dashed #aaa;margin:9px 0}.total{font-size:18px;font-weight:800}.gracias{text-align:center;margin-top:20px;font-size:12px}</style></head><body><div class="marca"><img src="${logo}" alt="Logo"><h1>${NOMBRE_NEGOCIO}</h1><p>${SUBTITULO_NEGOCIO}</p></div><div class="pagado">PAGADO</div><div class="linea"><span>Folio</span><b>#${folio}</b></div><div class="linea"><span>Fecha</span><b>${formatoFecha((cita.liquidadaEn || hoy()).slice(0, 10))}</b></div><div class="separador"></div><div class="linea"><span>Clienta</span><b>${cita.cliente}</b></div><div class="separador"></div>${serviciosTicket}<div class="linea"><span>Duración total</span><b>${duracionTotalCita(cita)} min</b></div><div class="separador"></div><div class="linea"><span>Cita</span><b>${formatoFecha(cita.fecha)} ${cita.hora}</b></div><div class="linea"><span>Personal</span><b>${cita.personal || "Sin asignar"}</b></div><div class="linea"><span>Método</span><b>${cita.metodoPago || "No especificado"}</b></div><div class="separador"></div><div class="total"><span>Total</span><strong>${dinero(cita.precio)}</strong></div><p class="gracias">Gracias por tu visita</p></body></html>`);
  ventana.document.close();
  setTimeout(() => ventana.print(), 300);
}

function cargarImagenTicket(origen) {
  return new Promise(resolve => {
    const imagen = new Image();
    imagen.onload = () => resolve(imagen);
    imagen.onerror = () => resolve(null);
    imagen.src = origen;
  });
}

async function crearImagenTicket(cita) {
  const serviciosTicket = detallesServiciosCita(cita);
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 1120 + serviciosTicket.length * 82;
  const ctx = canvas.getContext("2d");
  const folio = String(cita.id).slice(-8).padStart(8, "0");
  ctx.fillStyle = "#fffdf9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#d8c5a2";
  ctx.lineWidth = 5;
  ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

  const logo = await cargarImagenTicket(configuracion.logo || LOGO_PREDETERMINADO);
  if (logo) ctx.drawImage(logo, 245, 55, 410, 150);
  ctx.textAlign = "center";
  ctx.fillStyle = "#342540";
  ctx.font = "700 36px Arial";
  ctx.fillText("OH, MA BELLE", 450, 240);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#806b70";
  ctx.fillText(SUBTITULO_NEGOCIO, 450, 278);

  ctx.fillStyle = "#e9f8ef";
  ctx.fillRect(325, 310, 250, 58);
  ctx.fillStyle = "#18724d";
  ctx.font = "700 28px Arial";
  ctx.fillText("PAGADO", 450, 349);

  let y = 420;
  const linea = (etiqueta, valor, negrita = false) => {
    ctx.textAlign = "left";
    ctx.fillStyle = "#786f7e";
    ctx.font = "24px Arial";
    ctx.fillText(etiqueta, 90, y);
    ctx.textAlign = "right";
    ctx.fillStyle = "#30273a";
    ctx.font = `${negrita ? "700 " : "600 "}24px Arial`;
    ctx.fillText(String(valor), 810, y);
    y += 58;
  };
  const separador = () => {
    ctx.strokeStyle = "#d9d2dc";
    ctx.setLineDash([10, 9]);
    ctx.beginPath(); ctx.moveTo(90, y); ctx.lineTo(810, y); ctx.stroke();
    ctx.setLineDash([]);
    y += 40;
  };

  linea("Folio", `#${folio}`);
  linea("Fecha de pago", formatoFecha((cita.liquidadaEn || hoy()).slice(0, 10)));
  separador();
  linea("Clienta", cita.cliente, true);
  separador();
  serviciosTicket.forEach(item => {
    linea(`${item.nombre} · ${item.duracion} min`, dinero(item.precio));
  });
  separador();
  linea("Duración total", `${duracionTotalCita(cita)} min`);
  linea("Cita", `${formatoFecha(cita.fecha)} · ${cita.hora}`);
  linea("Personal", cita.personal || "Sin asignar");
  linea("Método", cita.metodoPago || "No especificado");
  separador();
  ctx.font = "700 28px Arial";
  linea("TOTAL PAGADO", dinero(cita.precio), true);
  ctx.textAlign = "center";
  ctx.fillStyle = "#806b70";
  ctx.font = "24px Arial";
  ctx.fillText("Gracias por tu visita", 450, canvas.height - 85);
  return new Promise(resolve => canvas.toBlob(resolve, "image/png", 0.95));
}

async function enviarTicketCliente(id) {
  const cita = citas.find(item => item.id === id);
  if (!cita) return mostrarMensaje("Cita no encontrada", "No fue posible preparar el comprobante.", "alerta");
  const clienta = clientas.find(item => item.id === cita.clienteId || item.telefono === cita.telefono);
  const telefono = String(cita.telefono || clienta?.telefono || "").replace(/\D/g, "");
  if (!/^\d{10}$/.test(telefono)) {
    return mostrarMensaje("Teléfono incorrecto", "El ticket necesita el teléfono registrado de 10 dígitos para abrir WhatsApp.", "alerta");
  }
  mostrarMensaje("Preparando ticket", "Se abrirá WhatsApp con el número de la clienta registrada.", "ok");
  const imagen = await crearImagenTicket(cita);
  if (!imagen) return mostrarMensaje("No se pudo crear", "Inténtalo nuevamente.", "alerta");
  const archivo = new File([imagen], `ticket-beloved-body-${cita.id}.png`, { type: "image/png" });
  const enlace = URL.createObjectURL(imagen);
  const descarga = document.createElement("a");
  descarga.href = enlace;
  descarga.download = archivo.name;
  descarga.click();
  setTimeout(() => URL.revokeObjectURL(enlace), 2000);
  const mensaje = [
    `Hola ${cita.cliente}, te compartimos tu comprobante de pago de ${NOMBRE_NEGOCIO} ${SUBTITULO_NEGOCIO}.`,
    "",
    `Servicio${detallesServiciosCita(cita).length > 1 ? "s" : ""}: ${nombresServiciosCita(cita)}`,
    `Fecha: ${formatoFecha(cita.fecha)} ${cita.hora}`,
    `Total pagado: ${dinero(cita.precio)}`,
    "",
    "El ticket se descargó en este dispositivo para adjuntarlo en este chat. Gracias por tu visita."
  ].join("\n");
  window.open(`https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
  mostrarMensaje("WhatsApp abierto", "Adjunta el ticket descargado en el chat de la clienta.", "ok");
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
    <div class="service-image service-image-empty ${servicio.color}"><span>${servicio.nombre}</span></div>
    <div class="service-body">
      <h3>${servicio.nombre}</h3>
      <p class="service-time">Opciones desde ${servicio.duracion} minutos</p>
      ${normalizarDetallesServicio(servicio).length ? `<div class="service-detail-tags">${normalizarDetallesServicio(servicio).map(grupo => `<span><strong>${grupo.grupo}</strong>${grupo.opciones.length ? `<small>${grupo.opciones.slice(0, 4).map(opcionOriginal => { const opcion = datoOpcion(opcionOriginal); return `${opcion.nombre}${opcion.subopciones.length ? ` (${opcion.subopciones.length} variantes)` : ""}`; }).join(" · ")}${grupo.opciones.length > 4 ? ` · +${grupo.opciones.length - 4} más` : ""}</small>` : `<small>Campo libre</small>`}</span>`).join("")}</div>` : `<p>Sin detalles agregados.</p>`}
      <div class="service-foot">
        <strong>Desde ${dinero(servicio.precio)}</strong>
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
    <label>Nombre completo</label><input id="personalNombre" value="${persona.nombre || ""}" placeholder="Sebastián Pérez" required>
    <label>Foto</label><input id="personalFoto" type="file" accept="image/*">
    <label>Email para notificaciones (opcional)</label><input id="personalEmail" type="email" value="${persona.email || ""}" placeholder="ejemplo@email.com">
    <h3>Horario de trabajo</h3>${camposHorarios("personal", persona.horarios || horariosBase())}
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
    <label>Precio (MXN)</label><div class="input-addon"><span>${simboloMoneda()}</span><input id="servicioPrecioModal" type="number" min="0.01" step="0.01" value="${valorParaEntrada(servicio.precio || 0)}" required></div>
    <label>Duración (minutos)</label><input id="servicioDuracionModal" type="number" min="1" value="${servicio.duracion || 30}" required>
    <label>Subcategorías y opciones</label><textarea id="servicioDetallesModal" rows="7" placeholder="Ejemplo:&#10;Tipo: Clásico, Premium&#10;Extras: Efecto espejo, Nail Art">${textoDetallesServicio(servicio.detalles || [])}</textarea>
    <p class="texto-suave">El catálogo incluido conserva automáticamente los precios y tiempos de cada opción.</p>
    <h3>Personal Asignado</h3>
    <div class="check-grid">${personal.map(p => `<label class="check-line"><input class="servicioPersonalModal" type="checkbox" value="${p.nombre}" ${(servicio.personalAsignado || []).includes(p.nombre) ? "checked" : ""}> ${p.nombre}</label>`).join("") || `<p class="texto-suave">No hay personal agregado todavía.</p>`}</div>
    <h3>Horarios</h3>${camposHorarios("servicio", servicio.horarios || horariosBase())}
    <label>Anticipación mínima para reservar</label><select id="servicioAnticipacionModal"><option>Sin anticipación</option><option>1 hora antes</option><option>24 horas antes</option></select>
    <div class="modal-actions"><button type="button" onclick="cerrarModalFormulario()">Cancelar</button><button class="primary-action" type="submit">Guardar Servicio</button></div>
  </form>`);
}

function abrirEditarServicio(indice) {
  abrirNuevoServicio(indice);
}

function guardarServicioModal(event, indice) {
  event.preventDefault();
  if (!exigirEdicion()) return;
    const actual = indice !== null ? servicios[indice] : {};
    const servicio = {
      nombre: document.getElementById("servicioNombreModal").value.trim(),
      descripcion: actual.descripcion || "",
      confirmacion: actual.confirmacion || "",
      imagen: "",
      precio: valorDesdeEntrada(document.getElementById("servicioPrecioModal").value),
      capacidad: actual.capacidad || 1,
      anticipo: actual.anticipo || 0,
      duracion: Number(document.getElementById("servicioDuracionModal").value || 30),
      pagoEfectivo: actual.pagoEfectivo !== false,
      pagoTransferencia: !!actual.pagoTransferencia,
      personalAsignado: [...document.querySelectorAll(".servicioPersonalModal:checked")].map(item => item.value),
      detalles: indice !== null && document.getElementById("servicioDetallesModal").value.trim() === textoDetallesServicio(actual.detalles || []).trim()
        ? actual.detalles
        : leerDetallesServicioTexto(document.getElementById("servicioDetallesModal").value),
      horarios: leerHorarios("servicio"),
      color: actual.color || ["rosa", "dorado", "uva", "verde"][servicios.length % 4]
    };
    if (!servicio.nombre || servicio.precio <= 0 || servicio.duracion <= 0) return mostrarMensaje("Completa los datos", "Agrega nombre, precio y duración del servicio.", "alerta");
    if (indice !== null) servicios[indice] = servicio;
    else servicios.push(servicio);
    guardar();
    cerrarModalFormulario();
    mostrarServicios("servicios");
}
