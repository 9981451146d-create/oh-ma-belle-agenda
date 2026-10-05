const CONFIG = window.NA_CONFIG || {};
const CLAVE = CONFIG.claveDatos || "nuez-avellana-inventario-v4";
const CODIGO_EMPRESA = CONFIG.codigoEmpresa || "EMPRESA123";
const CODIGO_CIERRE = CONFIG.codigoDueno || "1234";

const productosIniciales = [
  "Agua de coco 330ml", "Agua kirkland", "Aguas s m", "Alegria sabores", "Alegrias", "Almendra",
  "Avena taifelds", "Barra coco", "Barra de cereal", "Barra stila", "Café clásico 315 ml",
  "Café varios315ml", "Canelitas", "Chips papas BP", "Chocolate zero", "Coca Light 600ml",
  "Coca cola 600ml", "Electrolitos 625ml", "Free life", "Galleta artesanal", "Garbanzo / Chile BP",
  "Halls", "Jugo Natura 200ml", "Jugo del valle 237 ml", "Jumex 200ml", "Kelloggs",
  "Lechita chocolate 200ml", "Lipton 600ml", "Manzana (fruta)", "Manzanita sol 400ml",
  "Marinela (principie/triqui/plati", "Nuez caramelizada Bp", "Obleas", "Palanqueta",
  "Picositas Bp", "Pistache Bp", "Sabrita A doritos rufles ranche", "Sabrita B fritos chetos churrum",
  "Squirt", "Taifelds", "Tea latte chai 330", "Te verde 500ml", "Troddos", "Yakult rojo", "Yogurt activia"
];

const inventarioInicial20260824 = [
  ["Agua de coco 330ml", 10], ["Agua kirkland", 77], ["Aguas s m", 117], ["Alegria sabores", 0],
  ["Alegrias", 0], ["Almendra", 0], ["Almendra BG/ gr", 0], ["Arandanno/ Cacahuate", 0],
  ["Taifelds", 0], ["Barra coco", 0], ["Barra crujiente", 0], ["Barra de cereal", 24],
  ["Barra stila", 0], ["Barrinolas", 204], ["Bocadillos", 0], ["Cacahuate", 0],
  ["Café clásico 315 ml", 55], ["Café varios315ml", 70], ["Canelitas", 0], ["Chips papas BG", 0],
  ["Chips papas BP", 4], ["Platano horneado tumbis BG", 0], ["Platano horneado tumbis BP", 0],
  ["Chocolate zero", 10], ["Coca cola 400 ml", 0], ["Coca cola 600ml", 0], ["Coca Light 600ml", 0],
  ["Electrolitos 625ml", 32], ["Free life", 21], ["Galletas artesanal", 42], ["Garbanzo / Chile BP", 0],
  ["Garbanzo con chile BG", 0], ["haba BG", 1], ["haba BP", 2], ["Halls", 24],
  ["Jugo del valle 237 ml", 3], ["Jugo Natura 200ml", 0], ["Jumex 200ml", 0], ["Kelloggs", 9],
  ["Kisses", 0], ["Lechita chocolate 200ml", 2], ["Lechita fresa 180ml", 0], ["Lipton 600ml", 8],
  ["Maicito chetto BG", 0], ["Maicito chetto Bp", 0], ["Mandarina (fruta)", 0], ["Manzana (fruta)", 5],
  ["Manzanita sol 400ml", 16], ["Mix cacahuate", 0], ["Mix frutas BG", 0], ["Mix frutas Bp", 0],
  ["Nuez caramelizada BG", 0], ["Nuez caramelizada Bp", 0], ["Nuez de la india Bg", 0],
  ["Nuez de la india Bp", 0], ["Nuez pecana BG", 0], ["Nuez pecana BP", 0], ["Oblea redonda", 0],
  ["Obleas", 0], ["Palanqueta", 24], ["Papas BG", 0], ["Pasa/ Chocolate", 0], ["Pera (fruta)", 0],
  ["Picositas BG", 0], ["Picositas Bp", 0], ["Pistache Bg", 0], ["Pistache Bp", 0],
  ["Platano (fruta)", 0], ["Platano c/chile", 0], ["Platano c/chile BG", 0], ["Queso cotagge", 0],
  ["Rollo guayaba", 0], ["Rosas", 68], ["Sabrita A)doritos,rufles,ranc", 12],
  ["Sabrita B)chetos,fritos,chur", 2], ["Squirt", 15], ["Te verde 500ml", 25], ["Tea latte chai 330", 0],
  ["Yakult azul", 0], ["Yakult rojo", 0], ["Yogurt activia", 0], ["Yomilala fresa 180ml", 0],
  ["Lechita vainilla sm 180ml", 0], ["Lechita chocolate sm 180ml", 0], ["Coca cola 400ml", 0],
  ["Coca cola 500ml", 136], ["Mango (fruta)", 0], ["Arcoiris/emp/chokis paquetin", 0],
  ["Welchs gomitas", 44], ["Marinela (principie/triqui/plati", 63], ["Mamut mini (4pzs)", 0],
  ["Galleta emperador bg", 0], ["Mamut", 0], ["Mamut mini", 0], ["Brownies", 0], ["Troddos", 2],
  ["Charritos", 0], ["Orejas", 0], ["Buñuelos", 0], ["Chizitos", 0], ["Paleta Payaso mini", 1],
  ["Cremax choco/vainilla", 22], ["Pelota futbol", 0], ["Coca cola lata", 0], ["Rocko", 0],
  ["Paleta gomita", 0], ["Almendron BG", 1], ["Almendron Bp", 0], ["Nuez chocolate BG", 0],
  ["Nuez chocolate Bp", 0], ["Frijolito choco BG", 0], ["Frijolito choco Bp", 0], ["Balones mundial", 0],
  ["Mascota mexico mate", 0], ["Mascota mexico brillosa", 0], ["Mascota mate canada", 0],
  ["Mascota brillosa canada", 0], ["Mascota USA mate", 0], ["Mascota USA brillosa", 0],
  ["Mascota copa mundial", 0], ["Cajita crorazón natural", 5], ["Cajita crorazón color", 0],
  ["Cajitas mamá", 4], ["Prestzels choco BG", 0], ["Prestzels choco Bp", 0], ["Malvavisco BG", 0],
  ["Malvavisco Bp", 0], ["Doraditas", 19], ["Pelon", 5], ["Pelonetes", 16], ["Tutsi", 0],
  ["Tutsi pq", 0], ["Palomitas mix bg", 0], ["Palomitas mix bp", 1], ["snikers", 4],
  ["Free life G", 0], ["Arizona", 22], ["m&m", 7], ["Danone", 0]
];

const inventarioInicial20260827 = [
  ["Agua de coco 330ml", 1], ["Agua kirkland", 156], ["Aguas s m", 136], ["Alegrias", 0],
  ["Almendra", 0], ["Almendra BG/ gr", 0], ["Barra de cereal", 1], ["Barrinolas", 148],
  ["Café clásico 315 ml", 134], ["Café varios315ml", 0], ["Chips papas BG", 0], ["Chips papas BP", 0],
  ["Chocolate zero", 45], ["Coca cola 400 ml", 0], ["Coca cola 600ml", 0], ["Electrolitos 625ml", 57],
  ["Free life", 6], ["Galletas artesanal", 9], ["haba BG", 1], ["haba BP", 0],
  ["Halls", 48], ["Jugo del valle 237 ml", 32], ["Jumex 200ml", 21], ["Kelloggs", 30],
  ["Lechita chocolate 200ml", 68], ["Lipton 600ml", 22], ["Manzana (fruta)", 0], ["Manzanita sol 400ml", 55],
  ["Palanqueta", 45], ["Rosas", 68], ["Sabrita A)doritos,rufles,ranc", 0],
  ["Sabrita B)chetos,fritos,chur", 0], ["Squirt", 49], ["Te verde 500ml", 39], ["Yakult rojo", 10],
  ["Coca cola 400ml", -8], ["Coca cola 500ml", 185], ["Welchs gomitas", 62],
  ["Marinela (principie/triqui/plati", 217], ["Brownies", 33], ["Troddos", 100], ["Chizitos", 30],
  ["Paleta Payaso mini", 26], ["Cremax choco/vainilla", 100], ["Almendron BG", 0], ["Almendron Bp", 0],
  ["Cajita crorazón natural", 5], ["Cajita crorazón color", 0], ["Cajitas mamá", 4], ["Doraditas", 67],
  ["Pelonetes", 50], ["Tutsi", 0], ["Tutsi pq", 9], ["Palomitas mix bg", 0],
  ["Palomitas mix bp", 0], ["snikers", 1], ["Free life G", 15], ["Arizona", 110],
  ["m&m", 12], ["Danone", 5], ["Nachos Cheddar Pop BG", 0], ["Nachos Cheddar Pop BP", 0]
];

let usuarios = cargar("usuarios") || [{ usuario: "admin", clave: "1234", rol: "dueno" }, { usuario: "admin1", clave: "4321", rol: "limitado" }];
let productos = cargar("productos") || productosIniciales.map(nombre => productoNuevo(nombre));
let movimientos = cargar("movimientos") || [];
let mesesCerrados = cargar("mesesCerrados") || [];
let configuracionEspirales = cargar("configuracionEspirales") || {};
let fotosControles = cargar("fotosControles") || {};
let ajustesSistema = cargar("ajustesSistema") || {
  modoOscuro: false,
  animacionLogin: true,
  fotosSalidaObligatorias: CONFIG.fotosSalidaObligatorias ?? true,
  productosEliminados: []
};
let productoEditando = null;
let usuarioActual = null;
let permitirProductoSimilar = false;
let alertasSesionMostradas = false;
let colaAlertasInventario = [];
let alertaPendienteTrasAnalizar = false;
let productoEntradaSugerido = "";
let guardadoNubeHabilitado = false;
let controlSalidaEditando = null;
let compraEscaneadaProvisional = [];
let camaraEscanerStream = null;
let detectorCodigoBarras = null;
let escanerCodigoActivo = false;
let ultimoCodigoEscaneado = { codigo: "", momento: 0 };

const espiralesPorMaquina = {
  "MAQ 1": [
    [1, 3, 5, 7, 9, 11, 12, 13, 14, 15, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38],
    [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    [51, 52, 53, 54, 55],
    [56, 57, 58, 59, 60]
  ],
  "MAQ 2": [
    [1, 3, 5, 7, 9, 11, 12, 13, 14, 15, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38],
    [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
    [56, 57, 58, 59, 60]
  ],
  "MAQ 3": [
    [1, 3, 5, 7, 9, 11, 12, 13, 14, 15, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38],
    [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 59, 60]
  ],
  "MAQ 4": [
    [1, 3, 5, 7, 9, 11, 12, 13, 14, 15, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38],
    [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 59, 60]
  ]
};

normalizarDatos();
aplicarConfiguracionVisual();

function productoNuevo(nombre) {
  return { nombre, fechaEntrada: hoy(), fechaBaja: "", observaciones: "", precio: 0, stockInicial: 0, bajaMovimientoId: null };
}

function cargar(nombre) {
  const datos = localStorage.getItem(`${CLAVE}-${nombre}`);
  return datos ? JSON.parse(datos) : null;
}

function guardar() {
  ordenarProductos();
  localStorage.setItem(`${CLAVE}-usuarios`, JSON.stringify(usuarios));
  localStorage.setItem(`${CLAVE}-productos`, JSON.stringify(productos));
  localStorage.setItem(`${CLAVE}-movimientos`, JSON.stringify(movimientos));
  localStorage.setItem(`${CLAVE}-mesesCerrados`, JSON.stringify(mesesCerrados));
  localStorage.setItem(`${CLAVE}-configuracionEspirales`, JSON.stringify(configuracionEspirales));
  localStorage.setItem(`${CLAVE}-fotosControles`, JSON.stringify(fotosControles));
  localStorage.setItem(`${CLAVE}-ajustesSistema`, JSON.stringify(ajustesSistema));
}

function normalizarDatos() {
  ajustesSistema.productosEliminados = Array.isArray(ajustesSistema.productosEliminados) ? ajustesSistema.productosEliminados : [];
  usuarios = usuarios.map(u => ({ usuario: u.usuario, clave: u.clave, rol: u.rol || "dueno" }));
  if (!usuarios.some(u => u.usuario === "admin")) usuarios.push({ usuario: "admin", clave: "1234", rol: "dueno" });
  if (!usuarios.some(u => u.usuario === "admin1")) usuarios.push({ usuario: "admin1", clave: "4321", rol: "limitado" });

  productos = productos.map(p => ({
    nombre: p.nombre,
    fechaEntrada: p.fechaEntrada || hoy(),
    fechaBaja: p.fechaBaja || "",
    observaciones: p.observaciones || "",
    precio: Number(p.precio || 0),
    stockInicial: Number(p.stockInicial || 0),
    bajaMovimientoId: p.bajaMovimientoId || null
  }));

  for (const nombre of productosIniciales) {
    const eliminado = ajustesSistema.productosEliminados.includes(nombreClaveProducto(nombre));
    if (!eliminado && !productos.some(p => p.nombre.toLowerCase() === nombre.toLowerCase())) productos.push(productoNuevo(nombre));
  }

  aplicarReinicioCompleto20260922();
  maquinasActivas().forEach(asegurarEspiralesMaquina);

  movimientos = movimientos.map(m => ({
    id: m.id || generarId(),
    fecha: m.fecha || hoy(),
    tipo: m.tipo,
    producto: m.producto,
    cantidad: Number(m.cantidad || 0),
    maquina: m.maquina || "",
    espiral: m.espiral || "",
    categoria: m.categoria || "",
    nota: m.nota || "",
    lote: m.lote || "",
    caducidad: m.caducidad || "",
    lotes: Array.isArray(m.lotes) ? m.lotes : [],
    controlId: m.controlId || null,
    caMaq1: Number(m.caMaq1 || 0),
    caMaq2: Number(m.caMaq2 || 0),
    caMaq3: Number(m.caMaq3 || 0),
    caInicio: m.caInicio || m.maquina || "MAQ 1",
    caEtapa: m.caEtapa || m.maquina || "",
    caCerrado: !!m.caCerrado
  }));
  ordenarProductos();
  guardar();
}

function nombreClaveProducto(nombre) {
  return String(nombre || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function aplicarInventarioInicial20260824() {
  if (ajustesSistema.inventarioInicial20260824) return;
  const fechaAlta = hoy();

  for (const [nombreOriginal, cantidad] of inventarioInicial20260824) {
    const nombre = String(nombreOriginal || "").trim().replace(/\s+/g, " ");
    if (!nombre) continue;
    if ((ajustesSistema.productosEliminados || []).includes(nombreClaveProducto(nombre))) continue;

    let producto = productos.find(item => nombreClaveProducto(item.nombre) === nombreClaveProducto(nombre));
    if (!producto) {
      producto = productoNuevo(nombre);
      productos.push(producto);
    }

    producto.nombre = nombre;
    producto.fechaEntrada = producto.fechaEntrada || fechaAlta;
    producto.stockInicial = Number(cantidad || 0);
    if (producto.stockInicial > 0 && producto.fechaBaja) producto.fechaBaja = "";
  }

  ajustesSistema.inventarioInicial20260824 = true;
}

function aplicarInventarioInicialLimpio20260828() {
  if (ajustesSistema.inventarioInicialLimpio20260828v2) return;

  const fechaAlta = "2026-08-28";
  const cantidades = new Map(inventarioInicial20260827.map(([nombre, cantidad]) => [
    normalizarNombreProducto(nombre),
    Number(cantidad || 0)
  ]));
  const eliminados = new Set(ajustesSistema.productosEliminados || []);
  let aplicados = 0;
  let activosSinLista = 0;
  const noEncontrados = [];

  for (const producto of productos) {
    const eliminado = eliminados.has(nombreClaveProducto(producto.nombre));
    if (eliminado || producto.fechaBaja) continue;

    const clave = normalizarNombreProducto(producto.nombre);
    if (!cantidades.has(clave)) {
      producto.stockInicial = 0;
      activosSinLista++;
      continue;
    }

    producto.fechaEntrada = fechaAlta;
    producto.stockInicial = cantidades.get(clave);
    aplicados++;
  }

  for (const [nombre] of inventarioInicial20260827) {
    const clave = normalizarNombreProducto(nombre);
    const existeActivo = productos.some(producto => {
      const eliminado = eliminados.has(nombreClaveProducto(producto.nombre));
      return !eliminado && !producto.fechaBaja && normalizarNombreProducto(producto.nombre) === clave;
    });
    if (!existeActivo) noEncontrados.push(nombre);
  }

  movimientos = [];
  fotosControles = {};
  productoEditando = null;
  alertasSesionMostradas = false;
  colaAlertasInventario = [];
  alertaPendienteTrasAnalizar = false;
  ajustesSistema.inventarioInicial20260824 = true;
  ajustesSistema.inventarioInicial20260827 = true;
  ajustesSistema.inventarioInicialLimpio20260828 = true;
  ajustesSistema.inventarioInicialLimpio20260828v2 = true;
  ajustesSistema.ultimoInventarioInicial = {
    fecha: fechaAlta,
    aplicados,
    activosSinLista,
    noEncontrados,
    movimientosEliminados: true
  };
}

function maquinasActivas() {
  const base = Array.isArray(ajustesSistema.maquinas) && ajustesSistema.maquinas.length
    ? ajustesSistema.maquinas
    : (CONFIG.maquinas || ["MAQ 1", "MAQ 2", "MAQ 3", "MAQ 4"]);
  return [...new Set(base.map(nombre => String(nombre || "").trim().toUpperCase()).filter(Boolean))];
}

function gruposEspiralesPredeterminados() {
  return [
    [1, 3, 5, 7, 9, 11, 12, 13, 14, 15, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38],
    [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 59, 60]
  ];
}

function asegurarEspiralesMaquina(maquina) {
  if (!espiralesPorMaquina[maquina]) espiralesPorMaquina[maquina] = gruposEspiralesPredeterminados();
  configuracionEspirales[maquina] = configuracionEspirales[maquina] || {};
}

function aplicarReinicioCompleto20260922() {
  if (ajustesSistema.reinicioCompleto20260922v2) return;

  const fechaAlta = "2026-09-22";
  productos = inventarioInicial20260827.map(([nombre, cantidad]) => ({
    ...productoNuevo(nombre),
    fechaEntrada: fechaAlta,
    stockInicial: Number(cantidad)
  }));
  movimientos = [];
  mesesCerrados = [];
  fotosControles = {};
  productoEditando = null;
  alertasSesionMostradas = false;
  colaAlertasInventario = [];
  alertaPendienteTrasAnalizar = false;

  ajustesSistema = {
    modoOscuro: !!ajustesSistema.modoOscuro,
    animacionLogin: ajustesSistema.animacionLogin !== false,
    fotosSalidaObligatorias: ajustesSistema.fotosSalidaObligatorias ?? (CONFIG.fotosSalidaObligatorias ?? true),
    productosEliminados: [],
    maquinas: ["MAQ 1", "MAQ 2", "MAQ 3", "MAQ 4"],
    reinicioCompleto20260922v1: true,
    reinicioCompleto20260922v2: true,
    ultimoInventarioInicial: {
      fecha: fechaAlta,
      aplicados: productos.length,
      movimientosEliminados: true,
      reinicioCompleto: true
    }
  };

  configuracionEspirales = {
    "MAQ 1": {
      1:"Nachos Cheddar Pop BP",3:"Palomitas mix bp",5:"Alegrias",7:"Sabrita A)doritos,rufles,ranc",9:"Marinela (principie/triqui/plati",11:"Brownies",12:"Chocolate zero",13:"Pelonetes",14:"m&m",15:"Cremax choco/vainilla",17:"Sabrita B)chetos,fritos,chur",19:"Kelloggs",21:"Palanqueta",22:"Palanqueta",23:"Marinela (principie/triqui/plati",24:"Doraditas",25:"Barrinolas",26:"Galletas artesanal",27:"Pelonetes",28:"Halls",29:"Paleta Payaso mini",30:"Tutsi pq",31:"Aguas s m",32:"Aguas s m",33:"Aguas s m",34:"Aguas s m",35:"Aguas s m",36:"Aguas s m",37:"Arizona",38:"Free life G",39:"Lipton 600ml",40:"Lipton 600ml",41:"Free life",42:"Jugo del valle 237 ml",43:"Agua de coco 330ml",44:"Café clásico 315 ml",45:"Café clásico 315 ml",46:"Lechita chocolate 200ml",47:"Lechita chocolate 200ml",48:"Danone",49:"Yakult rojo",50:"Free life",51:"Manzanita sol 400ml",52:"Squirt",53:"Electrolitos 625ml",54:"Electrolitos 625ml",55:"Coca cola 500ml",56:"Coca cola 500ml",57:"Coca cola 500ml",58:"Coca cola 500ml",59:"Coca cola 500ml",60:"Coca cola 500ml"
    },
    "MAQ 2": {
      1:"Alegrias",3:"Nachos Cheddar Pop BP",5:"Chips papas BP",7:"Sabrita A)doritos,rufles,ranc",9:"Chips papas BP",11:"Paleta Payaso mini",12:"Barrinolas",13:"Doraditas",14:"snikers",15:"Cremax choco/vainilla",17:"Marinela (principie/triqui/plati",19:"Sabrita B)chetos,fritos,chur",21:"Palanqueta",22:"Palanqueta",23:"Marinela (principie/triqui/plati",24:"Pelon",25:"Galletas artesanal",26:"Barrinolas",27:"Chocolate zero",28:"Halls",29:"m&m",30:"Garbanzo / Chile BP",31:"Aguas s m",32:"Aguas s m",33:"Aguas s m",34:"Aguas s m",35:"Aguas s m",36:"Aguas s m",37:"Manzanita sol 400ml",38:"Squirt",39:"Arizona",40:"Arizona",41:"Free life",42:"Danone",43:"Agua de coco 330ml",44:"Jumex 200ml",45:"Manzana (fruta)",46:"Lechita chocolate 200ml",47:"Café clásico 315 ml",48:"Café clásico 315 ml",49:"Yakult rojo",50:"Jugo del valle 237 ml",51:"Te verde 500ml",52:"Coca cola 500ml",53:"Coca cola 500ml",54:"Coca cola 500ml",55:"Coca cola 500ml",56:"Coca cola 500ml",57:"Coca cola 500ml",58:"Coca cola 500ml",59:"Electrolitos 625ml",60:"Electrolitos 625ml"
    },
    "MAQ 3": {
      1:"Chips papas BP",3:"Chips papas BP",5:"Sabrita A)doritos,rufles,ranc",7:"Cremax choco/vainilla",9:"Sabrita B)chetos,fritos,chur",11:"Pelonetes",12:"Welchs gomitas",13:"Doraditas",14:"m&m",15:"Marinela (principie/triqui/plati",17:"Marinela (principie/triqui/plati",19:"Kelloggs",21:"Palanqueta",22:"Palanqueta",23:"Barrinolas",24:"Marinela (principie/triqui/plati",25:"Galletas artesanal",26:"Paleta Payaso mini",27:"Chocolate zero",28:"haba BP",29:"Halls",30:"Tutsi pq",31:"Agua kirkland",32:"Agua kirkland",33:"Agua kirkland",34:"Agua kirkland",35:"Agua kirkland",36:"Agua kirkland",37:"Agua kirkland",38:"Arizona",39:"Arizona",40:"Arizona",41:"Café clásico 315 ml",42:"Café varios315ml",43:"Agua de coco 330ml",44:"Lechita chocolate 200ml",45:"Lechita chocolate 200ml",46:"Manzana (fruta)",47:"Jumex 200ml",48:"Jugo del valle 237 ml",49:"Free life",50:"Free life",51:"Manzanita sol 400ml",52:"Squirt",53:"Coca cola 500ml",54:"Coca cola 500ml",55:"Coca cola 500ml",56:"Coca cola 500ml",57:"Lipton 600ml",58:"Te verde 500ml",59:"Electrolitos 625ml",60:"Electrolitos 625ml"
    },
    "MAQ 4": {
      1:"Sabrita B)chetos,fritos,chur",3:"Sabrita B)chetos,fritos,chur",5:"Cremax choco/vainilla",7:"Cremax choco/vainilla",9:"Sabrita A)doritos,rufles,ranc",11:"Brownies",12:"Welchs gomitas",13:"Doraditas",14:"snikers",15:"Marinela (principie/triqui/plati",17:"Marinela (principie/triqui/plati",19:"Kelloggs",21:"Palanqueta",22:"Palanqueta",23:"Barrinolas",24:"Marinela (principie/triqui/plati",25:"Galletas artesanal",26:"Pelonetes",27:"Chocolate zero",28:"Halls",29:"Tutsi pq",30:"Tutsi pq",31:"Aguas s m",32:"Aguas s m",33:"Aguas s m",34:"Aguas s m",35:"Aguas s m",36:"Aguas s m",37:"Aguas s m",38:"Aguas s m",39:"Free life G",40:"Free life G",41:"Free life",42:"Free life",43:"Agua de coco 330ml",44:"Manzana (fruta)",45:"Manzana (fruta)",46:"Squirt",47:"Danone",48:"Danone",49:"Yakult rojo",50:"Yakult rojo",51:"Manzanita sol 400ml",52:"Squirt",53:"Te verde 500ml",54:"Te verde 500ml",55:"Coca cola 400ml",56:"Coca cola 400ml",57:"Lipton 600ml",58:"Lipton 600ml",59:"Electrolitos 625ml",60:"Electrolitos 625ml"
    }
  };

  maquinasActivas().forEach(asegurarEspiralesMaquina);
}

function ordenarProductos() {
  productos.sort((a, b) => a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }));
}

function hoy() {
  const fecha = new Date();
  const y = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, "0");
  const d = String(fecha.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function mesActual() {
  return hoy().slice(0, 7);
}

function generarId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function mostrarMensaje(titulo = "Guardado con éxito", texto = "", tipo = "ok") {
  const modal = document.getElementById("mensajeGuardado");
  document.getElementById("tituloMensaje").textContent = titulo;
  document.getElementById("textoMensaje").textContent = texto;
  modal.classList.remove("modal-error", "modal-alerta");
  if (tipo === "error") modal.classList.add("modal-error");
  if (tipo === "alerta") modal.classList.add("modal-alerta");
  modal.style.display = "flex";
  setTimeout(() => modal.style.display = "none", 1900);
}

function mostrarMensajeGuardado() {
  mostrarMensaje("Guardado con éxito", "La información quedó registrada.");
}

function mostrarBarraGuardado(texto = "Guardando control...") {
  let barra = document.getElementById("barraGuardado");
  if (!barra) {
    barra = document.createElement("div");
    barra.id = "barraGuardado";
    barra.className = "barra-guardado";
    barra.innerHTML = `<span></span><div><i></i></div>`;
    document.body.appendChild(barra);
  }
  barra.querySelector("span").textContent = texto;
  barra.classList.remove("activo", "completo");
  void barra.offsetWidth;
  barra.classList.add("activo");
  setTimeout(() => barra.classList.add("completo"), 80);
  setTimeout(() => barra.classList.remove("activo", "completo"), 1800);
}

function mostrarPanelReportesAnalisis() {
  if (esLimitado()) return mostrarReportes();
  return mostrarAnalisis();
}

function confirmarAccion(titulo, texto, textoAceptar, alAceptar) {
  let modal = document.getElementById("modalConfirmacionGeneral");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modalConfirmacionGeneral";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-contenido">
        <h2 id="tituloConfirmacionGeneral"></h2>
        <p id="textoConfirmacionGeneral"></p>
        <div class="acciones-modal">
          <button type="button" id="btnAceptarConfirmacion"></button>
          <button class="boton-secundario" type="button" id="btnCancelarConfirmacion">Cancelar</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  document.getElementById("tituloConfirmacionGeneral").textContent = titulo;
  document.getElementById("textoConfirmacionGeneral").textContent = texto;
  document.getElementById("btnAceptarConfirmacion").textContent = textoAceptar;
  document.getElementById("btnAceptarConfirmacion").onclick = () => {
    modal.style.display = "none";
    alAceptar();
  };
  document.getElementById("btnCancelarConfirmacion").onclick = () => {
    modal.style.display = "none";
  };
  modal.style.display = "flex";
}

function pedirCodigoDueno(titulo, texto, alAceptar) {
  let modal = document.getElementById("modalCodigoDueno");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modalCodigoDueno";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-contenido">
        <h2 id="tituloCodigoDueno"></h2>
        <p id="textoCodigoDueno"></p>
        <input type="password" id="inputCodigoDueno" placeholder="Código del dueño">
        <div class="acciones-modal">
          <button type="button" id="btnAceptarCodigoDueno">Editar</button>
          <button class="boton-secundario" type="button" id="btnCancelarCodigoDueno">Cancelar</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  document.getElementById("tituloCodigoDueno").textContent = titulo;
  document.getElementById("textoCodigoDueno").textContent = texto;
  document.getElementById("inputCodigoDueno").value = "";
  document.getElementById("btnAceptarCodigoDueno").onclick = () => {
    const codigo = document.getElementById("inputCodigoDueno").value;
    if (codigo !== CODIGO_CIERRE) return mostrarMensaje("Código incorrecto", "No se puede editar sin permiso del dueño.", "error");
    modal.style.display = "none";
    alAceptar();
  };
  document.getElementById("btnCancelarCodigoDueno").onclick = () => {
    modal.style.display = "none";
  };
  modal.style.display = "flex";
  setTimeout(() => document.getElementById("inputCodigoDueno").focus(), 50);
}

function mesCerrado(fecha) {
  return !!fecha && mesesCerrados.includes(fecha.slice(0, 7));
}

function puedeUsarFecha(fecha) {
  if (!fecha) {
    mostrarMensaje("Falta la fecha", "Selecciona una fecha antes de guardar.", "alerta");
    return false;
  }
  if (mesCerrado(fecha)) {
    mostrarMensaje("Mes cerrado", "No puedes capturar movimientos en un mes cerrado.", "error");
    return false;
  }
  return true;
}

function mostrarLogin() {
  document.getElementById("formLogin").style.display = "block";
  document.getElementById("formCuenta").style.display = "none";
  document.getElementById("tabLogin").classList.add("activo");
  document.getElementById("tabCuenta").classList.remove("activo");
  ocultarAyudas();
}

function mostrarCrearCuenta() {
  document.getElementById("formLogin").style.display = "none";
  document.getElementById("formCuenta").style.display = "block";
  document.getElementById("tabLogin").classList.remove("activo");
  document.getElementById("tabCuenta").classList.add("activo");
  ocultarAyudas();
}

function ocultarAyudas() {
  document.getElementById("ayudaUsuario").classList.remove("activo");
  document.getElementById("ayudaClave").classList.remove("activo");
  document.getElementById("ayudaCodigo").classList.remove("activo");
}

function mostrarAyuda(tipo) {
  ocultarAyudas();
  if (tipo === "usuario") document.getElementById("ayudaUsuario").classList.add("activo");
  if (tipo === "clave") document.getElementById("ayudaClave").classList.add("activo");
  if (tipo === "codigo") document.getElementById("ayudaCodigo").classList.add("activo");
}

function crearCuenta() {
  const usuario = document.getElementById("nuevoUsuario").value.trim();
  const clave = document.getElementById("nuevaClave").value.trim();
  const codigo = document.getElementById("codigoEmpresa").value.trim();
  const mensaje = document.getElementById("mensajeCuenta");

  if (!usuario || !clave || !codigo) return mensaje.textContent = "Completa todos los campos";
  if (codigo !== CODIGO_EMPRESA) return mensaje.textContent = "Código incorrecto";
  if (usuarios.some(item => item.usuario.toLowerCase() === usuario.toLowerCase())) return mensaje.textContent = "Ese usuario ya existe";

  usuarios.push({ usuario, clave, rol: "dueno" });
  guardar();
  document.getElementById("nuevoUsuario").value = "";
  document.getElementById("nuevaClave").value = "";
  document.getElementById("codigoEmpresa").value = "";
  mensaje.textContent = "";
  mostrarMensaje("Cuenta creada", "Ya puedes iniciar sesión con tu usuario.");
  mostrarLogin();
}

function iniciarSesion() {
  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value.trim();
  const existe = usuarios.find(item => item.usuario === usuario && item.clave === clave);
  if (!existe) {
    document.getElementById("mensaje").textContent = "Usuario o contraseña incorrectos";
    return;
  }
  usuarioActual = existe;
  document.getElementById("pantallaLogin").style.display = "none";
  document.getElementById("sistema").style.display = "block";
  aplicarPermisosMenu();
  if (esLimitado()) mostrarReportes();
  else mostrarInicio();
}

function cerrarSesion() {
  usuarioActual = null;
  alertasSesionMostradas = false;
  colaAlertasInventario = [];
  document.querySelector(".alerta-flotante")?.remove();
  document.getElementById("pantallaLogin").style.display = "block";
  document.getElementById("sistema").style.display = "none";
  document.getElementById("usuario").value = "";
  document.getElementById("clave").value = "";
  document.getElementById("mensaje").textContent = "";
}

function esLimitado() {
  return usuarioActual?.rol === "limitado";
}

function aplicarPermisosMenu() {
  document.querySelectorAll(".sidebar button").forEach(boton => boton.style.display = "");
  if (!esLimitado()) return;
  document.querySelectorAll(".sidebar button").forEach(boton => {
    const menu = boton.dataset.menu || boton.textContent.trim().toLowerCase();
    if (!["movimientos", "reportes", "salir", "cerrar sesión", "cerrar sesion"].includes(menu)) boton.style.display = "none";
  });
}

function bloquearSiLimitado(seccion) {
  if (!esLimitado()) return false;
  const permitido = seccion === "reportes" || seccion === "ajustes";
  if (!permitido) {
    mostrarMensaje("Acceso limitado", "Este usuario solo puede ver salidas a maquina y editar ajustes de reportes.", "alerta");
    return true;
  }
  return false;
}

function buscarProducto(nombre) {
  return productos.find(p => p.nombre.toLowerCase() === String(nombre).trim().toLowerCase());
}

function normalizarNombreProducto(nombre) {
  return String(nombre)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function productoSimilar(nombre, indiceIgnorado = null) {
  const normalizado = normalizarNombreProducto(nombre);
  return productos.find((item, indice) => {
    return indice !== indiceIgnorado && normalizarNombreProducto(item.nombre) === normalizado;
  });
}

function mostrarConfirmacionProductoSimilar(nombreParecido) {
  let modal = document.getElementById("modalConfirmacionProducto");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modalConfirmacionProducto";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-contenido">
        <h2 id="tituloConfirmacionProducto"></h2>
        <p id="textoConfirmacionProducto"></p>
        <div style="display:flex; gap:10px; margin-top:18px;">
          <button type="button" id="btnSeguirProducto">Seguir</button>
          <button class="boton-secundario" type="button" id="btnVolverProducto">Volver atrás</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  document.getElementById("tituloConfirmacionProducto").textContent = "Nombre similar";
  document.getElementById("textoConfirmacionProducto").textContent = `El nombre se parece a "${nombreParecido}". ¿Quieres seguir de todos modos?`;
  document.getElementById("btnSeguirProducto").onclick = () => {
    modal.style.display = "none";
    permitirProductoSimilar = true;
    guardarProducto();
  };
  document.getElementById("btnVolverProducto").onclick = () => {
    modal.style.display = "none";
    permitirProductoSimilar = false;
  };
  modal.style.display = "flex";
}

function productoDeBaja(producto, fecha = hoy()) {
  return !!producto.fechaBaja && producto.fechaBaja <= fecha;
}

function productoDisponibleEnFecha(producto, fecha = hoy()) {
  return !producto.fechaBaja || producto.fechaBaja > fecha;
}

function productosDisponibles(fecha = hoy()) {
  return productos.filter(p => productoDisponibleEnFecha(p, fecha));
}

function productoVisibleEnPeriodo(producto, tipoPeriodo, valor) {
  if (tipoPeriodo === "mes") return productoDisponibleEnFecha(producto, `${valor}-01`) || producto.fechaBaja?.slice(0, 7) === valor;
  return productoDisponibleEnFecha(producto, valor);
}

function opcionesProductos(id = "listaProductos", fecha = hoy()) {
  return `<datalist id="${id}">${productosDisponibles(fecha).map(p => `<option value="${p.nombre}"></option>`).join("")}</datalist>`;
}

function movimientoBase(tipo, producto, cantidad, fecha, nota) {
  return { id: generarId(), fecha, tipo, producto, cantidad: Number(cantidad || 0), maquina: "", espiral: "", categoria: "", nota: nota || "", lote: "", caducidad: "", lotes: [], controlId: null };
}

function movimientoRestaInventario(mov) {
  if (["salida", "merma", "cortesia", "ventaExterna", "salidaBG"].includes(mov.tipo)) return true;
  if (mov.tipo === "ajuste" && mov.categoria === "Sobrante (colocado)") return true;
  return false;
}

function movimientoSumaInventario(mov) {
  if (mov.tipo === "entrada") return true;
  if (mov.tipo === "ajuste" && mov.categoria !== "Sobrante (colocado)") return true;
  return false;
}

function lotesProducto(nombre) {
  const lotes = {};
  const producto = buscarProducto(nombre);
  if (producto && Number(producto.stockInicial || 0) > 0) {
    lotes["Stock inicial"] = {
      lote: "Stock inicial",
      caducidad: "",
      entrada: Number(producto.stockInicial || 0),
      salida: 0,
      fechaEntrada: producto.fechaEntrada || ""
    };
  }

  for (const mov of movimientos) {
    if (mov.producto !== nombre) continue;

    if (mov.tipo === "entrada") {
      const key = mov.lote || "Sin lote";
      lotes[key] = lotes[key] || { lote: key, caducidad: mov.caducidad || "", entrada: 0, salida: 0, fechaEntrada: mov.fecha };
      lotes[key].entrada += Number(mov.cantidad || 0);
      if (mov.caducidad && (!lotes[key].caducidad || mov.caducidad < lotes[key].caducidad)) lotes[key].caducidad = mov.caducidad;
    }

    if (mov.tipo === "ajuste" && mov.categoria !== "Sobrante (colocado)") {
      if (Array.isArray(mov.lotes) && mov.lotes.length) {
        for (const lote of mov.lotes) {
          const key = lote.lote || "Sin lote";
          lotes[key] = lotes[key] || { lote: key, caducidad: lote.caducidad || "", entrada: 0, salida: 0, fechaEntrada: mov.fecha };
          lotes[key].entrada += Number(lote.cantidad || 0);
        }
      } else if (mov.lote) {
        const key = mov.lote;
        lotes[key] = lotes[key] || { lote: key, caducidad: mov.caducidad || "", entrada: 0, salida: 0, fechaEntrada: mov.fecha };
        lotes[key].entrada += Number(mov.cantidad || 0);
      }
    }

    if (movimientoRestaInventario(mov) && Array.isArray(mov.lotes)) {
      for (const lote of mov.lotes) {
        const key = lote.lote || "Sin lote";
        lotes[key] = lotes[key] || { lote: key, caducidad: lote.caducidad || "", entrada: 0, salida: 0, fechaEntrada: mov.fecha };
        lotes[key].salida += Number(lote.cantidad || 0);
      }
    }
  }

  return Object.values(lotes).map(lote => ({
    ...lote,
    disponible: lote.entrada - lote.salida
  })).sort((a, b) => (a.caducidad || "9999-99-99").localeCompare(b.caducidad || "9999-99-99"));
}

function siguienteLoteProducto(nombre) {
  const usados = new Set();
  for (const lote of lotesProducto(nombre)) {
    const numero = Number(String(lote.lote || "").match(/^L?(\d+)$/i)?.[1] || 0);
    if (numero > 0) usados.add(numero);
  }

  let siguiente = 1;
  while (usados.has(siguiente)) siguiente++;
  return `L${String(siguiente).padStart(4, "0")}`;
}

function sugerirLoteEntrada() {
  const inputProducto = document.getElementById("entradaProducto");
  const inputLote = document.getElementById("entradaLote");
  if (!inputProducto || !inputLote) return;
  const producto = inputProducto.value.trim();
  if (!buscarProducto(producto)) return;
  inputLote.value = siguienteLoteProducto(producto);
}

function asignarLotesFIFO(producto, cantidad) {
  let restante = Number(cantidad || 0);
  const asignados = [];
  for (const lote of lotesProducto(producto).filter(l => l.disponible > 0)) {
    if (restante <= 0) break;
    const usado = Math.min(restante, lote.disponible);
    asignados.push({ lote: lote.lote, caducidad: lote.caducidad, cantidad: usado });
    restante -= usado;
  }
  return restante > 0 ? null : asignados;
}

function tomarLotesDeAsignacion(asignados, cantidad) {
  let restante = Number(cantidad || 0);
  const devueltos = [];
  for (const lote of asignados) {
    if (restante <= 0) break;
    const usado = Math.min(restante, Number(lote.cantidad || 0));
    devueltos.push({ lote: lote.lote, caducidad: lote.caducidad, cantidad: usado });
    restante -= usado;
  }
  return devueltos;
}

function impactoAjuste(categoria, cantidad) {
  return categoria === "Sobrante (colocado)" ? -Number(cantidad || 0) : Number(cantidad || 0);
}

function calcularProducto(nombre) {
  const producto = buscarProducto(nombre);
  const base = { stockInicial: Number(producto?.stockInicial || 0), compras: 0, salidaMaq1: 0, salidaMaq2: 0, salidaMaq3: 0, salidaMaq4: 0, salidaBG: 0, mermas: 0, ajustes: 0, cortesia: 0, ventaExterna: 0 };

  for (const mov of movimientos) {
    if (mov.producto !== nombre) continue;
    const cantidad = Number(mov.cantidad || 0);
    if (mov.tipo === "entrada") base.compras += cantidad;
    if (mov.tipo === "salida" && mov.maquina === "MAQ 1") base.salidaMaq1 += cantidad;
    if (mov.tipo === "salida" && mov.maquina === "MAQ 2") base.salidaMaq2 += cantidad;
    if (mov.tipo === "salida" && mov.maquina === "MAQ 3") base.salidaMaq3 += cantidad;
    if (mov.tipo === "salida" && mov.maquina === "MAQ 4") base.salidaMaq4 += cantidad;
    if (mov.tipo === "merma") base.mermas += cantidad;
    if (mov.tipo === "cortesia") base.cortesia += cantidad;
    if (mov.tipo === "ventaExterna") base.ventaExterna += cantidad;
    if (mov.tipo === "salidaBG") base.salidaBG += cantidad;
    if (mov.tipo === "ajuste") base.ajustes += impactoAjuste(mov.categoria, cantidad);
  }

  base.totalSalida = base.salidaMaq1 + base.salidaMaq2 + base.salidaMaq3 + base.salidaMaq4 + base.salidaBG + base.mermas + base.cortesia + base.ventaExterna;
  base.inventarioFinal = base.stockInicial + base.compras + base.ajustes - base.totalSalida;
  base.ventas = (base.salidaMaq1 + base.salidaMaq2 + base.salidaMaq3 + base.salidaMaq4 + base.ventaExterna) * Number(producto?.precio || 0);
  return base;
}

function calcularProductoHastaFecha(nombre, fechaLimite) {
  const producto = buscarProducto(nombre);
  const stockValido = producto?.fechaEntrada && producto.fechaEntrada <= fechaLimite;
  const base = { stockInicial: stockValido ? Number(producto?.stockInicial || 0) : 0, compras: 0, salidaMaq1: 0, salidaMaq2: 0, salidaMaq3: 0, salidaMaq4: 0, salidaBG: 0, mermas: 0, ajustes: 0, cortesia: 0, ventaExterna: 0 };

  for (const mov of movimientos) {
    if (mov.producto !== nombre) continue;
    if (!mov.fecha || mov.fecha > fechaLimite) continue;
    const cantidad = Number(mov.cantidad || 0);
    if (mov.tipo === "entrada") base.compras += cantidad;
    if (mov.tipo === "salida" && mov.maquina === "MAQ 1") base.salidaMaq1 += cantidad;
    if (mov.tipo === "salida" && mov.maquina === "MAQ 2") base.salidaMaq2 += cantidad;
    if (mov.tipo === "salida" && mov.maquina === "MAQ 3") base.salidaMaq3 += cantidad;
    if (mov.tipo === "salida" && mov.maquina === "MAQ 4") base.salidaMaq4 += cantidad;
    if (mov.tipo === "merma") base.mermas += cantidad;
    if (mov.tipo === "cortesia") base.cortesia += cantidad;
    if (mov.tipo === "ventaExterna") base.ventaExterna += cantidad;
    if (mov.tipo === "salidaBG") base.salidaBG += cantidad;
    if (mov.tipo === "ajuste") base.ajustes += impactoAjuste(mov.categoria, cantidad);
  }

  base.totalSalida = base.salidaMaq1 + base.salidaMaq2 + base.salidaMaq3 + base.salidaMaq4 + base.salidaBG + base.mermas + base.cortesia + base.ventaExterna;
  base.inventarioFinal = base.stockInicial + base.compras + base.ajustes - base.totalSalida;
  return base;
}

function fechaAnterior(fecha) {
  const base = new Date(`${fecha}T00:00:00`);
  base.setDate(base.getDate() - 1);
  const y = base.getFullYear();
  const m = String(base.getMonth() + 1).padStart(2, "0");
  const d = String(base.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function inventarioInicialProducto(nombre, tipoPeriodo, valor) {
  const producto = buscarProducto(nombre);
  const fechaBase = tipoPeriodo === "mes" ? fechaAnterior(`${valor}-01`) : fechaAnterior(valor);
  const inicial = calcularProductoHastaFecha(nombre, fechaBase);
  if (tipoPeriodo === "dia" && producto?.fechaEntrada === valor) {
    inicial.inventarioFinal += Number(producto.stockInicial || 0);
  }
  return inicial;
}

function movimientosPorPeriodo(tipoPeriodo, valor) {
  return movimientos.filter(mov => tipoPeriodo === "dia" ? mov.fecha === valor : (mov.fecha || "").slice(0, 7) === valor);
}

function calcularProductoPeriodo(nombre, lista) {
  const producto = buscarProducto(nombre);
  const base = { compras: 0, salidaMaq1: 0, salidaMaq2: 0, salidaMaq3: 0, salidaMaq4: 0, salidaBG: 0, mermas: 0, ajustes: 0, entradasReporte: 0, salidasReporte: 0, cortesia: 0, ventaExterna: 0 };
  for (const mov of lista) {
    if (mov.producto !== nombre) continue;
    const cantidad = Number(mov.cantidad || 0);
    if (mov.tipo === "entrada") base.compras += cantidad;
    if (mov.tipo === "salida" && mov.maquina === "MAQ 1") base.salidaMaq1 += cantidad;
    if (mov.tipo === "salida" && mov.maquina === "MAQ 2") base.salidaMaq2 += cantidad;
    if (mov.tipo === "salida" && mov.maquina === "MAQ 3") base.salidaMaq3 += cantidad;
    if (mov.tipo === "salida" && mov.maquina === "MAQ 4") base.salidaMaq4 += cantidad;
    if (mov.tipo === "merma") base.mermas += cantidad;
    if (mov.tipo === "cortesia") base.cortesia += cantidad;
    if (mov.tipo === "ventaExterna") base.ventaExterna += cantidad;
    if (mov.tipo === "salidaBG") base.salidaBG += cantidad;
    if (mov.tipo === "ajuste") {
      const impacto = impactoAjuste(mov.categoria, cantidad);
      base.ajustes += impacto;
      if (impacto >= 0) base.entradasReporte += impacto;
      else base.salidasReporte += Math.abs(impacto);
    }
  }
  base.totalSalida = base.salidaMaq1 + base.salidaMaq2 + base.salidaMaq3 + base.salidaMaq4 + base.salidaBG + base.mermas + base.cortesia + base.ventaExterna;
  base.balance = base.compras + base.entradasReporte - base.salidasReporte - base.totalSalida;
  base.ventas = (base.salidaMaq1 + base.salidaMaq2 + base.salidaMaq3 + base.salidaMaq4 + base.ventaExterna) * Number(producto?.precio || 0);
  return base;
}

function resumenGeneral() {
  let ventas = 0;
  let bajoStock = 0;
  for (const producto of productosDisponibles(hoy())) {
    const calc = calcularProducto(producto.nombre);
    ventas += calc.ventas;
    if (calc.inventarioFinal <= 15) bajoStock++;
  }
  return { productos: productosDisponibles(hoy()).length, ventas, bajoStock };
}

function diasEntreFechas(inicio, fin) {
  const uno = new Date(`${inicio}T00:00:00`);
  const dos = new Date(`${fin}T00:00:00`);
  return Math.ceil((dos - uno) / 86400000);
}

function productosPorCaducar(dias = 30) {
  return productosDisponibles(hoy()).flatMap(producto => {
    return lotesProducto(producto.nombre)
      .filter(lote => lote.caducidad && lote.disponible > 0)
      .map(lote => ({
        producto: producto.nombre,
        lote: lote.lote,
        caducidad: lote.caducidad,
        disponible: lote.disponible,
        dias: diasEntreFechas(hoy(), lote.caducidad)
      }));
  }).filter(item => item.dias >= 0 && item.dias <= dias)
    .sort((a, b) => a.dias - b.dias || a.producto.localeCompare(b.producto, "es", { sensitivity: "base" }));
}

function productosBajoStockActuales(limite = 15) {
  return productosDisponibles(hoy())
    .map(producto => {
      const calc = calcularProducto(producto.nombre);
      const existencia = Number(calc.inventarioFinal || 0);
      return {
        nombre: producto.nombre,
        existencia,
        sugerido: Math.max(1, 20 - existencia),
        prioridad: existencia <= 0 ? "Urgente" : "Reponer"
      };
    })
    .filter(item => item.existencia <= limite)
    .sort((a, b) => a.existencia - b.existencia || a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }));
}

function mostrarInicio() {
  if (bloquearSiLimitado("inicio")) return;
  const resumen = resumenGeneral();
  const movimientosHoy = movimientos.filter(mov => mov.fecha === hoy()).length;
  const caducidad = productosPorCaducar(30).slice(0, 8).map(item => `<tr><td>${item.producto}</td><td>${item.lote}</td><td>${item.caducidad}</td><td class="numero">${item.disponible}</td><td class="numero">${item.dias}</td></tr>`).join("");
  const bajos = productosBajoStockActuales().map(item => `<li>${item.nombre}: <strong>${item.existencia}</strong> piezas</li>`).join("");

  document.getElementById("contenido").innerHTML = `
    <h2>Resumen general</h2>
    <div class="grid-resumen">
      <div class="tarjeta-kpi"><span>Productos activos</span><strong>${resumen.productos}</strong></div>
      <div class="tarjeta-kpi"><span>Bajo stock</span><strong>${resumen.bajoStock}</strong></div>
      <div class="tarjeta-kpi"><span>Movimientos hoy</span><strong>${movimientosHoy}</strong></div>
      <div class="tarjeta-kpi"><span>Ventas estimadas</span><strong>$${resumen.ventas.toFixed(2)}</strong></div>
    </div>
    <div class="layout-doble">
      <div class="panel"><h3>Atención de inventario</h3><p>Productos con lote disponible que caducan en los próximos 30 días.</p><table class="tabla"><tr><th>Producto</th><th>Lote</th><th>Caducidad</th><th>Disponible</th><th>Días</th></tr>${caducidad || `<tr><td colspan="5">No hay productos próximos a caducar.</td></tr>`}</table></div>
      <div class="panel">
        <h3>Bajo stock</h3>
        <p>Productos activos con 15 piezas o menos.</p>
        <ul>${bajos || "<li>No hay productos con bajo stock.</li>"}</ul>
        <div class="panel-acciones-linea">
          <button class="boton-pequeno" type="button" onclick="mostrarMovimientos('entrada')">Capturar entrada</button>
          <button class="boton-pequeno boton-secundario" type="button" onclick="abrirSelectorBajoStock()">Imprimir lista de compras</button>
        </div>
      </div>
    </div>`;
}

function abrirSelectorBajoStock() {
  const lista = productosBajoStockActuales();
  if (!lista.length) {
    mostrarMensaje("Sin bajo stock", "No hay productos con 15 piezas o menos para imprimir.");
    return;
  }

  const opciones = lista.map((item, indice) => `
    <label class="selector-producto-compra">
      <input type="checkbox" class="checkBajoStock" value="${indice}" checked>
      <span>
        <strong>${item.nombre}</strong>
        <small>Existencia actual: ${item.existencia} | ${item.prioridad}</small>
      </span>
    </label>`).join("");

  document.getElementById("detalleProducto").innerHTML = `
    <div class="selector-compras">
      <h2>Productos necesarios para comprar</h2>
      <p class="texto-suave">Marca solo los productos que quieres mandar a imprimir.</p>
      <div class="selector-compras-acciones">
        <button class="boton-mini boton-secundario" type="button" onclick="marcarBajoStock(true)">Marcar todos</button>
        <button class="boton-mini boton-secundario" type="button" onclick="marcarBajoStock(false)">Quitar todos</button>
      </div>
      <div class="selector-compras-lista">${opciones}</div>
      <div class="acciones-modal">
        <button type="button" onclick="imprimirBajoStockSeleccionados()">Imprimir seleccionados</button>
        <button class="boton-secundario" type="button" onclick="cerrarDetalleProducto()">Cancelar</button>
      </div>
    </div>`;
  document.getElementById("modalProducto").style.display = "flex";
}

function marcarBajoStock(marcado) {
  document.querySelectorAll(".checkBajoStock").forEach(check => check.checked = marcado);
}

function imprimirBajoStockSeleccionados() {
  const listaCompleta = productosBajoStockActuales();
  const seleccionados = Array.from(document.querySelectorAll(".checkBajoStock:checked"))
    .map(check => listaCompleta[Number(check.value)])
    .filter(Boolean);

  if (!seleccionados.length) {
    mostrarMensaje("Sin productos", "Marca al menos un producto para imprimir.", "alerta");
    return;
  }

  cerrarDetalleProducto();
  imprimirBajoStock(seleccionados);
}

function imprimirBajoStock(listaPersonalizada = null) {
  const fecha = hoy();
  const lista = listaPersonalizada || productosBajoStockActuales();
  const filas = lista.map((item, indice) => `<tr>
    <td>${indice + 1}</td>
    <td>${item.nombre}</td>
    <td>${item.existencia}</td>
    <td class="cantidad-pedir"></td>
    <td><span class="${item.prioridad === "Urgente" ? "urgente" : "normal"}">${item.prioridad}</span></td>
    <td class="check"></td>
  </tr>`).join("");

  const ventana = window.open("", "_blank", "width=900,height=760");
  if (!ventana) {
    mostrarMensaje("No se pudo imprimir", "Permite ventanas emergentes para generar la lista de bajo stock.");
    return;
  }

  ventana.document.write(`<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Productos necesarios para comprar</title>
    <style>
      body { font-family: Arial, Helvetica, sans-serif; margin: 28px; color: #102018; background: #ffffff; }
      .encabezado { display: flex; justify-content: space-between; gap: 18px; align-items: flex-start; border-bottom: 4px solid #166534; padding-bottom: 16px; margin-bottom: 18px; }
      .marca { display: flex; gap: 12px; align-items: center; }
      .logo { width: 44px; height: 44px; border-radius: 14px; background: linear-gradient(135deg, #14532d, #22c55e); color: white; display: grid; place-items: center; font-weight: 900; font-size: 22px; }
      h1 { margin: 0; color: #14532d; font-size: 28px; }
      p { margin: 5px 0 0; color: #64748b; }
      .fecha { background: #dcfce7; color: #14532d; border: 1px solid #86efac; padding: 10px 14px; border-radius: 12px; font-weight: 800; white-space: nowrap; }
      .resumen { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 18px 0; }
      .dato { border: 1px solid #dbe5dd; border-radius: 14px; padding: 13px; background: #f8fbf8; }
      .dato span { color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; }
      .dato strong { display: block; color: #14532d; font-size: 24px; margin-top: 4px; }
      table { width: 100%; border-collapse: collapse; font-size: 13px; overflow: hidden; border-radius: 14px; }
      th { background: #14532d; color: white; text-align: left; padding: 11px; }
      td { border-bottom: 1px solid #dbe5dd; padding: 10px 11px; }
      tr:nth-child(even) td { background: #f3f7f4; }
      td:first-child, td:nth-child(3), td:nth-child(4), th:first-child, th:nth-child(3), th:nth-child(4) { text-align: center; }
      .urgente, .normal { display: inline-block; min-width: 72px; text-align: center; border-radius: 999px; padding: 5px 9px; font-weight: 800; font-size: 12px; }
      .urgente { background: #fee2e2; color: #991b1b; }
      .normal { background: #dcfce7; color: #166534; }
      .cantidad-pedir::after { content: ""; display: block; width: 82px; max-width: 100%; height: 1px; background: #94a3b8; margin: 14px auto 4px; }
      .check::after { content: ""; display: inline-block; width: 18px; height: 18px; border: 2px solid #94a3b8; border-radius: 5px; }
      .nota { margin-top: 18px; padding: 12px 14px; border-radius: 14px; background: #f8fafc; border: 1px solid #e2e8f0; color: #475569; }
      .pie { margin-top: 18px; color: #64748b; font-size: 11px; }
      @media print { body { margin: 13mm; } }
    </style>
  </head>
  <body>
    <div class="encabezado">
      <div class="marca">
        <div class="logo">N</div>
        <div>
          <h1>Productos necesarios para comprar</h1>
          <p>Nuez de Avellana | Lista generada por bajo stock</p>
        </div>
      </div>
      <div class="fecha">${fecha}</div>
    </div>
    <div class="resumen">
      <div class="dato"><span>Productos seleccionados</span><strong>${lista.length}</strong></div>
      <div class="dato"><span>Stock mínimo</span><strong>15</strong></div>
      <div class="dato"><span>Fecha</span><strong>${fecha}</strong></div>
    </div>
    <table>
      <thead>
        <tr><th>#</th><th>Producto</th><th>Existencia actual</th><th>Cantidad a pedir</th><th>Prioridad</th><th>Comprado</th></tr>
      </thead>
      <tbody>${filas || `<tr><td colspan="6">No hay productos con bajo stock por comprar.</td></tr>`}</tbody>
    </table>
    <div class="nota">Lista preparada con productos que tienen 15 piezas o menos. Escribe la cantidad real a pedir segun espacio, caducidad y venta esperada.</div>
    <p class="pie">Generado desde el sistema de inventario de Nuez de Avellana.</p>
    <script>window.onload = () => { window.print(); };</script>
  </body>
  </html>`);
  ventana.document.close();
}

function mostrarInventario(tipoPeriodo = "dia", valor = hoy()) {
  if (bloquearSiLimitado("inventario")) return;
  const lista = movimientosPorPeriodo(tipoPeriodo, valor);
  const filas = productos.filter(p => productoVisibleEnPeriodo(p, tipoPeriodo, valor)).map(producto => {
    const calc = calcularProductoPeriodo(producto.nombre, lista);
    const fechaFinal = tipoPeriodo === "mes" ? `${valor}-31` : valor;
    const inicial = inventarioInicialProducto(producto.nombre, tipoPeriodo, valor);
    const global = calcularProductoHastaFecha(producto.nombre, fechaFinal);
    const estado = productoDeBaja(producto, hoy()) ? "De baja" : "Activo";
    const claseEstado = estado === "De baja" ? "pill pill-baja" : "pill";
    return `<tr data-producto="${producto.nombre.toLowerCase()}">
      <td>${producto.nombre}</td>
      <td><span class="${claseEstado}">${estado}</span></td>
      <td class="numero">${inicial.inventarioFinal}</td>
      <td class="numero">${calc.compras}</td>
      <td class="numero">${calc.entradasReporte}</td>
      <td class="numero">${calc.salidasReporte}</td>
      <td class="numero">${calc.salidaBG}</td>
      <td class="numero">${calc.salidaMaq1}</td>
      <td class="numero">${calc.salidaMaq2}</td>
      <td class="numero">${calc.salidaMaq3}</td>
      <td class="numero">${calc.salidaMaq4}</td>
      <td class="numero">${calc.mermas}</td>
      <td class="numero">${calc.cortesia}</td>
      <td class="numero">${calc.ventaExterna}</td>
      <td class="numero"><strong>${global.inventarioFinal}</strong></td>
    </tr>`;
  }).join("");
  const tarjetasMovil = productos.filter(p => productoVisibleEnPeriodo(p, tipoPeriodo, valor)).map(producto => {
    const calc = calcularProductoPeriodo(producto.nombre, lista);
    const fechaFinal = tipoPeriodo === "mes" ? `${valor}-31` : valor;
    const inicial = inventarioInicialProducto(producto.nombre, tipoPeriodo, valor);
    const global = calcularProductoHastaFecha(producto.nombre, fechaFinal);
    const estado = productoDeBaja(producto, hoy()) ? "De baja" : "Activo";
    const claseEstado = estado === "De baja" ? "pill pill-baja" : "pill";
    return `<article class="inventario-card" data-producto="${producto.nombre.toLowerCase()}">
      <div class="inventario-card-head"><h3>${producto.nombre}</h3><span class="${claseEstado}">${estado}</span></div>
      <div class="inventario-card-grid">
        <span>Invt inicial<strong>${inicial.inventarioFinal}</strong></span>
        <span>Entrada/Compras<strong>${calc.compras}</strong></span>
        <span>Entradas reportes<strong>${calc.entradasReporte}</strong></span>
        <span>Salidas reportes<strong>${calc.salidasReporte}</strong></span>
        <span>Salida BG<strong>${calc.salidaBG}</strong></span>
        <span>MAQ 1<strong>${calc.salidaMaq1}</strong></span>
        <span>MAQ 2<strong>${calc.salidaMaq2}</strong></span>
        <span>MAQ 3<strong>${calc.salidaMaq3}</strong></span>
        <span>MAQ 4<strong>${calc.salidaMaq4}</strong></span>
        <span>Merma<strong>${calc.mermas}</strong></span>
        <span>Cortesía<strong>${calc.cortesia}</strong></span>
        <span>Venta externa<strong>${calc.ventaExterna}</strong></span>
        <span class="final">Invt final<strong>${global.inventarioFinal}</strong></span>
      </div>
    </article>`;
  }).join("");

  document.getElementById("contenido").innerHTML = `
    <div class="titulo-con-estado">
      <div>
        <h2>Inventario por ${tipoPeriodo === "dia" ? "día" : "mes"}</h2>
        <p class="texto-suave">En mes completo también aparecen los productos dados de baja durante ese mes.</p>
      </div>
      <button class="boton-mini" type="button" onclick="imprimirInventarioDia()">Imprimir inventario del día</button>
    </div>
    <div class="form-grid">
      <div><label>Ver por</label><select id="invTipo" onchange="cambiarFiltroInventario()"><option value="dia" ${tipoPeriodo === "dia" ? "selected" : ""}>Día</option><option value="mes" ${tipoPeriodo === "mes" ? "selected" : ""}>Mes completo</option></select></div>
      <div><label>Fecha</label><input id="invFecha" type="${tipoPeriodo === "dia" ? "date" : "month"}" value="${valor}" onchange="cambiarFiltroInventario()"></div>
      <div><label>Buscar producto</label><input id="buscarInventario" placeholder="Escribe para filtrar" oninput="filtrarInventarioTabla(this.value)"></div>
    </div>
    <div class="inventario-mobile-list" id="inventarioMobile">${tarjetasMovil || `<p>No hay informacion para este periodo.</p>`}</div>
    <table class="tabla tabla-inventario" id="tablaInventario">
      <tr><th>Producto</th><th>Estado</th><th>Invt inicial</th><th>Entrada/Compras</th><th>Entradas reportes</th><th>Salidas reportes</th><th>Salida BG</th><th>MAQ 1</th><th>MAQ 2</th><th>MAQ 3</th><th>MAQ 4</th><th>Merma</th><th>Cortesía</th><th>Venta externa</th><th>Invt final</th></tr>
      ${filas || `<tr><td colspan="15">No hay informacion para este periodo.</td></tr>`}
    </table>`;
}

function cambiarFiltroInventario() {
  const tipo = document.getElementById("invTipo").value;
  const valor = document.getElementById("invFecha").value || (tipo === "dia" ? hoy() : mesActual());
  mostrarInventario(tipo, valor);
}

function filtrarInventarioTabla(texto) {
  const filtro = texto.toLowerCase();
  document.querySelectorAll("#tablaInventario tr").forEach((fila, indice) => {
    if (indice === 0) return;
    const producto = fila.dataset.producto || fila.innerText.toLowerCase();
    fila.style.display = producto.includes(filtro) ? "" : "none";
  });
  document.querySelectorAll("#inventarioMobile .inventario-card").forEach(card => {
    const producto = card.dataset.producto || card.innerText.toLowerCase();
    card.style.display = producto.includes(filtro) ? "" : "none";
  });
}

function imprimirInventarioDia() {
  const tipo = document.getElementById("invTipo")?.value || "dia";
  const fecha = tipo === "dia"
    ? (document.getElementById("invFecha")?.value || hoy())
    : hoy();
  const lista = movimientosPorPeriodo("dia", fecha);
  const filas = productos
    .filter(p => productoVisibleEnPeriodo(p, "dia", fecha))
    .map(producto => {
      const calc = calcularProductoPeriodo(producto.nombre, lista);
      const inicial = inventarioInicialProducto(producto.nombre, "dia", fecha);
      const global = calcularProductoHastaFecha(producto.nombre, fecha);
      const estado = productoDeBaja(producto, fecha) ? "De baja" : "Activo";
      return `<tr>
        <td>${producto.nombre}</td>
        <td>${estado}</td>
        <td>${inicial.inventarioFinal}</td>
        <td>${calc.compras}</td>
        <td>${calc.entradasReporte}</td>
        <td>${calc.salidasReporte}</td>
        <td>${calc.salidaBG}</td>
        <td>${calc.salidaMaq1 + calc.salidaMaq2 + calc.salidaMaq3}</td>
        <td>${calc.mermas}</td>
        <td>${calc.cortesia}</td>
        <td>${calc.ventaExterna}</td>
        <td><strong>${global.inventarioFinal}</strong></td>
      </tr>`;
    }).join("");

  const ventana = window.open("", "_blank", "width=1100,height=800");
  if (!ventana) {
    mostrarMensaje("No se pudo imprimir", "Permite ventanas emergentes para generar el inventario.");
    return;
  }

  ventana.document.write(`<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Inventario ${fecha}</title>
    <style>
      body { font-family: Arial, Helvetica, sans-serif; margin: 28px; color: #102018; }
      .encabezado { display: flex; justify-content: space-between; gap: 18px; align-items: flex-start; border-bottom: 3px solid #166534; padding-bottom: 14px; margin-bottom: 18px; }
      h1 { margin: 0; color: #14532d; font-size: 26px; }
      p { margin: 5px 0 0; color: #64748b; }
      .fecha { background: #dcfce7; color: #14532d; border: 1px solid #86efac; padding: 10px 14px; border-radius: 12px; font-weight: 800; white-space: nowrap; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      th { background: #14532d; color: white; text-align: left; padding: 9px; }
      td { border-bottom: 1px solid #dbe5dd; padding: 8px; }
      tr:nth-child(even) td { background: #f3f7f4; }
      td:not(:first-child), th:not(:first-child) { text-align: center; }
      .pie { margin-top: 18px; color: #64748b; font-size: 11px; }
      @media print { body { margin: 14mm; } button { display: none; } }
    </style>
  </head>
  <body>
    <div class="encabezado">
      <div>
        <h1>Nuez de Avellana</h1>
        <p>Inventario del día</p>
      </div>
      <div class="fecha">${fecha}</div>
    </div>
    <table>
      <thead>
        <tr><th>Producto</th><th>Estado</th><th>Invt inicial</th><th>Entrada/Compras</th><th>Entradas reportes</th><th>Salidas reportes</th><th>Salida BG</th><th>Salidas maq</th><th>Merma</th><th>Cortesía</th><th>Venta externa</th><th>Invt final</th></tr>
      </thead>
      <tbody>${filas || `<tr><td colspan="12">No hay informacion para este dia.</td></tr>`}</tbody>
    </table>
    <p class="pie">Generado desde el sistema de inventario de Nuez de Avellana.</p>
    <script>window.onload = () => { window.print(); };</script>
  </body>
  </html>`);
  ventana.document.close();
}

function alertasInventarioActuales() {
  const bajoStock = productosDisponibles(hoy())
    .map(producto => ({ producto, calc: calcularProducto(producto.nombre) }))
    .filter(item => item.calc.inventarioFinal <= 15)
    .sort((a, b) => a.calc.inventarioFinal - b.calc.inventarioFinal)
    .map(item => ({
      tipo: "stock",
      titulo: `Bajo stock de ${item.producto.nombre}`,
      texto: `Quedan ${item.calc.inventarioFinal} piezas disponibles. Conviene capturar una entrada o compra.`,
      producto: item.producto.nombre,
      accion: () => mostrarMovimientos("entrada", item.producto.nombre)
    }));

  const caducidad = productosPorCaducar(30).map(item => ({
    tipo: "caducidad",
    titulo: `${item.producto} por caducar`,
    texto: `Lote ${item.lote || "-"} vence el ${item.caducidad}. Disponible: ${item.disponible}. Faltan ${item.dias} dias.`,
    accion: () => mostrarInventario("dia", hoy())
  }));

  return [...bajoStock, ...caducidad];
}

function mostrarBienvenidaSesion() {
  const nombre = usuarioActual?.usuario || "usuario";
  const limitado = esLimitado();
  const bienvenida = document.createElement("div");
  bienvenida.className = "bienvenida-sesion";
  bienvenida.innerHTML = `<strong>Bienvenido ${nombre}</strong><span>${limitado ? "Modo reportes y ajustes activo." : "Preparando alertas del inventario..."}</span>`;
  document.body.appendChild(bienvenida);

  setTimeout(() => bienvenida.classList.add("salir"), 1000);
  setTimeout(() => {
    bienvenida.remove();
    if (!limitado) prepararAlertasInventario();
  }, 1500);
}

function prepararAlertasInventario() {
  if (esLimitado()) return;
  if (alertasSesionMostradas) return;
  alertasSesionMostradas = true;
  colaAlertasInventario = alertasInventarioActuales();
  mostrarSiguienteAlertaInventario();
}

function mostrarSiguienteAlertaInventario() {
  if (esLimitado()) {
    colaAlertasInventario = [];
    document.querySelector(".alerta-flotante")?.remove();
    return;
  }
  const existente = document.querySelector(".alerta-flotante");
  if (existente) existente.remove();

  const alerta = colaAlertasInventario.shift();
  if (!alerta) return;

  const tarjeta = document.createElement("div");
  tarjeta.className = `alerta-flotante alerta-${alerta.tipo}`;
  tarjeta.innerHTML = `
    <div>
      <span>${alerta.tipo === "stock" ? "Atencion de stock" : "Atencion de caducidad"}</span>
      <h3>${alerta.titulo}</h3>
      <p>${alerta.texto}</p>
    </div>
    <div class="alerta-acciones">
      <button type="button" class="boton-secundario" onclick="posponerAlertaInventario()">Siguiente alerta</button>
      <button type="button" onclick="analizarAlertaInventario()">Analizar ahora</button>
    </div>`;
  document.body.appendChild(tarjeta);
  tarjeta._accionAlerta = alerta.accion;
}

function posponerAlertaInventario() {
  mostrarSiguienteAlertaInventario();
}

function pausarAlertasInventario() {
  localStorage.setItem(`${CLAVE}-alertasPausadasHasta`, String(Date.now() + 60 * 60 * 1000));
  colaAlertasInventario = [];
  document.querySelector(".alerta-flotante")?.remove();
  mostrarBarraGuardado("Alertas pausadas por 1 hora");
}

function analizarAlertaInventario() {
  const tarjeta = document.querySelector(".alerta-flotante");
  const accion = tarjeta?._accionAlerta;
  if (tarjeta) tarjeta.remove();
  alertaPendienteTrasAnalizar = true;
  if (typeof accion === "function") accion();
}

function mostrarProductos() {
  if (bloquearSiLimitado("productos")) return;
  ordenarProductos();
  const producto = productoEditando !== null ? productos[productoEditando] : {};
  const tarjetas = productos.map((item, indice) => {
    const calc = calcularProducto(item.nombre);
    const estado = productoDeBaja(item, hoy()) ? "De baja" : "Activo";
    const claseEstado = estado === "De baja" ? "pill pill-baja" : "pill";
    return `<article class="producto-card" data-producto="${item.nombre.toLowerCase()}">
      <div class="producto-card-head">
        <span class="${claseEstado}">${estado}</span>
        <strong>${calc.inventarioFinal} pzas</strong>
      </div>
      <h3>${item.nombre}</h3>
      <div class="producto-datos">
        <span>Entrada<strong>${item.fechaEntrada || "-"}</strong></span>
        <span>Baja<strong>${item.fechaBaja || "-"}</strong></span>
        <span>Stock inicial<strong>${item.stockInicial || 0}</strong></span>
        <span>Precio<strong>$${Number(item.precio || 0).toFixed(2)}</strong></span>
      </div>
      <p>${item.observaciones || "Sin observaciones."}</p>
      <div class="producto-acciones">
        <button type="button" onclick="verProducto(${indice})">Ver</button>
        <button type="button" onclick="editarProducto(${indice})">Editar</button>
        <button class="boton-peligro" type="button" onclick="eliminarProducto(${indice})">Eliminar</button>
      </div>
    </article>`;
  }).join("");

  document.getElementById("contenido").innerHTML = `
    <h2>Mercancías y productos</h2>
    <div class="form-grid">
      <div><label>Producto</label><input id="productoNombre" placeholder="Nombre del producto" value="${producto.nombre || ""}"></div>
      <div><label>Fecha entrada</label><input type="date" id="productoFechaEntrada" value="${producto.fechaEntrada || hoy()}" onchange="mensajeFechaProducto(this.value)"></div>
      <div><label>Stock inicial</label><input type="number" id="productoStock" min="0" placeholder="0" value="${producto.stockInicial || 0}"></div>
      <div><label>Precio venta</label><input type="number" id="productoPrecio" min="0" step="0.01" placeholder="0" value="${producto.precio || 0}"></div>
      <div><label>Fecha baja</label><input type="date" id="productoFechaBaja" value="${producto.fechaBaja || ""}"></div>
      <div><label>Observaciones</label><input id="productoObservaciones" placeholder="Notas" value="${producto.observaciones || ""}"></div>
      <button class="boton-pequeno" type="button" onclick="guardarProducto()">${productoEditando !== null ? "Guardar cambios" : "Agregar producto"}</button>
      <button class="boton-pequeno boton-secundario" type="button" onclick="cancelarEdicionProducto()">Cancelar</button>
    </div>
    <p class="texto-suave" id="mensajeFechaProducto"></p>
    <div class="form-grid"><div><label>Buscar producto</label><input id="buscarProducto" placeholder="Escribe para filtrar" oninput="filtrarProductosTabla(this.value)"></div></div>
    <div class="productos-grid" id="tablaProductos">${tarjetas}</div>`;
}

function mensajeFechaProducto(valor) {
  const mensaje = document.getElementById("mensajeFechaProducto");
  if (!valor) mensaje.textContent = "";
  else if (valor < hoy()) mensaje.textContent = "Elegiste una fecha pasada.";
  else if (valor > hoy()) mensaje.textContent = "Elegiste una fecha futura.";
  else mensaje.textContent = "Fecha actual.";
}

function filtrarProductosTabla(texto) {
  const filtro = texto.toLowerCase();
  document.querySelectorAll(".producto-card").forEach(card => {
    card.style.display = card.dataset.producto.includes(filtro) ? "" : "none";
  });
}

function editarProducto(indice) {
  productoEditando = indice;
  mostrarProductos();
  mostrarMensaje("Editando producto", "Haz los cambios y presiona guardar.");
}

function cancelarEdicionProducto() {
  productoEditando = null;
  mostrarProductos();
}

function guardarProducto() {
  const nombre = document.getElementById("productoNombre").value.trim();
  if (!nombre) return mostrarMensaje("Falta producto", "Escribe el nombre del producto.", "alerta");

  const repetido = productos.some((item, indice) => item.nombre.toLowerCase() === nombre.toLowerCase() && indice !== productoEditando);
  if (repetido) return mostrarMensaje("Producto repetido", "Ese producto ya existe.", "alerta");

  const similar = productoSimilar(nombre, productoEditando);
  if (similar && !permitirProductoSimilar) {
    mostrarConfirmacionProductoSimilar(similar.nombre);
    return;
  }
  permitirProductoSimilar = false;

  const datos = {
    nombre,
    fechaEntrada: document.getElementById("productoFechaEntrada").value || hoy(),
    fechaBaja: document.getElementById("productoFechaBaja").value,
    observaciones: document.getElementById("productoObservaciones").value.trim(),
    precio: Number(document.getElementById("productoPrecio").value || 0),
    stockInicial: Number(document.getElementById("productoStock").value || 0),
    bajaMovimientoId: null
  };

  if (datos.fechaEntrada && mesCerrado(datos.fechaEntrada)) return mostrarMensaje("Mes cerrado", "No puedes registrar productos en un mes cerrado.", "error");
  if (datos.fechaBaja && mesCerrado(datos.fechaBaja)) return mostrarMensaje("Mes cerrado", "No puedes dar de baja productos en un mes cerrado.", "error");

  if (productoEditando !== null) {
    const anterior = productos[productoEditando];
    datos.bajaMovimientoId = anterior.bajaMovimientoId || null;
    movimientos.forEach(mov => { if (mov.producto === anterior.nombre) mov.producto = nombre; });
    productos[productoEditando] = datos;
  } else {
    productos.push(datos);
    productoEditando = productos.findIndex(p => p.nombre === nombre);
  }

  ajustesSistema.productosEliminados = (ajustesSistema.productosEliminados || []).filter(item => item !== nombreClaveProducto(nombre));
  registrarBajaAutomatica(productoEditando);
  productoEditando = null;
  guardar();
  mostrarMensajeGuardado();
  mostrarProductos();
}

function registrarBajaAutomatica(indice) {
  const producto = productos[indice];
  if (!producto) return;
  if (producto.bajaMovimientoId) {
    movimientos = movimientos.filter(mov => mov.id !== producto.bajaMovimientoId);
    producto.bajaMovimientoId = null;
  }
  if (!producto.fechaBaja) return;

  const existencia = Math.max(0, calcularProducto(producto.nombre).inventarioFinal);
  if (existencia <= 0) return;
  const lotes = asignarLotesFIFO(producto.nombre, existencia) || [];
  const mov = movimientoBase("merma", producto.nombre, existencia, producto.fechaBaja, "Baja automática del producto");
  mov.categoria = "Baja de producto";
  mov.lotes = lotes;
  producto.bajaMovimientoId = mov.id;
  movimientos.push(mov);
}

function eliminarProducto(indice) {
  const producto = productos[indice];
  ajustesSistema.productosEliminados = Array.isArray(ajustesSistema.productosEliminados) ? ajustesSistema.productosEliminados : [];
  ajustesSistema.productosEliminados.push(nombreClaveProducto(producto.nombre));
  ajustesSistema.productosEliminados = [...new Set(ajustesSistema.productosEliminados)];
  productos.splice(indice, 1);
  movimientos = movimientos.filter(mov => mov.producto !== producto.nombre);
  guardar();
  cerrarDetalleProducto();
  mostrarMensaje("Producto eliminado", "El producto y sus movimientos fueron retirados.");
  mostrarProductos();
}

function verProducto(indice) {
  const producto = productos[indice];
  const lotes = lotesProducto(producto.nombre).map(l => `<tr><td>${l.lote}</td><td>${l.fechaEntrada || "-"}</td><td>${l.caducidad || "-"}</td><td class="numero">${l.entrada}</td><td class="numero">${l.salida}</td><td class="numero">${l.disponible}</td></tr>`).join("");
  document.getElementById("detalleProducto").innerHTML = `
    <h2>${producto.nombre}</h2>
    <p><strong>Fecha de alta:</strong> ${producto.fechaEntrada || "-"}</p>
    <p><strong>Fecha de baja:</strong> ${producto.fechaBaja || "-"}</p>
    <p><strong>Estado:</strong> ${productoDeBaja(producto, hoy()) ? "De baja" : "Activo"}</p>
    <p><strong>Observaciones:</strong> ${producto.observaciones || "-"}</p>
    <h3>Lotes</h3>
    <table class="tabla"><tr><th>Lote</th><th>Fecha entrada</th><th>Caducidad</th><th>Entrada</th><th>Salida</th><th>Disponible</th></tr>${lotes || `<tr><td colspan="6">Este producto todavia no tiene lotes de compra.</td></tr>`}</table>`;
  document.getElementById("modalProducto").style.display = "flex";
}

function cerrarDetalleProducto() {
  const modal = document.getElementById("modalProducto");
  if (modal) modal.style.display = "none";
}

function menuMovimientos(activo) {
  if (esLimitado()) {
    return `<div class="subnav">
      <button class="activo" type="button" onclick="mostrarMovimientos('ajustes')">Ajustes de reportes</button>
    </div>`;
  }
  return `<div class="subnav">
    <button class="${activo === "entrada" ? "activo" : ""}" type="button" onclick="mostrarMovimientos('entrada')">Compra / entrada</button>
    <button class="${activo === "salida" ? "activo" : ""}" type="button" onclick="mostrarMovimientos('salida')">Salida a máquina</button>
    <button class="${activo === "diversas" ? "activo" : ""}" type="button" onclick="mostrarMovimientos('diversas')">Salidas diversas</button>
    <button class="${activo === "ajustes" ? "activo" : ""}" type="button" onclick="mostrarMovimientos('ajustes')">Ajustes de reportes</button>
  </div>`;
}

function mostrarMovimientos(seccion = "entrada", productoSugerido = "") {
  if (esLimitado() && seccion !== "ajustes") seccion = "ajustes";
  productoEntradaSugerido = seccion === "entrada" ? productoSugerido : "";
  document.getElementById("contenido").innerHTML = `<h2>Movimientos</h2><p class="texto-suave">Elige una parte del movimiento para capturar sin llenar formularios innecesarios.</p>${menuMovimientos(seccion)}<div id="areaMovimiento"></div>`;
  if (seccion === "entrada") pintarEntrada();
  if (seccion === "salida") pintarSalidaMaquina();
  if (seccion === "diversas") pintarSalidasDiversas();
  if (seccion === "ajustes") pintarAjustes();
}

function pintarEntrada() {
  const sugerido = productoEntradaSugerido || "";
  document.getElementById("areaMovimiento").innerHTML = `<section class="seccion-movimiento">
    <h3>Compra / entrada</h3>
    <div class="form-grid">
      <div><label>Fecha</label><input type="date" id="entradaFecha" value="${hoy()}"></div>
      <div><label>Producto</label><input list="listaProductos" id="entradaProducto" placeholder="Escribe producto" value="${sugerido}" oninput="sugerirLoteEntrada()" onchange="sugerirLoteEntrada()">${opcionesProductos()}</div>
      <div><label>Cantidad</label><input type="number" id="entradaCantidad" min="1" placeholder="0"></div>
      <div><label>Lote</label><input id="entradaLote" placeholder="Automático"></div>
      <div><label>Fecha caducidad</label><input type="date" id="entradaCaducidad"></div>
      <div><label>Nota</label><input id="entradaNota" placeholder="Observación"></div>
      <button class="boton-pequeno" type="button" onclick="guardarEntradaRapida()">Guardar entrada</button>
    </div>${tablaHistorialPorFecha(movimientos.filter(mov => mov.tipo === "entrada"))}</section>`;
  sugerirLoteEntrada();
}

function guardarEntradaRapida() {
  const fecha = document.getElementById("entradaFecha").value;
  const producto = document.getElementById("entradaProducto").value.trim();
  const cantidad = Number(document.getElementById("entradaCantidad").value || 0);
  let lote = document.getElementById("entradaLote").value.trim();
  const caducidad = document.getElementById("entradaCaducidad").value;
  if (!puedeUsarFecha(fecha)) return;
  if (!buscarProducto(producto) || cantidad <= 0) return mostrarMensaje("Datos incompletos", "Elige un producto válido y una cantidad mayor a cero.", "alerta");
  if (!lote) lote = siguienteLoteProducto(producto);
  if (!caducidad) return mostrarMensaje("Falta caducidad", "En compras debes capturar fecha de caducidad. El lote se llena automático.", "alerta");

  const mov = movimientoBase("entrada", producto, cantidad, fecha, document.getElementById("entradaNota").value.trim());
  mov.lote = lote;
  mov.caducidad = caducidad;
  movimientos.push(mov);
  guardar();
  alertaPendienteTrasAnalizar = false;
  mostrarMensajeGuardado();
  setTimeout(() => {
    colaAlertasInventario = alertasInventarioActuales();
    mostrarSiguienteAlertaInventario();
  }, 800);
  mostrarMovimientos("entrada");
}

function pintarSalidaMaquina() {
  document.getElementById("areaMovimiento").innerHTML = `<section class="seccion-movimiento">
    <h3>Salida a máquina</h3>
    <p class="texto-suave">Captura varias espirales de una sola vez. El sistema descuenta primero los lotes más próximos a caducar.</p>
    <div class="form-grid">
      <div><label>Fecha</label><input type="date" id="salidaFecha" value="${hoy()}" onchange="pintarCapturaSalida()"></div>
      <div><label>Máquina</label><select id="salidaMaquina" onchange="pintarCapturaSalida()">${maquinasActivas().map(maquina => `<option>${maquina}</option>`).join("")}</select></div>
      <div class="campo-fotos"><label>Fotos del contenedor</label><input type="file" id="fotosSalida" accept="image/*" capture="environment" multiple onchange="previsualizarFotosSalida()"><small>Obligatorio: toma o sube al menos una foto antes de guardar.</small></div>
      <button class="boton-pequeno" type="button" onclick="guardarSalidasMaquina()">Guardar salidas</button>
    </div><div id="previewFotosSalida" class="preview-fotos"></div><div id="capturaSalidaMaquina"></div>${tablaControlesSalida(movimientos, true)}</section>`;
  pintarCapturaSalida();
}

function pintarCapturaSalida() {
  const contenedor = document.getElementById("capturaSalidaMaquina");
  if (!contenedor) return;
  const maquina = document.getElementById("salidaMaquina").value;
  const fecha = document.getElementById("salidaFecha").value || hoy();
  configuracionEspirales[maquina] = configuracionEspirales[maquina] || {};
  const bloques = espiralesPorMaquina[maquina].map((grupo, indice) => {
    const filas = grupo.map(espiral => {
      const guardado = configuracionEspirales[maquina][espiral] || "";
      const activo = guardado && buscarProducto(guardado) && productoDisponibleEnFecha(buscarProducto(guardado), fecha) ? guardado : "";
      return `<tr><td>${espiral}</td><td><input list="listaProductosSalida" class="salidaProducto" data-espiral="${espiral}" value="${activo}" placeholder="Producto"></td><td><input type="number" class="salidaCantidad" min="0" placeholder="0"></td></tr>`;
    }).join("");
    return `<div class="panel"><h3>Contenedor ${indice + 1}</h3><table class="tabla tabla-rapida"><tr><th>Espiral</th><th>Producto</th><th>Salida</th></tr>${filas}</table></div>`;
  }).join("");
  contenedor.innerHTML = `${opcionesProductos("listaProductosSalida", fecha)}<div class="contenedores-grid">${bloques}</div>${pintarContenedorAdicional()}`;
  calcularRestantesCA();
}

function pintarContenedorAdicional() {
  const filas = Array.from({ length: 8 }, () => `<tr>
    <td><input list="listaProductosSalida" class="caProducto" placeholder="Producto"></td>
    <td><input type="number" class="caSurtido" min="0" placeholder="Cantidad"></td>
  </tr>`).join("");

  return `<div class="seccion-movimiento">
    <h3>Contenedor adicional</h3>
    <p class="texto-suave">Aquí solo captura los adicionales que salieron. La repartición por máquina se cierra después en Ajustes de reportes.</p>
    <table class="tabla tabla-rapida">
      <tr><th>Producto</th><th>Cantidad</th></tr>
      ${filas}
    </table>
  </div>`;
}

function calcularRestantesCA() {
  return;
}

function previsualizarFotosSalida() {
  const input = document.getElementById("fotosSalida");
  const preview = document.getElementById("previewFotosSalida");
  if (!input || !preview) return;
  const archivos = [...input.files || []];
  preview.innerHTML = archivos.length
    ? archivos.map(archivo => `<div class="foto-chip"><span>${archivo.name}</span></div>`).join("")
    : "";
}

function leerFotosSalida() {
  const input = document.getElementById("fotosSalida");
  const archivos = [...(input?.files || [])];
  if (!archivos.length) return Promise.resolve([]);
  return Promise.all(archivos.map(archivo => new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve({ nombre: archivo.name, tipo: archivo.type, datos: lector.result });
    lector.onerror = reject;
    lector.readAsDataURL(archivo);
  })));
}

function hayCapturaSalidaPendiente() {
  return [...document.querySelectorAll(".salidaCantidad")].some(input => Number(input.value || 0) > 0);
}

function prepararMovimientoSalida(tipo, producto, cantidad, fecha, nota) {
  const prod = buscarProducto(producto);
  if (!prod || !productoDisponibleEnFecha(prod, fecha)) return null;
  const lotes = asignarLotesFIFO(producto, cantidad);
  if (!lotes) return "sin-stock";
  const mov = movimientoBase(tipo, producto, cantidad, fecha, nota);
  mov.lotes = lotes;
  return mov;
}

function guardarSalidasMaquina() {
  const fotos = document.getElementById("fotosSalida");
  if ((CONFIG.fotosSalidaObligatorias ?? true) && (!fotos || fotos.files.length === 0)) {
    return mostrarMensaje("Falta foto", "Toma o sube al menos una foto del contenedor antes de guardar.", "alerta");
  }
  confirmarAccion(
    "¿Guardar control de salida?",
    "Una vez guardado no puedes editar a menos del permiso del dueño.",
    "Guardar",
    () => guardarSalidasMaquinaConfirmada()
  );
}

async function guardarSalidasMaquinaConfirmada() {
  const fecha = document.getElementById("salidaFecha").value;
  const maquina = document.getElementById("salidaMaquina").value;
  if (!puedeUsarFecha(fecha)) return;
  const fotos = await leerFotosSalida();
  if (fotos.error) return mostrarMensaje("Faltan fotos", fotos.error, "alerta");
  if (fotosSalidaObligatorias() && fotos.length === 0) {
    return mostrarMensaje("Falta foto", "Toma o sube al menos una foto del contenedor antes de guardar.", "alerta");
  }

  configuracionEspirales[maquina] = configuracionEspirales[maquina] || {};
  const controlId = generarId();
  let guardados = 0;
  const productosSalida = [...document.querySelectorAll(".salidaProducto")];
  const cantidadesSalida = [...document.querySelectorAll(".salidaCantidad")];
  for (let i = 0; i < productosSalida.length; i++) {
    const producto = productosSalida[i].value.trim();
    const cantidad = Number(cantidadesSalida[i].value || 0);
    const espiral = productosSalida[i].dataset.espiral;
    if (producto) configuracionEspirales[maquina][espiral] = producto;
    if (!producto || cantidad <= 0) continue;

    const mov = prepararMovimientoSalida("salida", producto, cantidad, fecha, "");
    if (mov === "sin-stock") return mostrarMensaje("Sin lote suficiente", `No hay existencia suficiente por lote para ${producto}.`, "alerta");
    if (!mov) return mostrarMensaje("Producto no disponible", `${producto} está de baja o no existe.`, "alerta");
    mov.maquina = maquina;
    mov.espiral = espiral;
    mov.categoria = "Salida";
    mov.controlId = controlId;
    movimientos.push(mov);
    guardados++;
  }

  const productosCA = [...document.querySelectorAll(".caProducto")];
  const surtidos = [...document.querySelectorAll(".caSurtido")];

  for (let i = 0; i < productosCA.length; i++) {
    const producto = productosCA[i].value.trim();
    const surtido = Number(surtidos[i]?.value || 0);
    if (!producto || surtido <= 0) continue;
    if (!buscarProducto(producto)) return mostrarMensaje("Producto no encontrado", `${producto} no está registrado.`, "alerta");

    const salidaCA = prepararMovimientoSalida("salida", producto, surtido, fecha, "Contenedor adicional");
    if (salidaCA === "sin-stock") return mostrarMensaje("Sin lote suficiente", `No hay existencia suficiente por lote para ${producto}.`, "alerta");
    if (!salidaCA) return mostrarMensaje("Producto no disponible", `${producto} está de baja o no existe.`, "alerta");
    salidaCA.maquina = maquina;
    salidaCA.espiral = `CA ${i + 1}`;
    salidaCA.categoria = "Contenedor adicional";
    salidaCA.controlId = controlId;
    salidaCA.caMaq1 = 0;
    salidaCA.caMaq2 = 0;
    salidaCA.caMaq3 = 0;
    salidaCA.caInicio = maquina;
    salidaCA.caEtapa = maquina;
    salidaCA.caCerrado = false;
    movimientos.push(salidaCA);
    guardados++;
  }

  if (guardados === 0) return mostrarMensaje("Sin salidas", "Captura al menos una salida con producto válido.", "alerta");
  fotosControles[controlId] = fotos;
  guardar();
  mostrarBarraGuardado("Control guardado correctamente");
  mostrarMensaje("Salidas guardadas", `Se guardaron ${guardados} registros de ${maquina}.`);
  mostrarMovimientos("salida");
}

function pintarSalidasDiversas() {
  document.getElementById("areaMovimiento").innerHTML = `<section class="seccion-movimiento">
    <h3>Salidas diversas</h3><p class="texto-suave">Aquí van cortesías, mermas, ventas externas y salida BG.</p>
    <div class="form-grid">
      <div><label>Fecha</label><input type="date" id="diversaFecha" value="${hoy()}"></div>
      <div><label>Tipo</label><select id="diversaTipo"><option value="cortesia">Cortesía</option><option value="merma">Merma</option><option value="ventaExterna">Venta externa</option><option value="salidaBG">Salida BG</option></select></div>
      <div><label>Producto</label><input list="listaProductosDiversa" id="diversaProducto" placeholder="Producto">${opcionesProductos("listaProductosDiversa")}</div>
      <div><label>Cantidad</label><input type="number" id="diversaCantidad" min="1" placeholder="0"></div>
      <div><label>Nota</label><input id="diversaNota" placeholder="Observación"></div>
      <button class="boton-pequeno" type="button" onclick="guardarSalidaDiversa()">Guardar salida</button>
    </div>${tablaHistorialPorFecha(movimientos.filter(mov => ["cortesia", "merma", "ventaExterna", "salidaBG"].includes(mov.tipo)))}</section>`;
}

function guardarSalidaDiversa() {
  const fecha = document.getElementById("diversaFecha").value;
  const tipo = document.getElementById("diversaTipo").value;
  const producto = document.getElementById("diversaProducto").value.trim();
  const cantidad = Number(document.getElementById("diversaCantidad").value || 0);
  if (!puedeUsarFecha(fecha)) return;
  if (!buscarProducto(producto) || cantidad <= 0) return mostrarMensaje("Datos incompletos", "Elige un producto válido y una cantidad mayor a cero.", "alerta");
  const mov = prepararMovimientoSalida(tipo, producto, cantidad, fecha, document.getElementById("diversaNota").value.trim());
  if (mov === "sin-stock") return mostrarMensaje("Sin lote suficiente", `No hay existencia suficiente por lote para ${producto}.`, "alerta");
  if (!mov) return mostrarMensaje("Producto no disponible", `${producto} está de baja o no existe.`, "alerta");
  movimientos.push(mov);
  guardar();
  mostrarMensajeGuardado();
  mostrarMovimientos("diversas");
}

function agregarAdicionalesAControlPrueba(controlId) {
  const salidas = movimientos.filter(mov => String(mov.controlId || mov.id) === String(controlId) && mov.tipo === "salida");
  if (!salidas.length) return 0;
  if (salidas.some(mov => mov.categoria === "Contenedor adicional")) return 0;

  const maquina = salidas[0].maquina || "MAQ 1";
  const fecha = salidas[0].fecha || hoy();
  let creados = 0;

  for (let i = 0; i < 4; i++) {
    const elegido = elegirProductoPrueba(fecha);
    if (!elegido) break;

    const cantidad = Math.max(1, Math.min(elegido.stock, Math.floor(Math.random() * 3) + 1));
    const mov = prepararMovimientoSalida("salida", elegido.producto.nombre, cantidad, fecha, "Prueba de contenedor adicional reparada");
    if (!mov || mov === "sin-stock") continue;

    mov.maquina = maquina;
    mov.espiral = `CA ${i + 1}`;
    mov.categoria = "Contenedor adicional";
    mov.controlId = controlId;
    mov.caMaq1 = 0;
    mov.caMaq2 = 0;
    mov.caMaq3 = 0;
    mov.caInicio = maquina;
    mov.caEtapa = maquina;
    mov.caCerrado = false;
    movimientos.push(mov);
    creados++;
  }

  return creados;
}

function repararPruebasSinAdicionales() {
  const idsPrueba = [...new Set(movimientos
    .filter(mov => String(mov.controlId || "").startsWith("PRUEBA-"))
    .map(mov => mov.controlId))];
  if (!idsPrueba.length) return 0;

  let creados = 0;
  for (const id of idsPrueba) {
    creados += agregarAdicionalesAControlPrueba(id);
  }

  if (creados > 0) {
    guardar();
    mostrarBarraGuardado("Pendientes de prueba agregados a Ajustes");
  }
  return creados;
}

function pintarAjustes() {
  repararPruebasSinAdicionales();
  document.getElementById("areaMovimiento").innerHTML = `<section class="seccion-movimiento">
    <h3>Ajustes de reportes</h3><p class="texto-suave">Cantidad en positivo. Faltante y devoluciones suman; sobrante resta automáticamente.</p>
    ${tablaPendientesCA()}
    <div class="form-grid">
      <div><label>Fecha</label><input type="date" id="ajusteFecha" value="${hoy()}"></div>
      <div><label>Máquina</label><select id="ajusteMaquina" onchange="actualizarEspiralesAjuste()">${maquinasActivas().map(maquina => `<option>${maquina}</option>`).join("")}</select></div>
      <div><label>Espiral</label><select id="ajusteEspiral"></select></div>
      <div><label>Categoría</label><select id="ajusteCategoria"><option>Devolución del contenedor</option><option>Devolución de máquina</option><option>Faltante</option><option>Sobrante (colocado)</option></select></div>
      <div><label>Producto</label><input list="listaProductosAjuste" id="ajusteProducto" placeholder="Producto">${opcionesProductos("listaProductosAjuste")}</div>
      <div><label>Cantidad</label><input type="number" id="ajusteCantidad" min="1" placeholder="0"></div>
      <div><label>Lote</label><input id="ajusteLote" placeholder="Lote si suma inventario"></div>
      <div><label>Fecha caducidad</label><input type="date" id="ajusteCaducidad"></div>
      <div><label>Nota</label><input id="ajusteNota" placeholder="Observación"></div>
      <button class="boton-pequeno" type="button" onclick="guardarAjusteReporte()">Guardar ajuste</button>
    </div>${tablaHistorialPorFecha(movimientos.filter(mov => mov.tipo === "ajuste"), true)}</section>`;
  actualizarEspiralesAjuste();
}

function actualizarEspiralesAjuste() {
  const select = document.getElementById("ajusteEspiral");
  if (!select) return;
  const maquina = document.getElementById("ajusteMaquina").value;
  select.innerHTML = espiralesPorMaquina[maquina].flat().map(espiral => `<option>${espiral}</option>`).join("");
}

function guardarAjusteReporte() {
  const fecha = document.getElementById("ajusteFecha").value;
  const producto = document.getElementById("ajusteProducto").value.trim();
  const cantidad = Number(document.getElementById("ajusteCantidad").value || 0);
  if (!puedeUsarFecha(fecha)) return;
  if (!buscarProducto(producto) || cantidad <= 0) return mostrarMensaje("Datos incompletos", "Elige un producto válido y una cantidad mayor a cero.", "alerta");

  const mov = movimientoBase("ajuste", producto, cantidad, fecha, document.getElementById("ajusteNota").value.trim());
  mov.maquina = document.getElementById("ajusteMaquina").value;
  mov.espiral = document.getElementById("ajusteEspiral").value;
  mov.categoria = document.getElementById("ajusteCategoria").value;
  if (mov.categoria === "Sobrante (colocado)") {
    const lotes = asignarLotesFIFO(producto, cantidad);
    if (!lotes) return mostrarMensaje("Sin lote suficiente", `No hay existencia suficiente por lote para ${producto}.`, "alerta");
    mov.lotes = lotes;
  } else {
    const lote = document.getElementById("ajusteLote").value.trim();
    const caducidad = document.getElementById("ajusteCaducidad").value;
    if (!lote || !caducidad) return mostrarMensaje("Falta lote", "Cuando el ajuste suma inventario debes poner lote y caducidad.", "alerta");
    mov.lote = lote;
    mov.caducidad = caducidad;
  }
  movimientos.push(mov);
  guardar();
  mostrarMensajeGuardado();
  mostrarMovimientos("ajustes");
}

function controlesConCA() {
  const grupos = {};
  for (const mov of movimientos.filter(mov => mov.tipo === "salida")) {
    const id = mov.controlId || mov.id;
    grupos[id] = grupos[id] || {
      id,
      fecha: mov.fecha,
      maquina: mov.maquina || "-",
      total: 0,
      cerrado: !!(!Array.isArray(fotosControles[id]) && fotosControles[id]?.cerrado),
      tieneCA: false,
      totalSalida: 0
    };

    grupos[id].totalSalida += Number(mov.cantidad || 0);

    if (mov.categoria === "Contenedor adicional") {
      const etapa = etapaActualCA(mov);
      const pendiente = cantidadPendienteCA(mov);
      grupos[id].maquina = etapa;
      grupos[id].tieneCA = true;
      grupos[id].total += mov.caCerrado ? Number(mov.cantidad || 0) : pendiente;
      if (!mov.caCerrado) grupos[id].cerrado = false;
    }
  }

  for (const grupo of Object.values(grupos)) {
    if (!grupo.tieneCA) {
      grupo.total = grupo.totalSalida;
    }
  }
  return Object.values(grupos).sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)));
}

function etapaActualCA(mov) {
  if (mov.caEtapa && mov.caEtapa !== "CERRADO") return mov.caEtapa;
  return mov.caInicio || mov.maquina || "MAQ 1";
}

function ordenMaquinasCA(inicio = "MAQ 1") {
  const maquinas = maquinasActivas();
  const indice = maquinas.indexOf(inicio);
  if (indice < 0) return maquinas;
  return [...maquinas.slice(indice), ...maquinas.slice(0, indice)];
}

function maquinaSiguienteCA(maquina, inicio = "MAQ 1") {
  if (inicio === "MAQ 3" && maquina === "MAQ 3") return "";
  const orden = ordenMaquinasCA(inicio);
  const indice = orden.indexOf(maquina);
  if (indice < 0 || indice >= orden.length - 1) return "";
  return orden[indice + 1];
}

function cantidadPendienteCA(mov) {
  const colocado = Number(mov.caMaq1 || 0) + Number(mov.caMaq2 || 0) + Number(mov.caMaq3 || 0);
  return Math.max(0, Number(mov.cantidad || 0) - colocado);
}

function tablaPendientesCA() {
  const grupos = controlesConCA();
  const filas = grupos.map(grupo => `<tr>
    <td>${grupo.fecha}</td>
    <td>${grupo.maquina || "-"}</td>
    <td class="numero">${grupo.total}</td>
    <td>${grupo.cerrado ? '<span class="pill">Cerrado</span>' : (grupo.tieneCA ? '<span class="pill pill-baja">Pendiente</span>' : '<span class="pill pill-baja">Por cerrar</span>')}</td>
    <td><button type="button" onclick="abrirAjusteCA('${grupo.id}')">${grupo.cerrado ? "Ver" : "Abrir día"}</button></td>
  </tr>`).join("");
  return `<div class="panel">
    <h3>Surtidos pendientes</h3>
    <p class="texto-suave">Abre cualquier control para revisar espirales, cambios de producto y surtidos pendientes. Si no hubo adicionales, la sección de adicionales queda vacía.</p>
    <table class="tabla"><tr><th>Fecha</th><th>Máquina origen</th><th>Surtido</th><th>Estado</th><th>Acción</th></tr>${filas || `<tr><td colspan="5">No hay controles guardados.</td></tr>`}</table>
    <div id="detalleAjusteCA"></div>
  </div>`;
}

function abrirAjusteCA(controlId) {
  const salidasDelDia = movimientos.filter(mov => String(mov.controlId || mov.id) === String(controlId) && mov.tipo === "salida");
  const adicionales = salidasDelDia.filter(mov => mov.categoria === "Contenedor adicional");
  const etapa = etapaActualCA(adicionales.find(mov => !mov.caCerrado) || adicionales[0] || salidasDelDia[0] || {});
  const fechaControl = adicionales[0]?.fecha || salidasDelDia[0]?.fecha || "";
  const salidasNormales = salidasDelDia.filter(mov => mov.categoria !== "Contenedor adicional");
  const maquinaOrigen = salidasNormales[0]?.maquina || salidasDelDia[0]?.maquina || etapa;
  const gruposOrigen = espiralesPorMaquina[maquinaOrigen] || [];
  const tablaContenedorPendiente = movimientosGrupo => {
    const filas = movimientosGrupo
      .slice()
      .sort((a, b) => Number.parseInt(a.espiral, 10) - Number.parseInt(b.espiral, 10))
      .map(mov => `<tr>
        <td class="espiral-grande">${mov.espiral || "-"}</td>
        <td>${mov.producto}</td>
        <td class="numero cantidad-grande">${mov.cantidad}</td>
      </tr>`).join("");
    return `<table class="tabla tabla-surtido-pendiente tabla-contenedor-pendiente"><tr><th>Espiral</th><th>Producto</th><th>Cantidad</th></tr>${filas || `<tr><td colspan="3">Sin productos surtidos.</td></tr>`}</table>`;
  };
  const contenedoresNormales = gruposOrigen.map((espirales, indice) => {
    const conjunto = new Set(espirales.map(String));
    const movimientosGrupo = salidasNormales.filter(mov => conjunto.has(String(mov.espiral)));
    return `<section class="surtido-contenedor-card">
      <div class="surtido-contenedor-card-titulo"><span>${indice + 1}</span><h4>Contenedor ${indice + 1}</h4><strong>${movimientosGrupo.length} productos</strong></div>
      <div class="tabla-scroll">${tablaContenedorPendiente(movimientosGrupo)}</div>
    </section>`;
  }).join("");

  const registroFotos = fotosControles[controlId] || {};
  const cambios = Array.isArray(registroFotos) ? [] : (registroFotos.cambiosPrecio || []);
  const filasCambios = cambios.map(item => `<tr>
    <td>${item.espiral || "-"}</td>
    <td>${item.anterior || "-"}</td>
    <td>${item.nuevo || "-"}</td>
  </tr>`).join("");

  const filasAdicionales = adicionales.map(mov => {
    const colocado = Number(mov.caMaq1 || 0) + Number(mov.caMaq2 || 0) + Number(mov.caMaq3 || 0);
    const restante = Math.max(0, Number(mov.cantidad || 0) - colocado);
    const bloqueadoMaq1 = mov.caCerrado || etapa !== "MAQ 1" ? "disabled" : "";
    const bloqueadoMaq2 = mov.caCerrado || etapa !== "MAQ 2" ? "disabled" : "";
    const bloqueadoMaq3 = mov.caCerrado || etapa !== "MAQ 3" ? "disabled" : "";
    return `<tr data-id="${mov.id}">
      <td>${mov.espiral || "CA"}</td>
      <td>${mov.producto}</td>
      <td class="numero">${mov.cantidad}</td>
      <td><input ${bloqueadoMaq1} type="number" class="caAjusteMaq1" min="0" value="${mov.caMaq1 || 0}" oninput="calcularAjusteRestanteCA()"></td>
      <td><input ${bloqueadoMaq2} type="number" class="caAjusteMaq2" min="0" value="${mov.caMaq2 || 0}" oninput="calcularAjusteRestanteCA()"></td>
      <td><input ${bloqueadoMaq3} type="number" class="caAjusteMaq3" min="0" value="${mov.caMaq3 || 0}" oninput="calcularAjusteRestanteCA()"></td>
      <td class="numero caAjusteRestante">${restante}</td>
    </tr>`;
  }).join("");

  const infoControl = Array.isArray(registroFotos) ? {} : registroFotos;
  const cerradoSinAdicionales = adicionales.length === 0 && !!infoControl.cerrado;
  const cerrado = adicionales.length > 0 ? adicionales.every(mov => mov.caCerrado) : cerradoSinAdicionales;
  document.getElementById("detalleAjusteCA").innerHTML = `<div class="seccion-movimiento surtido-pendiente-detalle">
    <div class="surtido-pendiente-encabezado"><span>Control pendiente</span><h2>${etapa}</h2><strong>${fechaControl}</strong></div>
    <section class="surtido-bloque surtido-bloque-salida"><h3>Salida guardada ${etapa}</h3>
    <p class="texto-suave">Estos espirales solo se pueden ver. Para corregirlos usa Editar en Salida a máquina.</p>
    <div class="surtido-contenedores-grid">${contenedoresNormales || `<p class="texto-suave">No hay salidas de espirales normales en este control.</p>`}</div></section>

    <section class="surtido-bloque surtido-bloque-cambios"><h3>Cambios contra el surtido anterior</h3>
    <p class="texto-suave">Si cambió el producto de una espiral, aquí aparece para revisar el precio en la máquina.</p>
    <div class="tabla-scroll"><table class="tabla tabla-surtido-pendiente"><tr><th>Espiral</th><th>Antes</th><th>Ahora</th></tr>${filasCambios || `<tr><td colspan="3">No hubo cambios de producto contra el surtido anterior.</td></tr>`}</table></div></section>

    <section class="surtido-bloque surtido-bloque-adicional"><h3>Surtidos pendientes ${cerrado ? "" : `- ${etapa}`}</h3>
    <p class="texto-suave">Solo se edita la máquina pendiente. Si queda restante pasa a la siguiente máquina del recorrido; al cerrar la última se devuelve al inventario.</p>
    <div class="tabla-scroll"><table class="tabla tabla-surtido-pendiente tabla-surtido-adicional"><tr><th>Espiral</th><th>Producto</th><th>Surtido</th><th>MAQ 1</th><th>MAQ 2</th><th>MAQ 3</th><th>Restante devolver</th></tr>${filasAdicionales || `<tr><td colspan="7">No hay productos adicionales en este control.</td></tr>`}</table></div>
    ${adicionales.length
      ? (cerrado ? `<button class="boton-pequeno" type="button" onclick="editarAjusteCA('${controlId}')">Editar adicionales</button>` : `<button class="boton-pequeno" type="button" onclick="cerrarAjusteCA('${controlId}')">Cerrar ${etapa}</button>`)
      : (cerradoSinAdicionales ? `<span class="pill">Control cerrado</span>` : `<button class="boton-pequeno" type="button" onclick="cerrarControlSinAdicionales('${controlId}')">Cerrar ${etapa}</button>`)}
    </section>
  </div>`;
}

async function cerrarControlSinAdicionales(controlId) {
  const salidas = movimientos.filter(mov => String(mov.controlId || mov.id) === String(controlId) && mov.tipo === "salida");
  if (!salidas.length) return mostrarMensaje("Control no encontrado", "No se encontró el surtido que intentas cerrar.", "error");

  const maquina = salidas[0].maquina || "Máquina";
  const anterior = fotosControles[controlId];
  const info = Array.isArray(anterior) ? { fotos: anterior } : { ...(anterior || {}) };
  info.cerrado = true;
  info.cerradoEn = new Date().toISOString();
  info.maquina = info.maquina || maquina;
  info.fecha = info.fecha || salidas[0].fecha || hoy();
  fotosControles[controlId] = info;

  guardar();
  clearTimeout(timerSyncSupabase);
  const guardadoNube = await guardarEstadoSupabase();
  mostrarMovimientos("ajustes");
  mostrarRevisionMaquinaCerrada(controlId, maquina);
  if (guardadoNube) {
    mostrarBarraGuardado(`${maquina} cerrada en este equipo y en la nube`);
  } else {
    mostrarMensaje("Máquina cerrada en este equipo", "El cierre está protegido localmente y queda pendiente de sincronizar con la nube.", "alerta");
  }
}

function calcularAjusteRestanteCA() {
  document.querySelectorAll("#detalleAjusteCA tr[data-id]").forEach(fila => {
    const id = Number(fila.dataset.id);
    const mov = movimientos.find(item => item.id === id);
    const colocado = Number(fila.querySelector(".caAjusteMaq1").value || 0) + Number(fila.querySelector(".caAjusteMaq2").value || 0) + Number(fila.querySelector(".caAjusteMaq3").value || 0);
    fila.querySelector(".caAjusteRestante").textContent = Math.max(0, Number(mov?.cantidad || 0) - colocado);
  });
}

function cerrarAjusteCA(controlId) {
  const filas = [...document.querySelectorAll("#detalleAjusteCA tr[data-id]")];
  if (!filas.length) return;
  let siguientePendiente = "";
  let maquinaCerrada = "";
  movimientos = movimientos.filter(mov => !(String(mov.controlId) === String(controlId) && mov.tipo === "ajuste" && ["Devolucion CA", "Devolución CA"].includes(mov.categoria)));
  for (const fila of filas) {
    const mov = movimientos.find(item => item.id === Number(fila.dataset.id));
    if (!mov) continue;
    const etapa = etapaActualCA(mov);
    maquinaCerrada = etapa;
    const inicio = mov.caInicio || mov.maquina || "MAQ 1";
    const siguiente = maquinaSiguienteCA(etapa, inicio);
    const maq1 = Number(fila.querySelector(".caAjusteMaq1").value || 0);
    const maq2 = Number(fila.querySelector(".caAjusteMaq2").value || 0);
    const maq3 = Number(fila.querySelector(".caAjusteMaq3").value || 0);
    const colocado = maq1 + maq2 + maq3;
    if (colocado > Number(mov.cantidad || 0)) return mostrarMensaje("Revisa cantidades", `En ${mov.producto} colocaste más de lo surtido.`, "alerta");
    mov.caMaq1 = maq1;
    mov.caMaq2 = maq2;
    mov.caMaq3 = maq3;
    const restante = Number(mov.cantidad || 0) - colocado;

    if (siguiente) {
      mov.caEtapa = siguiente;
      mov.caCerrado = false;
      siguientePendiente = siguiente;
      continue;
    }

    mov.caEtapa = "CERRADO";
    mov.caCerrado = true;

    if (restante > 0 && !siguiente) {
      const devolucion = movimientoBase("ajuste", mov.producto, restante, mov.fecha, "Devolucion contenedor adicional");
      devolucion.maquina = mov.maquina;
      devolucion.espiral = mov.espiral;
      devolucion.categoria = "Devolucion CA";
      devolucion.controlId = mov.controlId;
      devolucion.lotes = tomarLotesDeAsignacion(mov.lotes, restante);
      movimientos.push(devolucion);
    }
  }
  guardar();
  mostrarMensaje("Máquina cerrada", "Si quedó restante, pasó a la siguiente máquina del recorrido. Si era la última, se devolvió al inventario.");
  mostrarMovimientos("ajustes");
  if (siguientePendiente) {
    abrirAjusteCA(controlId);
    mostrarMensaje(`Abriendo ${siguientePendiente}`, "Continúa con los surtidos pendientes de la siguiente máquina.");
  }
  mostrarRevisionMaquinaCerrada(controlId, maquinaCerrada);
}

function editarAjusteCA(controlId) {
  movimientos = movimientos.filter(mov => !(String(mov.controlId) === String(controlId) && mov.tipo === "ajuste" && ["Devolucion CA", "Devolución CA"].includes(mov.categoria)));
  movimientos.forEach(mov => {
    if (String(mov.controlId || mov.id) === String(controlId) && mov.tipo === "salida" && mov.categoria === "Contenedor adicional") {
      mov.caEtapa = mov.caInicio || mov.maquina || "MAQ 1";
      mov.caCerrado = false;
    }
  });
  guardar();
  pintarAjustes();
  abrirAjusteCA(controlId);
  mostrarMensaje("Editando adicionales", "Haz los cambios y vuelve a cerrar la máquina.");
}

function botonesHistorial(id) {
  return `<button type="button" onclick="editarMovimiento(${id})">Editar</button><button class="boton-peligro" type="button" onclick="eliminarMovimiento(${id})">Eliminar</button>`;
}

function detalleLotes(mov) {
  if (mov.tipo === "entrada") return mov.lote ? `${mov.lote} / ${mov.caducidad || "-"}` : "-";
  if (!mov.lotes?.length) return "-";
  return mov.lotes.map(l => `${l.lote}: ${l.cantidad}`).join(", ");
}

function tablaHistorial(lista, columnasExtra = false) {
  const filas = lista.slice().reverse().map(mov => `<tr><td>${mov.fecha || "-"}</td><td>${nombreTipo(mov.tipo)}</td><td>${mov.producto}</td><td class="numero">${mov.cantidad}</td><td>${detalleLotes(mov)}</td>${columnasExtra ? `<td>${mov.maquina || "-"}</td><td>${mov.espiral || "-"}</td><td>${mov.categoria || "-"}</td>` : ""}<td>${mov.nota || "-"}</td><td>${botonesHistorial(mov.id)}</td></tr>`).join("");
  return `<table class="tabla"><tr><th>Fecha</th><th>Tipo</th><th>Producto</th><th>Cantidad</th><th>Lote</th>${columnasExtra ? "<th>Máquina</th><th>Espiral</th><th>Categoría</th>" : ""}<th>Nota</th><th>Acción</th></tr>${filas || `<tr><td colspan="${columnasExtra ? 10 : 7}">Sin registros.</td></tr>`}</table>`;
}

function tablaHistorialReporte(lista, columnasExtra = false) {
  const filas = lista.slice().reverse().map(mov => `<tr><td>${mov.fecha || "-"}</td><td>${nombreTipo(mov.tipo)}</td><td>${mov.producto}</td><td class="numero">${mov.cantidad}</td><td>${detalleLotes(mov)}</td>${columnasExtra ? `<td>${mov.maquina || "-"}</td><td>${mov.espiral || "-"}</td><td>${mov.categoria || "-"}</td>` : ""}<td>${mov.nota || "-"}</td></tr>`).join("");
  return `<table class="tabla"><tr><th>Fecha</th><th>Tipo</th><th>Producto</th><th>Cantidad</th><th>Lote</th>${columnasExtra ? "<th>Máquina</th><th>Espiral</th><th>Categoría</th>" : ""}<th>Nota</th></tr>${filas || `<tr><td colspan="${columnasExtra ? 9 : 6}">Sin registros.</td></tr>`}</table>`;
}

function controlesSalida(lista) {
  const salidas = lista.filter(mov => mov.tipo === "salida");
  const grupos = {};
  for (const mov of salidas) {
    const id = mov.controlId || mov.id;
    grupos[id] = grupos[id] || { id, fecha: mov.fecha, total: 0, maquinas: new Set(), registros: 0, ca: 0 };
    grupos[id].total += Number(mov.cantidad || 0);
    grupos[id].registros += 1;
    if (mov.maquina) grupos[id].maquinas.add(mov.maquina);
    if (mov.espiral === "CA" || mov.categoria === "Contenedor adicional") grupos[id].ca += Number(mov.cantidad || 0);
  }
  const controles = Object.values(grupos).sort((a, b) => {
    const porFecha = String(a.fecha).localeCompare(String(b.fecha));
    return porFecha || Number(a.id) - Number(b.id);
  });
  const consecutivos = {};
  for (const control of controles) {
    const maquina = [...control.maquinas].join(", ") || "Sin máquina";
    const clave = `${control.fecha}|${maquina}`;
    consecutivos[clave] = (consecutivos[clave] || 0) + 1;
    control.numeroDia = consecutivos[clave];
    control.etiqueta = `Salida ${control.numeroDia}`;
  }
  return controles.reverse();
}

function tablaControlesSalida(lista = movimientos, editable = true) {
  const filas = controlesSalida(lista).map(control => `<tr>
    <td>${control.fecha || "-"}</td>
    <td>${[...control.maquinas].join(", ") || "-"}<br><small>${control.etiqueta}</small></td>
    <td class="numero">${control.total}</td>
    <td class="numero">${control.ca}</td>
    <td class="numero">${control.registros}</td>
    <td><button type="button" onclick="verControlSalida('${control.id}')">Ver</button>${editable ? `<button type="button" onclick="editarControlSalida('${control.id}')">Editar</button><button class="boton-peligro" type="button" onclick="eliminarControlSalida('${control.id}')">Eliminar</button>` : ""}</td>
  </tr>`).join("");
  return `<table class="tabla"><tr><th>Fecha</th><th>Máquina</th><th>Total salida</th><th>Contenedor adicional</th><th>Registros</th><th>Acción</th></tr>${filas || `<tr><td colspan="6">Sin controles guardados.</td></tr>`}</table>`;
}

function verControlSalida(controlId) {
  const lista = movimientos.filter(mov => String(mov.controlId || mov.id) === String(controlId));
  const salidas = lista.filter(mov => mov.tipo === "salida");
  const filas = salidas.map(mov => `<tr><td>${mov.espiral || "-"}</td><td>${mov.producto}</td><td class="numero">${mov.cantidad}</td></tr>`).join("");
  const fotos = fotosControles[controlId] || [];
  const galeria = fotos.map(foto => `<img src="${foto.datos}" alt="${foto.nombre || "Foto del contenedor"}">`).join("");
  document.getElementById("detalleProducto").innerHTML = `
    <h2>Control de salida</h2>
    <p class="texto-suave">${salidas[0]?.fecha || ""} ${salidas[0]?.maquina || ""}</p>
    <div class="galeria-fotos">${galeria || "<p class='texto-suave'>Este control no tiene fotos guardadas.</p>"}</div>
    <table class="tabla"><tr><th>Espiral</th><th>Producto</th><th>Cantidad</th></tr>${filas || `<tr><td colspan="3">Sin salidas.</td></tr>`}</table>`;
  document.getElementById("modalProducto").style.display = "flex";
}

function catalogoCodigosBarras() {
  ajustesSistema.catalogoCodigos = Array.isArray(ajustesSistema.catalogoCodigos) ? ajustesSistema.catalogoCodigos : [];
  return ajustesSistema.catalogoCodigos;
}

function buscarCodigoBarras(codigo) {
  const limpio = String(codigo || "").replace(/\s+/g, "");
  return catalogoCodigosBarras().find(item => item.activo !== false && String(item.codigo) === limpio);
}

function opcionesSelectProductos(fecha = hoy()) {
  return productosDisponibles(fecha).map(producto => `<option value="${producto.nombre}">${producto.nombre}</option>`).join("");
}

function mostrarEscanerCompras() {
  if (bloquearSiLimitado("escanear")) return;
  detenerCamaraEscaner();
  vistaActual = { nombre: "escanear", args: [] };
  document.getElementById("contenido").innerHTML = `
    <section class="escaner-compras-pagina">
      <header class="escaner-cabecera">
        <div><span>Entrada rápida</span><h2>Escanear compra</h2><p>Escanea una pieza, paquete o caja. Podrás revisar todo antes de afectar el inventario.</p></div>
        <button class="boton-escanear-principal" type="button" onclick="iniciarCamaraEscaner()">Escanear código</button>
      </header>

      <div class="lector-codigo" id="lectorCodigo" hidden>
        <video id="videoEscaner" playsinline muted></video>
        <div class="marco-escaner"><span></span></div>
        <p id="estadoEscaner">Apunta la cámara al código de barras.</p>
        <button class="boton-secundario" type="button" onclick="detenerCamaraEscaner()">Cerrar cámara</button>
      </div>

      <div class="codigo-manual">
        <label for="codigoManualEscaner">También puedes escribir el código</label>
        <div><input id="codigoManualEscaner" inputmode="numeric" autocomplete="off" placeholder="Número debajo del código"><button type="button" onclick="procesarCodigoManual()">Buscar</button></div>
      </div>

      <div id="resultadoCodigoEscaner"></div>

      <section class="lista-compra-provisional">
        <div class="lista-provisional-titulo"><div><span>Antes de guardar</span><h3>Lista provisional</h3></div><strong id="totalPiezasEscaneadas">0 piezas</strong></div>
        <div id="filasCompraEscaneada"></div>
        <button class="guardar-compra-completa" type="button" onclick="guardarCompraEscaneadaCompleta()">Guardar compra completa</button>
      </section>
    </section>`;
  pintarCompraEscaneadaProvisional();
}

async function iniciarCamaraEscaner() {
  if (!navigator.mediaDevices?.getUserMedia) {
    return mostrarMensaje("Cámara no disponible", "Usa el campo para escribir el código manualmente.", "alerta");
  }
  if (!("BarcodeDetector" in window)) {
    return mostrarMensaje("Lector no compatible", "Este navegador permite escribir el código manualmente. Prueba también Chrome actualizado en Android.", "alerta");
  }
  try {
    detenerCamaraEscaner();
    const lector = document.getElementById("lectorCodigo");
    lector.hidden = false;
    camaraEscanerStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
    const video = document.getElementById("videoEscaner");
    video.srcObject = camaraEscanerStream;
    await video.play();
    detectorCodigoBarras = detectorCodigoBarras || new BarcodeDetector({ formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128"] });
    escanerCodigoActivo = true;
    detectarCodigoEnVideo();
  } catch (error) {
    detenerCamaraEscaner();
    mostrarMensaje("No se pudo abrir la cámara", "Concede permiso a la cámara o escribe el código manualmente.", "alerta");
  }
}

async function detectarCodigoEnVideo() {
  if (!escanerCodigoActivo || !detectorCodigoBarras) return;
  const video = document.getElementById("videoEscaner");
  if (!video) return detenerCamaraEscaner();
  try {
    const codigos = await detectorCodigoBarras.detect(video);
    const codigo = codigos[0]?.rawValue;
    if (codigo) {
      const ahora = Date.now();
      if (ultimoCodigoEscaneado.codigo !== codigo || ahora - ultimoCodigoEscaneado.momento > 1800) {
        ultimoCodigoEscaneado = { codigo, momento: ahora };
        detenerCamaraEscaner();
        procesarCodigoBarras(codigo);
        return;
      }
    }
  } catch (error) {
    const estado = document.getElementById("estadoEscaner");
    if (estado) estado.textContent = "Buscando código...";
  }
  if (escanerCodigoActivo) requestAnimationFrame(detectarCodigoEnVideo);
}

function detenerCamaraEscaner() {
  escanerCodigoActivo = false;
  if (camaraEscanerStream) camaraEscanerStream.getTracks().forEach(track => track.stop());
  camaraEscanerStream = null;
  const video = document.getElementById("videoEscaner");
  if (video) video.srcObject = null;
  const lector = document.getElementById("lectorCodigo");
  if (lector) lector.hidden = true;
}

function procesarCodigoManual() {
  const campo = document.getElementById("codigoManualEscaner");
  const codigo = String(campo?.value || "").replace(/\s+/g, "");
  if (!codigo) return mostrarMensaje("Falta el código", "Escribe el número que aparece debajo del código de barras.", "alerta");
  procesarCodigoBarras(codigo);
  campo.value = "";
}

function procesarCodigoBarras(codigo) {
  const registro = buscarCodigoBarras(codigo);
  if (!registro) return mostrarAltaCodigoBarras(codigo);
  agregarCodigoACompra(registro);
  document.getElementById("resultadoCodigoEscaner").innerHTML = `<div class="codigo-reconocido"><span>Código reconocido</span><strong>${registro.producto}</strong><p>${registro.presentacion} · ${registro.piezas} pieza${Number(registro.piezas) === 1 ? "" : "s"} por escaneo</p></div>`;
}

function mostrarAltaCodigoBarras(codigo) {
  document.getElementById("resultadoCodigoEscaner").innerHTML = `<section class="alta-codigo-card">
    <span class="estado-codigo-nuevo">Código nuevo</span><h3>${codigo}</h3>
    <p>Regístralo una sola vez. Los próximos escaneos lo reconocerán automáticamente.</p>
    <div class="form-grid">
      <div><label>Producto</label><select id="catalogoProducto"><option value="">Selecciona</option>${opcionesSelectProductos()}</select></div>
      <div><label>Presentación</label><select id="catalogoPresentacion"><option>Pieza</option><option>Paquete</option><option>Caja</option></select></div>
      <div><label>Piezas que contiene</label><input id="catalogoPiezas" type="number" min="1" value="1"></div>
      <button class="boton-pequeno" type="button" onclick="guardarCodigoCatalogo('${codigo}')">Registrar y agregar</button>
    </div>
  </section>`;
}

function guardarCodigoCatalogo(codigo) {
  const producto = document.getElementById("catalogoProducto")?.value || "";
  const presentacion = document.getElementById("catalogoPresentacion")?.value || "Pieza";
  const piezas = Number(document.getElementById("catalogoPiezas")?.value || 0);
  if (!buscarProducto(producto) || piezas <= 0) return mostrarMensaje("Datos incompletos", "Selecciona un producto y una cantidad de piezas válida.", "alerta");
  const registro = { codigo: String(codigo), producto, presentacion, piezas, activo: true };
  catalogoCodigosBarras().push(registro);
  guardar();
  agregarCodigoACompra(registro);
  document.getElementById("resultadoCodigoEscaner").innerHTML = `<div class="codigo-reconocido"><span>Código registrado</span><strong>${producto}</strong><p>${presentacion} · ${piezas} piezas</p></div>`;
}

function agregarCodigoACompra(registro) {
  const existente = compraEscaneadaProvisional.find(item => item.codigo === registro.codigo && item.producto === registro.producto && !item.caducidad);
  if (existente) {
    existente.presentaciones += 1;
    existente.cantidad += Number(registro.piezas || 1);
  } else {
    compraEscaneadaProvisional.push({
      id: generarId(), codigo: registro.codigo, producto: registro.producto,
      presentacion: registro.presentacion, piezasPresentacion: Number(registro.piezas || 1),
      presentaciones: 1, cantidad: Number(registro.piezas || 1), lote: siguienteLoteProducto(registro.producto), caducidad: ""
    });
  }
  pintarCompraEscaneadaProvisional();
  mostrarBarraGuardado(`${registro.producto} agregado a la lista`);
}

function pintarCompraEscaneadaProvisional() {
  const contenedor = document.getElementById("filasCompraEscaneada");
  if (!contenedor) return;
  const filas = compraEscaneadaProvisional.map((item, indice) => `<article class="compra-escaneada-item">
    <div class="compra-escaneada-producto"><span>${item.presentacion} · ${item.presentaciones} escaneo${item.presentaciones === 1 ? "" : "s"}</span><h4>${item.producto}</h4><small>${item.codigo}</small></div>
    <label>Lote<input value="${item.lote}" onchange="actualizarCompraEscaneada(${indice}, 'lote', this.value)"></label>
    <label>Caducidad<input type="date" value="${item.caducidad}" onchange="actualizarCompraEscaneada(${indice}, 'caducidad', this.value)"></label>
    <label>Cuántas piezas<input type="number" min="1" value="${item.cantidad}" onchange="actualizarCompraEscaneada(${indice}, 'cantidad', this.value)"></label>
    <div class="compra-item-acciones"><button type="button" title="Sumar otra presentación" onclick="sumarPresentacionEscaneada(${indice})">+</button><button type="button" title="Restar una presentación" onclick="restarPresentacionEscaneada(${indice})">−</button><button class="boton-peligro" type="button" onclick="eliminarCompraEscaneada(${indice})">Eliminar</button></div>
  </article>`).join("");
  contenedor.innerHTML = filas || `<div class="lista-provisional-vacia"><strong>Aún no hay productos</strong><p>Escanea un código para comenzar.</p></div>`;
  const total = compraEscaneadaProvisional.reduce((suma, item) => suma + Number(item.cantidad || 0), 0);
  const indicador = document.getElementById("totalPiezasEscaneadas");
  if (indicador) indicador.textContent = `${total} pieza${total === 1 ? "" : "s"}`;
}

function actualizarCompraEscaneada(indice, campo, valor) {
  const item = compraEscaneadaProvisional[indice];
  if (!item) return;
  item[campo] = campo === "cantidad" ? Math.max(1, Number(valor || 1)) : valor;
  if (campo === "cantidad") pintarCompraEscaneadaProvisional();
}

function sumarPresentacionEscaneada(indice) {
  const item = compraEscaneadaProvisional[indice];
  if (!item) return;
  item.presentaciones += 1;
  item.cantidad += item.piezasPresentacion;
  pintarCompraEscaneadaProvisional();
}

function restarPresentacionEscaneada(indice) {
  const item = compraEscaneadaProvisional[indice];
  if (!item) return;
  if (item.presentaciones <= 1) return eliminarCompraEscaneada(indice);
  item.presentaciones -= 1;
  item.cantidad = Math.max(1, item.cantidad - item.piezasPresentacion);
  pintarCompraEscaneadaProvisional();
}

function eliminarCompraEscaneada(indice) {
  compraEscaneadaProvisional.splice(indice, 1);
  pintarCompraEscaneadaProvisional();
}

async function guardarCompraEscaneadaCompleta() {
  if (!compraEscaneadaProvisional.length) return mostrarMensaje("Lista vacía", "Escanea al menos un producto.", "alerta");
  const invalido = compraEscaneadaProvisional.find(item => !buscarProducto(item.producto) || !item.lote || !item.caducidad || Number(item.cantidad) <= 0);
  if (invalido) return mostrarMensaje("Faltan datos", `Revisa lote, caducidad y cantidad de ${invalido.producto}. No se guardó ninguna entrada.`, "alerta");
  if (!puedeUsarFecha(hoy())) return;
  const nuevos = compraEscaneadaProvisional.map(item => {
    const mov = movimientoBase("entrada", item.producto, item.cantidad, hoy(), `Escáner: ${item.presentaciones} ${item.presentacion.toLowerCase()}${item.presentaciones === 1 ? "" : "s"}`);
    mov.lote = item.lote;
    mov.caducidad = item.caducidad;
    return mov;
  });
  movimientos.push(...nuevos);
  guardar();
  clearTimeout(timerSyncSupabase);
  const guardadoNube = await guardarEstadoSupabase();
  compraEscaneadaProvisional = [];
  pintarCompraEscaneadaProvisional();
  if (guardadoNube) mostrarMensaje("Compra guardada", "Todas las entradas quedaron registradas en este equipo y en la nube.");
  else mostrarMensaje("Compra protegida en este equipo", "Las entradas se guardaron localmente y quedan pendientes de sincronizar.", "alerta");
}

function editarControlSalida(controlId) {
  pedirCodigoDueno(
    "Permiso para editar",
    "Escribe el código del dueño para modificar este control de salida.",
    () => editarControlSalidaAutorizado(controlId)
  );
}

function editarControlSalidaAutorizado(controlId) {
  if (hayCapturaSalidaPendiente()) return mostrarMensaje("Cambios sin guardar", "Guarda o limpia la salida antes de editar otro control.", "alerta");
  const lista = movimientos.filter(mov => String(mov.controlId || mov.id) === String(controlId));
  const salidas = lista.filter(mov => mov.tipo === "salida");
  if (!salidas.length) return;
  const fecha = salidas[0].fecha || hoy();
  const maquina = salidas[0].maquina || "MAQ 1";
  const infoAnterior = fotosControles[controlId] || {};
  controlSalidaEditando = { controlId: String(controlId), info: infoAnterior };
  mostrarMovimientos("salida");
  document.getElementById("salidaFecha").value = fecha;
  document.getElementById("salidaMaquina").value = maquina;
  pintarCapturaSalida();
  const normales = salidas.filter(mov => mov.categoria !== "Contenedor adicional");
  normales.forEach(mov => {
    const input = [...document.querySelectorAll(".salidaProducto")].find(item => item.dataset.espiral === String(mov.espiral));
    if (!input) return;
    input.value = mov.producto;
    input.closest("tr").querySelector(".salidaCantidad").value = mov.cantidad;
  });
  const adicionales = salidas.filter(mov => mov.categoria === "Contenedor adicional");
  adicionales.forEach((mov, i) => {
    const producto = document.querySelectorAll(".caProducto")[i];
    const surtido = document.querySelectorAll(".caSurtido")[i];
    if (producto) producto.value = mov.producto;
    if (surtido) surtido.value = mov.cantidad;
  });
  const observaciones = Array.isArray(infoAnterior) ? "" : (infoAnterior.observaciones || "");
  if (observaciones) {
    const panel = document.getElementById("observacionesSalidaPanel");
    const campo = document.getElementById("salidaObservaciones");
    if (panel) panel.hidden = false;
    if (campo) campo.value = observaciones;
  }
  mostrarMensaje("Editando control", "El control original está protegido. Haz los cambios y vuelve a guardar.");
}

function eliminarControlSalida(controlId) {
  movimientos = movimientos.filter(mov => String(mov.controlId || mov.id) !== String(controlId));
  delete fotosControles[controlId];
  guardar();
  mostrarMensaje("Control eliminado", "Se retiró el control de salida completo.");
  mostrarMovimientos("salida");
}

function tablaHistorialPorFecha(lista, columnasExtra = false) {
  const dias = [...new Set(lista.map(mov => mov.fecha || "Sin fecha"))].sort().reverse();
  if (dias.length === 0) return tablaHistorial([], columnasExtra);
  return dias.map(dia => `<h3>${dia}</h3>${tablaHistorial(lista.filter(mov => (mov.fecha || "Sin fecha") === dia), columnasExtra)}`).join("");
}

function editarMovimiento(id) {
  if (hayCapturaSalidaPendiente()) return mostrarMensaje("Cambios sin guardar", "Guarda o limpia la salida antes de editar otro registro.", "alerta");
  const mov = movimientos.find(item => item.id === id);
  if (!mov) return;
  movimientos = movimientos.filter(item => item.id !== id);
  guardar();

  if (mov.tipo === "entrada") {
    mostrarMovimientos("entrada");
    document.getElementById("entradaFecha").value = mov.fecha || "";
    document.getElementById("entradaProducto").value = mov.producto;
    document.getElementById("entradaCantidad").value = mov.cantidad;
    document.getElementById("entradaLote").value = mov.lote || "";
    document.getElementById("entradaCaducidad").value = mov.caducidad || "";
    document.getElementById("entradaNota").value = mov.nota || "";
  }
  if (mov.tipo === "salida") {
    mostrarMovimientos("salida");
    document.getElementById("salidaFecha").value = mov.fecha || "";
    document.getElementById("salidaMaquina").value = mov.maquina || "MAQ 1";
    pintarCapturaSalida();
    const fila = [...document.querySelectorAll(".salidaProducto")].find(input => input.dataset.espiral === String(mov.espiral));
    if (fila) {
      fila.value = mov.producto;
      fila.closest("tr").querySelector(".salidaCantidad").value = mov.cantidad;
    }
  }
  if (["cortesia", "merma", "ventaExterna", "salidaBG"].includes(mov.tipo)) {
    mostrarMovimientos("diversas");
    document.getElementById("diversaFecha").value = mov.fecha || "";
    document.getElementById("diversaTipo").value = mov.tipo;
    document.getElementById("diversaProducto").value = mov.producto;
    document.getElementById("diversaCantidad").value = mov.cantidad;
    document.getElementById("diversaNota").value = mov.nota || "";
  }
  if (mov.tipo === "ajuste") {
    mostrarMovimientos("ajustes");
    document.getElementById("ajusteFecha").value = mov.fecha || "";
    document.getElementById("ajusteMaquina").value = mov.maquina || "MAQ 1";
    actualizarEspiralesAjuste();
    document.getElementById("ajusteEspiral").value = mov.espiral || "";
    document.getElementById("ajusteCategoria").value = mov.categoria || "Faltante";
    document.getElementById("ajusteProducto").value = mov.producto;
    document.getElementById("ajusteCantidad").value = mov.cantidad;
    document.getElementById("ajusteLote").value = mov.lote || "";
    document.getElementById("ajusteCaducidad").value = mov.caducidad || "";
    document.getElementById("ajusteNota").value = mov.nota || "";
  }
  mostrarMensaje("Editando registro", "Haz los cambios y presiona guardar.");
}

function eliminarMovimiento(id) {
  movimientos = movimientos.filter(mov => mov.id !== id);
  guardar();
  mostrarMensaje("Movimiento eliminado", "El registro fue retirado.");
  mostrarMovimientos("entrada");
}

function nombreTipo(tipo) {
  const nombres = { entrada: "Compra / entrada", salida: "Salida máquina", merma: "Merma", cortesia: "Cortesía", ventaExterna: "Venta externa", salidaBG: "Salida BG", ajuste: "Ajuste reporte" };
  return nombres[tipo] || tipo;
}

function tablaEspiralesReporte(lista) {
  const grupos = {};
  lista.filter(mov => mov.tipo === "salida" && mov.categoria !== "Contenedor adicional").forEach(mov => {
    const llave = `${mov.maquina || "-"}|${mov.espiral || "-"}|${mov.producto}`;
    grupos[llave] = grupos[llave] || { maquina: mov.maquina || "-", espiral: mov.espiral || "-", producto: mov.producto, cantidad: 0 };
    grupos[llave].cantidad += Number(mov.cantidad || 0);
  });

  const filas = Object.values(grupos)
    .sort((a, b) => String(a.maquina).localeCompare(String(b.maquina)) || Number(a.espiral) - Number(b.espiral) || a.producto.localeCompare(b.producto, "es", { sensitivity: "base" }))
    .map(item => `<tr><td>${item.maquina}</td><td>${item.espiral}</td><td>${item.producto}</td><td class="numero">${item.cantidad}</td></tr>`)
    .join("");

  return `<table class="tabla"><tr><th>Máquina</th><th>Espiral</th><th>Producto</th><th>Surtido</th></tr>${filas || `<tr><td colspan="4">Sin salidas por espiral en este periodo.</td></tr>`}</table>`;
}

function mostrarReportes(tipoPeriodo = "dia", valor = hoy()) {
  const lista = movimientosPorPeriodo(tipoPeriodo, valor);
  const porMaquina = maquinasActivas().map(maquina => {
    const total = lista.filter(mov => mov.tipo === "salida" && mov.maquina === maquina).reduce((suma, mov) => suma + Number(mov.cantidad || 0), 0);
    return `<tr><td>${maquina}</td><td class="numero">${total}</td></tr>`;
  }).join("");
  const seccionesCompletas = esLimitado() ? "" : `
    <section class="seccion-movimiento"><h3>Entradas</h3>${tablaHistorialReporte(lista.filter(mov => mov.tipo === "entrada"))}</section>
    <section class="seccion-movimiento"><h3>Salidas diversas</h3>${tablaHistorialReporte(lista.filter(mov => ["cortesia", "merma", "ventaExterna", "salidaBG"].includes(mov.tipo)))}</section>
    <section class="seccion-movimiento"><h3>Ajustes</h3>${tablaHistorialReporte(lista.filter(mov => mov.tipo === "ajuste"), true)}</section>`;
  const resumenVisible = esLimitado() ? "" : `<div class="panel"><h3>Resumen del periodo</h3>${reporteResumenPeriodo(lista)}</div>`;

  document.getElementById("contenido").innerHTML = `
    <h2>Reportes</h2>
    <p class="texto-suave">Elige si quieres revisar un día específico o todo un mes.</p>
    <div class="form-grid">
      <div><label>Ver por</label><select id="repTipo" onchange="cambiarFiltroReporte()"><option value="dia" ${tipoPeriodo === "dia" ? "selected" : ""}>Día</option><option value="mes" ${tipoPeriodo === "mes" ? "selected" : ""}>Mes completo</option></select></div>
      <div><label>Fecha</label><input id="repFecha" type="${tipoPeriodo === "dia" ? "date" : "month"}" value="${valor}" onchange="cambiarFiltroReporte()"></div>
    </div>
    ${resumenVisible}
    <div class="panel"><h3>Espiral de productos por máquina</h3>${tablaEspiralesReporte(lista)}</div>
    <section class="seccion-movimiento"><h3>Salidas a máquina</h3>${tablaControlesSalida(lista, false)}</section>
    ${seccionesCompletas}`;
}

function cambiarFiltroReporte() {
  const tipo = document.getElementById("repTipo").value;
  const valor = document.getElementById("repFecha").value || (tipo === "dia" ? hoy() : mesActual());
  mostrarReportes(tipo, valor);
}

function reporteResumenPeriodo(lista) {
  const entradas = lista.filter(mov => mov.tipo === "entrada").reduce((suma, mov) => suma + Number(mov.cantidad || 0), 0);
  const salidas = lista.filter(mov => ["salida", "merma", "cortesia", "ventaExterna", "salidaBG"].includes(mov.tipo)).reduce((suma, mov) => suma + Number(mov.cantidad || 0), 0);
  const ajustes = lista.filter(mov => mov.tipo === "ajuste").reduce((suma, mov) => suma + impactoAjuste(mov.categoria, mov.cantidad), 0);
  return `<div class="grid-resumen"><div class="tarjeta-kpi"><span>Entradas</span><strong>${entradas}</strong></div><div class="tarjeta-kpi"><span>Salidas</span><strong>${salidas}</strong></div><div class="tarjeta-kpi"><span>Ajustes</span><strong>${ajustes}</strong></div><div class="tarjeta-kpi"><span>Movimientos</span><strong>${lista.length}</strong></div></div>`;
}

function mostrarAnalisis(tipoPeriodo = "mes", valor = mesActual(), inicio = "", fin = "") {
  if (bloquearSiLimitado("analisis")) return;
  const lista = movimientosAnalisisPorPeriodo(tipoPeriodo, valor, inicio, fin);
  const productosPeriodo = productos.filter(producto => fechaEnAnalisis(producto.fechaEntrada, tipoPeriodo, valor, inicio, fin));
  const bajasPeriodo = productos.filter(producto => producto.fechaBaja && fechaEnAnalisis(producto.fechaBaja, tipoPeriodo, valor, inicio, fin));
  const compras = lista.filter(mov => mov.tipo === "entrada");
  const salidasMaquina = lista.filter(mov => mov.tipo === "salida");
  const mermas = lista.filter(mov => mov.tipo === "merma");
  const cortesias = lista.filter(mov => mov.tipo === "cortesia");
  const ventasExternas = lista.filter(mov => mov.tipo === "ventaExterna");
  const salidasBG = lista.filter(mov => mov.tipo === "salidaBG");
  const diversas = cortesias.concat(ventasExternas, salidasBG);
  const ajustes = lista.filter(mov => mov.tipo === "ajuste");
  const ventasEstimadas = salidasMaquina.concat(ventasExternas).reduce((suma, mov) => suma + valorMovimiento(mov), 0);
  const perdidaMerma = mermas.reduce((suma, mov) => suma + valorMovimiento(mov), 0);
  const perdidaCortesia = cortesias.reduce((suma, mov) => suma + valorMovimiento(mov), 0);
  const unidadesEntrada = compras.reduce((suma, mov) => suma + Number(mov.cantidad || 0), 0);
  const unidadesSalida = salidasMaquina.reduce((suma, mov) => suma + Number(mov.cantidad || 0), 0);
  const unidadesMerma = mermas.reduce((suma, mov) => suma + Number(mov.cantidad || 0), 0);
  const unidadesCortesia = cortesias.reduce((suma, mov) => suma + Number(mov.cantidad || 0), 0);
  const unidadesSalidaBG = salidasBG.reduce((suma, mov) => suma + Number(mov.cantidad || 0), 0);
  const valorFecha = tipoPeriodo === "periodo" ? "" : valor;

  document.getElementById("contenido").innerHTML = `
    <h2>Análisis</h2>
    <p class="texto-suave">Por defecto muestra el mes actual. Puedes cambiarlo a un día o a un periodo de fechas.</p>
    <div class="form-grid">
      <div><label>Ver por</label><select id="anaTipo" onchange="cambiarFiltroAnalisis()"><option value="mes" ${tipoPeriodo === "mes" ? "selected" : ""}>Mes completo</option><option value="dia" ${tipoPeriodo === "dia" ? "selected" : ""}>Día</option><option value="periodo" ${tipoPeriodo === "periodo" ? "selected" : ""}>Periodo</option></select></div>
      <div class="${tipoPeriodo === "periodo" ? "oculto" : ""}"><label>Fecha</label><input id="anaFecha" type="${tipoPeriodo === "dia" ? "date" : "month"}" value="${valorFecha}" onchange="cambiarFiltroAnalisis()"></div>
      <div class="${tipoPeriodo === "periodo" ? "" : "oculto"}"><label>Desde</label><input id="anaInicio" type="date" value="${inicio || hoy()}" onchange="cambiarFiltroAnalisis()"></div>
      <div class="${tipoPeriodo === "periodo" ? "" : "oculto"}"><label>Hasta</label><input id="anaFin" type="date" value="${fin || hoy()}" onchange="cambiarFiltroAnalisis()"></div>
      <button class="boton-pequeno boton-secundario" type="button" onclick="mostrarSelectorAnalisis()">Elegir productos</button>
    </div>
    <div id="selectorAnalisis" class="selector-analisis oculto">
      <label>Productos a revisar</label>
      <input id="filtroProductoAnalisis" list="listaProductosAnalisis" placeholder="Escribe un producto">${opcionesProductos("listaProductosAnalisis")}
      <button class="boton-pequeno" type="button" onclick="filtrarProductoAnalisis()">Ver producto</button>
    </div>

    <div class="grid-resumen">
      <div class="tarjeta-kpi"><span>Productos agregados</span><strong>${productosPeriodo.length}</strong></div>
      <div class="tarjeta-kpi"><span>Productos de baja</span><strong>${bajasPeriodo.length}</strong></div>
      <div class="tarjeta-kpi"><span>Entradas</span><strong>${unidadesEntrada}</strong></div>
      <div class="tarjeta-kpi"><span>Salidas</span><strong>${unidadesSalida}</strong></div>
      <div class="tarjeta-kpi"><span>Salida BG</span><strong>${unidadesSalidaBG}</strong></div>
      <div class="tarjeta-kpi"><span>Ventas estimadas</span><strong>$${ventasEstimadas.toFixed(2)}</strong></div>
      <div class="tarjeta-kpi"><span>Mermas</span><strong>${unidadesMerma} / $${perdidaMerma.toFixed(2)}</strong></div>
      <div class="tarjeta-kpi"><span>Cortesías</span><strong>${unidadesCortesia} / $${perdidaCortesia.toFixed(2)}</strong></div>
    </div>

    <div class="analisis-grid">
      <section class="analisis-panel grande">
        <div class="analisis-head">
          <div><h3>Resumen del periodo</h3><p>Cantidad por área principal</p></div>
        </div>
        ${graficaPastel([
          { etiqueta: "Agregados", valor: productosPeriodo.length },
          { etiqueta: "Bajas", valor: bajasPeriodo.length },
          { etiqueta: "Entradas", valor: unidadesEntrada },
          { etiqueta: "Salidas", valor: unidadesSalida },
          { etiqueta: "Salida BG", valor: unidadesSalidaBG },
          { etiqueta: "Merma", valor: unidadesMerma },
          { etiqueta: "Cortesía", valor: unidadesCortesia },
          { etiqueta: "Ajustes", valor: ajustes.reduce((suma, mov) => suma + Math.abs(impactoAjuste(mov.categoria, mov.cantidad)), 0) }
        ])}
      </section>

      <section class="analisis-panel">
        <div class="analisis-head"><div><h3>Top surtidos</h3><p>5 productos con más salida a máquina</p></div></div>
        ${graficaPastel(puntosCantidadPorProducto(salidasMaquina, 5))}
      </section>

      <section class="analisis-panel">
        <div class="analisis-head"><div><h3>Top ventas estimadas</h3><p>5 productos con mayor valor</p></div></div>
        ${graficaPastel(puntosValorPorProducto(salidasMaquina.concat(ventasExternas), 5), "$")}
      </section>

      <section class="analisis-panel">
        <div class="analisis-head"><div><h3>Top pérdida merma</h3><p>5 productos con mayor pérdida</p></div></div>
        ${graficaPastel(puntosValorPorProducto(mermas, 5), "$")}
      </section>

      <section class="analisis-panel">
        <div class="analisis-head"><div><h3>Top cortesías</h3><p>5 productos con mayor cortesía</p></div></div>
        ${graficaPastel(puntosValorPorProducto(cortesias, 5), "$")}
      </section>
    </div>

    <section class="seccion-movimiento"><h3>Productos agregados</h3>${tablaProductosAnalisis(productosPeriodo)}</section>
    <section class="seccion-movimiento"><h3>Productos dados de baja</h3>${tablaProductosAnalisis(bajasPeriodo, true)}</section>
    <section class="seccion-movimiento"><h3>Compras / entradas</h3>${tablaAnalisisMovimientos(compras, true)}</section>
    <section class="seccion-movimiento"><h3>Salidas a máquina</h3>${tablaAnalisisMovimientos(salidasMaquina, true, true)}</section>
    <section class="seccion-movimiento"><h3>Salidas diversas</h3>${tablaAnalisisMovimientos(diversas, false)}</section>
    <section class="seccion-movimiento"><h3>Salida BG</h3>${tablaAnalisisMovimientos(salidasBG, false)}</section>
    <section class="seccion-movimiento"><h3>Merma</h3>${tablaAnalisisMovimientos(mermas, false)}</section>
    <section class="seccion-movimiento"><h3>Ajustes de reportes</h3>${tablaAnalisisMovimientos(ajustes, true, true)}</section>
    <section class="seccion-movimiento"><h3>Resumen por producto</h3>${tablaResumenAnalisisPorProducto(lista, productosPeriodo, bajasPeriodo)}</section>`;
}

function cambiarFiltroAnalisis() {
  const tipo = document.getElementById("anaTipo").value;
  if (tipo === "periodo") {
    mostrarAnalisis("periodo", "", document.getElementById("anaInicio")?.value || hoy(), document.getElementById("anaFin")?.value || hoy());
    return;
  }
  const valor = document.getElementById("anaFecha")?.value || (tipo === "dia" ? hoy() : mesActual());
  mostrarAnalisis(tipo, valor);
}

function movimientosAnalisisPorPeriodo(tipoPeriodo, valor, inicio, fin) {
  if (tipoPeriodo === "periodo") return movimientos.filter(mov => mov.fecha >= inicio && mov.fecha <= fin);
  return movimientosPorPeriodo(tipoPeriodo, valor);
}

function fechaEnAnalisis(fecha, tipoPeriodo, valor, inicio, fin) {
  if (!fecha) return false;
  if (tipoPeriodo === "periodo") return fecha >= inicio && fecha <= fin;
  return productoEnPeriodo(fecha, tipoPeriodo, valor);
}

function productoEnPeriodo(fecha, tipoPeriodo, valor) {
  if (!fecha) return false;
  return tipoPeriodo === "dia" ? fecha === valor : fecha.slice(0, 7) === valor;
}

function valorMovimiento(mov) {
  const producto = buscarProducto(mov.producto);
  return Number(mov.cantidad || 0) * Number(producto?.precio || 0);
}

function puntosCantidadPorProducto(lista, limite = 8) {
  const totales = {};
  for (const mov of lista) totales[mov.producto] = (totales[mov.producto] || 0) + Number(mov.cantidad || 0);
  return Object.entries(totales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limite)
    .map(([etiqueta, valor]) => ({ etiqueta, valor }));
}

function puntosValorPorProducto(lista, limite = 8) {
  const totales = {};
  for (const mov of lista) totales[mov.producto] = (totales[mov.producto] || 0) + valorMovimiento(mov);
  return Object.entries(totales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limite)
    .map(([etiqueta, valor]) => ({ etiqueta, valor }));
}

function graficaBarras(puntos, prefijo = "") {
  const datos = puntos.length ? puntos : [{ etiqueta: "Sin datos", valor: 0 }];
  const maximo = Math.max(...datos.map(punto => Number(punto.valor || 0)), 1);
  const filas = datos.map(punto => {
    const valor = Number(punto.valor || 0);
    const porcentaje = Math.max(4, (valor / maximo) * 100);
    const textoValor = `${prefijo}${valor.toFixed(valor % 1 ? 2 : 0)}`;
    return `<div class="barra-analisis">
      <span>${punto.etiqueta}</span>
      <div><i style="width:${porcentaje}%"></i></div>
      <strong>${textoValor}</strong>
    </div>`;
  }).join("");
  return `<div class="grafica-barras">${filas}</div>`;
}

function graficaPastel(puntos, prefijo = "") {
  const colores = ["#16a34a", "#0f766e", "#22c55e", "#84cc16", "#f59e0b", "#2563eb", "#dc2626"];
  const datos = puntos.filter(punto => Number(punto.valor || 0) > 0);
  if (!datos.length) {
    return `<div class="grafica-pastel"><div class="pastel-vacio">Sin datos</div><div class="pastel-leyenda"><span>No hay información para mostrar.</span></div></div>`;
  }

  const total = datos.reduce((suma, punto) => suma + Number(punto.valor || 0), 0);
  let avance = 0;
  const segmentos = datos.map((punto, indice) => {
    const inicio = avance;
    const porcentaje = (Number(punto.valor || 0) / total) * 100;
    avance += porcentaje;
    return `${colores[indice % colores.length]} ${inicio}% ${avance}%`;
  }).join(", ");

  const leyenda = datos.map((punto, indice) => {
    const valor = Number(punto.valor || 0);
    const porcentaje = total ? ((valor / total) * 100).toFixed(1) : "0.0";
    const textoValor = `${prefijo}${valor.toFixed(valor % 1 ? 2 : 0)}`;
    return `<div class="pastel-item">
      <i style="background:${colores[indice % colores.length]}"></i>
      <span>${punto.etiqueta}</span>
      <strong>${textoValor} <small>${porcentaje}%</small></strong>
    </div>`;
  }).join("");

  return `<div class="grafica-pastel">
    <div class="pastel-circulo" style="background: conic-gradient(${segmentos});"><span>${prefijo}${total.toFixed(total % 1 ? 2 : 0)}</span></div>
    <div class="pastel-leyenda">${leyenda}</div>
  </div>`;
}

function mostrarSelectorAnalisis() {
  document.getElementById("selectorAnalisis")?.classList.toggle("oculto");
}

function filtrarProductoAnalisis() {
  const nombre = document.getElementById("filtroProductoAnalisis")?.value.trim().toLowerCase();
  document.querySelectorAll("#contenido table tr").forEach((fila, indice) => {
    if (indice === 0 || !nombre) {
      fila.style.display = "";
      return;
    }
    fila.style.display = fila.innerText.toLowerCase().includes(nombre) ? "" : "none";
  });
}

/*
function crearMovimientosPruebaHoy() {
  confirmarAccion(
    "¿Crear movimientos de prueba?",
    "Se agregarán entradas, salidas, merma, cortesía y venta externa con fecha de hoy para revisar el análisis.",
    "Crear prueba",
    crearMovimientosPruebaHoyConfirmado
  );
}

function crearMovimientosPruebaHoyConfirmado() {
  const fecha = hoy();
  const candidatos = productosDisponibles(fecha).slice(0, 5);
  if (candidatos.length < 3) return mostrarMensaje("Faltan productos", "Necesitas al menos 3 productos activos para crear la prueba.", "alerta");

  candidatos.forEach((producto, indice) => {
    const entrada = movimientoBase("entrada", producto.nombre, 20 + indice * 3, fecha, "Prueba análisis");
    entrada.lote = siguienteLoteProducto(producto.nombre);
    entrada.caducidad = `${fecha.slice(0, 4)}-12-31`;
    movimientos.push(entrada);
  });

  const controlId = generarId();
  candidatos.slice(0, 3).forEach((producto, indice) => {
    const salida = prepararMovimientoSalida("salida", producto.nombre, 3 + indice, fecha, "Prueba análisis");
    if (!salida || salida === "sin-stock") return;
    salida.maquina = `MAQ ${indice + 1}`;
    salida.espiral = String(indice + 1);
    salida.categoria = "Salida";
    salida.controlId = controlId;
    movimientos.push(salida);
  });

  const merma = prepararMovimientoSalida("merma", candidatos[0].nombre, 1, fecha, "Prueba merma");
  if (merma && merma !== "sin-stock") movimientos.push(merma);

  const cortesia = prepararMovimientoSalida("cortesia", candidatos[1].nombre, 1, fecha, "Prueba cortesía");
  if (cortesia && cortesia !== "sin-stock") movimientos.push(cortesia);

  const venta = prepararMovimientoSalida("ventaExterna", candidatos[2].nombre, 2, fecha, "Prueba venta externa");
  if (venta && venta !== "sin-stock") movimientos.push(venta);

  guardar();
  mostrarMensaje("Prueba creada", "Ya puedes revisar el análisis de hoy o del mes actual.");
  mostrarAnalisis("dia", fecha);
}

*/
function graficaLinea(puntos) {
  const datos = puntos.length ? puntos : [{ etiqueta: "Sin datos", valor: 0 }];
  const ancho = 640;
  const alto = 220;
  const margen = 34;
  const maximo = Math.max(...datos.map(punto => Number(punto.valor || 0)), 1);
  const paso = datos.length > 1 ? (ancho - margen * 2) / (datos.length - 1) : 0;
  const coords = datos.map((punto, indice) => {
    const x = datos.length === 1 ? ancho / 2 : margen + indice * paso;
    const y = alto - margen - (Number(punto.valor || 0) / maximo) * (alto - margen * 2);
    return { ...punto, x, y };
  });
  const linea = coords.map(punto => `${punto.x},${punto.y}`).join(" ");
  const area = `${margen},${alto - margen} ${linea} ${ancho - margen},${alto - margen}`;
  const etiquetas = coords.map(punto => `<g><circle cx="${punto.x}" cy="${punto.y}" r="5"></circle><text x="${punto.x}" y="${alto - 10}" text-anchor="middle">${String(punto.etiqueta).slice(0, 10)}</text><text x="${punto.x}" y="${punto.y - 10}" text-anchor="middle">${Number(punto.valor || 0).toFixed(punto.valor % 1 ? 2 : 0)}</text></g>`).join("");

  return `<div class="grafica-lineal">
    <svg viewBox="0 0 ${ancho} ${alto}" role="img" aria-label="Grafica lineal">
      <line x1="${margen}" y1="${alto - margen}" x2="${ancho - margen}" y2="${alto - margen}"></line>
      <line x1="${margen}" y1="${margen}" x2="${margen}" y2="${alto - margen}"></line>
      <polygon points="${area}"></polygon>
      <polyline points="${linea}"></polyline>
      ${etiquetas}
    </svg>
  </div>`;
}

function tablaProductosAnalisis(lista, baja = false) {
  const filas = lista.map(producto => `<tr>
    <td>${producto.nombre}</td>
    <td>${baja ? producto.fechaBaja || "-" : producto.fechaEntrada || "-"}</td>
    <td class="numero">${Number(producto.stockInicial || 0)}</td>
    <td class="numero">$${Number(producto.precio || 0).toFixed(2)}</td>
    <td>${producto.observaciones || "-"}</td>
  </tr>`).join("");
  return `<table class="tabla"><tr><th>Producto</th><th>Fecha</th><th>Stock inicial</th><th>Precio</th><th>Observaciones</th></tr>${filas || `<tr><td colspan="5">Sin registros.</td></tr>`}</table>`;
}

function tablaAnalisisMovimientos(lista, mostrarLote = false, mostrarMaquina = false) {
  const filas = lista.slice().reverse().map(mov => `<tr>
    <td>${mov.fecha || "-"}</td>
    <td>${nombreTipo(mov.tipo)}</td>
    <td>${mov.producto}</td>
    <td class="numero">${mov.cantidad}</td>
    ${mostrarLote ? `<td>${detalleLotes(mov) || mov.lote || "-"}</td>` : ""}
    ${mostrarMaquina ? `<td>${mov.maquina || "-"}</td><td>${mov.espiral || "-"}</td><td>${mov.categoria || "-"}</td>` : ""}
    <td class="numero">$${valorMovimiento(mov).toFixed(2)}</td>
    <td>${mov.nota || "-"}</td>
  </tr>`).join("");
  const extras = `${mostrarLote ? "<th>Lote</th>" : ""}${mostrarMaquina ? "<th>Maquina</th><th>Espiral</th><th>Categoria</th>" : ""}`;
  const columnas = 6 + (mostrarLote ? 1 : 0) + (mostrarMaquina ? 3 : 0);
  return `<table class="tabla"><tr><th>Fecha</th><th>Tipo</th><th>Producto</th><th>Cantidad</th>${extras}<th>Importe estimado</th><th>Nota</th></tr>${filas || `<tr><td colspan="${columnas}">Sin registros.</td></tr>`}</table>`;
}

function tablaResumenAnalisisPorProducto(lista, productosAgregados = [], productosBaja = []) {
  const nombres = new Set([...lista.map(mov => mov.producto), ...productosAgregados.map(p => p.nombre), ...productosBaja.map(p => p.nombre)]);
  const filas = [...nombres].sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" })).map(nombre => {
    const calc = calcularProductoPeriodo(nombre, lista);
    const agregado = productosAgregados.some(p => p.nombre === nombre) ? "Si" : "No";
    const baja = productosBaja.some(p => p.nombre === nombre) ? "Si" : "No";
    return `<tr>
      <td>${nombre}</td>
      <td>${agregado}</td>
      <td>${baja}</td>
      <td class="numero">${calc.compras}</td>
      <td class="numero">${calc.salidaMaq1 + calc.salidaMaq2 + calc.salidaMaq3}</td>
      <td class="numero">${calc.salidaBG}</td>
      <td class="numero">${calc.mermas}</td>
      <td class="numero">${calc.cortesia + calc.ventaExterna}</td>
      <td class="numero">${calc.ajustes}</td>
      <td class="numero">$${calc.ventas.toFixed(2)}</td>
    </tr>`;
  }).join("");
  return `<table class="tabla"><tr><th>Producto</th><th>Agregado</th><th>Baja</th><th>Entradas</th><th>Salida maquina</th><th>Salida BG</th><th>Merma</th><th>Diversas</th><th>Ajustes</th><th>Ventas estimadas</th></tr>${filas || `<tr><td colspan="10">Sin registros.</td></tr>`}</table>`;
}

function mostrarCierreMes() {
  if (bloquearSiLimitado("cierre")) return;
  const filas = mesesCerrados.sort().reverse().map(mes => `<tr><td>${mes}</td><td><span class="pill pill-baja">Cerrado</span></td></tr>`).join("");
  document.getElementById("contenido").innerHTML = `
    <h2>Cierre de mes</h2>
    <p class="texto-suave">Cuando cierres un mes, ya no se podrán capturar movimientos con fechas de ese mes. Para reabrirlo se necesita código.</p>
    <div class="form-grid">
      <div><label>Mes</label><input type="month" id="mesCierre" value="${mesActual()}"></div>
      <div><label>Código</label><input type="password" id="codigoCierre" placeholder="Código del dueño"></div>
      <button class="boton-pequeno" type="button" onclick="cerrarMes()">Cerrar mes</button>
      <button class="boton-pequeno boton-secundario" type="button" onclick="abrirMes()">Reabrir mes</button>
    </div>
    <table class="tabla"><tr><th>Mes</th><th>Estado</th></tr>${filas || `<tr><td colspan="2">No hay meses cerrados.</td></tr>`}</table>`;
}

function cerrarMes() {
  const mes = document.getElementById("mesCierre").value;
  const codigo = document.getElementById("codigoCierre").value;
  if (!mes) return mostrarMensaje("Falta el mes", "Elige el mes que quieres cerrar.", "alerta");
  if (codigo !== CODIGO_CIERRE) return mostrarMensaje("Código incorrecto", "No se pudo cerrar el mes.", "error");
  if (!mesesCerrados.includes(mes)) mesesCerrados.push(mes);
  guardar();
  mostrarMensaje("Mes cerrado", "Ya no se podrán capturar movimientos en ese mes.");
  mostrarCierreMes();
}

function abrirMes() {
  const mes = document.getElementById("mesCierre").value;
  const codigo = document.getElementById("codigoCierre").value;
  if (!mes) return mostrarMensaje("Falta el mes", "Elige el mes que quieres reabrir.", "alerta");
  if (codigo !== CODIGO_CIERRE) return mostrarMensaje("Código incorrecto", "No se pudo reabrir el mes.", "error");
  mesesCerrados = mesesCerrados.filter(item => item !== mes);
  guardar();
  mostrarMensaje("Mes reabierto", "Ya puedes capturar movimientos en ese mes.");
  mostrarCierreMes();
}

function mostrarCierreMes() {
  if (bloquearSiLimitado("cierre")) return;
  const filas = mesesCerrados.sort().reverse().map(mes => `<tr><td>${mes}</td><td><span class="pill pill-baja">Cerrado</span></td></tr>`).join("");
  document.getElementById("contenido").innerHTML = `
    <h2>Cierre de mes</h2>
    <p class="texto-suave">Elige el mes, escribe el código del dueño y desliza para cerrar o reabrir.</p>
    <div class="cierre-panel">
      <div><label>Mes</label><input type="month" id="mesCierre" value="${mesActual()}" onchange="actualizarSwitchCierre()"></div>
      <div><label>Código</label><input type="password" id="codigoCierre" placeholder="Código del dueño"></div>
      <label class="switch-cierre">
        <input type="checkbox" id="switchCierreMes" onchange="procesarSwitchCierre(this)">
        <span></span>
        <strong id="textoSwitchCierre">Desliza para cerrar mes</strong>
      </label>
      <div class="carga-cierre" id="cargaCierre"><i></i></div>
    </div>
    <table class="tabla"><tr><th>Mes</th><th>Estado</th></tr>${filas || `<tr><td colspan="2">No hay meses cerrados.</td></tr>`}</table>`;
  actualizarSwitchCierre();
}

function actualizarSwitchCierre() {
  const mes = document.getElementById("mesCierre")?.value || mesActual();
  const switchMes = document.getElementById("switchCierreMes");
  const texto = document.getElementById("textoSwitchCierre");
  if (!switchMes || !texto) return;
  const cerrado = mesesCerrados.includes(mes);
  switchMes.checked = cerrado;
  texto.textContent = cerrado ? "Desliza para reabrir mes" : "Desliza para cerrar mes";
}

function procesarSwitchCierre(input) {
  const mes = document.getElementById("mesCierre").value;
  const codigo = document.getElementById("codigoCierre").value;
  const estabaCerrado = mesesCerrados.includes(mes);
  if (!mes) {
    input.checked = estabaCerrado;
    return mostrarMensaje("Falta el mes", "Elige el mes que quieres cambiar.", "alerta");
  }
  if (codigo !== CODIGO_CIERRE) {
    input.checked = estabaCerrado;
    return mostrarMensaje("Código incorrecto", "No se pudo cambiar el cierre del mes.", "error");
  }

  const carga = document.getElementById("cargaCierre");
  carga?.classList.remove("activo");
  void carga?.offsetWidth;
  carga?.classList.add("activo");

  setTimeout(() => {
    if (estabaCerrado) {
      mesesCerrados = mesesCerrados.filter(item => item !== mes);
      mostrarMensaje("Mes reabierto", "Ya puedes capturar movimientos en ese mes.");
    } else if (!mesesCerrados.includes(mes)) {
      mesesCerrados.push(mes);
      mostrarMensaje("Mes cerrado", "Ya no se podrán capturar movimientos en ese mes.");
    }
    guardar();
    mostrarCierreMes();
  }, 850);
}

function mostrarConfiguracion() {
  if (bloquearSiLimitado("configuracion")) return;
  document.getElementById("contenido").innerHTML = `
    <h2>Configuración</h2>
    <p class="texto-suave">Aquí puedes revisar la configuración principal del sistema.</p>
    <div class="layout-doble">
      <div class="panel"><h3>Empresa</h3><p><strong>${CONFIG.empresa || "Nuez de Avellana"}</strong></p><p class="texto-suave">Nombre mostrado en el sistema.</p></div>
      <div class="panel"><h3>Código del dueño</h3><p><strong>${CODIGO_CIERRE}</strong></p><p class="texto-suave">Se usa para editar controles y cerrar o reabrir meses.</p></div>
      <div class="panel"><h3>Máquinas</h3><p><strong>${(CONFIG.maquinas || ["MAQ 1", "MAQ 2", "MAQ 3"]).join(", ")}</strong></p><p class="texto-suave">Máquinas activas para salida.</p></div>
      <div class="panel"><h3>Fotos de salida</h3><p><strong>${(CONFIG.fotosSalidaObligatorias ?? true) ? "Obligatorias" : "Opcionales"}</strong></p><p class="texto-suave">Se pide una foto por cada contenedor de la máquina.</p></div>
    </div>
    <section class="seccion-movimiento"><h3>Archivo de configuración</h3><p class="texto-suave">Esta información viene de <strong>config.js</strong>. Después podemos hacer que también se pueda editar y guardar desde esta pantalla.</p></section>`;
}

function pintarSalidaMaquina() {
  document.getElementById("areaMovimiento").innerHTML = `<section class="seccion-movimiento">
    <h3>Salida a máquina</h3>
    <p class="texto-suave">Captura varias espirales de una sola vez. El sistema descuenta primero los lotes más próximos a caducar.</p>
    <div class="form-grid">
      <div><label>Fecha</label><input type="date" id="salidaFecha" value="${hoy()}" onchange="pintarCapturaSalida()"></div>
      <div><label>Máquina</label><select id="salidaMaquina" onchange="pintarCapturaSalida()">${maquinasActivas().map(maquina => `<option>${maquina}</option>`).join("")}</select></div>
      <button class="boton-secundario boton-pequeno" type="button" onclick="toggleObservacionesSalida()">Observaciones</button>
      <button class="boton-pequeno" type="button" onclick="guardarSalidasMaquina()">Guardar salidas</button>
    </div>
    <div class="observaciones-salida" id="observacionesSalidaPanel" hidden>
      <label>Observaciones de la máquina</label>
      <textarea id="salidaObservaciones" rows="3" placeholder="Ejemplo: MAQ 1 espiral 1 poner adelante los productos nuevos que te mande"></textarea>
    </div>
    <div id="capturaSalidaMaquina"></div>${tablaControlesSalida(movimientos, true)}</section>`;
  pintarCapturaSalida();
}

function toggleObservacionesSalida() {
  const panel = document.getElementById("observacionesSalidaPanel");
  if (!panel) return;
  panel.hidden = !panel.hidden;
  if (!panel.hidden) document.getElementById("salidaObservaciones")?.focus();
}

function pintarCapturaSalida() {
  const contenedor = document.getElementById("capturaSalidaMaquina");
  if (!contenedor) return;
  const maquina = document.getElementById("salidaMaquina").value;
  const fecha = document.getElementById("salidaFecha").value || hoy();
  configuracionEspirales[maquina] = configuracionEspirales[maquina] || {};
  const bloques = espiralesPorMaquina[maquina].map((grupo, indice) => {
    const numero = indice + 1;
    const filas = grupo.map(espiral => {
      const guardado = configuracionEspirales[maquina][espiral] || "";
      const activo = guardado && buscarProducto(guardado) && productoDisponibleEnFecha(buscarProducto(guardado), fecha) ? guardado : "";
      return `<tr><td>${espiral}</td><td><input list="listaProductosSalida" class="salidaProducto" data-espiral="${espiral}" value="${activo}" placeholder="Producto"></td><td><input type="number" class="salidaCantidad" min="0" placeholder="0"></td></tr>`;
    }).join("");
    return `<div class="panel">
      <h3>Contenedor ${numero}</h3>
      <div class="foto-contenedor">
        <label>Foto contenedor ${numero}</label>
        <input type="file" class="fotoContenedor" data-contenedor="${numero}" accept="image/*" capture="environment" onchange="previsualizarFotoContenedor(${numero})">
        <div class="preview-foto-contenedor" id="previewFotoContenedor${numero}"><span>Sin foto</span></div>
      </div>
      <table class="tabla tabla-rapida"><tr><th>Espiral</th><th>Producto</th><th>Salida</th></tr>${filas}</table>
    </div>`;
  }).join("");
  contenedor.innerHTML = `${opcionesProductos("listaProductosSalida", fecha)}<div class="contenedores-grid">${bloques}</div>${pintarContenedorAdicional()}`;
  calcularRestantesCA();
}

function previsualizarFotoContenedor(numero) {
  const input = document.querySelector(`.fotoContenedor[data-contenedor="${numero}"]`);
  const preview = document.getElementById(`previewFotoContenedor${numero}`);
  const archivo = input?.files?.[0];
  if (!preview) return;
  if (!archivo) {
    preview.innerHTML = "<span>Sin foto</span>";
    return;
  }
  const url = URL.createObjectURL(archivo);
  preview.innerHTML = `<img src="${url}" alt="Foto contenedor ${numero}"><strong>${archivo.name}</strong>`;
}

function leerFotosSalida() {
  const inputs = [...document.querySelectorAll(".fotoContenedor")];
  if (!inputs.length) return Promise.resolve([]);
  const faltantes = inputs.filter(input => !input.files || input.files.length === 0).map(input => input.dataset.contenedor);
  if (faltantes.length) {
    return Promise.resolve({ error: `Falta foto del contenedor ${faltantes.join(", ")}` });
  }
  return Promise.all(inputs.map(input => new Promise((resolve, reject) => {
    const archivo = input.files[0];
    const lector = new FileReader();
    lector.onload = () => resolve({ contenedor: input.dataset.contenedor, nombre: archivo.name, tipo: archivo.type, datos: lector.result });
    lector.onerror = reject;
    lector.readAsDataURL(archivo);
  })));
}

function guardarSalidasMaquina() {
  const faltantes = [...document.querySelectorAll(".fotoContenedor")]
    .filter(input => !input.files || input.files.length === 0)
    .map(input => input.dataset.contenedor);
  if ((CONFIG.fotosSalidaObligatorias ?? true) && faltantes.length) {
    return mostrarMensaje("Faltan fotos", `Sube o toma foto del contenedor ${faltantes.join(", ")}.`, "alerta");
  }
  confirmarAccion(
    "¿Guardar control de salida?",
    "Una vez guardado no puedes editar a menos del permiso del dueño.",
    "Guardar",
    () => guardarSalidasMaquinaConfirmada()
  );
}

function verControlSalida(controlId) {
  const lista = movimientos.filter(mov => String(mov.controlId || mov.id) === String(controlId));
  const salidas = lista.filter(mov => mov.tipo === "salida");
  const filas = salidas.map(mov => `<tr><td>${mov.espiral || "-"}</td><td>${mov.producto}</td><td class="numero">${mov.cantidad}</td></tr>`).join("");
  const fotos = fotosControles[controlId] || [];
  const galeria = fotos.map(foto => `<article class="foto-ver-contenedor"><h4>Contenedor ${foto.contenedor || "-"}</h4><img src="${foto.datos}" alt="${foto.nombre || "Foto del contenedor"}"><p>${foto.nombre || ""}</p></article>`).join("");
  document.getElementById("detalleProducto").innerHTML = `
    <h2>Control de salida</h2>
    <p class="texto-suave">${salidas[0]?.fecha || ""} ${salidas[0]?.maquina || ""}</p>
    <div class="galeria-fotos por-contenedor">${galeria || "<p class='texto-suave'>Este control no tiene fotos guardadas.</p>"}</div>
    <table class="tabla"><tr><th>Espiral</th><th>Producto</th><th>Cantidad</th></tr>${filas || `<tr><td colspan="3">Sin salidas.</td></tr>`}</table>`;
  document.getElementById("modalProducto").style.display = "flex";
}

function mostrarCierreMes() {
  if (bloquearSiLimitado("cierre")) return;
  const mes = mesActual();
  const cerrado = mesesCerrados.includes(mes);
  const filas = mesesCerrados.sort().reverse().map(item => `<tr><td>${item}</td><td><span class="pill pill-baja">Cerrado</span></td></tr>`).join("");
  document.getElementById("contenido").innerHTML = `
    <h2>Cierre de mes</h2>
    <p class="texto-suave">Elige el mes, escribe el código del dueño y desliza el botón grande.</p>
    <div class="cierre-panel">
      <div><label>Mes</label><input type="month" id="mesCierre" value="${mes}" onchange="actualizarBotonCierre()"></div>
      <div><label>Código</label><input type="password" id="codigoCierre" placeholder="Código del dueño"></div>
      <div class="boton-deslizar-wrap">
        <strong id="textoBotonCierre">${cerrado ? "Reabrir mes" : "Cerrar mes"}</strong>
        <input type="range" min="0" max="100" value="0" class="boton-deslizar-cierre" id="sliderCierreMes" oninput="procesarDeslizarCierre(this)">
        <span>&gt;&gt;</span>
      </div>
      <div class="carga-cierre" id="cargaCierre"><i></i></div>
    </div>
    <table class="tabla"><tr><th>Mes</th><th>Estado</th></tr>${filas || `<tr><td colspan="2">No hay meses cerrados.</td></tr>`}</table>`;
  actualizarBotonCierre();
}

function actualizarBotonCierre() {
  const mes = document.getElementById("mesCierre")?.value || mesActual();
  const texto = document.getElementById("textoBotonCierre");
  if (!texto) return;
  texto.textContent = mesesCerrados.includes(mes) ? "Reabrir mes" : "Cerrar mes";
  const slider = document.getElementById("sliderCierreMes");
  if (slider) slider.value = 0;
}

function procesarDeslizarCierre(input) {
  if (Number(input.value) < 96) return;
  input.disabled = true;
  const mes = document.getElementById("mesCierre").value;
  const codigo = document.getElementById("codigoCierre").value;
  const estabaCerrado = mesesCerrados.includes(mes);
  if (!mes) {
    input.value = 0;
    input.disabled = false;
    return mostrarMensaje("Falta el mes", "Elige el mes que quieres cambiar.", "alerta");
  }
  if (codigo !== CODIGO_CIERRE) {
    input.value = 0;
    input.disabled = false;
    return mostrarMensaje("Código incorrecto", "No se pudo cambiar el cierre del mes.", "error");
  }
  const carga = document.getElementById("cargaCierre");
  carga?.classList.remove("activo");
  void carga?.offsetWidth;
  carga?.classList.add("activo");
  setTimeout(() => {
    if (estabaCerrado) {
      mesesCerrados = mesesCerrados.filter(item => item !== mes);
      mostrarMensaje("Mes reabierto", "Ya puedes capturar movimientos en ese mes.");
    } else if (!mesesCerrados.includes(mes)) {
      mesesCerrados.push(mes);
      mostrarMensaje("Mes cerrado", "Ya no se podrán capturar movimientos en ese mes.");
    }
    guardar();
    mostrarCierreMes();
  }, 850);
}

function aplicarConfiguracionVisual() {
  document.body?.classList.toggle("modo-oscuro", !!ajustesSistema.modoOscuro);
  document.body?.classList.toggle("sin-animacion-login", !ajustesSistema.animacionLogin);
}

function fotosSalidaObligatorias() {
  return ajustesSistema.fotosSalidaObligatorias ?? (CONFIG.fotosSalidaObligatorias ?? true);
}

function mostrarConfiguracion() {
  if (bloquearSiLimitado("configuracion")) return;
  document.getElementById("contenido").innerHTML = `
    <h2>Configuración</h2>
    <p class="texto-suave">Ajustes visuales y reglas rápidas del sistema.</p>
    <div class="config-grid">
      <label class="config-opcion">
        <input type="checkbox" id="configModoOscuro" ${ajustesSistema.modoOscuro ? "checked" : ""}>
        <span><strong>Modo oscuro</strong><small>Cambia el sistema a colores oscuros.</small></span>
      </label>
      <label class="config-opcion">
        <input type="checkbox" id="configAnimacionLogin" ${ajustesSistema.animacionLogin ? "checked" : ""}>
        <span><strong>Animación del inicio</strong><small>Activa o detiene las bolas verdes del login.</small></span>
      </label>
      <label class="config-opcion">
        <input type="checkbox" id="configFotosObligatorias" ${fotosSalidaObligatorias() ? "checked" : ""}>
        <span><strong>Fotos obligatorias</strong><small>Pide una foto por cada contenedor, incluyendo adicional.</small></span>
      </label>
      <div class="config-opcion solo-texto">
        <span><strong>Máquinas activas</strong><small>${maquinasActivas().join(", ")}</small></span>
      </div>
    </div>
    <button class="boton-pequeno" type="button" onclick="guardarConfiguracionSistema()">Guardar configuración</button>
    <section class="seccion-movimiento">
      <h3>Agregar otra máquina</h3>
      <p class="texto-suave">La nueva máquina se crea con espirales del 1 al 60 y queda disponible en salidas y reportes.</p>
      <div class="form-grid">
        <div><label>Nombre</label><input id="nombreNuevaMaquina" placeholder="Ejemplo: MAQ 5"></div>
        <button class="boton-pequeno" type="button" onclick="agregarNuevaMaquina()">Agregar máquina</button>
      </div>
    </section>
    <section class="seccion-movimiento">
      <h3>Pruebas de salida</h3>
      <p class="texto-suave">Crea dos controles de salida aleatorios para hoy en MAQ 1 y MAQ 2. Antes de crear, el sistema guarda una copia para poder deshacerlo.</p>
      <div class="acciones">
        <button type="button" onclick="crearSalidasPruebaMaquinas()">Crear 2 salidas aleatorias</button>
        <button class="boton-secundario" type="button" onclick="deshacerSalidasPruebaMaquinas()">Deshacer prueba</button>
      </div>
    </section>`;
}

function guardarConfiguracionSistema() {
  ajustesSistema.modoOscuro = !!document.getElementById("configModoOscuro")?.checked;
  ajustesSistema.animacionLogin = !!document.getElementById("configAnimacionLogin")?.checked;
  ajustesSistema.fotosSalidaObligatorias = !!document.getElementById("configFotosObligatorias")?.checked;
  guardar();
  aplicarConfiguracionVisual();
  mostrarBarraGuardado("Configuración guardada");
  mostrarMensaje("Configuración guardada", "Los cambios ya se aplicaron.");
}

function agregarNuevaMaquina() {
  const input = document.getElementById("nombreNuevaMaquina");
  const nombre = String(input?.value || "").trim().toUpperCase();
  if (!nombre) return mostrarMensaje("Falta el nombre", "Escribe el nombre de la nueva máquina.", "alerta");
  if (maquinasActivas().includes(nombre)) return mostrarMensaje("La máquina ya existe", `${nombre} ya está activa.`, "alerta");
  ajustesSistema.maquinas = [...maquinasActivas(), nombre];
  asegurarEspiralesMaquina(nombre);
  guardar();
  mostrarBarraGuardado(`${nombre} agregada correctamente`);
  mostrarConfiguracion();
}

function productosConExistencia(fecha = hoy()) {
  return productosDisponibles(fecha)
    .map(producto => ({ producto, stock: calcularProducto(producto.nombre).inventarioFinal }))
    .filter(item => item.stock > 0);
}

function elegirProductoPrueba(fecha) {
  const disponibles = productosConExistencia(fecha);
  if (!disponibles.length) return null;
  return disponibles[Math.floor(Math.random() * disponibles.length)];
}

function crearControlPruebaMaquina(maquina, fecha) {
  const controlId = `PRUEBA-${maquina.replace(/\s+/g, "")}-${generarId()}`;
  const espirales = (espiralesPorMaquina[maquina] || []).flat();
  let guardados = 0;
  let adicionales = 0;

  configuracionEspirales[maquina] = configuracionEspirales[maquina] || {};

  for (const espiral of espirales) {
    const elegido = elegirProductoPrueba(fecha);
    if (!elegido) break;

    const cantidad = Math.max(1, Math.min(elegido.stock, Math.floor(Math.random() * 3) + 1));
    const mov = prepararMovimientoSalida("salida", elegido.producto.nombre, cantidad, fecha, "Prueba aleatoria para revisar reportes");
    if (!mov || mov === "sin-stock") continue;

    mov.maquina = maquina;
    mov.espiral = String(espiral);
    mov.categoria = "Salida";
    mov.controlId = controlId;
    movimientos.push(mov);
    configuracionEspirales[maquina][espiral] = elegido.producto.nombre;
    guardados++;
  }

  for (let i = 0; i < 4; i++) {
    const elegido = elegirProductoPrueba(fecha);
    if (!elegido) break;

    const cantidad = Math.max(1, Math.min(elegido.stock, Math.floor(Math.random() * 3) + 1));
    const mov = prepararMovimientoSalida("salida", elegido.producto.nombre, cantidad, fecha, "Prueba de contenedor adicional");
    if (!mov || mov === "sin-stock") continue;

    mov.maquina = maquina;
    mov.espiral = `CA ${i + 1}`;
    mov.categoria = "Contenedor adicional";
    mov.controlId = controlId;
    mov.caMaq1 = 0;
    mov.caMaq2 = 0;
    mov.caMaq3 = 0;
    mov.caInicio = maquina;
    mov.caEtapa = maquina;
    mov.caCerrado = false;
    movimientos.push(mov);
    guardados++;
    adicionales++;
  }

  fotosControles[controlId] = {
    fotos: [],
    cambiosPrecio: [],
    maquina,
    fecha,
    observaciones: "Control de prueba con cantidades aleatorias.",
    prueba: true
  };

  return { controlId, guardados, adicionales };
}

function crearSalidasPruebaMaquinas() {
  if (bloquearSiLimitado("configuracion")) return;
  if (ajustesSistema.salidasPruebaBackup) {
    mostrarMensaje("Prueba pendiente", "Ya existe una prueba creada. Primero usa Deshacer prueba.", "alerta");
    return;
  }

  ajustesSistema.salidasPruebaBackup = {
    productos: JSON.parse(JSON.stringify(productos)),
    movimientos: JSON.parse(JSON.stringify(movimientos)),
    configuracionEspirales: JSON.parse(JSON.stringify(configuracionEspirales)),
    fotosControles: JSON.parse(JSON.stringify(fotosControles))
  };

  const fecha = hoy();
  const maq1 = crearControlPruebaMaquina("MAQ 1", fecha);
  const maq2 = crearControlPruebaMaquina("MAQ 2", fecha);

  guardar();
  mostrarBarraGuardado("Salidas de prueba creadas");
  mostrarMensaje("Prueba creada", `MAQ 1: ${maq1.guardados} registros (${maq1.adicionales} adicionales). MAQ 2: ${maq2.guardados} registros (${maq2.adicionales} adicionales).`);
  mostrarMovimientos("salida");
}

function deshacerSalidasPruebaMaquinas() {
  if (bloquearSiLimitado("configuracion")) return;
  const backup = ajustesSistema.salidasPruebaBackup;
  if (!backup) {
    mostrarMensaje("Sin prueba pendiente", "No hay salidas de prueba para deshacer.", "alerta");
    return;
  }

  productos = backup.productos || productos;
  movimientos = backup.movimientos || movimientos;
  configuracionEspirales = backup.configuracionEspirales || configuracionEspirales;
  fotosControles = backup.fotosControles || fotosControles;
  delete ajustesSistema.salidasPruebaBackup;

  guardar();
  mostrarBarraGuardado("Prueba deshecha");
  mostrarMensaje("Listo", "Las salidas de prueba se quitaron y el inventario volvió como estaba.");
  mostrarConfiguracion();
}

function pintarCapturaSalida() {
  const contenedor = document.getElementById("capturaSalidaMaquina");
  if (!contenedor) return;
  const maquina = document.getElementById("salidaMaquina").value;
  const fecha = document.getElementById("salidaFecha").value || hoy();
  configuracionEspirales[maquina] = configuracionEspirales[maquina] || {};
  const bloques = espiralesPorMaquina[maquina].map((grupo, indice) => {
    const numero = indice + 1;
    const filas = grupo.map(espiral => {
      const guardado = configuracionEspirales[maquina][espiral] || "";
      const activo = guardado && buscarProducto(guardado) && productoDisponibleEnFecha(buscarProducto(guardado), fecha) ? guardado : "";
      return `<tr><td>${espiral}</td><td><input list="listaProductosSalida" class="salidaProducto" data-espiral="${espiral}" value="${activo}" placeholder="Producto"></td><td><input type="number" class="salidaCantidad" min="0" placeholder="0"></td></tr>`;
    }).join("");
    return `<div class="panel">
      <h3>Contenedor ${numero}</h3>
      ${campoFotoContenedor(numero, `Elegir o tomar foto del contenedor ${numero}`)}
      <table class="tabla tabla-rapida"><tr><th>Espiral</th><th>Producto</th><th>Salida</th></tr>${filas}</table>
    </div>`;
  }).join("");
  contenedor.innerHTML = `${opcionesProductos("listaProductosSalida", fecha)}<div class="contenedores-grid">${bloques}</div>${pintarContenedorAdicional()}`;
  calcularRestantesCA();
}

function campoFotoContenedor(id, texto) {
  return `<div class="foto-contenedor">
    <label>${texto}</label>
    <input type="file" class="fotoContenedor" data-contenedor="${id}" accept="image/*" capture="environment" onchange="previsualizarFotoContenedor('${id}')">
    <div class="preview-foto-contenedor" id="previewFotoContenedor${id}"><span>Elegir o tomar foto</span></div>
  </div>`;
}

function pintarContenedorAdicional() {
  const filas = Array.from({ length: 8 }, () => `<tr>
    <td><input list="listaProductosSalida" class="caProducto" placeholder="Producto"></td>
    <td><input type="number" class="caSurtido" min="0" placeholder="Cantidad"></td>
  </tr>`).join("");

  return `<div class="seccion-movimiento">
    <h3>Contenedor adicional</h3>
    <p class="texto-suave">Aquí solo captura los adicionales que salieron. La repartición por máquina se cierra después en Ajustes de reportes.</p>
    ${campoFotoContenedor("AD", "Elegir o tomar foto del contenedor adicional")}
    <table class="tabla tabla-rapida">
      <tr><th>Producto</th><th>Cantidad</th></tr>
      ${filas}
    </table>
  </div>`;
}

function previsualizarFotoContenedor(id) {
  const input = document.querySelector(`.fotoContenedor[data-contenedor="${id}"]`);
  const preview = document.getElementById(`previewFotoContenedor${id}`);
  const archivo = input?.files?.[0];
  if (!preview) return;
  if (!archivo) {
    preview.innerHTML = "<span>Elegir o tomar foto</span>";
    return;
  }
  const url = URL.createObjectURL(archivo);
  preview.innerHTML = `<img src="${url}" alt="Foto contenedor ${id}"><strong>${archivo.name}</strong>`;
}

function comprimirImagenArchivo(archivo, maxAncho = 1100, calidad = 0.72) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => {
      const imagen = new Image();
      imagen.onload = () => {
        const escala = Math.min(1, maxAncho / imagen.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(imagen.width * escala));
        canvas.height = Math.max(1, Math.round(imagen.height * escala));
        canvas.getContext("2d").drawImage(imagen, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", calidad));
      };
      imagen.onerror = () => resolve(lector.result);
      imagen.src = lector.result;
    };
    lector.onerror = reject;
    lector.readAsDataURL(archivo);
  });
}

function leerFotosSalida() {
  const inputs = [...document.querySelectorAll(".fotoContenedor")];
  if (!inputs.length) return Promise.resolve([]);
  const infoAnterior = controlSalidaEditando?.info || {};
  const fotosPrevias = Array.isArray(infoAnterior) ? infoAnterior : (infoAnterior.fotos || []);
  if (fotosSalidaObligatorias()) {
    const faltantes = inputs
      .filter(input => (!input.files || input.files.length === 0)
        && !fotosPrevias.some(foto => String(foto.contenedor) === String(input.dataset.contenedor)))
      .map(input => input.dataset.contenedor);
    if (faltantes.length) return Promise.resolve({ error: `Falta foto del contenedor ${faltantes.join(", ")}` });
  }
  return Promise.all(inputs.filter(input => input.files && input.files.length > 0).map(async input => {
    const archivo = input.files[0];
    const datos = await comprimirImagenArchivo(archivo);
    return { contenedor: input.dataset.contenedor, nombre: archivo.name, tipo: "image/jpeg", datos };
  })).then(fotosNuevas => {
    const contenedoresNuevos = new Set(fotosNuevas.map(foto => String(foto.contenedor)));
    return [...fotosPrevias.filter(foto => !contenedoresNuevos.has(String(foto.contenedor))), ...fotosNuevas];
  });
}

function guardarSalidasMaquina() {
  if (fotosSalidaObligatorias()) {
    const infoAnterior = controlSalidaEditando?.info || {};
    const fotosPrevias = Array.isArray(infoAnterior) ? infoAnterior : (infoAnterior.fotos || []);
    const faltantes = [...document.querySelectorAll(".fotoContenedor")]
      .filter(input => (!input.files || input.files.length === 0)
        && !fotosPrevias.some(foto => String(foto.contenedor) === String(input.dataset.contenedor)))
      .map(input => input.dataset.contenedor);
    if (faltantes.length) return mostrarMensaje("Faltan fotos", `Sube o toma foto del contenedor ${faltantes.join(", ")}.`, "alerta");
  }
  confirmarAccion(
    "¿Guardar control de salida?",
    "Una vez guardado no puedes editar a menos del permiso del dueño.",
    "Guardar",
    () => guardarSalidasMaquinaConfirmada()
  );
}

function verControlSalida(controlId) {
  const lista = movimientos.filter(mov => String(mov.controlId || mov.id) === String(controlId));
  const salidas = lista.filter(mov => mov.tipo === "salida");
  const filas = salidas.map(mov => `<tr><td>${mov.espiral || "-"}</td><td>${mov.producto}</td><td class="numero">${mov.cantidad}</td></tr>`).join("");
  const fotos = fotosControles[controlId] || [];
  const galeria = fotos
    .sort((a, b) => String(a.contenedor).localeCompare(String(b.contenedor), "es", { numeric: true }))
    .map(foto => `<article class="foto-ver-contenedor"><h4>Contenedor ${foto.contenedor === "AD" ? "adicional" : foto.contenedor}</h4><img src="${foto.datos}" alt="${foto.nombre || "Foto del contenedor"}"><p>${foto.nombre || ""}</p></article>`)
    .join("");
  document.getElementById("detalleProducto").innerHTML = `
    <h2>Control de salida</h2>
    <p class="texto-suave">${salidas[0]?.fecha || ""} ${salidas[0]?.maquina || ""}</p>
    <div class="galeria-fotos por-contenedor">${galeria || "<p class='texto-suave'>Este control no tiene fotos guardadas.</p>"}</div>
    <table class="tabla"><tr><th>Espiral</th><th>Producto</th><th>Cantidad</th></tr>${filas || `<tr><td colspan="3">Sin salidas.</td></tr>`}</table>`;
  document.getElementById("modalProducto").style.display = "flex";
}

function mostrarCierreMes() {
  if (bloquearSiLimitado("cierre")) return;
  const mes = mesActual();
  const filas = mesesCerrados.sort().reverse().map(item => `<tr><td>${item}</td><td><span class="pill pill-baja">Cerrado</span></td></tr>`).join("");
  document.getElementById("contenido").innerHTML = `
    <h2>Cierre de mes</h2>
    <p class="texto-suave">Elige el mes, escribe el código del dueño y desliza el botón grande.</p>
    <div class="cierre-panel">
      <div><label>Mes</label><input type="month" id="mesCierre" value="${mes}" onchange="actualizarBotonCierre()"></div>
      <div><label>Código</label><input type="password" id="codigoCierre" placeholder="Código del dueño"></div>
      <div class="boton-deslizar-wrap" id="botonDeslizarWrap">
        <span>&gt;&gt;</span>
        <strong id="textoBotonCierre">Desliza para cerrar mes</strong>
        <input type="range" min="0" max="100" value="0" class="boton-deslizar-cierre" id="sliderCierreMes" oninput="procesarDeslizarCierre(this)">
      </div>
      <div class="carga-cierre" id="cargaCierre"><i></i></div>
    </div>
    <table class="tabla"><tr><th>Mes</th><th>Estado</th></tr>${filas || `<tr><td colspan="2">No hay meses cerrados.</td></tr>`}</table>`;
  actualizarBotonCierre();
}

function actualizarBotonCierre() {
  const mes = document.getElementById("mesCierre")?.value || mesActual();
  const texto = document.getElementById("textoBotonCierre");
  const wrap = document.getElementById("botonDeslizarWrap");
  const cerrado = mesesCerrados.includes(mes);
  if (texto) texto.textContent = cerrado ? "Desliza para abrir mes" : "Desliza para cerrar mes";
  wrap?.classList.toggle("abrir", cerrado);
  const slider = document.getElementById("sliderCierreMes");
  if (slider) {
    slider.value = 0;
    slider.disabled = false;
  }
}

function controlesSalidaPorMaquina(lista, maquina) {
  return controlesSalida(lista).filter(control => [...control.maquinas].includes(maquina));
}

function tablaControlesSalidaPorMaquina(lista, maquina) {
  const controles = controlesSalidaPorMaquina(lista, maquina);
  const filas = controles.map(control => `<tr>
    <td>${control.fecha || "-"}<br><small>${control.etiqueta}</small></td>
    <td class="numero">${control.total}</td>
    <td class="numero">${control.ca}</td>
    <td class="numero">${control.registros}</td>
    <td><button type="button" onclick="verControlSalida('${control.id}')">Abrir</button></td>
  </tr>`).join("");
  return `<table class="tabla"><tr><th>Fecha</th><th>Total surtido</th><th>Adicional</th><th>Registros</th><th>Fotos y detalle</th></tr>${filas || `<tr><td colspan="5">Sin salidas guardadas para ${maquina}.</td></tr>`}</table>`;
}

function mostrarReportes(tipoPeriodo = "dia", valor = hoy()) {
  const lista = movimientosPorPeriodo(tipoPeriodo, valor);
  const seccionesCompletas = esLimitado() ? "" : `
    <section class="seccion-movimiento"><h3>Entradas</h3>${tablaHistorialReporte(lista.filter(mov => mov.tipo === "entrada"))}</section>
    <section class="seccion-movimiento"><h3>Salidas diversas</h3>${tablaHistorialReporte(lista.filter(mov => ["cortesia", "merma", "ventaExterna", "salidaBG"].includes(mov.tipo)))}</section>
    <section class="seccion-movimiento"><h3>Ajustes</h3>${tablaHistorialReporte(lista.filter(mov => mov.tipo === "ajuste"), true)}</section>`;
  const resumenVisible = esLimitado() ? "" : `<div class="panel"><h3>Resumen del periodo</h3>${reporteResumenPeriodo(lista)}</div>`;

  const reportesMaquinas = maquinasActivas().map((maquina, indice) => `
    <div class="panel reporte-color reporte-color-${(indice % 4) + 1}"><h3>${maquina} - salidas guardadas</h3>${tablaControlesSalidaPorMaquina(lista, maquina)}</div>`).join("");

  document.getElementById("contenido").innerHTML = `
    <h2>Reportes y análisis</h2>
    <p class="texto-suave">Elige un día o mes. Abre cada máquina para ver lo surtido y sus fotos por contenedor.</p>
    <div class="form-grid">
      <div><label>Ver por</label><select id="repTipo" onchange="cambiarFiltroReporte()"><option value="dia" ${tipoPeriodo === "dia" ? "selected" : ""}>Día</option><option value="mes" ${tipoPeriodo === "mes" ? "selected" : ""}>Mes completo</option></select></div>
      <div><label>Fecha</label><input id="repFecha" type="${tipoPeriodo === "dia" ? "date" : "month"}" value="${valor}" onchange="cambiarFiltroReporte()"></div>
    </div>
    ${resumenVisible}
    ${reportesMaquinas}
    <div class="panel reporte-color reporte-color-4"><h3>Espiral de productos por máquina</h3>${tablaEspiralesReporte(lista)}</div>
    ${seccionesCompletas}`;
}

function graficaPastel(puntos, prefijo = "") {
  const colores = ["#16a34a", "#0f766e", "#22c55e", "#84cc16", "#f59e0b", "#2563eb", "#dc2626", "#9333ea", "#0891b2", "#f43f5e", "#65a30d", "#7c3aed"];
  const datos = puntos.filter(punto => Number(punto.valor || 0) > 0);
  if (!datos.length) {
    return `<div class="grafica-pastel"><div class="pastel-vacio">Sin datos</div><div class="pastel-leyenda"><span>No hay información para mostrar.</span></div></div>`;
  }

  const total = datos.reduce((suma, punto) => suma + Number(punto.valor || 0), 0);
  let avance = 0;
  const segmentos = datos.map((punto, indice) => {
    const inicio = avance;
    const porcentaje = (Number(punto.valor || 0) / total) * 100;
    avance += porcentaje;
    return `${colores[indice % colores.length]} ${inicio}% ${avance}%`;
  }).join(", ");

  const leyenda = datos.map((punto, indice) => {
    const valor = Number(punto.valor || 0);
    const porcentaje = total ? ((valor / total) * 100).toFixed(1) : "0.0";
    const textoValor = `${prefijo}${valor.toFixed(valor % 1 ? 2 : 0)}`;
    return `<div class="pastel-item">
      <i style="background:${colores[indice % colores.length]}"></i>
      <span>${punto.etiqueta}</span>
      <strong>${textoValor} <small>${porcentaje}%</small></strong>
    </div>`;
  }).join("");

  return `<div class="grafica-pastel">
    <div class="pastel-circulo" style="background: conic-gradient(${segmentos});"><span>${prefijo}${total.toFixed(total % 1 ? 2 : 0)}</span></div>
    <div class="pastel-leyenda">${leyenda}</div>
  </div>`;
}

function actualizarBotonCierre() {
  const mes = document.getElementById("mesCierre")?.value || mesActual();
  const texto = document.getElementById("textoBotonCierre");
  const wrap = document.getElementById("botonDeslizarWrap");
  const cerrado = mesesCerrados.includes(mes);
  if (texto) texto.textContent = cerrado ? "Abrir mes" : "Cerrar mes";
  wrap?.classList.toggle("abrir", cerrado);
  const slider = document.getElementById("sliderCierreMes");
  if (slider) {
    slider.value = 0;
    slider.disabled = false;
    slider.style.setProperty("--avance", "0%");
  }
}

function procesarDeslizarCierre(input) {
  const avance = `${input.value}%`;
  input.style.setProperty("--avance", avance);
  const wrap = document.getElementById("botonDeslizarWrap");
  wrap?.style.setProperty("--avance", avance);
  if (Number(input.value) < 96) return;
  input.disabled = true;
  const mes = document.getElementById("mesCierre").value;
  const codigo = document.getElementById("codigoCierre").value;
  const estabaCerrado = mesesCerrados.includes(mes);
  if (!mes) {
    input.value = 0;
    input.disabled = false;
    input.style.setProperty("--avance", "0%");
    return mostrarMensaje("Falta el mes", "Elige el mes que quieres cambiar.", "alerta");
  }
  if (codigo !== CODIGO_CIERRE) {
    input.value = 0;
    input.disabled = false;
    input.style.setProperty("--avance", "0%");
    return mostrarMensaje("Código incorrecto", "No se pudo cambiar el cierre del mes.", "error");
  }
  const carga = document.getElementById("cargaCierre");
  carga?.classList.remove("activo");
  void carga?.offsetWidth;
  carga?.classList.add("activo");
  setTimeout(() => {
    if (estabaCerrado) {
      mesesCerrados = mesesCerrados.filter(item => item !== mes);
      mostrarMensaje("Mes abierto", "Ya puedes capturar movimientos en ese mes.");
    } else if (!mesesCerrados.includes(mes)) {
      mesesCerrados.push(mes);
      mostrarMensaje("Mes cerrado", "Ya no se podrán capturar movimientos en ese mes.");
    }
    guardar();
    mostrarCierreMes();
  }, 850);
}

function productoAnteriorEspiral(maquina, espiral) {
  return (configuracionEspirales[maquina] || {})[espiral] || "";
}

function revisarCambioEspiral(input) {
  const maquina = document.getElementById("salidaMaquina")?.value || "MAQ 1";
  const espiral = input.dataset.espiral;
  const anterior = productoAnteriorEspiral(maquina, espiral);
  const actual = input.value.trim();
  const aviso = input.closest("td")?.querySelector(".aviso-cambio-precio");
  const cambio = anterior && actual && anterior.toLowerCase() !== actual.toLowerCase();
  input.closest("tr")?.classList.toggle("fila-cambio-precio", cambio);
  if (aviso) aviso.textContent = cambio ? `Antes: ${anterior}` : "";
}

function cambiosPrecioActuales(maquina) {
  return [...document.querySelectorAll(".salidaProducto")].map(input => {
    const espiral = input.dataset.espiral;
    const anterior = productoAnteriorEspiral(maquina, espiral);
    const nuevo = input.value.trim();
    return { espiral, anterior, nuevo };
  }).filter(item => item.anterior && item.nuevo && item.anterior.toLowerCase() !== item.nuevo.toLowerCase());
}

function pintarCapturaSalida() {
  const contenedor = document.getElementById("capturaSalidaMaquina");
  if (!contenedor) return;
  const maquina = document.getElementById("salidaMaquina").value;
  const fecha = document.getElementById("salidaFecha").value || hoy();
  configuracionEspirales[maquina] = configuracionEspirales[maquina] || {};
  const bloques = espiralesPorMaquina[maquina].map((grupo, indice) => {
    const numero = indice + 1;
    const filas = grupo.map(espiral => {
      const guardado = configuracionEspirales[maquina][espiral] || "";
      const activo = guardado && buscarProducto(guardado) && productoDisponibleEnFecha(buscarProducto(guardado), fecha) ? guardado : "";
      return `<tr><td>${espiral}</td><td><input list="listaProductosSalida" class="salidaProducto" data-espiral="${espiral}" value="${activo}" placeholder="Producto" oninput="revisarCambioEspiral(this)"><small class="aviso-cambio-precio"></small></td><td><input type="number" class="salidaCantidad" min="0" placeholder="0"></td></tr>`;
    }).join("");
    return `<div class="panel">
      <h3>Contenedor ${numero}</h3>
      ${campoFotoContenedor(numero, `Elegir o tomar foto del contenedor ${numero}`)}
      <table class="tabla tabla-rapida"><tr><th>Espiral</th><th>Producto</th><th>Salida</th></tr>${filas}</table>
    </div>`;
  }).join("");
  contenedor.innerHTML = `${opcionesProductos("listaProductosSalida", fecha)}<div class="contenedores-grid">${bloques}</div>${pintarContenedorAdicional()}`;
  calcularRestantesCA();
}

async function guardarSalidasMaquinaConfirmada() {
  const fecha = document.getElementById("salidaFecha").value;
  const maquina = document.getElementById("salidaMaquina").value;
  const observaciones = document.getElementById("salidaObservaciones")?.value.trim() || "";
  if (!puedeUsarFecha(fecha)) return;
  const fotos = await leerFotosSalida();
  if (fotos.error) return mostrarMensaje("Faltan fotos", fotos.error, "alerta");
  if (fotosSalidaObligatorias() && fotos.length === 0) {
    return mostrarMensaje("Falta foto", "Toma o sube al menos una foto del contenedor antes de guardar.", "alerta");
  }

  configuracionEspirales[maquina] = configuracionEspirales[maquina] || {};
  const edicion = controlSalidaEditando;
  const movimientosAntes = movimientos.slice();
  if (edicion) {
    movimientos = movimientos.filter(mov => String(mov.controlId || mov.id) !== String(edicion.controlId));
  }
  const configuracionAntesDeIntentar = { ...configuracionEspirales[maquina] };
  const configuracionAnterior = {
    ...((!Array.isArray(edicion?.info) && edicion?.info?.configuracionAnterior) || configuracionEspirales[maquina])
  };
  const controlId = edicion?.controlId || generarId();
  let guardados = 0;

  const cancelarGuardado = (titulo, texto, tipo = "alerta") => {
    movimientos = movimientosAntes;
    configuracionEspirales[maquina] = configuracionAntesDeIntentar;
    mostrarMensaje(titulo, texto, tipo);
  };

  const productosSalida = [...document.querySelectorAll(".salidaProducto")];
  const cantidadesSalida = [...document.querySelectorAll(".salidaCantidad")];
  for (let i = 0; i < productosSalida.length; i++) {
    const producto = productosSalida[i].value.trim();
    const cantidad = Number(cantidadesSalida[i].value || 0);
    const espiral = productosSalida[i].dataset.espiral;
    if (producto) configuracionEspirales[maquina][espiral] = producto;
    if (!producto || cantidad <= 0) continue;

    const mov = prepararMovimientoSalida("salida", producto, cantidad, fecha, observaciones);
    if (mov === "sin-stock") return cancelarGuardado("Sin lote suficiente", `No hay existencia suficiente por lote para ${producto}. No se guardó ninguna salida de este control.`);
    if (!mov) return cancelarGuardado("Producto no disponible", `${producto} está de baja o no existe. No se guardó ninguna salida de este control.`);
    mov.maquina = maquina;
    mov.espiral = espiral;
    mov.categoria = "Salida";
    mov.controlId = controlId;
    movimientos.push(mov);
    guardados++;
  }

  const productosCA = [...document.querySelectorAll(".caProducto")];
  const surtidos = [...document.querySelectorAll(".caSurtido")];
  for (let i = 0; i < productosCA.length; i++) {
    const producto = productosCA[i].value.trim();
    const surtido = Number(surtidos[i]?.value || 0);
    if (!producto || surtido <= 0) continue;
    if (!buscarProducto(producto)) return cancelarGuardado("Producto no encontrado", `${producto} no está registrado. No se guardó ninguna salida de este control.`);

    const salidaCA = prepararMovimientoSalida("salida", producto, surtido, fecha, observaciones || "Contenedor adicional");
    if (salidaCA === "sin-stock") return cancelarGuardado("Sin lote suficiente", `No hay existencia suficiente por lote para ${producto}. No se guardó ninguna salida de este control.`);
    if (!salidaCA) return cancelarGuardado("Producto no disponible", `${producto} está de baja o no existe. No se guardó ninguna salida de este control.`);
    salidaCA.maquina = maquina;
    salidaCA.espiral = `CA ${i + 1}`;
    salidaCA.categoria = "Contenedor adicional";
    salidaCA.controlId = controlId;
    salidaCA.caMaq1 = 0;
    salidaCA.caMaq2 = 0;
    salidaCA.caMaq3 = 0;
    salidaCA.caInicio = maquina;
    salidaCA.caEtapa = maquina;
    salidaCA.caCerrado = false;
    movimientos.push(salidaCA);
    guardados++;
  }

  if (guardados === 0) return cancelarGuardado("Sin salidas", "Captura al menos una salida con producto válido.", "alerta");
  const configuracionFinal = { ...configuracionEspirales[maquina] };
  const cambiosPrecio = [...new Set([...Object.keys(configuracionAnterior), ...Object.keys(configuracionFinal)])]
    .map(espiral => ({
      espiral,
      anterior: configuracionAnterior[espiral] || "",
      nuevo: configuracionFinal[espiral] || ""
    }))
    .filter(item => item.anterior && item.nuevo && item.anterior.toLowerCase() !== item.nuevo.toLowerCase());
  const infoAnterior = (!Array.isArray(edicion?.info) && edicion?.info) || {};
  fotosControles[controlId] = {
    ...infoAnterior,
    fotos,
    cambiosPrecio,
    maquina,
    fecha,
    observaciones,
    configuracionAnterior,
    configuracionFinal,
    cerrado: false
  };
  controlSalidaEditando = null;
  guardar();
  clearTimeout(timerSyncSupabase);
  const guardadoNube = await guardarEstadoSupabase();
  if (guardadoNube) {
    mostrarBarraGuardado("Control guardado en este equipo y en la nube");
  } else {
    mostrarBarraGuardado("Control protegido en este equipo. Pendiente de sincronizar");
    mostrarMensaje(
      "Control guardado en este equipo",
      "No se perdió el control. La copia en la nube está pendiente y se volverá a intentar en el próximo guardado.",
      "alerta"
    );
  }
  mostrarMovimientos("salida");
}

function mapaMaquinaHTML(maquina, cambios = []) {
  const cambiados = new Set(cambios.map(item => String(item.espiral)));
  const grupos = espiralesPorMaquina[maquina] || [];
  return `<div class="mapa-maquina">
    ${grupos.map((grupo, indice) => `<section><h4>Contenedor ${indice + 1}</h4><div class="mapa-grid">${grupo.map(espiral => {
      const producto = (configuracionEspirales[maquina] || {})[espiral] || "-";
      return `<div class="mapa-celda ${cambiados.has(String(espiral)) ? "cambio" : ""}"><strong>${espiral}</strong><span>${producto}</span></div>`;
    }).join("")}</div></section>`).join("")}
  </div>`;
}

function fotoReferenciaMaquinaHTML(maquina) {
  const fotos = {
    "MAQ 1": ["assets/maq1-ref-1.png", "assets/maq1-ref-2.png"],
    "MAQ 2": ["assets/maq2-ref.png"],
    "MAQ 3": []
  }[maquina] || [];
  if (!fotos.length) return "";
  return `<div class="referencias-maquina">
    <h3>Referencia visual ${maquina}</h3>
    <div>${fotos.map((src, indice) => `<article><img src="${src}" alt="Referencia ${maquina} ${indice + 1}"><span>Foto ${indice + 1}</span></article>`).join("")}</div>
  </div>`;
}

function mostrarRevisionMaquina(controlId) {
  const info = fotosControles[controlId] || {};
  const cambios = info.cambiosPrecio || [];
  const maquina = info.maquina || "";
  const observaciones = info.observaciones || "";
  const lista = cambios.map(item => `<li><strong>Espiral ${item.espiral}</strong>: cambió de ${item.anterior} a ${item.nuevo}. Revisar precio en la máquina.</li>`).join("");
  document.getElementById("detalleProducto").innerHTML = `
    <h2>Revisión final de ${maquina}</h2>
    <p class="texto-suave">Antes de terminar, confirma que los precios del sistema de la máquina coincidan con los productos nuevos.</p>
    ${observaciones ? `<div class="nota-control"><h3>Observaciones</h3><p>${observaciones}</p></div>` : ""}
    <div class="alerta-precio">${lista ? `<ul>${lista}</ul>` : "<p>No hubo cambios de producto por espiral. Aun así revisa que el acomodo físico coincida.</p>"}</div>
    ${fotoReferenciaMaquinaHTML(maquina)}
    <h3>Así debe quedar la máquina</h3>
    ${mapaMaquinaHTML(maquina, cambios)}
    <button type="button" onclick="cerrarDetalleProducto()">Listo, revisado</button>`;
  document.getElementById("modalProducto").style.display = "flex";
}

function mostrarRevisionMaquinaCerrada(controlId, maquina) {
  const info = fotosControles[controlId] || {};
  if (!info.maquina) info.maquina = maquina;
  mostrarRevisionMaquina(controlId);
}

function verControlSalida(controlId) {
  const lista = movimientos.filter(mov => String(mov.controlId || mov.id) === String(controlId));
  const salidas = lista.filter(mov => mov.tipo === "salida");
  const registroFotos = fotosControles[controlId] || [];
  const fotos = Array.isArray(registroFotos) ? registroFotos : (registroFotos.fotos || []);
  const cambios = Array.isArray(registroFotos) ? [] : (registroFotos.cambiosPrecio || []);
  const maquina = salidas[0]?.maquina || registroFotos.maquina || "";
  const observaciones = Array.isArray(registroFotos) ? "" : (registroFotos.observaciones || "");
  const gruposMaquina = espiralesPorMaquina[maquina] || [];
  const salidasNormales = salidas.filter(mov => mov.categoria !== "Contenedor adicional");
  const adicionales = salidas.filter(mov => mov.categoria === "Contenedor adicional");
  const tablaProductosControl = movimientosGrupo => {
    const filas = movimientosGrupo
      .slice()
      .sort((a, b) => Number.parseInt(a.espiral, 10) - Number.parseInt(b.espiral, 10))
      .map(mov => `<tr><td class="espiral-grande">${mov.espiral || "-"}</td><td>${mov.producto}</td><td class="numero cantidad-grande">${mov.cantidad}</td></tr>`)
      .join("");
    return `<table class="tabla tabla-control-detalle"><tr><th>Espiral</th><th>Producto</th><th>Cantidad</th></tr>${filas || `<tr><td colspan="3">Sin productos surtidos.</td></tr>`}</table>`;
  };
  const contenedores = gruposMaquina.map((espirales, indice) => {
    const conjunto = new Set(espirales.map(String));
    const movimientosGrupo = salidasNormales.filter(mov => conjunto.has(String(mov.espiral)));
    return `<section class="detalle-contenedor-control">
      <div class="detalle-contenedor-titulo"><span>${indice + 1}</span><h3>Contenedor ${indice + 1}</h3><strong>${movimientosGrupo.length} productos</strong></div>
      ${tablaProductosControl(movimientosGrupo)}
    </section>`;
  }).join("");
  const seccionAdicional = adicionales.length ? `<section class="detalle-contenedor-control detalle-adicional">
    <div class="detalle-contenedor-titulo"><span>+</span><h3>Contenedor adicional</h3><strong>${adicionales.length} productos</strong></div>
    ${tablaProductosControl(adicionales)}
  </section>` : "";
  const galeria = fotos
    .sort((a, b) => String(a.contenedor).localeCompare(String(b.contenedor), "es", { numeric: true }))
    .map(foto => `<article class="foto-ver-contenedor"><h4>Contenedor ${foto.contenedor === "AD" ? "adicional" : foto.contenedor}</h4><img src="${foto.datos}" alt="${foto.nombre || "Foto del contenedor"}"><p>${foto.nombre || ""}</p></article>`)
    .join("");
  const listaCambios = cambios.map(item => `<li><strong>Espiral ${item.espiral}</strong>: ${item.anterior} → ${item.nuevo}. Revisar precio.</li>`).join("");
  document.getElementById("detalleProducto").innerHTML = `
    <div class="encabezado-control-detalle"><div><span>Control de salida</span><h2>${maquina}</h2></div><strong>${salidas[0]?.fecha || ""}</strong></div>
    ${observaciones ? `<div class="nota-control"><h3>Observaciones</h3><p>${observaciones}</p></div>` : ""}
    <div class="alerta-precio">${listaCambios ? `<h3>Cambios de precio a revisar</h3><ul>${listaCambios}</ul>` : "<p>No hubo cambios de producto por espiral guardados en este control.</p>"}</div>
    <div class="detalle-contenedores-grid">${contenedores}${seccionAdicional}</div>
    <h3 class="titulo-fotos-control">Fotos por contenedor</h3>
    <div class="galeria-fotos por-contenedor">${galeria || "<p class='texto-suave'>Este control no tiene fotos guardadas.</p>"}</div>`;
  document.getElementById("modalProducto").style.display = "flex";
}

document.addEventListener("keydown", event => {
  const editable = event.target.matches("input, select, textarea");
  const tabla = event.target.closest?.("table");
  if (!editable || !tabla || !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;

  const controles = [...tabla.querySelectorAll("input, select, textarea")];
  const actual = controles.indexOf(event.target);
  if (actual < 0) return;

  let siguiente = actual;
  if (event.key === "ArrowRight") siguiente = actual + 1;
  if (event.key === "ArrowLeft") siguiente = actual - 1;
  if (event.key === "ArrowDown") siguiente = actual + 2;
  if (event.key === "ArrowUp") siguiente = actual - 2;

  if (controles[siguiente]) {
    event.preventDefault();
    controles[siguiente].focus();
  }
});

var supabaseDB = null;
var timerSyncSupabase = null;
var cargandoDesdeSupabase = false;
var ultimoEstadoSupabase = "sin-probar";
var ultimoErrorSupabase = "";
var canalTiempoRealSupabase = null;
var clienteSincronizacion = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
var vistaActual = { nombre: "inicio", args: [] };
var ultimoCambioRemoto = "";
var ultimaNubeCargada = "";

function supabaseActivo() {
  return !!(CONFIG.supabaseUrl && CONFIG.supabaseKey && window.supabase);
}

function clienteSupabase() {
  if (!supabaseActivo()) return null;
  if (!supabaseDB) {
    supabaseDB = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseKey);
  }
  return supabaseDB;
}

function estadoCompletoSistema() {
  return {
    usuarios,
    productos,
    movimientos,
    mesesCerrados,
    configuracionEspirales,
    ajustesSistema,
    clienteSincronizacion,
    guardadoEn: new Date().toISOString()
  };
}

function indicadorSupabase() {
  if (!supabaseActivo()) return `<span class="estado-conexion local">Modo local</span>`;
  if (ultimoEstadoSupabase === "ok") return `<span class="estado-conexion conectado">Base de datos conectada</span>`;
  if (ultimoEstadoSupabase === "error") return `<span class="estado-conexion error">Base de datos con error</span>`;
  return `<span class="estado-conexion revisando">Revisando base de datos</span>`;
}

function detalleConexionSupabase() {
  if (!window.supabase) return "No cargó la librería de Supabase. Revisa internet o recarga la página.";
  if (!CONFIG.supabaseUrl || !CONFIG.supabaseKey) return "Falta la URL o la clave pública en config.js.";
  if (ultimoEstadoSupabase === "error") return ultimoErrorSupabase || "Supabase rechazó la conexión.";
  const ultima = localStorage.getItem(`${CLAVE}-ultimaSync`) || "Todavía no se ha subido nada en este dispositivo";
  return `Proyecto: ${CONFIG.supabaseUrl}. Ultima subida: ${ultima}`;
}

function guardar() {
  ordenarProductos();

  localStorage.setItem(`${CLAVE}-usuarios`, JSON.stringify(usuarios));
  localStorage.setItem(`${CLAVE}-productos`, JSON.stringify(productos));
  localStorage.setItem(`${CLAVE}-movimientos`, JSON.stringify(movimientos));
  localStorage.setItem(`${CLAVE}-mesesCerrados`, JSON.stringify(mesesCerrados));
  localStorage.setItem(`${CLAVE}-configuracionEspirales`, JSON.stringify(configuracionEspirales));
  localStorage.setItem(`${CLAVE}-fotosControles`, JSON.stringify(fotosControles));
  localStorage.setItem(`${CLAVE}-ajustesSistema`, JSON.stringify(ajustesSistema));

  if (!cargandoDesdeSupabase && guardadoNubeHabilitado) {
    programarGuardadoSupabase();
  }
}

function programarGuardadoSupabase() {
  if (!supabaseActivo()) return;

  clearTimeout(timerSyncSupabase);
  timerSyncSupabase = setTimeout(() => {
    guardarEstadoSupabase();
  }, 150);
}

function fechaMs(valor) {
  const tiempo = Date.parse(valor || "");
  return Number.isFinite(tiempo) ? tiempo : 0;
}

async function guardarEstadoSupabase() {
  const db = clienteSupabase();
  if (!db) {
    ultimoEstadoSupabase = "error";
    ultimoErrorSupabase = "No se cargó la librería de Supabase.";
    return false;
  }

  const datos = estadoCompletoSistema();

  const { error } = await db
    .from("app_estado")
    .upsert({
      id: "principal",
      datos,
      actualizado_en: new Date().toISOString()
    });

  if (error) {
    ultimoEstadoSupabase = "error";
    ultimoErrorSupabase = error.message;
    console.warn("No se pudo guardar en Supabase:", error.message);
    mostrarBarraGuardado(`Guardado solo en este dispositivo. Error nube: ${error.message}`);
    return false;
  }

  ultimoEstadoSupabase = "ok";
  ultimoErrorSupabase = "";
  const ahora = new Date().toISOString();
  ultimaNubeCargada = ahora;
  localStorage.setItem(`${CLAVE}-ultimaSync`, ahora);
  return true;
}

function aplicarDatosSupabase(datos) {
  if (!datos) return false;

  cargandoDesdeSupabase = true;

  usuarios = Array.isArray(datos.usuarios) ? datos.usuarios : usuarios;
  productos = Array.isArray(datos.productos) ? datos.productos : productos;
  movimientos = Array.isArray(datos.movimientos) ? datos.movimientos : movimientos;
  mesesCerrados = Array.isArray(datos.mesesCerrados) ? datos.mesesCerrados : mesesCerrados;
  configuracionEspirales = datos.configuracionEspirales || configuracionEspirales;
  fotosControles = datos.fotosControles || fotosControles;
  ajustesSistema = datos.ajustesSistema || ajustesSistema;

  localStorage.setItem(`${CLAVE}-usuarios`, JSON.stringify(usuarios));
  localStorage.setItem(`${CLAVE}-productos`, JSON.stringify(productos));
  localStorage.setItem(`${CLAVE}-movimientos`, JSON.stringify(movimientos));
  localStorage.setItem(`${CLAVE}-mesesCerrados`, JSON.stringify(mesesCerrados));
  localStorage.setItem(`${CLAVE}-configuracionEspirales`, JSON.stringify(configuracionEspirales));
  localStorage.setItem(`${CLAVE}-fotosControles`, JSON.stringify(fotosControles));
  localStorage.setItem(`${CLAVE}-ajustesSistema`, JSON.stringify(ajustesSistema));

  normalizarDatos();
  aplicarConfiguracionVisual();
  cargandoDesdeSupabase = false;
  return true;
}

async function cargarEstadoSupabase() {
  const db = clienteSupabase();
  if (!db) return false;

  const { data, error } = await db
    .from("app_estado")
    .select("datos, actualizado_en")
    .eq("id", "principal")
    .maybeSingle();

  if (error) {
    ultimoEstadoSupabase = "error";
    ultimoErrorSupabase = error.message;
    console.warn("No se pudo cargar Supabase:", error.message);
    return false;
  }

  if (!data || !data.datos) {
    ultimoEstadoSupabase = "ok";
    ultimoErrorSupabase = "";
    return false;
  }

  ultimaNubeCargada = data.actualizado_en || new Date().toISOString();
  return aplicarDatosSupabase(data.datos);
}

function refrescarVistaActual() {
  if (!usuarioActual) return;
  const activo = document.activeElement;
  if (activo?.matches?.("input, select, textarea")) return;
  const args = vistaActual.args || [];
  if (vistaActual.nombre === "inventario") return mostrarInventario(...args);
  if (vistaActual.nombre === "productos") return mostrarProductos();
  if (vistaActual.nombre === "movimientos") return mostrarMovimientos(...args);
  if (vistaActual.nombre === "reportes") return mostrarPanelReportesAnalisis();
  if (vistaActual.nombre === "cierre") return mostrarCierreMes();
  if (vistaActual.nombre === "configuracion") return mostrarConfiguracion();
  if (vistaActual.nombre === "escanear") return mostrarEscanerCompras();
  return mostrarInicio();
}

function activarTiempoRealSupabase() {
  const db = clienteSupabase();
  if (!db || canalTiempoRealSupabase) return;

  canalTiempoRealSupabase = db
    .channel("nuez-avellana-app-estado")
    .on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "app_estado",
      filter: "id=eq.principal"
    }, payload => {
      const datos = payload.new?.datos;
      if (!datos || datos.clienteSincronizacion === clienteSincronizacion) return;
      if (datos.guardadoEn && datos.guardadoEn === ultimoCambioRemoto) return;
      ultimoCambioRemoto = datos.guardadoEn || String(Date.now());
      aplicarDatosSupabase(datos);
      refrescarVistaActual();
      if (!document.activeElement?.matches?.("input, select, textarea")) {
        mostrarBarraGuardado("Datos actualizados desde otro dispositivo");
      }
    })
    .subscribe(status => {
      if (status === "SUBSCRIBED") {
        ultimoEstadoSupabase = "ok";
        if (usuarioActual) refrescarVistaActual();
      }
    });
}

async function probarSupabaseManual() {
  const ok = await guardarEstadoSupabase();
  if (ok) {
    const db = clienteSupabase();
    const { data, error } = await db
      .from("app_estado")
      .select("actualizado_en")
      .eq("id", "principal")
      .maybeSingle();
    if (error) {
      mostrarMensaje("Sube pero no puede leer", error.message, "alerta");
      return;
    }
    mostrarMensaje("Base de datos conectada", `Supabase recibió y leyó la información correctamente. Actualizado: ${data?.actualizado_en || "-"}`);
    if (usuarioActual) mostrarInicio();
    return;
  }

  mostrarMensaje("No se pudo conectar", ultimoErrorSupabase || "Supabase no respondió. Revisa los permisos de la tabla app_estado.");
  if (usuarioActual) mostrarInicio();
}

async function iniciarSesion() {
  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value.trim();
  const mensaje = document.getElementById("mensaje");

  mensaje.textContent = "Conectando con la base de datos...";

  await cargarEstadoSupabase();

  const existe = usuarios.find(item => item.usuario === usuario && item.clave === clave);

  if (!existe) {
    mensaje.textContent = "Usuario o contraseña incorrectos";
    return;
  }

  usuarioActual = existe;
  guardadoNubeHabilitado = true;
  mensaje.textContent = "";

  document.getElementById("pantallaLogin").style.display = "none";
  document.getElementById("sistema").style.display = "block";

  aplicarPermisosMenu();
  // La sincronizacion queda en modo manual: otros cambios se ven al recargar.

  if (esLimitado()) mostrarMovimientos("ajustes");
  else mostrarInicio();

  mostrarBienvenidaSesion();
  guardarEstadoSupabase();
}

const mostrarInicioBase = mostrarInicio;
function revisarAlertaPendienteTrasAnalizar(nombre, args = []) {
  if (esLimitado()) return;
  if (!alertaPendienteTrasAnalizar) return;
  const sigueEnEntrada = nombre === "movimientos" && args[0] === "entrada";
  if (sigueEnEntrada) return;
  alertaPendienteTrasAnalizar = false;
  setTimeout(() => {
    colaAlertasInventario = alertasInventarioActuales();
    mostrarSiguienteAlertaInventario();
  }, 350);
}

mostrarInicio = function(...args) {
  vistaActual = { nombre: "inicio", args };
  const resultado = mostrarInicioBase.apply(this, args);
  revisarAlertaPendienteTrasAnalizar("inicio", args);
  return resultado;
};

const mostrarInventarioBase = mostrarInventario;
mostrarInventario = function(...args) {
  vistaActual = { nombre: "inventario", args };
  const resultado = mostrarInventarioBase.apply(this, args);
  revisarAlertaPendienteTrasAnalizar("inventario", args);
  return resultado;
};

const mostrarProductosBase = mostrarProductos;
mostrarProductos = function(...args) {
  vistaActual = { nombre: "productos", args };
  const resultado = mostrarProductosBase.apply(this, args);
  revisarAlertaPendienteTrasAnalizar("productos", args);
  return resultado;
};

const mostrarMovimientosBase = mostrarMovimientos;
mostrarMovimientos = function(...args) {
  vistaActual = { nombre: "movimientos", args };
  const resultado = mostrarMovimientosBase.apply(this, args);
  revisarAlertaPendienteTrasAnalizar("movimientos", args);
  return resultado;
};

if (typeof mostrarPanelReportesAnalisis === "function") {
  const mostrarPanelReportesAnalisisBase = mostrarPanelReportesAnalisis;
  mostrarPanelReportesAnalisis = function(...args) {
    vistaActual = { nombre: "reportes", args };
    const resultado = mostrarPanelReportesAnalisisBase.apply(this, args);
    revisarAlertaPendienteTrasAnalizar("reportes", args);
    return resultado;
  };
}

const mostrarCierreMesBase = mostrarCierreMes;
mostrarCierreMes = function(...args) {
  vistaActual = { nombre: "cierre", args };
  const resultado = mostrarCierreMesBase.apply(this, args);
  revisarAlertaPendienteTrasAnalizar("cierre", args);
  return resultado;
};

const mostrarConfiguracionBase = mostrarConfiguracion;
mostrarConfiguracion = function(...args) {
  vistaActual = { nombre: "configuracion", args };
  const resultado = mostrarConfiguracionBase.apply(this, args);
  revisarAlertaPendienteTrasAnalizar("configuracion", args);
  return resultado;
};

async function cargarNubeYRefrescarVista() {
  if (!usuarioActual) return;
  const cargo = await cargarEstadoSupabase();
  if (cargo) refrescarVistaActual();
}

document.addEventListener("click", (evento) => {
  const botonMenu = evento.target.closest?.(".sidebar button");
  if (botonMenu && botonMenu.dataset.menu !== "escanear") detenerCamaraEscaner();
});

window.addEventListener("pagehide", detenerCamaraEscaner);

window.addEventListener("online", () => {
  cargarNubeYRefrescarVista();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") detenerCamaraEscaner();
  if (document.visibilityState === "visible") cargarNubeYRefrescarVista();
});
